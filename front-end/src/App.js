import './App.css';
import Sidebar from './components/Sidebar'
import User from './User/User';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Sidebar/> */}
      {<Route path="user" exact element = {<User />} />}
      {/* <User /> */}
    </div>
  );
}

export default App;
