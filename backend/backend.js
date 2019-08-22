const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const mongo = require('mongodb').MongoClient;
const http = require('http')
const socketIO = require('socket.io')
// our localhost port
const port = 4001
const app = express()
// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

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
        db.collection('products').findOne({}, function (findErr, res) {
            if (findErr) throw findErr;
            // console.log(res);
            
            socket.emit("output", res);
            console.log(res, "OKKKKKKK")
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