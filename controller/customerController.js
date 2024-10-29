// Array to store customer objects
let cus_object = [];
let selectedCustomerIndex = null; // To keep track of selected customer

$(document).ready(function () {
    // Elements caching
    const $customerForm = $('#customerForm');
    const $newCustomerBtn = $('#newCustomerBtn');
    const $customerTableBody = $('#customerTableBody');
    const $actionModal = $('#actionModal'); // Assuming you have a modal for actions
    const $addCustomerBtn = $('#addCustomerBtn');
    const $updateCustomerBtn = $('#updateCustomerBtn');

    // Show form on "New Customer" button click
    $newCustomerBtn.on('click', function () {
        $customerForm.show();
        $addCustomerBtn.show();
        $updateCustomerBtn.hide(); // Ensure update button is hidden
    });



    // Function to add a new customer to the array and update the table
    function addCustomer(firstName, lastName, mobile, email, address) {
        const customer = { firstName, lastName, mobile, email, address };
        cus_object.push(customer);
        console.log("Customer added:", customer);
        console.log("Current customer array:", cus_object);
        renderCustomerTable();
    }

    // Function to render table with customers from cus_object array
    function renderCustomerTable() {
        $customerTableBody.empty();
        cus_object.forEach((customer, index) => {
            $customerTableBody.append(`
                <tr data-index="${index}">
                    <td>${customer.firstName}</td>
                    <td>${customer.lastName}</td>
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
        $actionModal.modal('show'); // Show action modal
    });

// Handle "Update" button click in the modal
    $('#updateCustBtn').on('click', function () {
        const customer = cus_object[selectedCustomerIndex];
        // Populate the form with customer details
        $('#firstName').val(customer.firstName);
        $('#lastName').val(customer.lastName);
        $('#mobile').val(customer.mobile);
        $('#email').val(customer.email);
        $('#address').val(customer.address);

        // Show the form with "Update Customer" button and hide "Add Customer" button
        $customerForm.show(); // Make sure the form is visible
        $addCustomerBtn.hide(); // Hide the "Add Customer" button
        $updateCustomerBtn.show(); // Show the "Update Customer" button
        $actionModal.modal('hide'); // Close the modal
    });

// Handle "Update Customer" button click to save changes
    $updateCustomerBtn.on('click', function () {
        const updatedCustomer = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            mobile: $('#mobile').val(),
            email: $('#email').val(),
            address: $('#address').val()
        };

        // Update the customer object in the array
        cus_object[selectedCustomerIndex] = updatedCustomer;
        renderCustomerTable(); // Refresh the table with updated data

        Swal.fire({ icon: 'success', title: 'Customer Updated', text: `Customer information has been updated!` });
        $customerForm.hide().trigger('reset'); // Hide the form and reset inputs
        $addCustomerBtn.show(); // Show the "Add Customer" button
        $updateCustomerBtn.hide(); // Hide the "Update Customer" button
    });


    /// Handle "Delete" button click in the modal
    $('#deleteCustBtn').on('click', function () {
        let index = selectedCustomerIndex; // Use the selected index

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        // Fire a SweetAlert confirmation dialog
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // If confirmed, delete the customer
                cus_object.splice(index, 1); // Remove customer from the array

                renderCustomerTable(); // Update the customer table

                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Customer deleted.",
                    icon: "success"
                });

                // Reset selected index
                selectedCustomerIndex = null;

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // If canceled, show a cancellation message
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Customer is safe :)",
                    icon: "error"
                });
            }
        });
    });
});
