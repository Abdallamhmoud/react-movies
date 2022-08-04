import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TvShows() {
  const [tvArray, setTvArray] = useState( [] )

  async function tvShows(){
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=d37367df51a8c88f28ec807da31d4637');
    // console.log(data.results);
    setTvArray(data.results);
  }

  useEffect(() => {
    tvShows();
  }, [])

  return <>
  
  <div className="container">
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
  </div>

  </>
}
