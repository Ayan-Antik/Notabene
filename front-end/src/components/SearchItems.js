import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import Sticky  from './Sticky.png'

export default function SearchItems({searchText}) {

    // window.onclick = document.getElementById('sbox').style.display='none';
  return (
    <Box id='sbox' sx={{ 
        width: '100%', maxWidth: 500, 
        bgcolor: 'background.paper', 
        position:'absolute', 
        zIndex:'20', 
        margin: '-16px auto auto 5.2%', 
        border:'1px solid #f46524',
        borderRadius: '5px' }}>
      <nav aria-label="main mailbox folders">
        <List sx={{padding:0}}>
          <ListItem disablePadding sx={{borderBottom: "1px solid #f46524"}}>
            <ListItemButton>
              <img src='https://icon.horse/icon/en.wikipedia.org' width='20px' style={{marginRight:8}}></img>
              <ListItemText primary={searchText} />
              <ListItemText primary='harry' sx={{
                '& .MuiTypography-root': {
                    color:'red',
                    float:'right'
                }
              }}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <img src='https://icon.horse/icon/en.wikipedia.org' width='20px' style={{marginRight:8}}></img>
              <ListItemText primary={searchText} />
              <ListItemText primary='harry' sx={{
                '& .MuiTypography-root': {
                    color:'red',
                    float:'right'
                }
              }}/>
            </ListItemButton>
          </ListItem>
       
        </List>
      </nav>
      
    </Box>
  );
}
