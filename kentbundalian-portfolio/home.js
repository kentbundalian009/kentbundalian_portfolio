/* ==========================================================================
   THEME TOGGLE (LIGHT / DARK)
   ========================================================================== */
const themeBtn = document.getElementById("themeBtn");

function applyTheme(mode) {
    const isDark = mode === "dark";
    document.body.classList.toggle("dark", isDark);
    if (themeBtn) {
        themeBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i><span>Light</span>'
            : '<i class="fa-solid fa-moon"></i><span>Dark</span>';
    }
}

applyTheme(localStorage.getItem("theme") || "light");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const next = document.body.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem("theme", next);
        applyTheme(next);
    });
}

/* ==========================================================================
   SCROLL PROGRESS BAR & ACTIVE NAV LINK HIGHLIGHT
   ========================================================================== */
const scrollProgress = document.getElementById("scrollProgress");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

function updateScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollProgress && docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        scrollProgress.style.width = `${pct}%`;
    }

    let currentId = "";
    sections.forEach((sec) => {
        if (scrollTop >= sec.offsetTop - 140) {
            currentId = sec.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute("href").replace("#", "");
        link.classList.toggle("active", target === currentId);
    });
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

/* ==========================================================================
   SCROLL-REVEAL ANIMATIONS (STAGGERED)
   ========================================================================== */
const revealTargets = document.querySelectorAll(
    ".metric-card, .section-header, .about-card, .value-card, .process-strip, .service-card, .timeline-item, .project-card, .skill-group, .cert-card, .contact-card"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

// Apply subtle stagger to sibling grid/list cards
document
    .querySelectorAll(".metrics-strip, .value-grid, .services-grid, .timeline, .projects-grid, .skills-grid, .cert-grid")
    .forEach((group) => {
        Array.from(group.children).forEach((child, idx) => {
            child.style.transitionDelay = `${Math.min(idx * 75, 300)}ms`;
        });
    });

/* ==========================================================================
   SUBTLE MOUSE-FOLLOW SPOTLIGHT ON VALUE CARDS
   ========================================================================== */
document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
} else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
}

/* ==========================================================================
   INLINE PROJECT THUMBNAIL SWITCHER (SMOOTH CROSSFADE)
   ========================================================================== */
document.querySelectorAll(".project-card").forEach((card) => {
    const mainImg = card.querySelector(".project-main-img");
    const thumbs = card.querySelectorAll(".project-thumbs .thumb");

    if (!mainImg || thumbs.length === 0) return;

    const selectThumb = (thumb) => {
        if (mainImg.src === thumb.src) return;
        mainImg.classList.add("is-swapping");
        setTimeout(() => {
            mainImg.src = thumb.src;
            mainImg.classList.remove("is-swapping");
        }, 120);
        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
    };

    thumbs.forEach((thumb) => {
        thumb.addEventListener("click", () => selectThumb(thumb));
        thumb.addEventListener("mouseenter", () => selectThumb(thumb));
    });
});

/* ==========================================================================
   OPTIONAL IMAGE LIGHTBOX (CLICK ANY PREVIEW/CERTIFICATE TO ENLARGE)
   ========================================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.querySelector(".lightbox-close");

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".zoomable-img").forEach((img) => {
    img.addEventListener("click", () => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Preview";
        if (lightboxCaption) {
            lightboxCaption.textContent = img.dataset.caption || "";
        }
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

/* ==========================================================================
   INTERACTIVE QUICK PROJECT BRIEF (1-CLICK PRE-FILLED INQUIRY + COPY EMAIL)
   ========================================================================== */
const smartInquiryBtn = document.getElementById("smartInquiryBtn");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const briefState = {
    project: "Business Website",
    timeline: "ASAP"
};

function updateInquiryLink() {
    if (!smartInquiryBtn) return;
    const subject = `Project Inquiry: ${briefState.project}`;
    const body = `Hi Kent,\n\nI'm interested in working with you on a ${briefState.project} (Timeline: ${briefState.timeline}).\n\nHere are a few details about my project:\n- `;
    smartInquiryBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=kentbundalian009@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll(".brief-chips").forEach((group) => {
    const key = group.dataset.group;
    group.querySelectorAll(".chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            group.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
            chip.classList.add("active");
            briefState[key] = chip.dataset.value;
            updateInquiryLink();
        });
    });
});

if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
        const email = "kentbundalian009@gmail.com";
        try {
            await navigator.clipboard.writeText(email);
        } catch {
            // Fallback for older browsers
            const ta = document.createElement("textarea");
            ta.value = email;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
        }
        const original = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Email Copied!';
        setTimeout(() => {
            copyEmailBtn.innerHTML = original;
        }, 2000);
    });
}
