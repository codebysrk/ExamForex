import mongoose from 'mongoose';

// Define the schema for the Admin model
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // image: {
  //   data: Buffer, // Binary data of the image
  //   contentType: String // MIME type of the image
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Admin model from the schema
const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
