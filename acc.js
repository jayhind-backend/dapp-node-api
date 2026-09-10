
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
var cron = require('node-cron');
var multer = require('multer');
var forms = multer();
require('dotenv').config({ path: __dirname + '/.env' })
const app = express();
const superagent = require('superagent');
const router = express.Router();

const { queryDb } = require("./helper/adminHelper");

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type: application/json
app.use(bodyParser.json());

router.post('/sendTransaction', function (req, res) {
    tronWeb.trx.sendTransaction(req.body.tronAddress, req.body.amountInSun).then(transactions => {
        res.send(transactions);
    }, err => {
        console.log("ERRRR", err)
    }).catch(err => console.error(err));
});

router.get('/', function (req, res) {
    res.send('Working');
});

const TronGrid = require('trongrid');
const TronWeb = require('tronweb');




cron.schedule('*/10 * * * *', async () => {
   const TronWeb = require('tronweb');
var crypto = require('crypto');

var privateKey = crypto.randomBytes(32).toString('hex');
console.log("Private Key", privateKey);

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

const wallet = await tronWeb.createAccount();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

app.use('/', router);
// set port, listen for requests
app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on port 3000.");
});







console.log(wallet);