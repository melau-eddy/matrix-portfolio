document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect for bio
    const typewriter = document.getElementById('typewriter');
    const bioText = `
        > NAME: Melau Eddy
        > ROLE: Power Learn Intern
        > SPECIALIZATION: AI and Software Development
        > LOCATION: Dedan Kimathi University of Technology, Nyeri county
        > 
        > BIO:
        > Passionate about technology and cybersecurity.
        > Currently mastering full-stack development.
        > Enjoys solving complex problems with code.
        > 
        > TYPE 'help' IN TERMINAL FOR COMMANDS
    `;
    
    let i = 0;
    const typingSpeed = 20; // milliseconds per character
    
    function typeWriter() {
        if (i < bioText.length) {
            typewriter.innerHTML += bioText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    typeWriter();
    
    // Animate hexagons on scroll
    const hexagons = document.querySelectorAll('.hexagon');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.5 });
    
    hexagons.forEach(hex => {
        hex.style.opacity = '0';
        hex.style.transform = 'scale(0.5)';
        hex.style.transition = 'all 0.5s ease';
        observer.observe(hex);
    });
    
    // Generate binary rain
    const binaryRain = document.querySelector('.binary-rain');
    const chars = '01';
    
    function createBinary() {
        const span = document.createElement('span');
        span.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
        span.style.left = Math.random() * 100 + 'vw';
        span.style.animationDuration = (Math.random() * 3 + 2) + 's';
        span.style.opacity = Math.random();
        binaryRain.appendChild(span);
        
        setTimeout(() => {
            span.remove();
        }, 5000);
    }
    
    setInterval(createBinary, 100);
});