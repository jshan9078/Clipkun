import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'


function Signup() {
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        if (name.length>0 && password.length>0 && confirmPassword.length>0 && password===confirmPassword){
            e.preventDefault()
            axios.post('https://clipkun-server.vercel.app/register', {name, password})
            .then(res => {
                console.log(res);
                if(res.data==="Success"){
                  navigate('/login',{state:{path:`/main`}});
                }
                else{
                  alert(res.data);
                }
            }).catch(err => console.log(err))
        }
        else if (password!==confirmPassword){
            alert('The passwords do not match.');
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
        <h2 id="header">Sign Up</h2>
        <div className="p-3 rounded w-100" id="signupForm">
          <form >
          <div className="mb-3">
              <label id="signupLabel" htmlFor="email">
                <strong>Name</strong>
              </label>
              <input 
                id="field"
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="email"
                className="rounded-3"
                onChange={(e) => setName(e.target.value)}
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
              />
            </div>

            <div className="mb-3">
              <label id="signupLabel" htmlFor="email">
                <strong>Confirm Password</strong>
              </label>
              <input
                id="field"   
                type="password"
                placeholder="Enter Password"
                name="password"
                className="rounded-3"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            
            </form>
            <button id="confirmButton" onClick={handleSubmit}>
              Register
            </button>
        </div>
      </div>
      
    );
  }
  
  export default Signup;
  