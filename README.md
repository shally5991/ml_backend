# giroux-backend

## Please follow below steps for local setup

1. Basic requirements for local setup
```
a. Node & npm
b. MongoDB Server
```

2. Install the dependencies
```
npm i
```

3. Run the service
```
npm start
```

## Steps for test using serverless offline

1. Install the serverless111
sls offline start --allowCache  --httpPort 4000


## Steps for deployment on AWS Serverless

1. Basic requirements for deployment, here is the reference blog for [serverless](https://bitbucket.org/blog/deploy-an-express-js-app-to-aws-lambda-using-the-serverless-framework)
```
a. Installed the serverless on your local --> npm install -g serverless
```

2. Configure serverless with you AWS Account, Replace your AWS accout keys with ACCESS_KEY & SECRET_KEY
```
serverless config credentials --provider aws --key ACCESS_KEY ?secret SECRET_KEY
```

3. Deploy the service using below command, If deployment done then it will return the endpoints.
```
serverless deploy
```#   m l _ b a c k e n d  
 