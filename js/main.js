// ============================================
// PROJECT DATA
// ============================================
const projects = [
    {
        title: "Project Nightfall",
        description: "A simple, physics-based vertical shoot 'em up built with Pygame-CE featuring a clean, scalable game architecture.",
        techStack: ["Python", "Pygame-CE", "Tiled"],
        links: [
            { text: "View Live →", url: "#" },
            { text: "GitHub →", url: "https://github.com/Aethelbrad/planes-pygame" }
        ]
    },
    {
        title: "Trimet Data Derby",
        description: "This project is a real-time, gamified data dashboard that visualizes the on-time performance of the TriMet transit system in Hillsboro and the greater Portland area.",
        techStack: ["Python", "Streamlit", "GTFS"],
        links: [
            { text: "Documentation →", url: "#" },
            { text: "GitHub →", url: "https://github.com/Aethelbrad/trimet-data-derby/" }
        ]
    },
    {
        title: "Arcane Dashboard",
        description: "A real-time system monitoring dashboard built with Python and Streamlit. Monitor CPU, memory, disk usage, and network I/O with configurable alert thresholds and historical visualizations.",
        techStack: ["Python", "Streamlit", "Plotly"],
        links: [
            { text: "View Live →", url: "#" },
            { text: "GitHub →", url: "https://github.com/Aethelbrad/system-monitor-dash/" }
        ]
    },
    {
        title: "Shadowforge API",
        description: "RESTful API with advanced authentication and rate limiting for secure data exchange.",
        techStack: ["Python", "FastAPI", "Redis"],
        links: [
            { text: "Documentation →", url: "#" },
            { text: "GitHub →", url: "#" }
        ]
    }
];

// ============================================
// PORTFOLIO APP
// ============================================
const PortfolioApp = {
    // Initialize the app
    init() {
        this.renderProjects();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupNavHighlight();
    },

    // Render project cards
    renderProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) {
            console.warn('Projects grid not found');
            return;
        }

        projects.forEach((project, index) => {
            const card = this.createProjectCard(project, index);
            grid.appendChild(card);
        });
    },

    // Create a single project card
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`; // Stagger animation
        
        card.innerHTML = `
            <h3>${this.escapeHtml(project.title)}</h3>
            <p>${this.escapeHtml(project.description)}</p>
            <div class="tech-stack">
                ${project.techStack.map(tech => 
                    `<span class="tech-tag">${this.escapeHtml(tech)}</span>`
                ).join('')}
            </div>
            <div class="project-links">
                ${project.links.map(link => 
                    `<a href="${this.escapeHtml(link.url)}" 
                        class="project-link"
                        ${link.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                        ${this.escapeHtml(link.text)}
                    </a>`
                ).join('')}
            </div>
        `;
        
        return card;
    },

    // Smooth scrolling for navigation
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },

    // Scroll reveal animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        // Observe all cards (now they exist!)
        document.querySelectorAll('.project-card, .skill-card').forEach(el => {
            observer.observe(el);
        });
    },

    // Highlight active nav section
    setupNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        const highlightNav = () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', highlightNav);
        highlightNav(); // Run on load
    },

    // Basic XSS protection
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    PortfolioApp.init();
});