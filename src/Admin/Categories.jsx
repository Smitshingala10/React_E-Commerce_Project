import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from "react-router-dom";
import Button from "./Button";



const Categories = () => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [form, setForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [edit, setEdit] = useState(false);
    const [obj, setObj] = useState("");

    const getData = () => {
        axios.get("http://localhost:3200/categories").then((result) => {
            setCategories(result.data);
        })
         
    }

    const saveData = () => {
        let data = { name, url }

        let obj = categories.find((value)=> value.name === name)
        // console.log("ss", obj, categories, name, url)
        if (obj) {
            setError(true);
        }else{
            axios.post("http://localhost:3200/categories", data)
            .then((resp) => {
                getData();
            })
            setName(" ");
            setUrl(" ");
            setForm(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const editTask = (index) => {
        setForm(true);
        setEdit(true);

        const found = categories.find(value => value.id === index);

        setName(found.name);
        setUrl(found.url);
        setObj(found);

    }

    const updateData = () =>{
        let data = { name, url }

        axios.put(`http://localhost:3200/categories/${obj.id}`, data)
        .then((resp)=>{
            getData();
        })
        setName(" ");
        setUrl(" ");
        setForm(false);
        setEdit(false);
    } 

    const deleteTask = (index) =>{
        axios.delete(`http://localhost:3200/categories/${index}`)
        .then((resp)=>{
            getData();
        })
    }

    const closeClick = () =>{
        setForm(false); 
        setEdit(false);
        setName(" ");
        setUrl(" ");
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
                                        <th scope="col">Url</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody key="tbody">
                                    {
                                        categories.map((element, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th>{index + 1}</th>
                                                        <th >{element.name}</th>
                                                        <th  className="wordBreak"><img width="150" height="100" src={element.url} /></th>
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
                                <div className="postMethod">
                                    <h1>Add Categories</h1>
                                    <div id="userInputWrp" class="user-input-wrp">
                                        <br />
                                        <input type="text" id="formInput" class="inputText" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                                        <input type="hidden" id="saveIndex" />
                                        <span id="floatingLabel" class="floating-label">Name : </span>
                                    </div>
                                    {error  &&
                                        <p className="error">This Categorie Already Added</p>
                                    }
                                    <div id="userInputWrp" class="user-input-wrp">
                                        <br />
                                        <input type="text" id="formInput" class="inputText" value={url} onChange={(e) => setUrl(e.target.value)} name="url" />
                                        <input type="hidden" id="saveIndex" />
                                        <span id="floatingLabel" class="floating-label">Img-URL : </span>
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

export default Categories;