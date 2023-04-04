import React from "react";
import Home from "./frontEnd/Home";
import { Router, BrowserRouter, Route, Routes, Switch } from "react-router-dom";import Shop from "./frontEnd/Shop";
import Admin from "./Admin/Admin";
import Categories from "./Admin/Categories";
import Brand from "./Admin/Brand";
import Color from "./Admin/Color";
import Size from "./Admin/Size";
import Product from "./Admin/Product";
import Singleshop from "./frontEnd/Singleshop";
import {createBrowserHistory} from 'history';
import Cart from "./frontEnd/Cart";
import Favorite from "./frontEnd/Favorite";
import Checkout from "./frontEnd/Checkout";
import Login from "./frontEnd/Login";
import Userdetail from "./frontEnd/Userdetail";
import Thankyou from "./frontEnd/Thankyou";
import Order from "./frontEnd/Order";
import PrivateRoutes from "./PrivateRoutes";

export const history = createBrowserHistory();
const App = () => {
  return (
    <>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/shop' element={<Shop/>} />
          <Route exact path='/shop/:categorieFullName' element={<Shop/>} />
          <Route exact path='/admin' element={<Categories/>} />
          <Route exact path='/brand' element={<Brand/>} />
          <Route exact path='/color' element={<Color/>} />
          <Route exact path='/size' element={<Size/>} />
          <Route exact path='/product' element={<Product/>} />
          <Route exact path='/singleshop/:id' element={<Singleshop/>} /> 
          <Route exact path='/login' element={<Login/>} />
          <Route element={<PrivateRoutes />}>
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/user' element={<Userdetail />} />
            <Route exact path='/favorite' element={<Favorite />} />
            <Route exact path='/checkout' element={<Checkout />} />
            <Route exact path='/thanks' element={<Thankyou />} />
            <Route exact path="/order" element={<Order />} />
          </Route>
        </Routes>
    </>
  )
}

export default App;