import ItemModel from "../model/itemModel.js";
import { item_array } from "../db/database.js";

let selectedItemIndex = null;

$(document).ready(function () {
    const $itemForm = $('#itemForm');
    const $newItemBtn = $('#newItemBtn');
    const $itemTableBody = $('#itemTableBody');
    const $actionModalItem = $('#actionModalItem');
    const $addItemBtn = $('#addItemBtn');
    const $updateItemBtn = $('#updateItemBtn');

    // Show form on "New Item" button click
    $newItemBtn.on('click', function () {
        $itemForm.show();
        $addItemBtn.show();
        $updateItemBtn.hide();
    });

    // Function to add a new item to the array and update the table
    function addItem(itemName, itemCode, quantity, price) {
        const id = Date.now();  // Generate a unique ID based on timestamp
        const item = new ItemModel(id, itemName, itemCode, quantity, price);
        item_array.push(item);  // Add item instance to the array
        console.log("Item added:", item);
        console.log("Current item array:", item_array);
        renderItemTable();
    }

    // Function to render table with items from item_array
    function renderItemTable() {
        $itemTableBody.empty();
        item_array.forEach((item, index) => {
            $itemTableBody.append(`
                <tr data-index="${index}">
                    <td>${item.itemName}</td>
                    <td>${item.itemCode}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                </tr>
            `);
        });
    }

    // Handle "Add Item" button click
    $addItemBtn.on('click', function () {
        const itemName = $('#itemName').val();
        const itemCode = $('#itemCode').val();
        const quantity = $('#itemQuantity').val();
        const price = $('#itemPrice').val();
        addItem(itemName, itemCode, quantity, price);
        Swal.fire({ icon: 'success', title: 'Item Added', text: `${itemName} has been added!` });
        $itemForm.hide().trigger('reset');
    });

    // Open modal on row click with "Update" and "Delete" options
    $itemTableBody.on('click', 'tr', function () {
        selectedItemIndex = $(this).data('index');
        $actionModalItem.modal('show');
    });

    // Handle "Update" button click in the modal
    $('#updateItemsBtn').on('click', function () {
        const item = item_array[selectedItemIndex];
        $('#itemName').val(item.itemName);
        $('#itemCode').val(item.itemCode);
        $('#itemQuantity').val(item.quantity);
        $('#itemPrice').val(item.price);
        $itemForm.show();
        $addItemBtn.hide();
        $updateItemBtn.show();
        $actionModalItem.modal('hide');
    });

    // Handle "Update Item" button click to save changes
    $updateItemBtn.on('click', function () {
        const updatedItem = new ItemModel(
            item_array[selectedItemIndex].id,
            $('#itemName').val(),
            $('#itemCode').val(),
            $('#itemQuantity').val(),
            $('#itemPrice').val()
        );

        // Update the item in the array
        item_array[selectedItemIndex] = updatedItem;
        renderItemTable();
        Swal.fire({ icon: 'success', title: 'Item Updated', text: `Item information has been updated!` });
        $itemForm.hide().trigger('reset');
        $addItemBtn.show();
        $updateItemBtn.hide();
    });

    // Handle "Delete" button click in the modal
    $('#deleteItemsBtn').on('click', function () {
        const index = selectedItemIndex;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!"
        }).then((result) => {
            if (result.isConfirmed) {
                item_array.splice(index, 1);
                renderItemTable();
                Swal.fire({ title: "Deleted!", text: "Item deleted.", icon: "success" });
                selectedItemIndex = null;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({ title: "Cancelled", text: "Item is safe :)", icon: "error" });
            }
        });
    });
});
