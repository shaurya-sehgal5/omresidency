/* ============================================
   Om Residency — Complete JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // BLOCK IMAGE SLIDERS
    // ========================================
    const sliders = document.querySelectorAll('[data-slider]');

    sliders.forEach(wrapper => {
        const track = wrapper.querySelector('.block-slider');
        const images = track.querySelectorAll('img');
        const dots = wrapper.querySelectorAll('.block-image-dot');
        const prevBtn = wrapper.querySelector('.slider-arrow.prev');
        const nextBtn = wrapper.querySelector('.slider-arrow.next');
        let currentIndex = 0;
        const total = images.length;

        function goToSlide(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            currentIndex = index;

            // Move the slider track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update active-slide class
            images.forEach((img, i) => {
                img.classList.toggle('active-slide', i === currentIndex);
            });

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
             const blurBg = wrapper.querySelector('.blur-bg');
    if (blurBg) blurBg.src = images[currentIndex].src;

    setTimeout(() => { isTransitioning = false; }, 520);
        }

        // Arrow buttons
        if (prevBtn) prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(currentIndex - 1);
        });
        if (nextBtn) nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(currentIndex + 1);
        });

        // Dot clicks
        dots.forEach((dot, i) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(i);
            });
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goToSlide(currentIndex + 1); // swipe left → next
                else goToSlide(currentIndex - 1); // swipe right → prev
            }
        }, { passive: true });

        // Auto-advance every 4 seconds
        let autoTimer = setInterval(() => goToSlide(currentIndex + 1), 4000);

        // Pause auto on hover
        wrapper.addEventListener('mouseenter', () => clearInterval(autoTimer));
        wrapper.addEventListener('mouseleave', () => {
            autoTimer = setInterval(() => goToSlide(currentIndex + 1), 4000);
        });
    });

    // ========================================
    // NAVBAR — Scroll Effect & Mobile Menu
    // ========================================
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Sticky navbar background on scroll
    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // Initial check

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
        document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            document.body.style.overflow = '';
        });
    });

    // Active link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const highlightNav = () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', highlightNav);

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // GALLERY — Filtering & Lightbox
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Filter gallery
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ========================================
    // REVIEWS CAROUSEL
    // ========================================
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.review-prev');
    const nextBtn = document.querySelector('.review-next');
    let reviewIndex = 0;

    const getCardsPerView = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };

    const updateReviewCarousel = () => {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, reviewCards.length - cardsPerView);
        reviewIndex = Math.min(reviewIndex, maxIndex);

        const cardWidth = reviewCards[0] ? reviewCards[0].offsetWidth + 24 : 0; // 24 = gap
        reviewsTrack.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (reviewIndex > 0) {
                reviewIndex--;
                updateReviewCarousel();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, reviewCards.length - cardsPerView);
            if (reviewIndex < maxIndex) {
                reviewIndex++;
                updateReviewCarousel();
            }
        });
    }

    window.addEventListener('resize', updateReviewCarousel);

    // Auto-rotate reviews every 5 seconds
    setInterval(() => {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, reviewCards.length - cardsPerView);
        reviewIndex = reviewIndex >= maxIndex ? 0 : reviewIndex + 1;
        updateReviewCarousel();
    }, 5000);

    // ========================================
    // BOOKING FORM
    // ========================================
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const formData = new FormData(bookingForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Validate required fields
            const required = ['fullName', 'phone', 'email', 'college', 'block'];
            const missing = required.filter(field => !data[field] || data[field].trim() === '');

            if (missing.length > 0) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Phone validation
            if (!/^[6-9]\d{9}$/.test(data.phone)) {
                showFormMessage('Please enter a valid 10-digit phone number.', 'error');
                return;
            }

            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Success — build WhatsApp message with form data
            const whatsappMsg = `Hi! I'm interested in a room at Om Residency.%0A%0A*Name:* ${data.fullName}%0A*Phone:* ${data.phone}%0A*Email:* ${data.email}%0A*College:* ${data.college}%0A*Preferred Block:* ${data.block}%0A*Move-in Date:* ${data.moveIn || 'Not specified'}%0A*Message:* ${data.message || 'N/A'}`;

            showFormMessage('🎉 Enquiry sent successfully! We\'ll contact you shortly. Redirecting to WhatsApp...', 'success');

            // Redirect to WhatsApp after a short delay
            setTimeout(() => {
                window.open(`https://wa.me/+918607184718?text=${whatsappMsg}`, '_blank');
            }, 2000);

            bookingForm.reset();
        });
    }

    function showFormMessage(msg, type) {
        // Remove existing message if any
        const existing = document.querySelector('.form-message');
        if (existing) existing.remove();

        const div = document.createElement('div');
        div.className = `form-message form-message-${type}`;
        div.textContent = msg;
        div.style.cssText = `
            padding: 14px 24px;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 16px;
            text-align: center;
            animation: fadeInUp 0.4s ease;
            ${type === 'success'
                ? 'background: rgba(37,211,102,0.2); color: #25D366; border: 1px solid rgba(37,211,102,0.3);'
                : 'background: rgba(255,71,87,0.2); color: #ff4757; border: 1px solid rgba(255,71,87,0.3);'
            }
        `;

        const submitRow = document.querySelector('.form-submit-row');
        if (submitRow) submitRow.after(div);

        // Auto-remove after 5 seconds
        setTimeout(() => div.remove(), 5000);
    }

    // ========================================
    // SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // COUNTERS ANIMATION (Trust Badge)
    // ========================================
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                let current = 0;
                const increment = count / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= count) {
                        current = count;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(current) + '+';
                }, 16);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========================================
    // CSS ANIMATION KEYFRAME INJECTION
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

});
