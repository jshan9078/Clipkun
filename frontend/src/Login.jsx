import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import {BrowserRouter,Routes,Route,useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios'


function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const location = useLocation();  

    const handleSubmit = (e) => {
      if (email.length>0 && password.length>0){
        e.preventDefault()
        axios.post('http://localhost:5000/login', {email, password})
        .then(res => {
            console.log(res);
            if (res.data!=="The password is incorrect." && res.data!=="No user with that email exists."){
              navigate(location.state.path,{state:{user:res.data}});
            }
            else{
              alert(res.data);
            }
            
        }).catch(err => console.log(err))
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    }
  

    return (
    <div id="signupPage">
        <h1 id="mainName">Clip-kun</h1>
        <h2 id="header">Login</h2>
        <div className="p-3 rounded w-100" id="signupForm">
          <form >
            <div className="mb-3">
              <label id="signupLabel" htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                id="field"
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="rounded-3"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label id="signupLabel" htmlFor="email">
                <strong>Password</strong>
              </label>
              <input
                id="field"   
                type="password"
                placeholder="Enter Password"
                name="password"
                className="rounded-3"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            </form>
            <button id="confirmButton" onClick={handleSubmit}>
              Confirm
            </button>
        </div>
      </div>
      
    );
  }
  
  export default Login;
  