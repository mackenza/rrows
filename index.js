require('dotenv').config();
const fs = require('fs');

const RRServerURL = process.env.RRSERVERURL;
const RRUsername = process.env.RRUSERNAME;
const RRPassword = process.env.RRPASSWORD;

const commandInputRaw = fs.readFileSync(process.argv[2]);
const commandInput = JSON.parse(commandInputRaw);

const soap = require('soap');

function userMaint(url, username, password, rrUserId, action, params) {
    const wsSecurity = new soap.WSSecurity(username, password);
    const arguments = [
        {
            Key: "userId", 
            Value: rrUserId
        },
        {
            Key: "action", 
            Value: action
        },
        {
            Key: "params", 
            Value: params
        }
    ];
    const sid = {
        Name: "AM User Maint WS",
        Scope: "Public"
    }
    const esi = {
        Script: sid,
        Arguments: {
            KeyValueOfstringstring: arguments
        }
    }
    const args = {
        esi: esi
    }
    soap.createClient(url,function(err, client) {
        client.setSecurity(wsSecurity);
        client.ExecuteScript(args, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    });
}
console.log(commandInput.action);
userMaint(RRServerURL, RRUsername, RRPassword, commandInput.userId, commandInput.action, JSON.stringify(commandInput.params));