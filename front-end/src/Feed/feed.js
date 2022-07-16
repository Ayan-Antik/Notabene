import React from 'react'
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './feed.css'

const feed = () => {
  return (
    <div>
        <Sidebar />
        <div className='feed-reco'>
            <h1 style={{fontSize:'40px'}}>Discover</h1>
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