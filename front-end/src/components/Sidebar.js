import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NotesIcon from '@mui/icons-material/Notes';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import PublicIcon from '@mui/icons-material/Public';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import Folder from './Folder';

const drawerWidth = 240;
const Elements = [
    {
        id: 1,
        text: "My Docs",
		url: '/alldocs',
        icon: <NotesIcon/>
    },
    {
        id: 2,
        text: "Recent Docs",
		url: '/recentdocs',
        icon: <HistoryIcon/>
    },
    {
        id: 3,
        text: "Public Docs",
		url: '/publicdocs',
        icon: <PublicIcon/>
    },
	{
        id: 4,
        text: "Uncategorized",
		url: '/uncategorized',
        icon: <FolderOffIcon/>
    },
    {
        id: 5,
        text: "Shared with me",
		url: '/shared',
        icon: <FolderSharedIcon/>
    },
	{
        id: 6,
        text: "Trash",
		url: '#',
        icon: <DeleteIcon/>
    }
]
export default function Sidebar({user}) {
	

	return (
		<Box sx={{ display: 'flex', position: 'absolute', zIndex:'10' }}>
		<CssBaseline />
		{/* <AppBar
			position="fixed"
			sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
		>
			<Toolbar>
			<Typography variant="h6" noWrap component="div">
				Permanent drawer
			</Typography>
			</Toolbar>
		</AppBar> */}
		<Drawer
			sx={{
			width: drawerWidth,
			mt:'20px',
			flexShrink: 0,
			'& .MuiDrawer-paper': {
				width: drawerWidth,
				boxSizing: 'border-box',
			},
			'& .MuiPaper-root':{
				marginTop: '67px'
			},
			'& .css-cveggr-MuiListItemIcon-root':{
				minWidth: '38px'
			}
			}}
			variant="permanent"
			anchor="left"
		>	
		<Box 
		component="form"
		sx={{
			'& .MuiTextField-root': { m: 1, width: '22ch'},
			'& .MuiOutlinedInput-root':{height: '40px'},
			// my: '10px',
			mx: '10px',
		}}
		noValidate
		autoComplete="off"
		onSubmit={()=>{
			console.log("Submit")
		}}
		>

			 {/* <div className = "textdiv">
				<TextField
			className = "sidebar--search"
				required
				id="outlined-required"
				placeholder='Search'
				InputProps={{
					startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
				  }}
				/>
			</div> */}
		</Box>
			{/* <Toolbar /> */}
			{/* <Divider /> */}
			<List>
			{Elements.map(({text,icon, url}) => (
				<ListItem key={text} disablePadding  >
				<Link to={url} style={{textDecoration:'none', color:'black', width:'inherit'}}>
				<ListItemButton sx={{width:'inherit'}}>
					<ListItemIcon sx={{
						color:'#f46523'}}>
					{icon}
					</ListItemIcon>
					<ListItemText primary={text} sx={{ml:-2}}/>
				</ListItemButton>

				</Link>
				</ListItem>
			))}
			</List>
			<Divider />
			<List>
			{/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
				<ListItem key={text} disablePadding>
				<ListItemButton>
					<ListItemIcon>
					{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItemButton>
				</ListItem>
			))} */}

			</List>
			<Folder user={user} />
		</Drawer>
		
		</Box>
	);
}
