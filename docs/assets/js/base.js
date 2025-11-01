const navBar = document.getElementById('nav-bar');
const clock = document.getElementById('clock');

function toggleNav(val) {
    if (val) {
        navBar.classList.add('expand');
    } else {
        navBar.classList.remove('expand');
    }
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();

