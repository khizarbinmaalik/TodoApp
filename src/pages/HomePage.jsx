import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CheckSquare, Plus, List, Sparkles, Clock, Target } from "lucide-react";
import { useEffect, useState } from "react";
import databaseServices from "../backend/database_services.js";
import { addTodos, setEmpty } from "../features/todosSlice.js";
function HomePage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const todos = useSelector((state) => state.todos.todos);
  const [completedTodos, setCompletedTodos] = useState(0);
  const [pendingTodos, setPendingTodos] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear todos when user changes
    if (user?.$id && user.$id !== currentUserId) {
      dispatch(setEmpty());
      setCurrentUserId(user.$id);
    }
  }, [user?.$id, currentUserId, dispatch]);

  useEffect(() => {
    // Only fetch if user exists and is logged in
    if (user?.$id && isLoggedIn && todos.length === 0) {
      const fetchTodos = async () => {
        try {
          const todos = await databaseServices.getTodos(user.$id);
          dispatch(addTodos(todos));
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        }
      };
      fetchTodos();
    }
  }, [user?.$id, isLoggedIn, todos.length]);

  useEffect(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    const pending = todos.length - completed;
    setCompletedTodos(completed);
    setPendingTodos(pending);
  }, [todos]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <CheckSquare className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                TodoApp
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Your simple and elegant solution for managing tasks and staying
              productive. Organize your life, one todo at a time.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
              <Sparkles className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Simple & Clean
              </h3>
              <p className="text-gray-600 dark:text-slate-300">
                Beautiful, intuitive interface that makes managing tasks a joy.
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
              <Clock className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Stay Organized
              </h3>
              <p className="text-gray-600 dark:text-slate-300">
                Keep track of all your tasks and never miss an important
                deadline.
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
              <Target className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Get Things Done
              </h3>
              <p className="text-gray-600 dark:text-slate-300">
                Focus on what matters most and achieve your goals efficiently.
              </p>
            </div>
          </div>

          {/* Login Reminder */}
          <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Ready to boost your productivity?
            </h2>
            <p className="text-blue-100 dark:text-blue-200 mb-4">
              Please sign in using the navigation above to access all features
              and start managing your todos like a pro!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show dashboard for logged in users
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-8 rounded-2xl mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-blue-100 dark:text-blue-200">
            Ready to tackle your tasks? Let's make today productive!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/add-todo"
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow group block"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Todo
                </h3>
                <p className="text-gray-600 dark:text-slate-300">
                  Create a new task to stay organized
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/all-todos"
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow group block"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                <List className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  View All Todos
                </h3>
                <p className="text-gray-600 dark:text-slate-300">
                  Manage and track your existing tasks
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats or Recent Activity Section */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Productivity Hub
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {completedTodos}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Completed Today
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {pendingTodos}
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                Pending Tasks
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {todos.length}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Total Tasks
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-slate-300 mb-4">
              Start adding todos to see your productivity stats here! Use the
              navigation above to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
