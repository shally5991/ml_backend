var AWS = require('aws-sdk'),
    region = process.env.AWS_SOUTH_REGION,
    secretName = process.env.SECRET_ARN,
    secret,
    decodedBinarySecret;

const logger = require("./logger")

module.exports = {
    getSecrets: new Promise((resolve, reject) => {
        try {
            // Create a Secrets Manager client
            logger.info(`Get the secrets`);
            let client = new AWS.SecretsManager({
                region: region
            });
            client.getSecretValue({ SecretId: secretName }, function (err, data) {
                if (err) {
                    throw err;
                } else {
                    // Decrypts secret using the associated KMS key.
                    // Depending on whether the secret is a string or binary, one of these fields will be populated.
                    if ('SecretString' in data) {
                        secret = JSON.parse(data.SecretString);
                        logger.info(`Got the secrets`);
                        resolve(secret);
                    } else {
                        let buff = new Buffer(data.SecretBinary, 'base64');
                        decodedBinarySecret = JSON.parse(buff.toString('ascii'));
                        logger.info(`Got the binary secrets`)
                        resolve(decodedBinarySecret);
                    }
                }
            });
        } catch (error) {
            logger.error(`Error while getting the secrets : ${JSON.stringify(error)}`)
            reject(error);
        }
    })
}