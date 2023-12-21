const mongoose = require('mongoose');

const currencySchema = mongoose.Schema({
    _id: { type: String, required: true },  // CURRENCY SYMBOL. EXAMPLE KES, GHS, RWF
    title: { type: String, required: true }, // EXAMPLE KENYA SHILLING
    symbol: { type: String, required: true }, // KES
    country: { type: String, required: true }, //KENYA
    maxWithdrawal: { type: Number, required: true}, // MAXIMUM AMOUNT THAT CAN BE WITHDRAWN AT A PARTICULAR TIME
    minWithdrawal: { type: Number, required: true }, // MINIMUM AMOUNT THAT A USER CAN WITHDRAW
    reserves: { type: Number, required: true }, //  TOTAL LIQUIDITY POOL
    buyingRate: { type: Number, required: true }, 
    withdrawalRate: { type: Number, required: true },
    transactionRate: { type: Number, required: true }, 
    token: { type: String, required: true },    //EXPO TOKEN FOR NOTIFICATIONS
});

module.exports = mongoose.model('Currency', currencySchema);