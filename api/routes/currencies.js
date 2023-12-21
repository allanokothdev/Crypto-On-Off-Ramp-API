const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Currency = require('../models/currency');


//  FETCH ALL CURRENCIES
router.get('/', (req, res, next) => {
    Currency.find()
        .select('title symbol country reserves maxWithdrawal minWithdrawal buyingRate withdrawalRate transactionRate token _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                currencies: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        symbol: doc.symbol,
                        country: doc.country,
                        maxWithdrawal: doc.maxWithdrawal,
                        minWithdrawal: doc.minWithdrawal,
                        reserves: doc.reserves,
                        buyingRate: doc.buyingRate,
                        withdrawalRate: doc.withdrawalRate,
                        transactionRate: doc.transactionRate,
                        token: doc.token,
                        request: {
                            type: 'GET',
                            description: 'Get currency details for '+ doc._id,
                            url: 'https://localhost:3000/currencies/'+ doc._id
                        }
                    }
                })
            }
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});


//  CREATE NEW CURRENCY
router.post('/', (req, res, next) => {

    const currency = new Currency({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        symbol: req.body.symbol,
        country: req.body.country,
        maxWithdrawal: req.body.maxWithdrawal,
        minWithdrawal: req.body.minWithdrawal,
        reserves: req.body.reserves,
        buyingRate: req.body.buyingRate,
        withdrawalRate: req.body.withdrawalRate,
        transactionRate: req.body.transactionRate,
        token: req.body.token,
    })

    currency.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Currency was created successfully",
            createdCurrency: {
                _id: result._id,
                title: result.title,
                symbol: result.symbol,
                country: result.country,
                maxWithdrawal: result.maxWithdrawal,
                minWithdrawal: result.minWithdrawal,
                reserves: result.reserves,
                buyingRate: result.buyingRate,
                withdrawalRate: result.withdrawalRate,
                transactionRate: result.transactionRate,
                token: result.token,
                request: {
                    type: 'GET',
                    description: 'Get currency details for '+result._id,
                    url: 'https://localhost:3000/currencies/' + result._id
                }
            },
        })
    }).catch (err => {
        console.log(err);
        res.status(500).json({ error: err })
    })

    
});

//  FETCH CURRENCY DETAILS
router.get('/:currencyId', (req, res, next) => {

    const id = req.params.currencyId;
    Currency.findById(id)
        .select('title symbol country reserves maxWithdrawal minWithdrawal buyingRate withdrawalRate transactionRate token _id')
        .exec()
        .then(doc => { 
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    currency: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all currencies',
                        url: 'https://localhost:3000/currencies'
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found for Provided ID'});
            }
         })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err})
        })
});

//  UPDATE CURRENCY FIELDS
router.patch('/:currencyId', (req, res, next) => {
    const id = req.params.currencyId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Currency.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Currency Updated',
                request: {
                    type: 'GET',
                    description: 'Get all currencies',
                    url: 'https://localhost:3000/currencies/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
});

//  DELETE CURRENCY
router.delete('/:currencyId', (req, res, next) => {
    const id = req.params.currencyId;
    Currency.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Currency Deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

module.exports = router;