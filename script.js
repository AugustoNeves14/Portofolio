// Adicione esta nova função de inicialização dentro do seu script.js,
// junto com a outra função 'initParticles' que já existe.

document.addEventListener('DOMContentLoaded', function() {
    
    // ... (todo o seu código JS existente) ...

    // --- NOVA INICIALIZAÇÃO PARA AS PARTÍCULAS DO CONTATO ---
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
                    "color": lineColor, // Cor dinâmica baseada no tema
                    "opacity": 1,
                    "width": 1
                },
                "move": {
                    "enable": true, "speed": 2, "direction": "none",
                    "random": true, "straight": false, "out_mode": "out"
                }
            },
            "interactivity": { "enable": false }, // Desativamos a interatividade para ser um fundo puro
            "retina_detect": true
        });
    }

    // Agora, precisamos garantir que esta nova animação também seja iniciada e atualizada.
    // Encontre a sua função `applyTheme` e adicione uma chamada a uma nova função de atualização.

    // Modifique sua função applyTheme assim:
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        themeToggler.querySelector('i').className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        localStorage.setItem('portfolio-theme', theme);
        updateParticlesColor(theme); // Função que você já tem
        updateContactParticlesColor(theme); // << ADICIONE ESTA NOVA LINHA
    };
    
    // E adicione esta nova função de atualização em algum lugar do script:
    function updateContactParticlesColor(theme) {
        if (window.pJSDom && window.pJSDom[1]) { // [1] porque esta é a segunda instância do particles.js
            const lineColor = theme === 'dark' ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 140, 0, 0.5)';
            window.pJSDom[1].pJS.particles.line_linked.color_rgb_line = hexToRgb(lineColor); // A API do particles.js é um pouco peculiar
            window.pJSDom[1].pJS.fn.particlesRefresh();
        }
    }
    // Helper function para a API do particles.js (se não tiver uma similar)
    function hexToRgb(hex) {
        // Esta função precisa lidar com formatos como rgba(r,g,b,a)
        let result = hex.match(/\d+/g);
        return result ? { r: parseInt(result[0]), g: parseInt(result[1]), b: parseInt(result[2]) } : null;
    }


    // Finalmente, chame a nova função de inicialização quando a página carregar:
    initContactParticles(savedTheme);

});

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. AOS INITIALIZER ---
    AOS.init({ duration: 1000, once: true, offset: 50 });

    // --- 2. CURSOR & AURORA GLOW LOGIC ---
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

    // --- 3. SCROLL PROGRESS BAR LOGIC ---
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const scrollPercentage = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });

    // --- 4. THEME TOGGLER LOGIC ---
    const themeToggler = document.getElementById('theme-toggler');
    const themeTogglerIcon = themeToggler.querySelector('i');
    const htmlElement = document.documentElement;
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        themeTogglerIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        localStorage.setItem('portfolio-theme', theme);
        updateParticlesColor(theme); // Update particles color on theme change
    };
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);
    themeToggler.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
    
    // --- 5. PARTICLES.JS LOGIC & THEME ADAPTATION ---
    const particlesConfigDark = {
        particles: { line_linked: { color: "#2a2a2a" } },
        // ... (resto da configuração do particles.js)
    };
    const particlesConfigLight = {
        particles: { line_linked: { color: "#d2d2d7" } },
        // ... (resto da configuração)
    };
    
    function initParticles(theme) {
        const baseConfig = {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ff8c00" }, "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": true }, "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
            },
            "retina_detect": true
        };
        const themeConfig = theme === 'dark' ? particlesConfigDark : particlesConfigLight;
        // Deep merge configs (simple version)
        baseConfig.particles.line_linked.color = themeConfig.particles.line_linked.color;
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
});