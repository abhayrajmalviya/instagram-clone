import { Button, Input, Modal } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebase';
import '../static/SignUp.css'

function SignUp() {
  const [open, setOpen] = useState(false);
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser)=> {
        authUser.user.updateProfile({
          displayName: username
       })
      })
      .catch((error)=> alert(error.message))
    setOpen(false)
  }

  
  return (
   
      <div>
        <Modal
          open = {open}
          onClose = {()=> setOpen(false)}
         >
        {/* style={modelStyle} */}
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
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Button type="submit" onClick={signUp}>Signup</Button>
          </form>
        </div>
      </Modal>
   
      <Button onClick={() => setOpen(true)}>SignUp</Button>
    </div>
  )
}

export default SignUp