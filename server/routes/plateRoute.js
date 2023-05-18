const express = require("express");
const route = express.Router()
const plateController = require('../controller/plateController');
const logger = require("../helper/logger");
// const conn = require('../database/connection');
const conn = require('../database/connectionLocal')


route.get('/history', async (req, res) => {
    logger.info("Got the license plates.")
    if (req.query.page && req.query.limit) {
        await conn();
        plateController.getPlates(req.query.page, req.query.limit).then(result => {
            res.status(result.status).json(result);
        }).catch(err => {
            logger.error(err);
            res.status(err.status).send(err.msg);
        })
    } else {
        res.status(400).json({ status: 400, msg: 'Invalid Data!' });
    }
})

route.post('/register', async (req, res) => {
    try {
        if (req.body) {
            await conn();
            let result = await plateController.registerPlates(req.body);
            res.status(result.status).json(result);
        } else {
            res.status(400).send({ status: 400, msgs: "Invalid data." });
        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Internal server error!' });
    }
});

route.get('/register', async (req, res) => {
    if (req.query.page && req.query.limit) {
        try {
            await conn();
            let result = await plateController.getRegisteredPlates(req.query.page, req.query.limit);
            if (result.docs.length) {
                res.status(200).json({ status: 200, data: result });
            } else {
                res.status(404).json({ status: 404, msg: 'Data not found!' });
            }
        } catch (err) {
            res.status(500).json({ status: 500, msg: 'Internal server error!' });
        }
    } else {
        res.status(400).json({ status: 400, msg: 'Invalid Data!' });
    }

});

module.exports = route