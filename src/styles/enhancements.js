/* ==========================================================================
   INTERACTIVE ENHANCEMENTS - GLOBAL MISSION FCI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Scroll Progress Bar & Navbar Glassmorphism ---
    const progressBar = document.getElementById('gmfci-scroll-progress');
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        // Progress Bar
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }
        
        // Navbar Scrolled State
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
    });

    // --- 2. Word Rotator ---
    const words = document.querySelectorAll('.gmfci-word');
    if (words.length > 0) {
        let currentIndex = 0;
        
        setInterval(() => {
            const currentWord = words[currentIndex];
            const nextIndex = (currentIndex + 1) % words.length;
            const nextWord = words[nextIndex];
            
            currentWord.classList.remove('active');
            currentWord.classList.add('exit');
            
            nextWord.classList.remove('exit');
            nextWord.classList.add('active');
            
            currentIndex = nextIndex;
        }, 3000);
    }
    
    // --- 3. Scroll Down Arrow Action ---
    const scrollArrow = document.querySelector('.gmfci-scroll-indicator');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // --- 4. Animated Stats Counters ---
    const statNums = document.querySelectorAll('.gmfci-stat-num');
    if (statNums.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-target'), 10);
                    const suffix = target.getAttribute('data-suffix') || '';
                    animateValue(target, 0, finalValue, 2000, suffix);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);
        
        statNums.forEach(num => {
            observer.observe(num);
        });
    }
    
    function animateValue(obj, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.floor(easeProgress * (end - start) + start);
            
            obj.innerHTML = currentVal.toLocaleString() + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end.toLocaleString() + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // --- 5. Custom Particles System (class-based — supports multiple canvases) ---
    const particleCanvases = document.querySelectorAll('.gmfci-particles-canvas');
    particleCanvases.forEach(function(canvas) {
        initParticles(canvas);
    });
});

function initParticles(canvas) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const shapes = ['circle', 'cross', 'diamond'];
    
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
            this.size = Math.random() * 4 + 2;
            this.speed = Math.random() * 1 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.shape = shapes[Math.floor(Math.random() * shapes.length)];
            this.angle = Math.random() * Math.PI * 2;
            this.swing = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.y -= this.speed;
            this.x += Math.sin(this.angle) * this.swing;
            this.angle += 0.02;
            if (this.y < -50) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * 0.2);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#D9A857';
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.shape === 'diamond') {
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.lineTo(this.size, 0);
                ctx.lineTo(0, this.size);
                ctx.lineTo(-this.size, 0);
                ctx.closePath();
                ctx.fill();
            } else if (this.shape === 'cross') {
                ctx.beginPath();
                ctx.rect(-this.size/4, -this.size, this.size/2, this.size*2);
                ctx.rect(-this.size, -this.size/4, this.size*2, this.size/2);
                ctx.fill();
            }
            
            ctx.restore();
        }
    }
    
    const particleCount = Math.min(Math.floor(canvas.width / 15), 100);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}
