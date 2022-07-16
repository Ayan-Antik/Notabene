import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './User.css'
import { Button } from '@mui/material';

export default function SignUp({name, setName, mail, setMail, pass, setPass, handleSubmitSignUp}){

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
                fontSize:"60px",color:"white", width: "34vh", paddingBottom: "24px"
            }}>
                Sign Up
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
            label="Email"
            value={mail} 	
            onChange = {(e) => setMail(e.target.value)}
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
            onClick={handleSubmitSignUp}
            >
                Sign Up
            </Button>
        </div>

        </Box>
    );
}