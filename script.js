document.addEventListener('DOMContentLoaded', () => {
    // Canvas Particle System
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = Math.random() * 0.5 - 0.25; // Subtle horizontal drift
            this.vy = Math.random() * -0.5 - 0.2; // Move upwards (antigravity)
            this.size = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.targetAlpha = this.alpha;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around
            if (this.y < -10) {
                this.y = height + 10;
                this.x = Math.random() * width;
            }
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 200, 255, ${this.alpha})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const numParticles = Math.min(width / 10, 100);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    initParticles();

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isFlex = navLinks.style.display === 'flex';

            if (window.innerWidth <= 768) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navLinks.style.display = 'none';
                } else {
                    navLinks.classList.add('active');
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '70px';
                    navLinks.style.right = '20px';
                    navLinks.style.background = 'rgba(15, 32, 39, 0.95)';
                    navLinks.style.padding = '20px';
                    navLinks.style.borderRadius = '15px';
                    navLinks.style.border = '1px solid rgba(255,255,255,0.1)';
                    navLinks.style.width = '200px';
                }
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navLinks.style.display = 'none';
                }
            }
        });
    });

// Contact Form Logic
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get values
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const subject = this.querySelector('input[name="subject"]').value;
            const message = this.querySelector('textarea[name="message"]').value;

            // Recipient
            const recipient = "nachammaisubbu2006@gmail.com";

            // Gmail Subject & Body
            const emailSubject = `Contact Form: ${subject}`;
            const emailBody =
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`;

            // Gmail Compose URL
            const gmailURL =
                "https://mail.google.com/mail/?view=cm&fs=1" +
                "&to=" + encodeURIComponent(recipient) +
                "&su=" + encodeURIComponent(emailSubject) +
                "&body=" + encodeURIComponent(emailBody);

            // Open Gmail in new tab
            window.open(gmailURL, "_blank");
        });
    }


    
    // Back to Top Button Logic
    // Create button element
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    // Scroll to Top on Click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


});
