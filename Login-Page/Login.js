// === DOM ELEMENTS ===
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const rememberCheck = document.getElementById('remember');
const forgotLink = document.querySelector('.forgot-link');
const submitBtn = document.querySelector('.btn-full');

// === EMAIL VALIDATION ===
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// === REAL-TIME VALIDATION ===
emailInput.addEventListener('blur', () => {
    validateEmailField();
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        validateEmailField();
    }
});

passwordInput.addEventListener('blur', () => {
    validatePasswordField();
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('error')) {
        validatePasswordField();
    }
});

function validateEmailField() {
    const email = emailInput.value.trim();
    if (email === '') {
        emailError.textContent = 'Email address is required.';
        emailInput.classList.add('error');
        return false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('error');
        return false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
        return true;
    }
}

function validatePasswordField() {
    const password = passwordInput.value;
    if (password === '') {
        passwordError.textContent = 'Password is required.';
        passwordInput.classList.add('error');
        return false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordInput.classList.add('error');
        return false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        return true;
    }
}

// === FORM SUBMISSION ===
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePasswordField();

    if (!isEmailValid || !isPasswordValid) {
        return;
    }

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate API request
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Remember me - store email if checked
        if (rememberCheck.checked) {
            localStorage.setItem('companio_remember_email', emailInput.value.trim());
        } else {
            localStorage.removeItem('companio_remember_email');
        }

        // Store a simple logged-in flag for demo purposes
        sessionStorage.setItem('companio_logged_in', 'true');
        sessionStorage.setItem('companio_user_email', emailInput.value.trim());

        // Simulate successful login - redirect to homepage
        window.location.href = '../Home%20Page/index.html';

    } catch (error) {
        // Show error
        emailError.textContent = 'Login failed. Please try again.';
        emailInput.classList.add('error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

// === REMEMBER ME - Load saved email ===
document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('companio_remember_email');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheck.checked = true;
    }
});

// === FORGOT PASSWORD ===
forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (email && isValidEmail(email)) {
        alert(`A password reset link will be sent to ${email}`);
    } else {
        alert('Please enter your email address above first, then click "Forgot password?" to receive a reset link.');
        emailInput.focus();
    }
});

// === NAVBAR SCROLL EFFECT ===
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});