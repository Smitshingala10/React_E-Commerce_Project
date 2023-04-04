import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [inputval, setInputVal] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    })
    const [uniqueid, setUniqueId] = useState("");
    const [login, setLogin] = useState(false);
    const [userdata, setUserData] = useState([]);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3200/login").then((result) => {
            setUserData(result.data);
        })
    }, [login])

    const LoginForm = () =>{
        const loginEmail = inputval.email;
        const loginPassword = inputval.password;
        userdata.map((element, index)=>{
            if(element.email === loginEmail && element.password === loginPassword){
                localStorage.setItem('user', JSON.stringify(element));
                navigate("/user");
            }else{
                setError(true)
            }
        })
    }

    const vieData = (e) => {
        const { value, name } = e.target;
        setInputVal(() => {
            return {
                ...inputval,
                [name]: value
            }
        })
        const id = Math.floor(Math.random() * 999);
        setUniqueId(id);
    }

    const saveData = () => {
        let userId = (inputval.name + uniqueid);
        const { name, email, mobile, password } = inputval;
        inputval['userId'] = userId;

        axios.post("http://localhost:3200/login", inputval).then((resp) => {
        })
        setInputVal(" ");
    }
    return (
        <>
            <Header />
            {/* sign-up Form start */}
            { login == false &&
            <div>
                <div class="container1">
                    <div class="LoginDiv ">
                        <h1 className="mb-4">Sign Up</h1>
                        <div className="d-flex flex-column loginInput mb-5">
                            <input onChange={vieData} value={inputval.name} type="text" placeholder="User Name" name="name" id="name" />
                            <input onChange={vieData} value={inputval.email} type="email" placeholder="Email" name="email" id="email" />
                            <input onChange={vieData} value={inputval.mobile} type="mobile" placeholder="Mobile" name="mobile" id="mobile" />
                            <input onChange={vieData} value={inputval.password} type="password" placeholder="Password" name="password" id="password" />
                        </div>
                        <button onClick={() => saveData()} className="loginBtn mb-3">Sign Up</button>
                        <div>
                            <a className="loginLink text-decoration-none">if you have already account please <span onClick={()=>setLogin(true)}>Login</span></a>
                        </div>
                    </div>
                </div>
            </div>
            }
            {/* sign-up Form end */}
            {/* login page start */}
            {login && 
            <div>
                <div class="container1">
                    <div class="LoginDiv ">
                        {error &&
                            <p className="errorLogin">please write correct email or password</p>
                        }
                        <h1 className="mb-4">Login</h1>
                        <div className="d-flex flex-column loginInput mb-5">
                            <input onChange={vieData} value={inputval.email} type="email" placeholder="Email" name="email" id="email" />
                            <input onChange={vieData} value={inputval.password} type="password" placeholder="Password" name="password" id="password" />
                        </div>
                        <button onClick={()=>LoginForm()} className="loginBtn mb-3">Login</button>
                        <div>
                            <a className="loginLink text-decoration-none">create new account <span onClick={()=>setLogin(false)}> sign up</span></a>
                        </div>
                    </div>
                </div>
            </div>
            }
            {/* login page end */}
            <Footer />
        </>
    )
}

export default Login;