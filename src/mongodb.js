const mongoose = require('mongoose');



const bookingSchema =new mongoose.Schema({
    firstName: String,
    lastName: String,
    destination: String,
    phoneNumber: Number,
    numberOfGuests: Number,
    checkInDate: Date,
    checkOutDate: Date,
    specialRequest: String,
    status: {
        type: String,
        default: 'pending'
      }
});



// Create a model from the schema
const monmodel = mongoose.model('BOOKING', bookingSchema);
module.exports=monmodel;