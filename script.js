function openLink(url){
    window.open(url, '_blank')
}
function toggleNav() {
    let navigation_bar = document.getElementById("navigation-bar");
    navigation_bar.className += " expand"
}
function closeNav(){
    let navigation_bar = document.getElementById("navigation-bar");
    navigation_bar.className = "navigation-bar"
}
function handleMouseMove(event) {
    const target = event.currentTarget;
    target.style.transition = `none`
    target.style.filter = `drop-shadow(calc(-0.08 * var(--mouse-x)) calc(0.1 * var(--mouse-y)) 10px rgba(0, 0, 0, 0.3))`
    const rect = target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${mouseX}px`);
    target.style.setProperty('--mouse-y', `${mouseY}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = (centerX - mouseX)/rect.width
    const rY = (centerY - mouseY)/rect.height
    const val = 25
    target.style.transform = `rotateX(${rY*val}deg) rotateY(${rX*val}deg)`;
}
function handleMouseLeave(event){
    const target = event.currentTarget;
    setTimeout(function (){
        target.style.filter = `drop-shadow(0 0 0 rgba(0, 0, 0, 0.0))`
        target.style.transition = `0.5s all ease-in-out`
        target.style.transform = `rotateY(0deg) rotateX(0deg)`
    }, 200)
}













