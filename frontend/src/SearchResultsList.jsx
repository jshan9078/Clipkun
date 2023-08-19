import { useState } from "react";
import {BrowserRouter,Routes,Route,useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios'
import SearchResult from "./SearchResult";


const SearchResultsList = ({results}) => {
    
      

    return (
        <div id="resultsList">
        {
            results.map((result, id)=>{
                return <SearchResult result={result} key={id}/>
            })
        }
        </div>  
      
    );
  }
  
  export default SearchResultsList;
  