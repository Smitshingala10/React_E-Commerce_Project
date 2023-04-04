import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import Header from "./Header";
import ClearIcon from '@mui/icons-material/Clear';

const Favorite = () => {
    const [favitem, setFavItem] = useState([]);
    const [userdata, setUserData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        getData();
    },[])

    const getData = () =>{
        const user = JSON.parse(localStorage.getItem('user'));    
        setUserData(user);
        axios.get("http://localhost:3200/favorite").then((result) => {
            const found = result.data.filter(data=>
                (data.userId === user.userId)
            )
            setFavItem(found);
        })
    } 

    const deleteProduct = (index) => {
        axios.delete(`http://localhost:3200/favorite/${index}`)
            .then((resp) => {
                getData();
            })
    }

    const getProduct = (name, size, color) =>{
        axios.get("http://localhost:3200/product").then((result) => {
            const found = result.data.find((element)=> element.pname === name && element.sizeName === size && element.colorName ===color)
            navigate(`/singleshop/${found.id}`);
        })    
    }

    return (
        <>
            <Header favoriteitem={favitem}/>
            {/* favorite item start */}
            <div class="container-fluid mt-5">
                <div class="row px-xl-5">
                    <div class="col-lg-12 table-responsive mb-5">
                        <table class="table table-light table-borderless table-hover text-center mb-0">
                            <thead class="thead-dark">
                                <tr>
                                    <th>index</th>
                                    <th>Image</th>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Brand</th>
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody class="align-middle">
                                {
                                    favitem.map((element, index) => {
                                        return (
                                            <tr>
                                                <td class="align-middle">{index + 1}</td>
                                                <td class="align-middle"><img src={element.url} width="80" height="80" alt="" /></td>
                                                <td class="align-middle" style={{cursor:'pointer'}} onClick={()=>getProduct(element.name,element.size,element.color)}>{element.name}</td>
                                                <td class="align-middle">₹{element.price}</td>
                                                <td class="align-middle">{element.brand}</td>
                                                <td class="align-middle">{element.size}</td>
                                                <td class="align-middle">{element.color}</td>
                                                <td class="align-middle"><button onClick={() => deleteProduct(element.id)} class="btn btn-sm btn-danger"><ClearIcon className="addRemoveIcon" /></button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* favorite item end */}
            <Footer />
        </>
    )
}

export default Favorite;