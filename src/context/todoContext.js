import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 33,
      title: "Hellow World",
      description: "Say Hi to World",
      priority: "High",
      category: "Work",
      completed: false,
    },
  ],
  toggleTodo: (id) => {},
  addTodo: (title, description, priority, category) => {},
});

const useTodoContext = () => {
  return useContext(TodoContext);
};

export default useTodoContext;
