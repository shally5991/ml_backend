const express = require("express");
const route = express.Router()
const personController = require('../controller/personController');
const logger = require("../helper/logger");
const faceRecognitionUploads = require("../middlewares/faceRecognitionUploads");
const upload = require("../middlewares/upload_person_image")
// const conn = require('../database/connection');
const conn = require('../database/connectionLocal')
const fetch_nd_load = require('../controller/fetch_A_load_B');



route.get('/history', async (req, res) => {
    logger.info("Got the person.")
    if (req.query.page && req.query.limit) {
        await conn();
        personController.getPersons(req.query.page, req.query.limit).then(result => {
            res.status(result.status).json(result);
        }).catch(err => {
            logger.error(err);
            res.status(err.status).send(err.msg);
        })
    }
    else {
        res.status(400).json({ status: 400, msg: 'Invalid Data!' });
    }
})

route.post('/register', upload.any(), async (req, res) => {
    try {
        if (req.files.length && req.body) {
            await conn(); 
            let result = await personController.registerPersons(req.body, req.files[0].filename);            
            res.status(result.status).json(result);
        } else {
            res.status(400).send({ status: 400, msgs: "Invalid data." });
        }
    } catch (err) {
        logger.error(err);
        res.status(500).json({ status: 500, msg: 'Internal server error!' });
    }
});

route.get('/register', async (req, res) => {
    if (req.query.page && req.query.limit) {
        try {
            await conn();
            let result = await personController.getRegisteredPersons(req.query.page, req.query.limit);
            if (result.docs.length) {
                res.status(200).json({ status: 200, data: result });
            } else {
                res.status(404).json({ status: 404, msg: 'Data not found!' });
            }
        } catch (err) {
            res.status(500).json({ status: 500, msg: 'Internal server error!' });
        }
    }
    else {
        res.status(400).json({ status: 400, msg: 'Invalid Data!' });
    }

});

route.post('/check_in', upload.any(), async (req, res) => {
    if (req.files.length && req.body) {
        await conn();
        personController.insertPersons(req.body, req.files[0]).then(result => {
            res.status(result.status).send(result.msg);
        }).catch(err => {
            res.status(err.status).send(err.status);
        })
    } else {
        res.status(400).send({ status: 400, msgs: "Invalid data." });
    }
})

route.put('/check_out/:name', async (req, res) => {
    if (req.params.name && req.body) {
        await conn();
        personController.updatePersons(req.params.name, req.body).then(result => {
            res.status(result.status).send(result.msg);
        }).catch(err => {
            res.status(err.status).send(err.msg);
        })
    } else {
        res.status(400).send({ status: 400, msgs: "Invalid data." });
    }
})

// route.get('/historyperson', async (req, res) => {    
//     logger.info("Got all persons.")
//     await conn();
//     fetch_nd_load.getPersons().then(result => {
//         res.status(result.status).json(result);
//     }).catch(err => {
//         logger.error(err);
//         res.status(err.status).send(err.msg);
//     })
// })


module.exports = route