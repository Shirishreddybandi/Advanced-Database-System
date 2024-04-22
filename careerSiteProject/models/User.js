const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Base Schema
const baseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  country: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['recruiter', 'admin', 'candidate', 'company'],
    default: 'candidate' // You can set the default role as needed
  },
  // Other fields common to all roles
});

// Hash password before saving to the database for all roles
baseSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Define Company Schema
const companySchema = new mongoose.Schema({
  companyName: {
    type: String
  },
  adminApprovalStatus: {
    type: Boolean,
    default: false, // Default value for adminApprovalStatus
  },
  // Fields specific to company
});

// Define Recruiter Schema
const recruiterSchema = new mongoose.Schema({
  // Fields specific to recruiter
});

// Define Admin Schema
const adminSchema = new mongoose.Schema({
  // Fields specific to admin
});

// Define Candidate Schema
const candidateSchema = new mongoose.Schema({
  // Fields specific to candidate
});

// Apply base schema to all schemas
const applyBaseSchema = (schema) => {
  schema.add(baseSchema);
};

// Apply base schema to all schemas
applyBaseSchema(companySchema);
applyBaseSchema(recruiterSchema);
applyBaseSchema(adminSchema);
applyBaseSchema(candidateSchema);

// Define models
const Company = mongoose.model('Company', companySchema);
const Recruiter = mongoose.model('Recruiter', recruiterSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = { Company, Recruiter, Admin, Candidate };



