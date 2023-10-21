const mongoose= require('mongoose');




const CommentSchema= new mongoose.Schema({
     content:{
          type:String,
          required:true
     },
     tag:{
          type:Object
     },
     reply:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Comment'
     },
     likes:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User'
     }],
     user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
     },
     postId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'Post',
          required:true

     },
     postUserId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'User',
          },
     createdBy:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'User'
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

module.exports= mongoose.model('Comment',CommentSchema);