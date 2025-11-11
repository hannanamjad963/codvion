// Onload 
window.addEventListener('load', () => {

    document.documentElement.scrollTop = '0';
    document.body.scrollTop = '0';
    // Preloader
    setTimeout(function () {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('onload');
        }
        document.body.classList.remove('loading');

        if (typeof StartsiteScript === 'function') {
            StartsiteScript();
        }
    }, 800);
});

function StartsiteScript() {

    // Scroll Animation Start
    const boxes = document.querySelectorAll('.a-o-s');

    function checkScroll() {
        const triggerPoint = window.innerHeight * 0.85;
        boxes.forEach(box => {
            const rect = box.getBoundingClientRect();
            if (rect.top <= triggerPoint && rect.bottom > 0) {
                box.classList.add('aos');
            }
        });
    }

    // Throttle scroll listener for better FPS
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                checkScroll();
                scrollTimeout = null;
            }, 100);
        }
    }, { passive: true });

    window.addEventListener('resize', checkScroll);
    checkScroll(); // run once immediately
    // Scroll Animation End


    // ---------- Mobile nav toggle ----------
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.header .header-items nav');
    navToggle.addEventListener('click', () => navMenu.classList.toggle('show'));

    if (navToggle && navMenu) {
        navMenu.addEventListener('click', e => {
            if (e.target.tagName === 'A') navMenu.classList.remove('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (ev) => {
            if (!navMenu.contains(ev.target) && !navToggle.contains(ev.target)) {
                navMenu.classList.remove('show');
            }
        });
    }

    // Sec nav bar
    const activelink = document.querySelectorAll('.header-items nav a');
    let scrollHandlerActive = true;
    activelink.forEach(gg => {
        gg.addEventListener('click', function () {
            scrollHandlerActive = false;
            activelink.forEach(aa => {
                aa.classList.remove('active');
            });
            this.classList.add('active');
            setTimeout(() => {
                scrollHandlerActive = true;
            }, 1000);
        });
    });
    window.addEventListener('scroll', function () {
        if (!scrollHandlerActive) return;
        var scrollPos = document.documentElement.scrollTop + 250;
        document.querySelectorAll('section').forEach(function (currSection) {
            var sectionTop = currSection.offsetTop;
            var sectionHeight = currSection.offsetHeight;
            var sectionId = currSection.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                document.querySelectorAll('.header-items nav a').forEach(function (link) {
                    link.classList.remove('active');
                });
                var activeLink = document.querySelector('.header-items nav a[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    // Nav bar end

    // Navbar Animation Start
    const nav_bar_ani = document.querySelector('.header-section');
    window.addEventListener('scroll', function () {
        if (document.documentElement.scrollTop >= 100 || document.body.scrollTop >= 100) {
            nav_bar_ani.classList.add('down');
        } else {
            nav_bar_ani.classList.remove('down');
        }
    });
    // Navbar Animation End

    // Back to top start
    const back_to_top = document.getElementById('backtotop');
    window.addEventListener('scroll', function () {
        if (document.documentElement.scrollTop >= 400 || document.body.scrollTop >= 400) {
            back_to_top.classList.add('show');
        } else {
            back_to_top.classList.remove('show');
        }
    });
    back_to_top.addEventListener('click', function () {
        document.documentElement.scrollTop = 0;
    });
    // Back to top End


    // Counter Animation Start
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        });
    }
    const counterSection = document.querySelector('.about-counter');
    if (counterSection) {
        let hasAnimated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        observer.observe(counterSection);
    }

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00D2D3'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00D2D3',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
    // Js Particles End

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';

                    }
                }
            });
        });
    });


    // Contact Form Start

    // const form = document.getElementById('contactForm');
    // const formContent = document.getElementById('formContent');
    // const successMessage = document.getElementById('successMessage');
    // form.addEventListener('submit', function (e) {
    //     e.preventDefault();
    //     document.querySelectorAll('.form-group').forEach(group => {
    //         group.classList.remove('error');
    //     });
    //     let isValid = true;
    //     const name = document.getElementById('name');
    //     if (name.value.trim() === '') {
    //         name.closest('.form-group').classList.add('error');
    //         isValid = false;
    //     }
    //     const email = document.getElementById('email');
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailPattern.test(email.value)) {
    //         email.closest('.form-group').classList.add('error');
    //         isValid = false;
    //     }
    //     const message = document.getElementById('message');
    //     if (message.value.trim() === '') {
    //         message.closest('.form-group').classList.add('error');
    //         isValid = false;
    //     }
    //     if (isValid) {
    //         formContent.style.display = 'none';
    //         successMessage.classList.add('active');
    //         setTimeout(() => {
    //             form.reset();
    //             successMessage.classList.remove('active');
    //             formContent.style.display = 'block';
    //         }, 3000);
    //     }
    // });
    // document.querySelectorAll('input, textarea').forEach(input => {
    //     input.addEventListener('input', function () {
    //         this.closest('.form-group').classList.remove('error');
    //     });
    // });

    // Contact Form End


    // Form Submittion on Netlify Start

    // const form_submit = document.getElementById('contactForm');

    // form_submit.addEventListener('submit', async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(form);
    //     try {
    //         await fetch('/', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //             body: new URLSearchParams(formData).toString()
    //         });

    //         alert('Thank you! Your message has been sent successfully.');
    //         form_submit.reset();
    //     } catch (error) {
    //         alert('Oops! There was a problem submitting your form.');
    //         console.error('Form submission error:', error);
    //     }
    // });

    // Form Submission on Netlify End


    // Netlify Form Handler with Alert

    // const form = document.getElementById('contactForm');
    // const formSuccessMessage = document.getElementById('form-success-message');
    // const formErrorMessage = document.getElementById('form-error-message');
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let formData = new FormData(form);
    //     fetch('/', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //         body: new URLSearchParams(formData).toString()
    //     })
    //         .then(() => {
    //             formSuccessMessage.style.display = 'block';
    //             formErrorMessage.style.display = 'none';
    //             alert('Thank you! Your message has been sent successfully.');
    //             form.style.display = 'none';
    //             form.reset();
    //             setTimeout(() => {
    //                 form.style.display = 'block';
    //                 formSuccessMessage.style.display = 'none';
    //             }, 5000);
    //         })
    //         .catch((error) => {
    //             formErrorMessage.innerHTML = '<p>✗ Oops! Something went wrong. Please try again.</p>';
    //             formErrorMessage.style.display = 'block';
    //             formSuccessMessage.style.display = 'none';
    //             alert('✗ Error: Failed to send message. Please try again.');
    //         });
    // };
    // form.addEventListener('submit', handleSubmit);

    function submitNetlifyFormAjax(form) {
        const formName = form.querySelector('input[name="form-name"]').value;
        const fd = new FormData(form);
        if (!fd.get('form-name')) fd.append('form-name', formName);

        return fetch('/', {
            method: 'POST',
            body: fd
        });
    }

    function showModal(message) {
        const backdrop = document.getElementById('modalBackdrop');
        const msg = document.getElementById('modalMessage');
        msg.textContent = message;
        backdrop.style.display = 'flex';
    }

    function hideModal() {
        document.getElementById('modalBackdrop').style.display = 'none';
    }

    document.getElementById('modalClose').addEventListener('click', hideModal);
    document.getElementById('modalBackdrop').addEventListener('click', (e) => {
        if (e.target.id === 'modalBackdrop') hideModal();
    });

    function hookForm(formId, successId, errorId, successText) {
        const form = document.getElementById(formId);
        const ok = document.getElementById(successId);
        const er = document.getElementById(errorId);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            ok.style.display = 'none';
            er.style.display = 'none';

            try {
                const res = await submitNetlifyFormAjax(form);
                if (res.ok) {
                    form.reset();
                    ok.style.display = 'block';
                    showModal(successText);
                } else {
                    er.style.display = 'block';
                }
            } catch (err) {
                er.style.display = 'block';
            }
        });
    }

    // Attach both forms
    hookForm('contactForm', 'contactSuccess', 'contactError', 'Contact form submitted successfully.');
    hookForm('feedbackForm', 'feedbackSuccess', 'feedbackError', 'Feedback form submitted successfully.');
}