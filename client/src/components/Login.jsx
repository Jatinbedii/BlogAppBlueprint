import { useContext, useState } from "react"
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { GlobalInfo } from "../UserContext.mjs";
function Login() {
  const navigate = useNavigate();
    const {setusername} = useContext(GlobalInfo)
    const [usernamee,setusernamee] = useState('')
    const [passwordd,setpasswordd] = useState('')

    const submithandler=async(e)=>{
      e.preventDefault();
      const res = await axios.post('http://localhost:3000/login',{username: usernamee,password: passwordd},{withCredentials: true})

       if(res.status==200){
        setusername(res.data.username);
       }else{
        return console.log('not logged in')

       }

       setusernamee('');
       setpasswordd('');
       navigate('/')
      


    }


    return (
      <div>
        <form onSubmit={submithandler}>
          <input autoComplete="on" value={usernamee} type="text" onChange={(e)=>setusernamee(e.target.value)}/>
          <input autoComplete="on" value={passwordd} type="password" onChange={(e)=>setpasswordd(e.target.value)}/>
          <button type="submit">Login</button>
        </form>
  
      </div>
    )
  }
  
  export default Login