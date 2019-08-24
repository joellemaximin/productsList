import React, { Component } from "react";
import io from "socket.io-client";
import {Button, Container} from '@material-ui/core';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ShowProducts from './Components/ShowProducts';
import Update from './Components/Update';
import AddProduct  from './Components/AddProduct';

var socketUrl = "http://localhost:4001";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      products: [],
      ajouter: {}
        
    };
    // socket = socketIOClient(this.state.endpoint);

  }

  componentWillMount(){
    this.initiateSocket()
  }

  initiateSocket = () =>{
    const socket = io(socketUrl)
    socket.on('connect', ()=>{
      console.log("Connecté!!")
    })
    this.setState({socket})
  }

  componentDidMount() {
    this.socket = io(socketUrl);
    this.socket.on('output', this.handleData)
    // console.log(data)
  }

  handleData = (productList) => {
    this.setState({products: productList})
  }

  // onSubmit(ajouter) {
  //   this.setState({ajouter});
  // }

  // setProducts=(product)=>{
  //   const {socket} = this.state
  //   socket.emit()
  // }

  // Product = prodItems =>{
  //   console.log(prodItems);
  //   this.setState({products: prodItems});
  // }

 
  render() {
    // const { products } = this.state;
    console.log()
      return (
        <div className="App">

          <Container maxWidth="md">
            <h2 align="center">TEST pour une demande d'alternance, fait par MAXIMIN JOELLE</h2>
            <h3 align="center">Lister des produits depuis mongodb en utilisant par WebSocket, vous pouvez ajouter, modifier et supprimer des produits</h3>
            <p align="center">Framework CSS demandé : Material UI</p>
            <Router>
              <div id="flex-container">
                <Route exact path="/"/>
                <Route exact path='/addproduct' component={AddProduct}/> 
                <Route exact path='/update' component={Update}/>
              </div>

            </Router>

            <ShowProducts list={this.state.products}/>
            
          </Container>
          {/* <AddProduct onSubmit={ajouter => this.onSubmit(ajouter)}/> */}

{/*           
          <p>
            {JSON.stringify(this.state.ajouter, null , 2)}
          </p> */}
        </div>

      );
    
  }
}
export default App;
