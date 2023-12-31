import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {decode} from 'html-entities';
import { FaSpinner } from "react-icons/fa";

const Pagination = ({links, setParam, param}) => {
  const [clicked, setClicked] = useState("temp");
  return (
    <div className="page-nos">
     {Object.values(links).map((value, index) => { 
        return <Link key={index} onClick={(e)=>{setParam(value.url); setClicked(index);}} className={value.active ? "active":""}>{param==value.url && clicked === index ? <FaSpinner className="fa-spin" /> : ""} {decode(value.label)}</Link>
     })}
     </div>
  )
}

export default Pagination;
