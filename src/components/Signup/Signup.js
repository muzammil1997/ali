import React, {Component} from 'react';
import './Signup.css';
import {Link} from 'react-router-dom';
import Spinner from '../Spinner/SpinnerPage';
import server from '../../api/server';
import { Form } from 'react-bootstrap';

/**
* @author
* @function Login
**/

class Signup extends Component {


  state = { fname: '', lname: '', email: '', gender: '', type: '', description: '', image: '', password: '', isLoading: false, errors: [], success: '' }

  onRegister = async () => {
    this.setState({isLoading: true, errors: [], success: ''});
    const {fname,lname,email,gender,type,description,image,password} = this.state;
    const userData = new FormData();
    userData.append('fname',fname);
    userData.append('lname',lname);
    userData.append('email',email);
    userData.append('gender',gender);
    userData.append('type',type); 
    userData.append('description',description); 
    userData.append('image', image); 
    userData.append('password', password); 
    console.log('asdkjflksa',this.state);
    await server.post('signup',userData)
    .then(res=>{ console.log(res); this.setState({
      fname: '', lname: '', email: '', gender: '', type: '', description: '', image: '', password: '',
      success: 'Successfully Registered Plz Login',isLoading: false});})
    .catch(err=>{ 
      if(err.response){
        this.setState({errors: err.response.data})
      }
      else{
        this.setState({errors: err.message});
      }
      this.setState({isLoading: false});
    });
    
  }

  render() {
    const { errors, success } = this.state;
    return(
      this.state.isLoading ? <Spinner/> : 
      <section className="container-fluid bg1">
        <section className="row justify-content-center">
          <section className="col-12 col-sm-6 col-md-3">
          <form className="form-container1">
          <div class="form-group">
    <label for="exampleFormControlInput1">First Name</label>
    <input type="text" value={this.state.fname} onChange={(e)=>{this.setState({fname:e.target.value})}} class="form-control" placeholder="Ayaz"/>
    {errors.fname && <small className="form-text text-danger">{errors.fname}</small>}
    </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Last Name</label>
    <input type="text" value={this.state.lname} onChange={(e)=>{this.setState({lname:e.target.value})}} class="form-control" placeholder="Khan"/>
    {errors.lname && <small className="form-text text-danger">{errors.lname}</small>}
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Gender</label>
    <select value={this.state.gender} onChange={(e)=>{this.setState({gender:e.target.value})}} class="form-control" >
      <option value="Male">Male</option>
      <option value="Femail">Female</option>
      <option value="Other">Other</option>
    </select>
    {errors.gender && <small className="form-text text-danger">{errors.gender}</small>}
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Are you an idea or skill person?</label>
    <select value={this.state.type} onChange={(e)=>{this.setState({type:e.target.value})}} class="form-control" >
    <option>Choose one...</option>
      <option value="Idea">Idea Person</option>
      <option value="Skill">Skill Person</option>
    </select>
    {errors.type && <small className="form-text text-danger">{errors.type}</small>}
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea class="form-control" value={this.state.description} onChange={(e)=>{this.setState({description:e.target.value})}} rows="3"></textarea>
    {errors.description && <small className="form-text text-danger">{errors.description}</small>}
  </div>
  <div class="form-group">
    <label for="exampleFormControlFile1">Select image..</label>
    <input type="file" onChange={(e)=>{this.setState({image:e.target.files[0]})}} class="form-control-file" />
    {errors.image && <small className="form-text text-danger">{errors.image}</small>}
  </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} className="form-control" aria-describedby="emailHelp"/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        {errors.email && <small className="form-text text-danger">{errors.email}</small>}
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} className="form-control"/>
        {errors.password && <small className="form-text text-danger">{errors.password}</small>}
      </div>
      
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" for="exampleCheck1">Remember me?</label>
      </div>
      {success && <small className="form-text text-success">{success}</small>}
      <button type="submit" className="btn btn-primary btn-block"><Link to="/login"style={{color: "white" , textDecoration: "none"}}>Login</Link></button>
      <button type="submit" onClick={this.onRegister} className="btn btn-success btn-block">Register</button>
      <p id="privacyTerms" class="small_text font-size">
                By signing up, you agree to our <a href="#">terms of use</a>,<a href="#">privacy policy</a>, <a
                  href="#">and cookie policy</a>.
              </p>

      </form>
      
          </section> 
        </section>
      </section>
     );
    }
    }    
     
  
  



export default Signup;