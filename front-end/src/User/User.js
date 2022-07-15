import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './User.css'
import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import Sticky from './Sticky.png'
import { width } from '@mui/system';
import LogIn from './Login';
import SignUp from './Signup';


export default function User() {
  
	
	const [name, setName] = React.useState("");
	const [mail, setMail] = React.useState("");
	const [pass, setPass] = React.useState("");

	const handleSubmitLogIn = (event) =>{
		event.preventDefault();
		console.log("Btn pressed");
		console.log(name, pass);
		window.location.reload();
		
	}
	const handleSubmitSignUp = (event) =>{
		event.preventDefault();
		console.log("Btn pressed");
		console.log(name, mail, pass);
		window.location.reload();
		
	}
	
		return (
			<div>
				<div className='leftdiv'>
					<h1 className='title'>notabene</h1>
					<img src={Sticky} 
					width="128px">
					</img>
				</div>
				
				<div className='rightdiv'>
				{/* <LogIn
					name = {name}
					setName = {setName}
					pass = {pass}
					setPass = {setPass}
					handleSubmitLogIn = {handleSubmitLogIn}
				/> */}

				<SignUp
					name = {name}
					setName = {setName}
					mail = {mail}
					setMail = {setMail}
					pass = {pass}
					setPass = {setPass}
					handleSubmitSignUp = {handleSubmitSignUp}
				

				/>
					
				</div>
			</div>
		);
}
