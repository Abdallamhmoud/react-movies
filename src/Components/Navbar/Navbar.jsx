import {Link} from 'react-router-dom';
import React from 'react'

export default function Navbar( {crrUser ,logout} ) {
  return <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NOXE</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      {crrUser ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tv">Tv SHows</Link>
        </li>
      </ul>: ''}

      <ul className="navbar-nav d-flex align-items-center ms-auto mb-2 mb-lg-0">
        <li className="nav-item text-white">
            <i className='fa-brands me-3 fa-facebook'></i>
            <i className='fa-brands me-3 fa-twitter'></i>
            <i className='fa-brands me-3 fa-instagram'></i>
            <i className='fa-brands me-3 fa-spotify'></i>
        </li>

        {crrUser ? <li className="nav-item">
          <span onClick={ logout } className="nav-link active" aria-current="page" >Logout</span>
        </li>: <>
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        
        </>}
        
        
      </ul>
    </div>
  </div>
</nav>
  
  </>
}
