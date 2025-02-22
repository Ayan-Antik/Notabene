import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './User.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LogIn({name, setName, pass, setPass, handleSubmit}){

    return(

        <Box
            component="form"
            id="textform"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch'},
                pt:'10vh',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}
            noValidate
            autoComplete="off"
            
            >
        <div className = "textdiv">
            <h1 style={{
                fontSize:"60px",color:"white", width: "30vh", paddingBottom: "32px"
            }}>
                Log In
            </h1>
            <TextField
            className = "textfield"
            required
            id="outlined-required"
            label="Username"
            value={name} 	
            onChange = {(e) => setName(e.target.value)}
            />
            <TextField
            className = "textfield"
            required
            id="outlined-required"
            label="Password"
            type="password"
            value={pass}
            onChange = {(e) => setPass(e.target.value)}
            />
            <Button variant="contained" color="success"
            id="btnlogin"
            onClick={handleSubmit}
            >
                Log In
            </Button>

            <p style={{color:'white',  paddingLeft:24}}>
                No account?
            <Link to="/user/signup/" style={{color:'white', paddingLeft:8}}>Sign Up</Link>
            </p>
        </div>

        </Box>
    );
}