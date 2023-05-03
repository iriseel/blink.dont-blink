//??ISSUE for cyberduck: localhosts website says "No navigator.mediaDevices.getUserMedia exists." on loading webpage??

//ISSUES: making animations more exaggerated and smoother
//??Where should I place all the functions outside of onResults? Before or after?

// define variables
const videoElement = document.getElementsByClassName("input_video")[0];
const mouthCanvasElement = document.getElementsByClassName("mouth_canvas")[0];
const mouthCanvasCtx = mouthCanvasElement.getContext("2d");
const left_textbox = document.querySelector(".textbox.left");
const right_textbox = document.querySelector(".textbox.right");
const left_text = document.querySelector(".text.left");
const right_text = document.querySelector(".text.right");

const left_marquee = document.querySelector(".left.eye_container .bottom_bar");

const right_marquee = document.querySelector(
    ".right.eye_container .bottom_bar"
);

let index = 0;

const full_textbox = document.querySelector(".full_textbox");

let left_textcoords = [];
let right_textcoords = [];

marquees_left = [];

marquees_right = [];

const text =
    "In the race for attention, because there’s only so much attention, companies have to get more and more aggressive. I call it the race to the bottom of the brain stem. So it starts with techniques like pull to refresh, so you pull to refresh your newsfeed, that operates like a slot machine, it has the same kind of addictive qualities that people in Las Vegas hooked to the slot machine. Other examples are removing the stopping cues, so if I take the bottom out of this glass, and I keep refilling the water or the wine, you won't know when to stop drinking. So that's what happens with infinitely scrolling feeds, we naturally remove the stopping cues and this is what keeps people scrolling. But the race for attention has to get more and more aggressive. And so it’s not enough to just to get your behavior and predict what will take your behavior, we have to predict how to keep you hooked in a different way. And so, it crawls deeper down the brain stem, into our social validation. That was the introduction of likes and followers, how many followers do I have. And it was much cheaper, instead of getting your attention, to get you addicted to getting attention from other people. … And in the race for attention, it’s not enough just to get people addicted to attention, the race has to migrate to AI. Who can build a better predictive model of your behavior?";

// const text =
//     "The average attention span for the notoriously ill-focused goldfish is nine seconds, but according to a new study from Microsoft Corp., people now generally lose concentration after eight seconds, highlighting the affects of an increasingly digitalized lifestyle on the brain. Researchers in Canada surveyed 2,000 participants and studied the brain activity of 112 others using electroencephalograms (EEGs). Microsoft found that since the year 2000 (or about when the mobile revolution began) the average attention span dropped from 12 seconds to eight seconds. “Heavy multi-screeners find it difficult to filter out irrelevant stimuli — they’re more easily distracted by multiple streams of media,” the report read. On the positive side, the report says our ability to multitask has drastically improved in the mobile age. Microsoft theorized that the changes were a result of the brain’s ability to adapt and change itself over time and a weaker attention span may be a side effect of evolving to a mobile Internet. The survey also confirmed generational differences for mobile use; for example, 77% of people aged 18 to 24 responded “yes” when asked, “When nothing is occupying my attention, the first thing I do is reach for my phone,” compared with only 10% of those over the age of 65. And now congratulate yourself for concentrating long enough to make it through this article.";

function randomize_num(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//this splits text into single words
// const text_words = text.split(" ");

//this splits texts into segments of randomized lengths (between word_min and word_max)
function splitStringIntoSegments(text) {
    let word_min;
    let word_max;
    const words = text.split(" ");
    const segments = [];

    while (words.length > 0) {
        if (Math.random() >= 0.5) {
            word_min = 1;
            word_max = 3;
        } else {
            word_min = 8;
            word_max = 16;
        }
        const segmentLength = randomize_num(word_min, word_max);
        const segment = words.splice(0, segmentLength).join(" ");
        segments.push(segment);
    }

    return segments;
}

const text_words = splitStringIntoSegments(text);

// console.log(text_words);

const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

let text_content = "";

let textHeight;
let textHeight_max = 60;
let textWidth;
let textWidth_max = 40;

// function calcDistances(x1, y1, x2, y2) {
//     return Math.hypot(x1 - x2, y1 - y2);
// }

let set_text = true;
let set_popup = true;
let set_color = true;
let left_closed = false;
let right_closed = false;
let been_open = true;

//using this set_text boolean so that index doesn't change like 10 times per blink, since onResults() is being called super quickly. Instead it only changes max once per 150ms
function change_text() {
    if (set_text) {
        const text_p = full_textbox.querySelector("p");

        set_text = false;

        text_p.innerHTML = text_p.textContent.replace(
            /\b\w+\b/g,
            "<span class='word' >$&</span>"
        );

        randomize_color();

        setTimeout(() => (set_text = true), 150);
    }
}

change_text();

let counter = 0;
let popup_w;
// this is for when each popup only has 1 word
// let popupHeight = 150;

//index resets while counter does not
function popup() {
    if (set_popup) {
        if (index > text_words.length - 1) index = 0;
        console.log("counter", counter);

        // this is for calculating popupWidth when each popup only has 1 word
        const character_count = text_words[index].length;
        // let popupWidth = character_count * 100;

        let audio_start = 0;
        let audio_end = audio_start + character_count * 100;

        //Trying to make the popupHeigth and width always be just right to show all of the text_words
        // Create a temporary element and put the text in it in order to measure content size
        const tempElement = document.createElement("div");
        tempElement.classList.add("temp");
        tempElement.style.position = "absolute";
        tempElement.style.visibility = "hidden";
        tempElement.style.width = randomize_num(100, 1000) + "px";
        // console.log("tempElem width", tempElement.style.width);
        tempElement.innerHTML = text_words[index];
        document.body.appendChild(tempElement);

        // Measure the size of the content
        const contentWidth = tempElement.offsetWidth;
        console.log(contentWidth);
        let contentHeight = tempElement.offsetHeight;
        console.log("contentHeight", contentHeight);

        //??Sometimes there are too many words in a given tempElement width, so that even fullscreen height isn't enough to display all the words. I'm trying to counteract this by scaling down the fontsize accordingly but the fit is still not quite right??
        let fontsize = 200;
        const windowHeight = window.innerHeight;
        while (contentHeight > windowHeight) {
            fontsize -= 2;
            tempElement.style.fontSize = fontsize + "px";

            //??I think the issue here is that the contentHeight isn't changing from the original setting just because font-size is decreasing
            contentHeight = tempElement.offsetHeight;
        }

        // Calculate the window size with some padding or margin if needed
        const popupWidth = contentWidth + 50; // Add padding
        const popupHeight = contentHeight + 50; // Add padding

        // Remove the temporary element
        document.body.removeChild(tempElement);

        const screenWidth = window.screen.availWidth;
        const screenHeight = window.screen.availHeight;
        var leftPos = Math.floor(Math.random() * (screenWidth - popupWidth));
        var topPos = Math.floor(Math.random() * (screenHeight - popupHeight));

        var popupName = "Popup" + counter;

        popup_w = window.open(
            "",
            popupName,
            `width=${popupWidth},height=${popupHeight}, left=${leftPos}, top=${topPos}`
        );

        popup_w.onload = function () {
            popup_w.audio_start = audio_start;
            console.log(audio_start);
            popup_w.audio_end = audio_end;
        };

        popup_w.document.write(
            `<html><head><link rel="stylesheet" href="popup.css" /><title>Popup</title></head><body>
            <div class="popup" style="font-size: ${fontsize}">${text_words[index]}</div>
            <script src="popup.js"></script>
            </body></html>`
        );

        //tried this to get max size text to random popupWidth
        //         popup_w.document.write(
        //             `<html><head><script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        // <script src="jquery.fittext.js"></script><script>jQuery(".popup").fitText();</script><link rel="stylesheet" href="popup.css" /><title>Popup</title></head><body><div class="popup">${text_words[counter]}</div></body></html>`
        //         );

        counter++;
        index++;
    }
}

//global booleans
let ended = false;

//FACEMESH STUFF
// Results Handler
function onResults(results) {
    //need this if statement, or else video freezes when it can't find the multiFaceLandmarks (e.g. when user has turned their head away from the camera)
    if (results.multiFaceLandmarks && !ended) {
        //needs [0] bc the array of results.multiFaceLandmarks has multiple things inside it, but facemesh points are stored in [0]
        if (results.multiFaceLandmarks[0]) {
            mouthCanvasCtx.save();

            clear_canvas();

            //Facemesh/mediapipe gives the x and y values of its landmarks as percentages of the total webcam view size (where 0 is leftmost, 1 is rightmost), rather than specific numerical coordinates.

            //Using this right_eye_face_ratio to return the ratio as a percentage (percentage of face that eye takes up) rather than absolute values, and therefore right_eye_face_ratio won't change with the user's distance from the webcam
            let face_bottom_y = results.multiFaceLandmarks[0][152].y;
            let face_top_y = results.multiFaceLandmarks[0][10].y;

            // RIGHT EYE ////////////////////////////////
            let right_eye_bottom_y = results.multiFaceLandmarks[0][145].y;
            let right_eye_top_y = results.multiFaceLandmarks[0][159].y;

            set_eye_height(
                face_bottom_y,
                face_top_y,
                right_eye_bottom_y,
                right_eye_top_y,
                right_textbox,
                right_marquee
            );

            // LEFT EYE ////////////////////////////////
            let left_eye_bottom_y = results.multiFaceLandmarks[0][374].y;
            let left_eye_top_y = results.multiFaceLandmarks[0][386].y;

            set_eye_height(
                face_bottom_y,
                face_top_y,
                left_eye_bottom_y,
                left_eye_top_y,
                left_textbox,
                left_marquee
            );

            mouthCanvasCtx.restore();
        }
    }
}

function set_eye_height(
    face_bottom_y,
    face_top_y,
    eye_bottom_y,
    eye_top_y,
    textbox,
    marquee
) {
    let eye_face_ratio =
        ((eye_bottom_y - eye_top_y) / (face_bottom_y - face_top_y)) * 10000;

    if (eye_face_ratio <= 200) {
        textHeight = 0;

        //checking if eyes are closed
        if (textbox == left_textbox) {
            left_closed = true;
        }
        if (textbox == right_textbox) {
            right_closed = true;
        }
        if (left_closed && right_closed && been_open) {
            change_text();
            popup();
            been_open = false;
        }
    } else {
        //eyes are open
        if (textbox == left_textbox) {
            left_closed = false;
        }
        if (textbox == right_textbox) {
            right_closed = false;
        }
        if (!left_closed && !right_closed) {
            been_open = true;
        }

        if (eye_face_ratio >= 450) {
            textHeight = textHeight_max;
        } else if (eye_face_ratio > 200 && eye_face_ratio < 450) {
            textHeight = Math.abs(
                map(eye_face_ratio, 200, 450, 0, textHeight_max)
            );
        }
    }

    textbox.style.height = `${Math.floor(textHeight)}vh`;

    let text_coords = textbox.getBoundingClientRect();

    let svg_path = "";
    // must input these paths in order (as if drawing the polygon)
    svg_path += `${text_coords.left},${text_coords.top} `;
    svg_path += `${text_coords.right},${text_coords.top} `;
    svg_path += `${text_coords.right},${text_coords.bottom} `;
    svg_path += `${text_coords.left},${text_coords.bottom} `;

    textbox.style[
        "-webkit-mask"
    ] = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;

    marquee.style[
        "-webkit-mask"
    ] = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;

    //??Why doesn't this work on full_Textbox??
    full_textbox.style[
        "-webkit-mask"
    ] = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;

    if (textbox == left_textbox) {
        left_textcoords.push(
            `${text_coords.left},${text_coords.top} `,
            `${text_coords.right},${text_coords.top} `,
            `${text_coords.right},${text_coords.bottom} `,
            `${text_coords.left},${text_coords.bottom} `
        );
    } else if (textbox == right_textbox) {
        right_textcoords.push(
            `${text_coords.left},${text_coords.top} `,
            `${text_coords.right},${text_coords.top} `,
            `${text_coords.right},${text_coords.bottom} `,
            `${text_coords.left},${text_coords.bottom} `
        );

        full_textbox_mask();
    }
}
// 665,233.25 1330,233.25 1330,793.046875 665,793.046875
// 0,233.25 665,233.25 665,233.25 1330,233.25 1330,793.046875 665,793.046875 665,793.046875 0,793.046875
function full_textbox_mask() {
    let full_svg_path = "";
    full_svg_path += left_textcoords[0];

    full_svg_path += left_textcoords[1];

    full_svg_path += right_textcoords[0];

    full_svg_path += right_textcoords[1];

    full_svg_path += right_textcoords[2];

    full_svg_path += right_textcoords[3];

    full_svg_path += left_textcoords[2];

    full_svg_path += left_textcoords[3];

    // console.log(full_svg_path);
    //??the full_svg_path seems fine, but it's not applying??
    full_textbox.style[
        "-webkit-mask"
    ] = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${full_svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;
    left_textcoords = [];
    right_textcoords = [];
}

// Create Facemesh
const faceMesh = new FaceMesh({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
});

// Options
faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
});

// Create Camera
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await faceMesh.send({ image: videoElement });
    },
    //These width and height are the dimensions of the original canvas, that then gets stretched to 100vw and 100vh to cover the whole screen in the css stylesheet
    width: 1280,
    height: 720,
});

// Start Cam
camera.start();

// ===============================
//General / reusable functions
// https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
function map(in_val, in_min, in_max, out_min, out_max) {
    return (
        ((in_val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

const round = (val) => Math.ceil(val / 20) * 20;

window.addEventListener("click", init);

//for testing
// window.addEventListener("click", function () {
//     popup();
// });

function init() {
    document.querySelector(".black_screen").style.display = "none";

    // Event Listener
    faceMesh.onResults(onResults);

    window.removeEventListener("click", init);
}

function clear_canvas() {
    mouthCanvasCtx.clearRect(
        0,
        0,
        mouthCanvasElement.width,
        mouthCanvasElement.height
    );
}

function randomize_color() {
    const words = document.querySelectorAll(".word");
    words.forEach(function (word) {
        setInterval(function () {
            const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
            word.style.color = randomColor;
        }, 250);
    });
}
