import React, { useEffect, useState, useContext } from 'react'
import { Component } from 'react'
import AuthContext from '../context/AuthContext'
import MyCard from '../components/Card'
import Sidebar from '../components/Sidebar'
import './Notes.css'
import Navbar from '../components/Navbar'
import Iframe from 'react-iframe'
import TextField from '@mui/material/TextField';
import { Button, ListItemIcon } from '@mui/material';
import { useParams } from 'react-router-dom'
import axios from "axios"
import Source from './search.png'
import External from './external.png'
// import Folder from './folder.png'
import { padding } from '@mui/system'
import MDEditor from '@uiw/react-md-editor';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors'
import PropTypes from 'prop-types';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import {Tooltip} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';



/// FOR POPUP

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props, folderArray) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  console.log(folderArray);


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select A Folder</DialogTitle>

      <List sx={{ pt: 0 }}>

        {/* {folderArray.map((folderName) => (
          <ListItem key={folderName}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={folderName} />
          </ListItem>
        ))} */}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>

      </List>

    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


/// FOR POPUP


const Notes = () => {


  const {id} = useParams()
  
  const { user, logoutUser } = useContext(AuthContext);
  const handleSubmit = (event) =>{
	  console.log("Logout Clicked");
	  console.log(user);
	  logoutUser();
  }

  let [data, setData] = useState({});
  const [value, setValue] = useState("");
  const [highlights, setHighlights] = useState([{}]);
  const [hostname, setHostname] = useState("") ;
  useEffect(() => {
    if(id!=null){

      axios.get(`http://127.0.0.1:8000/documents/list/?owner__username=&id=${id}`).then( (response) => {
    
        setData(response.data[0]);
        setHostname(response.data[0].url.toString().split("/")[2]);
        console.log(hostname);
        
        // console.log(typeof(encodeURI(hostname)));
      //   data.url = data?.url.toString();
      });
    }
  }, []);

  const myframe = <iframe src={data.url} className='iframe'></iframe>
  // var img = myframe.getElementByTagName("img")[0];
  // console.log(img)

  useEffect(() => {
	axios.get(`http://127.0.0.1:8000/highlight/list/?document__owner__username=&document__url=&document__id=${id}`).then((response) => {

	console.log(response.data);
	setHighlights(response.data);
  setData(response.data);
  //console.log(response.data[0].note);
  //setValue(response.data.note);
  //console.log({data});

	});
  }, []);


  const client = axios.create({
    baseURL: `http://127.0.0.1:8000/highlight/list/?document__owner__username=&document__url=&document__id=${id}` 
  });


  const updateObjectInArray = (id_val, note_val) => {


    setHighlights(current =>
      current.map(obj => {
        
        // console.log("inside map");
        // console.log(obj.id);
        // console.log(id_val);

        //console.log(note_val);

        if (obj.id === (id_val)) {
          return {...obj, note: note_val};
        }

        return obj;
      }),
    );
  };




  //// FOR POPUP

  const [folders, setFolders] = useState([{}]);

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/documents/listdir/?owner__username=${user.username}`).then((response) => {
  
    console.log(response.data);
    setFolders(response.data);
    //setData(response.data);
    //console.log(response.data[0].note);
    //setValue(response.data.note);

    //console.log(user.username);

    //console.log(folders);
  
    });
    }, []);




  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // //// FOR POPUP ENDS




  return (
  	<div >

	<Navbar user = {user} handleSubmit = {handleSubmit}/>
		<Sidebar user = {user} />


    <div className='note-container'>

		<div className='note-info'>
			<div>
				<span style={{
          display:'flex',
          float:'right',
          padding: '18px 48px 0px 0px'
        }}>
          <a href={data.url} target="_blank" rel="noopener noreferrer">
          <img src= {External}
          width='26px' 
          ></img></a>
					 

				</span>
			{data.title && <h1 style={{width:'80%'}}>
				{data.title}
			</h1>}
      {!data.title &&
      <>
        
      </>
      }

			</div>
			<div style={{display: 'grid', gridTemplateColumns: 'max-content auto'}}>
			
				<span style={{font: '24px bold', marginLeft: '16px'}}>
			

				{/* <a href={data.url}>{data.url}</a> */}
				

				</span>
			</div>
			{/* <h2>
				#
			</h2> */}
		</div>

    {/* Code for popup */}

    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br /> */}
      <Button variant="outlined" onClick={handleClickOpen}>
        <span style={{paddingRight:6}}>
        Add to
        </span>
        <FolderIcon/>
      </Button>

      <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select A Folder</DialogTitle>

      <List sx={{ pt: 0 }}>

      {folders.map(function(folderName, i){


		    return (<div key={i}>
          
          <ListItem key={i} 
          button
          onClick={
            () => {
              
              axios
              .patch(`http://localhost:8000/documents/${id}/update/`, {
                  folder: folderName.id,
              }, {
                  headers: { 'Content-type': 'application/json' }
              });

              handleClose();
            }}
          >
            {/* <img Source={FolderIcon}></img> */}
            {/* <ListItemIcon children={FolderIcon}></ListItemIcon> */}
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={folderName.name} />
          </ListItem>

          </div>
      

		    )


	    })}


      </List>

    </Dialog>
    </div>

    {/* code for popup ends */}

        {myframe}

    <div>

        <h1 style={{textAlign:'left'}}>Highlights: </h1>

    </div>

    <div>

	{highlights.map(function(highlight, i){
		// console.log(highlight.text);

    //console.log({i});

		return (<div key={i}>
      

		<p className='highlighted'>
			{highlight.text}

		</p>
     

        <div data-color-mode="light" style = {{
            marginRight:14
          }}>
        <MDEditor
          value={highlight.note? highlight.note : ""}
          onChange={(val) => updateObjectInArray(highlight.id, val)}
          preview="preview"
          
        />

        <br></br>


    <Tooltip title="Save Note" sx={{
					width:'max-content',
          mt:-2

				}} >
			<IconButton  
        onClick={() => {

          console.log(highlights[i].note);

          axios
          .patch(`http://localhost:8000/highlight/${highlight.id}/update/`, {
              note: highlights[i].note,
          }, {
              headers: { 'Content-type': 'application/json' }
          });

          console.log(highlight.id);
        }}
      >
			
				<SaveIcon color='primary' sx={{
					fontSize:'36px'
					// color:'blue'

				}} 
				
				/>
			</IconButton>

		</Tooltip>

      {/* <Button
      variant="contained" 
      color="error"
      onClick={
        () => { 

          updateObjectInArray(i, " ");
  
          console.log(highlights[i].note);
  
          axios
          .patch(`http://localhost:8000/highlight/${highlight.id}/update/`, {
              note: "",
          }, {
              headers: { 'Content-type': 'application/json' }
          });

  
          console.log(highlight.id);
      }
    }  
      >Delete</Button> */}

    <Tooltip title="Delete Note" sx={{
              width:'max-content',
              mt:-2

            }} >
          <IconButton  onClick={
            () => { 

              updateObjectInArray(i, "");
      
              console.log(highlights[i].note);
      
              axios.patch(`http://localhost:8000/highlight/${highlight.id}/update/`, {
                  note: "",
              }, {
                  headers: { 'Content-type': 'application/json' }
              }).then((response)=>{
                console.log(response);
                if(response.status == 200){
                  window.location.reload();
                }
              });

      
              // console.log(highlight.id);
          }
        }  >
          
            <DeleteIcon color='error' sx={{
              fontSize:'36px'
              // color:'blue'

            }} 
            
            />
          </IconButton>

        </Tooltip>

    
      </div>


      <br></br>
		
		
    
    </div>)


	})}
    
  
  
    
    </div>

    </div>

    </div>
  )
}

export default Notes