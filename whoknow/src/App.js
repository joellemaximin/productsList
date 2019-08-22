import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';

var socket;

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      products: []
    };
    socket = socketIOClient(this.state.endpoint);

  }
  // componentDidMount() {
  //   const { endpoint } = this.state;
  //   const socket = socketIOClient(endpoint);
  //   socket.on("FromAPI", data => this.setState({ response: data }));
  // }

  getProduct = prodItems =>{
    console.log(prodItems);
    this.setState({products: prodItems});
  }

  changeData = () => socket.emit("initial_data");

  componentDidMount() {
    var state_current = this;
    socket.emit("initial_data");
    socket.on("get_data", this.getData);
    socket.on("change_data", this.changeData);
  }
  /* When Done gets clicked, this function is called and create event gets emitted which gets listened on the backend explained later on*/
  createProduct = id => {
    // console.log(predicted_details);
    socket.emit("create", id);
  };
  // getProductData() {
  //   return this.state.products.map(product => {
  //     return (
  //       <div>
  //         <tr key={product._id}>
  //           <td> {product.name} </td>
  //           <td> {product.type} </td>
  //           <td> {product.price} </td>
  //           <td> {product.rating} </td>
  //           <td> {product.warranty_years} </td>
  //           <td> {product.available} </td>

  //           <td>
  //             <button onClick={() => this.createProduct(product._id)}>Create</button>
  //           </td>
  //         </tr>
  //       </div>
       
  //     );
  //   });
  // }
 
  render() {
    // const { response } = this.state;*
    console.log(this.state.products)
    return this.state.products.map(product => {
      return (
        <div>
          <tr key={product._id}>
            <td> {product.name} </td>
            <td> {product.type} </td>
            <td> {product.price} </td>
            <td> {product.rating} </td>
            <td> {product.warranty_years} </td>
            <td> {product.available} </td>

            <td>
              <Button variant="contained" color="primary"
              onClick={() => this.createProduct(product._id)}
              >
                Create
              </Button>

            </td>
          </tr>
        </div>
      );
    });
  }
}
export default App;
