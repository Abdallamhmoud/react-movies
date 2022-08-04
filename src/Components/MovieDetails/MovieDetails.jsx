import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

export default function MovieDetails() {
    const [movieObject, setMovieDetails] = useState({})
    let { id } = useParams();
    
    async function getMovieDetails(){
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d37367df51a8c88f28ec807da31d4637`);
        console.log(data);
        setMovieDetails(data);
    }
    useEffect(()=>{
        getMovieDetails();
    } , [])

  return <>
  
  <div className="container">
    <div className="row">
        <div className="col-md-4">
            <div className="myfilm">
                <img className='w-100' src={`https://image.tmdb.org/t/p/original${movieObject.poster_path}`} alt={`${movieObject.original_title}`} />
            </div>
        </div>
        <div className="col-md-8">
            <div className="infoFilm">
                <h3>{movieObject.original_title}</h3>
                <p className='text-muted py-2'>{movieObject.tagline}</p>
                {movieObject.genres?.map((genre,idx)=><span key={idx} className='badge badge-primary bg-info me-2 p-2'>
                    {genre.name}
                </span>)}
                <h5 className='py-3'>Vote : {movieObject.vote_average}</h5>
                <h5 className='py-3'>Vote Count : {movieObject.vote_count}</h5>
                <h5 className='py-3'>popularity : {movieObject.popularity}</h5>
                <h5 className='py-3'>release date : {movieObject.release_date}</h5>
                <p className='text-muted'>{movieObject.overview}</p>
            </div>
        </div>
    </div>
  </div>
  </>
}
