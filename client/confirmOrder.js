

Template.confirmOrder.username = function() {
    Session.get("currentuser");
    if(currentUser)
        return currentUser.name;
}

Template.confirmOrder.useremail = function() {
    Session.get("currentuser");
    if(currentUser)
        return currentUser.email;
}

Template.confirmOrder.purchaseorder_rows = function() {
    return PurchaseOrderRows.find({purchaseOrderId : Session.get("selected_purchaseorder")});
}

Template.confirmOrder.totAmount = function() {
    var pos = PurchaseOrderRows.find({purchaseOrderId : Session.get("selected_purchaseorder")});
    var res = 0;
    pos.forEach(function(item) {
        res = res + item.amount;
    })
    return res;
}

Template.confirmOrder.totPrice = function() {
    var pos = PurchaseOrderRows.find({purchaseOrderId : Session.get("selected_purchaseorder")});
    var res = 0;
    pos.forEach(function(item) {
        res = res + item.price * item.amount;
    })
    return res;
}

Handlebars.registerHelper('multiply', function(item1, item2) {
    return item1 * item2;
});

Template.confirmOrder.events = {
    'click .ok-button': function() {
        var po = PurchaseOrders.findOne({_id : Session.get('selected_purchaseorder')});
        $('#confirmOrderModal').modal('toggle');
        newAlert('success', 'Du har bekräftat order med ordernr: <strong>' + po.seqnumber +
        '</strong> uppge detta ordernummer vid förfrågningar om denna order.', 25000);

        Meteor.call("confirmOrder", Session.get("selected_purchaseorder"), function(err, res) {
            console.log("returned: " + res);
            Session.set("confirmed-order", res);
            Session.set("selected_purchaseorder", null);
        });
    },
    'click .error-button' : function() {
        $('#confirmOrderModal').modal('toggle');
    }
}