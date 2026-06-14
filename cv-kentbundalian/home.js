/* ==========================================================================
   🌙 THEME TOGGLE LOGIC (LIGHT / DARK MODE)
   ========================================================================== */
const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
}

if (themeBtn) {
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
}


/* ==========================================================================
   🖼️ 1x1 PROFILE IMAGE ZOOM MODAL LOGIC
   ========================================================================== */
const profileImg = document.querySelector('.avatar-wrapper img');
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('imgModalTarget');
const closeModal = document.querySelector('.close-modal');

if (profileImg && imageModal && modalImg) {
    profileImg.addEventListener('click', function() {
        imageModal.style.display = "flex"; // Perfect vertical alignment via flex
        modalImg.src = this.src; 
    });
}

if (closeModal) {
    closeModal.addEventListener('click', function() {
        imageModal.style.display = "none";
    });
}

if (imageModal) {
    imageModal.addEventListener('click', function(event) {
        if (event.target === imageModal) {
            imageModal.style.display = "none";
        }
    });
}


/* ==========================================================================
   ✨ PREMIUM HIGHLIGHTS SYSTEM (MULTIPLE IMAGES SLIDESHOW LOGIC)
   ========================================================================== */
// Matrix data configuration para sa mga naka-compile mong memory albums
const highlightsData = [
  {
    title: "Certificate",
    time: "36w",
    images: ["certificate/1.png", "certificate/2.png", "certificate/3.png"], // Multiple assets loaded
    mention: "City College of Calamba"
  },
];

let currentAlbum = 0;
let currentSlide = 0;

function openHighlightModal(albumIndex) {
  currentAlbum = albumIndex;
  currentSlide = 0;
  
  const storyModal = document.getElementById("storyModal");
  if (storyModal) {
      storyModal.style.display = "flex";
      renderProgressBars();
      updateStoryView();
  }
}

function closeStoryModal() {
  const storyModal = document.getElementById("storyModal");
  if (storyModal) storyModal.style.display = "none";
}

function renderProgressBars() {
  const container = document.getElementById("storyProgressContainer");
  if (!container) return;
  
  container.innerHTML = "";
  const total = highlightsData[currentAlbum].images.length;
  
  for (let i = 0; i < total; i++) {
    container.innerHTML += `<div class="story-progress-bar"><div class="story-progress-fill"></div></div>`;
  }
}

function updateStoryView() {
  const data = highlightsData[currentAlbum];
  const mainImg = document.getElementById("storyMainImage");
  const timeBadge = document.getElementById("storyTimeBadge");
  const footer = document.getElementById("storyFooterTag");
  
  if (mainImg) mainImg.src = data.images[currentSlide];
  if (timeBadge) timeBadge.innerText = data.time;
  
  if (footer) {
      footer.innerHTML = data.mention ? `<span class="mention-pill"><i class="fa-solid fa-at"></i> ${data.mention}</span>` : "";
  }

  // Real-time segmented state calculator para sa top tracker bars
  const fills = document.querySelectorAll(".story-progress-fill");
  fills.forEach((fill, idx) => {
    if (idx < currentSlide) {
        fill.style.width = "100%";
    } else if (idx === currentSlide) {
        fill.style.width = "100%"; 
    } else {
        fill.style.width = "0%";
    }
  });
}

function nextStory() {
  const max = highlightsData[currentAlbum].images.length;
  if (currentSlide < max - 1) {
    currentSlide++;
    updateStoryView();
  } else if (currentAlbum < highlightsData.length - 1) {
    openHighlightModal(currentAlbum + 1); // Auto-forward control papunta sa kasunod na highlight circle
  } else {
    closeStoryModal(); // Exit kapag naubos na ang albums
  }
}

function prevStory() {
  if (currentSlide > 0) {
    currentSlide--;
    updateStoryView();
  } else if (currentAlbum > 0) {
    openHighlightModal(currentAlbum - 1);
    currentSlide = highlightsData[currentAlbum].images.length - 1; // Ituro sa dulo ng nakaraang album
    updateStoryView();
  }
}


/* ==========================================================================
   🌐 SOCIAL RE-DIRECT DIRECTORY AT BACKDROP GENERAL DISMISSAL
   ========================================================================== */
// Clickable data-link elements redirection engine
document.querySelectorAll('.social[data-link]').forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-link');
        if (url && url !== '#') {
            window.open(url, '_blank'); 
        }
    });
});

// Pinagsamang Window click handler para sa labas ng Story Modal backdrop dismissal
window.addEventListener("click", function(event) {
  const storyModal = document.getElementById("storyModal");
  if (event.target === storyModal) {
    closeStoryModal();
  }
});