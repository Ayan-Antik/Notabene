import React, { useEffect } from 'react'
import { useContext, useState } from "react";
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './feed.css'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const SharedFeed = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const handleSubmit = (event) => {
    console.log("Logout Clicked");
    console.log(user);
    logoutUser();
  }

  const [data, setData] = useState([{
  }]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/documents/list/?editors__username=${user.username}`).then((response) => {
      response.data.forEach((data) => {
        data.created_date = data.created_date.substr(0, 10);

        //*Splitting card detail to make card size constant
        if (data.summary.length > 50) {
          var split = data.summary.split(".");
          data.summary = split[0] + "...";
        }
      })
      setData(response.data);
    });
  }, []);

  let nav = useNavigate();

  return (
    <>
      {user ?
        <div>
          <Navbar user={user} handleSubmit={handleSubmit} />
          <Sidebar user={user} />
          <div className='all_notes'>
            <div className='card-view-2' >
              <div className='grid-item' style={{ marginBottom: '-4px' }}>
                <h1 style={{ fontSize: '36px' }}>Shared Docs</h1>
              </div>
              <div className='grid-item' style={{ marginBottom: '-4px' }}></div>
              <div className='grid-item' style={{ marginBottom: '-4px' }}></div>

              {data.map(function (card_data, i) {
                if (card_data.owner != null) {
                  return (
                    <div className='grid-item' key={i}>
                      <MyCard
                        card={card_data}
                      />
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
        : nav("../user/login", { replace: true })}
    </>
  )
}

export default SharedFeed;