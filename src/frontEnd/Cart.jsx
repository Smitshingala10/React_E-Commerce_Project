import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import Header from "./Header";
import Footer from "./Footer";

const Cart = () => {
    const [cartitem, setCartItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [userdata, setUserData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        userData();
    },[])

    const userData = () =>{
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

    const countItem = (obj, value) =>{
        if(value === 'plus'){
            obj.quantity =  obj.quantity + 1;
        }else{
            obj.quantity = obj.quantity - 1;
            if (obj.quantity == 0) {
                deleteProduct(obj.id);
            }
        }
        
        axios.put(`http://localhost:3200/cart/${obj.id}`,obj)
        .then((resp)=>{
            userData();
        })
    }

    const deleteProduct = (index) => {
        axios.delete(`http://localhost:3200/cart/${index}`)
            .then((resp) => {
                userData();
            })
    }

    const getProduct = (name, size, color) =>{
        axios.get("http://localhost:3200/product").then((result) => {
            const found = result.data.find((element)=> element.pname === name && element.sizeName === size && element.colorName ===color)
            (`/singleshop/${found.id}`);
        })    
    }
    return (
        <>

            {/* Header */}
            <Header cartItem={cartitem} />

            {/* Breadcrumb Start */}
            <div class="container-fluid cartMargin">
                <div class="row px-xl-5">
                    <div class="col-12">
                        <nav class="breadcrumb bg-light mb-30">
                            <a class="breadcrumb-item text-dark" >Home</a>
                            <a class="breadcrumb-item text-dark" >Shop</a>
                            <span class="breadcrumb-item active">Shopping Cart</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Cart Start */}
            <div class="container-fluid">
                <div class="row px-xl-5">
                    <div class="col-lg-8 table-responsive mb-5">
                        <table class="table table-light table-borderless table-hover text-center mb-0">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody class="align-middle">
                                {
                                    cartitem.map((element, index) => {
                                        return(
                                        <tr>
                                            <td class="align-middle" style={{cursor:'pointer'}} onClick={()=>getProduct(element.name,element.size,element.color)}><img src="img/product_prod_01.jpg" alt="" style={{ width: '50px' }} />{element.name}</td>
                                            <td class="align-middle">₹{element.price}</td>
                                            <td class="align-middle">{element.size}</td>
                                            <td class="align-middle">{element.color}</td>
                                            <td class="align-middle">
                                                <div class="input-group quantity mx-auto" style={{ width: '100px' }}>
                                                    <div class="input-group-btn">
                                                        <button onClick={() => countItem(element,'minus')} class="btn btn-sm btn-primary btn-minus" >
                                                            <RemoveIcon className="addRemoveIcon" />
                                                        </button>
                                                    </div>
                                                    <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value={element.quantity} />
                                                    <div class="input-group-btn">
                                                        <button onClick={() => countItem(element,'plus')} class="btn btn-sm btn-primary btn-plus">
                                                            <AddIcon className="addRemoveIcon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="align-middle">₹{element.price * element.quantity}</td>
                                            <td class="align-middle"><button onClick={() => deleteProduct(element.id)} class="btn btn-sm btn-danger"><ClearIcon className="addRemoveIcon" /></button></td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-4">
                        <form class="mb-30" action="">
                            <div class="input-group">
                                <input type="text" class="form-control border-0 p-4" placeholder="Coupon Code" />
                                    <div class="input-group-append">
                                        <button class="btn btn-primary">Apply Coupon</button>
                                    </div>
                            </div>
                        </form>
                        <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Cart Summary</span></h5>
                        <div class="bg-light p-30 mb-5">
                            <div class="border-bottom pb-2">
                                <div class="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>₹{total}</h6>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h6 class="font-weight-medium">Shipping</h6>
                                    <h6 class="font-weight-medium">₹50</h6>
                                </div>
                            </div>
                            <div class="pt-2">
                                <div class="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>₹{total + 50}</h5>
                                </div>
                                <button class="btn btn-block btn-primary font-weight-bold my-3 py-3"><NavLink exact style={{color:'#212529'}} activeClassName="change" to={`/checkout`}>Proceed To Checkout</NavLink></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart End */}

            {/* Footer Start */}
            {/* <div class="container-fluid bg-dark text-secondary mt-5 pt-5">
                <div class="row px-xl-5 pt-5">
                    <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                        <h5 class="text-secondary text-uppercase mb-4">Get In Touch</h5>
                        <p class="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
                        <p class="mb-2"><LocationOnIcon className="footerIcon" />123 Street, New York, USA</p>
                        <p class="mb-2"><EmailIcon className="footerIcon"/>info@example.com</p>
                        <p class="mb-0"><LocalPhoneIcon className="footerIcon"/> +012 345 67890</p>
                    </div>
                    <div class="col-lg-8 col-md-12">
                        <div class="row">
                            <div class="col-md-4 mb-5">
                                <h5 class="text-secondary text-uppercase mb-4">Quick Shop</h5>
                                <div class="d-flex flex-column justify-content-start">
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Home</a>
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Our Shop</a>
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Shop Detail</a>
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Shopping Cart</a>
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Checkout</a>
                                    <a class="text-secondary" ><KeyboardArrowRightIcon />Contact Us</a>
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <h5 class="text-secondary text-uppercase mb-4">My Account</h5>
                                <div class="d-flex flex-column justify-content-start">
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Home</a>
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Our Shop</a>
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Shop Detail</a>
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Shopping Cart</a>
                                    <a class="text-secondary mb-2" ><KeyboardArrowRightIcon />Checkout</a>
                                    <a class="text-secondary" ><KeyboardArrowRightIcon />Contact Us</a>
                                </div>
                            </div>
                            <div class="col-md-4 mb-5">
                                <h5 class="text-secondary text-uppercase mb-4">Newsletter</h5>
                                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                                <form action="">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Your Email Address" />
                                            <div class="input-group-append">
                                                <button class="btn btn-primary">Sign Up</button>
                                            </div>
                                    </div>
                                </form>
                                <h6 class="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                                <div class="d-flex">
                                    <a class="btn btn-primary btn-square mr-2" ><TwitterIcon /></a>
                                    <a class="btn btn-primary btn-square mr-2" ><FacebookIcon /></a>
                                    <a class="btn btn-primary btn-square mr-2" ><InstagramIcon /></a>
                                    <a class="btn btn-primary btn-square" ><LinkedInIcon /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row border-top mx-xl-5 py-4"  style={{borderColor: 'rgba(256, 256, 256, .1) !important'}}>
                    <div class="col-md-6 px-xl-0">
                        <p class="mb-md-0 text-center text-md-left text-secondary">
                            &copy; <a class="text-primary" href="#">Domain</a>. All Rights Reserved. Designed
                            by
                            <a class="text-primary" href="https://htmlcodex.com">HTML Codex</a>
                        </p>
                    </div>
                    <div class="col-md-6 px-xl-0 text-center text-md-right">
                        <img class="img-fluid" src="img/payments.png" alt="" />
                    </div>
                </div>
            </div> */}
            <Footer />
            {/* Footer End */}


        </>
    )
}

export default Cart;