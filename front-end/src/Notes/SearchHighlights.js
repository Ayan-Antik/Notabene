import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SearchHighlights({ searchHighlights, docId }) {
    const [data, setData] = React.useState([{
    }]);

    React.useEffect(() => {
        {
            searchHighlights != "" && axios.get(`http://127.0.0.1:8000/highlight/search/?doc_id=${docId}&keyword=${searchHighlights}`).then((response) => {
                setData(response.data);
            });
        }

    }, [searchHighlights]);

    return (
        <Box id='sbox' sx={{
            position: 'absolute',
            backgroundColor:'white',
            // color:'white',
            // maxWidth:'100%',
            zIndex: '10',
            mt:-2,
            ml:53,
            border: '1px solid #ccc',
            borderRadius: '5px'
        }}>
            <nav aria-label="">
                {/* <h1>BOX</h1> */}
                <List sx={{ p: 0, bgColor:'white' }}>
                    {data.map(function (card, i) {
                        {/* console.log(card); */}
                        if (i < 5) {
                            return (
                                <ListItem disablePadding sx={{ borderBottom: "1px solid #ccc" }} key={i} onClick={() => {
                                    
                                  console.log(card);

                                }} >
                                <a href={`#${card.id}`} style={{textDecoration:'none'}}>
                                    <ListItemButton sx={{width:'770px',
                                        '&:click':{
                                            color:'red'
                                        }
                                    }}>
                                            <ListItemText primary={card.text} sx={{color:'black'}}/>
                                    </ListItemButton>
                                </a>
                                </ListItem>
                            )
                        }
                    })}
                </List>
            </nav>
        </Box>
    );
}
