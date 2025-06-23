import { useEffect, useState } from "react";
import Form from "./components/Form";
import TodoItem from "./components/TodoItem";
import { TodoContext } from "./context/todoContext";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light");

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (id, title, msg) => {
    setTodos((preVal) =>
      preVal.map((todo) =>
        todo.id === id ? { ...todo, title, description: msg } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((preVal) => preVal.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((preVal) =>
      preVal.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Getting all the Todos from the local Storage when the App Loades
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (Array.isArray(savedTodos) && savedTodos?.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    let html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(theme);
  }, [theme]);

  return (
    <TodoContext
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleCompleted }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <header className="py-6 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Todo App
            </h1>
            <button
              onClick={() =>
                setTheme((preVal) => (preVal === "light" ? "dark" : "light"))
              }
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              <span className="text-xl">{theme === "light" ? "🌙" : "☀️"}</span>
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="lg:w-2/5">
              <Form />
            </div>

            {/* Todo List Section */}
            <div className="lg:w-3/5">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Your Tasks
                  <span className="ml-2 text-sm font-normal bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 py-1 px-2.5 rounded-full">
                    {todos.length}
                  </span>
                </h2>

                {todos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                      No tasks yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Add your first task to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todos.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoContext>
  );
}

export default App;
