import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
    code : {
        type: String,
        required: true,
        unique: true
    },
    surveyName : {
        type :String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['Active', 'Draft', 'Closed'],
        default: 'Draft'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    respondents: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})

const Survey = mongoose.model("Survey", surveySchema)
export default Survey;

