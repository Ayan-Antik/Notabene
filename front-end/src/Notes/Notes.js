import React from 'react'
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './Notes.css'
import Navbar from '../components/Navbar'
import Iframe from 'react-iframe'
import TextField from '@mui/material/TextField';

const notes = () => {
  return (
<div >

    <div>
      <Navbar />
        <Sidebar />

    </div>

    <div className='note-container'>

        <Iframe url="https://en.wikipedia.org/wiki/Lizard" className='iframe'
        />

    <div>

        <h1 style={{textAlign:'left'}}>Highlights: </h1>

    </div>

    <div>
    <p style={{align:"left"}}>Lizards are a widespread group of squamate reptiles, with over 7,000 species</p>
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
        <p>Most lizards are quadrupedal, running with a strong side-to-side motion.</p>
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
    <p>Lizards typically have rounded torsos, elevated heads on short necks, four limbs and long tails</p>
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
    <p>The dentitions of lizards reflect their wide range of diets, including carnivorous, insectivorous</p>
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

export default notes