import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { useEffect } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Header = (props) => {
    const {cartItem, favoriteitem} = props
    const [totalitem, setTotalItem] = useState(0);
    const [favtotal, setFavTotal] = useState(0);
    const [user, setUser] = useState(false);
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')); 
        axios.get("http://localhost:3200/cart").then((result) => {
            const found = result.data.filter(data=>
                (data.userId === user.userId)
            )
            found.map((element,index)=>{
                setTotalItem(index+1);
            })
        })
        axios.get("http://localhost:3200/favorite").then((result)=>{
            const found = result.data.filter(data=>
                (data.userId === user.userId)
            )
            found.map((element,index)=>{
                setFavTotal(index+1);
            })
        })
        const user1 = JSON.parse(localStorage.getItem('user'));
        if(user1 === null){
            setUser(true);
        }
    },[cartItem, favoriteitem])
    return (
        <>
            {/* Start Top Nav */}
                <nav className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
                    <div className="container text-light">
                        <div className="w-100 d-flex justify-content-between">
                            <div>
                                <i className="fa fa-envelope mx-2"></i>
                                <a className="navbar-sm-brand text-light text-decoration-none" href="mailto:info@company.com">info@company.com</a>
                                <i className="fa fa-phone mx-2"></i>
                                <a className="navbar-sm-brand text-light text-decoration-none" href="tel:010-020-0340">010-020-0340</a>
                            </div>
                            <div>
                                <a className="text-light" href="https://fb.com/templatemo" target="_blank" rel="sponsored"><FontAwesomeIcon className="headerIcon" icon={faFacebookF} /></a>
                                <a className="text-light" href="https://www.instagram.com/" target="_blank"><FontAwesomeIcon className="headerIcon" icon={faInstagram} /></a>
                                <a className="text-light" href="https://twitter.com/" target="_blank"><FontAwesomeIcon className="headerIcon" icon={faTwitter} /></a>
                                <a className="text-light" href="https://www.linkedin.com/" target="_blank"><FontAwesomeIcon className="headerIcon" icon={faLinkedin} /></a>
                            </div>
                        </div>
                    </div>
                </nav>
            {/* Close Top Nav */}

            {/* Header */}
                <nav class="navbar navbar-expand-lg navbar-light shadow headerBG">
                    <div class="container d-flex justify-content-between align-items-center">

                        <a class="navbar-brand text-success logo h1 align-self-center" href="index.html">
                            Zay
                        </a>

                        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                            <div class="flex-fill">
                                <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                                    <li class="nav-item">
                                        <NavLink exact activeClassName="change" to="/">Home</NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <a>About</a>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink exact activeClassName="change" to="/shop">Shop</NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <a>Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="navbar align-self-center d-flex">
                                <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ..." />
                                        <div class="input-group-text">
                                            <i class="fa fa-fw fa-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <a>
                                    <NavLink exact activeClassName="change" to="/favorite"><FavoriteIcon/></NavLink>
                                    <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark shopSpancart">{favtotal}</span>
                                </a>
                                <a>
                                    <NavLink exact activeClassName="change" to="/cart"><ShoppingCartIcon /></NavLink>
                                    <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark shopSpan">{totalitem}</span>
                                </a>
                                <a>
                                    {user && 
                                        <NavLink exact activeClassName="change" to="/login"><PersonIcon /></NavLink>
                                    }
                                    {user == false &&
                                         <NavLink exact activeClassName="change" to="/user"><PersonIcon /></NavLink>
                                    }
                                    <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark userSpan">+99</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </nav>
            {/* Header Closed */}
        </>
    )
}

export default Header