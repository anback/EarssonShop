Meteor.startup(function () {
    bootstrapDB();
    cacheCMS();
});

Meteor.methods({
    login: function (email, password) {
        var user = Users.findOne({email:email, password:password})
        if  (user)
        {
            Session.insert({status: "Success", message:"Sucess", loginDate: new Date(), email: email},
                function() {
                    console.log("Inserted successful login session for user: " + email)
                });
            return user;
        }

        else if (Users.find({email:email}).count() === 1)
        {
            Session.insert({status: "Failed", message:"Wrong password: " + password, loginDate: new Date(), email: email},
                function() {
                    console.log("Inserted unsuccessful (wrong pass) login session for user: " + email)
                });
            return "Felaktigt lösenord";
        }

        else
        {
            Session.insert({status: "Failed", message:"Wrong email: " + email, loginDate: new Date(), email: email},
                function() {
                    console.log("Inserted unsuccessful (wrong username) login session for user: " + email)
                });
            return "Felaktigt användarnamn";
        }

    },
    createUpdatePurchaseOrder : function(userId, purchaseOrderRow) {
        var purchaseOrder = PurchaseOrders.findOne({_id : purchaseOrderRow.purchaseOrderId});
        var por = PurchaseOrderRows.findOne({purchaseOrderId: purchaseOrderRow.purchaseOrderId, name : purchaseOrderRow.name});
        var _id;
        if(purchaseOrder)
            if(por)
                PurchaseOrderRows.update({_id : por._id}, purchaseOrderRow);
            else
                PurchaseOrderRows.insert(purchaseOrderRow);
        else
        {
            _id = PurchaseOrders.insert({userId : userId, createDate : new Date(), status : "Inserted", seqnumber : Math.floor(Math.random()*100000001)});
            purchaseOrderRow.purchaseOrderId = _id;
            PurchaseOrderRows.insert(purchaseOrderRow);
        }
        return _id;
    },
    confirmOrder : function(id) {
        var po = PurchaseOrders.findOne({_id : id});
        var user = Users.findOne({_id : po.userId});
        console.log(po);
        console.log(user);

        var mail = createOrderConfirmationMail(po, user);
        console.log(user);
        //Email.send({from:'info@earsson.se', to:user.email, subject: mail.subject, html: mail.body});

        console.log("Setting status 'confirmed' on po with id: " + id);
        po.status = "Confirmed";
        PurchaseOrders.update({_id : id}, po);
        return po._id;
    },
    'createUser' : function(user) {
        console.log("createUser");
        var existing_user = Users.findOne({email:user.email});

        if(existing_user)
            throw new Meteor.Error(500, "Felaktig Email", null);

        user.password = generatePassword();
        var id = Users.insert({name: user.name, password:user.password, email:user.email, superuser : false, vouchercode: user.vouchercode});

        var mail = createWelcomeUserMail(user);

        Email.send({from:'info@earsson.se', to:user.email, subject: mail.subject, html: mail.body});

        return;
    }
});

Users = new Meteor.Collection("users");
ProductCategories = new Meteor.Collection("productcategories");
PurchaseOrders = new Meteor.Collection("purchaseorders");
PurchaseOrderRows = new Meteor.Collection("purchaseorderrows");
Session = new Meteor.Collection("session");

Meteor.publish('productcategories', function() {
    return ProductCategories.find();
});

Meteor.publish('purchaseorders', function(userid) {
    return PurchaseOrders.find({userId: userid});
});

Meteor.publish('purchaseorderrows', function(purchaseOrderId) {
    return PurchaseOrderRows.find({purchaseOrderId: purchaseOrderId});
});


var generatePassword = function() {
    var length = 8,
        charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
