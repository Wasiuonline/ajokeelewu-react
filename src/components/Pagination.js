import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {decode} from 'html-entities';
import { FaSpinner } from "react-icons/fa";

const Pagination = ({links, setParam, param, pageUrl}) => {
  const [clicked, setClicked] = useState("temp");
  return (
    <div className="page-nos">
     {Object.values(links).map((value, index) => { 
        let parUrl = value.url;
        let detPn = parUrl && parUrl.indexOf("=") > 0 ? parUrl.split("=")[1] : 1;
        return <Link to={`${pageUrl}${detPn}`} key={index} onClick={(e)=>{setParam(parUrl); setClicked(index);}} className={value.active ? "active":""}>{param===parUrl && clicked === index ? <FaSpinner className="fa-spin" /> : ""} {decode(value.label)}</Link>
     })}
     </div>
  )
}

export default Pagination;
