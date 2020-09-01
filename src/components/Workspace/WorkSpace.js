import React, { useContext, useState, useEffect } from "react";
import jwt from 'jsonwebtoken';
import history from '../../history';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Spinner from '../Spinner/SpinnerPage';

import {ctx} from './Store';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: '20px',
    marginRight: '50px',
    marginBottom: '50px',
    marginLeft: '50px',
    padding: theme.spacing(3,2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  topicWindow: {
      width: '20%',
      height: '300px',
      borderRight: '1px solid grey'
  },
  chatWindow: {
    width: '75%',
    height: '300px',
    padding: '20px'
  },
  chatBox: {
    width: '85%',
    marginLeft: '45px'
  },
  createButton:{
    width: '25%',
  },
  section: {
    width: '50%'
  },
  button: {
    width: '15%'
  }
}));

function WorkSpace() {
   const { allCharts, sendMessageAction, user, createSectionAction  } = useContext(ctx);
   const topics = Object.keys(allCharts);
   const [activeTopic, changeActiveTopic] = useState(topics[0]);
   const [textValue, setTextValue] = useState("");
   const [textSection, setTextSection] = useState('');
   const [isLoading , setLoading] = useState(true);
   const classes = useStyles();

   const getUserInfo = (user) => {
    if(!user){
        history.push('./login');
    }
    else{
        if(user.userId && user.fname){
            setLoading(false);
        }
        else{
            history.push('./login');
        }
    }
}

   useEffect(()=>{
    getUserInfo(jwt.decode(localStorage.getItem('jwtToken')));
   });

   return (
     isLoading ? <Spinner /> :
    <div>
       <Paper className={classes.root}>
           <Typography variant="h4" component="h4">
              WorkSpace
           </Typography>
           <Typography variant="h5" component="h5">
             {activeTopic}
           </Typography>
           <div className={classes.flex}>
             <div className={classes.topicWindow}>
                <List>
                  {
                    topics.map(topic=>(
                   <ListItem onClick={(e)=>{changeActiveTopic(e.target.innerText)}} key={topic} button>
                    <ListItemText primary={topic} />
                   </ListItem>
                    ))
                  }
                  
                </List>
             </div>
             <div className={classes.chatWindow}>
             {
                    allCharts[activeTopic].map((chat,i)=>(
                     <div className={classes.flex} key={i}>
                      <Chip
                        avatar={<Avatar alt="Natacha" />}
                        label={chat.from}
                        className={classes.chip}
                      />
                      <Typography variant="p">
                        {chat.msg}
                      </Typography>
                     </div>
                    ))
                  }
             </div>
           </div>
           <div className={classes.flex}>
           <div className={classes.createButton}>
           <TextField
               id="standard-name"
               label="Create Section"
               className={classes.section}
               value={textSection}
               onChange={(e)=>{setTextSection(e.target.value)}}
              />
            <Button onClick={()=>{
              createSectionAction({topic: textSection[{from:'', msg: ''}]});
              setTextValue('');
              }} variant="contained" color="secondary">
              Create
            </Button>
          </div>

             <TextField
               id="standard-name"
               label="Write Message..."
               className={classes.chatBox}
               value={textValue}
               onChange={(e)=>{setTextValue(e.target.value)}}
              />
         
          <div className={classes.button}>
            <Button onClick={()=>{
              sendMessageAction({from: user,msg: textValue, topic: activeTopic});
              setTextValue('');
              }} variant="contained" color="primary">
              Send
            </Button>
          </div>
           </div>
       </Paper>
    </div>
  );
}

export default WorkSpace;