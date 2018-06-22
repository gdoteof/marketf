import React, { Component } from "react";
import List from "./List";
import Form from "./Form";
import Nav from "./Nav";
import Profile from "./Profile";

import { syncState, getName, getNameSuccess } from "../actions/index";
import store from "../store/index"

import '../../scss/index.scss'

import { BrowserRouter as Router, Route } from 'react-router-dom'



class App extends Component {
  constructor() {
    super();
    
    const previousState = JSON.parse(localStorage.getItem('market4store')); 
    console.log("constructing APP");

    if( previousState ) {
      store.dispatch({type: 'SYNC_STATE', payload: previousState})
    } 
  }

  render() {
   return (
     <div className="container">
         <Router>
           <div>
             <Nav/>
             <div className="col-md-4 offset-md-1">
               <Route path="/app/profile" component={Profile} />
               <Route path="/app/list" component={List} />
               <Route path="/app/form" component={Form} />
             </div>
           </div>
         </Router>
        <Profile/>
        <div className="row mt-5">
          <div className="col-md-4 offset-md-1">
            <List />
          </div>
          <div className="col-md-4 offset-md-1">
            <Form />
          </div>
        </div>
     </div>
  );

  }
}

export default App;
