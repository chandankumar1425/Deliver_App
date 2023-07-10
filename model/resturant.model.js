const mongoose = require('mongoose');
const ResturantSchema = mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{
        _id: { type: mongoose.Schema.Types.ObjectId },
        name: String,
        description: String,
        price: Number,
        image: String
    }]
});

const ResturantModel = mongoose.model('Resturant', ResturantSchema);

module.exports = { ResturantModel }