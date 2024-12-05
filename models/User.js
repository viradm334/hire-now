const mongoose = require("mongoose");
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const industryEnum = {
  IT_SOFTWARE: 'it-and-software',
  LEGAL_SERVICES: 'legal-and-professional-services',
  FINANCE: 'finance',
  HEALTHCARE: 'healthcare',
  TELECOMMUNICATIONS: 'telecommunications',
  CONSTRUCTION: 'construction',
  MANUFACTURING: 'manufacturing',
  HOSPITALITY_TOURISM: 'hospitality-and-tourism',
  MEDIA_ENTERTAINMENT: 'media-and-entertainment'
};

const companySizeEnum = [
  '1-10',
  '11-50',
  '50-100',
  '100-200',
  '200-500',
  '500-1000',
  '1000+'
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: [true, 'Email already taken'],
    lowercase: true,
    validate:[isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Minimum password length is 8 characters']
  },
  role: {
    type: String,
    enum: ["user", "company"],
    default: "user"
  },
  birth_date: { type: Date },
  phone_number: { type: String },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  resume: { type: String },
  profile_image: { type: String },
  primary_location: { type: String},
  company_size: {type: String, enum: companySizeEnum},
  industry: {
    type: String,
    enum: Object.values(industryEnum),
  },
  about: {type: String},
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email});
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    };
    throw Error('Incorrect password!');
  };
  throw Error('Incorrect email!');
}

const User = mongoose.model("User", userSchema);

module.exports = {User, industryEnum, companySizeEnum};
