import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import {BrowserRouter,Routes,Route,useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios'


function Login() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const location = useLocation();  
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
      if (name.length>0 && password.length>0){
        e.preventDefault()
        axios.post('https://clipkun-server.vercel.app/login', {name, password})
        .then(res => {
            console.log(res);
            if (res.data!=="The password is incorrect." && res.data!=="No user with that name exists."){
              if(location.state){
                navigate(location.state.path,{state:{user:res.data}});
              }
              else{
                navigate(`/main`,{state:{user:res.data}});
              }
              
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
                <strong>Name</strong>
              </label>
              <input
                id="field"
                type="email"
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
  