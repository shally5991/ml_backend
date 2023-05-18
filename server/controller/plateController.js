const PlateHistory = require("../model/platesHistory");
const logger = require("../helper/logger");
const RegisterPlates = require("../model/registerPlates");

module.exports = {
    getPlates: (page,limit) => {
        return new Promise(async (resolve, reject) => {
            logger.info("Get all plates");
            try {
                let plates = await PlateHistory.paginate({},{sort:{createdAt: -1},page,limit});
                if (plates.docs.length) {
                    resolve({ status: 200, data: plates });
                }
                else {
                    resolve({ status: 404, msg: 'Data not found!' });
                }
            } catch (error) {
                logger.error(`ERR : ${error}`)
                reject({ status: 500, msg: 'Internal server error!' })
            }
        })
    },
    registerPlates: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                logger.info(`registerPlates : ${JSON.stringify(data)}`);
                let plate = await RegisterPlates.findOne({ plate: data.plate });
                if (plate) {
                    resolve({ status: 409, msg: 'Plate already registered!' })
                } else {
                    let registeredPlate = new RegisterPlates({ plate: data.plate });
                    await registeredPlate.save();
                    resolve({ status: 201, msg: 'Plate registered successfully...' });
                }
            } catch (err) {
                reject(err)
            }
        });
    },
    getRegisteredPlates: (page,limit) => {
        return new Promise((resolve, reject) => {
            RegisterPlates.paginate({},{sort:{createdAt: -1},page,limit}).then(registeredPlates => {
                resolve(registeredPlates);
            }).catch(err => {
                logger.error("getRegisteredPlates Error :", err);
                reject({ status: 500, msg: 'false' });
            });
        });
    },
}