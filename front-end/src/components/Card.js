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
  // const navigate = useNavigate();
  // onClick={(e) => setCardData(card)}
  const [user, setUser] = useState("dummy");
  //! Issue: first card cannot load username
  useEffect(()=>{
    {card.owner!= null && axios.get(`http://127.0.0.1:8000/user/list/?id=${card.owner}`).then((response) =>{
      // console.log(response.data[0].username);
      setUser(response.data[0].username);
    }).catch( (e) => {
        console.log(e);
    }
    );}

  }, []);

  // console.log(card);
  return (


    <Card sx={{ minWidth: 320, width:320, mr:"16px", minHeight: 350, Height: 400}}>
      <Link to={`../notes/${card.id}`}>

      <CardActionArea >
        <CardMedia
          component="img"
          height="140"
          image={Sticky}
          alt="green iguana"
          />
          </CardActionArea>
      </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title} 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "16px", minHeight: "100px" }}>
            {card.summary}
          </Typography>
          
         <b> <a href='#' style={{
            float:"right",
            color: "red",
            textDecoration:"none",
            }}>{user}</a></b>

          <i>{card.modified_date}</i><br /><br />
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
