
const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const chips = [...document.querySelectorAll(".chip")];
const projects = [...document.querySelectorAll(".project-card")];
const search = document.getElementById("projectSearch");
let activeFilter = "todos";

menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
    });
});

function filterProjects() {
    const term = search.value.trim().toLowerCase();

    projects.forEach((project) => {
        const category = project.dataset.category || "";
        const text = project.textContent.toLowerCase();
        const filterOk = activeFilter === "todos" || category.includes(activeFilter);
        const searchOk = !term || text.includes(term);

        project.classList.toggle("hidden", !(filterOk && searchOk));
    });
}

chips.forEach((chip) => {
    chip.addEventListener("click", () => {
        activeFilter = chip.dataset.filter;
        chips.forEach((item) => item.setAttribute("aria-pressed", String(item === chip)));
        filterProjects();
    });
});

search.addEventListener("input", filterProjects);

document.getElementById("copyEmail").addEventListener("click", async () => {
    const email = document.getElementById("emailText").textContent.trim();

    try {
        await navigator.clipboard.writeText(email);
        alert("E-mail copiado. Troque pelo seu e-mail real no código.");
    } catch (_error) {
        alert("E-mail: " + email);
    }
});