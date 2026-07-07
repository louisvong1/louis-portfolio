// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const getPreferredTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

setTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== Scroll-based Navigation Highlighting =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section, .hero');
const navLinkElements = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===== Smooth Scroll for Navigation Links =====
navLinkElements.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Staggered Scroll Animations =====
const animatedElements = document.querySelectorAll('.expertise-card, .stat-card, .timeline-item, .contact-card, .cert-card');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '-50px' });

animatedElements.forEach(el => {
    scrollObserver.observe(el);
});

// ===== Parallax Effect for Background Orbs =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.05 * (index + 1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Magnetic Button Effect =====
const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        btn.style.transform = `translate(${deltaX * 4}px, ${deltaY * 3}px)`;
        btn.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        btn.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== Interactive Card Tilt Effect =====
const cards = document.querySelectorAll('.expertise-card, .contact-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Hero Particles =====
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.setProperty('--duration', `${6 + Math.random() * 8}s`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particle.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
        particle.style.setProperty('--dy', `${(Math.random() - 0.5) * 80}px`);
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ===== Dynamic Stats Counter Animation =====
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numberMatch = finalValue.match(/\d+/);

        if (numberMatch) {
            const target = parseInt(numberMatch[0]);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = finalValue.replace(/\d+/, Math.ceil(current).toString());
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = finalValue;
                }
            };

            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        statObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            statObserver.observe(stat.closest('.stat-card'));
        }
    });
};

window.addEventListener('load', animateStats);

// ===== Floating Animation for Hero Visual =====
const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
    let mouseX = 0;
    let mouseY = 0;
    let cardX = 0;
    let cardY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    const animateFloating = () => {
        cardX += (mouseX - cardX) * 0.05;
        cardY += (mouseY - cardY) * 0.05;

        floatingCard.style.transform = `translate(${cardX}px, ${cardY}px)`;
        requestAnimationFrame(animateFloating);
    };

    animateFloating();
}

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Console Message =====
console.log('%c👋 Welcome to Louis Vong\'s Portfolio!',
    'font-size: 20px; font-weight: bold; color: #667eea;'
);
console.log('%cLooking for a Solution Architect? Let\'s connect!',
    'font-size: 14px; color: #764ba2;'
);
