import React, {useContext, useState} from 'react';
import DataContext from '../../context/DataContext';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { FaUser, FaSignInAlt, FaSpinner, FaLaptop, FaSignOutAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import "../../css/style.css";

const Header = () => {
    const {user, cart, cartItems} = useContext(DataContext);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e) => {
    e.preventDefault();
    setSearch("");
    }
    const showSwal = () => {
        swal({
            title: "Logout Confirmation",
            text: "Are you sure you want to logout?",
            icon: "info",
            buttons: ["No", "Yes"]
          }).then((value) => {
            if(value === true){navigate("/logout")}
          });
    }

    return (
        <div className="header-wrapper header-wrapper1" id="bodyDiv">
        <div className="header header1">
        <div><Toaster/></div>
        <form className="general-form col-sm-6" id="form-div" style={{overflow:"visible"}}>
        <div className="form-group has-search" style={{marginBottom: "0px"}}>
        <FaSearch className="form-control-feedback" />
        <input type="text" className="form-control" name="search_item" id="search" placeholder="Enter product name here" value={search} onKeyUp={handleSearch} onChange={handleSearch} />
        </div>
        <div className="member-search-wrapper" style={{overflow: "visible"}}>
        <div id="member-search-loader" className="align-center"><FaSpinner className="fa-spin" /></div>
        <div id="member-search-result" className="border-radius-bottom"></div>
        </div>
        </form>
        
        <div className="col-sm-6 log-links">
        
        <ul className="top-ul">
        {user ? <>
        <li><Link to="/users"><FaUser /> My Portal</Link></li>
        {user.admin ?
        <li><Link to="/admin"><MdSpaceDashboard /> Admin</Link></li>
        :""
        }
        <li><Link onClick={()=>showSwal()}><FaSignOutAlt /> Logout</Link></li>
        </>
        :
        <>
        <li><NavLink activeclassname="true" to="/register" className=""><FaLaptop /> Register</NavLink></li>
        <li><NavLink activeclassname="true" to="/login" className=""><FaSignInAlt /> Login</NavLink></li>
        </>
        }
        <li><Link to="/cart" className="cart-counter-display"><FaShoppingCart /> Cart <span className="cart-items-counter">{cart ? `(${cart})` : `(0)`}</span>
        <div className="cart-items-display"></div>
        </Link></li>
        </ul>
        
        </div>
        
        </div>
        </div>
    );
};
export default Header;