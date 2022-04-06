import './App.css';
import axios from "axios";
import React,{ useEffect, useState } from "react";

// this is functional component
const UserProfiles = () => {
  const fetchUserProfiles = () => {
    axios.get("http://localhost:8080/api/v1/user-profile").then(res => {
      console.log(res);
    })
  }

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return <h1>Hello World</h1>;
};

function App() {
  return (
    <div className="App">
      <UserProfiles />
    </div>
  );
}

export default App;
