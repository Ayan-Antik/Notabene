import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './User/User';
import './User/User.css'
import Sidebar from './components/Sidebar';
import Feed from './Feed/feed'

const root = ReactDOM.createRoot(document.getElementById('root'));
// const Appi = <App />
root.render(
    <BrowserRouter>
    <Routes>
        <Route path="/" exact element = {<App />} />
        <Route path="feed" exact element = {< Feed />} />
        <Route path="user/signup" exact element = {<User type="signup" />} />
        <Route path="user/login" exact element = {<User type="login" />} />
    </Routes>
    </BrowserRouter>
    // <App />
);


