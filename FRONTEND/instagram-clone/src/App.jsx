import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserContext from "./context/UserContext";
import NotFound from "./components/NotFound/NotFound";
import Explore from "./components/Explore/Explore";
import Reels from "./components/Reels/Reels";
import "./App.css";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const [authUser, setAuthUser] = useState(null);

  const updateAuthUser = (status) => {
    setAuthUser(status);
  };
  return (
    <>
      <UserContext.Provider value={{ authUser, updateAuthUser }}>
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/reels"
            element={
              <ProtectedRoute>
                <Reels />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/user-profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/:name"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
