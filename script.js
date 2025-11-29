// ===== Smooth Scroll with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        const target = document.querySelector(href);

        // Only prevent default for internal links
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.top-nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});


// ===== Scroll-Active Navigation =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
    let current = "";
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(sec => {
        const secTop = sec.offsetTop;
        const secHeight = sec.offsetHeight;

        if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
            current = sec.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current &&
            !link.classList.contains("no-active")) {
            link.classList.add("active");
        }
    });
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener("scroll", () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNav();
    });
});

// Initial check
updateActiveNav();


// ===== Hover Sound Effect (Optional) =====
let hoverSound = null;
let soundEnabled = false;

// Uncomment below to enable sound effects
/*
try {
    hoverSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/31/audio_7b1e6607ab.mp3?filename=click-124467.mp3");
    hoverSound.volume = 0.2;
    soundEnabled = true;
} catch (error) {
    console.log("Sound effects disabled");
}

if (soundEnabled && hoverSound) {
    document.querySelectorAll(".skill, .project-card, .social a").forEach(item => {
        item.addEventListener("mouseenter", () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(err => {
                // Autoplay prevented, disable sound
                soundEnabled = false;
            });
        });
    });
}
*/


// ===== Dark Mode Toggle =====
const darkBtn = document.getElementById("darkModeToggle");
const icon = darkBtn.querySelector("i");

// Load saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

// Initialize theme
loadTheme();

// Toggle theme on button click
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "light");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "dark");
    }
});


// ===== Nav Glow Effect =====
const glow = document.querySelector(".nav-glow");

if (glow && navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", function () {
            // Skip glow for contact link
            if (this.classList.contains("no-glow")) {
                glow.style.width = "0px";
                return;
            }

            const rect = this.getBoundingClientRect();
            const navRect = this.closest("ul").getBoundingClientRect();

            glow.style.width = rect.width + "px";
            glow.style.left = (rect.left - navRect.left) + "px";
        });
    });

    // Hide glow when leaving nav
    const navElement = document.querySelector(".top-nav");
    if (navElement) {
        navElement.addEventListener("mouseleave", () => {
            glow.style.width = "0px";
        });
    }
}


// ===== Intersection Observer for Scroll Animations (Optional) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe all sections except home
document.querySelectorAll("section:not(#home)").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
});


// ===== Keyboard Navigation Enhancement =====
document.querySelectorAll(".skill, .project-card").forEach(item => {
    item.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            item.click();
        }
    });
});


// ===== Performance: Lazy Load Images (if you add more images) =====
if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    document.body.appendChild(script);
}


// ===== Console Easter Egg (Optional) =====
console.log(
    "%c👋 Hello there!",
    "color: #00eaff; font-size: 20px; font-weight: bold;"
);
console.log(
    "%cWelcome to my portfolio! Feel free to explore the code. 🚀",
    "color: #00eaff; font-size: 14px;"
);
console.log(
    "%cInterested in collaboration? Reach out: quocbao.nguyen16102006@gmail.com",
    "color: #999; font-size: 12px;"
);