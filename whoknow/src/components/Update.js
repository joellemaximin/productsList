import React, { Component } from "react";
import socketIOClient from "socket.io-client";
// import "./products.css";
import { Input } from '@material-ui/core';
import { BrowserRouter as Router,Link } from 'react-router-dom';

var socket;

class u extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  render(){
    // {console.log(this.state.products)}

    return (
      <div>
        <h2>Modifier un produit ici</h2>         
        
        <Link to="/">
          Retour
        </Link>

        <Input
        fullWidth={true}
            placeholder="name"
            inputProps={{
            'aria-label': 'description',
            }}
        />
        <br/>
        <Input
            fullWidth={true}
            placeholder="type"
            inputProps={{
            'aria-label': 'description',
            }}
        />
        <br/>
        <Input
        fullWidth={true}
            placeholder="price"
            inputProps={{
            'aria-label': 'description',
            }}
        />
        <br/>
        <Input
        fullWidth={true}
            placeholder="warranty_years"
            inputProps={{
            'aria-label': 'description',
            }}
        />
        <br/>
        <Input
        fullWidth={true}
            placeholder="rating"
            inputProps={{
            'aria-label': 'description',
            }}
        />
        <br/>
        <Input
            fullWidth={true}
            placeholder="available"
            inputProps={{
            'aria-label': 'description',
            }}
        />
      </div>  
    );
    
  }
}
export default u;
