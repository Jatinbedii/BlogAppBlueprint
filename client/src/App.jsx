import {Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login';
import Register from './components/Register';
import { GlobalInfo } from './UserContext.mjs';
import { useState } from 'react';
import Create from './components/Create';
import Posts from './components/Posts';
import SinglePost from './components/SinglePost';

function App() {

  const [username,setusername] = useState(null);
  return (
    <>
 
      <GlobalInfo.Provider value={{username,setusername}}>
    <Routes>
      
      <Route index path='/' element={<><Navbar/><Posts/></>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create' element={<><Navbar/><Create/></>}/>
      <Route path='/post/:id' element={<><Navbar/><SinglePost/></>}/>
    
      </Routes>
      </GlobalInfo.Provider>

     
    </>
  )
}

export default App
