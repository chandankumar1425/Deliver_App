const mongoose=require('mongoose');

const connection = mongoose.connect("mongodb+srv://chandan:chandankumar@cluster0.spzoums.mongodb.net/FoodDelivery?retryWrites=true&w=majority")

module.exports = {connection}

