const soap = require('soap');

function userMaint(url, username, password, action, params) {
    const wsSecurity = new soap.WSSecurity(username, password);
    soap.createClient(url,function(err, client) {
        client.setSecurity(wsSecurity);
        return client.describe();
    });
}

module.exports = {
    userMaint = userMaint
}