import React, { useEffect } from 'react'
import { useContext, useState } from "react";
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './feed.css'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import axios from "axios"
import Notes from '../Notes/Notes';

  

const Feed = () => {

  const { user, logoutUser } = useContext(AuthContext);
  const handleSubmit = (event) =>{
	  console.log("Logout Clicked");
	  console.log(user);
	  logoutUser();
  }
//   console.log(cardData);
  const [data, setData] = useState([{
  }]);
  useEffect(() => {
	  
	  axios.get("http://127.0.0.1:8000/documents/list/").then( (response) => {
    //   console.log(response.data[0]);
	  response.data.forEach((data) => {
		
		data.modified_date = data.modified_date.substr(0, 10);

		//*Splitting card detail to make card size constant
		if(data.summary.length > 50){
			var split = data.summary.split(".");

			data.summary = split[0] + ".";
		}

	  })
	  
	  //   response.data[0].modified_date = response.data[0].modified_date.substr(0, 10);
      setData(response.data);
    });
	

  }, []);



  return (
    <div>
      <Navbar user = {user} handleSubmit = {handleSubmit}/>
        <Sidebar />
	   	 <div className='feed-reco'>
			{/* style={{display:'flex', maxWidth:'650px' }} */}
			<div className='recommendation'>

				<div className='grid-item'  style={{marginBottom:'12px'}}>

				<h1 style={{fontSize:'36px'}}>Recommendations</h1>
				</div>
				<div className='grid-item' style={{marginBottom:'12px'}}></div>
				{data.map(function(card_data, i){
						
						if(card_data.owner != null){

							return (
							
								<div className='grid-item' key={i}>
									<MyCard 
									card = {card_data}
		
									/>
								</div>
							
							)
						}

					})}
			</div>

            <div className='card-view' >
					<div className='grid-item'>

						<h1 style={{fontSize:'36px'}}>Discover</h1>
					</div>
					<div className='grid-item'></div>
				
				{data.map(function(card_data, i){	
					
					if(card_data.owner != null){

						return (
						
							<div className='grid-item' key={i}>
								<MyCard 
								card = {card_data}
	
								/>
							</div>
						
						)
					}
					


				})}

            </div>         

        </div>
	   
    </div>
  )
}

export default Feed