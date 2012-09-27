var createUserMailCmsUrl = 'http://' + cms_host + ':5984/earsson/createUserMail';
var confirmOrderMailCmsUrl = 'http://' + cms_host + ':5984/earsson/confirmOrderMail';
var cmsLogoUrl = 'http://' + cms_host + ':5984/earsson/general/logo.png';
var require = __meteor_bootstrap__.require;
var fs = require('fs');
var path = require('path');
var base = path.resolve('.');
if (base == '/'){
    base = path.dirname(global.require.main.filename);
}
var staticPath = base + '/static';

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

var createWelcomeUserMail = function(user) {

    console.log(createUserMailCmsUrl);
    console.log(Meteor.http.get(createUserMailCmsUrl));
    var cmsres = JSON.parse(Meteor.http.get(createUserMailCmsUrl).content);
    console.log(cmsres);

    // Head
    var response = "<html><head><style type='text/css'>" +
        fs.readFileSync(staticPath + '/bootstrap.min', 'ascii') + fs.readFileSync(staticPath + '/style', 'ascii') +
        "</style></head>";

    // User information in email
    var message=    "<p>Namn: <strong>" + user.name + "</strong></p>" +
        "<p>Email/Användarnamn: <strong>" + user.email + "</strong></p>" +
        "<p>Password: <strong>" + user.password + "</strong></p>";

    //Body
    response = response + "<body>" +
        cmsres.body.format(user.name, message) +
        "<img src=" + "'" + cmsLogoUrl + "'" + "/>" +
        "</body>";

    return {subject:cmsres.subject, body:response};
}

var createOrderConfirmationMail = function(po, user) {

    console.log(confirmOrderMailCmsUrl);
    console.log(Meteor.http.get(confirmOrderMailCmsUrl));
    var pors = PurchaseOrderRows.find({purchaseOrderId : po._id}, {purchaseOrderId:0, _id:0});

    var table = [];
    var totPrice = 0;
    var totAmount = 0;
    pors.forEach(function(item) {
        table.push({
            Produktnamn : item.name,
            Antal : item.amount,
            "á Pris (kr)" : item.price,
            "Summa (kr)" : item.price * item.amount})
        totAmount += item.amount;
        totPrice += item.price * item.amount
    });
    table.push({
        Produktnamn : "Summa",
        Antal : totAmount,
        "á Pris (kr)" : "",
        "Summa (kr)" : totPrice});

    var cmsres = JSON.parse(Meteor.http.get(confirmOrderMailCmsUrl).content);

    // Head
    var response = "<html><head><style type='text/css'>" +
        fs.readFileSync(staticPath + '/bootstrap.min', 'ascii') + fs.readFileSync(staticPath + '/style', 'ascii') +
        "</style></head>";

    //Body
    response = response + "<body>" +
        cmsres.preTableBody.format(user.name, totPrice) +
        ConvertJsonToTable(table, null, 'table table-striped table-bordered table-condensed purchaseordertable') +
        cmsres.postTableBody +
        "<img src=" + "'" + cmsLogoUrl + "'" + "/>" +
        "</body>";

    return {subject:cmsres.subject.format(po.seqnumber), body:response};
}