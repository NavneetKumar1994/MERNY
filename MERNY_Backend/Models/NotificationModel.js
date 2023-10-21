const mongoose= require('mongoose');

const NotificationSchema= new mongoose.Schema({
     user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required:true
     },
     recipients:[{
          type: mongoose.Schema.Types.ObjectId,
          ref:'User'
     }],
     url:{
          type:String
     },
     text:{
          type:String
     },
     content:{
          type:String
     },
     image:{
          type:String
     },
     isRead:{
          type:Boolean,
          default: false
     },
     createdAt: { 
          type: Date,
           default: Date.now 
          },
     updatedAt: { 
          type: Date, 
          default: Date.now 
     }
});

module.exports= mongoose.model('Notification',NotificationSchema);