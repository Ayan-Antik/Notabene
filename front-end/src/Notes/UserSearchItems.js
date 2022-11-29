import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

export default function SearchItems({ searchText, docId, role }) {
    const [data, setData] = React.useState([{
    }]);

    React.useEffect(() => {
        {
            searchText != "" && axios.get(`http://127.0.0.1:8000/user/search/?keyword=${searchText}`).then((response) => {
                setData(response.data);
            });
        }

    }, [searchText]);

    return (
        <>
        {data.length>0 && <Box id='sbox' sx={{
            width: '100%', maxWidth: 266,
            bgcolor: 'background.paper',
            position: 'fixed',
            zIndex: '20',
            margin: '-.5% auto auto 0%',
            border: '1px solid #ccc',
            // borderRadius: '5px'
        }}>
            <nav aria-label="">
                <List sx={{ padding: 0 }}>
                    {data.map(function (card, i) {
                        if (i < 6) {
                            return (
                                <ListItem disablePadding sx={{ borderBottom: "1px solid #ccc" }} onClick={() => {
                                    
                                    axios.patch(`http://localhost:8000/documents/${docId}/addcollab/`, {
                                        username: card.username,
                                        role: role
                                    }, {
                                        headers: { 'Content-type': 'application/json' }
                                    });
                                    window.location.reload();
                                }} >
                                    <ListItemButton>
                                        <ListItemText primary={card.username} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        }
                    })}
                </List>
            </nav>
        </Box>}
        </>
    );
}
