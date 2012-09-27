var cms_host = 'ec2-54-247-34-119.eu-west-1.compute.amazonaws.com';
var cms_url = 'http://' + cms_host + ':5984/earsson/';

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};