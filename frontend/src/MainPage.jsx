import { useState,useEffect } from "react";
import { BrowserRouter,Routes,Route,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios'


function MainPage() {
    const location = useLocation();  
    const navigate = useNavigate()

    const routeLogin = () =>{ 
        let path = `/login`; 
        navigate(path,{state:{path:`/main`}});
    }

    const handleSubmit = (e) => {
        navigate(`/manage`,{state:{user:location.state.user}});
    }

    useEffect(()=>{
        if (!location.state){
            routeLogin();
        }
    },[])

    return ( location.state ? 
        (<div id="mainPage">
            {location.state.user.email}
            {location.state.user.userCount}
            {location.state.user.name}
            <h1 id="mainPage">mainpage</h1>
            <button id="confirmButton" onClick={handleSubmit}>
              Register
            </button>
        </div>) : <div></div>);
    
    
    

  }
  
  export default MainPage;
  