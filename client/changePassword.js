Template.changePassword.events = {
    'click #changePasswordbutton' : function () {

        if($('#changePasswordbutton').hasClass('disabled'))
            return;

        Session.get("currentuser");
        var user = currentUser;
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

function checkPassword() {
    if($('#changedPassword').val() != $('#confirmpassword').val() || $('#changedPassword').val() == '')
    {
        $('.changePasswordform .control-group-confirmpassword').addClass('error');
        $('#changePasswordbutton').addClass('disabled');
    }
    else
    {
        $('.changePasswordform .control-group-confirmpassword').removeClass('error');
        $('#changePasswordbutton').removeClass('disabled');
    }

}