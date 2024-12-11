let currentEditRow = null;

// Load inventory items from local storage when the page loads
window.onload = function() {
    loadInventory();
};

function loadInventory() {
    const inventoryTableBody = document.querySelector('#inventoryTable tbody');
    inventoryTableBody.innerHTML = ''; // Clear the table body

    // Get items from local storage
    const items = JSON.parse(localStorage.getItem('inventoryItems')) || [];

    items.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>
                <button class="edit-button" onclick="editItem(this)">Edit</button>
                <button class="delete-button" onclick="deleteItem(this)">Delete</button>
            </td>
        `;
        inventoryTableBody.appendChild(newRow);
    });
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemDescription = document.getElementById('itemDescription').value;

    const items = JSON.parse(localStorage.getItem('inventoryItems')) || [];

    if (currentEditRow) {
        // Update existing item
        const index = Array.from(currentEditRow.parentNode.children).indexOf(currentEditRow);
        items[index] = { name: itemName, quantity: itemQuantity, description: itemDescription };
        currentEditRow.cells[0].innerText = itemName;
        currentEditRow.cells[1].innerText = itemQuantity;
        currentEditRow.cells[2].innerText = itemDescription;
        currentEditRow = null;
    } else {
        // Create a new row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${itemName}</td>
            <td>${itemQuantity}</td>
            <td>${itemDescription}</td>
            <td>
                <button class="edit-button" onclick="editItem(this)">Edit</button>
                <button class="delete-button" onclick="deleteItem(this)">Delete</button>
            </td>
        `;
        document.querySelector('#inventoryTable tbody').appendChild(newRow);
        items.push({ name: itemName, quantity: itemQuantity, description: itemDescription });
    }

    // Save items to local storage
    localStorage.setItem('inventoryItems', JSON.stringify(items));

    // Clear the input fields
    document.getElementById('itemForm').reset();

    return false; // Prevent form submission
}

function saveInventory() {
    const items = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    localStorage.setItem('inventoryItems', JSON.stringify(items));
    alert("Inventory saved successfully!");
}

function searchInventory() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const inventoryTableBody = document.querySelector('#inventoryTable tbody');
    const items = JSON.parse(localStorage.getItem('inventoryItems')) || [];

    // Clear the table body
    inventoryTableBody.innerHTML = '';

    // Filter items based on the search input
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchInput) ||
        item.description.toLowerCase().includes(searchInput)
    );

    // Render filtered items in the table
    filteredItems.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>
                <button class="edit-button" onclick="editItem(this)">Edit</button>
                <button class="delete-button" onclick="deleteItem(this)">Delete</button>
            </td>
        `;
        inventoryTableBody.appendChild(newRow);
    });
}

function showAllInventory() {
    loadInventory(); // Reloads the full inventory list from local storage
}

function printInventory() {
    window.print(); // Calls the print dialog
}

function editItem(button) {
    const row = button.parentElement.parentElement;
    document.getElementById('itemName').value = row.cells[0].innerText;
    document.getElementById('itemQuantity').value = row.cells[1].innerText;
    document.getElementById('itemDescription').value = row.cells[2].innerText;

    currentEditRow = row; // Store the current row for updating
}

function deleteItem(button) {
    const row = button.parentElement.parentElement;
    const items = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    
    // Remove the row from the table
    row.parentElement.removeChild(row);

    // Remove the item from local storage
    const index = Array.from(row.parentNode.children).indexOf(row);
    items.splice(index, 1);
    localStorage.setItem('inventoryItems', JSON.stringify(items)); // Update local storage
}

function logout() {
    // Clear user data from local storage (if any)
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    
    // Redirect to the login page
    window.location.href = 'Form.html'; // Change to your actual login page
}