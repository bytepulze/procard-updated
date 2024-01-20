let copydisc = document.getElementById("copyclipboard");
let disc = document.getElementById("disc");
const originalText = copydisc.textContent;
disc.addEventListener("click", function() {
    navigator.clipboard.writeText(originalText);
    copydisc.textContent = "Copied"
    setTimeout(function() {
        copydisc.textContent = originalText;
    }, 500)
})
