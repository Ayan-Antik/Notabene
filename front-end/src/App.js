import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './User/User';
import './User/User.css'
import Feed from './Feed/feed'
import AuthContext, {AuthProvider}  from './context/AuthContext';
import Notes from './Notes/Notes'
import SpecialFeed from './Feed/SpecialFeed';
import PublicFeed from './Feed/PublicFeed';
import Uncategorized from './Feed/Uncategorized';

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
      <Routes>
          {/* <Route path="/" exact element = {<Home />} /> */}
          <Route path="/" exact element = {< Feed />} />
          <Route path="/alldocs" exact element = {<SpecialFeed />} />
          <Route path="/publicdocs" exact element = {<PublicFeed />} />
          <Route path="/uncategorized" exact element = {<Uncategorized />} />
          {/* <Route path="/allnotes" exact element = {< Feed />} /> */}
          <Route path="/notes/:id" exact element = {< Notes />} />
          <Route path="/user/signup" exact element = {<User type="signup" />} />
          <Route path="/user/login" exact element = {<User type="login" />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
