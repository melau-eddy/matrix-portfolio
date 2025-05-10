document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D Tech Sphere
    const initTechSphere = () => {
        const container = document.getElementById('tech-sphere');
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        
        // Create sphere with tech icons as texture
        const geometry = new THREE.SphereGeometry(3, 32, 32);
        const texture = new THREE.TextureLoader().load('assets/tech-grid.png');
        const material = new THREE.MeshBasicMaterial({ 
            map: texture,
            transparent: true,
            opacity: 0.9,
            wireframe: false
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        
        // Add floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        
        const posArray = new Float32Array(particleCount * 3);
        for(let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.8
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Position camera
        camera.position.z = 5;
        
        // Animation controls
        const rotationControl = document.getElementById('rotation-control');
        const zoomControl = document.getElementById('zoom-control');
        
        let rotationSpeed = parseFloat(rotationControl.value) / 10;
        let zoomLevel = parseFloat(zoomControl.value) / 100 * 5;
        
        rotationControl.addEventListener('input', () => {
            rotationSpeed = parseFloat(rotationControl.value) / 10;
        });
        
        zoomControl.addEventListener('input', () => {
            zoomLevel = parseFloat(zoomControl.value) / 100 * 5;
            camera.position.z = zoomLevel;
        });
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            sphere.rotation.x += 0.001 * rotationSpeed;
            sphere.rotation.y += 0.002 * rotationSpeed;
            
            particlesMesh.rotation.x -= 0.0005 * rotationSpeed;
            particlesMesh.rotation.y -= 0.001 * rotationSpeed;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        });
    };
    
    // Initialize Neural Network Visualization
    const initNeuralNetwork = () => {
        const canvas = document.getElementById('neural-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        
        // Nodes representing skills
        const nodes = [
            { x: 100, y: 100, radius: 10, color: '#00f0ff', skill: 'Python' },
            { x: 300, y: 150, radius: 8, color: '#ff2d75', skill: 'Django' },
            { x: 200, y: 300, radius: 12, color: '#00ff41', skill: 'React' },
            // More nodes...
        ];
        
        // Connections between nodes
        const connections = [
            { from: 0, to: 1, strength: 0.8 },
            { from: 0, to: 2, strength: 0.6 },
            // More connections...
        ];
        
        // Animation variables
        let time = 0;
        const pulseSpeed = 0.01;
        
        const drawNetwork = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections
            connections.forEach(conn => {
                const fromNode = nodes[conn.from];
                const toNode = nodes[conn.to];
                
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.strokeStyle = `rgba(0, 240, 255, ${conn.strength * 0.7})`;
                ctx.lineWidth = conn.strength * 3;
                ctx.stroke();
            });
            
            // Draw nodes
            nodes.forEach(node => {
                // Pulsing effect
                const pulse = Math.sin(time + node.x) * 0.2 + 1;
                const currentRadius = node.radius * pulse;
                
                // Draw glow
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, currentRadius * 3
                );
                gradient.addColorStop(0, node.color);
                gradient.addColorStop(1, 'transparent');
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentRadius * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();
                
                // Draw skill label
                if (pulse > 1.1) {
                    ctx.font = '10px JetBrains Mono';
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.fillText(node.skill, node.x, node.y + currentRadius + 15);
                }
            });
            
            time += pulseSpeed;
            requestAnimationFrame(drawNetwork);
        };
        
        drawNetwork();
        
        // Make nodes interactive
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            nodes.forEach(node => {
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 50) {
                    node.x += (mouseX - node.x) * 0.01;
                    node.y += (mouseY - node.y) * 0.01;
                }
            });
        });
    };
    
    // Skill filter functionality
    const setupSkillFilter = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const skillCards = document.querySelectorAll('.skill-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                // Filter skills
                skillCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    };
    
    // Cyber console functionality
    const setupCyberConsole = () => {
        const consoleHeader = document.querySelector('.console-header');
        const cyberConsole = document.querySelector('.cyber-console');
        const consoleInput = document.getElementById('console-cmd');
        const consoleOutput = document.getElementById('skill-analysis');
        
        // Toggle console
        consoleHeader.addEventListener('click', () => {
            cyberConsole.classList.toggle('active');
        });
        
        // Command processing
        consoleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = consoleInput.value.trim().toLowerCase();
                consoleInput.value = '';
                
                // Add command to output
                consoleOutput.innerHTML += `<div>> root@skills-matrix:~# ${command}</div>`;
                
                // Process command
                let response = '';
                
                switch(command) {
                    case 'help':
                        response = `Available commands:
                        - analyze [skill]: Get detailed analysis of a skill
                        - compare [skill1] [skill2]: Compare two skills
                        - list: Show all skills
                        - clear: Clear console`;
                        break;
                    case 'list':
                        response = `Available skills:
                        - Python
                        - JavaScript
                        - React
                        - Django
                        - Cybersecurity
                        - Machine Learning`;
                        break;
                    case 'clear':
                        consoleOutput.innerHTML = '';
                        return;
                    default:
                        if (command.startsWith('analyze ')) {
                            const skill = command.substring(8);
                            response = `Analyzing ${skill}...
                            > Proficiency: 92%
                            > Projects: 15
                            > Experience: 3 years
                            > Related skills: Django, Flask, Data Science`;
                        } else if (command.startsWith('compare ')) {
                            const skills = command.substring(8).split(' ');
                            if (skills.length === 2) {
                                response = `Comparing ${skills[0]} and ${skills[1]}:
                                > ${skills[0]}: 92% proficiency, 15 projects
                                > ${skills[1]}: 88% proficiency, 12 projects
                                > Synergy score: 87%`;
                            } else {
                                response = 'Usage: compare [skill1] [skill2]';
                            }
                        } else {
                            response = `Command not found: ${command}. Type 'help' for available commands.`;
                        }
                }
                
                consoleOutput.innerHTML += `<div>${response}</div>`;
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            }
        });
    };
    
    // DNA strand animation
    const animateDNA = () => {
        const dnaNodes = document.querySelectorAll('.dna-node');
        const dnaConnectors = document.querySelector('.dna-connectors');
        
        // Create connecting lines
        dnaNodes.forEach((node, index) => {
            if (index < dnaNodes.length - 1) {
                const nextNode = dnaNodes[index + 1];
                const line = document.createElement('div');
                line.className = 'dna-line';
                
                // Position line between nodes
                const updateLine = () => {
                    const rect1 = node.getBoundingClientRect();
                    const rect2 = nextNode.getBoundingClientRect();
                    
                    const x1 = rect1.left + rect1.width / 2;
                    const y1 = rect1.top + rect1.height / 2;
                    const x2 = rect2.left + rect2.width / 2;
                    const y2 = rect2.top + rect2.height / 2;
                    
                    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                    
                    line.style.position = 'absolute';
                    line.style.left = `${x1}px`;
                    line.style.top = `${y1}px`;
                    line.style.width = `${length}px`;
                    line.style.height = '1px';
                    line.style.background = `linear-gradient(to right, 
                        rgba(0, 240, 255, 0.3), 
                        rgba(0, 255, 65, 0.3))`;
                    line.style.transformOrigin = '0 0';
                    line.style.transform = `rotate(${angle}deg)`;
                };
                
                dnaConnectors.appendChild(line);
                
                // Update on resize and scroll
                window.addEventListener('resize', updateLine);
                window.addEventListener('scroll', updateLine);
                updateLine();
            }
        });
        
        // Floating animation
        dnaNodes.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.2}s`;
        });
    };
    
    // Initialize all components
    initTechSphere();
    initNeuralNetwork();
    setupSkillFilter();
    setupCyberConsole();
    animateDNA();
    
    // Skill card hover effects
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const skill = card.dataset.skill;
            document.querySelector('#skill-analysis').innerHTML += `> Hovering: ${skill}\n`;
        });
    });
});