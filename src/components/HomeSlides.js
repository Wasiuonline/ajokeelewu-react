import React from "react";
import { loadScript, loadStyle } from './LoadFile';

const HomeSlides = () => {

    loadScript("sliderengine/amazingslider.js");
    loadStyle("sliderengine/amazingslider.css");
    loadScript("sliderengine/initslider.js");

    return (
    <div id="amazingslider-wrapper-1" style={{display:"block", position:"relative", maxWidth:"1200px", margin:"0px auto 10px", maxHeight:"600px"}}>
    <div id="amazingslider-1" style={{display:"block", position:"relative", margin:"0 auto"}}>
    <ul className="amazingslider-slides" style={{listStyle:"none"}}> 
    <li><img src="images/slides/slide-1.jpg" alt="Domestic Cleaning" /></li>
    <li><img src="images/slides/slide-2.jpg" alt="Office Cleaning" /></li>
    <li><img src="images/slides/slide-3.jpg" alt="Window Cleaning" /></li>
    </ul>
    </div>
    </div>
    )
}

export default HomeSlides;