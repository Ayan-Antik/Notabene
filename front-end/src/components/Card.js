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
  const [imgsrc, setImgSrc] = useState(null);
  const [hostname, setHostname] = useState("wikipedia.org");

  useEffect(()=>{
    
      // console.log(card);
      {card.owner!= null && axios.get(`http://127.0.0.1:8000/user/list/?id=${card.owner}`).then((response) =>{
        // console.log(response.data[0].username);
        setUser(response.data[0].username);
        {card.url!=null && 
          setHostname(card.url.toString().split("/")[2]);
          setImgSrc(`https://icon.horse/icon/${hostname}`);
  
      
       }
          // {hostname && <img src={`http://www.google.com/s2/favicons?sz=64&domain=${hostname}`}></img>}
      }).catch( (e) => {
          console.log(e);
      }
      );}
    

  }, [hostname]);

  // console.log(card);
  return (


    <Card sx={{ minWidth: 320, width:320, mr:"16px", minHeight: 380, maxHeight: 380}}>
      <Link to={`../notes/${card.id}`}>

      <CardActionArea sx={{display:'flex'}}>
        <CardMedia
          component="img"
          // height= "128"
          // width =  "128"
          image= {imgsrc}
          alt="loading img..."
          style={{height:128, width: 128}}
          />
          </CardActionArea>
      </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{maxHeight:64}}>
            {card.title.length>50?
            card.title.substr(0, 40)
             + "..."
            :card.title}
             
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "16px",minHeight:80, maxHeight: 80}}>
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
