import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DataContext from './context/DataContext';
import SuccessMsg, {ErrMsg, ErrorMsg} from './components/GenMsg';
import {setLocal, getLocal, deleteLocal, setSession, getSession, deleteSession} from './components/GenStorage';
import axios from './api/axios';
import WebRoute from "./routes/WebRoute";
import SuccessToast, {ErrorToast} from './components/Toast';

const App = () => {
  const [categories, setCategories] = useState(getSession("categories"));
  const [user, setUser] = useState(getLocal("login"));
  const [cartItems, setCartItems] = useState(getSession("cart_items") || "");
  const [cart, setCart] = useState(getSession("cart") || "");
  const [loginNotice, setLoginNotice] = useState("");
  const [param, setParam] = useState("");

  const handleUserData = (data) => {
    setLocal("login", data);
    setUser(getLocal("login"));
  };
  const handleLoginNotice = message => setLoginNotice(message);
  const handleCart = (updated_items_count) => {
    setSession("cart", updated_items_count);
    setCart(getSession("cart"));
  };
  const handleCartItems = (updated_items) => {
    setSession("cart_items", updated_items);
    setCartItems(getSession("cart_items"));
  }; 
  const handleLogout = (message) => {
    deleteLocal("login");
    handleLoginNotice(message);
    setUser(getLocal("login"));
  }

useEffect((categories) => {

if(!categories){
  axios({
    method: 'get',
    url: "/api/categories"
  })
  .then(res => {
    setSession("categories", res.data);
    setCategories(getSession("categories"));
  })
  .catch(err => {
    console.log(err);
  });
}
}, []);

    return(
        <Router>
          <DataContext.Provider value={{
          user, handleUserData, cart, handleCart, cartItems, handleCartItems, loginNotice, handleLoginNotice, handleLogout, ErrorMsg, categories, SuccessMsg, ErrMsg, setLocal, getLocal, deleteLocal, setSession, getSession, deleteSession, param, setParam, SuccessToast, ErrorToast
          }}>

            <Routes>
            <Route path = "*" element = {<WebRoute />} />
            </Routes>

          </DataContext.Provider>
       </Router>  
    );
};

export default App;
