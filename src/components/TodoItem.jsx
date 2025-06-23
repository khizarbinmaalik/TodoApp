import { useState } from "react";
import useTodoContext from "../context/todoContext";

function TodoItem({ todo }) {
  const { toggleCompleted, deleteTodo, updateTodo } = useTodoContext();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isEditable, setIsEditable] = useState(false);

  const handleUpdateButton = () => {
    if (isEditable) {
      editTodo();
    } else {
      setIsEditable(true);
    }
  };

  const editTodo = () => {
    updateTodo(todo.id, title, description);
    setIsEditable(false);
  };

  // Priority colors
  const priorityColors = {
    High: {
      bg: "bg-red-500",
      text: "text-red-600 dark:text-red-400",
    },
    Medium: {
      bg: "bg-yellow-500",
      text: "text-yellow-600 dark:text-yellow-400",
    },
    Low: {
      bg: "bg-green-500",
      text: "text-green-600 dark:text-green-400",
    },
  };

  // Category colors
  const categoryColors = {
    Work: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Health: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Education:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Personal:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
        todo.completed ? "opacity-70" : "hover:shadow-md"
      }`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <span
              className={`w-2.5 h-2.5 rounded-full mr-2 ${
                priorityColors[todo.priority].bg
              }`}
            ></span>
            <span
              className={`text-xs font-semibold ${
                priorityColors[todo.priority].text
              }`}
            >
              {todo.priority}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-1">
            {isEditable ? (
              <button
                className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                onClick={editTodo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17 16v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1h12a1 1 0 011 1zM16.293 7.293a1 1 0 00-1.414 0L9 13.172l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                </svg>
              </button>
            ) : (
              <button
                className={`p-1.5 rounded-lg transition-colors ${
                  todo.completed
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={handleUpdateButton}
                disabled={todo.completed}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    todo.completed
                      ? "text-gray-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}

            <button
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => deleteTodo(todo.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-3 flex items-start">
          <div className="flex items-start mr-3 mt-1">
            <input
              type="checkbox"
              className={`h-5 w-5 rounded-full border-2 mt-1 ${
                todo.completed
                  ? "border-green-500 text-green-500"
                  : "border-indigo-500 text-indigo-500"
              } focus:ring-0 focus:ring-offset-0 cursor-pointer`}
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              {isEditable ? (
                <input
                  type="text"
                  className={`text-lg font-semibold w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg px-3 py-2 mb-1 border ${
                    isEditable
                      ? "border-indigo-300 dark:border-indigo-500"
                      : "border-transparent"
                  }`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              ) : (
                <h3
                  className={`text-lg font-semibold truncate ${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  {title}
                </h3>
              )}

              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  categoryColors[todo.category]
                }`}
              >
                {todo.category}
              </span>
            </div>

            {isEditable ? (
              <textarea
                className={`mt-1 w-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg px-3 py-2 border ${
                  isEditable
                    ? "border-indigo-300 dark:border-indigo-500"
                    : "border-transparent"
                } min-h-[80px]`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
            ) : (
              <p
                className={`mt-1 text-gray-600 dark:text-gray-300 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Created: {new Date(todo.id).toLocaleDateString()}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {todo.completed ? "Completed" : "Pending"}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
