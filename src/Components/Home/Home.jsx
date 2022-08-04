import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
export default function Home() {

  const [movies , setMovies] = useState( [] );
  const [tvArray, setTvArray] = useState( [] )

  async function getMovies(){
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=d37367df51a8c88f28ec807da31d4637')
    setMovies(data.results);
    // console.log(data.results);
    };

    async function tvShows(){
      let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=d37367df51a8c88f28ec807da31d4637');
      // console.log(data.results);
      setTvArray(data.results);
    }
  useEffect(() => {
    tvShows();
    getMovies();
  }, [])
  
  return <>
  
  {movies.length > 0 && tvArray.length > 0 ? <div className="container">
    <div className="row">
      <div className="col-md-4 d-flex align-items-center">
        <div className="title ">
          <h3>Trending movies to watch</h3>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>

      {movies.map((movie,idx)=> <div className='col-md-2' key={idx}>
      <Link to={`/moviedetails/${movie.id}`}>
            <div className='movie' >
              <img className='w-100' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
              <h5 className='mt-2'>{movie.title}</h5>
            </div>
            </Link>
          </div>
        )}
    </div>

    <div className="row">

      <div className="col-md-4 d-flex align-items-center">
        <div className="title">
          <h3>Trending TV shows to watch</h3>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>

      {tvArray.map((tv,idx)=><div key={idx} className='col-md-2'>
        <div className="tv">
          <img className='w-100' src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} alt={tv.name} />
          <h5 className='mt-2'>{tv.name}</h5>
        </div>
      </div>)}  

    </div>
  </div>: <div className='vh-100 d-flex justify-content-center align-items-center'>
    <i className='fa-solid fa-spinner fa-spin fa-3x text-white'></i>
  </div>}
  

  </>
}
