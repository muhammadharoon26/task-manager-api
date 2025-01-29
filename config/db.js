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





import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

export { client };
