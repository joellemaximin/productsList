const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//import controller file
const prodController = require("./controller/productsController");

const mongo = require('mongodb').MongoClient;
const http = require('http')
const socketIO = require('socket.io')
// our localhost port
const port = 4001
const app = express()
// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server);


// Use connect method to connect to the server
mongo.connect("mongodb://localhost", function(err, client){
    if(err){
        throw err;
    }
    console.log('Mongodb est connecté....');
    
    //je récupère le nom de ma DB


    var db = client.db('productslist');
    // const collectionP = db.collection("products");
    // db.collection('products').findOne({}, function (findErr, result) {
    //   if (findErr) throw findErr;
    //   console.log(result.name);
    // });

    io.on("connection", socket => {

        console.log('client connected')

        // sendStatus = function(x){
        //     socket.emit('status', x)
        // }

        //afficher tous les produits
        db.collection('products').find()
        .toArray((findErr, res) => {
            if (findErr) throw findErr;
            
            socket.emit("output", res);
            // console.log(res);

            // res.forEach((value)=>{
            //     console.log(value, "OKKKKKKK")
            // })
        });
        
        //ajouter un produit
        socket.on('addProduct', (Product) => {
            console.log('socketData: '+JSON.stringify(Product));
            prodController.addProduct(io,Product);
            console.log('OOOOOOOOOOOOOOOOOOOOOO')
        });
        // Receiving Updated Product from client
        socket.on('updateProduct', (Product) => {
            console.log('socketData: '+JSON.stringify(Product));
            prodController.updateProduct(io,Product);
        });
        // Receiving Product to Delete
        socket.on('deleteProduct', (Product) => {
            console.log('socketData: '+JSON.stringify(Product));
            prodController.deleteProduct(io,Product);
        });
        

        //je prend les valeurs des inputs
        socket.on('input', function(data){
            let name = data.name;
            let price = data.price;
            let type = data.type;
            let rating = data.rating;
            let warranty_years = data.warranty_years;
            let available = data.available;
             
            if (name == '' || price == '' || type == ''  || rating == ''  || warranty_years == ''  || availabe == '' ){
                //j'envoie un status d'error
                sendStatus("Rentré les valeurs attribué")
            } else {
                db.insert({
                    name: name,
                    price: price,
                    type: type,
                    rating: rating,
                    warranty_years: warranty_years,
                    available: available,
                }, function(){
                    socket.emit('output', [data]);
                    sendStatus({
                        message: 'produit créer'
                    })
                })
            }
        })

        socket.on('disconnect', () => {
            console.log('client disconnected')
        })
    })
})

// const port = 8000;
// io.listen(port);
// console.log('listening on port ', port);

// const index = require("./routes/index");
// const app = express();
// app.use(index);

// This is what the socket.io syntax is like, we will work this later

server.listen(port, () => console.log(`Listening on port ${port}`))

// db.collection('products').find()
// .toArray((findErr, res) => {
//     if (findErr) throw findErr;
//     // console.log(res);
    
//     socket.emit("output", res);
//     res.forEach((value)=>{
//         console.log(value, "OKKKKKKK")
//     })
// });

//import controller file
module.exports = prodController;
