import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './User/User';
import './User/User.css'
import Sidebar from './components/Sidebar';
import Feed from './Feed/feed'
import { AuthProvider } from './context/AuthContext';
import Home from "./TempHome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route path="/" exact element = {<Home />} />
          <Route path="feed" exact element = {< Feed />} />
          <Route path="user/signup" exact element = {<User type="signup" />} />
          <Route path="user/login" exact element = {<User type="login" />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
