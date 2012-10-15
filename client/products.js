Template.product.productName = function() {
    return getTextFromCMS(this + ".name");
}

Template.product.headline = function() {
    return getTextFromCMS(this + ".headline");
}

Template.product.headline2 = function() {
    return getTextFromCMS(this + ".headline2");
}

Template.product.description = function() {
    return getTextFromCMS(this + ".description");
}

Template.product.price = function() {
    return getTextFromCMS(this + ".price");
}

Template.product.imgurl = function() {
    return getDefaultImageUrlForCMSItem(this);
}

Template.product.events = {
    'click .product-name' : function() {
        toogleProduct(this);
    },
    'click .ok-button' : function() {

        var purchaseOrderRow = {
            name : $("#" + getUniqueNameForProduct(this)).html(),
            price : parseInt($("#" + getUniquePriceForProduct(this)).html().split(" ")[0]),
            amount : parseInt($("#" + getUniqueAmountForProduct(this)).val()),
            purchaseOrderId : Session.get("selected_purchaseorder")
        }

        if(Session.equals("currentuser", null))
        {
            newAlert("error", "Du är inte inloggad, var god logga in");
            return;
        }

        if(!purchaseOrderRow.amount>0) {
            newAlert("error", "Skriv in antal produkter");
            return
        }

        $("#" + getUniqueAmountForProduct(this)).val("");
        Session.get("currentuser")
        Meteor.call("createUpdatePurchaseOrder", currentUser._id, purchaseOrderRow, function(err, res) {
            if(res) //new id
                Session.set("selected_purchaseorder", res);
        });

    }
}

var toogleProduct = function(name) {
    $('#' + name).collapse('toggle')
    $('#' + getUniqueCollapseButtonForProduct(name) + ' .icon-plus-sign').toggleClass('hide');
    $('#' + getUniqueCollapseButtonForProduct(name) + ' .icon-minus-sign').toggleClass('hide');
}

var getUniqueAmountForProduct = function(text) {
    return text + '-amount';
}

var getUniqueNameForProduct = function(text) {
    return text + '-name';
}

var getUniquePriceForProduct = function(text) {
    return text + '-price';
}

var getUniqueCollapseButtonForProduct = function(text) {
    return text + '-collapsebutton';
}
Handlebars.registerHelper('getUniqueAmountForProduct', function(text) {
    return getUniqueAmountForProduct(text);
});

Handlebars.registerHelper('getUniqueNameForProduct', function(text) {
    return getUniqueNameForProduct(text);
});

Handlebars.registerHelper('getUniquePriceForProduct', function(text) {
    return getUniquePriceForProduct(text);
});

Handlebars.registerHelper('insertPreHash', function(item) {
    return '#' + item;
})

Handlebars.registerHelper('getUniqueCollapseButtonForProduct', function(text) {
    return getUniqueCollapseButtonForProduct(text);
});





