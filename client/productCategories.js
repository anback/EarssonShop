Session.set("selected_productcategory", null);

Template.app.productcategories = function() {
    //return ProductCategories.find();
    var pcs = Session.get("productcategories");
    var res = [];
    for (var key in pcs) {
        if(key.indexOf("_") == -1)
            res.push(key);
    }
    return res;
}


Template.productcategory.selected_productcategory = function() {
    return Session.equals("selected_productcategory", this.toString());
}

Template.productcategory.events = {
    'click a' : function() {
        Session.set("selected_productcategory", this.toString());
    }
}

var hasToogledProductOnce = false;

Template.products.products_from_selected_pc = function() {
    var pcs = Session.get("productcategories");
    var spc = Session.get("selected_productcategory")
    if(pcs && spc)
    {
        Meteor.setTimeout(function() {
            if(!hasToogledProductOnce) {
                toogleProduct(pcs[spc][0])
                hasToogledProductOnce = true;
            }
        }, 400);
        return pcs[spc];
    }
    else
        return null;
}