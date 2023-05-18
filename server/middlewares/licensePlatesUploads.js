const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3')
const storage = multerS3({
    s3: new S3Client(),
    bucket: 'giroux-file-system',
    key: function (req, file, cb) {
        let ext = require('path').extname(file.originalname);
        let filename = Date.now().toString() + ext;
        cb(null, `license_plates/${filename}`)
    },
    acl: 'public-read'
})
module.exports = multer({ storage: storage });