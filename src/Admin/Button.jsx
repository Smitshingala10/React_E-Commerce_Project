import React from "react";
import Item1 from "./Item1";

const Button = (props) =>{
    return(
        <>
            <div className="formButton">
                <li onClick={props.buttonclick} style={{background:props.color}} >{props.name}</li> 
            </div>
        </>
    )
}

export default Button;