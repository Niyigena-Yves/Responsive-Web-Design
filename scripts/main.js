// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Skills animation
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .timeline-item, .project-card').forEach(el => {
    observer.observe(el);
});

// Animate skills on scroll
window.addEventListener('scroll', animateSkills);

// Initial skills animation check
animateSkills();

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const modalClose = document.getElementById('modalClose');

// Form validation functions
const validateName = (name) => {
    return name.trim().length >= 2;
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateMessage = (message) => {
    return message.trim().length >= 10;
};

// Show error message
const showError = (fieldId, message) => {
    const errorElement = document.getElementById(fieldId + 'Error');
    const fieldElement = document.getElementById(fieldId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    fieldElement.style.borderColor = '#ef4444';
};

// Hide error message
const hideError = (fieldId) => {
    const errorElement = document.getElementById(fieldId + 'Error');
    const fieldElement = document.getElementById(fieldId);
    errorElement.style.display = 'none';
    fieldElement.style.borderColor = '#e5e7eb';
};

// Real-time validation
document.getElementById('name').addEventListener('input', (e) => {
    if (validateName(e.target.value)) {
        hideError('name');
    }
});

document.getElementById('email').addEventListener('input', (e) => {
    if (validateEmail(e.target.value)) {
        hideError('email');
    }
});

document.getElementById('message').addEventListener('input', (e) => {
    if (validateMessage(e.target.value)) {
        hideError('message');
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    let isValid = true;

    // Validate name
    if (!validateName(name)) {
        showError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    } else {
        hideError('name');
    }

    // Validate email
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError('email');
    }

    // Validate message
    if (!validateMessage(message)) {
        showError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    } else {
        hideError('message');
    }

    if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            contactForm.reset();
            successModal.style.display = 'block';
        }, 2000);
    }
});

// Modal functionality
modalClose.addEventListener('click', () => {
    successModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Typing effect for hero section
const heroTitle = document.querySelector('.hero h1');
const titleText = 'Yves Niyigena';
let titleIndex = 0;

const typeTitle = () => {
    if (titleIndex < titleText.length) {
        heroTitle.textContent = titleText.slice(0, titleIndex + 1);
        titleIndex++;
        setTimeout(typeTitle, 150);
    }
};

// Start typing effect after page load
window.addEventListener('load', () => {
    heroTitle.textContent = '';
    setTimeout(typeTitle, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Add animation classes for better performance
const addAnimationClasses = () => {
    const elements = document.querySelectorAll('.skill-category, .timeline-item, .project-card');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', addAnimationClasses);

// Image lazy loading simulation
const projectImages = document.querySelectorAll('.project-image');
projectImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.3s ease';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (successModal.style.display === 'block') {
            successModal.style.display = 'none';
        }
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: throttle scroll events
let ticking = false;
const updateOnScroll = () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateSkills();
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', updateOnScroll);