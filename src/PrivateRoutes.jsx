import React, { useEffect, useState } from "react";
import { Outlet, Navigate} from "react-router-dom";import Shop from "./frontEnd/Shop";

const  PrivateRoutes = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    
    useEffect(()=>{
        const user1 = JSON.parse(localStorage.getItem('user'));
        console.log('user1',user1);
        if (user1 === null) {
            setIsLoggedIn(false)
        }
    },[])
    return(
        <>
           {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}

export default PrivateRoutes