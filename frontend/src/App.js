import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";
import MainLayout from "./components/mainlayout";
import Signup from "./pages/signup";
import LogIn from "./pages/login";
import ProtectedRoute from "./components/protectedRoute";
import AddRecipePage from "./pages/addRecipePage";
import Home from "./pages/home";
import Favourites from "./pages/favourites";
import Community from "./pages/community";
import { SearchProvider } from "./components/searchContext";
import Chatbot from "./components/chatbot";
import Profile from "./pages/profile";
import EditPage from "./pages/edit";
import ViewRecipePage from "./pages/viewRecipePage";
import Courses from "./pages/courses";
import AddEvent from "./pages/addEventPage";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = sessionStorage.getItem("sessionKey");
    if (!user && location.pathname !== "/signup") {
      navigate("/login");
    }
  }, [navigate, location.pathname]);
  return (
    <SearchProvider>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <Home />
                  <Chatbot />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/editRecipe"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <EditPage />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/view"
          element={<ProtectedRoute element={<ViewRecipePage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <Favourites />
                  <Chatbot />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/addNewRecipe"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <AddRecipePage />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <Community />
                  <Chatbot />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/recipes"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <Home />
                  <Chatbot />
                </MainLayout>
              }
            />
          }
        />
      </Routes>
    </SearchProvider>
  );
};

export default App;
