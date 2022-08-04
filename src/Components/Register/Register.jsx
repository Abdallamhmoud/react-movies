import Joi from 'joi';
import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


export default function Register() {

  let navigate = useNavigate();

  const [loginFlag, setLoginFlag] = useState(false);

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: '',
  });
  const [errList, setErrList] = useState([]);
  const [failedMessage, setFailedMessage] = useState("")
  
  function currentErr(key){
    for (const err of errList) {
      if(err.context.key == key)
      return err.message;
    }
    return "";
  }


  function getUser(e){

    setErrList([]);

    //get value from input
    let inputVal = e.target.value;
    // deep copy of user object   
    let newUser = {...user};

    newUser[e.target.id] = inputVal;

    // console.log(newUser);
    setUser(newUser);
  }
  async function submitForm(e){

    e.preventDefault();
    setLoginFlag(true);
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(18).max(60).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[a-z0-9]{4,}$/i).required()
    });

    let joiResp = schema.validate(user , {abortEarly : false});

    if(joiResp.error){
      setLoginFlag(false);
      setErrList(joiResp.error.details);
    }
    else{
      //call API
      let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup', user);
      if(data.errors){
        setFailedMessage(data.message);
      }
      else{
        navigate('/login');
      }
      setLoginFlag(false);
    }
  }

  return <>
  <form onSubmit={submitForm} className='w-75 mx-auto' >

    { failedMessage.length == 0 ? null : <div className="alert alert-danger">
      {failedMessage}
    </div> }


    {/* {errList.map((err,idx)=><div key={idx} className='alert alert-danger'>
      {err.message}
    </div>)} */}


    <label htmlFor="first_name">first name</label>
    <input onChange={getUser} type="text" id='first_name' placeholder='first_name' className='my-3 form-control' />
    { currentErr('first_name').length == 0 ? null : <div className='alert alert-danger'>
      {currentErr('first_name')}
    </div> }

    <label htmlFor="last_name">last name</label>
    <input onChange={getUser} type="text" id='last_name' placeholder='last_name' className='my-3 form-control' />
    { currentErr('last_name').length == 0 ? null : <div className='alert alert-danger'>
      {currentErr('last_name')}
    </div> }

    <label htmlFor="age">age</label>
    <input onChange={getUser} type="number" id='age' placeholder='age' className='my-3 form-control' />
    { currentErr('age').length == 0 ? null : <div className='alert alert-danger'>
      {currentErr('age')}
    </div> }

    <label htmlFor="email">email</label>
    <input onChange={getUser} type="email" id='email' placeholder='email' className='my-3 form-control' />
    { currentErr('email').length == 0 ? null : <div className='alert alert-danger'>
      {currentErr('email')}
    </div> }

    <label htmlFor="password">password</label>
    <input onChange={getUser} type="password" id='password' placeholder='password' className='my-3 form-control' />
    { currentErr('password').length == 0 ? null : <div className='alert alert-danger'>
      {currentErr('password')}
    </div> }

    <button className='btn btn-outline-info'>
      {loginFlag ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Register'}
    </button>
  </form>
  
  </>
}
