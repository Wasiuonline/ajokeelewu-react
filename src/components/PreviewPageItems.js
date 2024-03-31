import React, {useState, useEffect} from "react";
import { FormatNumber, UsableNumber } from '../components/General';
import {decode} from 'html-entities';

const PreviewPageItems = ({item}) => {

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
    <td><img src={file_name} alt={decode(item.item_name)} /></td>
    <td><div className="btn btn-success" style={{fontSize:"10px!important", padding:"2px"}}>{item.status.item_status}</div> {decode(item.item_name)}<br /><b style={{color:"#966"}}>{item.sizes[item.selected_size].size}</b> (<b style={{color:"#f11"}}>{item.selected_qty} unit{item.selected_qty !== "1" ? "s":""}</b> <b>@ {decode(item.item_price)} each</b>)</td>
    <td className="align-right">{FormatNumber(total_price)}</td>
    </tr>

    )
    
}

export default PreviewPageItems;