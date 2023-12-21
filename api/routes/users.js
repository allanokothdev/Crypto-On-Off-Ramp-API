const express = require('express');
const router = express.Router();

const User = require('../models/user')

//  HANDLES USERS KYC OPERATIONS

//  FETCH ALL USERS
router.get('/', (req, res, next) => {
    User.find()
        .select('email phoneNumber verified country name walletAddress')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        walletAddress: doc.walletAddress,
                        name: doc.name,
                        country: doc.country,
                        verified: doc.verified,
                        email: doc.email,
                        phoneNumber: doc.phoneNumber,
                        request: {
                            type: 'GET',
                            description: 'Get users details for ' + doc._id,
                            url: 'https://localhost:3000/users/' + doc._id
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

//  CREATE NEW USER
router.post('/', (req, res, next) => {

    const user = new User({
        _id: req.body.worldID,
        name: req.body.name,
        country: req.body.country,
        registrationNumber: req.body.registrationNumber,
        registrationDocUrl: req.body.registrationDocUrl,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        verified: false,
        worldID: req.body.worldID,
        apiKey: req.body.apiKey,
        createdAt: Date.now(),
    })

    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "User was created successfully",
            createdUser: {
                name: result.name,
                country: result.country,
                registrationNumber: result.registrationNumber,
                registrationDocUrl: result.registrationDocUrl,
                phoneNumber: result.phoneNumber,
                email: result.email,
                verified: result.verified,
                worldID: result.worldID,
                apiKey: result.apiKey,
                createdAt: result.createdAt,
                request: {
                    type: 'GET',
                    description: 'Get currency details for ' + result._id,
                    url: 'https://localhost:3000/currencies/' + result._id
                }
            },
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })


});

//  FETCH USER DETAILS
router.get('/:worldID', (req, res, next) => {
    const id = req.params.worldID;
    User.findById(id)
        .select('verified country name worldID')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                });
            } else {
                res.status(404).json({ message: 'No valid entry found for Provided worldID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
});


//  UPDATE USER FIELDS
router.patch('/:worldID', (req, res, next) => {
    const id = req.params.worldID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User Updated',
                request: {
                    type: 'GET',
                    description: 'Get all users',
                    url: 'https://localhost:3000/users/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

//  DELETE USER
router.delete('/:worldID', (req, res, next) => {
    const id = req.params.worldID;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User Deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

module.exports = router;