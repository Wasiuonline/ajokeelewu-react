import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {decode} from 'html-entities';
import { FaSpinner } from "react-icons/fa";

const Pagination = ({links, setParam, paramLoader}) => {

  return (
    <div className="page-nos">
    {paramLoader?<p className="align-center" style={{paddingTop:"20px"}}><FaSpinner className="fa-spin" style={{fontSize:"25px"}} /></p>:""}
     {Object.values(links).map((value, index) => { 
        return <Link key={index} onClick={()=>setParam(value.url)} className={value.active ? "active":""}>{decode(value.label)}</Link>
     })}
     </div>
  )
}

export default Pagination;
