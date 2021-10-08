import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { NavBar } from './Components/NavBar'
// import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(
  <Router>
   <NavBar />
   {/* <App/> */}
    <Routes />
  </Router>,
  document.getElementById('root')
);
