import './App.css';
import axios from "axios";
import React,{ useEffect, useState, useCallback } from "react";
import {useDropzone} from 'react-dropzone';

// this is functional component
const UserProfiles = () => {

  const [userProfiles, setUserProfiles] = useState([]);

  const fetchUserProfiles = () => {
    axios.get("http://localhost:8080/api/v1/user-profile").then(res => {
      setUserProfiles(res.data);
    })
  }

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return userProfiles.map((userProfile, index) => {
    return(
      <div key={index.toString()}>
          {userProfile.id ?
              <img src={`http://localhost:8080/api/v1/user-profile/${userProfile.id}/image/download`} alt={'no photo'}/>
              :
              null
          }
        <br/> <br/>
        <h2>{userProfile.username}</h2>
        <p>{userProfile.id}</p>
        <Dropzone userProfileId={userProfile.id} />  {/* can typing in simple way {...id} */}
        <br/>
      </div>
    )
  });
};

function Dropzone({ userProfileId }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]; // take the first file
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);

    axios.post(`http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
        formData,
        {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }
        ).then(() => {
            console.log("Image uploaded successfully");
    }).catch(err => {
        console.log(err);
    });

  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
              <p>Drop the image here ...</p> :
              <p>Drag 'n' drop Image Profile, or click to select Profile</p>
        }
      </div>
  )
}

function App() {
  return (
    <div className="App">
      <UserProfiles />
    </div>
  );
}

export default App;
