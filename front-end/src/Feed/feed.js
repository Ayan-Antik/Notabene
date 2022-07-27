import React from 'react'
import { useContext } from "react";
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './feed.css'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'

const Feed = () => {
  
  const { user, logoutUser } = useContext(AuthContext);
  const handleSubmit = (event) =>{
    logoutUser();
  }
  return (
    <div>
      <Navbar user = {user}/>
        <Sidebar />
        <div className='feed-reco'>
            <h1 style={{fontSize:'36px'}}>Discover</h1>
            <div className='card-view' style={{display:'flex' }}>
                <MyCard />
                <MyCard />

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