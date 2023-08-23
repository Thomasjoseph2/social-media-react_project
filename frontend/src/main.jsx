import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/profileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";
import AdminHome from "./screens/adminScreens/AdminHome.jsx";
import AdminLoginScreen from "./screens/adminScreens/AdminLogin.jsx";
import UsersList from "./screens/adminScreens/UsersList.jsx";
const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<HomeScreen/>}/>
    <Route  path='/login' element={<LoginScreen/>}/>
    <Route  path='/register' element={<RegisterScreen/>}/>
    {/* private routes */}
    <Route path="" element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfileScreen/>}/>
    </Route>

    {/*admin side routes */}
    <Route  path="admin/home" element={<AdminHome/>}/>
   
    <Route  path='admin/login' element={<AdminLoginScreen/>}/>
    {/* <Route  path='admin/' element={<UsersList/>}/> */}

    <Route path="" element={<AdminPrivateRoute/>}>
         <Route  path='admin/users' element={<UsersList/>}/>
    </Route>
  </Route>
))
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>
 <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
);
