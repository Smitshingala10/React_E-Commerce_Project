import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Thankyou from "./Thankyou";

const Checkout = () =>{
    const [cartitem, setCartItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [userdata, setUserData] = useState([]);
    const navigate = useNavigate();
    const [inputval, setInputval] = useState({
        fname:"",
        lname:"",
        email:"",
        address:"",
        city:"",
        state:"",
        country:"",
        pincode:"",
        paymentmethod:""
    })


    useEffect(()=>{
        getData();
    },[])

    const getData = () =>{
        const user = JSON.parse(localStorage.getItem('user'));    
        setUserData(user);
        axios.get("http://localhost:3200/cart").then((result)=>{
            const found = result.data.filter(data=>
                (data.userId === user.userId)
            )
            setCartItem(found);
            let totalPrice = found.reduce((sum, i) => {
                return sum + (i.price * i.quantity)
            }, 0)
            setTotal(totalPrice);
        })
    }

    const viewData = (e) =>{
        const {value, name} = e.target;
        setInputval(()=>{
            return{
                ...inputval,
                [name] : value
            }
        })  
    }

    const emptyCart = () =>{
        cartitem.map((element)=>{
            axios.delete(`http://localhost:3200/cart/${element.id}`)
                .then((resp) => {
                })
        })
    }

    const saveData = () =>{
        const userId = userdata.userId;
        const {fname, lname, email, address, city, state, country, pincode, paymentmethod} = inputval;
        inputval['userId'] = userId;
        inputval['totalPrice'] = total;
        inputval['order'] = cartitem;

        axios.post("http://localhost:3200/checkout", inputval).then((resp)=>{
        })
        setInputval(" ");
    }

    const getProduct = (name, size, color) =>{
        axios.get("http://localhost:3200/product").then((result) => {
            const found = result.data.find((element)=> element.pname === name && element.sizeName === size && element.colorName ===color)
            navigate.push(`/singleshop/${found.id}`);
        })    
    }

    return(
        <>
            <Header />
            {/* form start */}
            <div className="container-fluid mt-5">
                <div class="row px-xl-5">
                    <div className="col-lg-8 mb-5">
                        <div>
                            <div>
                                <h2>Customer Info</h2>
                                <div class='d-flex justify-content-between '>
                                    <div class='d-flex flex-column col-lg-4 '>
                                        <label className="text-dark ml-1 mb-1" for="fname">First Name</label>
                                        <input onChange={viewData} value={inputval.fname} className="p-1 pl-2" type="text" id="fname" name="fname" placeholder="john" />
                                    </div>
                                    <div class='d-flex flex-column col-lg-4 '>
                                        <label className="text-dark ml-1 mb-1" for="lname">Last Name</label>
                                        <input onChange={viewData} value={inputval.lname} className="p-1 pl-2" type="text" id="lname" name="lname" placeholder="smith" />
                                    </div>
                                    <div class='d-flex flex-column col-lg-4 '>
                                        <label className="text-dark ml-1 mb-1" for="email">Email</label>
                                        <input onChange={viewData} value={inputval.email} className="p-1 pl-2" type="text" id="email" name="email" placeholder="xyz@gmail.com" />
                                    </div>
                                </div>
                                <div class='d-flex justify-content-between pt-3'>
                                    <div class='d-flex flex-column col-lg-8 '>
                                        <label className="text-dark ml-1 mb-1" for="address">Address</label>
                                        <input onChange={viewData} value={inputval.address} className="p-1 pl-2" type="text" id="address" name="address" placeholder="122 Example st" />
                                    </div>
                                    <div class='d-flex flex-column col-lg-4 '>
                                        <label className="text-dark ml-1 mb-1" for="city">Town/City</label>
                                        <input onChange={viewData} value={inputval.city} className="p-1 pl-2" type="text" id="city" name="city" placeholder="Ahemdabad" />
                                    </div>
                                </div>
                                <div class='d-flex justify-content-between pt-3'>
                                    <div class='d-flex flex-column col-lg-4 '>
                                        <label className="text-dark ml-1 mb-1" for="state">State</label>
                                        <input onChange={viewData} value={inputval.state} className="p-1 pl-2" type="text" id="state" name="state" placeholder="Gujarat" />
                                    </div>
                                    <div class='d-flex flex-column col-lg-4 '>
                                        <label className="text-dark ml-1 mb-1" for="country">Country</label>
                                        <input onChange={viewData} value={inputval.country} className="p-1 pl-2" type="text" id="country" name="country" placeholder="India" />
                                    </div>
                                    <div class='d-flex flex-column col-lg-4 '>
                                        <label className="text-dark ml-1 mb-1" for="pincode">Pin-Code</label>
                                        <input onChange={viewData} value={inputval.pincode} className="p-1 pl-2" type="text" id="pincode" name="pincode" placeholder="380001" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h2>Payment Info</h2>
                                <div className="d-flex ">
                                    <div class='d-flex mr-4'>
                                        <input onChange={viewData} className="p-1 pl-2" type="radio" id="online" name="paymentmethod" value="Online" placeholder="380001" />
                                        <label className="text-dark ml-2 mb-1 mt-2" for="online">Online</label>
                                    </div>
                                    <div class='d-flex'>
                                        <input onChange={viewData} className="p-1 pl-2" type="radio" id="cod" name="paymentmethod" value="COD" placeholder="380001" />
                                        <label className="text-dark ml-2 mb-1 mt-2" for="cod">COD</label>
                                    </div>
                                </div>
                            </div>
                            <button onClick={()=>saveData()} class="checkoutBtn btn btn-block btn-primary font-weight-bold mt-3"><NavLink style={{color:'#212529'}} onClick={()=>emptyCart()} exact activeClassName="change" to="/thanks">Proceed To Checkout</NavLink></button>
                        </div>
                    </div>
                    <div class="col-lg-4 mt-5">              
                        <div class="bg-light p-30 mb-5">
                            <h5 class="text-center position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Current Cart</span></h5>
                            <div class="border-bottom pb-2">
                                {cartitem.map((element, index) => {
                                    return(
                                    <div class="d-flex justify-content-between mb-3">
                                        <div>
                                            <h5 style={{cursor:'pointer'}} onClick={()=>getProduct(element.name,element.size,element.color)} >{element.name}</h5>
                                            <h6>Size : {element.size}</h6>
                                        </div>
                                        <h6 class="d-flex align-items-center">₹{element.quantity * element.price}</h6>
                                    </div>
                                    )
                                })}
                            </div>
                            <div class="border-bottom pb-1 pt-1">
                            <div class="d-flex justify-content-between mt-2 mb-2">
                                        <div>
                                            <h6>Shipping</h6>
                                        </div>
                                        <h6 class="d-flex align-items-center">₹{50}</h6>
                                    </div>
                            </div>
                            <div class="pt-2">
                                <div class="text-center mt-2">
                                    <h6>Total</h6>
                                    <h1>₹{total + 50}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* form end */}
            <Footer />
        </>
    )
}

export default Checkout;