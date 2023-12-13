import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
//import './css/style.css';
//import App from './App';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './webpages/Home';
import About from './webpages/About';
import Contact from './webpages/Contact';
import Login from './webpages/Login';
import Register from './webpages/Register';
import Logout from './webpages/Logout';
import ForgotPassword from './webpages/ForgotPassword';
import Missing from './webpages/Missing';
import DataContext from './context/DataContext';
import ErrorMsg from "./components/ErrorMsg";
import axios from './api/axios';

const WebPages = () => {
  const [categories, setCategories] = useState(JSON.parse(sessionStorage.getItem("categories")));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("login")));
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState("");
  const [loginNotice, setLoginNotice] = useState("");
  const handleUserData = () => setUser(JSON.parse(localStorage.getItem("login")));
  const handleLoginNotice = message => setLoginNotice(message);
  const handleCart = () => setCart(JSON.parse(localStorage.getItem("cart")));
  const handleCartItems = () => setCartItems(JSON.parse(localStorage.getItem("cart_items"))); 
  const handleLogout = (message) => {
    localStorage.removeItem("login");
    handleUserData();
    handleLoginNotice(message);
  }

if(!categories){
  axios({
    method: 'get',
    url: "/api/categories"
  })
  .then(res => {
    sessionStorage.setItem("categories", JSON.stringify(res.data));
    setCategories(JSON.parse(sessionStorage.getItem("categories")));
  })
  .catch(err => {
    console.log(err);
  });
}

    return(
        <Router>
          <DataContext.Provider value={{
          user, handleUserData, cart, handleCart, cartItems, handleCartItems, loginNotice, handleLoginNotice, handleLogout, ErrorMsg, categories
          }}>
          <Header />
          <Nav />
          <Routes>
            <Route exact path = "/" element = {<Home />} />
            <Route path = "/about" element = {<About />} />
            <Route path = "/contact" element = {<Contact />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/register" element = {<Register />} />
            <Route path = "/logout" element = {<Logout />} />
            <Route path = "/forgot-password" element = {<ForgotPassword />} />
            <Route path = "*" element = {<Missing />} />
          </Routes>
          <Footer />
          </DataContext.Provider>
       </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebPages />
  </React.StrictMode>
);
