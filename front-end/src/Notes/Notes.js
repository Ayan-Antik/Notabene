import React, { useEffect, useState } from 'react'
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './Notes.css'
import Navbar from '../components/Navbar'
import Iframe from 'react-iframe'
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom'
import axios from "axios"
import Source from './search.png'
import { padding } from '@mui/system'

const Notes = ({user, handleSubmit}) => {
  const {id} = useParams()
  // const [props, setProps] = useState(null)

  let [data, setData] = useState({});
  const [highlights, setHighlights] = useState([{}]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/documents/list/?owner__username=&id=${id}`).then( (response) => {
  
      setData(response.data[0]);
    //   console.log(data?.url);
    //   data.url = data?.url.toString();
	  });
  }, []);

  useEffect(() => {
	axios.get(`http://127.0.0.1:8000/highlight/list/?document__owner__username=&document__url=&document__id=${id}`).then((response) => {

	// console.log(response.data);
	setHighlights(response.data);

	});
  }, []);
  return (
  	<div >

	<Navbar user = {user} handleSubmit = {handleSubmit}/>
		<Sidebar />


    <div className='note-container'>

		<div className='note-info'>
			<div>
			<h1>
				{data.title}
			</h1>

			</div>
			<div style={{display: 'grid', gridTemplateColumns: 'max-content auto'}}>
			
				<span>
					<img src={Source} width='32px'></img> 

				</span>
				<span style={{font: '24px bold', marginLeft: '16px'}}>
			

				<a href={data.url}>{data.url}</a>
				

				</span>
			</div>
			<h2>
				#
			</h2>
		</div>

        <Iframe url={data.url} className='iframe'
        />

    <div>

        <h1 style={{textAlign:'left'}}>Highlights: </h1>

    </div>

    <div>
	{highlights.map(function(highlight, i){
		console.log(highlight.text);
		return (<div>

		<p className='highlighted'>
			{highlight.text}

		</p>
		{highlight.note? <p style={{border: "2px solid black"}}>
		</p> : null}
		
		</div>)

	})}
    <p className='highlighted'>Lizards are a widespread group of squamate reptiles, with over 7,000 species</p>
        <TextField
          id="outlined-multiline-flexible"
          label="Edit Note"
          multiline
          maxRows={4}
          length="100px"
          style ={{width: '700px'}}
          variant="standard"
          color="warning"
          focused
          //margin-top="20%"
          //value={value}
          //onChange={handleChange}
          />
          <br/>
          <br/>
    {/* </div>
    <div> */}
  
  
    
    </div>

    </div>

    </div>
  )
}

export default Notes