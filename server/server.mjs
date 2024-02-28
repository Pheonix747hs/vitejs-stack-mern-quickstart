import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToMongoDB from './db/conn.mjs'
dotenv.config();
const PORT = process.env.PORT || 5050
const app = express()

app.use(cors())
app.use(express.json())

// Create an API endpoint to fetch all documents from the collection
app.get("/documents", async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const collection = client.db("Cipher_website").collection("Website_events");

    // Retrieve all documents using `find` method
    const allEvents = await collection.find({}).toArray();

    // Use the retrieved documents
    console.log("Retrieved events:", allEvents);

    await client.close(); // Close the connection when done
    res.send(allEvents) // Sends recived info back to the requestor
  } catch (error) {
    console.error('Error during database operation:', error);
    // Handle errors appropriately
  }
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
