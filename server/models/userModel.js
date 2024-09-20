const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      admin:{
        type:Boolean,
        default:false
    },
    password:{
      type: String,
      required: true,
    },
    cart:{
      type:Array,
      default:[]
  },
    },
    {
      timestamps: true,
    }
  );


module.exports = mongoose.model("User", userSchema);
