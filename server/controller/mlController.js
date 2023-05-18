const Plates = require("../model/platesHistory");
const logger = require('../helper/logger');
const RegisterPlates = require("../model/registerPlates");

module.exports = {
    insertPlates: (data,file) => {
        return new Promise(async (resolve, reject) => {
            logger.info(`insertPlates : ${JSON.stringify(data)}`);
            let isRegister = await RegisterPlates.findOne({ plate: data.plate });
            let plate;
            console.log(data,"==========")
            console.log(file,"==========")
            if (isRegister) {
                plate = new Plates({
                    cameraid: data.cameraid,
                    time_in: data.time_in,
                    time_out: data.time_out,
                    plate: data.plate,
                    plateImg: file.filename,
                    isRegister: true
                });
            } else {
                plate = new Plates({
                    cameraid: data.cameraid,
                    plate: data.plate,
                    isRegister: false,
                    plateImg: file.filename,
                    time_visited: data.time_in
                });
            }
            plate.save().then(() => {
                resolve({ status: 201, msg: true });
            }).catch(err => {
                logger.error("insertPlates Error :", err);
                reject({ status: 500, msg: false });
            });
        });
    },
    updatePlates: (plateNum, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                logger.info(`updatePlates : ${JSON.stringify(data)} plate:${plateNum}`);
                let plate = await Plates.findOne({
                    plate: plateNum,
                    isRegister: true
                }).sort({ createdAt: -1 });
                if (plate && !plate.time_out) {
                    plate.time_out = data.time_out;
                    plate.cameraid = data.cameraid;
                    plate.save()
                    resolve({ status: 200, msg: true })
                } else {
                    resolve({ status: 404, msg: false })
                }
            } catch (error) {
                logger.error("updatePlates Error : ", error);
                reject({ status: 500, msg: false });
            }
        })
    }
}