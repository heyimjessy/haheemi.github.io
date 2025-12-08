// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
    navLinks.style.padding = '2rem';
    navLinks.style.borderBottom = '1px solid var(--border-color)';
    navLinks.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
});

// Reset nav styles when resizing to desktop to avoid hidden menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.removeAttribute('style');
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    // Fade scroll indicator based on scroll position
    if (scrollIndicator) {
        const heroHeight = window.innerHeight;
        const scrollProgress = window.scrollY / (heroHeight * 0.8);
        const opacity = Math.max(0, 1 - scrollProgress);
        scrollIndicator.style.opacity = opacity;
        scrollIndicator.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.music-card, .platform-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Album art and platform icon placeholder backgrounds
const albumArts = document.querySelectorAll('.album-art');
const gradients = [
    'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
    'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
    'linear-gradient(135deg, #90caf9 0%, #64b5f6 100%)'
];

albumArts.forEach((art, index) => {
    art.style.background = gradients[index % gradients.length];
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Newsletter form handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        if (emailInput.value.trim() !== '') {
            newsletterForm.innerHTML = '<p style="color: var(--accent-color); font-weight: 600;">Thank you for subscribing!</p>';
        }
    });
}