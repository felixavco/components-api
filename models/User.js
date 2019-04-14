const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: 'user', required: true},
	creation_date: { type: Date, default: new Date() }, 
});

module.exports = User = mongoose.model('users', UserSchema);