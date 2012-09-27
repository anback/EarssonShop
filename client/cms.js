var cms_url = 'http://shop.earsson.se/cms/earsson/';

//Call with item="general.logo"
var getTextFromCMS = function(item) {
    var parts = item.split(".");
    return Session.get(parts[0])[parts[1]];
}

//Call with item="general"
var getDefaultImageUrlForCMSItem = function(item)
{
    var attachments = Session.get(item)._attachments;
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
        for(var key in res)
            Session.set(key, res[key]);
    });
}

getCache();