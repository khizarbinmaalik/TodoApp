import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logout } from "../../features/authSlice.js";
import authService from "../../backend/auth_service.js";
import { useState } from "react";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logoutHandler = async () => {
    setIsLoggingOut(true);
    
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails on the server, clear local state
      dispatch(logout());
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      disabled={isLoggingOut}
      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogOut className="h-4 w-4" />
      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </button>
  );
}

export default LogoutBtn;
