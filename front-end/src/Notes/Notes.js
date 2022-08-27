import React, { useEffect, useState, useContext } from 'react'
import { Component } from 'react'
import AuthContext from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import './Notes.css'
import Navbar from '../components/Navbar'
import { Button, ListItemIcon, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import axios from "axios"
import External from './external.png'
import MDEditor from '@uiw/react-md-editor';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from '@mui/icons-material/Save';
import {Tooltip} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import UserSearchItems from './UserSearchItems';
import MarkdownPreview from '@uiw/react-markdown-preview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import SearchHighlights from './SearchHighlights';
import Rating from '@mui/material/Rating';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Addtags from './Addtags'
import CancelIcon from '@mui/icons-material/Cancel';

const colors = ['skyblue', '#fbcc04', '#ccccff', 'orange','skyblue', '#fbcc04', '#ccccff', 'orange','skyblue', '#fbcc04', '#ccccff', 'orange',];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
	backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
	width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
	padding: theme.spacing(1, 1, 1, 0),
	// vertical padding + font size from searchIcon
	paddingLeft: `calc(1em + ${theme.spacing(2)})`,
	transition: theme.transitions.create('width'),
	width: '100%',
	[theme.breakpoints.up('md')]: {
	  width: '20ch',
	},
  },
}));

function hasEditAccess(id, doc) {
//   console.log(doc);
  if (id && doc) {
	return id === doc.owner || (doc.editors && doc.editors.includes(id));
  }
  return false;
}

function hasViewAccess(id, doc) {
	if (doc && doc.privacy === 'pu') return true;  
	if (id && doc) {
		return id === doc.owner || (doc.editors && doc.editors.includes(id)) || (doc.viewers && doc.viewers.includes(id));
	}
	return false;
}

/// FOR POPUP


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
  const [searchText, setSearchText] = React.useState("");
  const [searchHighlights, setSearchHighlights] = React.useState("");
  const [searchTags, setSearchTags] = React.useState("");
 

  const handleAddEditor = (e) => {
	setSearchText(e.target.value);
  }

  const handleSearchHighlights = (e) => {
	// console.log(e.target.value);
	setSearchHighlights(e.target.value);
  }

  let [data, setData] = useState({});
  const [highlights, setHighlights] = useState([{}]);
  const [privacy, setPrivacy] = useState("");
  const [myRating, setRating] = React.useState(0);
  const [totalRating, setTotalRating] = React.useState(0);
  useEffect(() => {
	if(id!=null){

	  axios.get(`http://127.0.0.1:8000/documents/list/?owner__username=&id=${id}`).then( (response) => {
	
		setData(response.data[0]);
		setPrivacy(response.data[0].privacy);

		axios.get(`http://127.0.0.1:8000/documents/rating/?user_id=${user.user_id}&document_id=${response.data[0].id}`).then((response) => {
			console.log(response.data);
			setRating(response.data.rating);
		});

		axios.get(`http://127.0.0.1:8000/documents/totalrating/?document_id=${response.data[0].id}`).then((response) => {
			console.log(response.data);
			setTotalRating(response.data.rating__avg);
		});
		for(let i = 0; i<response.data[0].tags.length; i++){
		
			delIcon.push(false);
			console.log(delIcon);
		}

		
		// setHostname(response.data[0].url.toString().split("/")[2]);
		
		// console.log(privacy);
		// console.log(typeof(encodeURI(hostname)));
	  //   data.url = data?.url.toString();
	  });
	}
  }, []);

  const myframe = <iframe src={data.url} className='iframe' id='frame1'></iframe>


  useEffect(() => {
	axios.get(`http://127.0.0.1:8000/highlight/list/?document__owner__username=&document__url=&document__id=${id}`).then((response) => {

	// console.log(response.data);
	setHighlights(response.data);
  //console.log(response.data[0].note);
  //setValue(response.data.note);
  //console.log({data});

	});

  {user && axios.get(`http://127.0.0.1:8000/documents/listdir/?owner__username=${user.username}`).then((response) => {
  
	// console.log(response.data);
	setFolders(response.data);

  
	});}
	
	
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




  // FOR POPUP

  const [folders, setFolders] = useState([{}]);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [saved, setSaved] = useState(false);
  const [docDelDialog, setDocDelDialog] = useState(false);
  const [role, setRole] = useState("viewer");
  const [openTag, setOpenTag] = useState(false);
  const [delIcon, setDelIcon] = useState([]);


  const handleSaved = () => {
	setSaved(true);
	setTimeout(() => {setSaved(false)}, 1000);
  };
  const handleClickOpen = () => {

	setOpen(true);
  };

  const handleClose = () => {
	setOpen(false);
  };

  // FOR POPUP ENDS




  return (
  	<div >

	{user &&<Navbar user = {user} handleSubmit = {handleSubmit}/>}
		{user &&<Sidebar user = {user} />}


	{user && hasViewAccess(user.user_id, data) && <div className='note-container'>

		<div className='note-info'>

			<div>
				<span style={{
					display:'flex',
					float:'right',
					padding: '18px 48px 0px 0px',
				}}>
				<Tooltip title="Go to source">
					<a href={data.url} target="_blank" rel="noopener noreferrer">
					<img src= {External}
					width='26px'></img></a>
					
				</Tooltip>
		 		 </span>
		  
		 { hasEditAccess(user.user_id, data) && <span style={{
					display:'flex',
					float:'right',
					padding: '22px 24px 0px 0px',
				}}>

				{privacy === "pr" && <Tooltip title="Make Public">
					{/* <a href={data.url} target="_blank" rel="noopener noreferrer"> */}
					<VisibilityOffIcon
					width='34px'
		  cursor='pointer'
		  onClick = {
			() => {             
			  axios
			  .patch(`http://localhost:8000/documents/${id}/update/`, {
				  privacy: "pu",
			  }, {
				  headers: { 'Content-type': 'application/json' }
			  }).then((response)=>{
				console.log(response);
				if(response.status == 200){
				  window.location.reload();
				}
			  });

			  // handleClose();
			}
		  }
		  >
		  </VisibilityOffIcon>
		  
		  {/* </a> */}
					
				</Tooltip>
		}

		{privacy === "pu" && <Tooltip title="Make Private">
					{/* <a href={data.url} target="_blank" rel="noopener noreferrer"> */}
					<VisibilityIcon
					width='34px'
		  cursor='pointer'
		  onClick = {
			() => {             
			  axios
			  .patch(`http://localhost:8000/documents/${id}/update/`, {
				  privacy: "pr",
			  }, {
				  headers: { 'Content-type': 'application/json' }
			  }).then((response)=>{
				console.log(response);
				if(response.status == 200){
				  window.location.reload();
				}
			  });

			  // handleClose();
			}
		  }
		  >
		  </VisibilityIcon>
		  
		  {/* </a> */}
					
				</Tooltip>
		}
		 		 </span>}

		{ hasEditAccess(user.user_id, data) && <span style={{display:'flex', float:'right',
			padding: '22px 24px 0px 0px',}}>
			<Tooltip title="Delete">
			<DeleteIcon width='34px' cursor='pointer' onClick = {() => {setDocDelDialog(true)}}></DeleteIcon>
			</Tooltip>
		 	</span>}

				{data.title && 
				<h1 style={{width:'80%', paddingBottom:16, borderBottom:'1px solid #ccc'}}>
					{data.title}
				</h1>
				}
				{!data.title &&
				<>
					
				</>
				}
			</div>
			{data.tags && data.tags.length > 0 && 
				<>
					{data.tag_names.map((tag, i) => {
							
							return(
								<span key={i} onMouseEnter={() => {setDelIcon(current => [...current.slice(0, i), true, ...current.slice(i + 1)]
										
									)}} 
									onMouseLeave={() => {setDelIcon(current => [...current.slice(0, i), false, ...current.slice(i + 1)]
								)}}>
								<span style={{
									maxWidth:'max-content', 
									display:'inline-block',
									color:'black',
									padding:'4px 10px 4px 8px', marginRight:8,marginTop:8,
									backgroundColor:`${colors[i]}`,
									borderRadius:'10% / 30%'
									
									}}
									
									>									
									<b style={{paddingRight:'2px', fontSize:18}}>#</b>
									<Typography variant="subtitle" sx={{fontSize:18}} >
									{tag}
									</Typography>
									
								</span>
								{delIcon[i] &&<span style={{marginLeft:'-28px'}}> <CancelIcon fontSize='medium' sx={{color:'black', borderBottom:8, borderColor:'transparent', cursor:'pointer'}} 
									onClick = {()=>{
										axios.post(`http://localhost:8000/documents/deletetag/`, {
											tag_name: tag,
											document_id:id
										}).then((response)=>{
											
											if(response.status == 200){
												window.location.reload();
											}
										}).catch((error)=>{
											console.log(error);
										})
									}}
									/></span>}
							</span>
									)

						}
					)}
				</>
			}
			{hasEditAccess(user.user_id, data) && <Tooltip title="Add Tags">
				<IconButton onClick={()=>{setOpenTag(true);}} >
					<AddBoxIcon fontSize='large' sx={{color:'#1976d2'}} />
				</IconButton>
			</Tooltip>}
			{/* <div style={{display: 'grid', gridTemplateColumns: 'max-content auto'}}>
			
				<span style={{font: '24px bold', marginLeft: '16px'}}>
			
				</span>
			</div> */}

		</div>

	{/* Code for popup */}

	{hasEditAccess(user.user_id, data) && 
	
	<div style={{float:'right', marginRight:64}}>
	  {/* <Typography variant="subtitle1" component="div">
		Selected: {selectedValue}
	  </Typography>
	  <br /> */}
	  <Button id='folder' variant="contained" onClick={handleClickOpen}>
		<span style={{paddingRight:6}}>
		Add to
		</span>
		<FolderIcon/>
	  </Button>

	  <Button variant="contained" onClick={() => {setOpenEdit(true)}} sx={{
		ml:2, 
		backgroundColor:'#FBBC04', 
		color:'black',
		'&:hover':{
			backgroundColor:'#FBCC04',
		}
		}}>
		<ShareRoundedIcon/>
		<span style={{paddingLeft:6}}>
		Add Collaborator
		</span>
	  </Button>

	  <Dialog open={openEdit} onClose={()=>{setOpenEdit(false)}} aria-labelledby="form-dialog-title">
		<Typography variant='h6' sx={{p:2}}>
			Share "{data.title}"
		</Typography>
		<div onChange={(e)=>{setRole(e.target.value)}}>
			<input type="radio" value="viewer" name="role" defaultChecked/> Viewer
			<input type="radio" value="editor" name="role" /> Editor
		</div>
	  <Search sx={{backgroundColor:'#f5f5f5', ml:2, mb:2,
			':hover':{
				bgcolor:'#e5e5e5',
			},
		}}>
		<SearchIconWrapper sx={{p:2}}><SearchIcon /></SearchIconWrapper>
		<StyledInputBase sx={{pl:2}}
		  placeholder="Add Collaborator"
		  inputProps={{ 'aria-label': 'search' }}
		  onChange={handleAddEditor}/>
	  </Search>
	  <div>
		{/* SearchResults */}
		{searchText && <UserSearchItems 
		  searchText = {searchText}
		  docId = {id}
		  role = {role}/>
		}
	  </div>
	  {data.editor_names.length > 0 && 
	  
	  <div style={{paddingLeft:12}}>
		<Typography variant='h6'>Editors</Typography>
		<List sx={{ pt: 0 }}>
		{data.editor_names.map(function(editor_name, i){
		  return (<div key={i}>
			<ListItem key={i} >
			  <ListItemText primary={<Typography variant='body' sx={{fontWeight:'bold'}}>{editor_name}</Typography>}/>
			</ListItem>
			</div>
		  )
		})}
		</List>
		</div>}
		{data.viewer_names.length > 0 && 
		<div style={{paddingLeft:12}}>
		<Typography variant='h6'>Viewers</Typography>
		<List sx={{ pt: 0 }}>
		{data.viewer_names.map(function(viewer_name, i){
		  return (<div key={i}>
			<ListItem key={i} >
			  <ListItemText primary={<Typography variant='body' sx={{fontWeight:'bold'}}>{viewer_name}</Typography>}/>
			</ListItem>
			</div>
		  )
		})}
		</List>
		</div>}
		</Dialog>

		{hasEditAccess(user.user_id, data) && <Addtags 
			openTag = {openTag}
			setOpenTag = {setOpenTag}
			searchTags = {searchTags}
			setSearchTags = {setSearchTags}
			docid = {id}
		/>}
	
		<Dialog open={saved} onClose={()=>{setSaved(false)}}>
		<DialogTitle>Note Saved</DialogTitle>
		</Dialog>

		<Dialog open={docDelDialog} onClose={()=>{setDocDelDialog(false)}}>
		<DialogTitle>Are you sure you want to delete this document? All highlights and notes will be lost.</DialogTitle>
		<Button id='doc-del-yes' onClick={() => {             
			  axios
			  .delete(`http://localhost:8000/documents/${id}/delete/`).then((response)=>{
				console.log(response);
				window.location.replace("http://127.0.0.1:3000/");
			  });
			}}>Yes</Button>
		<Button id='doc-del-no' onClick={()=>{setDocDelDialog(false)}}>No</Button>
		</Dialog>

	  <Dialog onClose={handleClose} open={open}>
	  <DialogTitle>Select A Folder</DialogTitle>

	  <List sx={{ pt: 0 }}>

	  {folders.map((folderName, i) => {


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
			<ListItemAvatar>
			  <Avatar sx={{ bgcolor: 'transparent', color: "#f46524" }}>
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
	</div>}


	<Typography component="legend" sx={{mt:4, font:'18px Arial'}}>Document Rating</Typography>

	<Rating
        name="half-rating-read"
		precision={0.1} readOnly
        value={totalRating? totalRating : 2.5 } 
      />
		
	  
	  <br/>
	  

	{!hasEditAccess(user.user_id, data) && 
	<>
	
	<Typography component="legend" sx={{mt:1, font:'18px Arial'}}>My Rating</Typography>
	<Rating
        name="simple-controlled"
        value={myRating}
        onChange={(event, newRating) => {
        	setRating(newRating);
			axios.post(`http://127.0.0.1:8000/documents/rating/`, {
				  user_id: user.user_id,
				  document_id: id,
				  rating: newRating
			  },).then((response)=>{
				console.log(response);
			  });
        }}
      />
	</>
	  }

	{/* code for popup ends */}
		
		{myframe}
		
		{highlights.length>0 && 
		<div>
		<h1 style={{
			textAlign:'left', 
			borderTop: '1px solid #ccc',
			margin:'48px 24px auto auto', paddingTop: 12
		}}> {highlights.length} Highlights </h1>
 		
	<Search sx={{
		
		width:'100%',
		backgroundColor:'#f5f5f5',
		':hover':{
			bgcolor:'#e5e5e5',
		},
		mt:-4,mb:2,ml:72,
		pt:1, pb:1,

	}}>
		<SearchIconWrapper sx={{pl:2, pb:2}}><SearchIcon /></SearchIconWrapper>
		<StyledInputBase sx={{pl:2, width:'inherit'}}
		  placeholder="Search Highlights"
		  inputProps={{ 'aria-label': 'search' }}
		  onChange={handleSearchHighlights}/>
	  </Search>
	{searchHighlights && <SearchHighlights 
		  searchHighlights = {searchHighlights}
		  docId = {id}/>
		}
		
		</div>}

	<div>

	{highlights.map(function(highlight, i){
		// console.log(highlight.text);

	//console.log({i});

		return (
		<div key={i}>
	  
			<div className='highlighted'>

	  {hasEditAccess(user.user_id, data) && <Tooltip title="Delete Highlight" sx={{
					float:'right', m: '0px 24px 0px 0px'}} >
					<IconButton
				
					onClick={() => { 
							axios.delete(`http://127.0.0.1:8000/highlight/${highlight.id}/delete/`).then((response) => {
								console.log(response.data);
								setHighlights(current => current.filter(obj => obj.id !== highlight.id));
							}).catch((error) => {
								console.log(error);
							});
					}}>
						<DeleteIcon color='error' sx={{
							fontSize:'36px',
							':hover': {
								color:'darkred'
							}}}/> 	
					</IconButton>

				</Tooltip>}
				<Typography sx={{width:'80%', mb:4, mt:4}} id={highlight.id}>
					{highlight.text}
				</Typography>
			</div>
	 {!hasEditAccess(user.user_id, data) && highlight.note &&
		<div data-color-mode="light" style={{border: '1px solid #ccc', padding:16, marginRight:24}}>

		<MarkdownPreview
			source={highlight.note}
		/>
	  </div>
	  }

	   {hasEditAccess(user.user_id, data) &&
	   
	   <div data-color-mode="light" style = {{
			marginRight:36
		  }}>
		<MDEditor
		  value={highlight.note? highlight.note : ""}
		  onChange={(val) => updateObjectInArray(highlight.id, val)}
		  preview='preview'
		  
		/>

		<br></br>
		

	<Tooltip title="Save Note" sx={{
					width:'max-content',
		  mt:-2

				}} >
			<IconButton  
		onClick={() => {

		  console.log(highlights[i].note);
		  handleSaved();
		  axios
		  .patch(`http://localhost:8000/highlight/${highlight.id}/update/`, {
			  note: highlights[i].note,
		  }, {
			  headers: { 'Content-type': 'application/json' }
		  }).then((response) => {
			if(response.status === 200){
				setTimeout(() => {setSaved(false)} , 500);
			  
			}
		  });

		  console.log(highlight.id);
		}}
	  >
			
				<SaveIcon color='primary' sx={{
					fontSize:'36px',
					':hover': {
						color:'blue'
					 }

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
			  fontSize:'36px',
			 ':hover': {
				color:'darkred'
			 }

			}} 
			
			/>
		  </IconButton>

		</Tooltip>

	
	  </div>}


	  <br></br>
		
		
	
	</div>)


	})}
	
  
  
	
	</div>

	</div>}

	</div>
  )
}

export default Notes;