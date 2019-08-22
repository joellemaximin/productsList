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
    console.log('Mongodb est connectée....');
    
    //je récupère le nom de ma DB


    var db = client.db('productslist');
    // const collectionP = db.collection("products");
    // db.collection('products').findOne({}, function (findErr, result) {
    //   if (findErr) throw findErr;
    //   console.log(result.name);
    // });

    io.on("connection", socket => {
        console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP')
        //  console.log("New client connected" + socket.id);
          //console.log(socket);
        // Returning the initial data of food menu from FoodItems collection
        socket.on("initial_data", () => {
            var db = client.db('productslist');

            db.collection('products').find({}, function (findErr, result) {
                if (findErr) throw findErr;
                console.log(result)
            });
        })
    
 
    // io.on('connection', socket => {
        // var db = client.db('productslist');

        console.log('client connected')

        // let product = db.collection('products');

        sendStatus = function(x){
            socket.emit('status', x)
        }
        // collectionP.find('products').findOne({}, function (findErr, res) {
        //     if (findErr) throw findErr;
        //     // console.log(res.name);
            
        //     socket.emit("output", res);
        //     console.log(res)
        // })

        //je prend les valeurs des inputs
        socket.on('in', function(data){
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
            console.log('user disconnected')
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