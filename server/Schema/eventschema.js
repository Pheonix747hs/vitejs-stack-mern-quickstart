
import mongoose from 'mongoose';

export default new mongoose.Schema({
  // Define your schema fields and their constraints (e.g., type, required, unique)
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  img:{
    type: String,
    required: true,
  },
});
