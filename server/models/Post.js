const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var PostSchema = new mongoose.Schema({
    username: {
        type: String
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        default:''
    },
    views:{
        type:Number,
        default:0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    comments: [{
        type:mongoose.Schema.Types.ObjectId, ref:'Comment'
    }]
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Post', PostSchema);