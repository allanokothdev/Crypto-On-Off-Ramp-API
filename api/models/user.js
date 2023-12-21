const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    createdAt: { type: Date, required: true },
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: Number, required: true },
    registrationDocUrl: { type: String, required: true },
    walletAddress: { type: String, required: true },
    country: { type: String, required: true },
    verified: { type: Boolean, required: true },
    apiKey: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);