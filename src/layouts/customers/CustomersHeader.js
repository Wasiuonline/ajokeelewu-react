import React, {useContext, useState} from 'react';
import DataContext from '../../context/DataContext';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { FaUser, FaSignInAlt, FaSpinner, FaLaptop, FaSignOutAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const Header = () => {
    const {user, cart, cartItems} = useContext(DataContext);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e) => {
    e.preventDefault();
    setSearch("");
    }

    if(user){
    navigate("/");
    }
    
    return (
        <div className="header-wrapper header-wrapper1" id="bodyDiv">
        <div className="header header1">
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
        <li><Link to="/logout"><FaSignOutAlt /> Logout</Link></li>
        </>
        :
        <>
        <li><NavLink activeclassname="true" to="/register" className=""><FaLaptop /> Register</NavLink></li>
        <li><NavLink activeclassname="true" to="/login" className=""><FaSignInAlt /> Login</NavLink></li>
        </>
        }
        <li><Link className="cart-counter-display"><FaShoppingCart /> Cart (<span className="cart-items-counter">{cart}</span>)
        <div className="cart-items-display">{cartItems}</div>
        </Link></li>
        </ul>

        <h1>Customers Header</h1>
        
        </div>
        
        </div>
        </div>
    );
};
export default Header;