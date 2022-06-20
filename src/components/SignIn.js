import { Button, Input, Modal } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebase';
import '../static/SignUp.css'
function SignIn() {

const [openSignIn, setOpenSignIn] = useState('');
const [email , setEmail] = useState('');
const [password , setPassword] = useState('');


const signIn = (event) =>{
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email,password )
      .catch((error)=> alert(error.message))
    setOpenSignIn(false);
  }
  return (
    <div>
        <Modal
            open = {openSignIn}
            onClose = {()=> setOpenSignIn(false)}
         >
        <div className="model__style">  
          <form className='app__signup'>
            <center>
              <img 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
                alt="insta logo"
                className='app__headerImage'  
              />
            </center>
            <Input 
              type="text" 
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <Input 
              type="password" 
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>SignIn</Button>
          </form>
        </div>
      </Modal>
      <Button onClick={() => setOpenSignIn(true)}>signIn</Button>
    </div>
  )
}

export default SignIn