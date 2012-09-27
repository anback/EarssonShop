var cache = {};
var require = __meteor_bootstrap__.require;
var http = require('http')
    , fs = require('fs')
    , path = require('path')
    , options
    , request = require('request');


Meteor.methods({
    'getCache' : function() {
        return cache;
    },
    'resetCache' : function() {
        cache = {};
        cacheCMS();
    }
});

var cacheCMS = function() {

    request(cms_url + '_all_docs', function(err, res, body) {

        var allDocs = JSON.parse(body);
        console.log("loading " + allDocs.rows.length + " docs into cache");
        allDocs.rows.forEach(function(item) {
            request(cms_url + item.id, function(err, response, body) {
                if(err)
                    console.log(err);

                var res = JSON.parse(body);
                if(!cache[res._id]) {
                    cache[res._id] =  res;
                }
            });
        });
    });
}

