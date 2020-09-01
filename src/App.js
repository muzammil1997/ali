import React,{ Component } from 'react';

import Footer from './components/Footer/Footer';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import {Router,Route,Switch} from 'react-router-dom';
import Contactus from './components/Contactus/Contactus';
import AboutUs from './components/AboutUs/AboutUs';
import Homepage from './components/Homepage/Homepage';
import Ideas from './components/Ideas/Ideas';
import Navbar1 from './components/Navbar1/navbar';
import WorkSpace from './components/Workspace/WorkSpace';
//import Card from './components/Cards/Cards';<Navbar/> 
import history from './history';

class App extends Component{
render(){
return(
  <Router history={history}>
  <div>
  <Navbar1/>
    <Switch>
    <Route path="/" exact component={Homepage}/>
    <Route path="/register" component={Signup}/>
    <Route path="/login"component={Login}/>
    <Route path="/workSpace"component={WorkSpace}/>
    <Route path="/Contactus"component={Contactus}/>
    <Route path="/AboutUs"component={AboutUs}/>
    <Route path="/Ideas" component={Ideas}/>
    </Switch>
    <Footer/>
    </div>
    </Router>
);
}
}
export default App;