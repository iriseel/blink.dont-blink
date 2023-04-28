const popup_word = document.querySelector(".popup");

const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

function randomize_color() {
    setInterval(function () {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        popup_word.style.color = randomColor;
    }, 250);
}

randomize_color();
