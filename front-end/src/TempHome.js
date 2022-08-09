import { useContext, useState } from "react";
import AuthContext from "./context/AuthContext";
import { Button } from '@mui/material';
import Feed from "./Feed/feed";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleSubmit = (event) =>{
    logoutUser();
  }


  console.log(user);
  return (
    <div>
      {/* <Navbar />
      <Sidebar/> */}
      {/* {component} */}
      
    </div>

    // <section>
    //   {user && <div><h1>Hello, {user.username}</h1></div>}
    //   <h1>You are on home page!</h1>
    //   <Button variant="contained" color="success"
    //         id="btnlogout"
    //         onClick={handleSubmit}>
    //             Logout
    //         </Button>
    // </section>
  );
};

export default Home;
