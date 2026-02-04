// assets/js/script.js

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================
    // 1. GLOBAL LOGIC (Runs on ALL pages)
    // =========================================================

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only run if cursor elements exist
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay (GSAP)
            if (typeof gsap !== 'undefined') {
                gsap.to(cursorOutline, {
                    x: posX,
                    y: posY,
                    duration: 0.15,
                    ease: "power2.out"
                });
            }
        });
    }

    // =========================================================
    // 2. HOME PAGE SPECIFIC LOGIC (Only runs if elements exist)
    // =========================================================

    // --- Live Time Update ---
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            timeDisplay.innerText = timeString;
        }
        setInterval(updateTime, 1000);
        updateTime();
    }

    // --- GSAP Animations (Bento Grid) ---
    // Check if we are on the home page by looking for the grid container
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    if (portfolioContainer && typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();

        // Bento Box Entrance
        tl.from(".bento-box", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1, 
            ease: "power3.out"
        });

        // Hero Content Entrance
        tl.from(".hero h1, .hero p, .hero .tags", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.5");

        // Tech Items Hover Effect
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, { scale: 1.1, duration: 0.2, backgroundColor: "rgba(0, 255, 136, 0.1)" });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item, { scale: 1, duration: 0.2, backgroundColor: "rgba(255, 255, 255, 0.05)" });
            });
        });
        
        // Parallax Effect for Project Images
        const projectImages = document.querySelectorAll(".project-img");
        projectImages.forEach((img) => {
             // Only apply if parent exists to avoid errors
             if(img.parentElement) {
                gsap.to(img, {
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                    y: -50,
                    ease: "none"
                });
             }
        });

        // Project Text Slide-in
        const projectItems = document.querySelectorAll(".project-item");
        projectItems.forEach((item) => {
            const content = item.querySelector(".project-content");
            if(content) {
                gsap.from(content, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }
        });
    }
});

// Add this inside the DOMContentLoaded in script.js

const aboutContainer = document.querySelector('.about-container');
if (aboutContainer && typeof gsap !== 'undefined') {
    const tlAbout = gsap.timeline();

    tlAbout.from(".about-hero h5, .about-hero h1", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    tlAbout.from(".about-text p, .detail-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.5");
}

// ... inside DOMContentLoaded ...

    // --- MOBILE MENU LOGIC ---
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu-overlay");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            // Toggle Classes
            hamburger.classList.toggle("active");
            mobileMenu.classList.toggle("active");

            // Animate Links In/Out
            if (mobileMenu.classList.contains("active")) {
                // Menu Opening
                gsap.to(mobileLinks, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.5,
                    delay: 0.2, // Wait for overlay to appear
                    ease: "power2.out"
                });
            } else {
                // Menu Closing (Reset positions)
                gsap.to(mobileLinks, {
                    y: 20,
                    opacity: 0,
                    duration: 0.3
                });
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                mobileMenu.classList.remove("active");
                gsap.to(mobileLinks, { y: 20, opacity: 0, duration: 0.3 });
            });
        });
    }