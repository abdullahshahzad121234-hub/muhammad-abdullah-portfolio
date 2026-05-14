// Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Scroll Progress Bar
function updateScrollProgress() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
        btn.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    }
});

// Fade-up Reveal on Scroll for multiple element types
const fadeElements = document.querySelectorAll(
    '.project-card, .approach-card, .faq-item, .contact-card, .tool-item, ' +
    '.about-grid, .agency-card, .content-block, .challenge-card, .solution-card, ' +
    '.tech-item, .gallery-item, .feature-card, .result-card, .quote-card, ' +
    '.process-step, .product-feature, .next-project'
);

fadeElements.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => observer.observe(el));

// Also observe any elements with .animate-fade-up class (for case studies)
document.querySelectorAll('.animate-fade-up').forEach(el => {
    observer.observe(el);
});

// Marquee Animation
const marqueeTrack = document.getElementById('marqueeTrack');
if (marqueeTrack && marqueeTrack.children.length === 0) {
    const toolsList = [
        { name: 'Webflow', icon: 'fab fa-webflow' },
        { name: 'Figma', icon: 'fab fa-figma' },
        { name: 'HubSpot', icon: 'fab fa-hubspot' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' }
    ];
    
    let html = '';
    for (let i = 0; i < 3; i++) {
        toolsList.forEach(t => {
            html += `<span class="tool-item"><i class="${t.icon}"></i> ${t.name}</span>`;
        });
    }
    marqueeTrack.innerHTML = html;
    
    let pos = 0;
    let speed = 0.5;
    let animId;
    let isHovering = false;
    
    function animateMarquee() {
        if (!isHovering && marqueeTrack) {
            pos -= speed;
            const trackWidth = marqueeTrack.scrollWidth / 3;
            if (Math.abs(pos) >= trackWidth) {
                pos = 0;
            }
            marqueeTrack.style.transform = `translate3d(${pos}px, 0, 0)`;
        }
        animId = requestAnimationFrame(animateMarquee);
    }
    
    setTimeout(() => animateMarquee(), 100);
    
    marqueeTrack.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    marqueeTrack.addEventListener('mouseleave', () => {
        isHovering = false;
    });
}

// Active Nav Link Highlight (for index page sections)
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navItems.forEach(item => {
                item.classList.remove('active');
                // Check if href matches the section id
                const href = item.getAttribute('href');
                if (href === `#${sectionId}`) {
                    item.classList.add('active');
                }
                // Also handle case where href is index.html#section
                if (href && href.includes(`#${sectionId}`)) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Page Load Fade-in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Fix for any images that might not load
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Image failed to load:', this.src);
    });
});
