var cms_url = 'http://shop.earsson.se/cms/earsson/';
var cms_data = {};

//Call with item="general.logo"
var getTextFromCMS = function(item) {
    var parts = item.split(".");
    var res = cms_data[parts[0]][parts[1]]
    return (res) ? res : ""; // null check
}

//Call with item="general"
var getDefaultImageUrlForCMSItem = function(item)
{
    var attachments = cms_data[item]._attachments;
    for(var key in attachments)
        return cms_url + item + '/' + key;
}

//Call with item="general.logo"
var getImgUrlFromCMS = function(item) {
    var parts = item.split(".");
    var res =  cms_url + parts[0] + "/" + parts[1] + "." + parts[2];
    return res;
}


var getCache = function() {
    Meteor.call('getCache', function(err, res) {
        cms_data = res;
        for(var key in res)
        {
            Session.set(key, new Date().getTime());
        }

    });
}

getCache();