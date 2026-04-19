document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, input, textarea, .glass-panel');

    // Only activate custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move inner cursor instantly
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });

        // Smooth follow for the outer circle
        setInterval(() => {
            posX += (mouseX - posX) / 6;
            posY += (mouseY - posY) / 6;
            follower.style.left = `${posX}px`;
            follower.style.top = `${posY}px`;
        }, 16);

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Typing Effect for Subtitle
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const textToType = "Digital Marketer & Strategist.";
        typingText.textContent = "";
        let i = 0;

        function type() {
            if (i < textToType.length) {
                typingText.textContent += textToType.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }

        // Start typing after initial load animations
        setTimeout(type, 800);
    }

    // 4. Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-up, .animate-scroll');

    // Initial check for elements already in view
    setTimeout(() => {
        checkScroll();
    }, 100);

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        animatedElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.classList.add('in-view');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);

    // 5. Contact Section Animated Background
    const contactCanvas = document.getElementById('contactCanvas');
    if (contactCanvas) {
        const ctx = contactCanvas.getContext('2d');
        let animationTime = 0;
        let animationProgress = 0;

        // Set canvas size
        function resizeCanvas() {
            const rect = contactCanvas.parentElement.getBoundingClientRect();
            contactCanvas.width = window.innerWidth;
            contactCanvas.height = rect.height;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * contactCanvas.width;
                this.y = Math.random() * contactCanvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > contactCanvas.width) this.x = 0;
                if (this.x < 0) this.x = contactCanvas.width;
                if (this.y > contactCanvas.height) this.y = 0;
                if (this.y < 0) this.y = contactCanvas.height;
            }

            draw(ctx) {
                ctx.fillStyle = `rgba(100, 200, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles = Array.from({ length: 30 }, () => new Particle());

        // Social media icons data
        const socialIcons = [
            { name: 'Facebook', x: 0.15, y: 0.25, color: '#1877F2' },
            { name: 'Instagram', x: 0.35, y: 0.15, color: '#E1306C' },
            { name: 'TikTok', x: 0.65, y: 0.2, color: '#00F7EF' },
            { name: 'Google Ads', x: 0.85, y: 0.3, color: '#4285F4' }
        ];

        // Draw SVG social media icon
        function drawSocialIcon(ctx, x, y, name, color, scale = 1) {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scale, scale);

            // Icon background glow
            ctx.fillStyle = `${color}20`;
            ctx.beginPath();
            ctx.arc(0, 0, 28, 0, Math.PI * 2);
            ctx.fill();

            // Icon border glow
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(0, 0, 25, 0, Math.PI * 2);
            ctx.stroke();

            ctx.globalAlpha = 1;
            ctx.fillStyle = color;

            // Draw icon based on name
            if (name === 'Facebook') {
                ctx.beginPath();
                ctx.arc(0, 0, 18, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.fillRect(-5, -12, 3, 12);
                ctx.fillRect(2, -10, 3, 20);
            } else if (name === 'Instagram') {
                ctx.fillStyle = `${color}00`;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect ? ctx.roundRect(-12, -12, 24, 24, 5) : ctx.rect(-12, -12, 24, 24);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, 8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(8, -8, 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (name === 'TikTok') {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(-3, -8, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(6, 2, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillRect(-5, 4, 15, 2);
            } else if (name === 'Google Ads') {
                const colors = ['#EA4335', '#4285F4', '#FBBC05', '#34A853'];
                ctx.fillStyle = colors[0];
                ctx.fillRect(-10, -10, 8, 8);
                ctx.fillStyle = colors[1];
                ctx.fillRect(2, -10, 8, 8);
                ctx.fillStyle = colors[2];
                ctx.fillRect(-10, 2, 8, 8);
                ctx.fillStyle = colors[3];
                ctx.fillRect(2, 2, 8, 8);
            }

            ctx.restore();
        }

        // Draw animated graph
        function drawGraph(ctx, x, y, width, height, progress) {
            const points = 6;
            const values = Array.from({ length: points }, (_, i) => 
                Math.sin(i * 0.5 + progress * 0.03) * 0.3 + 0.4 + i * 0.1
            );

            ctx.strokeStyle = '#00D4FF';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.7;

            ctx.beginPath();
            for (let i = 0; i < points; i++) {
                const xPos = x + (i / (points - 1)) * width;
                const yPos = y + height - values[i] * height;
                if (i === 0) ctx.moveTo(xPos, yPos);
                else ctx.lineTo(xPos, yPos);
            }
            ctx.stroke();

            // Fill area under curve
            ctx.globalAlpha = 0.15;
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.fill();

            ctx.globalAlpha = 1;

            // Draw grid lines
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < points; i++) {
                const xPos = x + (i / (points - 1)) * width;
                ctx.beginPath();
                ctx.moveTo(xPos, y);
                ctx.lineTo(xPos, y + height);
                ctx.stroke();
            }
        }

        // Draw laptop screen
        function drawLaptop(ctx, x, y, width, height, progress) {
            const bezelColor = '#1a1a2e';
            const screenColor = '#16213e';

            ctx.fillStyle = bezelColor;
            ctx.fillRect(x - width * 0.05, y - height * 0.05, width * 1.1, height * 1.15);

            ctx.fillStyle = screenColor;
            ctx.fillRect(x, y, width, height);

            // Screen border glow
            ctx.strokeStyle = '#00D4FF';
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.4;
            ctx.strokeRect(x, y, width, height);
            ctx.globalAlpha = 1;

            // Laptop stand
            ctx.fillStyle = bezelColor;
            ctx.beginPath();
            ctx.moveTo(x + width * 0.3, y + height);
            ctx.lineTo(x + width * 0.35, y + height + 15);
            ctx.lineTo(x + width * 0.65, y + height + 15);
            ctx.lineTo(x + width * 0.7, y + height);
            ctx.fill();

            // Dashboard content inside screen
            const padding = 10;
            const contentWidth = width - padding * 2;
            const contentHeight = height - padding * 2;

            // Draw simplified dashboard
            ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
            ctx.fillRect(x + padding, y + padding, contentWidth * 0.4, contentHeight * 0.3);

            ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
            ctx.fillRect(x + padding, y + padding + contentHeight * 0.4, contentWidth * 0.4, contentHeight * 0.35);

            // Animated dashboard bars
            ctx.fillStyle = '#00D4FF';
            const barCount = 5;
            for (let i = 0; i < barCount; i++) {
                const barHeight = (Math.sin(progress * 0.02 + i * 0.3) + 1) * 15 + 10;
                ctx.fillRect(
                    x + padding + contentWidth * 0.55 + i * 12,
                    y + padding + contentHeight * 0.7 - barHeight,
                    8,
                    barHeight
                );
            }
        }

        // Draw notification popup
        function drawNotification(ctx, x, y, text, type = 'like') {
            const width = 120;
            const height = 50;

            // Background
            ctx.fillStyle = 'rgba(20, 20, 40, 0.9)';
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(x, y, width, height, 8) : 
                         ctx.fillRect(x, y, width, height);
            ctx.fill();

            // Border
            const colors = {
                'like': '#FF1744',
                'comment': '#00D4FF',
                'share': '#FFD700',
                'view': '#00FF00'
            };
            ctx.strokeStyle = colors[type];
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.roundRect ? ctx.roundRect(x, y, width, height, 8) : 
                         ctx.strokeRect(x, y, width, height);
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Text
            ctx.fillStyle = colors[type];
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(text, x + width / 2, y + height / 2 + 4);
        }

        // Draw connecting lines
        function drawConnectingLines(ctx, progress) {
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
            ctx.lineWidth = 1;

            const w = contactCanvas.width;
            const h = contactCanvas.height;

            // Connect social icons
            for (let i = 0; i < socialIcons.length - 1; i++) {
                const x1 = w * socialIcons[i].x;
                const y1 = h * socialIcons[i].y;
                const x2 = w * socialIcons[i + 1].x;
                const y2 = h * socialIcons[i + 1].y;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                // Animated dot along the line
                const dotProgress = (progress * 0.05 + i * 0.25) % 1;
                ctx.fillStyle = `rgba(0, 212, 255, ${0.5 + Math.sin(progress * 0.05) * 0.3})`;
                ctx.beginPath();
                ctx.arc(
                    x1 + (x2 - x1) * dotProgress,
                    y1 + (y2 - y1) * dotProgress,
                    2,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
        }

        // Animation loop
        function animate() {
            // Clear canvas with fade effect
            ctx.fillStyle = 'rgba(8, 10, 7, 0.02)';
            ctx.fillRect(0, 0, contactCanvas.width, contactCanvas.height);

            animationTime += 1;
            animationProgress = (animationTime % 800) / 800; // 8 second loop at 100fps

            // Draw background gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, contactCanvas.height);
            gradient.addColorStop(0, 'rgba(8, 10, 7, 0)');
            gradient.addColorStop(0.5, 'rgba(30, 10, 50, 0.05)');
            gradient.addColorStop(1, 'rgba(10, 8, 30, 0.08)');
            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.3;
            ctx.fillRect(0, 0, contactCanvas.width, contactCanvas.height);
            ctx.globalAlpha = 1;

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });

            // Draw connecting lines
            drawConnectingLines(ctx, animationProgress);

            const w = contactCanvas.width;
            const h = contactCanvas.height;

            // Draw floating social media icons with parallax
            socialIcons.forEach((icon, index) => {
                const float = Math.sin(animationProgress * Math.PI * 2 + index) * 15;
                const scale = 0.7 + Math.sin(animationProgress * Math.PI * 2 + index * 0.5) * 0.2;
                drawSocialIcon(ctx, w * icon.x, h * icon.y + float, icon.name, icon.color, scale);
            });

            // Draw graphs
            drawGraph(ctx, w * 0.05, h * 0.6, w * 0.25, h * 0.25, animationProgress * 800);
            drawGraph(ctx, w * 0.7, h * 0.5, w * 0.25, h * 0.25, (animationProgress * 800 + 200) % 800);

            // Draw laptop screen
            const laptopFloat = Math.sin(animationProgress * Math.PI * 2) * 8;
            drawLaptop(ctx, w * 0.35, h * 0.2 + laptopFloat, w * 0.3, h * 0.3, animationProgress * 800);

            // Draw notifications
            const notifTypes = ['like', 'comment', 'share', 'view'];
            for (let i = 0; i < 4; i++) {
                const notifProgress = (animationProgress * 1.2 + i * 0.25) % 1;
                if (notifProgress < 0.6) {
                    const opacity = Math.max(0, 1 - (notifProgress - 0.4) * 2);
                    ctx.globalAlpha = opacity;
                    drawNotification(
                        ctx,
                        w * 0.15 + i * 40 + Math.sin(notifProgress * Math.PI) * 20,
                        h * 0.1 + notifProgress * 40,
                        ['+245', '12', '+8', '3.2k'][i],
                        notifTypes[i]
                    );
                    ctx.globalAlpha = 1;
                }
            }

            // Draw pulsing effect around laptop
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 + Math.sin(animationProgress * Math.PI * 2) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.35, 100 + Math.sin(animationProgress * Math.PI * 2) * 20, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;

            requestAnimationFrame(animate);
        }

        animate();
    }

});

