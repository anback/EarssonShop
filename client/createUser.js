Users = new Meteor.Collection("users");

Template.user.isSuperUser = function() {
    Session.get("currentuser");
    return currentUser.superuser;
}

Template.createUser.events = {
    'click #createUserButton' : function () {

        var user = {};
        user.password = $('#cu-password').val();
        user.name = $('#cu-name').val();
        user.email = $('#cu-email').val();
        user.vouchercode = $('#cu-vouchercode').val();

        Meteor.call('createUser', user, function(err, res) {

            if(!err)
                newAlert("success", "Användare med användarnamn: <strong>" + user.email + "</strong> skapad");
            else if(err.reason=="Felaktig Email")
            {

                return;
            }
            else
                newAlert("error","Det inträffade ett ohanterat fel. Kontakta <strong>support@earsson.se</strong>", 15000);

            $('#createUserModal').modal('toggle');
        });
    }
}


