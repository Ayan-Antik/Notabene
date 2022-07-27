import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Sticky from './lizard.jpg'

export default function MyCard(props) {
  console.log(props.card);
  return (
    <Card sx={{ minWidth: 320, width:320, mr:"16px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={Sticky}
          alt="green iguana"
          />
          </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.card.title} 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "16px" }}>
            {props.card.summary}
          </Typography>
          
         <b> <a href='#' style={{
            float:"right",
            color: "red",
            textDecoration:"none",
            }}>tanjim_ak49</a></b>

          <i>{props.card.modified_date}</i><br /><br />
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
