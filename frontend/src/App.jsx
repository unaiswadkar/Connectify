import React from "react";
import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import SettingsPage from "./Pages/SettingsPage";
import ProfilePage from "./Pages/ProfilePage";
import { userAuthStore } from "./Store/useAuthStore";
import { useThemeStore } from "./Store/useThemeStore";

import { useEffect } from "react";
import { Loader, Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = userAuthStore();

  const { theme } = useThemeStore();
  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Apply DaisyUI theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
      <div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
