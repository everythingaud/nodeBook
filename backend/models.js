// MongoDB models
const mongoose = require('mongoose');

// Schema for a User object
const userSchema = mongoose.Schema({
  //login username
  username: {
    type: String,
    required: true
  },
  //hashed password
  password: {
    type: String,
    required: true
  },
  //first name
  fName: {
    type: String,
    required: true
  },
  //last name
  lName: {
    type: String,
    required: true
  }
});

// Schema for a Document object
const documentSchema = mongoose.Schema({
  //title of document
  title: String,
  //array of users who have permission to the document
  collabs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  //stringified contentEditable text contents
  text: String,
  //date first created
  dateCreated: Date,
  //creator of the document
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  //password/access key to give other users access to document
  password: String,
  //revision history of the document (previos saved versions)
  history: Array,
  //current content of the document
  current: String
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);

module.exports = { User, Document };
