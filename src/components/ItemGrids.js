import React from "react";
import {Link} from "react-router-dom";
import { FaShoppingCart, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import {decode} from 'html-entities';


const ItemGrids = ({item, user, index, setPageIndex, showSwal}) => {

    if(item.item_id &&  Object.keys(item).length > 0){
    return (
    <div className="item-inner white-bg shadow border-radius">

    <div className="item-picture">
    <Link to={`details/${item.item_slug}/pn/1`}><span className="img-div border-radius" style={{backgroundImage:`url(${item.file_name})`, WebkitBackgroundSize:"cover", MozBackgroundSize:"cover", OBackgroundSize:"cover", backgroundSize:"cover", backgroundRepeat: "no-repeat", backgroundPosition: "top center"}}>{item.status.id===2 && <span className="status">{item.status.item_status}</span>}</span></Link>
    </div>

    <div className="item-title"><Link to={`details/${item.item_slug}/pn/1`}>{decode(item.item_name)}</Link>
    <div className="item-price">{decode(item.item_price)}</div>
    <div className="item-old-price"><s>{decode(item.item_old_price)}</s></div>
    <div className="item-options">

    <div className="tooltip add-to-cart" onClick={()=>setPageIndex(index)}><Link><FaShoppingCart /></Link><span className="tooltiptext">Add to cart</span></div>

    {user?
    <div className="tooltip gen-save" name={item.item_id} id={`save${item.item_id}`}>
    {user.saved_items? <><Link><FaHeart className="gen-heart" /></Link><span className="tooltiptext">Unsave item</span></>:<><Link><FaRegHeart className="gen-heart" /></Link><span className="tooltiptext">Save item</span></>}
    </div>
    :
    <div className="tooltip">
    <Link onClick={showSwal}><FaRegHeart /></Link>
    <span className="tooltiptext">Save item</span>
    </div>
    }

    <div className="tooltip"><Link to={`details/${item.item_slug}/pn/1`}><FaEye /></Link><span className="tooltiptext">View details</span></div>

    </div>
    </div>
    </div>
    )
    }
    
}

export default ItemGrids;