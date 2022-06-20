import './static/App.css';
import Post from './components/Post';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { useState , useEffect } from 'react';
import { db , auth} from './firebase';
import { Button } from '@mui/material';
import ImageUpload from './components/ImageUpload';


function App() {
  const [posts, setPosts] = useState([]);
  const [user,setUser] = useState(null);

  // const [openSignIn, setOpenSignIn] = useState('');

  useEffect(() => {
  // this is where the code runs
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id : doc.id,
        post :doc.data()
      })));
    })
  },[posts]);

  useEffect(() =>{
    const unsubscribe =auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        //user has logged in
        console.log(authUser);
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
    <div className="app">

      {/* app header */}
      <div className="app__header">
        <img 
          className="app_headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
          alt="" 
        />

        {
          user ? (
            <div className="app__loginContainer">
              <ImageUpload username={user.displayName}/>
              <Button 
                onClick={() => {
                  auth.signOut() ;
                  setUser(null);
                }}
              > 
                Logout
              </Button>
          </div>
          ):(
            <div className="app__loginContainer">
              <SignUp/>
              <SignIn/>
            </div>
          )
        } 
        
      </div>

      {/* post components */}

      <div className='app__posts'>
        <div className="app__postsLeft">
          {
            posts.map(({id , post}) =>(
              <Post key={id} postId={id} user ={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
        </div>
        <div className="app__postsRight">
          {/* <h1>need to add other thing on the right side of the window</h1>    */}
        </div>
      </div>
      
    </div>
  );
}

export default App;
