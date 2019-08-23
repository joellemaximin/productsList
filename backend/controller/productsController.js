import Product from '../models/products';

//afficher un produit
export const getProducts = (req,res) => {
  Product.find().exec((err,products) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
return res.json({'success':true,'message':'Products fetched successfully',products});
  });
}

//ajouter un produit
export const addProduct = (io,T) => {
  let result;
  const newProduct = new Product(T);
  newProduct.save((err,product) => {
    if(err){
      result = {'success':false,'message':'Some Error','error':err};
      console.log(result);
    }
    else{
      const result = {'success':true,'message':'Product Added Successfully',product}
       io.emit('TodoAdded', result);
    }
  })
}
// export const updateTodo = (io,T) => {
//   let result;
//   Product.findOneAndUpdate({ _id:T.id }, T, { new:true }, (err,product) => {
//     if(err){
//     result = {'success':false,'message':'Some Error','error':err};
//     console.log(result);
//     }
//     else{
//      result = {'success':true,'message':'Todo Updated Successfully',product};
//      io.emit('TodoUpdated', result);
//     }
//   })
// }
// export const getTodo = (req,res) => {
//   Todo.find({_id:req.params.id}).exec((err,product) => {
//     if(err){
//     return res.json({'success':false,'message':'Some Error'});
//     }
//     if(product.length){
//       return res.json({'success':true,'message':'product fetched by id successfully',product});
//     }
//     else{
//       return res.json({'success':false,'message':'Todo with the given id not found'});
//     }
//   })
// }
// export const deleteTodo = (io,T) => {
//   let result;
//   Product.findByIdAndRemove(T.id, (err,product) => {
//     if(err){
//     result = {'success':false,'message':'Some Error','error':err};
//     console.log(result);
//     }
// result = {'success':true,'message':product.productText+'Todo deleted successfully'};
//     io.emit('TodoDeleted', result);
//   })
// }