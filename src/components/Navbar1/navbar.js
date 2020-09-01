import React from 'react';
import img1 from '../data/logo.jpg';
import './navbar.css';
import jwt from 'jsonwebtoken';

import {NavLink} from 'react-router-dom';
import { Button } from 'react-bootstrap';

/**
* @author
* @function Navbar1
**/

class Navbar1 extends React.Component{

   state = { userLogin: false };
    componentDidMount(){
        this.getUserInfo(jwt.decode(localStorage.getItem('jwtToken')));
    }
    getUserInfo = (user) => {
        if(!user){
            this.setState({userLogin: false});
          }
        else{
            if(user.userId && user.fname){
                this.setState({userLogin: true});
            }
        }
    
    }

    logout = () => {
     
        localStorage.removeItem('jwtToken');
        window.location.reload(true);
    }

    render(){
  return(
<nav className="navbar navbar-expand-md navbar-light bg-danger sticky-top">
<div className="container-fluid">
    <a className="navbar-brand" href="#"> <img src={img1} className="img1"/></a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarResponsive">
    <ul className="navbar-nav ml-auto">
         <li className="nav-item active">
         <NavLink to="/" className="font-weight-bold main-nav" activeClassName="main-nav-active">Home</NavLink>
         </li>
         <li className="nav-item">
         <NavLink to="/workSpace" className="font-weight-bold main-nav" activeClassName="main-nav-active">WorkSpace </NavLink>
         </li>
         <li className="nav-item">
         <NavLink to="/Ideas" className="font-weight-bold main-nav" activeClassName="main-nav-active">Ideas/Skills </NavLink>
         </li>
         
         <li className="nav-item">
         <NavLink to="/AboutUs" className="font-weight-bold main-nav" activeClassName="main-nav-active">About Us </NavLink>
         </li>
         <li className="nav-item">
             <NavLink to="/contactus" className="font-weight-bold main-nav" activeClassName="main-nav-active">Contact Us </NavLink>
            
         </li>
         <li className="nav-item">
    {!this.state.userLogin ? 
         <NavLink to="/login" className="font-weight-bold main-nav" activeClassName="main-nav-active">Login </NavLink>
         :
         <Button onClick={this.logout} className="font-weight-bold main-nav">Logout </Button>
    }    </li>
        
    </ul>
</div>
</div>
</nav>
   );
  }

 }

export default Navbar1;