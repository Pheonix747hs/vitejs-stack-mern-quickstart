import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
async function connectToMongoDB() {
  const connectionString = process.env.ATLAS_URI || "mongodb+srv://root:root@cluster0.us64ucs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  if (!connectionString) {
    throw new Error('Missing ATLAS_URI environment variable.');
  }

  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error to handle it in your component or function
  }
}
async function handleDatabaseOperation() {
  
}

export default connectToMongoDB;
