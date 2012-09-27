function newAlert (type, message, timeout) {

    if(!timeout)
        timeout = 5000;

    $("#alert-area").append($("<div id='alertcontainer'><div class='alert-message alert alert-"
        + type + " fade in'>" + message + "</div></div>"));
    $("#alertcontainer").delay(timeout).fadeOut("slow", function () { $(this).remove(); });
}