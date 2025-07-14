import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CheckSquare, Plus, List, Sparkles, Clock, Target } from "lucide-react";

function HomePage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <CheckSquare className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TodoApp
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your simple and elegant solution for managing tasks and staying productive. 
              Organize your life, one todo at a time.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple & Clean</h3>
              <p className="text-gray-600">
                Beautiful, intuitive interface that makes managing tasks a joy.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Organized</h3>
              <p className="text-gray-600">
                Keep track of all your tasks and never miss an important deadline.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Things Done</h3>
              <p className="text-gray-600">
                Focus on what matters most and achieve your goals efficiently.
              </p>
            </div>
          </div>

          {/* Login Reminder */}
          <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Ready to boost your productivity?</h2>
            <p className="text-blue-100 mb-4">
              Please sign in using the navigation above to access all features and start managing your todos like a pro!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show dashboard for logged in users
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-blue-100">
            Ready to tackle your tasks? Let's make today productive!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/add-todo"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group block"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add New Todo</h3>
                <p className="text-gray-600">Create a new task to stay organized</p>
              </div>
            </div>
          </Link>

          <Link
            to="/all-todos"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group block"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                <List className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">View All Todos</h3>
                <p className="text-gray-600">Manage and track your existing tasks</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats or Recent Activity Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Productivity Hub</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <div className="text-sm text-green-700">Completed Today</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600 mb-2">0</div>
              <div className="text-sm text-yellow-700">Pending Tasks</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-sm text-blue-700">Total Tasks</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Start adding todos to see your productivity stats here! Use the navigation above to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;