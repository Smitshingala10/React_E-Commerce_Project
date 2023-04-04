import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { NavLink } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [Product, setProduct] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3200/categories").then((result) => {
            setCategories(result.data);
        })
        axios.get("http://localhost:3200/product").then((result) => {
            setProduct(result.data);
        })
    }, [])


    return (
        <>
            {/* Header */}
            <Header />
            {/* start bannar hero */}
            {/* <Carousel showArrows={true} autoPlay className="carouselBG">
                <div class="container">
                    <div class="row p-5">
                        <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img class="img-fluid" src="./img/banner_img_01.jpg" alt="" />
                        </div>
                        <div class="col-lg-6 mb-0 d-flex align-items-center textLeft">
                            <div class="text-align-left align-self-center">
                                <h1 class="h1 text-success"><b>Zay</b> eCommerce</h1>
                                <h3 class="h2">Tiny and Perfect eCommerce Template</h3>
                                <p>
                                    Zay Shop is an eCommerce HTML5 CSS template with latest version of Bootstrap 5 (beta 1).
                                    This template is 100% free provided by <a rel="sponsored" class="text-success" href="https://templatemo.com" target="_blank">TemplateMo</a> website.
                                    Image credits go to <a rel="sponsored" class="text-success" href="https://stories.freepik.com/" target="_blank">Freepik Stories</a>,
                                    <a rel="sponsored" class="text-success" href="https://unsplash.com/" target="_blank">Unsplash</a> and
                                    <a rel="sponsored" class="text-success" href="https://icons8.com/" target="_blank">Icons 8</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row p-5">
                        <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img class="img-fluid" src="./img/banner_img_02.jpg" alt="" />
                        </div>
                        <div class="col-lg-6 mb-0 d-flex align-items-center textLeft">
                            <div class="text-align-left">
                                <h1 class="h1">Proident occaecat</h1>
                                <h3 class="h2">Aliquip ex ea commodo consequat</h3>
                                <p>
                                    You are permitted to use this Zay CSS template for your commercial websites.
                                    You are <strong>not permitted</strong> to re-distribute the template ZIP file in any kind of template collection websites.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row p-5">
                        <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img class="img-fluid" src="./img/banner_img_03.jpg" alt="" />
                        </div>
                        <div class="col-lg-6 mb-0 d-flex align-items-center textLeft">
                            <div class="text-align-left">
                                <h1 class="h1">Repr in voluptate</h1>
                                <h3 class="h2">Ullamco laboris nisi ut </h3>
                                <p>
                                    We bring you 100% free CSS templates for your websites.
                                    If you wish to support TemplateMo, please make a small contribution via PayPal or tell your friends about our website. Thank you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel> */}
            {/* start bannar hero */}

            {/* Start Categories of The Month */}
            <section class="container py-5">
                <div class="row text-center pt-3">
                    <div class="col-lg-6 m-auto">
                        <h1 class="h1">Categories of The Month</h1>
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div class="row">
                    {categories.map((element, index) => {
                        return (
                            <>
                                <div class="col-12 col-md-4 p-5 mt-3">
                                    <a href="#"><img src={element.url} class="rounded-circle img-fluid border imgManage" /></a>
                                    <h5 class="text-center mt-3 mb-3"><NavLink exact  activeClassName="change" className="linkAColor" to={`/shop/${element.name}`}>{element.name}</NavLink></h5>
                                    <p class="text-center"><a class="btn btn-success"><NavLink exact  activeClassName="change" className="linkColor" to={`/shop/${element.name}`}>Go Shop</NavLink></a></p>
                                </div>
                            </>
                        )
                    })}
                </div>
            </section>
            {/* End Categories of The Month */}

            {/* Start Featured Product */}
            <section class="bg-light">
                <div class="container py-5">
                    <div class="row text-center py-3">
                        <div class="col-lg-6 m-auto">
                            <h1 class="h1">Featured Product</h1>
                            <p>
                                Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident.
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        {Product.map((element, index) => {
                            if(element.featuredProduct === 'YES'){
                            return (
                                <>
                                    <div class="col-12 col-md-4 mb-4">
                                        <div class="card h-100">
                                            <a href="shop-single.html">
                                                <img src={element.purl} width="414" height="311" class="card-img-top" alt="..." />
                                            </a>
                                            <div class="card-body">
                                                <ul class="list-unstyled d-flex justify-content-between">
                                                    <li>
                                                        <i class="text-warning fa fa-star"></i>
                                                        <i class="text-warning fa fa-star"></i>
                                                        <i class="text-warning fa fa-star"></i>
                                                        <i class="text-muted fa fa-star"></i>
                                                        <i class="text-muted fa fa-star"></i>
                                                    </li>
                                                    <li class="text-muted text-right">₹ {element.price}</li>
                                                </ul>
                                                <a  class="text-decoration-none text-dark h2for">{element.pname}</a>
                                                <p class="card-text card-p">
                                                    {element.comment}
                                                </p>
                                                <p class="text-muted">Reviews (24)</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            }
                        })}
                    </div>
                </div>
            </section>
            {/* End Featured Product */}

            {/* footer */}
            <Footer />
        </>
    )
}

export default Home