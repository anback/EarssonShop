Template.changePassword.events = {
    'click #changePasswordbutton' : function () {
        var user = Session.get("currentuser");
        user.password = $('#changedPassword').val();
        user.hasChangedPassword = true;

        Users.update({_id: user._id}, user, function(err, res) {
            if(err) {
                $('.changePasswordform .control-group-password').toggleClass('error');
            }
            else {
                $('#changePasswordModal').modal('toggle');
                $('.changePasswordform .control-group-username').removeClass('error');
                $('.changePasswordform .control-group-password').removeClass('error');
                newAlert('success', "Du har ändrat ditt löenord");
            }
        });
    }
}