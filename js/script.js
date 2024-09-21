const btn = document.querySelector(".side-menu");
const blackEffect = document.querySelector(".black-effect");

// side menu toggle working & black effect
function sideSwipe() {
    if (btn.style.right == "0px") {
        btn.style.right = "-300px";
        document.querySelector(".black-effect").style.display = "none";
    } else {
        btn.style.right = "0px";
        document.querySelector(".black-effect").style.display = "block";
    }
}

// remove black effect
function removeBlack() {
    btn.style.right = "-300px";
    blackEffect.style.display = "none";
}

function toggleDropdown(event) {
    event.preventDefault();
    const dropdownContent = event.target.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

