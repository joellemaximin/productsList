import React, { Component } from "react";
import socketIOClient from "socket.io-client";
// import "./products.css";

import { makeStyles } from '@material-ui/core/styles';
import {Button, TableBody, Table, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// The Header creates links that can be used to navigate
// between routes.
var socket;

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 650,
//   },
// }));


class ShowProducts extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  // onAddproduct(){
  //   BrowserRouter.push({
  //     pathname: 'addproduct'
  //   })
  // }

  render(){
    // {console.log(this.state.products)}
    // const classes = useStyles();

    return (
      <div>
        <p>Liste des produits</p>         

        <Router>
          <Link to='/addproduct'>Ajouter un prod</Link>
        </Router>

        
        <Paper >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>Nom du produit</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">warranty years</TableCell>
                <TableCell align="right">Disponibilité</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.list.map(prod =>
                <TableRow key={prod._id}>
                  <TableCell component="th" scope="row">
                  {prod.name}
                  </TableCell>
                  <TableCell align="right">{prod.type}</TableCell>
                  <TableCell align="right">{prod.price}</TableCell>
                  <TableCell align="right">{prod.rating}</TableCell>
                  <TableCell align="right">{prod.warranty_years}</TableCell>
                  <TableCell align="right">{prod.available}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="medium" to="/update" >
                      Modifier
                    </Button>
                    
                    <Button variant="contained" color="secondary" size="medium" to="/delete" >
                      Supprimer
                    </Button> 
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>

      </div>  
    );
    
  }
}
export default ShowProducts;
