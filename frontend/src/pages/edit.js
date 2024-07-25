import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { db, auth } from "../components/firebase";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loading from "../animations/loading";

const EditRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    title: initialTitle,
    level: initialLevel,
    time: initialTime,
    calories: initialCalories,
    type: initialType,
    description: initialDescription,
    recId,
    imageUrl: initialImageUrl,
    ingredients: initialIngredients,
  } = location.state || {};

  const [title, setTitle] = useState(initialTitle || "");
  const [level, setLevel] = useState(initialLevel || "");
  const [time, setTime] = useState(initialTime || "");
  const [calories, setCalories] = useState(initialCalories || "");
  const [type, setType] = useState(initialType || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialImageUrl || "");
  const [ingredients, setIngredients] = useState(
    initialIngredients || [{ name: "", amount: "" }]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (recId) {
      const fetchRecipe = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid, "recipes", recId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setLevel(data.level);
          setTime(data.time);
          setCalories(data.calories);
          setType(data.type);
          setDescription(data.description);
          setImageUrl(data.imageUrl);
          setIngredients(data.ingredients || [{ name: "", amount: "" }]);
        }
      };
      fetchRecipe();
    }
  }, [recId]);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      if (user && recId) {
        const docRef = doc(db, "users", user.uid, "recipes", recId);

        const recipeData = {
          title,
          level,
          time,
          calories,
          type,
          description,
          userId: user.uid,
          ingredients,
        };

        if (image) {
          const storage = getStorage();
          const storageRef = ref(storage, `recipes/${recId}/${image.name}`);
          await uploadBytes(storageRef, image);
          const newImageUrl = await getDownloadURL(storageRef);
          recipeData.imageUrl = newImageUrl;
          setImageUrl(newImageUrl);
        }

        await setDoc(docRef, recipeData, { merge: true });
        console.log("Recipe updated successfully");
        navigate("/recipes");
      } else {
        console.error("User is not authenticated or recipe ID is missing");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Error updating recipe: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen blue-200 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Recipe"
                  className="mt-4 w-40 h-40 object-cover rounded-md"
                />
              )}
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="level"
            >
              Level
            </label>
            <FormControl fullWidth>
              <Select
                labelId="level"
                id="demo-simple-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="time"
              >
                Time (in minutes)
              </label>

              <TextField
                required
                id="outlined-number"
                placeholder="Time (in minutes)"
                type="number"
                value={time}
                onChange={(e) => setTime(Math.max(1, e.target.value))}
                onPaste={preventPasteNegative}
                onKeyPress={preventMinus}
                className="w-full p-3 border rounded-lg"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="calories"
              >
                Calories
              </label>

              <TextField
                required
                id="outlined-number"
                placeholder="Calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(Math.max(1, e.target.value))}
                onPaste={preventPasteNegative}
                onKeyPress={preventMinus}
                className="w-full p-3 border rounded-lg"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <FormControl fullWidth>
              <Select
                required
                labelId="type"
                id="demo-simple-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                <MenuItem value="Matcha">🍵 Matcha</MenuItem>
                <MenuItem value="Meat">🍖 Meat</MenuItem>
                <MenuItem value="Chocolate"> 🍫 Chocolate</MenuItem>
                <MenuItem value="Fish"> 🐟 Fish</MenuItem>
                <MenuItem value="Vege"> 🥗 Vege</MenuItem>
                <MenuItem value="Strawberry"> 🍓 Strawberry</MenuItem>
                <MenuItem value="default"> 🍲 Others</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mb-4">
            <h3 className="block text-gray-700 text-sm font-bold mb-2">
              Ingredients
            </h3>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Amount"
                  value={ingredient.amount}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                <IconButton
                  onClick={() => handleRemoveIngredient(index)}
                  disabled={ingredients.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={handleAddIngredient}>
                  <AddIcon />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Recipe Instructions
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Updating..." : "Update Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
