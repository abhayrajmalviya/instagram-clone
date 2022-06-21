import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import ImageUpload from './ImageUpload';
import SignIn from './SignIn';
import SignUp from './SignUp';
import styled from 'styled-components';




function Header() {
    const [user,setUser] = useState(null);

    useEffect(() =>{
        const unsubscribe =auth.onAuthStateChanged((authUser)=>{
        if (authUser){
            //user has logged in
            // console.log(authUser);
            setUser(authUser);
        }
        else{
            //user has logged out
            setUser(null);
        }
        })
        return () =>{
        unsubscribe();
        }
    }, [user]);


  return (
    
    <Main>
        <LeftHeader>
            <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
            alt="" 
            />
        </LeftHeader>
        
        <RightHeader>
            {
            user ? (
                <AuthContainer>
                    <ImageUpload username={user.displayName}/>
                    <Button 
                        onClick={() => {
                        auth.signOut() ;
                        setUser(null);
                        }}
                    > 
                        Logout
                    </Button>
                </AuthContainer>
            ):(      
                <AuthContainer>
                    <SignUp/>
                    <SignIn/>
                </AuthContainer>           
               
            )
            } 
        </RightHeader>
        
    </Main>
    
  )
}


const Main = styled.div`
    display: flex;
    position: sticky;
    top: 0;  
    background-color: white; 
    z-index: 1;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 10px;
    align-items: center;
`;


const LeftHeader = styled.div`
    
    img{
        object-fit: contain;
        height:40px;
        padding : 0 10px;
        margin-top: 5px;
    }
`;

const RightHeader = styled.div`
    justify-content : space-between;
`;
const AuthContainer = styled.div`
    display :flex;
    margin-right: 20px;
    justify-content : space-between;
    padding: 0 20px;
`;
export default Header
