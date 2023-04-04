import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dropdown from 'react-bootstrap/Dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';



const Shop = () => {
    let { categorieFullName } = useParams();

    const [taskobj, setTaskobj] = useState([]);
    const [Product, setProduct] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [brand, setBrand] = useState([]);
    const [color, setColor] = useState([]);

    const [catshow, setcatShow] = useState(false);
    const [brandshow, setbrandShow] = useState(false);
    const [colorshow, setcolorShow] = useState(false);
    const [cartitem, setCartItem] = useState([]);
    const [favoriteitem, setFavoriteItem] = useState([]);
    const [searchval, setSearchVal] = useState("");
    const [user, setUser] = useState(false);
    const [userdata, setUserData] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3200/product").then((result) => {
            setProduct(result.data);
            setTaskobj(result.data);
            if(categorieFullName){
                const found = result.data.filter(data=>
                    (data.categorieName === categorieFullName)
                )  
                setTaskobj(found);  
            }
        })
        axios.get("http://localhost:3200/categories").then((result) => {
            setCategorie(result.data);
        })
        axios.get("http://localhost:3200/brand").then((result) => {
            setBrand(result.data);
        })
        axios.get("http://localhost:3200/color").then((result) => {
            setColor(result.data);
        })
        const user1 = JSON.parse(localStorage.getItem('user'));
        if(user1 === null){
            setUser(true);
        }

        cartData();

    }, [])

    const sorting = (value1, value2) =>{
        // const aa = [...taskobj];
        if(value1 === 'categorie'){
            const aa = [...taskobj]
            const result = aa.filter(data=>
                (data.categorieName === value2)
            )
            setTaskobj(result);
        }else if(value1 === 'brand'){
            const aa = [...taskobj]
            const result = aa.filter(data=>
                (data.brandName === value2)
            )
            setTaskobj(result);
        }else if(value1 === 'color'){
            const aa = [...taskobj]
            const result = aa.filter(data=>
                (data.colorName === value2)
            )
            setTaskobj(result);
        }else if(value1 === 'search'){
            const aa = [...taskobj]
            const result = aa.filter(data=>
                (data.pname.toUpperCase().replace(/ /g, "") === searchval.toUpperCase().replace(/ /g, ""))
            )
            // setSearchVal("");
            setTaskobj(result);
        }else{
            setTaskobj(Product);
            setSearchVal("");
        }
    }

    const featureSorting = (value) =>{
        if(value === 'atoz'){
            const aa = [...taskobj];
            const result = aa.sort(function (a, b) {
                const nameA = a.pname.toUpperCase(); // ignore upper and lowercase
                const nameB = b.pname.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1; //nameA comes first
                }
                if (nameA > nameB) {
                    return 1; // nameB comes first
                }
                return 0;  // names must be equal
            });
            setTaskobj(result);
        }else if(value === 'htol'){
            const aa = [...taskobj];
            const result = aa.sort(function(a, b) {
                return parseFloat(b.price) - parseFloat(a.price);
            });
            setTaskobj(result)
        }else if(value === 'ltoh'){
            const aa = [...taskobj];
            const result = aa.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
            setTaskobj(result)
        }
    }

    const viewsubCategories = (value) =>{
        if(value === 'categorie'){
            setcatShow(true);
            setbrandShow(false);
            setcolorShow(false);
        }else if(value === 'brand'){
            setcatShow(false);
            setbrandShow(true);
            setcolorShow(false);
        }else if(value === 'color'){
            setcatShow(false);
            setbrandShow(false);
            setcolorShow(true);
        }
    }

    const cartData = () =>{
        axios.get("http://localhost:3200/cart").then((result)=>{
            setCartItem(result.data);
        })
        const user = JSON.parse(localStorage.getItem('user'));    
        setUserData(user);
    }

    const favorite = () =>{
        axios.get("http://localhost:3200/favorite").then((result)=>{
            setFavoriteItem(result.data);
        })
    }

    const addCartData = (index) =>{
        if(user === false){
            let found = taskobj.find((value)=> value.id === index);
            let result1 = cartitem.find((element) => element.userId === userdata.userId && element.name === found.pname && element.size === found.sizeName && element.color === found.colorName);
       
            let name = found.pname;
            let url = found.purl;
            let size = found.sizeName;
            let price = found.price;
            let color = found.colorName;
            let userId = userdata.userId;
            let quantity = 1;
            let data = { name, url, size, color, price, userId, quantity }
            if(result1){
                toast.warning('Alredy Added');
                cartData();
            }else{
                axios.post("http://localhost:3200/cart",data).then((resp)=>{
                    toast.success('Successfully Added');
                    cartData();
                })
            }
        }else{
            toast.warning('Plase Loging');
            cartData();
        }
    }

    const addFavorite = (index) =>{
        if(user == false){
        let found = taskobj.find((value)=> value.id === index);
        let result1 = favoriteitem.find((element) => element.userId === userdata.userId && element.name === found.pname && element.size === found.sizeName && element.color === found.colorName);

        let name = found.pname;
        let url = found.purl;
        let size = found.sizeName;
        let price = found.price;
        let color = found.colorName;
        let brand = found.brandName;
        let userId = userdata.userId;
        let data = { name, url, size, color, price, brand, userId}

        
            if(result1){
                toast.warning('Alredy Added');
                favorite();
            }else {
                axios.post("http://localhost:3200/favorite", data).then((resp) => {
                    toast.success('Successfully Added');
                    favorite();
                })
            }
        }else{
            toast.warning('Plase Loging');
            cartData();
        } 
    }

    return (
        <>
            <Header cartItem={cartitem} favoriteitem={favoriteitem} />
            <ToastContainer />
            {/* start Contant */}
            <div class="container py-5">
                <div class="row">

                    <div class="col-lg-3">
                        <h1 class="h2 pb-4">Categories</h1>
                        <ul class="list-unstyled templatemo-accordion">
                            <li class="pb-3">
                                <a class=" d-flex justify-content-between h3 text-decoration-none" >
                                    Categories
                                    {/* <i class="fa fa-fw fa-chevron-circle-down mt-1"></i> */}
                                    <ExpandCircleDownIcon onClick={()=>viewsubCategories('categorie') } />
                                </a>
                                {catshow &&
                                    <ul class="list-unstyled pl-3">
                                        {
                                            categorie.map((element) => {
                                                return (
                                                    <li><a onClick={() => sorting('categorie', element.name)} class="curser text-decoration-none">{element.name}</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                }
                            </li>
                            <li class="pb-3">
                                <a class=" d-flex justify-content-between h3 text-decoration-none" >
                                    Brand
                                    {/* <i class="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i> */}
                                    <ExpandCircleDownIcon onClick={()=>viewsubCategories('brand') }/>
                                </a>
                                {brandshow &&
                                    <ul class="list-unstyled pl-3">
                                        {
                                            brand.map((element) => {
                                                return (
                                                    <li><a onClick={() => sorting('brand', element.bname)} class="curser text-decoration-none">{element.bname}</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                }
                            </li>
                            <li class="pb-3">
                                <a class=" d-flex justify-content-between h3 text-decoration-none" >
                                    Color
                                    {/* <i class="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i> */}
                                    <ExpandCircleDownIcon onClick={()=>viewsubCategories('color') } />
                                </a>
                                {colorshow &&
                                    <ul class="list-unstyled pl-3">
                                        {
                                            color.map((element) => {
                                                return (
                                                    <li className="filterColor"><p class="filterP"><strong><span style={{ background: `${element.cname}`, width: "20px", height: "20px" }} class="product-color-dot float-left ml-1"></span></strong></p><a onClick={() => sorting('color', element.cname)} class="curser text-decoration-none">{element.cname}</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                }
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-9">
                        <div className="shopNav">
                            <div className="shopNavOne" >
                                <a onClick={()=> sorting()} class="curser h3 text-dark text-decoration-none mr-3">All</a>
                            </div>
                            <div className="shopNavSecond" >
                                <input value={searchval} name='searchInput' onChange={(e)=>setSearchVal(e.target.value)} placeholder="Search..." />
                                <button  onClick={()=> sorting('search')} ><SearchIcon style={{color:'#fff'}}/></button>  
                            </div>
                            <div class="shopNavThird pb-4">
                                <div class="d-flex">
                                    {/* <select onChange={()=>sorting(this)} class="form-control">
                                        <option id='1' value='atoz'>A to Z</option>
                                        <option>Featured</option>
                                        <option>Item</option>
                                    </select> */}
                                    <Dropdown className="maindropdown">
                                        <Dropdown.Toggle className="dropdownSize" variant="success" id="dropdown-basic">
                                                Featured
                                        </Dropdown.Toggle>
 
                                        <Dropdown.Menu className="dropdownSize">
                                            <Dropdown.Item onClick={()=>featureSorting('atoz')} >A to Z</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>featureSorting('htol')} >High - Low</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>featureSorting('ltoh')}>Low - High</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            
                        </div>
                        <div class="row">
                            {taskobj.map((element, index) => {
                                return (
                                    <>
                                        <div class="col-md-4">
                                            <div class="card mb-4 product-wap rounded-0">
                                                <div class="card rounded-0">
                                                    <img class="card-img rounded-0 img-fluid productImgSize" src={element.purl} />
                                                    <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                        <ul class="list-unstyled">
                                                            <li><a class="btn btn-success text-white" ><FavoriteBorderIcon onClick={()=>addFavorite(element.id)} /></a></li>
                                                            <li><a class="btn btn-success text-white mt-2" ><NavLink exact  activeClassName="change" to={`/singleshop/${element.id}`}><VisibilityIcon className="visibilityIcon" /></NavLink></a></li>
                                                            <li><a class="btn btn-success text-white mt-2" ><ShoppingCartIcon onClick={()=>addCartData(element.id)} className="visibilityIcon" /></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                        <li><a class="h3 text-decoration-none"><NavLink exact  activeClassName="change" to={`/singleshop/${element.id}`}>{element.pname}</NavLink></a></li>                    
                                                        <li class="pt-2">
                                                            <span style={{ background: `${element.colorName}`, width:"20px", height: "20px" }} class="product-color-dot float-left rounded-circle ml-1"></span>
                                                        </li>
                                                    </ul>
                                                    <ul class="w-100 list-unstyled  mb-0">
                                                        <li>Size : {element.sizeName}</li>
                                                    </ul>
                                                    <ul className="forProduct">
                                                        <li>Categorie : {element.categorieName}</li>
                                                        <li>Brand : {element.brandName}</li>
                                                    </ul>
                                                    <p class="text-center mb-0">₹ {element.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div div="row">
                            <ul class="paginationShop pagination-lg justify-content-end">
                                <li class="page-item disabled">
                                    <a class="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0"  tabindex="-1">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark" >2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" >3</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            {/* end Contant */}

            {/* start brand */}
            <section class="bg-light py-5">
                <div class="container my-4">
                    <div class="row text-center py-3">
                        <div class="col-lg-6 m-auto">
                            <h1 class="h1">Our Brands</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        <div class="col-lg-9 m-auto tempaltemo-carousel">
                            <div class="row d-flex flex-row">
                                <div class="col-1 align-self-center">
                                    <a class="h1"  role="button" data-bs-slide="prev">
                                        <i class="text-light fas fa-chevron-left"></i>
                                    </a>
                                </div>

                                <div class="col">
                                    <div class="carousel slide carousel-multi-item pt-2 pt-md-0" id="multi-item-example" data-bs-ride="carousel">

                                        <div class="carousel-inner product-links-wap" role="listbox">

                                            <div class="carousel-item active">
                                                <div class="row">
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="carousel-item">
                                                <div class="row">
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="carousel-item">
                                                <div class="row">
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div class="col-3 p-md-5">
                                                        <a><img class="img-fluid brand-img" src="./img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-1 align-self-center">
                                    <a class="h1"  role="button" data-bs-slide="next">
                                        <i class="text-light fas fa-chevron-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end brand */}
            <Footer />
        </>
    )
}

export default Shop;