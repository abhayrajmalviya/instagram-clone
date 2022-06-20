import React, { useState , useEffect } from 'react' ;
import '../static/Post.css' ;
import { db } from '../firebase';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import "firebase/compat/firestore"
import firebase from 'firebase/compat/app';

function Post({postId , user, username, caption, imageUrl}) {
  const [comments, setComments]= useState([]);
  const [comment, setComment]= useState('');

  // db.collection()
  useEffect(() => {
    let unsubscribe;
    if (postId){
        unsubscribe = db
        .collection("posts").doc(postId).collection("comments")
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
          setComments(snapshot.docs.map((doc)=> ({
            id : doc.id,
            comment : doc.data()
          })));
          
        })
    }

    return ()=>{
      unsubscribe();
    };
  },[postId]);
  


  const postComment = (event)=>{
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text : comment,
      username : user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  return (
    <div className="post">
       <div className="post__header">
          <Avatar
              className="post__avatar"
              alt= {username}
              src='/static/image/1.jpg'
          />
          <h3 className='post__username'>{username}</h3>
       </div>

        <img className="post__image" src={imageUrl} alt="" />

        {/* username + caption */}
        <h4 className='post__text'><strong>{username}: </strong>
            {caption}
        </h4>
        {
          <div className="post__comments">
            {comments.map(({id,comment})=>(
              <p key = {id}>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            ))}
          </div>
        }
        {user && 
          <form className='post__commentBox'>
          <input 
            type="text"
            className="post__input"
            placeholder='Add a comment...'
            value={comment} 
            onChange={(e)=> setComment(e.target.value)}
          />
          <Button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
        }
        

    </div>
  )
}

export default Post