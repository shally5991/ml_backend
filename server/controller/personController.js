const Persons = require("../model/personHistory");
const logger = require("../helper/logger");
const RegisterPersons = require("../model/registerPersons");
const s3Service = require('../services/s3UploadV2');

module.exports = {
    insertPersons: (data, file) => {
        return new Promise(async (resolve, reject) => {
            try {

                let plates = await RegisterPersons.find().sort({ createdAt: -1 });
                console.log(plates)
                let isRegister = await RegisterPersons.findOne({ name: data.name });
                let person;
                console.log(data.name)
                console.log(isRegister)
                // const s3Data = await s3Service.s3UploadV2(file);
                // data.personImg = s3Data.Location
                if (isRegister) {
                    person = new Persons({
                        cameraid: data.cameraid,
                        time_in: data.time_in,
                        time_out: data.time_out,
                        name: data.name,
                        personImg: file.filename,
                        isRegister: true
                    });
                } else {
                    person = new Persons({
                        cameraid: data.cameraid,
                        name: "unknown",
                        personImg: file.filename,
                        isRegister: false,
                        time_visited: data.time_in
                    });
                }
                person.save().then(() => {
                    resolve({ status: 201, msg: true });
                }).catch(err => {
                    logger.error("insertPersons Error :", err);
                    reject({ status: 500, msg: false });
                });
            } catch (err) {
                logger.error("insertPersons Error :", err);
                reject({ status: 500, msg: false });
            }
        });
    },
    updatePersons: (personNum, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                logger.info(`updatePersons : ${JSON.stringify(data)} person:${personNum}`);
                let person = await Persons.findOne({
                    person: personNum,
                    isRegister: true
                }).sort({ createdAt: -1 });
                if (person && !person.time_out) {
                    person.time_out = data.time_out;
                    person.cameraid = data.cameraid;
                    person.save()
                    resolve({ status: 200, msg: true })
                } else {
                    resolve({ status: 404, msg: false })
                }
            } catch (error) {
                logger.error("updatePersons Error : ", error);
                reject({ status: 500, msg: false });
            }
        })
    },
    getPersons: (page, limit) => {
        return new Promise(async (resolve, reject) => {
            logger.info("Get all persons");
            try {
                let persons = await Persons.paginate({}, { sort: { createdAt: -1 }, page, limit });
                if (persons.docs.length) {
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
    registerPersons: (data, file_location) => {
        return new Promise(async (resolve, reject) => {            
            try {
                logger.info(`registerPersons : ${JSON.stringify(data)}`);
                let person = await RegisterPersons.findOne({ name: data.name });
                if (person) {
                    resolve({ status: 409, msg: 'Person already registered!' })
                } else {
                    // const s3Data = await s3Service.s3UploadV2(file, data.name);
                    // data.personImg = s3Data.Location;                    
                    data.personImg = file_location
                    let registeredPerson = new RegisterPersons({
                        name: data.name,
                        personImg: data.personImg
                    });
                    await registeredPerson.save();
                    resolve({ status: 201, msg: 'Person registered successfully...' });
                }
            } catch (err) {
                reject(err)
            }
        });
    },
    getRegisteredPersons: (page, limit) => {
        return new Promise((resolve, reject) => {
            RegisterPersons.paginate({}, { sort: { createdAt: -1 }, page, limit }).then(registeredPersons => {
                resolve(registeredPersons);
            }).catch(err => {
                logger.error("getRegisteredPersons Error :", err);
                reject({ status: 500, msg: 'Internal server error!' });
            });
        });
    }
}
