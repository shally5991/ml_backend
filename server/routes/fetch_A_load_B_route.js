const express = require("express");
const route = express.Router()
const fetch_nd_load = require('../controller/fetch_A_load_B');
const logger = require("../helper/logger");
// const faceRecognitionUploads = require("../middlewares/faceRecognitionUploads");
// const conn = require('../database/connection');
const connlocal = require('../database/connectionLocal')




route.get('/historyperson', async (req, res) => {
    await conn();
    logger.info("Got all persons.")
    fetch_nd_load.getPersons().then(result => {
        res.status(result.status).json(result);
    }).catch(err => {
        logger.error(err);
        res.status(err.status).send(err.msg);
    })


})


route.get('/registerperson', async (req, res) => {
    await conn();    
    try {
        let result = await fetch_nd_load.getRegisteredPersons();
        if (result.length) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, msg: 'Data not found!' });
        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Internal server error!' });
    }
});

route.post('/loaddata', async (req, res) => {
    await connlocal();
    
    try {
        let result2 = await fetch_nd_load.loadLocal() 
        res.status(result2.status).json(result2);    


    } catch (err) {
        logger.error("getRegisteredPlates Error :", err)
        res.status(500).json({ status: 500, msg: 'Internal server error!' });
    }
});


route.get('/historyplate',async (req, res) => {
    await conn();
    logger.info("Got the license plates.")
    fetch_nd_load.getPlates().then(result => {
        res.status(result.status).json(result);
    }).catch(err => {
        logger.error(err);
        res.status(err.status).send(err.msg);
    })
});


route.get('/registerplate', async (req, res) => {
    await conn();
    try {
        let result = await fetch_nd_load.getRegisteredPlates();
        if (result.length) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, msg: 'Data not found!' });
        }
    } catch (err) {
        res.status(500).json({ status: 500, msg: 'Internal server error!' });
    }
});

module.exports = route