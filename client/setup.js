ProductCategories = new Meteor.Collection("productcategories");
PurchaseOrders = new Meteor.Collection("purchaseorders");
PurchaseOrderRows = new Meteor.Collection("purchaseorderrows");

Meteor.subscribe("productcategories");

Meteor.autosubscribe(function() {

    var currentuser = Session.get("currentuser");

    if(currentuser)
        Meteor.subscribe('purchaseorders', currentuser._id, function () {
            if (!Session.get("selected_purchaseorder")) {
                var po = PurchaseOrders.findOne({status : "Inserted"}, {sort : {createDate : -1}});
                if (po)
                    Session.set("selected_purchaseorder", po._id);
            }
        });
});


Meteor.autosubscribe(function() {
    Meteor.subscribe("purchaseorderrows", Session.get("selected_purchaseorder"));
});

