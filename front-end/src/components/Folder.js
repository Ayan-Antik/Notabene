

import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import axios from 'axios';
import Files from './Files';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Form, FormControl, InputLabel, Input, InputAdornment, Tooltip, IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function Folder({user}) {

  const onTreeStateChange = (state, event) => console.log(state, event);
  // console.log(testData);

  const [open, setOpen] = React.useState([]);

  const handleClick = (idx) => {
 
    let newArr = [...open];
    newArr[idx] = !newArr[idx];
    setOpen(newArr);
    // console.log(open);

  };

  const [dir, setDir] = React.useState([{}]);

  React.useEffect(() => {
	  
	  axios.get(`http://127.0.0.1:8000/documents/listdir/?owner__username=${user.username}`).then( (response) => {
      // console.log(response.data);
      setDir(response.data);
    

  });
    
  
  }, []);
  
  const[folderAdd, setFolderAdd] = React.useState(false);
  const[folderName, setFolderName] = React.useState("");

  let searchHandler = (e) => {
	e.preventDefault();
    setFolderName(e.target.value);
    // console.log(folderName);

  }
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
		<Tooltip title="Add Folder" sx={{
					width:'max-content',
					pr:2,
					display:'flex',
					float:'right'

				}} >
			<IconButton onClick={()=>{setFolderAdd(true)}}>
			
				<AddCircleIcon sx={{
					
					color:'#f46523'

				}} 
				
				/>
			</IconButton>

		</Tooltip>

		{folderAdd && <form variant="standard" style={{
			display:'flex',
			width:'95%',
			paddingLeft:16,
		 }}
		 onSubmit={(e)=>{
			 e.preventDefault();
			// console.log(user);
			// // console.log(folderName);
			axios.post(`http://127.0.0.1:8000/documents/createdir/`,{
				"username": user.username,
				"name":folderName
			}) .then((response) => {
				console.log(response);
				window.location.reload();
			  });
		 }}
		 >
			
			<Input sx={{pr:2}}
			id="input-with-icon-adornment"
			startAdornment={
				<InputAdornment position="start">
				<FolderIcon sx={{color:'#f46523'}}/>
				</InputAdornment>
			}
			value={folderName}
			onChange={searchHandler}
			/>
			<IconButton type='submit'>
				<DoneIcon />
			</IconButton>
      </form>}
		{!folderAdd && 
			<>
				<br></br>
				<br></br>
			</>
		}
		
      {dir.map(function(d, index){
       

              return(
              <span key={index}>
                <ListItemButton key={index} onClick={() => handleClick(d.id-1)} sx={{maxWidth:'80%'}}>
                  <ListItemIcon>
                    <FolderIcon sx={{color:'#f46523'}}/>
                  </ListItemIcon>
                  <ListItemText primary={d.name}/>
                  {open[d.id-1] ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <IconButton sx={{color:'#f46523' , display: 'flex', float: 'right', marginTop:-6, marginRight:1}} onClick={()=>{
                  axios.delete(`http://localhost:8000/documents/${d.id}/deletefolder/`).then((response) => {
                  console.log(response);
                  // window.location.reload();
                  setDir(currentDir => [...currentDir.filter(item => item.id !== d.id)]);
                }).catch((error) => {
                  console.log(error);
                })
              }
                }>
                <DeleteIcon  />
                </IconButton>
                <Collapse in={open[d.id-1]} timeout="auto" unmountOnExit>
              
                  <Files user = {user} folderid={d.id}/>
              
                  </Collapse>
              

              </span>)
      
      })}

      {/* <ListItemButton onClick={handleClick} >
        <ListItemIcon>
        <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
       
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Nested 2" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            {true && <img src={`https://icon.horse/icon/en.wikipedia.org`} width='20px' style={{marginRight:8}}></img>}
            
            <ListItemText primary="Lizard"/>
           
          </ListItemButton>
       
      </Collapse> */}
      {/* <FolderTree
      data={ tree }
      onChange={ onTreeStateChange }
      showCheckbox={false}
      iconComponents={{
        AddFileIcon
      }} */}
      
    </List>
  );
}

//*Two folders under one folder : Two Collapse back2back