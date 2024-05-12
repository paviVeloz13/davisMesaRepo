// Simulated student data with balances and transaction history
let students = [
    { username: 'student1', balance: 100, transactions: [{amount: 10, description: "Initial balance"}] },
    { username: 'student2', balance: 50, transactions: [{amount: 20, description: "Initial balance"}] }
    // Add more students and their data here
];

// Function to populate user table
function populateUserTable() {
    const tableBody = document.getElementById('user-table');
    tableBody.innerHTML = ''; // Clear previous content
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.username}</td>
            <td>${student.balance}</td>
            <td><button onclick="showTransactionHistory('${student.username}')">View Transactions</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to show transaction history for a specific user
function showTransactionHistory(username) {
    const selectedUser = students.find(student => student.username === username);
    document.getElementById('selected-username').innerText = username;
    document.getElementById('current-balance').innerText = selectedUser.balance;
    populateTransactionHistory(selectedUser);
    document.getElementById('user-table').style.display = 'none';
    document.getElementById('transaction-history').style.display = 'block';
}

// Function to populate transaction history
function populateTransactionHistory(user) {
    const historyList = document.getElementById('balance-history');
    historyList.innerHTML = ''; // Clear previous history
    user.transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.description}: ${transaction.amount >= 0 ? `Added $${transaction.amount}` : `Deducted $${Math.abs(transaction.amount)}`}`;
        historyList.appendChild(listItem);
    });
}

// Function to add transaction
function addTransaction() {
    const amount = parseInt(document.getElementById('transaction-amount').value);
    const description = document.getElementById('transaction-description').value;
    if (!isNaN(amount) && description.trim() !== '') {
        const username = document.getElementById('selected-username').innerText;
        const currentUser = students.find(student => student.username === username);
        currentUser.transactions.push({ amount: amount, description: description });
        currentUser.balance += amount;
        document.getElementById('current-balance').innerText = currentUser.balance;
        populateTransactionHistory(currentUser);
    } else {
        alert('Please enter a valid amount and description.');
    }
}

// Function to go back to user table
function goBack() {
    document.getElementById('user-table').style.display = 'block';
    document.getElementById('transaction-history').style.display = 'none';
}

// Function to show add user form
function showAddUserForm() {
    document.getElementById('add-user-form').style.display = 'block';
}

// Function to hide add user form
function hideAddUserForm() {
    document.getElementById('add-user-form').style.display = 'none';
}

// Function to add a new user
function addUser() {
    const newUsername = document.getElementById('new-username').value.trim();
    const initialBalance = parseInt(document.getElementById('initial-balance').value);
    if (newUsername === '' || isNaN(initialBalance)) {
        alert('Please enter valid data for username and initial balance.');
        return;
    }
    if (students.find(student => student.username === newUsername)) {
        alert('User already exists.');
        return;
    }
    students.push({ username: newUsername, balance: initialBalance, transactions: [] });
    populateUserTable();
    hideAddUserForm();
}

// Function to show delete user form
function showDeleteUserForm() {
    document.getElementById('delete-user-form').style.display = 'block';
}

// Function to hide delete user form
function hideDeleteUserForm() {
    document.getElementById('delete-user-form').style.display = 'none';
}

// Function to delete user
function deleteUser() {
    const usernameToDelete = document.getElementById('username-to-delete').value.trim();
    const indexToDelete = students.findIndex(student => student.username === usernameToDelete);
    if (indexToDelete === -1) {
        alert('User not found.');
        return;
    }
    students.splice(indexToDelete, 1);
    populateUserTable();
    hideDeleteUserForm();
}

// Populate user table on page load
populateUserTable();