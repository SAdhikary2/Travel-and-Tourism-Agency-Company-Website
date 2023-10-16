const mongoose = require('mongoose');



const bookingSchema =new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    numberOfGuests: Number,
    checkInDate: Date,
    checkOutDate: Date,
    specialRequest: String,
});



// Create a model from the schema
const monmodel = mongoose.model('BOOKING', bookingSchema);
module.exports=monmodel;