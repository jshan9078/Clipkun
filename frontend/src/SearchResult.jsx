import { useState } from "react";
import {BrowserRouter,Routes,Route,useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios'


const SearchResult = ({result}) => {
    
      

    return (
        <div id="searchResult">
            {result.title}
            </div>  
      
    );
  }
  
  export default SearchResult;
  