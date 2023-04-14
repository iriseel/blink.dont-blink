//??ISSUE for cyberduck: localhosts website says "No navigator.mediaDevices.getUserMedia exists." on loading webpage??

// define variables
const videoElement = document.getElementsByClassName("input_video")[0];
const mouthCanvasElement = document.getElementsByClassName("mouth_canvas")[0];
const mouthCanvasCtx = mouthCanvasElement.getContext("2d");
const container = document.querySelector(".container");
const bg_text = document.querySelector(".textbox_bg");
let current_left_textbox, current_right_textbox;

let index = 0;
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
    "A 2015 study found that the average Canadian attention span dropped from 12 to 8 seconds.",
    "On the bright side, that same report found that people's ability to multitask drastically improved.",
];

const texts_right = [
    "Desire travels at the speed of light",
    "The goldfish is rumoured to hold an attention span of 9 seconds.",
    "It is unclear whether goldfish can multitask.",
];

const texts_bg = [
    "Jonathan Beller, <i>The Political Economy of the Postmodern</i>",
    "Tracing the increasing marginalization of language by images in his “Language, Images and the Postmodern Predicament,” Wlad Godzich, probably borrowing from Roger Munier's pamphlet Against Images, puts it thus: “Where with language we have a discourse on the world, with human beings facing the world in order to name it, photography substitutes the simple appearance of things; it is a discourse of the world. . . . Images now allow for the paradox that the world states itself before human language.”",
    "To register the crisis that the proliferation of images poses for language and thus for the conscious mind would be to agree with Godzich that today language is outpaced by images. “Images are scrambling the function of language which must operate out of the imaginary to function optimally.”27 The overall effect of an everincreasing quantity of images is the radical alienation of consciousness, its isolation and separation, its inability to convincingly “language” reality and thus its reduction to something on the order of a free-floating hallucination, cut away as it is from all ground.",
    "When linked to the rise of image technologies, this demotion of language and of its capacity to slow down the movement of reality suggests, that the radical alienation of language, that is, the alienation of the subject and its principle means of self-expression and self-understanding, is a structural e¤ect of the intensification of capitalism and therefore, an instrumental strategy of domination.",
    "In addition to Marx's description of the four-fold alienation produced by wage-labor (from the object, the self, other people, and the species), bodies become deprived of the power of speech. This image-consciousness, or better, image/consciousness in which consciousness is an afterthought of the spectacle, participates in the rendering of an intensified auratic component, theorized as “simulation” or “the simulacrum,” to nearly every aspect of social existence in the technologically permeated world. Beyond all reckoning, the objective world is newly regnant with an excess of sign value, or rather, with values exceeding the capacities of the sign.",
    "Frenzied attempts to language “reality” (what appears) become hysterical because everything is a symptom of something else. Such a promiscuity of signification, what Baudrillard called “the ecstasy of communication,” implies, in short, a devaluation of signification— a radical instability, unanchoredness, and inconsistency of consciousness to such an extent that consciousness becomes unconsciousness by other means.28 In the onslaught of the spectacle, consciousness cannot take hold, it does not “take,” but rather roams and sputters in fits and starts.",
];

const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

let text_content = "";

let textHeight;
let textHeight_max = 70;
// let textWidth;
let textWidth_max = 40;
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

function generate_eye_div(id, text = "") {
    const eye_container = document.querySelector(`.${id}_container`);
    //don't create mroe than 6 of each eye
    if (eye_container.childNodes.length >= 7) return;
    console.log(eye_container.childNodes.length);
    const windowDiv = document.createElement("div");
    windowDiv.classList.add("window");
    const textboxDiv = document.createElement("div");
    textboxDiv.classList.add("textbox");
    textboxDiv.classList.add(id);
    const textDiv = document.createElement("div");
    textDiv.setAttribute("data-loc", id);
    const paragraphEl = document.createElement("p");
    paragraphEl.id = "p_" + id + "_" + eye_container.childNodes.length;
    paragraphEl.innerHTML = text;
    //??What is happening when I'm adding an img??
    const img = document.createElement("div");
    img.classList.add("image");
    textDiv.appendChild(img);
    textDiv.appendChild(paragraphEl);
    textboxDiv.appendChild(textDiv);
    windowDiv.appendChild(textboxDiv);
    eye_container.appendChild(windowDiv);

    console.log("called", id);
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

//using this set_text boolean so that index doesn't change like 10 times per blink, since onResults() is being called super quickly. Instead it only changes max once per 150ms
function change_text(text, texts) {
    if (set_text) {
        const text_p = text.querySelector("p");
        const eye_orientation = text.getAttribute("data-loc");
        set_text = false;
        index++;
        if (index > texts.length - 1) index = 0;
        text_content = texts[index];
        text_p.innerHTML = text_content;
        const character_count = text_content.length;
        text_p.style.setProperty("--marquee_end", -`${character_count}em`);
        //??Why does this return NaN?
        // console.log(getComputedStyle(text_p).getPropertyValue("--marquee_end"));
        // console.log(character_count);
        // console.log(index, text);
        const span_on_text = text.textContent.replace(
            /\b\w+\b/g,
            "<span class='word' >$&</span>"
        );

        text_p.innerHTML = span_on_text;

        if (eye_orientation == "left" && current_left_textbox) {
            current_left_textbox.paragraphEl.innerHTML = span_on_text;
        } else if (eye_orientation == "right" && current_right_textbox) {
            current_right_textbox.paragraphEl.innerHTML = span_on_text;
        }

        randomize_color();
        randomize_font(left_box.textDiv);
        randomize_font(right_box.textDiv);

        setTimeout(() => (set_text = true), 150);
    }
}

function add_eyes() {
    const right_text = texts_right[index].replace(
        /\b\w+\b/g,
        "<span class='word' >$&</span>"
    );

    const left_text = texts_left[index].replace(
        /\b\w+\b/g,
        "<span class='word' >$&</span>"
    );

    current_right_textbox = generate_eye_div("right", right_text);
    current_left_textbox = generate_eye_div("left", left_text);

    randomize_color();
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
        // make_new_textbox();

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
            been_open = false;
        }
        change_text(side_box.textDiv, texts);
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
        let th = Math.floor(text_height - index * 6);
        //if th is less than 0, return 0 for th (or else eyes never close), or else just return th
        th = th <= 0 ? 0 : th;
        let tw = Math.floor(textWidth_max - index * 6);
        tw = tw <= 0 ? 0 : tw;

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

function make_new_textbox() {
    const new_textbox = document.createElement("div");
    new_textbox.classList.add("textbox");
    document.querySelector(".container").appendChild(new_textbox);
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

function randomize_font(e) {
    let randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    e.style.fontFamily = randomFont;
}
