function scrollToStories() {
    document.getElementById("stories").scrollIntoView({
        behavior: "smooth"
    });
}

function scrollToStories() {
    document.getElementById("stories").scrollIntoView({
        behavior: "smooth"
    });
}

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
}

// Close menu when a link is clicked (mobile UX fix)
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.remove("show");
    });
});

// Smooth scroll
function scrollToStories() {
    document.getElementById("stories").scrollIntoView({
        behavior: "smooth"
    });
}
