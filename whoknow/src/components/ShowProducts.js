import React, { Component } from "react";
import socketIOClient from "socket.io-client";
// import "./products.css";
import { makeStyles } from '@material-ui/core/styles';
import {Button, TableBody, Table, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

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

  render(){
    // {console.log(this.state.products)}
    // const classes = useStyles();

    return (
      <div>
        <p>Liste des produits</p>         

        <Button variant="contained" size="large" color="default" align="right">Ajouter un produit</Button>

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
                    <Button size="small" variant="contained" color="primary" align="right">Modifier</Button>
                    <Button size="small" variant="contained" color="secondary" align="right">Supprimer</Button>
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
