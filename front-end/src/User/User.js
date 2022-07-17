import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './User.css'
import {Typography} from '@mui/material';
import Sticky from './Sticky.png'
import { width } from '@mui/system';
import LogIn from './Login';
import SignUp from './Signup';
import AuthContext from '../context/AuthContext';
import { useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
import axios from "axios";


export default function User(props) {
  
	
	const [name, setName] = React.useState("");
	const [mail, setMail] = React.useState("");
	const [pass, setPass] = React.useState("");
	const { registerUser, loginUser } = useContext(AuthContext);

	const handleSubmitLogIn = (event) =>{
		event.preventDefault();
		console.log("Btn pressed");
		console.log(name, pass);
		//window.location.reload();
		loginUser(name, pass);
		// axios
		// .put()
		
	}
	const handleSubmitSignUp = (event) =>{
		event.preventDefault();
		console.log("Btn pressed");
		console.log(name, mail, pass);
		//window.location.reload();

		// let credentials = {
		// 	username : name,
		// 	email : mail,
		// 	password : pass,
		// };

		registerUser(name, mail, pass, pass); // CHANGE TO PASS2!!!

		// axios.post("http://127.0.0.1:8000/user/create/", credentials)
		// 	.then(response => {
		// 		if (response.status == 201) {
		// 			window.location.replace('http://127.0.0.1:3000/user/login/');
		// 		}
		// });
	}
	
		return (
			<div>
				<div className='leftdiv' style={{marginLeft:"10%"}}>
					<h1 className='title'>notabene</h1>
					
					<img src={Sticky} 
					width="128px" style={{marginLeft: "30%"}}>
					</img>
				</div>
				
				<div className='rightdiv' style={{width: "50%"}}>
				{props.type === "login" && <LogIn
					name = {name}
					setName = {setName}
					pass = {pass}
					setPass = {setPass}
					handleSubmit = {handleSubmitLogIn}
				/> }

				{props.type === "signup" &&<SignUp
					name = {name}
					setName = {setName}
					mail = {mail}
					setMail = {setMail}
					pass = {pass}
					setPass = {setPass}
					handleSubmit = {handleSubmitSignUp}
				

				/>}
					
				</div>
			</div>
		);
}
