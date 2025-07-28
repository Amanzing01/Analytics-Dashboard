import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected with the database");
    } catch (error) {
        console.error('Connection error:', error.message);
        process.exit(1);
        
    }
};

export default connect;