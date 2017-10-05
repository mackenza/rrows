require('dotenv').config();

const RRServerURL = process.env.RRSERVERURL;
const RRUsername = process.env.RRUSERNAME;
const RRPassword = process.env.RRPASSWORD;

const soap = require('soap');

function userMaint(url, username, password, action, params) {
    const wsSecurity = new soap.WSSecurity(username, password);
    const sid = {
        Name: "AM User Maint",
        Scope: "Public"
    }
    const esi = {
        Script: sid,
        Arguments: null
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
userMaint(RRServerURL, RRUsername, RRPassword, 'add', '');