import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import DataContext from '../../context/DataContext';
import BaseURL from '../../components/BaseURL';

const Nav = () => {

    const {categories, setParam, user} = useContext(DataContext);
    const all_url = user ? `/api/users-cat/all`: `/api/cat/all`;
    return (
        <div className="header-wrapper header-wrapper2">
        <div className="header header2">

        <NavLink activeclassname="true"className=""  to="/" style={{float:"left"}}><img src="images/ajoke-elewu-logo.png" style={{maxHeight:"50px"}} alt="Logo"/></NavLink>
        <button className="collapse"><span></span><span></span><span></span></button>
        <ul className="main-list">
        <li><NavLink activeclassname="true" className="main-link" to="cat/all/"  onClick={() => setParam(all_url)}>All in Stock</NavLink></li>

        {categories?
        Object.values(categories).map(value => { 
        
         return (<li key={value.id}><Link className="main-link">{value.name} <FaAngleDown /></Link>
                <ul className="sub-link login-form border-radius-bottom">
                
                {Object.values(value.subcategories).map(val => { 
                const page_url = user ? `/api/users-cat/${val.slug}`:`/api/cat/${val.slug}`;
                return (<li key={val.id}><NavLink activeclassname="true" className="" to={`/cat/${val.slug}`} onClick={() => setParam(page_url)}>{val.name}</NavLink></li>);
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