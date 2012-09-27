Template.selected_purchaseorder.selected_purchaseorder = function() {
    return PurchaseOrders.findOne({_id : Session.get("selected_purchaseorder")});
}

Template.selected_purchaseorder.purchaseorder_rows = function() {
    return PurchaseOrderRows.find({purchaseOrderId : Session.get("selected_purchaseorder")});
}

Template.selected_purchaseorder.selected_purchaseorder_exists = function() {
    var spo = PurchaseOrders.findOne({_id : Session.get("selected_purchaseorder")});
    if(spo)
        return true;
    return false;
}

Template.selected_purchaseorder.events = {
    'click .order' : function() {
        var pos = PurchaseOrderRows.find({purchaseOrderId : Session.get("selected_purchaseorder")});
        if(pos.count() == 0)
        {
            newAlert("error", "Du måste beställa minst en produkt");
            return;
        }
        $('#confirmOrderModal').modal('toggle');
    }
}

Template.selected_purchaseorder.totAmount = function() {
    var pos = PurchaseOrderRows.find({purchaseOrderId : Session.get("selected_purchaseorder")});
    var res = 0;
    pos.forEach(function(item) {
        res = res + item.amount;
    })
    return res;
}

Template.selected_purchaseorder.totPrice = function() {
    var pos = PurchaseOrderRows.find({purchaseOrderId : Session.get("selected_purchaseorder")});
    var res = 0;
    pos.forEach(function(item) {
        res = res + item.price * item.amount;
    })
    return res;
}

Handlebars.registerHelper('getFormattedDate', function(date) {
    return date.split('T')[0] + " " + date.split('T')[1].split(".")[0];
})