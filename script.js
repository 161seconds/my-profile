// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            window.scrollTo({
                top: target.offsetTop - 20,
                behavior: "smooth"
            });
        }
    });
});


// ===== Scroll-Active Navigation (tự highlight link khi cuộn) =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a, header a");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(sec => {
        const secTop = sec.offsetTop - 250;
        if (pageYOffset >= secTop) {
            current = sec.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current  && !link.classList.contains("no-active")){
            link.classList.add("active");
        }
    });
});


// ===== Hover Sound Effect (cho vui) =====
const hoverSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/31/audio_7b1e6607ab.mp3?filename=click-124467.mp3");
hoverSound.volume = 0.3;

document.querySelectorAll(".skill, .project-card, .social a").forEach(item => {
    item.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});


// ===== Dark Mode Toggle (nếu muốn dùng thì thêm nút vào HTML) =====
const darkToggle = document.getElementById("toggleDarkMode");

if(darkToggle){
    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        
        if(document.body.classList.contains("dark")){
            darkToggle.textContent = "🌙";
        } else {
            darkToggle.textContent = "☀️";
        }
    });
}

const navLinks = document.querySelectorAll(".nav-link");
const glow = document.querySelector(".nav-glow");

navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        if (link.classList.contains("no-glow")) {
            glow.style.width = "0px";
            return;
        }

        const rect = link.getBoundingClientRect();
        glow.style.width = rect.width + "px";
        glow.style.left = link.offsetLeft + "px";
    });
});

// Khi rời nav → tắt glow
document.querySelector(".top-nav").addEventListener("mouseleave", () => {
    glow.style.width = "0px";
});
