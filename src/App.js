import {Routes , Route , useNavigate , Navigate} from 'react-router-dom'
import './App.css';
import About from './Components/About/About';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Movies from './Components/Movies/Movies';
import TvShows from './Components/TvShows/TvShows';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';


function App() {

  function GuardComponent(props){

    if(localStorage.getItem('token') == null){
      // return <Login/>
      // Navigate is a component
      return <Navigate to="/login"/>
    }
    else{
      return props.children;
    }
    
  }

  //useNavigate is a function
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  function getToken(){
    let user = jwtDecode(localStorage.getItem('token'));
    // console.log(user);
    setCurrentUser(user);
  }

  function logOut(){
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  }

  useEffect(()=>{
    if(localStorage.getItem('token' !== null)){
      getToken();
    }

  }, [])

  return <>
  <Navbar crrUser={currentUser} logout={logOut}/>

  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/home' element={<Home />}/>
    <Route path='/movies' element={ <GuardComponent> <Movies /> </GuardComponent> }/>
    <Route path='/tv' element={ <GuardComponent> <TvShows /> </GuardComponent> }/>
    <Route path='/about' element={<About />}/>
    <Route path='/moviedetails' element={ <MovieDetails /> }>
      <Route path=':id' element={<MovieDetails />}/>
    </Route>

    <Route path='/register' element={<Register />}/>
    <Route path='/login' element={<Login decodeToken={getToken}/>} /> 
    <Route path='*' element={<div className='vh-100 d-flex justify-content-center align-items-center'>
      <h1>  </h1>
    </div>}/> 
  </Routes>
  
  </>
}

export default App;
