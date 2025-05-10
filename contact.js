document.addEventListener('DOMContentLoaded', function() {
    // Matrix background effect
    const matrixBackground = document.querySelector('.matrix-background');
    const canvas = document.createElement('canvas');
    matrixBackground.appendChild(canvas);
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    
    const alphabet = katakana + latin + nums + symbols;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const rainDrops = [];
    
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    
    setInterval(draw, 30);
    
    // Terminal date
    const terminalDate = document.getElementById('terminal-date');
    const now = new Date();
    terminalDate.textContent = now.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric'
    });
    
    // Generate session ID
    const sessionId = document.getElementById('session-id');
    sessionId.textContent = generateSessionId();
    
    function generateSessionId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 16; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encrypting & Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Transmission Successful';
            submitBtn.style.background = 'linear-gradient(45deg, var(--dark), var(--secondary))';
            
            // Reset form
            contactForm.reset();
            
            // Add to terminal
            const terminalContent = document.querySelector('.terminal-content');
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.textContent = 'neodev@portfolio:~$ Message received from ' + document.getElementById('email').value;
            terminalContent.appendChild(newLine);
            terminalContent.scrollTop = terminalContent.scrollHeight;
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Send Secure Transmission</span><i class="fas fa-lock"></i>';
                submitBtn.style.background = 'linear-gradient(45deg, var(--dark), var(--primary))';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
    
    // Skill card animations
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.textShadow = '0 0 10px var(--primary)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1)';
            icon.style.textShadow = 'none';
        });
    });
    
    // Window resize handler
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
    
    // Terminal typing effect
    const typingElements = document.querySelectorAll('.typing');
    typingElements.forEach(el => {
        const text = el.getAttribute('data-text');
        let i = 0;
        const speed = 50;
        
        function typeWriter() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    });
});