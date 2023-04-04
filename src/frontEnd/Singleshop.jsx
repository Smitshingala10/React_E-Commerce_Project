import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import Item from "./Item";
import Carousel from "react-elastic-carousel";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Singleshop = (props) => {
    let { id } = useParams();
    const [Product, setProduct] = useState([]);
    const [obj, setObj] = useState({})
    const [related, setRelated] = useState([]);
    const [totalitem, setTotalItem] = useState(1);
    const [cartitem, setCartItem] = useState([]);
    const [user, setUser] = useState(false);
    const [userdata, setUserData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3200/product").then((result) => {
            setProduct(result.data);
            const found = result.data.find(element => element.id === parseInt(id));
            setObj(found);
            const categoriesFilter = result.data.filter(element => element.categorieName == found.categorieName)
            setRelated(categoriesFilter);
            if(categoriesFilter.length <= 1){
                const brandFilter = result.data.filter(element => element.brandName == found.brandName);
                setRelated(brandFilter)
            }
        })
        const user1 = JSON.parse(localStorage.getItem('user'));
        if(user1 === null){
            setUser(true);
        }

        cartData();
    }, [id])


    const updateObj = (id) =>{
        const found = Product.find(element => element.id === parseInt(id));
        setObj(found);
    }

    const cartData = () =>{
        axios.get("http://localhost:3200/cart").then((result)=>{
            setCartItem(result.data);
        })
        const user = JSON.parse(localStorage.getItem('user'));    
        setUserData(user);
    }

    const countItem = (value) =>{
        if(totalitem >= 1 && value === 'plus'){
            setTotalItem(totalitem + 1);
        }else if(totalitem > 1){
            setTotalItem(totalitem - 1);
        }
    }

    const addCartData = () =>{
        // e.preventDefault();
        let name = obj.pname;
        let url = obj.purl;
        let size = obj.sizeName;
        let price = obj.price;
        let color = obj.colorName;
        let userId = userdata.userId;
        let quantity = totalitem;

        let data = { name, url, size, color, price, userId, quantity}

        let result = cartitem.find((value)=> value.userId === userdata.userId && value.name === obj.pname  &&  value.size === obj.sizeName  && value.color === obj.colorName);

        if(user == false){
            if(result){
                toast.warning('Alredy Added');
                cartData();
           }else{
               axios.post("http://localhost:3200/cart",data).then((resp)=>{
                   toast.success('Successfully Added')
                   cartData();
               })
           }
        }else{
            toast.warning('Plase Loging');
            cartData();
        }
        
        
    }

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
    ];

    return (
        <>
            <Header cartItem={cartitem} />
            <ToastContainer />
            {/* Open Content */}
            <section class="bg-light">
                <div class="container pb-5">
                    <div class="row">
                        <div class="col-lg-5 mt-5">
                            <div class="card mb-3">
                                <img class="card-img img-fluid singleShopImg" src={obj.purl} alt="Card image cap" id="product-detail" />
                            </div>
                        </div>
                        {/* <!-- col end --> */}
                        <div class="col-lg-7 mt-5">
                            <div class="card">
                                <div class="card-body">
                                    <h1 class="h2">{obj.pname}</h1>
                                    <p class="h3 py-2">₹ {obj.price}</p>
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <h6>Brand:</h6>
                                        </li>
                                        <li class="list-inline-item">
                                            <p class="text-muted"><strong>{obj.brandName}</strong></p>
                                        </li>
                                    </ul>

                                    <h6>Description:</h6>
                                    <p>{obj.comment}</p>
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <h6>Avaliable Color :</h6>
                                        </li>
                                        <li class="list-inline-item">
                                            <p class="text-muted"><strong><span style={{ background: `${obj.colorName}`, width: "20px", height: "20px" }} class="product-color-dot float-left ml-1"></span></strong></p>
                                        </li>
                                    </ul>

                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <h6>Categorie:</h6>
                                        </li>
                                        <li class="list-inline-item">
                                            <p class="text-muted"><strong>{obj.categorieName}</strong></p>
                                        </li>
                                    </ul>

                                    <form action="" method="GET">
                                        <input type="hidden" name="product-title" value="Activewear" />
                                        <div class="row">
                                            <div class="col-auto">
                                                <ul class="list-inline pb-3">
                                                    <li class="list-inline-item">Size :
                                                        <input type="hidden" name="product-size" id="product-size" value="S" />
                                                    </li>
                                                    {Product.map((element, index) => {
                                                        if (element.pname === obj.pname ) {
                                                            return (
                                                                <>
                                                                    <li class="list-inline-item " onClick={() => updateObj(element.id)}><span class={`btn  btn-size  ${element.id === obj.id ? 'btn-success' : 'activeSize'}`}>{element.sizeName}</span></li>
                                                                    {/* <li class="list-inline-item" onClick={() => updateObj(element.id)}><span class="btn btn-success btn-size">{element.sizeName}</span></li> */}
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                </ul>
                                            </div>
                                            <div class="col-auto">
                                                <ul class="list-inline pb-3">
                                                    <li class="list-inline-item text-right">
                                                        Quantity
                                                        <input type="hidden" name="product-quanity" id="product-quanity" value="1" />
                                                    </li>
                                                    <li onClick={()=>countItem('minus')} class="list-inline-item"><span class="btn btn-success" id="btn-minus">-</span></li>
                                                    <li class="list-inline-item"><span class="badge bg-secondary" id="var-value">{totalitem}</span></li>
                                                    <li onClick={()=>countItem('plus')} class="list-inline-item"><span class="btn btn-success" id="btn-plus">+</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="row pb-3 buttons">
                                            <div class="col d-grid singlepageButton">
                                                <button type="submit" class="btn btn-success btn-lg" name="submit" value="buy">Buy</button>
                                            </div>
                                            <div class="col d-grid singlepageButton">
                                                <button type="button"  onClick={()=>addCartData()} class="btn btn-success btn-lg">Add To Cart</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Close Content */}

            {/* Carousel start for same categories */}
            { related.length > 1 &&
                <div className="appCarousel">
                <Carousel breakPoints={breakPoints}>
                    {related.map((element, index) => {
                        { if(element.id !== obj.id)
                        return (
                           <Item>
                            <div class="p-2 pb-3">
                                <div class="product-wap card rounded-0">
                                    <div class="card rounded-0">
                                        <img  class="card-img rounded-0 img-fluid carouselImg" src={element.purl} />
                                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="carouseUl list-unstyled">
                                                    <li><a class="btn btn-success text-white"><FavoriteBorderIcon /></a></li>
                                                    <li><a class="btn btn-success text-white mt-2"><NavLink exact activeClassName="change" to={`/singleshop/${element.id}`}><VisibilityIcon className="visibilityIcon" /></NavLink></a></li>
                                                    <li><a class="btn btn-success text-white mt-2"><AddShoppingCartIcon /></a></li>
                                                </ul>
                                        </div>
                                    </div>
                                        <div class="card-body">
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li><a href="shop-single.html" class="h3 text-decoration-none">{element.pname}</a></li>
                                                <li class="pt-2">
                                                    <span style={{ background: `${element.colorName}`, width: "20px", height: "20px" }} class="product-color-dot float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled  mb-1">
                                                <li className="carouseFont">Size : {element.sizeName}</li>
                                            </ul>
                                            <ul class="list-unstyled  mb-1">
                                                <li className="carouseFont">
                                                Categorie : {element.categorieName}
                                                </li>
                                                <li className="carouseFont">
                                                    <p>Brand : {element.brandName}</p>
                                                </li>
                                            </ul>
                                            <p class=" carouseFont text-center mb-0">₹ : {element.price}</p>
                                    </div>
                                </div>
                            </div>
                        </Item>
                        )}
                    })}
                </Carousel>
                </div>
            }
            {/* Carousel start for same categories */}

            {/* Carousel start for same brand */}
            
            {/* Carousel start for same brand */}



            <Footer />
        </>
    )
}

export default Singleshop;