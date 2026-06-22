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

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});

// Observe about section
const aboutSection = document.querySelector('.about-content');
if (aboutSection) {
    aboutSection.classList.add('animate-on-scroll');
    observer.observe(aboutSection);
}

// Observe CTA section
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
    ctaSection.classList.add('animate-on-scroll');
    observer.observe(ctaSection);
}

// Observe app section
const appSection = document.querySelector('.app-content');
if (appSection) {
    appSection.classList.add('animate-on-scroll');
    observer.observe(appSection);
}

// === NAVBAR SCROLL EFFECT ===
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    lastScroll = currentScroll;
});

// === TYPING EFFECT FOR HERO TAGLINE ===
const tagline = document.querySelector('.hero-content h2 span');
if (tagline) {
    // Add a subtle pulse animation via class
    tagline.classList.add('highlight-pulse');
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ONLY ===
document.querySelectorAll('nav a:not(.cta-btn)').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// === COUNTER ANIMATION FOR ABOUT LIST ===
function animateCounters() {
    document.querySelectorAll('.about-list li').forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('slide-in');
        }, index * 150);
    });
}

// Trigger counter animation when about section is visible
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const aboutList = document.querySelector('.about-list');
if (aboutList) {
    aboutObserver.observe(aboutList.parentElement);
}