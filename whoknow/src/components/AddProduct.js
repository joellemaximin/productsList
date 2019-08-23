import React, { Component } from "react";
import socketIOClient from "socket.io-client";
// import "./products.css";
// The Header creates links that can be used to navigate
// between routes.
var socket;

// const useStyles = makeStyles(theme => ({
//     card: {
//       maxWidth: 345,
//     },
//     media: {
//       height: 0,
//       paddingTop: '56.25%', // 16:9
//     },
//     expand: {
//       transform: 'rotate(0deg)',
//       marginLeft: 'auto',
//       transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//       }),
//     },
//     expandOpen: {
//       transform: 'rotate(180deg)',
//     },
//     avatar: {
//       backgroundColor: red[500],
//     },
// }));

class AddProduct extends Component {
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
        <h2>Ajouter un produit ici</h2>         
        
        <button>Retour liste de produits</button>

        <input
            onChange={e => this.changeName (e, food._id)}
            value={food.order}
            type="number"
            placeholder="Quantity"
        />
        {/* {this.state.products.map(product =>
          <div key={product.product_id} id="productContainerRow">
            <h2 id="productRow" className="Image product">{product.name}</h2>
            <p>{product.type}</p>
            <p>{product.price}</p>
            <p>{product.available}</p>
            <p>{product.rating}</p>
            <p>{product.warranty_years}</p>         
          </div>
         
        )}             */}
      </div>  
    );
    
  }
}
export default AddProduct;
