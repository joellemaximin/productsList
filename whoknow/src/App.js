import React, { Component } from "react";
import io from "socket.io-client";
import Button from '@material-ui/core/Button';
import { Switch, Route } from "react-router-dom";
import ShowProducts from './Components/ShowProducts';

var socketUrl = "http://localhost:4001";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      products: [],
      name: '',
      type: '',
      price: '',
      available: Boolean,
      rating: '',
      warranty_years: '',
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
  
  // setProducts=(product)=>{
  //   const {socket} = this.state
  //   socket.emit()
  // }





  // Product = prodItems =>{
  //   console.log(prodItems);
  //   this.setState({products: prodItems});
  // }

  // changeData = () => socket.emit("initial_data");

  // componentDidMount() {
  //   var state_current = this;
  //   socket.emit("initial_data");
  //   socket.on("get_data", this.getData);
  //   socket.on("change_data", this.changeData);
  // }
  // /* When Done gets clicked, this function is called and create event gets emitted which gets listened on the backend explained later on*/
  // createProduct = id => {
  //   // console.log(predicted_details);
  //   socket.emit("create", id);
  // };
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
    const { products } = this.state;
    console.log()
      return (
        <div className="App">

          <h3>APP</h3>

          <ShowProducts list={this.state.products}/>
        </div>
        // <div>
        //   <tr key={product._id}>
        //     <td> {product.name} </td>
        //     <td> {product.type} </td>
        //     <td> {product.price} </td>
        //     <td> {product.rating} </td>
        //     <td> {product.warranty_years} </td>
        //     <td> {product.available} </td>

        //     <td>
        //       <Button variant="contained" color="primary"
        //       onClick={() => this.createProduct(product._id)}
        //       >
        //         Create
        //       </Button>

        //     </td>
        //   </tr>
        // </div>
      );
    
  }
}
export default App;
