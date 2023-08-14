import { useState } from "react";
import { BrowserRouter,Routes,Route,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios'


function MainPage() {
    const location = useLocation();  

    return (
        <div id="mainPage">
            {location.state.user.email}
            {location.state.user.userCount}
            {location.state.user.name}
        </div>
      
    );
  }
  
  export default MainPage;
  