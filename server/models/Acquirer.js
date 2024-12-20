const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const acquirerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'] // Optional: Regex to ensure valid email format
  },
  password: {
    type: String,
    required: true
  }
});

// Hash password before saving it
acquirerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if the password is correct
acquirerSchema.methods.isPasswordMatch = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const Acquirer = mongoose.model('Acquirer', acquirerSchema);

module.exports = Acquirer;
