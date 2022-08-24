import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Sticky from './lizard.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios'
import AuthContext from '../context/AuthContext'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DescriptionIcon from '@mui/icons-material/Description';
import TagIcon from '@mui/icons-material/Tag';
import MailIcon from '@mui/icons-material/Mail';
export default function MyCard({card}) {
	const { user, logoutUser } = useContext(AuthContext);
//   console.log(user);




		const [open, setOpen] = React.useState(false);
		const [count, setCount] = React.useState(0);
		const [tag, setTag] = React.useState("");
		const [cardOwner, setCardOwner] = React.useState(0);
		const [email, setEmail] = React.useState("");
		const handleClickOpen = () => {
		setOpen(true);
		
		axios.get(`http://127.0.0.1:8000/documents/list/?owner__username=${card.owner_name}`).then( (response) => {
    
			setCount(response.data.length);
			axios.get(`http://127.0.0.1:8000/user/list/?id=${response.data[0].owner}`).then( (response) => setEmail(response.data[0].email));
			let t=response.data.length-1;
			while(t>=0){
				if(response.data[t].tag_names.length > 0){
					setTag(response.data[t].tag_names[0]);
					break;
				}
				t = t-1;

			}
		  });

		  if(cardOwner){
			axios.get(`http://127.0.0.1:8000/user/list/?id=${cardOwner}`).then( (response) => {
	
			setEmail(response.data[0].email);
			
			});
		}

		}
		const handleClose = () => {
		setOpen(false);
		};
  return (


    <Card variant='outlined' sx={{ minWidth: 320, width:320, mr:"16px", minHeight: 300, maxHeight: 300}}>
      
		<Link to={`../notes/${card.id}`}>
      <CardActionArea sx={{display:'flex', backgroundColor:'#d9d9d9'}} onClick={()=>{
		
		if(user.user_id != card.owner){
			axios
			.patch(`http://localhost:8000/documents/${card.id}/update/`, {
				read_count: card.read_count+1,
			}, {
				headers: { 'Content-type': 'application/json' }
			});
		}

      }}>
        <CardMedia
          component="img"
          image= {`https://icon.horse/icon/${card.url.toString().split("/")[2]}`}
          alt="loading img..."
          style={{height:128, width: 128}}
          />
          </CardActionArea>
      </Link>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{maxHeight:64}}>
            {card.title.length>50?
            card.title.substr(0, 40)
             + "..."
            :card.title}
             
          </Typography>
          
         <b style={{
            float:"right",
            color: "red",
			cursor: "pointer",
            textDecoration:"none",
            }} onClick={handleClickOpen}>{card.owner_name}</b>
		      <Dialog onClose={handleClose} open={open}>

				<div style={{display:'flex', padding:'16px'}}>
				
				<AccountCircleIcon fontSize='large' sx={{color:'#f46524'}}/>
				<Typography variant="h5" component="div" sx={{display:'block',pl:2, fontWeight:'bold'}}>
					{card.owner_name} 
				</Typography>
		
				<br></br>

				</div>
				<div style={{display:'flex', padding:'16px'}}>
				<MailIcon fontSize='medium' sx={{pt:0.5}}/>
				<Typography variant="p" component="div" sx={{display:'flex',pl:.5, pt:0.5, fontWeight:'bold'}}>
					Email
				</Typography>
				<Typography variant="h6"  sx={{pl:10}}>
					<i>{email}</i> 
				</Typography>
				</div>
				<div style={{display:'flex', padding:'16px'}}>
				<DescriptionIcon fontSize='medium' sx={{pt:0.5}}/>
				<Typography variant="p" component="div" sx={{display:'flex',pl:.5, pt:0.5, fontWeight:'bold'}}>
					Total Docs
				</Typography>
				<Typography variant="h6" component="div" sx={{display:'flex', pl:24, fontWeight:'bold'}}>
					 {count}
				</Typography>
				</div>
				{tag !="" && <div style={{display:'flex', padding:'16px'}}>
				<TagIcon sx={{pt:0.5, fontSize:'28px'}}/>
				<Typography variant="p" sx={{display:'flex',pl:.5, pt:0.5, fontWeight:'bold'}}>
					Recent Tag
				</Typography>
				<Typography variant="h6"  sx={{display:'flex', pl:16, fontWeight:'bold'}}>
					 {tag}
				</Typography>
				</div>}
			</Dialog>

          <i>{card.created_date}</i><br /><br />
          
          {card.tags.length>0 && <span style={{
            margin:"10px 4px 0px 0px",
            padding: "6px",
            backgroundColor: "#BFC9CA",
            borderRadius: "5% / 15%"
          }}
          >#{card.tag_names[0]}</span> }{/*Add br tag if more than 2 tags*/}
        </CardContent>
    </Card>
  );
}
