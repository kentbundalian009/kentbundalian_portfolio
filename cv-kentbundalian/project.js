// Database objects ng iyong mga Proyekto at mga Screenshots
const projectData = {
    cosmetic: {
        title: "Full-Stack Cosmetic E-Commerce Platform",
        desc: "Designed and engineered an enterprise-grade e-commerce platform for a growing cosmetics brand. Optimized for data-rich marketing dashboards, real-time multi-branch stock counting, and secure checkout frameworks. [NOTE: Visual assets, screenshots, and source code are currently restricted under a Non-Disclosure Agreement (NDA) to protect client proprietary data.]",
        tags: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "MongoDB", "React", "Tailwind CSS"],
        images: ["public/wip.png"] 
    },
    racksmart: {
        title: "Racksmart Stock Control System",
        desc: "Efficient inventory tracking system crafted under precise Software Engineering methodologies for Upright Storage Solution PH. Features modern automated low-stock warnings and streamlined workflow tables.",
        tags: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
        images: ["racksmart/1.png", "racksmart/2.png", "racksmart/3.png", "racksmart/4.png", "racksmart/5.png", "racksmart/6.png"] // Lagyan mo lang ng iba pang screenshot
    },
    bossing: {
        title: "Bossing Fastfood Website",
        desc: "A fully responsive modern brand layout engineered with highly responsive interactive components. Leverages client-side state manipulation to manage ordering baskets and interactive price mutations.",
        tags: ["HTML5", "CSS3", "JavaScript", ],
        images: ["boss/1.png", "boss/2.png", "boss/3.png", "boss/4.png", "boss/5.png" ] // Lagyan mo lang ng iba pang screenshot
    },
    pizza: {
        title: "Pizza Ordering System",
        desc: "A desktop-based Pizza Ordering System developed using Java Swing that allows users to conveniently browse pizza menus, customize orders, calculate totals, and manage customer transactions through an interactive graphical user interface (GUI). The system is designed to simplify the ordering process while providing a clean and user-friendly experience.",
        tags: ["Java","JavaSwing","SQLite"],
        images: ["pizza/1.png", "pizza/2.png", "pizza/3.png", "pizza/4.png", "pizza/5.png", ] // Lagyan mo lang ng iba pang screenshot
    }
};

let currentProjectKey = "";
let currentImgIndex = 0;

// DOM Elements
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImgTarget");
const modalTitle = document.getElementById("modalProjectTitle");
const modalDesc = document.getElementById("modalProjectDesc");
const modalTags = document.getElementById("modalTagsTarget");
const closeModalBtn = document.querySelector(".close-modal");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Buksan ang Modal base sa piniling Folder
document.querySelectorAll(".project-folder-card").forEach(card => {
    card.addEventListener("click", () => {
        const pKey = card.getAttribute("data-project");
        if (!projectData[pKey]) return;

        currentProjectKey = pKey;
        currentImgIndex = 0;

        // I-populate ang contents
        modalTitle.textContent = projectData[pKey].title;
        modalDesc.textContent = projectData[pKey].desc;
        
        // I-render ang Tech Tags
        modalTags.innerHTML = "";
        projectData[pKey].tags.forEach(tag => {
            const span = document.createElement("span");
            span.className = "tech-pill";
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        updateModalImage();
        modal.style.display = "flex";
    });
});

// Update Image Viewport Function
// Update Image Viewport Function
function updateModalImage() {
    const images = projectData[currentProjectKey].images;
    
    // Check kung may laman ang array para hindi mag-error
    if (images && images.length > 0) {
        modalImg.src = images[currentImgIndex];
    }

    // Itago ang buttons kung iisang larawan lang ang meron sa project
    if (images && images.length <= 1) {
        prevBtn.style.setProperty("display", "none", "important"); //  AYOS NA (Inalis ang dobleng .style)
        nextBtn.style.setProperty("display", "none", "important"); //  AYOS NA (Inalis ang dobleng .style)
    } else {
        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";
    }
}

/* ==========================================================================
   🚨 NAVIGATION ENGINE (PREV / NEXT LIGHTBOX CONTROLS)
   ========================================================================== */

// Previous Image Button Click
prevBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Iwasan na magsara ang modal kapag pinindot ang arrow
    const images = projectData[currentProjectKey].images;
    currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
    updateModalImage();
});

// Next Image Button Click
nextBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Iwasan na magsara ang modal kapag pinindot ang arrow
    const images = projectData[currentProjectKey].images;
    currentImgIndex = (currentImgIndex + 1) % images.length;
    updateModalImage();
});

// Huwag isara ang modal kapag kinlik ang mismong gitnang image pane
document.querySelector(".modal-gallery-pane img").addEventListener("click", (e) => {
    e.stopPropagation();
});

// Isara ang Modal kapag kinlik ang close (X) button
closeModalBtn.addEventListener("click", () => { 
    modal.style.display = "none"; 
});

// Isara ang modal kapag kinlik ang madilim na background sa labas ng wrapper
window.addEventListener("click", (e) => { 
    if (e.target === modal) {
        modal.style.display = "none"; 
    }
});

// ==========================================================================
// 🌙 INTERFACE THEME MANAGEMENT (Sini-sync ang dark mode state sa local storage)
// ==========================================================================
const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
    }
});