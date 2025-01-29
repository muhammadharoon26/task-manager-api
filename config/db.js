// import { MongoClient, ServerApiVersion } from 'mongodb';
// import 'dotenv/config';

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// export async function connectDB() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB successfully!");
//     } catch (error) {
//         console.error("MongoDB connection failed:", error);
//         process.exit(1);
//     }
// }

// export { client };





import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MongoDB URI not defined in environment variables");
        }
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Connected to MongoDB successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
