// script.js

// 1. Live Time Update
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('time-display').innerText = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// 2. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (GSAP)
    gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// 3. GSAP Entrance Animations
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // Register ScrollTrigger if you use scroll effects later
    gsap.registerPlugin(ScrollTrigger);

    // Timeline for entrance
    const tl = gsap.timeline();

    tl.from(".bento-box", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1, // This creates the wave effect
        ease: "power3.out"
    });

    // Animate content inside hero after boxes appear
    tl.from(".hero h1, .hero p, .hero .tags", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.5");

    // Hover Animation for Tech Items (Micro-interaction)
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.1, duration: 0.2, backgroundColor: "rgba(0, 255, 136, 0.1)" });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, duration: 0.2, backgroundColor: "rgba(255, 255, 255, 0.05)" });
        });
    });
});

// ... existing code ...

document.addEventListener("DOMContentLoaded", () => {
    
    // ... existing Hero and Skills animations ...

    // --- NEW: PROJECT PARALLAX ANIMATIONS ---
    
    // Select all project images
    const projectImages = document.querySelectorAll(".project-img");

    projectImages.forEach((img) => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img.parentElement, // Trigger based on the container
                start: "top bottom", // Start when container hits bottom of viewport
                end: "bottom top",   // End when container leaves top
                scrub: true,         // Link animation progress to scrollbar
            },
            y: -50, // Move the image up slightly while scrolling down
            ease: "none"
        });
    });

    // Animate the text sliding in
    const projectItems = document.querySelectorAll(".project-item");
    
    projectItems.forEach((item) => {
        // Find text content inside the item
        const content = item.querySelector(".project-content");
        
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
    });

});