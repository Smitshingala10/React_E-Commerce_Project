import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Order = () => {
    const [userdata, setUserData] = useState([]);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));   
        setUserData(user);
        axios.get("http://localhost:3200/checkout").then((result)=>{
            const found = result.data.filter((element)=> element.userId === user.userId);
            setOrder(found);
        })
    },[])
    return (
        <>
            <Header />
            <section class="h-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-10 col-xl-8">
                            <div class="card" style={{ borderRadius: "10px" }}>
                                <div class="card-header px-4 py-5">
                                    <h5 class="text-muted mb-0">Thanks for your Order, <span style={{ color: "#a8729a" }}>Anna</span>!</h5>
                                </div>
                                <div class="card-body p-4">
                                    
                                    {order.map((element, index) => {
                                        let sum = 0;
                                        return (
                                            <div className="orderAcoordion">
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography>Order {index+1}</Typography>
                                                    </AccordionSummary>
                                                    <div class="card shadow-0 border mb-4">
                                                        <div class="card-body">
                                                            <div  class="row d-flex justify-content-between orderFont px-3">
                                                                <div>
                                                                    <p><span>Name</span> : {element.fname}{element.lname}</p>
                                                                    <p><span>Email</span> : {element.email}</p>
                                                                </div>
                                                                <div >
                                                                    <p className="d-flex justify-content-end"><span>Address</span> : {element.address},</p>
                                                                    <p className="d-flex justify-content-end">{element.city}, ({element.pincode})</p>
                                                                    <p className="d-flex justify-content-end">{element.state}, {element.country}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <AccordionDetails>
                                                        <Typography>
                                                            {element.order.map((element1) => {
                                                                 sum = sum + element1.price * element1.quantity ;  
                                                                //  {()=>setTotal(sum1)}                         
                                                                return (
                                                                    <div class="card shadow-0 border mb-4">
                                                                        <div class="card-body">
                                                                            <div class="row pt-2">
                                                                                <div class="col-md-2">
                                                                                    <img src={element1.url}
                                                                                        class="img-fluid" alt="Phone" />
                                                                                </div>
                                                                                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                                    <p class="text-muted mb-0">{element1.name}</p>
                                                                                </div>
                                                                                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                                    <p class="text-muted mb-0 small">{element1.color}</p>
                                                                                </div>
                                                                                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                                    <p class="text-muted mb-0 small">Size: {element1.size}</p>
                                                                                </div>
                                                                                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                                    <p class="text-muted mb-0 small">Qty: {element1.quantity}</p>
                                                                                </div>
                                                                                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                                    <p class="text-muted mb-0 small">₹{element1.price}</p>
                                                                                </div>
                                                                            </div>
                                                                            <hr class="mb-2" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </Typography>
                                                    </AccordionDetails>
                                                    <div className="d-flex justify-content-end px-3 pb-3">
                                                        <h5>Total : ₹{sum}</h5>
                                                    </div>
                                                </Accordion>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div class="card-footer border-0 px-4 py-5"
                                    style={{height:'140px' ,backgroundColor: "#59ab6e", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Order;