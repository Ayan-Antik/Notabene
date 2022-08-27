import React, { useEffect } from 'react'
import {IconButton, List, ListItem, ListItemText} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import TagSearchItems from './TagSearchItems';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  
const Addtags = ({openTag, setOpenTag, searchTags, setSearchTags, docid}) => {

    const [tags, setTags] = React.useState([{}]);
    useEffect(() => {
      axios.get(`http://localhost:8000/documents/listtags/`).then((response) => {
        setTags(response.data);
      }).catch((error) => {
        console.log(error);
      }
    )} , []);
    return (
        <Dialog open={openTag} onClose={()=>{setOpenTag(false)}} aria-labelledby="form-dialog-title">
        <Typography variant='h5' sx={{p:2, alignSelf:'center'}}>
            Add Tag
        </Typography><span>
    <Search sx={{backgroundColor:'#f5f5f5', ml:2, mb:2, mr:6,
        ':hover':{
          bgcolor:'#e5e5e5',
        },
      }}>
        <SearchIconWrapper sx={{p:2}}><SearchIcon /></SearchIconWrapper>
        <StyledInputBase sx={{pl:2}}
        placeholder="tag name"
        value={searchTags}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e)=>{setSearchTags(e.target.value);}}/>
    </Search>
    <IconButton sx={{float:'right', mt:-8}} onClick={()=>{
      console.log(searchTags);
        if(searchTags != ""){
            axios.post(`http://localhost:8000/documents/addtag/`, {
                document_id: docid,
                tag_name: searchTags,

            }).then((response) => {
                setOpenTag(false);
                setSearchTags('');
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            }
            )
        }
        // setOpenTag(false);
        // setSearchTags('');
        // setTags([{}]);
    }}>
      <AddBoxIcon fontSize='large' sx={{color:'#1976d2'}}/>
    </IconButton></span>
    <div>
        {/* SearchResults */}
        {searchTags && <TagSearchItems 
        searchTags = {searchTags}
        setSearchTags = {setSearchTags}
        />
        }
    </div>
        
        </Dialog>
    )
    }

export default Addtags