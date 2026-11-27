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