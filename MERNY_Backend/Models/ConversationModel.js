const mongoose= require('mongoose');


const ConversationSchema= new mongoose.Schema({
     recipients:[{
          type: mongoose.Schema.Types.ObjectId,
          ref:'User'
     }],
     text:{
          type:String
     },
     media:[{
          type:String
     }]
});

module.exports= mongoose.model('Conversation',ConversationSchema);