document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('command-input');
    const terminalOutput = document.getElementById('terminal');
    const mainNav = document.getElementById('main-nav');

    // Available commands
    const commands = {
        help: () => `
            <p><span class="highlight">Available Commands:</span></p>
            <p><span class="command">about</span> - View my background</p>
            <p><span class="command">skills</span> - See my technical skills</p>
            <p><span class="command">projects</span> - Explore my work</p>
            <p><span class="command">contact</span> - Get in touch</p>
            <p><span class="command">clear</span> - Reset terminal</p>
            <p><span class="command">menu</span> - Toggle navigation</p>
        `,
        about: () => window.location.href = 'about.html',
        skills: () => window.location.href = 'skills.html',
        projects: () => window.location.href = 'projects.html',
        contact: () => window.location.href = 'contact.html',
        clear: () => {
            terminalOutput.innerHTML = '';
            return '';
        },
        menu: () => {
            mainNav.classList.toggle('active');
            return 'Navigation menu toggled.';
        }
    };

    // Handle command input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';

            // Add command to terminal
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `
                <span class="user">user@powerlearn</span>:<span class="path">~</span>$ <span class="command">${command}</span>
            `;
            terminalOutput.appendChild(commandLine);

            // Process command
            if (commands[command]) {
                const output = commands[command]();
                if (typeof output === 'string') {
                    const outputLine = document.createElement('div');
                    outputLine.className = 'terminal-output';
                    outputLine.innerHTML = output;
                    terminalOutput.appendChild(outputLine);
                }
            } else {
                const errorLine = document.createElement('div');
                errorLine.className = 'terminal-output';
                errorLine.innerHTML = `<p class="error">Command not found: <span class="highlight">${command}</span>. Type <span class="highlight">'help'</span> for available commands.</p>`;
                terminalOutput.appendChild(errorLine);
            }

            // Auto-scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    // Blinking cursor effect
    setInterval(() => {
        const cursor = document.querySelector('.terminal-input');
        cursor.style.borderRight = cursor.style.borderRight === '2px solid var(--terminal-highlight)' ? 
            '2px solid transparent' : '2px solid var(--terminal-highlight)';
    }, 500);
});






// document.addEventListener('DOMContentLoaded', function() {
    
//     const matrixBackground = document.querySelector('.matrix-background');
//     const canvas = document.createElement('canvas');
//     matrixBackground.appendChild(canvas);
    
//     canvas.style.position = 'absolute';
//     canvas.style.top = '0';
//     canvas.style.left = '0';
//     canvas.style.width = '100%';
//     canvas.style.height = '100%';
    
//     const ctx = canvas.getContext('2d');
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
    
//     const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
//     const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const nums = '0123456789';
//     const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    
//     const alphabet = katakana + latin + nums + symbols;
    
//     const fontSize = 16;
//     const columns = canvas.width / fontSize;
    
//     const rainDrops = [];
    
//     for (let x = 0; x < columns; x++) {
//         rainDrops[x] = 1;
//     }
    
//     const draw = () => {
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
        
//         ctx.fillStyle = '#0F0';
//         ctx.font = fontSize + 'px monospace';
        
//         for (let i = 0; i < rainDrops.length; i++) {
//             const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
//             ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
//             if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
//                 rainDrops[i] = 0;
//             }
//             rainDrops[i]++;
//         }
//     };
    
//     setInterval(draw, 30);
    
    
//     const terminalDate = document.getElementById('terminal-date');
//     const now = new Date();
//     terminalDate.textContent = now.toLocaleString('en-US', {
//         weekday: 'short',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         year: 'numeric'
//     });
    
    
//     const sessionId = document.getElementById('session-id');
//     sessionId.textContent = generateSessionId();
    
//     function generateSessionId() {
//         const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         let result = '';
//         for (let i = 0; i < 16; i++) {
//             result += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
//         return result;
//     }
    
    
//     const terminalInput = document.getElementById('command-input');
//     const terminalOutput = document.getElementById('terminal');
    
//     const commands = {
//         help: () => `
//             <div class="terminal-output">
//                 <p><span class="highlight">Available Commands:</span></p>
//                 <p><span class="command">about</span> - View my background</p>
//                 <p><span class="command">skills</span> - See my technical skills</p>
//                 <p><span class="command">projects</span> - Explore my work</p>
//                 <p><span class="command">contact</span> - Get in touch</p>
//                 <p><span class="command">clear</span> - Reset terminal</p>
//                 <p><span class="command">github</span> - View my GitHub profile</p>
//                 <p><span class="command">home</span> - Return to homepage</p>
//             </div>
//         `,
//         about: () => { window.location.href = 'about.html'; return 'Redirecting to about page...'; },
//         skills: () => { window.location.href = 'skills.html'; return 'Redirecting to skills page...'; },
//         projects: () => { window.location.href = 'projects.html'; return 'Redirecting to projects page...'; },
//         contact: () => { window.location.href = 'contact.html'; return 'Redirecting to contact page...'; },
//         home: () => { window.location.href = 'index.html'; return 'Redirecting to homepage...'; },
//         github: () => { window.open('https://github.com/Britania-maker', '_blank'); return 'Opening GitHub profile in new tab...'; },
//         clear: () => {
//             terminalOutput.innerHTML = `
//                 <div class="terminal-line">
//                     <span class="user">user@neodev</span>:<span class="path">~/portfolio</span>$ <span class="command">welcome</span>
//                 </div>
//                 <div class="terminal-output" id="output">
//                     <p>Terminal cleared. Type <span class="highlight">'help'</span> for commands.</p>
//                 </div>
//             `;
//             return '';
//         }
//     };
    
//     terminalInput.addEventListener('keydown', (e) => {
//         if (e.key === 'Enter') {
//             const command = terminalInput.value.trim().toLowerCase();
//             terminalInput.value = '';
            
//             const commandLine = document.createElement('div');
//             commandLine.className = 'terminal-line';
//             commandLine.innerHTML = `
//                 <span class="user">user@neodev</span>:<span class="path">~/portfolio</span>$ <span class="command">${command}</span>
//             `;
//             terminalOutput.appendChild(commandLine);
            
//             if (commands[command]) {
//                 const output = commands[command]();
//                 if (typeof output === 'string') {
//                     terminalOutput.innerHTML += output;
//                 }
//             } else {
//                 const errorLine = document.createElement('div');
//                 errorLine.className = 'terminal-output';
//                 errorLine.innerHTML = `<p>Command not found: <span class="highlight">${command}</span>. Type <span class="highlight">'help'</span> for available commands.</p>`;
//                 terminalOutput.appendChild(errorLine);
//             }
            
//             terminalOutput.scrollTop = terminalOutput.scrollHeight;
//         }
//     });
    
    
//     const typingElements = document.querySelectorAll('.typing');
//     typingElements.forEach(el => {
//         const text = el.getAttribute('data-text');
//         let i = 0;
//         const speed = 50;
        
//         function typeWriter() {
//             if (i < text.length) {
//                 el.textContent += text.charAt(i);
//                 i++;
//                 setTimeout(typeWriter, speed);
//             }
//         }
        
//         setTimeout(typeWriter, 1000);
//     });
    
    
//     setInterval(() => {
//         const cursor = document.querySelector('.terminal-input');
//         cursor.style.borderRight = cursor.style.borderRight === '2px solid var(--highlight)' ? 
//             '2px solid transparent' : '2px solid var(--highlight)';
//     }, 500);
    
    
//     window.addEventListener('resize', () => {
//         canvas.width = canvas.offsetWidth;
//         canvas.height = canvas.offsetHeight;
//     });
// });