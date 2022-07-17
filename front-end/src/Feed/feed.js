import React from 'react'
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './feed.css'
import Navbar from '../components/Navbar'
const feed = () => {
  return (
    <div>
      <Navbar />
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

export default feed