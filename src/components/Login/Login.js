import React, {Component} from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import server from '../../api/server';
import Spinner from '../Spinner/SpinnerPage';
import history from '../../history';
/**
* @author
* @function Login
**/

class Login extends Component {
state ={
 isLoading: false, email: '' ,  password: '', errors: []
}

login = async () => {
     this.setState({isLoading: true});
    const {email, password} = this.state;
   const userData = {email, password};
   console.log(userData);
  await server.post('signin',userData).then(res => {
    console.log(res);
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    history.push('/Ideas');
    window.location.reload(true);
    this.setState({isLoading: false});
    
})
.catch(err => {
  if(err.response){
    this.setState({errors: err.response.data})
  }
  else{
    this.setState({errors: err.message});
  }
  this.setState({isLoading: false});
});
this.setState({email:'', password:''})
console.log(this.state.errors);
}


  render() {
    const { errors } = this.state;
    return(
      this.state.isLoading ? <Spinner /> :
      <section className="container-fluid bg">
        <section className="row justify-content-center">
          <section className="col-12 col-sm-6 col-md-3">
          <form className="form-container">
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})}/>
        <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
         {errors.email && <small className="form-text text-danger">{errors.email}</small>}
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})}/>
      </div>
      {errors.password && <small className="form-text text-danger">{errors.password}</small>}
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" for="exampleCheck1">Remember me?</label>
      </div>
      <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>Login</button>
      <label for="exampleInputPassword1">Dont have an account?</label>
      <button type="submit" className="btn btn-success btn-block"><Link to="/register"style={{color: "white" , textDecoration: "none"}}>Register</Link></button>
      </form>
          </section> 
        </section>
      </section>
     );
    }
    }    
     
  
  



export default Login;