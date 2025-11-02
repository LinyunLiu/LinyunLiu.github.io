const projectContainer = document.getElementById('projects');
const pagesContainer = document.getElementById('pages');

let total = null;
let limit = null
let projects = []
let currentPage = 1

function getData() {
    fetch("/assets/meta/films.json")
        .then(res => res.json())
        .then(data => {
            limit = data["limit_per_page"]
            projects = data["items"]
            projects.sort((a, b) => new Date(b.date) - new Date(a.date));
            total = projects.length
            let html = "";
            for (let i = 1; i <= Math.ceil(total / limit); i++) {
                html += `<button onclick="load(${i})">${i}</button>`;
            }
            pagesContainer.innerHTML = html;

            load(1)
        })
        .catch(err => {
            console.log(err);
        });
}

function load(page){
    projectContainer.innerHTML = "";
    let startIndex = (page-1) * limit
    let endIndex = Math.min(startIndex + limit, projects.length);
    for (let i = startIndex; i < endIndex; i++) {
        let p = projects[i]
        let s = p["keywords"].map(k => `#${k}`).join(' ');
        projectContainer.innerHTML += `
        <a class="grid-item" href="${p['link']}">
            <img src="${p['cover']}" alt=""/>
            <p class="project-title">${p['title']}</p>
            <p class="project-keywords">${s}</p>
            <p class="project-description">${p['description']}</p>
        </a>`
    }
    let buttons = document.querySelectorAll('#pages button');
    buttons.forEach(btn => btn.style.border = "1px solid transparent");
    buttons[page - 1].style.border = "1px solid var(--dark)";

    let pagesSimple = document.getElementById("pages-simple");
    pagesSimple.innerHTML = `${page}/${Math.ceil(total / limit)}`

    currentPage = page;

}

function prevPage() {
    if (currentPage > 1) load(currentPage - 1);
}

function nextPage() {
    if (currentPage < Math.ceil(total / limit)) load(currentPage + 1);
}

getData()