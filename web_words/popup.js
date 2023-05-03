const popup_word = document.querySelector(".popup");

const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

function randomize_color() {
    setInterval(function () {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        popup_word.style.color = randomColor;
    }, 250);
}

randomize_color();
// textFit(popup_word, {
//     // multiLine: true,
//     maxFontSize: 1000,
//     // widthOnly: false,
// });

const isOverflown = ({ clientHeight, scrollHeight }) =>
    scrollHeight > clientHeight;

const resizeText = ({
    element,
    elements,
    minSize = 10,
    maxSize = 512,
    step = 1,
    unit = "px",
}) => {
    (elements || [element]).forEach((el) => {
        let i = minSize;
        let overflow = false;
        const parent = el.parentNode;
        while (!overflow && i < maxSize) {
            el.style.fontSize = `${i}${unit}`;
            overflow = isOverflown(parent);
            if (!overflow) i += step;
        }
        // revert to last state where no overflow happened
        el.style.fontSize = `${i - step}${unit}`;
    });
};

resizeText({
    element: popup_word,
    step: 0.5,
});

//?? onload doesn't work, and neither does this. Eventlistener is never called
// // window.addEventListener("DOMContentLoaded", function () {
// const audio = new Audio("audio/Tristan_Harris.mp3");
// const audio_start = window.opener.audio_start;
// const audio_end = window.opener.audio_end;

// console.log(window.opener);
// console.log("audio start", audio_start);
// function play_audio() {
//     audio.currentTime = audio_start;
//     audio.play();
// }
// play_audio();

// int = setInterval(function () {
//     if (audio.currentTime >= audio_end) {
//         audio.stop();
//         clearInterval(int);
//         play_audio();
//     }
// }, 10);
// // });
