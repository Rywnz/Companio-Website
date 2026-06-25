
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.role-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});

document.querySelectorAll('.benefit-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});

const formContainer = document.querySelector('.form-container');
if (formContainer) {
    formContainer.classList.add('animate-on-scroll');
    observer.observe(formContainer);
}


const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

window.addEventListener('load', () => {
    const banner = document.querySelector('.page-banner');
    if (banner) {
        banner.classList.add('banner-animate');
    }
});


const roleCards = document.querySelectorAll('.role-card');
let selectedRole = null;
const seniorForm = document.getElementById('signup-form');
const businessForm = document.getElementById('business-signup-form');
const seniorFormLabel = document.getElementById('senior-form-label');
const businessFormLabel = document.getElementById('business-form-label');

roleCards.forEach(card => {
    card.addEventListener('click', () => {
        roleCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRole = card.dataset.role;


        if (selectedRole === 'partner') {
            seniorForm.classList.add('hidden');
            businessForm.classList.remove('hidden');
            seniorFormLabel.classList.add('hidden');
            businessFormLabel.classList.remove('hidden');
        } else {
            businessForm.classList.add('hidden');
            seniorForm.classList.remove('hidden');
            businessFormLabel.classList.add('hidden');
            seniorFormLabel.classList.remove('hidden');

            showStep(1);
        }

        const formSection = document.querySelector('.signup-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


let currentStep = 1;
const totalSteps = 3;

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.add('hidden'));

    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) {
        targetStep.classList.remove('hidden');
    }

    const indicator = document.getElementById('step-indicator');
    if (indicator) {
        indicator.textContent = step;
    }

    currentStep = step;

    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


function validateStep1() {
    let valid = true;

    const fields = [
        { id: 'full-name', message: 'Please enter your full name' },
        { id: 'email', message: 'Please enter a valid email address' },
        { id: 'phone', message: 'Please enter your phone number' },
        { id: 'dob', message: 'Please select your date of birth' },
        { id: 'location', message: 'Please enter your suburb or location' }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorSpan = input.parentElement.querySelector('.error-msg');

        if (!input.value.trim()) {
            input.classList.add('error');
            errorSpan.textContent = field.message;
            valid = false;
        } else if (field.id === 'email' && !isValidEmail(input.value)) {
            input.classList.add('error');
            errorSpan.textContent = 'Please enter a valid email address';
            valid = false;
        } else if (field.id === 'phone' && !isValidPhone(input.value)) {
            input.classList.add('error');
            errorSpan.textContent = 'Please enter a valid phone number';
            valid = false;
        } else {
            input.classList.remove('error');
            errorSpan.textContent = '';
        }
    });

    return valid;
}


function validateStep3() {
    let valid = true;

    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const terms = document.getElementById('terms');

    document.querySelectorAll('#step-3 .error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('#step-3 input.error').forEach(el => el.classList.remove('error'));

    if (!password.value.trim()) {
        password.classList.add('error');
        password.parentElement.querySelector('.error-msg').textContent = 'Please create a password';
        valid = false;
    } else if (password.value.length < 8) {
        password.classList.add('error');
        password.parentElement.querySelector('.error-msg').textContent = 'Password must be at least 8 characters';
        valid = false;
    }

    if (!confirmPassword.value.trim()) {
        confirmPassword.classList.add('error');
        confirmPassword.parentElement.querySelector('.error-msg').textContent = 'Please confirm your password';
        valid = false;
    } else if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('error');
        confirmPassword.parentElement.querySelector('.error-msg').textContent = 'Passwords do not match';
        valid = false;
    }

    if (!terms.checked) {
        terms.closest('.form-group').querySelector('.error-msg').textContent = 'You must agree to the Terms of Service';
        valid = false;
    }

    return valid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(\+?61|0)[0-9]{8,9}$/.test(cleaned);
}


document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', () => {
        const next = parseInt(btn.dataset.next);
        if (currentStep === 1 && next === 2) {
            if (!validateStep1()) return;
        }
        if (next <= totalSteps) {
            showStep(next);
        }
    });
});

document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
        const prev = parseInt(btn.dataset.prev);
        if (prev >= 1) {
            showStep(prev);
        }
    });
});


document.querySelectorAll('#signup-form .form-group input').forEach(input => {
    input.addEventListener('blur', () => {
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (!errorSpan) return;

        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            errorSpan.textContent = 'This field is required';
        } else {
            input.classList.remove('error');
            errorSpan.textContent = '';
        }
    });

    input.addEventListener('input', () => {
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (errorSpan && input.classList.contains('error')) {
            input.classList.remove('error');
            errorSpan.textContent = '';
        }
    });
});


const form = document.getElementById('signup-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const overlay = document.getElementById('success-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
});


function validateBusinessForm() {
    let valid = true;

    const fields = [
        { id: 'business-owner-name', message: 'Please enter your full name' },
        { id: 'business-name', message: 'Please enter your business name' },
        { id: 'business-email', message: 'Please enter a valid email address', type: 'email' },
        { id: 'business-phone', message: 'Please enter a phone number', type: 'phone' },
        { id: 'business-address', message: 'Please enter your business address' },
        { id: 'business-category', message: 'Please select a business category' },
        { id: 'business-description', message: 'Please provide a brief description' },
        { id: 'business-password', message: 'Please create a password', minLength: 8 },
        { id: 'business-confirm-password', message: 'Passwords do not match', match: 'business-password' }
    ];


    document.querySelectorAll('#business-signup-form .error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('#business-signup-form input.error, #business-signup-form select.error, #business-signup-form textarea.error').forEach(el => el.classList.remove('error'));

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input) return;
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (!errorSpan) return;

        if (field.type === 'email') {
            if (!input.value.trim()) {
                input.classList.add('error');
                errorSpan.textContent = 'Business email is required';
                valid = false;
            } else if (!isValidEmail(input.value)) {
                input.classList.add('error');
                errorSpan.textContent = 'Please enter a valid email address';
                valid = false;
            } else {
                input.classList.remove('error');
                errorSpan.textContent = '';
            }
        } else if (field.type === 'phone') {
            if (!input.value.trim()) {
                input.classList.add('error');
                errorSpan.textContent = 'Phone number is required';
                valid = false;
            } else if (!isValidPhone(input.value)) {
                input.classList.add('error');
                errorSpan.textContent = 'Please enter a valid phone number';
                valid = false;
            } else {
                input.classList.remove('error');
                errorSpan.textContent = '';
            }
        } else if (field.match) {
            const matchInput = document.getElementById(field.match);
            if (!input.value.trim()) {
                input.classList.add('error');
                errorSpan.textContent = 'Please confirm your password';
                valid = false;
            } else if (input.value !== matchInput.value) {
                input.classList.add('error');
                errorSpan.textContent = field.message;
                valid = false;
            } else {
                input.classList.remove('error');
                errorSpan.textContent = '';
            }
        } else if (field.minLength) {
            if (!input.value.trim()) {
                input.classList.add('error');
                errorSpan.textContent = field.message;
                valid = false;
            } else if (input.value.length < field.minLength) {
                input.classList.add('error');
                errorSpan.textContent = `Password must be at least ${field.minLength} characters`;
                valid = false;
            } else {
                input.classList.remove('error');
                errorSpan.textContent = '';
            }
        } else {
            if (!input.value.trim() || input.value === '' || (input.tagName === 'SELECT' && !input.value)) {
                input.classList.add('error');
                errorSpan.textContent = field.message;
                valid = false;
            } else {
                input.classList.remove('error');
                errorSpan.textContent = '';
            }
        }
    });


    const termsCheck = document.getElementById('business-terms');
    const termsError = termsCheck.closest('.form-group').querySelector('.error-msg');
    if (!termsCheck.checked) {
        termsError.textContent = 'You must agree to the Terms of Service';
        valid = false;
    } else {
        termsError.textContent = '';
    }

    return valid;
}


document.querySelectorAll('#business-signup-form input, #business-signup-form select, #business-signup-form textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (selectedRole !== 'partner') return;
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (!errorSpan) return;

        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            errorSpan.textContent = 'This field is required';
        } else {
            input.classList.remove('error');
            errorSpan.textContent = '';
        }
    });

    input.addEventListener('input', () => {
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (errorSpan && input.classList.contains('error')) {
            input.classList.remove('error');
            errorSpan.textContent = '';
        }
    });
});


const businessFormEl = document.getElementById('business-signup-form');
businessFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateBusinessForm()) return;

    const overlay = document.getElementById('success-overlay');
    if (overlay) {

        overlay.querySelector('h2').textContent = 'Business Registered!';
        overlay.querySelector('p').textContent = 'Your business account has been created successfully. We\'ll review your details and get back to you within 2-3 business days.';
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
});


const successOverlay = document.getElementById('success-overlay');
if (successOverlay) {
    successOverlay.addEventListener('click', (e) => {
        if (e.target === successOverlay) {
            successOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}


document.querySelectorAll('nav a:not(.cta-btn)').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});