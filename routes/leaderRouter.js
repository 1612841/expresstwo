const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leads = require('../models/leaders');
const leaders = express.Router();

leaders.use(bodyParser.json());

leaders.route('/')
.get((req,res,next) => {
    Leads.find({})
    .then((leads) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leads.create(req.body)
    .then((lead) => {
        console.log('Leader Created ', lead);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    Leads.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

//
leaders.route('/:leaderId')
.get((req,res,next) => {
    Leads.findById(req.params.leaderId)  
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leader/'+ req.params.leaderId);
})
.put((req, res, next) => {
    Leads.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leads.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaders;