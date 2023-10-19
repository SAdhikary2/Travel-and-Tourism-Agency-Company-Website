const mongoose = require('mongoose');



const bookingSchema =new mongoose.Schema({
    firstName: String,
    lastName: String,
    destination: String,
    // phoneNumber: Number,
    email:String,
    numberOfGuests: Number,
    checkInDate: Date,
    checkOutDate: Date,
    specialRequest: String,
    status: {
        type: String,
        default: 'Pending'
      }
});



// Create a model from the schema
const monmodel = mongoose.model('BOOKING', bookingSchema);
module.exports=monmodel;