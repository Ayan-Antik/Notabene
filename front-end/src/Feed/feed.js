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
   // logoutUser();
  }

  const [data, setData] = useState([{
    url: "",
    title: "",
    summary: "",
    source_type: "",
    created_date: "2022-07-28",
    modified_date: "2022-07-28",
    privacy: "",
    is_deleted:  "",
    read_count: 2,
    rating: 0

  }]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/documents/list/").then( (response) => {
      console.log(response.data[0]);
	  response.data.forEach((data) => {
		data.modified_date = data.modified_date.substr(0, 10);
	  })
	  
    //   response.data[0].modified_date = response.data[0].modified_date.substr(0, 10);
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <Navbar user = {user}/>
        <Sidebar />
        <div className='feed-reco'>
            <h1 style={{fontSize:'36px'}}>Discover</h1>
			
            <div className='card-view' style={{display:'flex' }}>
				{data.map(function(dat, i){
					console.log("i: ", i);
					if(i%2 === 1){
						return (<div key={i}><MyCard card = {dat}
							/><br></br></div>)
					}
					else{
						return <MyCard card = {dat} key={i}/>

					}
				})}
                {/* <MyCard card = {data[0]}/>
                <MyCard card = {data[1]}/> */}

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