var express = require('express');
var axios = require('axios');
var port = process.env.PORT || 3001;
var app = express();
var oAuth = require('/middleware/oAuth');

app.use(oAuth);

app.get("/authorized", async ( req, res) => {
    try {
        const response = await axios({ method: 'get', url: "http://localhost:8080/authorized"});
        res.json(response.data);
    } catch (error) {
        console.log(error);
        if(error.response.status === 401) {
            res.status(401).json("unauthorized");
        } else if(error.response.status === 401) {
            res.status(403).json("permission denied");
        } else {
            res.status(500).json("something went wrong");
        }
    }
});

app.listen(port, () => console.log("Started"));