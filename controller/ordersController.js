import OrderModel from "../model/orderModel.js";
import { customer_array, item_array, order_array } from "../db/database.js";

$(document).ready(function() {
    console.log("Document is ready, jQuery loaded");

    // Attach event to populate dropdowns when clicked
    $("#cmbCustomerId").focus(function() {
        loadCustomerIds();
    });

    $("#cmbItemCode").focus(function() {
        loadItemCodes();
    });
});

// Function to populate Customer IDs
function loadCustomerIds() {
    const $cmbCustomerId = $("#cmbCustomerId");

    // Check if already populated to avoid duplicates
    if ($cmbCustomerId.children().length > 1) return;

    // Add options
    $.each(customer_array, function(index, customer) {
        $cmbCustomerId.append(`<option value="${customer.customerId}">${customer.customerId}</option>`);
    });
}

// Function to populate Item Codes
function loadItemCodes() {
    const $cmbItemCode = $("#cmbItemCode");

    // Check if already populated to avoid duplicates
    if ($cmbItemCode.children().length > 1) return;

    // Add options
    $.each(item_array, function(index, item) {
        $cmbItemCode.append(`<option value="${item.itemCode}">${item.itemCode}</option>`);
    });
}
