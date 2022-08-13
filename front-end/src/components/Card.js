import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Sticky from './lizard.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function MyCard({card}) {

  // console.log(card);
  return (


    <Card variant='outlined' sx={{ minWidth: 320, width:320, mr:"16px", minHeight: 300, maxHeight: 300}}>
      

      <CardActionArea sx={{display:'flex', backgroundColor:'#d9d9d9'}} onClick={()=>{
        window.location.replace(`http://127.0.0.1:3000/notes/${card.id}`);
      }}>
        <CardMedia
          component="img"
          // height= "128"
          // width =  "128"
          image= {`https://icon.horse/icon/${card.url.toString().split("/")[2]}`}
          alt="loading img..."
          style={{height:128, width: 128}}
          />
          </CardActionArea>
      
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{maxHeight:64}}>
            {card.title.length>50?
            card.title.substr(0, 40)
             + "..."
            :card.title}
             
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "16px",minHeight:80, maxHeight: 80}}>
            {card.summary}
          </Typography> */}
          
         <b> <a href='#' style={{
            float:"right",
            color: "red",
            textDecoration:"none",
            }}>{card.owner_name}</a></b>

          <i>{card.created_date}</i><br /><br />
          <span style={{
            margin:"10px 4px 0px 0px",
            padding: "6px",
            backgroundColor: "#BFC9CA",
            borderRadius: "5% / 15%"
          }}
          >#animals</span> {/*Add br tag if more than 2 tags*/}
        </CardContent>
    </Card>
  );
}
