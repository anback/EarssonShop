Session.set("currentuser", null);
var currentUser = {};

/* Open Login Modal @ startup
(function() {
    var a = document.getElementById('loginModal');
    if (a) {
        $('#loginModal').modal('toggle');
    }
    else {
        setTimeout(arguments.callee, 100); // call myself again in 50 msecs
    }
}());

*/

Template.user.events = {
    'click #login-button' : function() {
        $('#loginModal').modal('toggle');
    },
    'click #logout-button' : function () {
        Session.set("currentuser", null);
        Session.set("selected_purchaseorder", null);
    },
    'click #create-user-button': function() {
        $('#createUserModal').modal('toggle');
    }
}

Template.user.isloggedin = function () {
        return !Session.equals("currentuser", null);
}

Template.product.isloggedin = function () {
    return !Session.equals("currentuser", null);
}

Template.user.user = function() {
    Session.get("currentuser");
    return currentUser;
}

Template.login.events = {
    'click #loginbutton' : function () {
        console.log('I was clicked');
        var username = $('#username').val();
        var password = $('#password').val();
        Meteor.call("login", username, password, function(err, res) {
            if(res=="Felaktigt användarnamn") {
                $('.loginform .control-group-username').toggleClass('error');
                $('.loginform .control-group-password').toggleClass('error');

            }
            else if (res=="Felaktigt lösenord") {
                $('.loginform .control-group-password').toggleClass('error');

            }
            else {
                Session.set("currentuser", new Date().getTime());
                currentUser = res;
                $('#loginModal').modal('toggle');
                $('.loginform .control-group-username').removeClass('error');
                $('.loginform .control-group-password').removeClass('error');
                if(!res.hasChangedPassword)
                    $('#changePasswordModal').modal('toggle');
            }
        });
    }
}

/*
Meteor.call('login', "he", "kaanan", function(err, res) {
    Session.set("currentuser", res);
});
*/
