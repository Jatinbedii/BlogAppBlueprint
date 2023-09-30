import { useState } from "react"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

function Register() {
  const navigate = useNavigate();

    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')

    const submithandler=async(e)=>{
      
        e.preventDefault();
       await axios.post('http://localhost:3000/register',{
          username,password
        }).then((res)=>{
          if(res.status!=200){
            toast('Error')
             return console.log('cannot register');}
        }).catch((Err)=>{return console.log(Err)})

        toast('Account created')
        setusername('');
        setpassword('');
       navigate('/login')

        
    }


    return (
      <div>
        <form onSubmit={submithandler}>
          <input autoComplete="on" value={username} type="text" onChange={(e)=>setusername(e.target.value)}/>
          <input autoComplete="on" value={password} type="password" onChange={(e)=>setpassword(e.target.value)}/>
          <button type="submit">Register</button>
        </form>
      <ToastContainer/>
      </div>
    )
  }
  
  export default Register