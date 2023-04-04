import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ViewListIcon from '@mui/icons-material/ViewList';

const Userdetail = () => {
    const [alluser, setAllUser] = useState([]);
    const [userdata, setUserData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [carttotal, setCartTotal] = useState(0);
    const [favtotal, setFavTotal] = useState(0);
    const [ordertotal, setOrderTotal] = useState(0);
    const [inputval, setInputval] = useState({
        name:'',
        email:'',
        mobile:'',
    });
    const navigate = useNavigate();
    useEffect(()=>{
        getData();
    },[])

    const getData =() =>{
        const user = JSON.parse(localStorage.getItem('user'));    
        axios.get("http://localhost:3200/login").then((result)=>{
            const found = result.data.find((element)=> element.userId === user.userId)
            setAllUser(found);
            setUserData(found);
        })

        axios.get("http://localhost:3200/cart").then((result)=>{
            const found = result.data.filter((element)=> element.userId === user.userId)
            found.map((element,index)=>{
                setCartTotal(index + 1);
            })
        })

        axios.get("http://localhost:3200/favorite").then((result)=>{
            const found = result.data.filter((element)=> element.userId === user.userId)
            found.map((element,index)=>{
                setFavTotal(index+1)
            })
        })
    }

    const viewData = (e) =>{
        const { value, name } = e.target;
        setInputval(() => {
            return {
                ...inputval,
                [name]: value
            }
        })
    }
    const deleteData = () =>{
        localStorage.removeItem('user')
        navigate("/login");
    }

    const editTask = () =>{
        setInputval(alluser);
        setEdit(true);
    } 

    const updateData = () =>{
        const {name, email, mobile} = inputval;
        inputval['userId'] = alluser.userId;
        inputval['password'] = alluser.password;

        axios.put(`http://localhost:3200/login/${alluser.id}`, inputval)
            .then((resp) => {
                getData();
        })
        setInputval(" ");
        setEdit(false);
        getData();
    }
    return (
        <> 
            <Header />
            <div class="container" style={{ marginTop: '40px', marginBottom: '40px' }}>
                <div class="main-body">
                    <nav aria-label="breadcrumb" class="main-breadcrumb">
                        <ol class="breadcrumb d-flex justify-content-between">
                            <div className="d-flex">
                                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li class="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
                                <li class="breadcrumb-item active" aria-current="page">User Profile</li>
                            </div>
                            <button onClick={()=>deleteData()} className="deleteBtn">Logout</button>
                        </ol>
                    </nav>

                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                                        <div class="mt-3">
                                            <h4>{userdata.name}</h4>
                                            <p class=" text-dark font-size-sm">User Id : {userdata.userId}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card mb-3" style={{paddingBottom:'25px'}} >
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Full Name</h6>
                                        </div>
                                        <div class="col-sm-9 text-dark">
                                            { edit == false &&
                                                userdata.name 
                                            }
                                            {edit && 
                                                <input id="name" name="name" onChange={viewData} className="userInput" type="text" placeholder={userdata.name} />
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Email</h6>
                                        </div>
                                        <div class="col-sm-9 text-dark">
                                            { edit == false &&
                                                userdata.email 
                                            }
                                            {edit && 
                                                <input id="email" name="email" onChange={viewData} className="userInput" type="emil"  placeholder={userdata.email} />
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Mobile</h6>
                                        </div>
                                        <div class="col-sm-9 text-dark">
                                            { edit == false &&
                                                userdata.mobile 
                                            }
                                            {edit && 
                                                <input id="mobile" name="mobile" onChange={viewData} className="userInput" type="mobile"  placeholder={userdata.mobile} />
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-12">
                                            { edit == false &&
                                            <a onClick={()=>editTask()} class="btn btn-info">Edit</a>
                                            }
                                            {edit && 
                                            <a onClick={()=>updateData()} class="btn btn-info">Update</a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div onClick={()=>navigate("/order")} class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <div class="rounded-circle" width="100">
                                            <ViewListIcon className="userDetailIcon" />
                                        </div>
                                        <div class="mt-3">
                                            <p>{userdata.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div onClick={()=>navigate("/cart")} class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <div class="rounded-circle" width="100">
                                            <ShoppingCartIcon className="userDetailIcon" />
                                        </div>
                                        <div class="mt-3">
                                            <h4>{carttotal}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div onClick={()=>navigate("/favorite")} class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <div class="rounded-circle" width="100">
                                            <FavoriteIcon className="userDetailIcon" />
                                        </div>
                                        <div class="mt-3">
                                            <h4>{favtotal}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Userdetail;