import CustomerModel from "../model/customerModel.js";
import { customer_array } from "../db/database.js";

let selectedCustomerIndex = null;

$(document).ready(function () {
    const $customerForm = $('#customerForm');
    const $newCustomerBtn = $('#newCustomerBtn');
    const $customerTableBody = $('#customerTableBody');
    const $actionModal = $('#actionModal');
    const $addCustomerBtn = $('#addCustomerBtn');
    const $updateCustomerBtn = $('#updateCustomerBtn');

    // Show form on "New Customer" button click
    $newCustomerBtn.on('click', function () {
        $customerForm.show();
        $addCustomerBtn.show();
        $updateCustomerBtn.hide();
    });

    // Function to add a new customer to the array and update the table
    function addCustomer(firstName, lastName, mobile, email, address) {
        const id = Date.now();  // Generate a unique ID based on timestamp
        const customer = new CustomerModel(id, firstName, lastName, mobile, email, address);
        customer_array.push(customer);  // Add customer instance to the array
        console.log("Customer added:", customer);
        console.log("Current customer array:", customer_array);
        renderCustomerTable();
    }

    // Function to render table with customers from customer_array
    function renderCustomerTable() {
        $customerTableBody.empty();
        customer_array.forEach((customer, index) => {
            $customerTableBody.append(`
                <tr data-index="${index}">
                    <td>${customer.first_name}</td>
                    <td>${customer.last_name}</td>
                    <td>${customer.mobile}</td>
                    <td>${customer.email}</td>
                    <td>${customer.address}</td>
                </tr>
            `);
        });
    }

    // Handle "Add Customer" button click
    $addCustomerBtn.on('click', function () {
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const mobile = $('#mobile').val();
        const email = $('#email').val();
        const address = $('#address').val();
        addCustomer(firstName, lastName, mobile, email, address);
        Swal.fire({ icon: 'success', title: 'Customer Added', text: `${firstName} ${lastName} has been added!` });
        $customerForm.hide().trigger('reset');
    });

    // Open modal on row click with "Update" and "Delete" options
    $customerTableBody.on('click', 'tr', function () {
        selectedCustomerIndex = $(this).data('index');
        $actionModal.modal('show');
    });

    // Handle "Update" button click in the modal
    $('#updateCustBtn').on('click', function () {
        const customer = customer_array[selectedCustomerIndex];
        $('#firstName').val(customer.first_name);
        $('#lastName').val(customer.last_name);
        $('#mobile').val(customer.mobile);
        $('#email').val(customer.email);
        $('#address').val(customer.address);
        $customerForm.show();
        $addCustomerBtn.hide();
        $updateCustomerBtn.show();
        $actionModal.modal('hide');
    });

    // Handle "Update Customer" button click to save changes
    $updateCustomerBtn.on('click', function () {
        const updatedCustomer = new CustomerModel(
            customer_array[selectedCustomerIndex].id,
            $('#firstName').val(),
            $('#lastName').val(),
            $('#mobile').val(),
            $('#email').val(),
            $('#address').val()
        );

        // Update the customer in the array
        customer_array[selectedCustomerIndex] = updatedCustomer;
        renderCustomerTable();
        Swal.fire({ icon: 'success', title: 'Customer Updated', text: `Customer information has been updated!` });
        $customerForm.hide().trigger('reset');
        $addCustomerBtn.show();
        $updateCustomerBtn.hide();
    });

    // Handle "Delete" button click in the modal
    $('#deleteCustBtn').on('click', function () {
        const index = selectedCustomerIndex;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!"
        }).then((result) => {
            if (result.isConfirmed) {
                customer_array.splice(index, 1);
                renderCustomerTable();
                Swal.fire({ title: "Deleted!", text: "Customer deleted.", icon: "success" });
                selectedCustomerIndex = null;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({ title: "Cancelled", text: "Customer is safe :)", icon: "error" });
            }
        });
    });
});
