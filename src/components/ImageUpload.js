import { Button, Input, Modal } from '@mui/material'
import React ,{useState} from 'react'
import {db, storage} from '../firebase.js'
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import '../static/ImageUpload.css'

function ImageUpload({username}) {
    const [caption, setCaption]= useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [openUpload, setOpenUpload] = useState(false);

    const handleChange = (e) =>{
        if (e.target.files[0]){
            setImage(e.target.files[0]);
            console.log(image)
        }
        
    }    

    const handleUpload = () =>{
        document.getElementById("uploadCaptureInputFile").value = null;
        document.getElementById("captionCaptureInputFile").value = "";

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) =>{
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete Function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url =>{
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption : caption,
                            imageUrl : url,
                            username: username

                        });

                        setCaption('');
                        setProgress(0);
                        setImage(null);
                    }) 
            },

        )
       
    }
  return (
    <div>
        <Modal
          open = {openUpload}
          onClose = {()=> setOpenUpload(false)}
         >
        <div className="imageupload__model">  
            <div className='imageupload' >
                <progress  className='imageupload__progress' value={progress} max = "100"></progress>
                <Input type="text" className='imageupload__caption' id = "captionCaptureInputFile" placeholder = "Enter your Caption..." onChange={e=>setCaption(e.target.value)}/>
                <Input type="file" id = "uploadCaptureInputFile" onChange= {handleChange}/>
                <Button onClick={handleUpload}  className='imageupload__button'>
                    upload
                </Button>
             </div>
        </div>
      </Modal>
      <Button className='imageupload__modelbutton' onClick={() => setOpenUpload(true)}>Upload Photo</Button>
    </div>
    
  )
}

export default ImageUpload ;