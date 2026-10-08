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
document.querySelectorAll('.section-grid, .service-card, .testimonial, .faq-item, .event-project-card, .contact-info, .contact-form').forEach(el => {
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

// ===== PER-EVENT GALLERY DATA =====
const eventGalleries = {
    mandy: {
        title: "Mandy & AK's",
        images: [
            { src: 'images/mandy-1.jpg',  alt: "Mandy & AK's — ceremony" },
            { src: 'images/mandy-2.jpg',  alt: "Mandy & AK's — florals" },
            { src: 'images/mandy-3.jpg',  alt: "Mandy & AK's — reception" },
            { src: 'images/mandy-4.jpg',  alt: "Mandy & AK's — decor" },
            { src: 'images/mandy-5.jpg',  alt: "Mandy & AK's — celebration" },
            { src: 'images/mandy-6.jpg',  alt: "Mandy & AK's — details" },
            { src: 'images/mandy-7.jpg',  alt: "Mandy & AK's — venue" },
            { src: 'images/mandy-8.jpg',  alt: "Mandy & AK's — baraat" },
            { src: 'images/mandy-9.jpg',  alt: "Mandy & AK's — stage" },
            { src: 'images/mandy-10.jpg', alt: "Mandy & AK's — dance floor" },
        ]
    },
    hyatt: {
        title: "Hyatt Regency Grand Cypress",
        images: [
            { src: 'images/hyatt-1.jpg', alt: 'Hyatt Regency Grand Cypress — event design' },
            { src: 'images/hyatt-2.jpg', alt: 'Hyatt Regency Grand Cypress — florals' },
            { src: 'images/hyatt-3.jpg', alt: 'Hyatt Regency Grand Cypress — tablescape' },
            { src: 'images/hyatt-4.jpg', alt: 'Hyatt Regency Grand Cypress — ceremony' },
            { src: 'images/hyatt-5.jpg', alt: 'Hyatt Regency Grand Cypress — reception' },
            { src: 'images/hyatt-6.jpg', alt: 'Hyatt Regency Grand Cypress — decor' },
        ]
    },
    hardrock: {
        title: "Hard Rock Daytona Beach",
        images: [
            { src: 'images/hardrock-1.jpg', alt: 'Hard Rock Daytona Beach — event' },
            { src: 'images/hardrock-2.jpg', alt: 'Hard Rock Daytona Beach — florals' },
            { src: 'images/hardrock-3.jpg', alt: 'Hard Rock Daytona Beach — decor' },
            { src: 'images/hardrock-4.jpg', alt: 'Hard Rock Daytona Beach — stage' },
            { src: 'images/hardrock-5.jpg', alt: 'Hard Rock Daytona Beach — reception' },
            { src: 'images/hardrock-6.jpg', alt: 'Hard Rock Daytona Beach — details' },
            { src: 'images/hardrock-7.jpg', alt: 'Hard Rock Daytona Beach — ceremony' },
            { src: 'images/hardrock-8.jpg', alt: 'Hard Rock Daytona Beach — celebration' },
        ]
    }
};

// ===== GALLERY OVERLAY (per-event drill-down) =====
const galleryOverlay = document.getElementById('galleryOverlay');
const galleryOverlayGrid = document.getElementById('galleryOverlayGrid');
const galleryOverlayTitle = document.getElementById('galleryOverlayTitle');
const galleryCloseBtn = document.getElementById('galleryCloseBtn');

// Currently active event's images (for lightbox navigation within event only)
let currentEventImages = [];

// Open gallery overlay for a specific event
function openEventGallery(eventKey) {
    const eventData = eventGalleries[eventKey];
    if (!eventData || !galleryOverlay || !galleryOverlayGrid) return;

    currentEventImages = eventData.images;

    // Set the title
    galleryOverlayTitle.textContent = eventData.title;

    // Clear and rebuild the grid
    galleryOverlayGrid.innerHTML = '';
    eventData.images.forEach((img, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-overlay-item';
        item.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy"><div class="gallery-overlay-zoom">&#43;</div>`;
        item.addEventListener('click', () => openLightbox(i));
        galleryOverlayGrid.appendChild(item);
    });

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

// Bind event project cards
document.querySelectorAll('.event-project-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const eventKey = card.getAttribute('data-event');
        openEventGallery(eventKey);
    });
});

if (galleryCloseBtn) galleryCloseBtn.addEventListener('click', closeGalleryOverlay);

// ESC closes the overlay (only when lightbox is not open)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryOverlay && galleryOverlay.classList.contains('open')) {
        const lb = document.getElementById('lightbox');
        if (!lb.classList.contains('open')) closeGalleryOverlay();
    }
});

// ===== LIGHTBOX (navigates within current event only) =====
let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    lightboxImg.src = currentEventImages[index].src;
    lightboxImg.alt = currentEventImages[index].alt;
    caption.textContent = currentEventImages[index].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event && event.target.tagName === 'IMG') return;
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('open');
    // Restore overflow only if gallery overlay is still open
    if (galleryOverlay && galleryOverlay.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function changeLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= currentEventImages.length) currentLightboxIndex = 0;
    if (currentLightboxIndex < 0) currentLightboxIndex = currentEventImages.length - 1;

    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    lightboxImg.src = currentEventImages[currentLightboxIndex].src;
    lightboxImg.alt = currentEventImages[currentLightboxIndex].alt;
    caption.textContent = currentEventImages[currentLightboxIndex].alt;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'ArrowRight') changeLightbox(1);
});