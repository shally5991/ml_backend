var axios = require('axios');

const tokenEndpoint = "http://dev-gxdiahl2.us.auth0.com/oauth/token";

const oAuth = (req, res, next) => {
    var code = req.query.code;

    if(!code) {
        res.status(401).send("Missing authorization code");
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", "rNqZsu6XoFrNfISuaH3wflubDsFzk8hI");
    params.append("client_secret", "K_pobQ2ZpV2c1WNTA2_ZHpCBozoo_9V4yqmtgIfq46p7rxU2ivJDFndOoMKxQOgj");
    params.append("code", "code");
    params.append("redirect_uri", "http://localhost/3000/authorized");

    axios.post(tokenEndpoint, params)
    .then( response => {
        req.oauth = response.data;
        next();
    })
    .catch(err => {
        console.log(err);
        res.status(403).json(`Reason: ${err.message}`);
    })
}

module.export = oAuth;