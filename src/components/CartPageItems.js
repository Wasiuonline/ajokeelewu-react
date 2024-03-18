import React, {useState, useEffect} from "react";
import { FaUpload } from "react-icons/fa";
import { AppCurr, FormatNumber, UsableNumber } from '../components/General';
import {decode} from 'html-entities';

const CartPageItems = ({item, index, setPageIndex}) => {

    const [selectedQty, setSelectedQty] = useState(item.selected_qty);

    let file_name = item.images ? item.images[0] : item.file_name;
    let total_price = UsableNumber(item.item_price) * item.selected_qty;

    useEffect(() => {
        if(selectedQty !== item.selected_qty){
        setSelectedQty(item.selected_qty);
        }
    }, [item]);

    return (

    <tr>
    <td>
    <img src={file_name}  style={{width:"150px"}} alt={decode(item.item_name)} /> <br /><br />
    <div className="btn btn-success" style={{padding:"2px", fontSize:"10px!important"}}>{item.status.item_status}</div> <b style={{color:"#966"}}>{decode(item.item_name)}</b> @ {decode(item.item_price)} each.
    </td>
    <td>
    {item.sizes && Object.keys(item.sizes).length > 0 ?
    <select className="form-control" id={`${index}_size`} defaultValue={item.selected_size}>
    {Object.keys(item.sizes).map((index) => { 
    return <option value={index} key={index}>{item.sizes[index].size}</option>
    })}
    </select>
    : ""
    }
    </td>
    <td>
    <div><div className="col-sm-6" style={{padding:"0px"}}>
    <input className="form-control" type="number" id={`${index}_qty`} value={selectedQty} onChange={(e)=>setSelectedQty(e.target.value)} />
    </div><div className="col-sm-6 align-right" style={{fontWeight:"900", padding:"0px"}}>
    {decode(AppCurr)}{FormatNumber(total_price)}
    </div></div>
    <div style={{paddingTop:"10px"}}><button type="button" className="gen-btn float-right" onClick={()=>setPageIndex(index)}><FaUpload /> Update</button></div>
    
    </td>
    </tr>

    )
    
}

export default CartPageItems;