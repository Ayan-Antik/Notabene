import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import Sticky  from './Sticky.png'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SearchItems({searchText, user}) {

  const [data, setData] = React.useState([{
  }]);

  React.useEffect(() => {
    {searchText!= "" && axios.get(`http://127.0.0.1:8000/documents/search/?keyword=${searchText}&username=${user.username}`).then( (response) => {
        // console.log("Search Text: " + searchText);

      response.data.forEach((d) => {
       
        if(d.title.length > 40){
          d.title = d.title.substr(0, 35) + "...";
  
        }      
    })
    
    setData(response.data);
        
  });}

  }, [searchText]);

    // window.onclick = document.getElementById('sbox').style.display='none';
  return (
    <Box id='sbox' sx={{ 
        width: '100%', maxWidth: 500, 
        bgcolor: 'background.paper', 
        position:'fixed', 
        zIndex:'20', 
        margin: '-16px auto auto 5.2%', 
        border:'1px solid #f46524',
        borderRadius: '5px' }}>
      <nav aria-label="">
        <List sx={{padding:0}}>
          {data.map(function(card, i){

            if(i<6){
              return(
              
                  // <Link to={`../notes/${card.id}`} style={{textDecoration:'none', color:'black'}} key={i} >
                    <ListItem disablePadding sx={{borderBottom: "1px solid #f46524"}} onClick={()=>{
                      window.location.replace(`http://127.0.0.1:3000/notes/${card.id}`);
                      
                    }} >
                      <ListItemButton>
                        {card.url && <img src={`https://icon.horse/icon/${card.url.toString().split("/")[2]}`} width='20px' style={{marginRight:8}}></img>}
                        <ListItemText primary={card.title}/>
                        <ListItemText primary={card.owner_name} sx={{
                          '& .MuiTypography-root': {
                              color:'red',
                              float:'right'
                          }
                        }}/>
                      </ListItemButton>
                    </ListItem>
                  // </Link>
              )

            }
            
          })}

       
        </List>
      </nav>
      
    </Box>
  );
}
