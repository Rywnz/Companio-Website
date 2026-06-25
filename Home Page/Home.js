
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


document.querySelectorAll('.feature-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});


const aboutSection = document.querySelector('.about-content');
if (aboutSection) {
    aboutSection.classList.add('animate-on-scroll');
    observer.observe(aboutSection);
}


const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
    ctaSection.classList.add('animate-on-scroll');
    observer.observe(ctaSection);
}


const appSection = document.querySelector('.app-content');
if (appSection) {
    appSection.classList.add('animate-on-scroll');
    observer.observe(appSection);
}


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


const tagline = document.querySelector('.hero-content h2 span');
if (tagline) {

    tagline.classList.add('highlight-pulse');
}


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


function animateCounters() {
    document.querySelectorAll('.about-list li').forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('slide-in');
        }, index * 150);
    });
}


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


const track = document.getElementById('testimonial-track');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');
const dotsContainer = document.getElementById('testimonial-dots');

if (track && prevBtn && nextBtn && dotsContainer) {
    const cards = track.querySelectorAll('.testimonial-card');
    const totalSlides = cards.length;
    let currentIndex = 0;
    let autoSlide;


    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        

        dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % totalSlides);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlide = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlide) {
            clearInterval(autoSlide);
            autoSlide = null;
        }
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });


    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }


    startAutoSlide();
}
