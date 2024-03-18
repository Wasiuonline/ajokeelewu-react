import React from "react";
import {Link} from "react-router-dom";
import {decode} from 'html-entities';
import { loadScript, loadStyle } from './LoadFile';

const ItemDetails = ({item, user, setPageIndex, setItemSize, itemQty, setItemQty, showSwal}) => {

    if(item.item_id && Object.keys(item).length > 0){

    loadScript("js/fotorama.js");
    loadStyle("css/fotorama.css");

    return (

    <div>

    <div className="col-md-7 remove-overflow">

    {(item.images && Object.keys(item.images).length > 0) &&
    <div className="fotorama" data-width="600" data-ratio="3/2" data-nav="thumbs" data-thumbheight="48">
    {Object.keys(item.images).map((index) => { 
    return <Link to={item.images[index]}><img src={item.images[index]} alt={`${decode(item.item_name)} ${index+1}`} /></Link>
    })}
    </div>
    }

    </div>
    <div className="col-md-5 padding-20">
    <h2 style={{fontWeight:"900"}}>{decode(item.item_name)} {item.status.id===2 && <span className="status">{item.status.item_status}</span>}</h2>
    <div className="item-price item-price2">{decode(item.item_price)}</div>

    <hr style={{border:"#dde 1px solid"}} />

    <h3>Details</h3>
    <div dangerouslySetInnerHTML = {{__html: item.item_details}}></div>

    <hr style={{border:"#dde 1px solid", marginBottom:"40px"}} />

    {item.status.id===1 &&
    <>

    {item.sizes && Object.keys(item.sizes).length > 0 ?
    <div className="col-md-12 padding-0">
    <select className="form-control" onChange={(e)=>setItemSize(parseInt(e.target.value))}>
    {Object.keys(item.sizes).map((index) => { 
    return <option value={index}>{item.sizes[index].size}</option>
    })}
    </select>
    <br /><br />
    </div>
    : ""
    }

    <div className="col-md-7 padding-0">
    <input type="number" className="form-control only-no" placeholder="Quantity to be ordered" style={{height:"42px"}} value={itemQty} required onChange={(e)=>setItemQty(parseInt(e.target.value))} />
    </div>
    <div className="col-md-5 padding-0">
    <button type="button" className="btn gen-btn add-to-cart2" style={{width:"100%", height:"42px"}} id="process-cart" onClick={()=>setPageIndex("details")}><i className="fa fa-shopping-cart"></i> Add to cart</button>
    </div>

    </>
    }

    </div>


    </div>

    )
    }
}

export default ItemDetails;