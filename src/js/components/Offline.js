import React, { Component } from "react";

class Offline extends Component {
  constructor() {
    super();
    
    const previousState = localStorage.getItem('market4state'); 

    if( previousState ) {
      this.state = previousState;
    } 
  }

}

export default Offline;
