import { useState,useEffect } from "react";
import { BrowserRouter,Routes,Route,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios';
import SearchResultsList from "./SearchResultsList";


function MainPage() {
    const [ready, setReady] = useState(false);
    const location = useLocation();  
    const navigate = useNavigate();
    const  [name, setName] = useState();
    const  [anime, setAnime] = useState();
    const  [episode, setEpisode] = useState();
    const [startMinute, setStartMinute] = useState();
    const [startSecond, setStartSecond] = useState();
    const [endMinute, setEndMinute] = useState();
    const [endSecond, setEndSecond] = useState();
    const [epCount,setEpCount] = useState(1);
    const [searchResults,setSearchResults]=useState([]);
    const [searchQuery,setSearchQuery]=useState('');
    const[element,setElement]=useState()

    const routeLogin = () =>{ 
        let path = `/login`; 
        navigate(path,{state:{path:`/main`}});
    }

    const handleSubmit = (e) => {
      const name = location.state.user.name;
      axios.post('http://localhost:5000/getuser',{name})
      .then(res=> {
        navigate(`/manage`,{state:{user:res.data}});
      }).catch(err => console.log(err))
    }

    useEffect(()=>{
        if (!location.state){
            routeLogin();
        }
    },[])

    const upload=async(e)=>{
        e.preventDefault();
        if (!(name && episode && anime && startMinute && startSecond && endSecond && endMinute)){
          alert('Please fill out all the fields');
        }
        else {
          const startTime = ((+startMinute)*60) + (+startSecond);
          const endTime = ((+endMinute)*60) + (+endSecond);
          if (endTime<=startTime || endTime-startTime > 60){
            alert('Clip must be at least 1 and at most 60 seconds long.')
          }
          else{
            const response = await fetch(`https://weebapi.onrender.com/get_episode/${anime.siteLink}/${episode}`);
            const data = await response.json();
            const optionsResponse = await fetch(`https://weebapi.onrender.com/get_download_options/${data.episodeLink}`);
            const optionsData = await optionsResponse.json();
            const paheLink = optionsData[0].url;
            const downloadLinkData = await fetch(`https://weebapi.onrender.com/get_download_link/${paheLink}`);
            const downloadLink = await downloadLinkData.json();
            const formData = new FormData();
            formData.append('url',downloadLink);
            const owner = location.state.user.name;
            formData.append("name", name);
            formData.append("anime", anime.title);
            formData.append("episode", episode);
            formData.append("owner", owner);
            formData.append("startTime",startTime);
            formData.append("endTime",endTime);
            axios.post('http://localhost:5000/clip', formData)
            .then(res=>{
              console.log(res.data);
              alert("Clip uploaded");
            }).catch(err => console.log(err))
          }
        }
    }

    const searchFunction = async(e) =>{
      try{
        const response = await fetch(`https://weebapi.onrender.com/get_search_results/${e}`);
        const data = await response.json();
        const results = data.filter(entry=>entry.type!=="Movie");
        setSearchResults(results);
      }
     catch {
        setSearchResults([]);
     }
    }

    const handleChange = (value) =>{
      setSearchQuery(value);
      searchFunction(value);
    }

    const handleSelection = async(value) =>{
      setSearchResults([]); //hides results
      const response = await fetch(`https://weebapi.onrender.com/get_full_data/${value.siteLink}`);
      const data = await response.json();
      setAnime(data); //stores anime obj
      setSearchQuery(''); //resets search bar entry
      setEpCount(data.epCount);
      setElement(<h1 id="selection"><strong>{data.title}</strong></h1>)
    }
    

    return ( location.state ? 
        (<div id="mainPage">
            <h1 id="mainName">Clip-kun</h1>
            <h2 id="header">Create Clips</h2>
            <button id="confirmButton" onClick={handleSubmit}>Manage Clips</button>
            <div id="searchBarContainer">
              <input type="text" value={searchQuery} onChange={(e)=> handleChange(e.target.value)} id="inputWrapper" placeholder='Search for an anime'/>
              <div id="resultsList">
              {
                  searchResults.map((result, id)=>{
                      return <div id="searchResult" key={id} onClick={()=>{handleSelection(result)}}>
                        {result.title}
                      </div>  
                  })
              }
              </div>  
              <div id="searchChoice">{anime ? element : <h1></h1>}</div>
            </div>
            <div>
              <h1 id="formField">Episode Choice</h1>
              <label id="secondLabel" htmlFor="email">
                  <strong>Episode Number:</strong>
                </label>
              <input
                  id="clipNameField"
                  type="number"
                  name="number"
                  min="1"
                  max={epCount}
                  onChange={(e) => setEpisode(e.target.value)}
                  required
                />
            </div>
            <div>
              <h1 id="formField">Clip Name</h1>
              <input
                id="clipNameField"
                type="email"
                placeholder="Enter clip name"
                autoComplete="off"
                name="email"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <h1 id="formField">Start Time</h1>
              <div id="time">
                <label id="minuteLabel" htmlFor="email">
                  <strong>Minute:</strong>
                </label>
                <input
                  id="clipNameField"
                  type="number"
                  name="number"
                  min="0"
                  max="120"
                  onInput={(e) => setStartMinute(e.target.value)}
                  required
                />
              </div>
              <div id="time">
                <label id="secondLabel" htmlFor="email">
                  <strong>Second:</strong>
                </label>
                <input
                  id="clipNameField"
                  type="number"
                  name="number"
                  min="0"
                  max="59"
                  onInput={(e) => setStartSecond(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <h1 id="formField">End Time</h1>
              <div id="time">
                <label id="minuteLabel" htmlFor="email">
                  <strong>Minute:</strong>
                </label>
                <input
                  id="clipNameField"
                  type="number"
                  name="number"
                  min="0"
                  max="120"
                  onInput={(e) => setEndMinute(e.target.value)}
                  required
                />
              </div>
              <div id="time">
                <label id="secondLabel" htmlFor="email">
                  <strong>Second:</strong>
                </label>
                <input
                  id="clipNameField"
                  type="number"
                  name="number"
                  min="0"
                  max="59"
                  onInput={(e) => setEndSecond(e.target.value)}
                  required
                />
              </div>
            </div>
            <button id="createButton" onClick={(e)=>upload(e)}>Confirm</button>

        </div>) : <div></div>);
    
    
    

  }
  
  export default MainPage;
  