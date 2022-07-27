import React, { useEffect } from 'react'
import { useContext, useState } from "react";
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './feed.css'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import axios from "axios"

const Feed = () => {

  const { user, logoutUser } = useContext(AuthContext);
  const handleSubmit = (event) =>{
    logoutUser();
  }

  const [data, setData] = useState({
    url: "nun",
    title: "nunja",
    summary: "nun",
    source_type: "none",
    created_date: "27-7-1969",
    modified_date: "27-7-1969",
    privacy: "not sure",
    is_deleted:  "not sure",
    read_count: 2,
    rating: 0

  });
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/documents/list/").then( (response) => {
      console.log(response.data[0]);
      setData(response.data[0]);
    });
  }, []);

  return (
    <div>
      <Navbar user = {user}/>
        <Sidebar />
        <div className='feed-reco'>
            <h1 style={{fontSize:'36px'}}>Discover</h1>
            <div className='card-view' style={{display:'flex' }}>
                <MyCard card = {data}/>
                <MyCard card = {data}/>

            </div>
            {/* <div className='card-view' style={{display:'flex' }}>
                <MyCard />
                <MyCard />

            </div> */}
            

        </div>
    </div>
  )
}

export default Feed