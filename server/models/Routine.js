import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name : String,
    products: [String]
})

const Routine = mongoose.model('Routine', routineSchema)
export default Routine;