const soap = require('soap');

function userMaint(url, username, password, action, params) {
    const wsSecurity = new soap.WSSecurity(username, password);
    const rrClient = soap.createClient(url,function(err, client) {
        client.setSecurity(wsSecurity);
        
    })
}