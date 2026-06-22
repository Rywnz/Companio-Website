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

// Observe value cards
document.querySelectorAll('.value-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});

// Observe team cards
document.querySelectorAll('.team-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});

// Observe mission section
const missionContent = document.querySelector('.mission-content');
if (missionContent) {
    missionContent.classList.add('animate-on-scroll');
    observer.observe(missionContent);
}

// Observe story section
const storySection = document.querySelector('.story');
if (storySection) {
    storySection.classList.add('animate-on-scroll');
    observer.observe(storySection);
}

// Observe CTA section
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
    ctaSection.classList.add('animate-on-scroll');
    observer.observe(ctaSection);
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
        // If it's a regular link (like to home page), let it navigate normally
    });
});

// === TEAM IMAGE HOVER EFFECT ===
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('.team-img');
        if (img) {
            img.style.transform = 'scale(1.08)';
            img.style.transition = 'transform 0.4s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.team-img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// === PAGE LOAD BANNER ANIMATION ===
window.addEventListener('load', () => {
    const banner = document.querySelector('.page-banner');
    if (banner) {
        banner.classList.add('banner-animate');
    }
});