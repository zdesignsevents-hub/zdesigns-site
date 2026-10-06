/* ============================================
   Z DESIGNS EVENTS — Interactions
   ============================================ */

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== FAQ ACCORDION =====
function toggleFAQ(btn) {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('open');
    });

    // Open the clicked one if it was closed
    if (!isOpen) {
        item.classList.add('open');
    }
}

// ===== SCROLL FADE-IN ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.section-grid, .service-card, .testimonial, .faq-item, .portfolio-item, .contact-info, .contact-form').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 72; // navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== LIGHTBOX GALLERY =====
// Full gallery: 9 existing wix-portfolio photos + 11 new gallery photos = 20 total
const fullGalleryImages = [
    { src: 'images/wix-portfolio-1.jpg', alt: 'Wedding ceremony floral design' },
    { src: 'images/wix-portfolio-2.jpg', alt: 'Elegant reception decor' },
    { src: 'images/wix-portfolio-3.jpg', alt: 'Floral installation' },
    { src: 'images/wix-portfolio-4.jpg', alt: 'Tablescape design' },
    { src: 'images/wix-portfolio-5.jpg', alt: 'Mandap decor' },
    { src: 'images/wix-portfolio-6.jpg', alt: 'Sangeet stage design' },
    { src: 'images/wix-portfolio-7.jpg', alt: 'Event styling' },
    { src: 'images/wix-portfolio-8.jpg', alt: 'Centerpiece design' },
    { src: 'images/wix-portfolio-9.jpg', alt: 'Venue transformation' },
    { src: 'images/gallery-1.jpg', alt: 'Gallery — event design 1' },
    { src: 'images/gallery-2.jpg', alt: 'Gallery — event design 2' },
    { src: 'images/gallery-3.jpg', alt: 'Gallery — event design 3' },
    { src: 'images/gallery-4.jpg', alt: 'Gallery — event design 4' },
    { src: 'images/gallery-5.jpg', alt: 'Gallery — event design 5' },
    { src: 'images/gallery-6.jpg', alt: 'Gallery — event design 6' },
    { src: 'images/gallery-7.jpg', alt: 'Gallery — event design 7' },
    { src: 'images/gallery-8.jpg', alt: 'Gallery — event design 8' },
    { src: 'images/gallery-9.jpg', alt: 'Gallery — event design 9' },
    { src: 'images/gallery-10.jpg', alt: 'Gallery — event design 10' },
    { src: 'images/gallery-11.jpg', alt: 'Gallery — event design 11' },
];

let currentLightboxIndex = 0;

// ===== GALLERY OVERLAY (drill-down full portfolio) =====
const galleryOverlay = document.getElementById('galleryOverlay');
const galleryOverlayGrid = document.getElementById('galleryOverlayGrid');
const galleryCloseBtn = document.getElementById('galleryCloseBtn');
const viewFullGalleryBtn = document.getElementById('viewFullGalleryBtn');

// Build the overlay grid once
if (galleryOverlayGrid) {
    fullGalleryImages.forEach((img, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-overlay-item';
        item.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy"><div class="gallery-overlay-zoom">&#43;</div>`;
        item.addEventListener('click', () => openLightbox(i));
        galleryOverlayGrid.appendChild(item);
    });
}

function openGalleryOverlay() {
    if (!galleryOverlay) return;
    galleryOverlay.classList.add('open');
    galleryOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    galleryOverlay.scrollTop = 0;
}

function closeGalleryOverlay() {
    if (!galleryOverlay) return;
    galleryOverlay.classList.remove('open');
    galleryOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (viewFullGalleryBtn) viewFullGalleryBtn.addEventListener('click', openGalleryOverlay);
if (galleryCloseBtn) galleryCloseBtn.addEventListener('click', closeGalleryOverlay);

// Portfolio items open the overlay (drill-down) instead of single-image lightbox
document.querySelectorAll('[data-gallery-open]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
        e.preventDefault();
        openGalleryOverlay();
    });
});

// ESC closes the overlay (only when lightbox is not open)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryOverlay && galleryOverlay.classList.contains('open')) {
        const lb = document.getElementById('lightbox');
        if (!lb.classList.contains('open')) closeGalleryOverlay();
    }
});

function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    lightboxImg.src = fullGalleryImages[index].src;
    lightboxImg.alt = fullGalleryImages[index].alt;
    caption.textContent = fullGalleryImages[index].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event && event.target.tagName === 'IMG') return;
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function changeLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= fullGalleryImages.length) currentLightboxIndex = 0;
    if (currentLightboxIndex < 0) currentLightboxIndex = fullGalleryImages.length - 1;

    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    lightboxImg.src = fullGalleryImages[currentLightboxIndex].src;
    lightboxImg.alt = fullGalleryImages[currentLightboxIndex].alt;
    caption.textContent = fullGalleryImages[currentLightboxIndex].alt;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('open')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'ArrowRight') changeLightbox(1);
});