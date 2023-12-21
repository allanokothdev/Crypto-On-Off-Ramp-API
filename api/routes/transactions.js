const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Currency = require('../models/currency');
const Transaction = require('../models/transaction');

//  FETCH ALL TRANSACTIONS
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Transactions fetched"
    })
});


//  MAKE DEPOSIT TRANSACTION
router.post('/mobileDeposit', async (req, res, next) => {
    const arguments = {
        phoneNumber: req.body.phoneNumber,
        walletAddress: req.body.walletAddress,
        assetSymbol: req.body.assetSymbol,
        currencySymbol: req.body.currencySymbol,
        fiatValue: req.body.fiatValue,
        paymentType: req.body.paymentType,
        apiKey: req.body.apiKey
    }

    //FETCH RESPECTIVE CURRENCY
    const currency = {}

    //  CONVERT LOCAL CURRENCY TO USD
    let amountInUSD = convertUSD(arguments.fiatValue);
    
});

//  MAKE MOBILE MONEY WITHDRAWAL TRANSACTION
router.post('/:mobileWithdrawal', async (req, res, next) => {
    const arguments = {
        phoneNumber: req.body.phoneNumber,
        privateKey: req.body.privateKey,
        assetSymbol: req.body.assetSymbol,
        fiatSymbol: req.body.fiatSymbol,
        fiatValue: req.body.fiatValue,
        paymentType: req.body.paymentType,
        apiKey: req.body.apiKey
    }

    //FETCH RESPECTIVE CURRENCY
    Currency.findById(arguments.fiatSymbol)
        .then(currency => {

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Invalid Currency Symbol', error: err });
        })
});

//  FETCH TRANSACTION DETAILS
router.get('/:transactionId', (req, res, next) => {
    const id = req.params.transactionId;
    Transaction.findById(id)
        .select('type createdAt transactionHash apiKey paymentReferenceId crypto fiat walletAddress _id')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    transaction: doc,
                });
            } else {
                res.status(404).json({ message: 'No valid entry found for Provided ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
});

//  DELETE TRANSACTION
router.delete('/:transactionId', (req, res, next) => {
    const id = req.params.transactionId;
    Transaction.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Transaction Deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});


module.exports = router;