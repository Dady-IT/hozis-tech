// HOZIS-TECH - Interactive UX/UI Scripts

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.visibility = 'hidden';
                    preloader.style.display = 'none';
                }, 500);
            }, 800); // Temps d'attente court pour le plaisir visuel
        }
    });

    // 2. Custom Cursor (Désactivé sur mobile/tactile)
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    let isTouchDevice = false;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        isTouchDevice = true;
    }

    if (cursor && cursorTrail && !isTouchDevice) {
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Animation de la traînée avec inertie
        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            requestAnimationFrame(animateTrail);
        }
        animateTrail();

        // Effets au survol des éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .btn, .tech-logo, .service-card, .portfolio-item, .form-control');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(0, 245, 255, 0.1)';
                cursor.style.borderColor = '#ff0080';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = '#00f5ff';
            });
        });
    } else {
        // Cacher les éléments du curseur sur tactile
        if (cursor) cursor.style.display = 'none';
        if (cursorTrail) cursorTrail.style.display = 'none';
    }

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Animation des lignes du hamburger
            const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
            if (navLinks.classList.contains('active')) {
                lines[0].style.transform = 'translateY(8px) rotate(45deg)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });

        // Fermer le menu mobile en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== mobileMenuToggle) {
                navLinks.classList.remove('active');
                const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });

        // Fermer le menu lors du clic sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            });
        });
    }

    // 5. Generate Particles in Hero Banner
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Randomisation
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = Math.random() * 20 + 'px';
            
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
            particle.style.opacity = Math.random() * 0.6 + 0.2;
            
            heroParticles.appendChild(particle);
        }
    }

    // 6. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .contact-card, .tech-logo, .about-text, .about-image-wrapper, .domotique-list li, .contact-form-wrapper'
    );
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    // Arrêter d'observer une fois l'élément révélé
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(35px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            revealObserver.observe(el);
        });
    } else {
        // Fallback si l'API n'est pas supportée
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // 7. Stats Counter Animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing quadratic out
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);

            // Gérer le formatage (ex: ajouter le + ou le %)
            const suffix = element.getAttribute('data-suffix') || '';
            element.textContent = currentValue.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + suffix;
            }
        }
        requestAnimationFrame(updateCounter);
    }

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const rawText = stat.textContent.trim();
                        // Extraire le nombre et le suffixe (+, %, etc.)
                        const numberMatch = rawText.match(/[0-9.]+/);
                        if (numberMatch) {
                            const targetVal = parseFloat(numberMatch[0]);
                            const suffix = rawText.replace(numberMatch[0], '');
                            
                            stat.setAttribute('data-suffix', suffix);
                            animateCounter(stat, targetVal, 2000);
                        }
                    });
                    // Ne déclencher qu'une seule fois
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    } else if (statsSection) {
        // Fallback sans animation
        // Les valeurs statiques restent affichées
    }

});
