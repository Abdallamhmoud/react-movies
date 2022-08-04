import Joi from 'joi';
import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


export default function Login({decodeToken}) {

  let navigate = useNavigate();

  const [loginFlag, setLoginFlag] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errList, setErrList] = useState([]);
  const [failedMessage, setFailedMessage] = useState("")

  // function currentErr(key){
  //   for (const err of errList) {
  //     if(err.context.key == key)
  //     return err.message;
  //   }
  //   return "";
  // }

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
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[a-z0-9]{4,10}$/i).required()
    });

    let joiResp = schema.validate(user , {abortEarly : false});

    if(joiResp.error){
      setErrList(joiResp.error.details);
      setLoginFlag(false);
    }
    else{
      //call API
      let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin', user);
      if(data.message == "incorrect password"){
        setFailedMessage(data.message);
      }
      else{
        localStorage.setItem('token', data.token);
        decodeToken();
        navigate('/home');
      }
      setLoginFlag(false);
    }
  }

  return <>
  <form onSubmit={submitForm} className='w-75 mx-auto' >
    {/* <div>email: abdalla290899@gmail.com <span>password: abdalla26</span></div> */}
    { failedMessage.length == 0 ? null : <div className="alert alert-danger">
      {failedMessage}
    </div> }


    {errList.map((err,idx)=><div key={idx} className='alert alert-danger'>
      {err.message}
    </div>)}



    <label htmlFor="email">email</label>
    <input onChange={getUser} type="email" id='email' placeholder='email' className='my-3 form-control' />

    <label htmlFor="password">password</label>
    <input onChange={getUser} type="password" id='password' placeholder='password' className='my-3 form-control' />

    <button className='btn btn-outline-info'>
      {loginFlag ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Log In'}
    </button>
  </form>
  
  </>
}
