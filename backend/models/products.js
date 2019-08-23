let mongoose = require('mongoose');
var Schema = mongoose.Schema;

let productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    available: {
        type: Boolean,
        require: true
    }, 
    rating: {
        type: Number,
        require: true
    },
    warranty_years: {
        type: Number,
        require: true
    }

});

// caradminSchema = caradminSchema._id.toString();
let Product = module.exports = mongoose.model('products', productSchema);