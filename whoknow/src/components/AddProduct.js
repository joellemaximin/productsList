import React, { Component } from "react";
// import "./products.css";
import { FormControl, Input, Button } from '@material-ui/core';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import io from "socket.io-client";

// const {addProduct, updateProduct, deleteProduct} = require('../../backend/controller/productsController');
// const {Ajouter, Modifier, Supprimer}= require('../../backend/controller/productsController');

var socket;
var socketUrl = "http://localhost:4001";


class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      name: '',
      type: '',
      price: '',
      available: '',
      rating: '',
      warranty_years: '',

    };     
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }


    componentDidMount() {
        this.socket = io(socketUrl);
        this.socket.on('Ajouter',(ajouter)=> {
            const data = JSON.parse(ajouter)
            console.log(ajouter)
        })
        // console.log(data)
    }
    //recuperer la méthode ajouter depuis le backend 

    addProduct = newProduct => {
        console.log(newProduct);
        this.socket = io(socketUrl);
        socket.emit('Ajouter', this.handleAdd);
    };

    onSubmit(e){
        e.preventDefault();
        // this.props.onSubmit(this.state);
        console.log(this.state);
        const newProduct = this.state;
        console.log(this.state.products.push(newProduct))
        // socket.on('Ajouter', this.addProduct)
        
    };


    // handleAdd = (ajoutonProd) => {
    //     this.setState({products: ajoutonProd})
    //     console.log(ajoutonProd)
    // }
    
    render(){
    const { name } = this.state

    return (
      <div>
        <h2>Ajouter un produit ici</h2>         
        
        <Link to="/">
          Retour
        </Link>
        <br/>
        <br/>

        <form onSubmit={this.onSubmit}>
            <Input
                fullWidth={true}
                value={this.state.name}
                placeholder="name"
                name="name"
                value={name}
                onChange={this.onChange}
                // inputProps={{
                // 'aria-label': 'description',
                // }}
            />
            <br/>
            <Input
                fullWidth={true}
                value={this.state.type}
                name="type"           
                onChange={this.onChange}
                placeholder="type"
                inputProps={{
                'aria-label': 'description',
                }}
            />
            <br/>
            <Input
                fullWidth={true}
                value={this.state.price}
                name="price"           
                onChange={this.onChange}
                placeholder="price"
                // inputProps={{
                // 'aria-label': 'description',
                // }}
            />
            <br/>
            <Input
                fullWidth={true}
                value={this.state.warranty_years}
                name="warranty_years"           
                onChange={this.onChange}
                placeholder="warranty_years"
                // inputProps={{
                // 'aria-label': 'description',
                // }}
            />
            <br/>
            <Input
                fullWidth={true}
                value={this.state.rating}
                name="rating"           
                onChange={this.onChange}
                placeholder="rating"
                // inputProps={{
                // 'aria-label': 'description',
                // }}
            />
            <br/>
            <Input
                fullWidth={true}
                value={this.state.available}
                name="available"         
                onChange={this.onChange}
                placeholder="available"
                // inputProps={{
                // 'aria-label': 'description',
                // }}
            />
            <Button type="submit"
            className="btn btn-default"
            onClick={this.onSubmit}>
                Ajouter
            </Button>
        </form>
      </div>  
    );
    
  }
}
export default AddProduct;
