const mongoose= require('mongoose');


const MessageSchema= new mongoose.Schema({
     conversation:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Conversation',
          required:true
     },
     sender:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'User',
          required:true
     },
     recipients:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User'
     }],
     text:{
          type:String
     },
     media: [{
          type:String
     }]
})

module.exports= mongoose.model('Message',MessageSchema);