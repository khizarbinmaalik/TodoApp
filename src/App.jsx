import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import authService from "./backend/auth_service";
import { login, logout } from "./features/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const themeFromStore = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    let html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(themeFromStore);
  }, [themeFromStore]);

  useEffect(() => {
    // Check if user is already logged in on app start
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 relative mx-auto">
            <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your app...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
