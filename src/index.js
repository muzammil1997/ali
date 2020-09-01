import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './components/Workspace/Store';

ReactDOM.render(
  <Store>
  <App/>
  </Store>
, 
document.querySelector('#root')
);