const tabBtns = document.querySelectorAll('.tab-btn');
const fieldsIndividual = document.getElementById('fields-individual');
const fieldsBusiness = document.getElementById('fields-business');
let activeLoginType = 'individual';

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const type = btn.dataset.type;
        activeLoginType = type;

        if (type === 'individual') {
            fieldsIndividual.classList.remove('hidden');
            fieldsBusiness.classList.add('hidden');
        } else {
            fieldsBusiness.classList.remove('hidden');
            fieldsIndividual.classList.add('hidden');
        }


        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.querySelectorAll('input.error').forEach(el => el.classList.remove('error'));
    });
});

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

const businessEmailInput = document.getElementById('business-email');
const businessPasswordInput = document.getElementById('business-password');
const businessNameInput = document.getElementById('business-name');
const abnInput = document.getElementById('abn');
const businessEmailError = document.getElementById('business-email-error');
const businessPasswordError = document.getElementById('business-password-error');
const businessNameError = document.getElementById('business-name-error');
const abnError = document.getElementById('abn-error');

const rememberCheck = document.getElementById('remember');
const forgotLink = document.querySelector('.forgot-link');
const submitBtn = document.querySelector('.btn-full');

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidABN(abn) {
    const cleaned = abn.replace(/\s/g, '');
    return cleaned === '' || /^\d{11}$/.test(cleaned);
}

emailInput.addEventListener('blur', () => {
    if (activeLoginType === 'individual') validateEmailField();
});

emailInput.addEventListener('input', () => {
    if (activeLoginType === 'individual' && emailInput.classList.contains('error')) {
        validateEmailField();
    }
});

passwordInput.addEventListener('blur', () => {
    if (activeLoginType === 'individual') validatePasswordField();
});

passwordInput.addEventListener('input', () => {
    if (activeLoginType === 'individual' && passwordInput.classList.contains('error')) {
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

businessEmailInput.addEventListener('blur', () => {
    if (activeLoginType === 'business') validateBusinessEmailField();
});

businessEmailInput.addEventListener('input', () => {
    if (activeLoginType === 'business' && businessEmailInput.classList.contains('error')) {
        validateBusinessEmailField();
    }
});

businessPasswordInput.addEventListener('blur', () => {
    if (activeLoginType === 'business') validateBusinessPasswordField();
});

businessPasswordInput.addEventListener('input', () => {
    if (activeLoginType === 'business' && businessPasswordInput.classList.contains('error')) {
        validateBusinessPasswordField();
    }
});

businessNameInput.addEventListener('blur', () => {
    if (activeLoginType === 'business') validateBusinessNameField();
});

businessNameInput.addEventListener('input', () => {
    if (activeLoginType === 'business' && businessNameInput.classList.contains('error')) {
        validateBusinessNameField();
    }
});

abnInput.addEventListener('blur', () => {
    if (activeLoginType === 'business') validateABNField();
});

abnInput.addEventListener('input', () => {
    if (activeLoginType === 'business' && abnInput.classList.contains('error')) {
        validateABNField();
    }
});

function validateBusinessEmailField() {
    const email = businessEmailInput.value.trim();
    if (email === '') {
        businessEmailError.textContent = 'Business email is required.';
        businessEmailInput.classList.add('error');
        return false;
    } else if (!isValidEmail(email)) {
        businessEmailError.textContent = 'Please enter a valid email address.';
        businessEmailInput.classList.add('error');
        return false;
    } else {
        businessEmailError.textContent = '';
        businessEmailInput.classList.remove('error');
        return true;
    }
}

function validateBusinessPasswordField() {
    const password = businessPasswordInput.value;
    if (password === '') {
        businessPasswordError.textContent = 'Password is required.';
        businessPasswordInput.classList.add('error');
        return false;
    } else if (password.length < 6) {
        businessPasswordError.textContent = 'Password must be at least 6 characters.';
        businessPasswordInput.classList.add('error');
        return false;
    } else {
        businessPasswordError.textContent = '';
        businessPasswordInput.classList.remove('error');
        return true;
    }
}

function validateBusinessNameField() {
    const name = businessNameInput.value.trim();
    if (name === '') {
        businessNameError.textContent = 'Business name is required.';
        businessNameInput.classList.add('error');
        return false;
    } else {
        businessNameError.textContent = '';
        businessNameInput.classList.remove('error');
        return true;
    }
}

function validateABNField() {
    const abn = abnInput.value.trim();
    if (abn !== '' && !isValidABN(abn)) {
        abnError.textContent = 'ABN must be 11 digits if provided.';
        abnInput.classList.add('error');
        return false;
    } else {
        abnError.textContent = '';
        abnInput.classList.remove('error');
        return true;
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isIndividualValid = true;
    let isBusinessValid = true;

    if (activeLoginType === 'individual') {
        isIndividualValid = validateEmailField() && validatePasswordField();
    } else {
        isBusinessValid = validateBusinessEmailField() && validateBusinessPasswordField() && validateBusinessNameField() && validateABNField();
    }

    if ((activeLoginType === 'individual' && !isIndividualValid) ||
        (activeLoginType === 'business' && !isBusinessValid)) {
        return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const email = activeLoginType === 'individual'
            ? emailInput.value.trim()
            : businessEmailInput.value.trim();

        if (rememberCheck.checked) {
            localStorage.setItem('companio_remember_email', email);
        } else {
            localStorage.removeItem('companio_remember_email');
        }

        sessionStorage.setItem('companio_logged_in', 'true');
        sessionStorage.setItem('companio_user_email', email);
        sessionStorage.setItem('companio_login_type', activeLoginType);

        if (activeLoginType === 'business') {
            sessionStorage.setItem('companio_business_name', businessNameInput.value.trim());
        }

        window.location.href = '../index.html';

    } catch (error) {
        const targetError = activeLoginType === 'individual' ? emailError : businessEmailError;
        const targetInput = activeLoginType === 'individual' ? emailInput : businessEmailInput;
        targetError.textContent = 'Login failed. Please try again.';
        targetInput.classList.add('error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('companio_remember_email');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheck.checked = true;
    }
});

forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = activeLoginType === 'individual'
        ? emailInput.value.trim()
        : businessEmailInput.value.trim();
    if (email && isValidEmail(email)) {
        alert(`A password reset link will be sent to ${email}`);
    } else {
        alert('Please enter your email address above first, then click "Forgot password?" to receive a reset link.');
        if (activeLoginType === 'individual') {
            emailInput.focus();
        } else {
            businessEmailInput.focus();
        }
    }
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});