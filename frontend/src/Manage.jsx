import { useState,useEffect } from "react";
import { BrowserRouter,Routes,Route,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios'


function Manage() {
    const location = useLocation();  
    const navigate = useNavigate()

    const routeLogin = () =>{ 
        let path = `/login`; 
        navigate(path,{state:{path:`/manage`}});
    }

    useEffect(()=>{
        if (!location.state){
            routeLogin();
        }
    },[])

    return ( location.state ? 
        (<div id="managePage">
            {location.state.user.userCount}
            {location.state.user.name}
            {location.state.user.clipCount}
            {location.state.user.storage}
            <h1 id="managePage">Manage Page</h1>
        </div>) : <div></div>);

  }
  
  export default Manage;
  