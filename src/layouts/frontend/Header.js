import React, {useContext, useState, useEffect} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { FaUser, FaSignInAlt, FaSpinner, FaLaptop, FaSignOutAlt, FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { decode } from 'html-entities';
import { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import "../../css/style.css";
import axios from '../../api/axios';
import DataContext from '../../context/DataContext';

const Header = () => {

    const [search, setSearch] = useState("");
    const [searchResponse, setSearchResponse] = useState("");
    const [searchRotate, setSearchRotate] = useState(false);
    const {user, cart, ErrorToast} = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
      setSearchRotate(true);
      
      if(search){
      axios({
          method: 'post',
          url: "/search",
          data: {search}
      })
      .then(res => {
        setSearchRotate(false); 
        setSearchResponse(res.data);
        console.log(res.data);
      })
      .catch(err => {
        setSearchRotate(false);
        console.log(err);
        ErrorToast(err.response.data.message);
      })
    }else{
      setSearchRotate(false);
    }
  }, [search]);

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
        <form className="general-form col-sm-6" id="form-div" style={{overflow:"visible", position:"relative"}}>
        <div className="form-group has-search" style={{marginBottom: "0px"}}>
        {searchRotate ? <FaSpinner className="form-control-feedback fa-spin" /> : <FaSearch className="form-control-feedback" /> }
        <input type="text" className="form-control" id="search" placeholder="Enter product name here" value={search} onKeyUp={(e)=>setSearch(e.target.value)} onChange={(e)=>setSearch(e.target.value)} />
        </div>

        {searchResponse ?
        <div className="member-search-result border-radius-bottom">
        <div><FaTimes onClick={()=>setSearchResponse("")} className="float-right" /></div>
        <table className="cart-table table-striped table-hover search-table"><tbody>
          
        {Object.keys(searchResponse).map((index)=>{
         return (
          <tr key={index}>
          <td style={{width:"50px", padding:"0"}}><Link style={{padding:"0"}} to={`/details/${searchResponse[index].item_slug}/1`} onClick={()=>setSearchResponse("")}><img src={searchResponse[index].file_name} alt={decode(searchResponse[index].item_name)} style={{width:"100%"}} /></Link></td>
          <td><Link style={{padding:"0"}} to={`/details/${searchResponse[index].item_slug}/1`} onClick={()=>setSearchResponse("")}><b style={{color:"#966"}}>{decode(searchResponse[index].item_name)}</b></Link></td>
          <td style={{width:"70px"}}>{decode(searchResponse[index].item_price)}</td>
          </tr>
          );
        }
        )}

        </tbody></table>
        </div>
        : "" }
        
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