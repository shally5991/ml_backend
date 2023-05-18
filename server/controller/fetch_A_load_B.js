const PersonsHistory = require("../model/personHistory");
const logger = require("../helper/logger");
const RegisterPersons = require("../model/registerPersons");
const PlateHistory = require("../model/platesHistory");
const RegisterPlates = require("../model/registerPlates");


module.exports = {
 
    getPersons: () => {
        return new Promise(async (resolve, reject) => {
            logger.info("Get all persons");
            try {
                let persons = await PersonsHistory.find().sort({ createdAt: -1 });
                logger.info("person :: " , Object.keys(persons).length)
                if (persons.length) {
                    resolve({ status: 200, data: persons });
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

    getRegisteredPersons: () => {
        return new Promise((resolve, reject) => {
            RegisterPersons.find().sort({ createdAt: -1 }).then(registeredPersons => {
                resolve(registeredPersons);
            }).catch(err => {
                logger.error("getRegisteredPersons Error :", err);
                reject({ status: 500, msg: 'Internal server error!' });
            });
        });
    },

    getPlates: () => {
        return new Promise(async (resolve, reject) => {
            logger.info("Get all plates");
            try {
                let plates = await PlateHistory.find().sort({ createdAt: -1 });
                if (plates.length) {
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

    getRegisteredPlates: () => {
        return new Promise((resolve, reject) => {
            RegisterPlates.find().sort({ createdAt: -1 }).then(registeredPlates => {
                resolve(registeredPlates);
            }).catch(err => {
                logger.error("getRegisteredPlates Error :", err);
                reject({ status: 500, msg: 'false' });
            });
        });
    },
    loadLocal: (data) => {
        return new Promise( (resolve, reject) => {

            data = [
                {
                    "_id": "63230c6233fb8eeb37eae0d8",
                    "plate": "TN07AT81004",
                    "status": "active",
                    "createdAt": "2022-09-15T11:28:34.325Z",
                    "updatedAt": "2022-09-15T11:28:34.325Z",
                    "__v": 0
                },
                {
                    "_id": "62c7d706909615ced582ebba",
                    "plate": "UP50AC7530",
                    "status": "active",
                    "createdAt": "2022-07-08T07:04:38.566Z",
                    "updatedAt": "2022-07-08T07:04:38.566Z",
                    "__v": 0
                },
                {
                    "_id": "62c6cd5fc9b62f440119ae30",
                    "plate": "DL3CAH0857",
                    "status": "active",
                    "createdAt": "2022-07-07T12:11:11.226Z",
                    "updatedAt": "2022-07-07T12:11:11.226Z",
                    "__v": 0
                },
                {
                    "_id": "62c6cd49c9b62f440119ae2d",
                    "plate": "TN07AT8107",
                    "status": "active",
                    "createdAt": "2022-07-07T12:10:49.045Z",
                    "updatedAt": "2022-07-07T12:10:49.045Z",
                    "__v": 0
                },
                {
                    "_id": "62c6cd37c9b62f440119ae2a",
                    "plate": "UP16AW0020",
                    "status": "active",
                    "createdAt": "2022-07-07T12:10:31.545Z",
                    "updatedAt": "2022-07-07T12:10:31.545Z",
                    "__v": 0
                },
                {
                    "_id": "62c6cd1ec9b62f440119ae25",
                    "plate": "UP16BQ2121",
                    "status": "active",
                    "createdAt": "2022-07-07T12:10:06.857Z",
                    "updatedAt": "2022-07-07T12:10:06.857Z",
                    "__v": 0
                },
                {
                    "_id": "62c6cd02c9b62f440119ae20",
                    "plate": "MH20EJ0365",
                    "status": "active",
                    "createdAt": "2022-07-07T12:09:38.092Z",
                    "updatedAt": "2022-07-07T12:09:38.092Z",
                    "__v": 0
                },
                {
                    "_id": "62c6cceec9b62f440119ae1b",
                    "plate": "KA05NB1786",
                    "status": "active",
                    "createdAt": "2022-07-07T12:09:18.142Z",
                    "updatedAt": "2022-07-07T12:09:18.142Z",
                    "__v": 0
                },
                {
                    "_id": "62c6ccddc9b62f440119ae18",
                    "plate": "TN12AA7870",
                    "status": "active",
                    "createdAt": "2022-07-07T12:09:01.126Z",
                    "updatedAt": "2022-07-07T12:09:01.126Z",
                    "__v": 0
                },
                {
                    "_id": "62c6cca6c9b62f440119ae07",
                    "plate": "MH20EE7601",
                    "status": "active",
                    "createdAt": "2022-07-07T12:08:06.944Z",
                    "updatedAt": "2022-07-07T12:08:06.944Z",
                    "__v": 0
                },
                {
                    "_id": "62c6cc83c9b62f440119ae02",
                    "plate": "KL55R2473",
                    "status": "active",
                    "createdAt": "2022-07-07T12:07:31.108Z",
                    "updatedAt": "2022-07-07T12:07:31.108Z",
                    "__v": 0
                },
                {
                    "_id": "62c6c962849f6ed2c4eccfa4",
                    "plate": "UP80AZ2420",
                    "status": "active",
                    "createdAt": "2022-07-07T11:54:10.398Z",
                    "updatedAt": "2022-07-07T11:54:10.398Z",
                    "__v": 0
                }
            ]
                           
            RegisterPlates.insertMany(data).then(() => {
                resolve({ status: 201, msg: true });
            }).catch(err => {
                logger.error("insertPersons Error :", err);
                reject({ status: 500, msg: false });
            });
            
        });
    },
    
 
}

