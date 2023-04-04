import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "./Button";

const Product = () => {

    const [inputval, setInputval] = useState({
        categorieName: "",
        brandName: "",
        colorName: "",
        sizeName: "",
        pname: "",
        purl: "",
        price: "",
        featuredProduct: "",
        comment: "",
    });

    const [product, setProduct] = useState([]);
    const [form, setForm] = useState(false);
    const [error, setError] = useState(false);

    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [edit, setEdit] = useState(false);
    const [obj, setObj] = useState("");

    const getData = () => {
        axios.get("http://localhost:3200/product").then((result) => {
            setProduct(result.data);
        })

        axios.get("http://localhost:3200/categories").then((result) => {
            setCategories(result.data)
        })

        axios.get("http://localhost:3200/brand").then((result) => {
            setBrand(result.data)
        })

        axios.get("http://localhost:3200/color").then((result) => {
            setColor(result.data)
        })

        axios.get("http://localhost:3200/size").then((result) => {
            setSize(result.data)
        })

    }

    const viewData = (e) => {
        const { value, name } = e.target;
        setInputval(() => {
            return {
                ...inputval,
                [name]: value
            }
        })
    }

    const saveData = (e) => {
        // e.preventDefault();

        const { categorieName, brandName, colorName, sizeName, pname, purl, price } = inputval;

        // console.log("submitF", inputval);

        axios.post("http://localhost:3200/product", inputval)
            .then((resp) => {
                // console.log("success");
                getData();
            })

        setForm(false)
        setInputval(" ")
    }

    useEffect(() => {
        getData();
    }, [])

    const editTask = (index) => {
        setForm(true);
        setEdit(true);

        const found = product.find(value => value.id === index);

        setInputval(found);
        setObj(found);

    }

    const updateData = (e) => {

        axios.put(`http://localhost:3200/product/${obj.id}`, inputval)
            .then((resp) => {
                getData();
            })
        setInputval(" ");
        setForm(false);
        setEdit(false);
    }

    const deleteTask = (index) => {
        axios.delete(`http://localhost:3200/product/${index}`)
            .then((resp) => {
                getData();
            })
    }

    const closeClick = () =>{
        setForm(false); 
        setEdit(false);
        setInputval(" ");
    }

    const addClick = () =>{
        setForm(true);
    }

    return (
        <>
            <div class="container1">
                <div class="newTask">
                    <h1>Admin</h1>
                    <ul class="specificTag">
                        <li><NavLink exact activeClassName="change" to="/admin">Categories</NavLink></li>
                        <li><NavLink exact activeClassName="change" to="/brand">Brands</NavLink></li>
                        <li><NavLink exact activeClassName="change" to="/color">Color</NavLink></li>
                        <li><NavLink exact activeClassName="change" to="/size">Size</NavLink></li>
                        <li><NavLink exact activeClassName="change" to="/product">Product</NavLink></li>
                    </ul>
                </div>
                <div class="showTask">
                    <div class="navBar">
                        <div class="pagesShow">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination pt-3">
                                    {form == false &&
                                        <Button buttonclick={()=> addClick() } id="openForm" color={'#3f51b5'} name={'Add'} />
                                    }
                                    {form == true &&
                                        <Button buttonclick={()=> closeClick() } id="closeForm" color={'#f44336'} name={'Close'} />
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div id="taskAll">
                        {form == false &&
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Categorie</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Featured Product</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody key="tbody">
                                    {
                                        product.map((element, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th>{index + 1}</th>
                                                        <th >{element.pname}</th>
                                                        <th ><img width="150" height="100" src={element.purl} /></th>
                                                        <th >{element.price}</th>
                                                        <th >{element.categorieName}</th>
                                                        <th >{element.brandName}</th>
                                                        <th >{element.colorName}</th>
                                                        <th >{element.sizeName}</th>
                                                        <th >{element.featuredProduct}</th>
                                                        <th>{<EditIcon className="editIcon" key={index} onClick={() => editTask(element.id)} />}</th>
                                                        <th>{<DeleteIcon className="deleteIcon" key={index} onClick={() => deleteTask(element.id)} />}</th>
                                                    </tr>
                                                </>)
                                        })

                                    }
                                </tbody>
                            </table>
                        }
                        {form == true &&
                            <div className="postMethodMargin">
                                <div className="postMethod product">
                                    <h1>Add Product</h1>
                                    <div>
                                        <h5>Please Select Categories</h5>
                                        <select onChange={viewData} id="categorieName" name="categorieName">
                                            <option value=" ">select Categorie</option>
                                            {categories.map((element) => {
                                                return (
                                                    <option value={element.name} selected={inputval.categorieName === element.name}>{element.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <h5>Please Select Brand</h5>
                                        <select onChange={viewData} id="brandName" name="brandName">
                                            <option value=" ">select brand</option>
                                            {brand.map((element) => {
                                                return (
                                                    <option value={element.bname} selected={inputval.brandName === element.bname}>{element.bname}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <div>
                                            <h5>Please Select Color</h5>
                                            <select onChange={viewData} id="colorName" name="colorName">
                                                <option value=" ">select color</option>
                                                {color.map((element) => {
                                                    let a = element.cname;
                                                    return (
                                                        <option style={{ color: a }} value={element.cname} selected={inputval.colorName === element.cname} >{element.cname}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <h5>Please Select Size</h5>
                                            <select onChange={viewData} id="sizeName" name="sizeName">
                                                <option value=" ">select size</option>
                                                {size.map((element) => {
                                                    return (
                                                        <option value={element.sname} selected={inputval.sizeName === element.sname}>{element.sname}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    {/* ----------------------------------------------------------------------------- */}
                                    <div id="userInputWrp" class="user-input-wrp">
                                        <br />
                                        <input onChange={viewData} value={inputval.pname} type="text" id="formInput" class="inputText" name="pname" />
                                        <input type="hidden" id="saveIndex" />
                                        <span id="floatingLabel" class="floating-label">Name : </span>
                                    </div>
                                    {error &&
                                        <p className="error">This Size Already Added</p>
                                    }
                                    <div id="userInputWrp" class="user-input-wrp">
                                        <br />
                                        <input onChange={viewData} value={inputval.purl} type="text" id="formInput" class="inputText" name="purl" />
                                        <input type="hidden" id="saveIndex" />
                                        <span id="floatingLabel" class="floating-label">URL : </span>
                                    </div>
                                    <div id="userInputWrp" class="user-input-wrp">
                                        <br />
                                        <input onChange={viewData} value={inputval.price} type="text" id="formInput" class="inputText" name="price" />
                                        <input type="hidden" id="saveIndex" />
                                        <span id="floatingLabel" class="floating-label">Price : </span>
                                    </div>
                                    <div>
                                        <p>This is Featured Product??</p>
                                        <input className="radioInput" onChange={viewData} type="radio" id="yes" name="featuredProduct" value="YES" checked={(inputval.featuredProduct === 'YES') ? true : false} />
                                        <label for="yes">Yes</label>
                                        <br />
                                        <input className="radioInput" onChange={viewData} type="radio" id="no" name="featuredProduct" value="NO" checked={(inputval.featuredProduct === 'NO') ? true : false} />
                                        <label for="no">No</label>
                                    </div>
                                    <div className="textArea">
                                    <p>Enter Description</p>
                                    <textarea name="comment"  onChange={viewData} value={inputval.comment} form="usrform">Enter text here...</textarea>
                                    </div>
                                    { edit == false &&
                                        <Button  buttonclick={() => saveData()} color={'#30de30'} name={'Submit'} />
                                    }
                                    { edit  &&
                                        <Button buttonclick={() => updateData()}  color={'#30de30'} name={'Update'} />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product