import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';


function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
