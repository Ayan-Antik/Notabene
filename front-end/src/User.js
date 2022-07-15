import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './User.css'

export default function User() {
  document.body.style = 'background: orange;';
  return (
    <div>
    <h1 className='title'>Nota Bene</h1>
    <h1 className='title'>Login</h1>
    <Box
      component="form"
      id="textform"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className = "textdiv">
        <TextField
          className = "textfield"
          required
          id="outlined-required"
          label="Username"
          
        />
        <TextField
        className = "textfield"
          required
          id="outlined-required"
          label="Password"
          type="password"
          
        />
      </div>
    
    </Box>
    </div>
  );
}
