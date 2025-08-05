// ===== PORTFOLIO FUTURISTA: SCRIPT PRINCIPAL =====

// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // --- AOS INITIALIZER ---
    AOS.init({ duration: 1000, once: true, offset: 50 });

    // --- CURSOR & AURORA GLOW LOGIC ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const auroraGlow = document.querySelector('.aurora-glow');
    const interactiveElements = document.querySelectorAll('a, button, .hexagon, .project-card, .social-icon, .theme-btn');
    window.addEventListener('mousemove', (e) => {
        const { clientX: posX, clientY: posY } = e;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
        auroraGlow.animate({ left: `${posX - 400}px`, top: `${posY - 400}px`}, { duration: 3000, fill: "forwards" });
    });
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });

    // --- SCROLL PROGRESS BAR LOGIC ---
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const scrollPercentage = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });

    // --- THEME TOGGLER LOGIC ---
    const themeToggler = document.getElementById('theme-toggler');
    const themeTogglerIcon = themeToggler.querySelector('i');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    // Função para aplicar tema
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        themeTogglerIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        localStorage.setItem('portfolio-theme', theme);
        updateParticlesColor(theme);
        updateContactParticlesColor(theme);
    };
    applyTheme(savedTheme);

    themeToggler.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // --- PARTICLES.JS HERO LOGIC ---
    const particlesConfigDark = {
        particles: { line_linked: { color: "#2a2a2a" } }
    };
    const particlesConfigLight = {
        particles: { line_linked: { color: "#d2d2d7" } }
    };
    function initParticles(theme) {
        const baseConfig = {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ff8c00" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
            },
            "retina_detect": true
        };
        baseConfig.particles.line_linked.color = theme === 'dark' ? particlesConfigDark.particles.line_linked.color : particlesConfigLight.particles.line_linked.color;
        particlesJS('particles-js', baseConfig);
    }
    function updateParticlesColor(theme) {
        if (window.pJSDom && window.pJSDom[0]) {
            const color = theme === 'dark' ? '#2a2a2a' : '#d2d2d7';
            window.pJSDom[0].pJS.particles.line_linked.color = color;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
    initParticles(savedTheme);

    // --- PARTICLES.JS CONTACT LOGIC ---
    function initContactParticles(theme) {
        const lineColor = theme === 'dark' ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 140, 0, 0.5)';
        particlesJS('contact-particles', {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ff8c00" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.8, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 120,
                    "color": lineColor,
                    "opacity": 1,
                    "width": 1
                },
                "move": {
                    "enable": true, "speed": 2, "direction": "none",
                    "random": true, "straight": false, "out_mode": "out"
                }
            },
            "interactivity": { "enable": false },
            "retina_detect": true
        });
    }
    // Atualização dinâmica da cor das partículas do contato
    function updateContactParticlesColor(theme) {
        if (window.pJSDom && window.pJSDom[1]) {
            const lineColor = theme === 'dark' ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 140, 0, 0.5)';
            window.pJSDom[1].pJS.particles.line_linked.color_rgb_line = rgbaToRgbObj(lineColor);
            window.pJSDom[1].pJS.fn.particlesRefresh();
        }
    }
    // Helper para converter rgba string para objeto rgb
    function rgbaToRgbObj(rgba) {
        let result = rgba.match(/\d+/g);
        return result ? { r: parseInt(result[0]), g: parseInt(result[1]), b: parseInt(result[2]) } : null;
    }
    initContactParticles(savedTheme);

    // --- OPTIONAL: Smooth scroll para links de âncora ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- OPTIONAL: Feedback visual ao enviar formulário de contato ---
    const contactForm = document.querySelector('form[action^="https://formspree.io"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Opcional: mostrar loading ou mensagem de sucesso
        });
    }
});
