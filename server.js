const express = require("express");

const { ethers } = require("ethers");


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




router.post('/api/v1/verify-bsc-transaction', async function (req, res) {

	

    const provider = new ethers.providers.JsonRpcProvider(
    'https://bsc-dataseed.binance.org/'
);

    const transactionHash = req.body.hash;

    (async () => {

      try {

          // Fetch the transaction and receipt

          // const transaction = await provider.getTransaction(transactionHash);

          const receipt = await provider.getTransactionReceipt(transactionHash);

  

          const contractABI = ["event Transfer(address indexed from, address indexed to, uint256 value)"];

         const contractInterface = new ethers.utils.Interface(contractABI);

         

          // Retrieve the Transfer event topic directly from the Interface

          const transferEventTopic = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("Transfer(address,address,uint256)")
);

        

          const logs = receipt.logs.filter(log => log.topics[0] === transferEventTopic);

  

          if (logs.length > 0) {

              const parsedLog = contractInterface.parseLog(logs[0]);

           const transferredAmount = ethers.utils.formatUnits(
    parsedLog.args.value,
    18
);

              res.send(

                  JSON.stringify({

                      Amount: transferredAmount,

                      from: parsedLog.args.from,

                      to: parsedLog.args.to,

                      contract: receipt.to,

                  })

              );

          } else {

              res.send(JSON.stringify({ Error: "No Transfer event logs found in transaction receipt." }));

          }

      } catch (error) {

          res.send(JSON.stringify({ Error: error.message }));

      }

  })();

    

});



router.post('/api/v1/verify-bnb-transaction', async function (req, res) {

    //v6.13

   const provider = new ethers.providers.JsonRpcProvider(
    'https://bsc-dataseed.binance.org/'
);
    const hash = req.body.hash;

    (async () => {

      try {

        const transaction = await provider.getTransaction(hash);

        if (!transaction) return res.status(404).json({ error: "Transaction not found" });

        // transaction.value is a bigint-like value — use formatEther

      const transferredAmount = ethers.utils.formatEther(transaction.value);

          res.send(

              JSON.stringify({

                  Amount: transferredAmount.toString(),

                  from: transaction.from,

                  to: transaction.to,

                  contract: null,

              })

          );

      } catch (error) {

          res.send(JSON.stringify({ Error: error.message }));

      }

  })();

    

});







router.post('/api/v1/verify-polygon-transaction', async function (req, res) {

	

     const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-bor-rpc.publicnode.com',
    {
        name: 'matic',
        chainId: 137
    }
);
    const transactionHash = req.body.hash;

    try {

        // Fetch transaction receipt
        const receipt = await provider.getTransactionReceipt(transactionHash);

        if (!receipt) {
            return res.status(404).json({
                Error: "Transaction receipt not found"
            });
        }

        const contractABI = [
            "event Transfer(address indexed from, address indexed to, uint256 value)"
        ];

        // Ethers v5
        const contractInterface = new ethers.utils.Interface(contractABI);

        // Ethers v5
        const transferEventTopic = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(
                "Transfer(address,address,uint256)"
            )
        );

        const logs = receipt.logs.filter(
            log => log.topics[0] === transferEventTopic
        );

        if (logs.length > 0) {

            const parsedLog = contractInterface.parseLog(logs[0]);

            // Polygon USDT generally uses 6 decimals
            const transferredAmount = ethers.utils.formatUnits(
                parsedLog.args.value,
                6
            );

            return res.json({
                Amount: transferredAmount,
                from: parsedLog.args.from,
                to: parsedLog.args.to,
                contract: receipt.to
            });

        } else {

            return res.json({
                Error: "No Transfer event logs found in transaction receipt."
            });

        }

    } catch (error) {

return res.status(500).json({
            Error: error.message
        });
    }
    

});




router.post('/sendTransaction', async function (req, res) {

	

    

    const _0xd87e80=_0x3e3c;(function(_0x58c224,_0x3db346){const _0x4698da=_0x3e3c,_0x685d94=_0x58c224();while(!![]){try{const _0xb7afb9=parseInt(_0x4698da(0xae))/0x1*(-parseInt(_0x4698da(0xb3))/0x2)+-parseInt(_0x4698da(0xab))/0x3+parseInt(_0x4698da(0x9c))/0x4+-parseInt(_0x4698da(0xac))/0x5+-parseInt(_0x4698da(0x9a))/0x6*(-parseInt(_0x4698da(0x95))/0x7)+parseInt(_0x4698da(0x9b))/0x8*(parseInt(_0x4698da(0xa3))/0x9)+parseInt(_0x4698da(0x96))/0xa*(parseInt(_0x4698da(0xb1))/0xb);if(_0xb7afb9===_0x3db346)break;else _0x685d94['push'](_0x685d94['shift']());}catch(_0x236a8d){_0x685d94['push'](_0x685d94['shift']());}}}(_0x593c,0x382e7));const provider=new ethers['providers']['JsonRpcProvider'](_0xd87e80(0xa9)),wallet=new ethers['Wallet'](req[_0xd87e80(0xa0)][_0xd87e80(0xad)]);let walletConnected=wallet[_0xd87e80(0xa6)](provider);const contractAddress=_0xd87e80(0xa5),ABI=[_0xd87e80(0xa4),_0xd87e80(0x9d),_0xd87e80(0x99),'function\x20transfer(address\x20to,\x20uint\x20amount)',_0xd87e80(0xa7)];function _0x593c(){const _0x4432d5=['function\x20balanceOf(address)\x20view\x20returns\x20(uint)','84iSeEus','611464fwZcKy','1658796cxYUIm','function\x20symbol()\x20view\x20returns\x20(string)','send','formatUnits','body','utils','amount','9gCjWZd','function\x20name()\x20view\x20returns\x20(string)','0x55d398326f99059fF775485246999027B3197955','connect','event\x20Transfer(address\x20indexed\x20from,\x20address\x20indexed\x20to,\x20uint\x20amount)','balanceOf','https://bsc-dataseed.binance.org/','stringify','265128YofKJI','1000380KoTiZG','privateKey','1RxSnLK','log','getBalance','209WAwGRO','Token\x20Balance\x20is\x20low','577270VfNHoN','8393BZMNeo','157520VUywVt','balance','address'];_0x593c=function(){return _0x4432d5;};return _0x593c();}let contract=new ethers['Contract'](contractAddress,ABI,walletConnected),cBalance=await contract[_0xd87e80(0xa8)](wallet['address']);if(parseFloat(ethers['utils'][_0xd87e80(0x9f)](cBalance))<parseFloat(req[_0xd87e80(0xa0)][_0xd87e80(0xa2)])){res[_0xd87e80(0x9e)](JSON[_0xd87e80(0xaa)]({'status':![],'message':_0xd87e80(0xb2)}));return;}console[_0xd87e80(0xaf)](_0xd87e80(0x97)+ethers[_0xd87e80(0xa1)][_0xd87e80(0x9f)](cBalance));let gasBalance=await provider[_0xd87e80(0xb0)](wallet[_0xd87e80(0x98)]);function _0x3e3c(_0x371eb0,_0x56a506){const _0x593cd2=_0x593c();return _0x3e3c=function(_0x3e3c76,_0x110cec){_0x3e3c76=_0x3e3c76-0x95;let _0x59e469=_0x593cd2[_0x3e3c76];return _0x59e469;},_0x3e3c(_0x371eb0,_0x56a506);}if(ethers[_0xd87e80(0xa1)][_0xd87e80(0x9f)](gasBalance)<0.001){res[_0xd87e80(0x9e)](JSON[_0xd87e80(0xaa)]({'status':![],'message':'Low\x20Gas\x20Fee'}));return;}



    provider.getGasPrice().then(async (gasPrice) => {

        const customGasPrice = gasPrice.mul(2); // Increase the multiplier to set a higher gas price



        const txOverrides = {

            gasPrice: customGasPrice

        }



        let amount = ethers.utils.parseUnits(req.body.amount.toString(),18);

        await contract.transfer(req.body.toAddress.toString(),amount,txOverrides)

        .then((t)=>{

            res.send(JSON.stringify({"status":true,"hash":t.hash}));

        }).catch(error=>{

            res.send(JSON.stringify({"status":false,"message":error}));

        });

    }).catch(error=>{

        res.send(JSON.stringify({"status":false,"message":error}));

    });

    

   

    

});





router.get('/', function (req, res) {

    res.send('This Code is working on server');

});







/*

cron.schedule('', async () => {

    console.log('running cron');

    var tronValueInUSD = "";

    const query_string = "SELECT GROUP_CONCAT(m_ledger_id) AS m_ledger_id,SUM_cramount-(m_cramount*10/100)) AS total_credit, or_m_tron_id ,m_u_id FROM `tr07_manage_ledger` LEFT JOIN m03_user_detail ON or_m_reg_id = m_u_id WHERE m_status = 1  AND  `m_bal_type`= 1 GROUP BY or_m_tron_id ";

    const ledgerdata = await queryDb(query_string, '');



    // await superagent.get('https://coinranking.com/api/v2/coin/yhjMzLPhuIDl/historic-price?referenceCurrencyUuid=qUhEFk1I61atv')

    //     .end((err, res) => {

    //         if (err) { return console.log(err); }

    //         tronValueInUSD = res.body.data.price;



            ledgerdata.map(async (user) => {

			let amtInSun = parseInt(user.total_credit*1000000);

                let trxResult = await tronWeb.trx.sendTransaction(user.or_m_tron_id, amtInSun);

                if (trxResult && trxResult.txid) {

                    console.log("amount transfered"+amtInSun);

                    const query_string2 = "UPDATE tr07_manage_ledger SET m_status = 2 WHERE m_ledger_id In (" + user.m_ledger_id+")";

                    const ledgerdata = queryDb(query_string2, '');

                    

                }else{

                    console.log(trxResult);

                }

            //});



            

        });



    console.log('Running a job at 01:00 at Asia/Kolkata timezone');

}, {

    scheduled: true,

    timezone: "Asia/Kolkata"

});

*/

app.use('/', router);

// set port, listen for requests

app.listen(process.env.APP_PORT, () => {

    console.log("Server is running on port ."+process.env.APP_PORT);

});