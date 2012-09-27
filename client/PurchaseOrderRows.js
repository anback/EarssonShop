Template.purchaseorder_row.events = {
    'click .remove' : function() {
        PurchaseOrderRows.remove({_id : this._id})
    }
}