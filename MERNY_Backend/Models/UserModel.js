const mongoose= require('mongoose');
const validator= require('validator');

const UserSchema= new mongoose.Schema({

  fullname: { 
          type: String,
          required: true 
     },
  username: { 
     type: String,
     required: true 
     },
  email: { 
     type: String, 
     required: true
     },
  password: { 
     type: String, 
     required: true
     },
  avatar: { 
     type: String, 
     default: 'https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg' 
      },
  role: { 
     type: String,

},
  gender: { 
     type: String,
 },
  mobile: {
      type: String,
      unique: true,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
      },
  address: { 
     type: String 
},
  bio: { 
     type: String 
},
  website: { 
     type: String 
},
story:{
   type:String
},
  followers: [{
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User' 
     }],
  following: [{ 
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
     }],
  saved: [{ 
     type: mongoose.Schema.Types.ObjectId,
      ref: 'SavedItem' 
     }],
     createdAt: { 
      type: Date,
       default: Date.now 
      },
     updatedAt: { 
      type: Date, 
      default: Date.now 
   }
})

module.exports = mongoose.model('User',UserSchema);