import React from 'react';
import server from '../../api/server';
import Spinner from '../Spinner/SpinnerPage';
import {Launcher} from 'react-chat-window'

class GetIdeas extends React.Component{

    state = { isLoading: false, getTypes: [], search: '',messageList: [], open: false, show: false };

    componentDidMount(){
        this.getIdeas();
    }

    getIdeas = async () => {
        this.setState({isLoading: true});
        await server.get('type',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('jwtToken')}`} })
        .then(res => {
            this.setState({getTypes: res.data ,isLoading: false});
        })
        .catch(err=>{
            console.log(err);
            this.setState({isLoading: false});
        });
    }

    _onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      }
     
      _sendMessage(text) {
        if (text.length > 0) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }

      onConnect = () => {
          this.setState({open: true, show: true});
      }
    
   
    render(){
        console.log(this.state.getTypes)
        return(
            !this.state.isLoading && this.state.getTypes && this.state.getTypes.length > 0 ? 
            <div style={{marginBottom: 200}}>
                 <h3>Search Your Peer</h3>
                        <br />
                        <h4>Search Idea/Skill</h4>
                        <div className="form-group">
                            <input type="text" value={this.state.search} onChange={e=>{this.setState({search: e.target.value})}} className="form-control" placeholder="search" />
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Name</th>
                                    <th>Idea/Skill</th>
                                    <th>Connect With</th>
                                </tr>
                            </thead>
                            <tbody>
                               {this.state.getTypes.map((item, index)=>{
                                   if(this.state.search !== '' && item.type.toLowerCase().indexOf(this.state.search.toLowerCase()) === -1){
                                       return null;
                                   }
                                   return(
                                        <tr>
                                        <td>{index+1}</td>
                                        <td>{item.fname}</td>
                                        <td>{item.type}</td>
                                        <td><button onClick={this.onConnect} className="btn btn-primary">Connect</button></td>
                                        </tr>
                               )})
                                }
                            </tbody>
                        </table>

                       {!this.state.show ? '' : 
                        <div style={{marginTop: 100}}>                        
                        <Launcher
                            handleClick={()=>{this.setState({open: false, show: false, messageList:[]})}}
                            agentProfile={{
                            teamName: 'Peer',
                            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                            }}
                            isOpen={this.state.open}
                            onMessageWasSent={this._onMessageWasSent.bind(this)}
                            messageList={this.state.messageList}
                            showEmoji
                        />
                        </div>
                      }
            </div>
            :
            <Spinner />
        );
    }
}
export default GetIdeas;