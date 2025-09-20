import React from "react";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Footer from "./components/Footer";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Add from './pages/Add';
import Gig from './pages/Gig';
import Gigs from './pages/Gigs';
import Message from './pages/Message';
import Messages from './pages/Messages';
import MyGigs from './pages/MyGigs';
import Orders from './pages/Orders';
import { useEffect } from "react";
import { useState } from "react";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("currentUser"));
    if(user) {
      setCurrentUser(user);
    }
  },[])
  

  return (
    <>
      <Router>
        <Navbar setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={!currentUser?<Login/>:<Navigate to="/"/>} />
          <Route path="/register" element={!currentUser?<Register/>:<Navigate to="/" />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/gig/:id" element={<Gig/>}/>
          <Route path="/gigs" element={<Gigs/>}/>
          <Route path="/message/:id" element={<Message/>}/>
          <Route path="/messages" element={<Messages/>}/>      
          <Route path="/orders" element={ <Orders /> }/>      
          <Route path="/myGigs" element={ <MyGigs/> }/>      
          <Route path="/payment/:id" element={<Payment/>}/>      
          <Route path="/success" element={ <Success/>}/>      
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;
