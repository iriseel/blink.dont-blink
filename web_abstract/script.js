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

let counter = 0;
let popup_w;

let popupWidth_Min = 100;
let popupWidth_Max = 1300;
let popupHeight_Min = 200;
let popupHeight_Max = 900;

//index resets while counter does not
function popup() {
    if (set_popup) {
        let popupWidth =
            Math.floor(Math.random() * (popupWidth_Max - popupWidth_Min + 1)) +
            popupWidth_Min;
        let popupHeight =
            Math.floor(
                Math.random() * (popupHeight_Max - popupHeight_Min + 1)
            ) + popupHeight_Min;
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

        popup_w.document.write(
            `<html><head><link rel="stylesheet" href="popup.css" /><title>Popup</title></head><body>
            <div class="popup"></div>
            <script src="popup.js"></script>
            </body></html>`
        );

        counter++;
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
