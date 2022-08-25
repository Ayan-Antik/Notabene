import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

export default function SearchItems({ searchText, docId }) {
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
        <Box id='sbox' sx={{
            width: '100%', maxWidth: 500,
            bgcolor: 'background.paper',
            position: 'fixed',
            zIndex: '20',
            margin: '-16px auto auto 5.2%',
            border: '1px solid #f46524',
            borderRadius: '5px'
        }}>
            <nav aria-label="">
                <List sx={{ padding: 0 }}>
                    {data.map(function (card, i) {
                        if (i < 6) {
                            return (
                                <ListItem disablePadding sx={{ borderBottom: "1px solid #f46524" }} onClick={() => {
                                    axios.patch(`http://localhost:8000/documents/${docId}/addeditor/`, {
                                        username: card.username,
                                    }, {
                                        headers: { 'Content-type': 'application/json' }
                                    }).then((response) => {
                                        window.location.reload();
                                    });
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
        </Box>
    );
}
