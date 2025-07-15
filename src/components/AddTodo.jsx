import { useState } from "react";
import databaseServices from "@/backend/database_services";
import { useSelector } from "react-redux";
import { CheckCircle, X } from "lucide-react";

function Form() {
  const [todoMsg, setTodoMsg] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    const todo = {
      title: todoTitle,
      description: todoMsg,
      category: category,
      priority: priority,
      completed: false,
    };

    if (todoTitle && todoMsg && category && priority) {
      try {
        await databaseServices.createTodo({ ...todo, userId: user.$id });
        setTodoTitle("");
        setTodoMsg("");
        setCategory("Personal");
        setPriority("Medium");
        
        // Show success popup
        setShowSuccessPopup(true);
        
        // Auto hide popup after 3 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      } catch (error) {
        alert("Failed to add todo. Please try again.");
      }
    } else {
      alert("Please fill all fields");
    }
    setLoading(false);
  }

  return (
    <>
      {/* Success Popup */}
      {showSuccessPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-green-200 dark:border-green-700 p-6 max-w-sm w-full transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Success!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Task added successfully
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
              <p className="text-sm text-green-700 dark:text-green-300">
                Your task has been added to your todo list. You can view it in the "All Todos" section.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform hover:shadow-3xl border border-gray-100 dark:border-slate-700">
        <div className="relative">
          <div className="p-8 pb-0">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 p-4 rounded-2xl shadow-lg ring-4 ring-blue-100 dark:ring-blue-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
              Add New Task
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 mb-8">
              Organize your tasks efficiently
            </p>
          </div>
        </div>

        <form className="px-8 pb-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="task"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Task Title
              </label>
              <input
                id="task"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                type="text"
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white transition duration-300 outline-none placeholder-slate-400 dark:placeholder-slate-400 shadow-sm hover:shadow-md"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                rows="4"
                placeholder="Add details about your task..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white transition duration-300 outline-none placeholder-slate-400 dark:placeholder-slate-400 shadow-sm hover:shadow-md resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white transition duration-300 outline-none appearance-none shadow-sm hover:shadow-md cursor-pointer bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjQ3NDhiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option className="text-slate-900 dark:text-white bg-white dark:bg-slate-700">
                    Personal
                  </option>
                  <option className="text-slate-900 dark:text-white bg-white dark:bg-slate-700">
                    Work
                  </option>
                  <option className="text-slate-900 dark:text-white bg-white dark:bg-slate-700">
                    Health
                  </option>
                  <option className="text-slate-900 dark:text-white bg-white dark:bg-slate-700">
                    Education
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  Priority
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-white transition duration-300 outline-none appearance-none shadow-sm hover:shadow-md cursor-pointer bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjQ3NDhiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')]"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option className="text-slate-900 dark:text-white bg-white dark:bg-slate-700">
                    Low
                  </option>
                  <option className="text-slate-900 dark:text-white bg-white dark:bg-slate-700">
                    Medium
                  </option>
                  <option className="text-slate-900 dark:text-white bg-white dark:bg-slate-700">
                    High
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/30 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={(e) => handleClick(e)}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              {loading ? "Adding Task..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default Form;
