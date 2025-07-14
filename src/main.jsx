import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import App from "./App";
import  HomePage  from "./pages/HomePage.jsx";
import {LoginForm, SignUpForm, AuthLayout} from "./components";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App></App>}>
    <Route path= "" element = {<HomePage/>}/>
    <Route path="login" element={<AuthLayout authentication = {false}><LoginForm /></AuthLayout>} />
    <Route path="signup" element={<AuthLayout authentication = {false}><SignUpForm /></AuthLayout>} />
  </Route>
))
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
