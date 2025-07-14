import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
function App() {
  const themeFromStore = useSelector((state) => state.theme.theme);

  // const addTodo = (todo) => {
  //   setTodos([...todos, todo]);
  // };

  // const updateTodo = (id, title, msg) => {
  //   setTodos((preVal) =>
  //     preVal.map((todo) =>
  //       todo.id === id ? { ...todo, title, description: msg } : todo
  //     )
  //   );
  // };

  // const deleteTodo = (id) => {
  //   setTodos((preVal) => preVal.filter((todo) => todo.id !== id));
  // };

  // const toggleCompleted = (id) => {
  //   setTodos((preVal) =>
  //     preVal.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // };

  // // Getting all the Todos from the local Storage when the App Loades
  // useEffect(() => {
  //   const savedTodos = JSON.parse(localStorage.getItem("todos"));
  //   if (Array.isArray(savedTodos) && savedTodos?.length > 0) {
  //     setTodos(savedTodos);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  useEffect(() => {
    let html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(themeFromStore);
  }, [themeFromStore]);


  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
