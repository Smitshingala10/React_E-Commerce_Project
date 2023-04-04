import React from "react";  
import Header from "./Header";
import Footer from "./Footer";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Thankyou = () =>{
    const [id, setId] = useState()
    useEffect(()=>{
        axios.get("http://localhost:3200/checkout").then((result)=>{
            result.data.map((element,index)=>{
                setId(index+1);
                console.log(index+1);
            })
        })
    },[])
    return(
        <>
            <Header />
            {/* thanks page start */}
            <div class="vh-100 d-flex justify-content-center align-items-center">
                <div class="col-md-4">
                    <div class="border border-3 border-success"></div>
                    <div class="card  bg-white shadow p-5">
                        <div class="mb-4 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-success bi bi-check-circle" width="75" height="75"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                            </svg>
                        </div>
                        <div class="text-center">
                            <h1>Thank You !</h1>
                            <h5>For Your Order</h5>
                            <h5>Order Id : {id}</h5>
                            <button class="btn btn-outline-success"><NavLink style={{color:'#212529'}} exact activeClassName="change" to="/">Back Home</NavLink></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* thanks page end */}
            <Footer />
        </>
    )
}

export default Thankyou