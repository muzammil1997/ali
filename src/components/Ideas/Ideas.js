import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import Spinner from '../Spinner/SpinnerPage';
import GetIdeas from './GetIdeas';
import history from '../../history';
import server from '../../api/server';

class Ideas extends Component {
state = {
   type: '',
   fname: '',
   userId: '',
   isLoading: true,
   addLoading: false
};

componentDidMount(){
    console.log(localStorage.getItem('jwtToken'));
   this.getUserInfo(jwt.decode(localStorage.getItem('jwtToken')));
}

getUserInfo = (user) => {
    if(!user){
        history.push('./login');
    }
    else{
        if(user.userId && user.fname){
            this.setState({isLoading: false, fname: user.fname, userId: user.userId});
        }
        else{
            history.push('./login');
        }
    }
}

addType = async () => {
    this.setState({addLoading: true});
  const { type, fname, userId } = this.state;
  const userData = {ideaSkill: type, fname, userId};
  await server.post('ideaSkill',userData)
  .then(res => {
      console.log(res);
    this.setState({type: '',addLoading: false});
  })
  .catch(err=>{
    this.setState({type: '',addLoading: false});
  });
}

    render(){

        return ( 
        this.state.isLoading ? <Spinner /> : 
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                    <GetIdeas />
                    </div>
                    <div className="col-md-6 offset-2">
                       
                       <form>
                            <div className="form-group">
                            <h3>Add your Idea/Skill</h3>
                            <br/>
                            <input type="text" value={this.state.type} onChange={e=>{this.setState({type: e.target.value})}} className="form-control" placeholder="Your Idea/Skill" />
                            </div>
                            <div className="form-group">
                            <button onClick={this.addType} disabled={this.state.addLoading} className="btn btn-primary">Add</button> 
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}

export default Ideas;
