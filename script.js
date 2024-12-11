function toggleForms() {
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

function registerUser() {
    const username = document.querySelector('#signupForm input[type="text"]').value;
    const email = document.querySelector('#signupForm input[type="email"]').value;
    const password = document.querySelector('#signupForm input[type="password"]:nth-child(3)').value;
    const confirmPassword = document.querySelector('#signupForm input[type="password"]:nth-child(4)').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Store user data in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert("Registration successful! You can now log in.");
    toggleForms(); // Switch to login form
    return false; // Prevent form submission
}

function loginUser() {
    const username = document.querySelector('#loginForm input[type="text"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;

    // Retrieve user data from local storage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        alert("Login successful!");
        window.location.href = 'inventory.html'; // Redirect to inventory page
    } else {
        alert("Invalid username or password!");
    }

    return false; // Prevent form submission
}