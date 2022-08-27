import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

export default function SearchItems({ searchTags, setSearchTags }) {
    const [data, setData] = React.useState([{}]);

    React.useEffect(() => {
        {
            searchTags != "" && axios.get(`http://127.0.0.1:8000/documents/searchtags/?keyword=${searchTags}`).then((response) => {
                setData(response.data);
            });
        }

    }, [searchTags]);

    return (
        <>
        {data.length>0 && <Box id='sbox' sx={{
            width: '100%', maxWidth: 266,
            bgcolor: 'background.paper',
            position: 'fixed',
            zIndex: '20',
            margin: '-1% auto auto 0%',
            border: '1px solid #ccc',
            // borderRadius: '5px'
        }}>
            <nav aria-label="">
                <List sx={{ padding: 0 }}>
                    {data.map(function (tag, i) {
                        if (i < 6) {
                            return (
                                <ListItem key={i} disablePadding sx={{ borderBottom: "1px solid #ccc" }} onClick={() => {
                                    console.log(tag);
                                    setSearchTags(tag.name);
                                }} >
                                    <ListItemButton>
                                        <ListItemText primary={tag.name} />
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
