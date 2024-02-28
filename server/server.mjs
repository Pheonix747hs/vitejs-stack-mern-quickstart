import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToMongoDB from './db/conn.mjs'
import eventSchema from './Schema/eventschema.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
dotenv.config();
const PORT = process.env.PORT || 5050
const app = express()
const eventschemas = mongoose.model('eventSchema', eventSchema)

app.use(cors())
app.use(compression())
app.use(bodyParser.json({limit:'10mb'})) //increase the json size limit to 10mb

// Create an API endpoint to fetch all documents from the collection
app.get("/events", async (req, res) => {
  try {
    
    const client = await connectToMongoDB();
    const collection = client.db("Cipher_website").collection("Website_events");
    
    // Retrieve all documents using `find` method
    const allEvents = await collection.find({}).toArray();

    // Use the retrieved documents
    // console.log("Retrieved events:", allEvents);

    await client.close(); // Close the connection when done
    res.send(allEvents) // Sends received info back to the requestor
  } catch (error) {
    console.error('Error during database operation:', error);
    // Handle errors appropriately
  }
});

app.post("/events", async (req, res) => {
  try {
      const client = await connectToMongoDB();
      const collection = client.db("Cipher_website").collection("Website_events");
      const newevent = new eventschemas(req.body);
      const validationerr = await newevent.validate();

      if (validationerr) {
        // Handle validation errors (e.g., return a response with error details)
        const errors = validationErrors.errors;
        res.status(400).send({ message: 'Validation failed', errors });
        return; // Exit the function if validation fails
      }

      // Insert the data into the database using `insertOne` method
      const result = await collection.insertOne(req.body);

      await client.close(); // Close the connection when done
      res.status(201).send({ message: 'Document created successfully', documentId: result.insertedId });
  } catch (error) {
      console.error('Error during data upload:', error);
      // Handle errors appropriately, e.g., return a meaningful error response
      res.status(500).send({ message: 'Error uploading document' });
  }
});
// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
