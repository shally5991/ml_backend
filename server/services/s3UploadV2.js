const S3 = require("aws-sdk/clients/s3");

module.exports = {
    s3UploadV2: async (file, personName = Date.now().toString()) => {
        const s3 = new S3();
        let ext = require('path').extname(file.originalname);
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `face_recognition/${personName + ext}`,
            Body: file.buffer,
            ACL: "public-read"
        };
        return await s3.upload(params).promise();
    }
}