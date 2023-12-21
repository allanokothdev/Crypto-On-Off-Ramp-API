const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, required: true },
    walletAddress: { type: String, required: true },
    type: { type: String, required: true },
    fiat: { type: Object, required: true },
    crypto: { type: Object, required: true },
    paymentReferenceId: { type: String, required: true },
    transactionHash: { type: String, required: true },
    apiKey: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);