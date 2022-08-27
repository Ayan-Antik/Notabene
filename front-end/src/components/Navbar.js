import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import './Navbar.css'
import Sticky from '../User/Sticky.png'
import { Link } from 'react-router-dom';
import SearchItems from './SearchItems';
import axios from 'axios';
import TagIcon from '@mui/icons-material/Tag';
import MailIcon from '@mui/icons-material/Mail';
import { Dialog } from '@mui/material';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';

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
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar({user, handleSubmit}) {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };


  // const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );

  const [searchText, setSearchText] = React.useState("");
  let searchHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchText(lowerCase);
    // console.log(searchText);

  }
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [tag, setTag] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handleClickOpen = () => {
  setOpen(true);
  
  axios.get(`http://127.0.0.1:8000/documents/list/?owner__username=${user.username}`).then( (response) => {
  
    setCount(response.data.length);
    axios.get(`http://127.0.0.1:8000/user/list/?id=${response.data[0].owner}`).then( (response) => setEmail(response.data[0].email));
    let t=response.data.length-1;
    while(t>=0){
      if(response.data[t].tag_names.length > 0){
        setTag(response.data[t].tag_names[0]);
        break;
      }
      t = t-1;

    }
    });

    if(user){
    axios.get(`http://127.0.0.1:8000/user/list/?id=${user.user_id}`).then( (response) => {

    setEmail(response.data[0].email);
    
    });
  }

  }
  const handleClose = () => {
  setOpen(false);
  };

  return (
    <>
    <Box sx={{ flexGrow: 1, zIndex:'10'}}>
      <AppBar style={{
        position: "fixed",
        // marginLeft: "17%"
        backgroundColor: "#f46524",
        zIndex:'15'
      }}>
        <Toolbar sx={{ml:2}}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link to={`/`}>
            <img src={Sticky} width='32px'></img>
          </Link>


          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchHandler}

            />
        
          </Search>

        

          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
      {user && <div><h4>Hello, {user.username}</h4></div>}
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
              onClick={() => {
                handleClickOpen();
              }}
            >
              <AccountCircle />
            </IconButton>

            {user && <LogoutIcon sx={{ml:2, mt:2.7, cursor:'pointer'}} onClick={handleSubmit}/>}
            {!user && <LogoutIcon sx={{ml:2, mt:1.5, cursor:'pointer'}} onClick={handleSubmit}/>}
          </Box>
         
        </Toolbar>
      </AppBar>
      {/* {renderMenu} */}
      <div>
            {/* SearchResults */}
            {searchText && 
              <SearchItems 
              searchText = {searchText}
              user = {user}
              />
              }
          </div>
       </Box>
       <Dialog onClose={handleClose} open={open}>

        <div style={{display:'flex', padding:'16px'}}>

        <AccountCircleIcon fontSize='large' sx={{color:'#f46524'}}/>
        <Typography variant="h5" component="div" sx={{display:'block',pl:2, fontWeight:'bold'}}>
          {user.username} 
        </Typography>

        <br></br>

        </div>
        <div style={{display:'flex', padding:'16px'}}>
        <MailIcon fontSize='medium' sx={{pt:0.5}}/>
        <Typography variant="p" component="div" sx={{display:'flex',pl:.5, pt:0.5, fontWeight:'bold'}}>
          Email
        </Typography>
        <Typography variant="h6"  sx={{pl:10}}>
          <i>{email}</i> 
        </Typography>
        </div>
        <div style={{display:'flex', padding:'16px'}}>
        <DescriptionIcon fontSize='medium' sx={{pt:0.5}}/>
        <Typography variant="p" component="div" sx={{display:'flex',pl:.5, pt:0.5, fontWeight:'bold'}}>
          Total Docs
        </Typography>
        <Typography variant="h6" component="div" sx={{display:'flex', pl:24, fontWeight:'bold'}}>
          {count}
        </Typography>
        </div>
        {tag !="" && <div style={{display:'flex', padding:'16px'}}>
        <TagIcon sx={{pt:0.5, fontSize:'28px'}}/>
        <Typography variant="p" sx={{display:'flex',pl:.5, pt:0.5, fontWeight:'bold'}}>
          Recent Tag
        </Typography>
        <Typography variant="h6"  sx={{display:'flex', pl:16, fontWeight:'bold'}}>
          {tag}
        </Typography>
        </div>}
        </Dialog>
        </>

  );
}
