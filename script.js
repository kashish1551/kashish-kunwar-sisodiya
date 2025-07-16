// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when about section is visible
            if (entry.target.classList.contains('about')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .about').forEach(el => {
    observer.observe(el);
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add slide-in animations to about section
    document.querySelector('.about-text')?.classList.add('slide-in-left');
    document.querySelector('.about-skills')?.classList.add('slide-in-right');

    // Add scale-in to portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.classList.add('scale-in');
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Add fade-in to testimonials
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.15}s`;
    });
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formErrors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    service: document.getElementById('service-error'),
    message: document.getElementById('message-error')
};

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    Object.values(formErrors).forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validate form
    let isValid = true;

    if (!data.name.trim()) {
        showError('name', 'Name is required');
        isValid = false;
    }

    if (!data.email.trim()) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }

    if (!data.service) {
        showError('service', 'Please select a service');
        isValid = false;
    }

    if (!data.message.trim()) {
        showError('message', 'Message is required');
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
});

function showError(field, message) {
    const errorElement = formErrors[field];
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Parallax effect for hero shapes
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation after page load
window.addEventListener('load', function() {
    setTimeout(() => {
        const heroMain = document.querySelector('.hero-main');
        if (heroMain) {
            const originalText = heroMain.textContent;
            typeWriter(heroMain, originalText, 50);
        }
    }, 2000);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats, .portfolio-stats').forEach(section => {
    counterObserver.observe(section);
});

// Add floating animation to hero card
document.addEventListener('DOMContentLoaded', function() {
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        setInterval(() => {
            heroCard.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`;
        }, 16);
    }
});

// Preload animations
document.addEventListener('DOMContentLoaded', function() {
    // Add animation delays to stagger elements
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });

    document.querySelectorAll('.contact-method').forEach((method, index) => {
        method.style.animationDelay = `${index * 0.1}s`;
        method.classList.add('slide-in-left');
    });
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Easter egg triggered
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        konamiCode = [];
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    // Handle scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading states to interactive elements
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Digital Marketing Portfolio Loaded Successfully!');
    
    // Add subtle entrance animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
