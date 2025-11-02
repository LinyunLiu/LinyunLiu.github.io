const binary = document.getElementById('binaries');
const scrollDownBtn = document.getElementById('scroll-down-btn');
const recentBlog = document.getElementById('recent-blog');
const projects = document.getElementById('projects');
const blogLoader = document.getElementById('blog-loader');
const projLoader = document.getElementById('proj-loader');
let scrollTimeout;

function toggleBlogLoader(val){
    blogLoader.style.display = val ? 'inline-block' : 'none';
}

function toggleProjLoader(val){
    projLoader.style.display = val ? 'inline-block' : 'none';
}

function stringToBinary(str) {
    return str
        .split('')
        .map(char => char.charCodeAt(0)
            .toString(2)
            .padStart(8, '0'))
        .join(' ');
}

binary.innerHTML = stringToBinary("This is one of my favorite movies!")
    + `<span class="decode-me-indicator">&nbsp;&nbsp;&nbsp;Decode Me!</span>`;

scrollDownBtn.addEventListener("click", () => {
    document.getElementById("section-2").scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    scrollDownBtn.classList.add("hidden");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        scrollDownBtn.classList.remove("hidden");
    }, 10000);
});

function getMeta() {
    toggleBlogLoader(true)
    toggleProjLoader(true);
    fetch("/assets/meta/blogs.json")
        .then(res => res.json())
        .then(data => {
            setTimeout(()=> {
                loadBlogs(data['items'])
                toggleBlogLoader(false)
            }, 100);
        })
        .catch(err => {
            toggleBlogLoader(false)
            console.log(err);
        });
    fetch("/assets/meta/projects.json")
        .then(res => res.json())
        .then(data => {
            setTimeout(()=> {
                loadProjects(data['items'])
                toggleProjLoader(false);
            }, 100);
        })
        .catch(err => {
            toggleProjLoader(false);
            console.log(err);
        });
}

function loadBlogs(blogs) {
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    let limit = 0
    for (let b of blogs) {
        if (limit === 3){
            break;
        }
        recentBlog.innerHTML += `
        <a href="${b['link']}">
            <p class="blog-title">${b['title']}</p>
            <p class="blog-description">${b['description']}</p>
        </a>`
        limit ++;
    }
}

function loadProjects(projs) {
    let limit = 0
    projs.sort((a, b) => new Date(b.date) - new Date(a.date));
    for (let p of projs) {
        if (limit === 6){
            break;
        }
        let s = p['keywords'].map(k => `#${k}`).join(', ');
        projects.innerHTML += `
        <a class="grid-item" href="${p['link']}">
            <img src="${p['cover']}" alt=""/>
            <p class="project-title">${p['title']}</p>
            <p class="project-keywords">${s}</p>
            <p class="project-description">${p['description']}</p>
        </a>`
        limit ++;
    }
}

getMeta();
