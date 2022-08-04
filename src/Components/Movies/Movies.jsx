import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Movies() {

  const [movies , setMovies] = useState( [] );


  async function getMovies(){
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=d37367df51a8c88f28ec807da31d4637')
    setMovies(data.results);
    console.log(data.results);
    };

    useEffect(() => {
      getMovies();
    }, [])

  return <>
  <div className="container">
  <div className="row">
      <div className="col-md-4 d-flex align-items-center">
        <div className="title ">
          <h3>Trending movies to watch</h3>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </div>

      {movies.map((movie,idx)=><div className='col-md-2' key={idx}>
            <div className='movie' >
              <img className='w-100' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
              <h5 className='mt-2'>{movie.title}</h5>
            </div>
          </div>
        )}
    </div>
  </div>
  </>
}
