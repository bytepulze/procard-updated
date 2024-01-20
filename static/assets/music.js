const button = document.getElementById("musicbtn");
const icon = document.getElementById("volumebtn");
const blur = document.getElementById("blurthepage");
const audio = document.getElementById("audioatp");
function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms));
}
async function change() {
    await new Promise(r=>setTimeout(r, 500));
    blur.classList.add("blurpagerplc2")
}
button.addEventListener("click", ()=>{
    if (audio.paused) {
        audio.volume = 0.2;
        audio.play();
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    } else {
        audio.pause();
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    }
    button.classList.add("replace");
    blur.classList.add("blurpagerplc")
    change()
}
);
