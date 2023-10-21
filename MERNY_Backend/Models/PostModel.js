const mongoose= require('mongoose');
const validator= require('validator');

const PostSchema= new mongoose.Schema({

     content:{
          type:String,
     },
     images:[{
          type:String
     }],
     likes:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
     }],
     comments:[{
          type: mongoose.Schema.Types.ObjectId,
          ref:'Comment'
     }],
     user:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'User',
          required:true
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

module.exports = mongoose.model('Post',PostSchema);