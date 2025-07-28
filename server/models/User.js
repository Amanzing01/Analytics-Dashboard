import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: {
       type: String,
       required: true 
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    },
    age: {
        type: Number,
        required: true
    },
    skinType: {
        type: String,
        enum : ['Dry', 'Normal', 'Oily', 'Combination', 'Unknown'],
        default: 'Unknown'
    }, 
},{
    timestamps: true
})

const User = mongoose.model('User', userschema);
export default User;
