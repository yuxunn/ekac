import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import Loading from "../animations/loading";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddRecipePage = () => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [docId, setDocId] = useState("");
  const [recId, setRecId] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const {
        title,
        level,
        time,
        calories,
        type,
        description,
        docId,
        recId,
      } = location.state;

      setTitle(title);
      setLevel(level);
      setTime(time);
      setCalories(calories);
      setType(type);
      setDescription(description || "");
      setIngredients(ingredients || [{ name: "", amount: "" }]);
      setDocId(docId);
      setRecId(recId);
    }
  }, [location.state]);

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
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    const invalidIngredients = ingredients.some(
      (ingredient) => !ingredient.name.trim() || !ingredient.amount.trim()
    );

    if (invalidIngredients) {
      // alert("Please provide both name and amount for all ingredients.");
      setIsSubmitting(false);
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const isNewRecipe = !docId;
        const userRecipeRef = isNewRecipe
          ? doc(collection(db, "users", user.uid, "recipes"))
          : doc(db, "users", user.uid, "recipes", recId);

        const recipeData = {
          title,
          level,
          time: Math.max(1, time),
          calories: Math.max(1, calories),
          type,
          description,
          userId: user.uid,
          createdAt: new Date(),
          recId: userRecipeRef.id,
          ingredients,
          upvotes: 0,
          downvotes: 0,
        };

        await setDoc(userRecipeRef, recipeData);
        const newRecId = userRecipeRef.id;
        setRecId(newRecId);

        let imageUrl = "";

        if (image) {
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `recipes/${user.uid}/${newRecId}/${image.name}`
          );
          console.log("Uploading image:", image.name);
          await uploadBytes(storageRef, image);
          console.log("Image uploaded successfully");
          imageUrl = await getDownloadURL(storageRef);
          console.log("Image URL:", imageUrl);

          await setDoc(userRecipeRef, { imageUrl }, { merge: true });
        }

        const globalRecipeRef = isNewRecipe
          ? doc(collection(db, "recipes"))
          : doc(db, "recipes", newRecId);

        await setDoc(globalRecipeRef, { ...recipeData, imageUrl });

        console.log("Recipe added/updated successfully in both collections");
        navigate("/home", { state: { recId: newRecId } });
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.error("Error adding/updating recipe:", error.message);
      alert("Error adding/updating recipe: " + error.message);
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
        <h2 className="text-2xl font-bold mb-6 text-center">
          {docId ? "Edit Recipe" : "Add New Recipe"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Recipe Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Recipe Title
            </label>
            <input
              required
              type="text"
              id="title"
              placeholder="Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="level"
            >
              Level
            </label>

            <FormControl fullWidth>
              <Select
                required
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
          <div className="mb-6">
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
          <div className="mb-6">
            <div className="mb-6">
              <h3 className="block text-gray-700 text-sm font-bold mb-2">
                Ingredients
              </h3>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Ingredient"
                    required
                    value={ingredient.name}
                    onPaste={preventPasteNegative}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    className="w-full p-3 border rounded-lg mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    value={ingredient.amount}
                    onPaste={preventPasteNegative}
                    required
                    onChange={(e) =>
                      handleIngredientChange(index, "amount", e.target.value)
                    }
                    className="w-full p-3 border rounded-lg ml-2"
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Recipe Instructions
            </label>
            <textarea
              required
              id="description"
              placeholder="Write a detailed description of the recipe..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-400 text-white rounded-lg hover:from-blue-400 hover:to-pink-500"
          >
            {isSubmitting ? "Adding Recipe..." : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
