//??ISSUE for cyberduck: localhosts website says "No navigator.mediaDevices.getUserMedia exists." on loading webpage??

// define variables
const videoElement = document.getElementsByClassName("input_video")[0];
const mouthCanvasElement = document.getElementsByClassName("mouth_canvas")[0];
const mouthCanvasCtx = mouthCanvasElement.getContext("2d");
const container = document.querySelector(".container");
const bg_text = document.querySelector(".textbox_bg");
let current_left_textbox, current_right_textbox;

let index = 0;
let index_left = 0;
let index_right = 0;
let bg_index = 0;

const fonts = [
    "Bodoni, serif",
    "Helvetica, sans-serif",
    "Futura, sans-serif",
    // "Univers, sans-serif",
    "Pico, sans-serif",
    "proxima-nova, sans-serif",
    "myriad-pro, sans-serif",
];

const texts_left = [
    "Desire travels at the speed of light",
    "Focus your attention",
    // "dazzled",
    "Eye recognition:",
    "An image is worth a thousand words",
    "stare, blink, squint, gaze",

    "short blink",
    "long blink",
    "So much to be said by seeing.",

    "the city that never sleeps",

    // "A 2015 study found that the average Canadian attention span dropped from 12 to 8 seconds.",
    // "On the bright side, that same report found that people's ability to multitask drastically improved.",
];

const animation_durations_left = [
    "marquee_6s",
    "marquee_5s",
    "marquee_5s",
    "marquee_9s",
    "marquee_7s",

    "marquee_2s",
    "marquee_2s",
    "marquee_5s",

    "marquee_6s",
];

const texts_right = [
    "Desire travels at the speed of light",
    "So that it can dissolve",
    // "dazed",
    "I recognize you by what you have seen with your desiring eye.",
    "But what about a look?",
    "A morse code of desire",

    "dot",
    "dash",
    "What would it take to foster an eloquence of looking?",

    "the empire on which the sun never sets",

    // "The goldfish is rumoured to hold an attention span of 9 seconds.",
    // "It is unclear whether goldfish can multitask.",
];

const animation_durations_right = [
    "marquee_6s",
    "marquee_5s",
    "marquee_16s",
    "marquee_5s",
    "marquee_5s",

    "marquee_2s",
    "marquee_2s",
    "marquee_13s",
    "marquee_9s",
];

const texts_bg = [
    "Jonathan Beller, <i>The Political Economy of the Postmodern</i>",
    "Tracing the increasing marginalization of language by images in his “Language, Images and the Postmodern Predicament,” Wlad Godzich, probably borrowing from Roger Munier's pamphlet Against Images, puts it thus:",
    "“Where with language we have a discourse on the world, with human beings facing the world in order to name it, photography substitutes the simple appearance of things; it is a discourse of the world. . . . Images now allow for the paradox that the world states itself before human language.”",
    "To register the crisis that the proliferation of images poses for language and thus for the conscious mind would be to agree with Godzich that today language is outpaced by images.",
    "“Images are scrambling the function of language which must operate out of the imaginary to function optimally.”",
    "The overall effect of an everincreasing quantity of images is the radical alienation of consciousness, its isolation and separation, its inability to convincingly “language” reality and thus its reduction to something on the order of a free-floating hallucination, cut away as it is from all ground.",
    "When linked to the rise of image technologies, this demotion of language and of its capacity to slow down the movement of reality suggests, that the radical alienation of language, that is, the alienation of the subject and its principle means of self-expression and self-understanding, is a structural e¤ect of the intensification of capitalism and therefore, an instrumental strategy of domination.",
    "In addition to Marx's description of the four-fold alienation produced by wage-labor (from the object, the self, other people, and the species), bodies become deprived of the power of speech. This image-consciousness, or better, image/consciousness in which consciousness is an afterthought of the spectacle, participates in the rendering of an intensified auratic component, theorized as “simulation” or “the simulacrum,” to nearly every aspect of social existence in the technologically permeated world.",
    "Beyond all reckoning, the objective world is newly regnant with an excess of sign value, or rather, with values exceeding the capacities of the sign.",
    "Frenzied attempts to language “reality” (what appears) become hysterical because everything is a symptom of something else. Such a promiscuity of signification, what Baudrillard called “the ecstasy of communication,” implies, in short, a devaluation of signification— a radical instability, unanchoredness, and inconsistency of consciousness to such an extent that consciousness becomes unconsciousness by other means.",
    "In the onslaught of the spectacle, consciousness cannot take hold, it does not “take,” but rather roams and sputters in fits and starts.",
];

const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

let textHeight;
let textHeight_max = 30;
// let textWidth;
let textWidth_max = 15;
let filter = 8;
let filter_max = 8;
let fontsize_max = 10;

// function calcDistances(x1, y1, x2, y2) {
//     return Math.hypot(x1 - x2, y1 - y2);
// }

let set_text = true;
let set_bgtext = true;
let set_color = true;
let left_closed = false;
let right_closed = false;
let been_open = true;

// Generate the HTML elements for each eye

function generate_eye_div(id) {
    const eye_container = document.querySelector(`.${id}_container`);

    const texts = id === "left" ? texts_left : texts_right;
    const animation_durations =
        id === "left" ? animation_durations_left : animation_durations_right;
    const index = id === "left" ? index_left : index_right;

    if (index_left > texts_left.length - 1) index_left = 0;
    if (index_right > texts_right.length - 1) index_right = 0;

    const text_content = texts[index];
    const animation_duration = animation_durations[index];
    // console.log({ index, animation_duration });

    const span_on_text = text_content.replace(
        /\b\w+\b/g,
        "<span class='word' >$&</span>"
    );

    //makes sure all the left and right textboxes update to the same text
    if (id == "left") {
        const all_eyes_left = document.querySelectorAll(".textbox.left p");
        all_eyes_left.forEach((eye) => {
            eye.innerHTML = span_on_text;
            eye.className = "";
            void eye.offsetWidth; // Trigger a reflow to restart the animation
            eye.classList.add(animation_duration);
        });
    } else if (id == "right") {
        const all_eyes_right = document.querySelectorAll(".textbox.right p");
        all_eyes_right.forEach((eye) => {
            eye.innerHTML = span_on_text;
            eye.className = "";
            void eye.offsetWidth; // Trigger a reflow to restart the animation
            // eye.classList.add("marquee");
            eye.classList.add(animation_duration);
        });
    }

    randomize_color();
    randomize_font();

    id === "left" ? index_left++ : index_right++;

    //don't create more than 6 of each eye
    if (eye_container.childNodes.length >= 7) return;
    // console.log(eye_container.childNodes.length);
    const windowDiv = document.createElement("div");
    windowDiv.classList.add("window");
    const textboxDiv = document.createElement("div");
    textboxDiv.classList.add("textbox");
    textboxDiv.classList.add(id);
    const textDiv = document.createElement("div");
    textDiv.setAttribute("data-loc", id);
    const paragraphEl = document.createElement("p");
    paragraphEl.id = "p_" + id + "_" + eye_container.childNodes.length;
    //??What is happening when I'm adding an img??
    // const img = document.createElement("div");
    // img.classList.add("image");
    // textDiv.appendChild(img);
    textDiv.appendChild(paragraphEl);
    textboxDiv.appendChild(textDiv);
    windowDiv.appendChild(textboxDiv);
    eye_container.appendChild(windowDiv);

    windowDiv.style.zIndex = 10 - eye_container.childNodes.length;

    paragraphEl.innerHTML = span_on_text;

    randomize_color();
    randomize_font();

    paragraphEl.style.animationDuration = animation_duration + "s";
    paragraphEl.classList.add(animation_duration);

    return {
        textDiv,
        paragraphEl,
        textBox: textboxDiv,
    };
}

// Initiate the eye divs
const left_box = generate_eye_div("left");
const right_box = generate_eye_div("right");
// another way to write this would be:
// const [left_box, right_box] = ["left", "right"].map((id) =>
//     generate_eye_div(id)
// );

function add_eyes() {
    current_right_textbox = generate_eye_div("right");
    current_left_textbox = generate_eye_div("left");
}

function change_bgtext(text, texts) {
    if (set_bgtext) {
        const text_p = text.querySelector("p");
        set_text = false;
        if (bg_index > texts.length - 1) bg_index = 0;

        text_p.innerHTML = texts_bg[bg_index];
        bg_text.style.opacity = 1;
        bg_index++;
    }
}

//global booleans
let ended = false;

//FACEMESH STUFF
// Results Handler
function onResults(results) {
    remove_black_screen();
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
                right_box,
                texts_right
            );

            // LEFT EYE ////////////////////////////////
            let left_eye_bottom_y = results.multiFaceLandmarks[0][374].y;
            let left_eye_top_y = results.multiFaceLandmarks[0][386].y;

            set_eye_height(
                face_bottom_y,
                face_top_y,
                left_eye_bottom_y,
                left_eye_top_y,
                left_box,
                texts_left
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
    side_box,
    texts
) {
    let eye_face_ratio =
        ((eye_bottom_y - eye_top_y) / (face_bottom_y - face_top_y)) * 10000;

    if (eye_face_ratio <= 200) {
        textHeight = 0;
        filter = 0;

        //checking if eyes are closed
        if (side_box === left_box) {
            left_closed = true;
        }
        if (side_box === right_box) {
            right_closed = true;
        }
        if (left_closed && right_closed && been_open) {
            change_bgtext(bg_text, texts_bg);
            add_eyes();
            console.log("closed");
            been_open = false;
        }
    } else {
        //eyes are open
        if (side_box === left_box) {
            left_closed = false;
        }
        if (side_box === right_box) {
            right_closed = false;
        }
        if (!left_closed && !right_closed) {
            been_open = true;
            bg_text.style.opacity = 0;
        }

        if (eye_face_ratio >= 450) {
            textHeight = textHeight_max;
            filter = filter_max;
        } else if (eye_face_ratio > 200 && eye_face_ratio < 450) {
            textHeight = Math.abs(
                map(eye_face_ratio, 200, 450, 0, textHeight_max)
            );
            filter = map(eye_face_ratio, 200, 450, 0, filter_max);
            // textWidth = Math.abs(map(eye_face_ratio, 200, 450, 0, textWidth_max));
        }
    }

    // text.style.filter = `blur(${filter}px)`;

    const eye_is_left =
        side_box.textDiv.getAttribute("data-loc") == "left" ? true : false;
    if (eye_is_left) {
        setTextBoxHeight(".textbox.left", textHeight);
    } else {
        setTextBoxHeight(".textbox.right", textHeight);
    }
}

function setTextBoxHeight(selector, text_height) {
    const textboxes = document.querySelectorAll(selector);
    textboxes.forEach((txtbox, index) => {
        let th = Math.floor(text_height + index * 7);
        //if th is equal to or less than index * 6, that means text_height is 0, so return 0 for th (or else eyes never close), or else just return th
        th = th <= index * 7 ? 0 : th;
        let tw = Math.floor(textWidth_max + index * 6);
        tw = tw <= index * 6 ? 0 : tw;

        txtbox.style.height = `${th}vh`;
        txtbox.style.width = `${tw}vw`;

        // txtbox.style.fontSize = `${Math.abs(
        //     Math.floor(fontsize_max - index * 3)
        // )}vh`;
        // console.log(txtbox.style.height, txtbox.style.width);
    });
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

// Event Listener
faceMesh.onResults(onResults);

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
    return Math.floor(
        ((in_val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

const round = (val) => Math.ceil(val / 20) * 20;

function remove_black_screen() {
    document.querySelector(".black_screen").style.display = "none";
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
        }, 500);
    });
}

function randomize_font() {
    const textdivs = document.querySelectorAll(".textbox p");
    textdivs.forEach(function (textdiv) {
        let randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        textdiv.style.fontFamily = randomFont;
    });
}
