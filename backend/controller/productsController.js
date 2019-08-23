const Product = require('../models/products');

//afficher les produits
const getProducts = (req,res) => {
  Product.find().exec((err,products) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':'Products fetched successfully',products});
  });
}

//ajouter un produit
const addProduct = (io,T) => {
  let result;
  const newProduct = new Product(T);
  newProduct.save((err,product) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
      console.log(result);
    }
    else{
      const result = {'success':true,'message':'Product Added Successfully',product}
       io.emit('Ajouté', result);
    }
  })
}

//update un produit apres l'avoir créer
const updateProduct = (io,T) => {
  let result;
  Product.findOneAndUpdate({ _id:T.id }, T, { new:true }, (err,product) => {
    if(err){
    result = {'success':false,'message':'Some Error','error':err};
    console.log(result);
    }
    else{
     result = {'success':true,'message':'Product Updated Successfully',product};
     io.emit('Modifié', result);
    }
  })
}

//afficher un produit seul
const getProd = (req,res) => {
  Product.find({_id:req.params.id}).exec((err,product) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(product.length){
      return res.json({'success':true,'message':'product fetched by id successfully',product});
    }
    else{
      return res.json({'success':false,'message':'Product with the given id not found'});
    }
  })
}

//supprimer un produit
const deleteProduct = (io,T) => {
  let result;
  Product.findByIdAndRemove(T.id, (err,product) => {
    if(err){
    result = {'success':false,'message':'Some Error','error':err};
    console.log(result);
    }
result = {'success':true,'message':product.productText+'Product deleted successfully'};
    io.emit('Supprimé', result);
  })
}
module.exports = addProduct, getProd, getProducts, deleteProduct, updateProduct