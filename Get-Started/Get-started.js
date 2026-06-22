// === SCROLL ANIMATIONS ===
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

// Observe role cards
document.querySelectorAll('.role-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});

// Observe benefit cards
document.querySelectorAll('.benefit-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});

// Observe form container
const formContainer = document.querySelector('.form-container');
if (formContainer) {
    formContainer.classList.add('animate-on-scroll');
    observer.observe(formContainer);
}

// === NAVBAR SCROLL EFFECT ===
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// === PAGE LOAD BANNER ANIMATION ===
window.addEventListener('load', () => {
    const banner = document.querySelector('.page-banner');
    if (banner) {
        banner.classList.add('banner-animate');
    }
});

// === ROLE SELECTION ===
const roleCards = document.querySelectorAll('.role-card');
let selectedRole = null;

roleCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected from all
        roleCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected to clicked card
        card.classList.add('selected');
        selectedRole = card.dataset.role;
        
        // Scroll to form
        const formSection = document.querySelector('.signup-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// === FORM STEP NAVIGATION ===
let currentStep = 1;
const totalSteps = 3;

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => s.classList.add('hidden'));
    
    // Show the target step
    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) {
        targetStep.classList.remove('hidden');
    }
    
    // Update step indicator
    const indicator = document.getElementById('step-indicator');
    if (indicator) {
        indicator.textContent = step;
    }
    
    currentStep = step;
    
    // Scroll to form top
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Validate step 1 fields
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

// Validate step 3 fields
function validateStep3() {
    let valid = true;
    
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const terms = document.getElementById('terms');
    
    // Clear previous errors
    document.querySelectorAll('#step-3 .error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('#step-3 input.error').forEach(el => el.classList.remove('error'));
    
    // Validate password
    if (!password.value.trim()) {
        password.classList.add('error');
        password.parentElement.querySelector('.error-msg').textContent = 'Please create a password';
        valid = false;
    } else if (password.value.length < 8) {
        password.classList.add('error');
        password.parentElement.querySelector('.error-msg').textContent = 'Password must be at least 8 characters';
        valid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword.value.trim()) {
        confirmPassword.classList.add('error');
        confirmPassword.parentElement.querySelector('.error-msg').textContent = 'Please confirm your password';
        valid = false;
    } else if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('error');
        confirmPassword.parentElement.querySelector('.error-msg').textContent = 'Passwords do not match';
        valid = false;
    }
    
    // Validate terms
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
    // Allow Australian phone formats: 0412 345 678, +61412345678, 02 1234 5678
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(\+?61|0)[0-9]{8,9}$/.test(cleaned);
}

// Next step buttons
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

// Previous step buttons
document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
        const prev = parseInt(btn.dataset.prev);
        if (prev >= 1) {
            showStep(prev);
        }
    });
});

// === REAL-TIME INPUT VALIDATION ===
document.querySelectorAll('.form-group input').forEach(input => {
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
        // Clear error while typing
        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (errorSpan && input.classList.contains('error')) {
            input.classList.remove('error');
            errorSpan.textContent = '';
        }
    });
});

// === FORM SUBMISSION ===
const form = document.getElementById('signup-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    // Check if a role was selected
    if (!selectedRole) {
        // Show a gentle reminder but don't block submission
        // The role selector is above the form
    }
    
    // Show success overlay
    const overlay = document.getElementById('success-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
});

// === CLOSE SUCCESS OVERLAY ON CLICK OUTSIDE ===
const successOverlay = document.getElementById('success-overlay');
if (successOverlay) {
    successOverlay.addEventListener('click', (e) => {
        if (e.target === successOverlay) {
            successOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

// === SMOOTH SCROLL FOR NAV LINKS ===
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