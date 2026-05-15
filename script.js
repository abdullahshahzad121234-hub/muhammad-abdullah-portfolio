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

// Fade-up Reveal on Scroll
const fadeElements = document.querySelectorAll(
    '.project-card, .approach-card, .faq-item, .contact-card, .tool-item, ' +
    '.about-grid, .agency-card, .result-card'
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

// Marquee Animation with Custom Webflow SVG
const marqueeTrack = document.getElementById('marqueeTrack');
if (marqueeTrack && marqueeTrack.children.length === 0) {
    const toolsList = [
        { name: 'Webflow', type: 'svg' },
        { name: 'Figma', icon: 'fab fa-figma' },
        { name: 'HubSpot', icon: 'fab fa-hubspot' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' }
    ];
    
    const webflowSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 63" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M100 0L68.0913 62.3782H38.12L51.4737 36.526H50.8746C39.8578 50.8273 23.4206 60.2417 0 62.3782V36.8837C0 36.8837 14.9827 35.9988 23.7906 26.7386H0V0.000492722H26.7381V21.9922L27.3382 21.9897L38.2643 0.000492722H58.4857V21.8527L59.0858 21.8518L70.4219 0H100Z" fill="#a855f7"/>
    </svg>`;
    
    let html = '';
    for (let i = 0; i < 3; i++) {
        toolsList.forEach(t => {
            if (t.type === 'svg') {
                html += `<span class="tool-item">${webflowSVG} ${t.name}</span>`;
            } else {
                html += `<span class="tool-item"><i class="${t.icon}"></i> ${t.name}</span>`;
            }
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

// Active Nav Link Highlight
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
                const href = item.getAttribute('href');
                if (href === `#${sectionId}`) {
                    item.classList.add('active');
                }
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

// Fix for Interface Lab logo - add fallback on error
const agencyLogoImg = document.querySelector('.agency-logo img');
if (agencyLogoImg) {
    agencyLogoImg.addEventListener('error', function() {
        // Create fallback div if image fails
        const parent = this.parentElement;
        const fallback = document.createElement('div');
        fallback.className = 'logo-fallback';
        fallback.textContent = 'IL';
        parent.innerHTML = '';
        parent.appendChild(fallback);
    });
}

// Image error handling for other images
document.querySelectorAll('img:not(.agency-logo img)').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Image failed to load:', this.src);
    });
});
