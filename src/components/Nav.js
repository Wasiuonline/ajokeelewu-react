import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import DataContext from '../context/DataContext';

const Nav = () => {

    const {categories} = useContext(DataContext);

    return (
        <div className="header-wrapper header-wrapper2">
        <div className="header header2">

        <NavLink activeclassname="true"className=""  to="/" style={{float:"left"}}><img src="images/ajoke-elewu-logo.png" style={{maxHeight:"50px"}} alt="Logo"/></NavLink>
        <button className="collapse"><span></span><span></span><span></span></button>
        <ul className="main-list">
        <li><NavLink activeclassname="true" className="main-link" to="cat/all/">All in Stock</NavLink></li>

        {categories?
        categories.map(value => { 
        
         return (<li><Link className="main-link">{value.name} <FaAngleDown /></Link>
                <ul className="sub-link login-form border-radius-bottom">
                
                {value.subcategories.map(val => { 
                return (<li key={val.id}><NavLink activeclassname="true" className="" to={`/cat/${val.slug}`}>{val.name}</NavLink></li>);
                })}
                
                </ul>
            </li>);
         
            }) : "" }

        <li><NavLink activeclassname="true" className="main-link" to="/contact"><i className="fa fa-phone" aria-hidden="true"></i> Contact</NavLink></li>
        </ul>
        </div>
        </div>
    );
};
export default Nav;