const express = require("express");
const route = express.Router()
const mlController = require('../controller/mlController');
const logger = require("../helper/logger");
const licensePlatesUploads = require('../middlewares/licensePlatesUploads');
// const conn = require('../database/connection');
const conn = require('../database/connectionLocal')
const upload = require("../middlewares/upload_register_image")



route.post('/check_in',  upload.any(), async (req, res) => {
    await conn();
    try {
        if (req.files.length && req.body) {
            // req.body.plateImg = req.files[0].location;           

            
            mlController.insertPlates(req.body, req.files[0]).then(result => {
                res.status(result.status).send(result.msg);
            }).catch(err => {
                res.status(err.status).send(err.status);
            })
        } else {
            res.status(400).send({ status: 400, msgs: "Invalid data." });
        }
    } catch (err) {
        logger.error(err);
        res.status(500).send({ status: 500, msgs: "Internal server error!" });
    }
})

route.put('/check_out/:plate', async (req, res) => {
    await conn();
    if (req.params.plate && req.body) {
        mlController.updatePlates(req.params.plate, req.body).then(result => {
            res.status(result.status).send(result.msg);
        }).catch(err => {
            res.status(err.status).send(err.msg);
        })
    } else {
        res.status(400).send({ status: 400, msgs: "Invalid data." });
    }
})



module.exports = route