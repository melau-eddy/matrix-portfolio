document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D Navigation Sphere
    const initNavSphere = () => {
        const container = document.getElementById('nav-sphere');
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        
        // Create sphere with tech icons floating around
        const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00f0ff,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);
        
        // Create floating tech icons
        const icons = [
            { icon: 'react', position: new THREE.Vector3(1, 1, 1) },
            { icon: 'python', position: new THREE.Vector3(-1, -1, 1) },
            { icon: 'node', position: new THREE.Vector3(1, -1, -1) },
            // More icons...
        ];
        
        const iconMeshes = [];
        const loader = new THREE.TextureLoader();
        
        icons.forEach(icon => {
            loader.load(`assets/icons/${icon.icon}.png`, texture => {
                const material = new THREE.SpriteMaterial({ 
                    map: texture,
                    transparent: true 
                });
                const sprite = new THREE.Sprite(material);
                sprite.position.copy(icon.position);
                sprite.scale.set(0.5, 0.5, 0.5);
                scene.add(sprite);
                iconMeshes.push(sprite);
            });
        });
        
        // Position camera
        camera.position.z = 5;
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            sphere.rotation.x += 0.001;
            sphere.rotation.y += 0.002;
            
            iconMeshes.forEach((mesh, i) => {
                mesh.position.x = Math.sin(Date.now() * 0.001 + i) * 3;
                mesh.position.y = Math.cos(Date.now() * 0.001 + i * 2) * 3;
                mesh.position.z = Math.sin(Date.now() * 0.001 + i * 3) * 3;
            });
            
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
    
    // Initialize Screenshot Galleries
    const initScreenshotGalleries = () => {
        document.querySelectorAll('.screenshot-gallery').forEach(gallery => {
            const main = gallery.querySelector('.main-screenshot');
            const thumbnails = gallery.querySelectorAll('.thumbnail');
            
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    // Update active thumbnail
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    
                    // Update main screenshot
                    main.style.backgroundImage = thumb.style.backgroundImage;
                });
            });
        });
    };
    
    // Initialize Video Showcases
    const initVideoShowcases = () => {
        document.querySelectorAll('.video-showcase').forEach(showcase => {
            const preview = showcase.querySelector('.video-preview');
            const player = showcase.querySelector('.video-player');
            const playButton = showcase.querySelector('.play-button');
            
            playButton.addEventListener('click', () => {
                preview.style.display = 'none';
                player.style.display = 'block';
            });
        });
    };
    
    // Initialize Media Controls
    const initMediaControls = () => {
        document.querySelectorAll('.project-card').forEach(card => {
            const mediaBtns = card.querySelectorAll('.media-btn');
            const mediaTypes = card.querySelectorAll('[class*="screenshot"], [class*="embedded"], [class*="video"]');
            
            mediaBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const type = btn.dataset.type;
                    
                    // Update active button
                    mediaBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Show corresponding media
                    mediaTypes.forEach(media => {
                        media.style.display = 'none';
                    });
                    
                    if (type === 'screenshots') {
                        card.querySelector('.screenshot-gallery').style.display = 'block';
                    } else if (type === 'demo') {
                        card.querySelector('.embedded-demo').style.display = 'block';
                    } else if (type === 'video') {
                        card.querySelector('.video-showcase').style.display = 'block';
                    }
                });
            });
        });
    };
    
    // Initialize Project Console
    const initProjectConsole = () => {
        const consoleHeader = document.querySelector('.project-console .console-header');
        const projectConsole = document.querySelector('.project-console');
        const consoleInput = document.getElementById('project-cmd');
        const consoleOutput = document.getElementById('project-analysis');
        
        // Toggle console
        consoleHeader.addEventListener('click', () => {
            projectConsole.classList.toggle('active');
        });
        
        // Command processing
        consoleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = consoleInput.value.trim().toLowerCase();
                consoleInput.value = '';
                
                // Add command to output
                consoleOutput.innerHTML += `<div>> root@project-matrix:~# ${command}</div>`;
                
                // Process command
                let response = '';
                
                switch(command) {
                    case 'help':
                        response = `Available commands:
                        - analyze [project]: Get detailed analysis of a project
                        - filter [category]: Filter projects by category
                        - stats: Show project statistics
                        - clear: Clear console`;
                        break;
                    case 'stats':
                        response = `PROJECT STATISTICS:
                        > Total projects: 7
                        > Most complex: NEURAL_ART_GENERATOR
                        > Most popular: QUANTUM_ECOMMERCE (88 stars)
                        > Technologies used: 15+`;
                        break;
                    case 'clear':
                        consoleOutput.innerHTML = '';
                        return;
                    default:
                        if (command.startsWith('analyze ')) {
                            const project = command.substring(8).toUpperCase();
                            response = `ANALYZING ${project}...
                            > Complexity: HIGH
                            > Technologies: 5
                            > Dependencies: 12
                            > Last update: 3 days ago`;
                        } else if (command.startsWith('filter ')) {
                            const category = command.substring(7).toUpperCase();
                            response = `FILTERING PROJECTS BY ${category}...
                            > Found 3 matching projects`;
                            // Actual filtering would be implemented here
                        } else {
                            response = `Command not found: ${command}. Type 'help' for available commands.`;
                        }
                }
                
                consoleOutput.innerHTML += `<div>${response}</div>`;
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            }
        });
    };
    
    // Initialize Project Filtering
    const initProjectFilters = () => {
        const categorySelect = document.getElementById('category-select');
        const sortSelect = document.getElementById('sort-select');
        const projectCards = document.querySelectorAll('.project-card');
        
        const filterAndSortProjects = () => {
            const category = categorySelect.value;
            const sortMode = sortSelect.value;
            
            // Filter by category
            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Convert to array for sorting
            const cardsArray = Array.from(projectCards).filter(card => 
                card.style.display !== 'none'
            );
            
            // Sort projects
            if (sortMode === 'recent') {
                // Default order (as in HTML)
            } else if (sortMode === 'complexity') {
                cardsArray.sort((a, b) => {
                    const aComplexity = a.dataset.complexity;
                    const bComplexity = b.dataset.complexity;
                    const complexityOrder = ['low', 'medium', 'high', 'extreme'];
                    return complexityOrder.indexOf(bComplexity) - complexityOrder.indexOf(aComplexity);
                });
            } else if (sortMode === 'popularity') {
                cardsArray.sort((a, b) => {
                    return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
                });
            }
            
            // Re-insert sorted projects
            const matrix = document.querySelector('.project-matrix');
            cardsArray.forEach(card => {
                matrix.appendChild(card);
            });
        };
        
        categorySelect.addEventListener('change', filterAndSortProjects);
        sortSelect.addEventListener('change', filterAndSortProjects);
    };
    
    // Initialize Holographic Effects
    const initHolographicEffects = () => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
                
                const hologram = card.querySelector('.project-hologram');
                hologram.style.background = `linear-gradient(${angle}deg, 
                    rgba(0,240,255,0.05) 0%, 
                    rgba(0,240,255,0) 50%, 
                    rgba(0,240,255,0.05) 100%)`;
            });
        });
    };
    
    // Initialize all components
    initNavSphere();
    initScreenshotGalleries();
    initVideoShowcases();
    initMediaControls();
    initProjectConsole();
    initProjectFilters();
    initHolographicEffects();
    
    // Animate project cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});