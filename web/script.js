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
const bg_text = document.querySelector(".textbox_bg");

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
    "DON’T BLINK",
    "I AM NOTHING IF NOT AN IMAGE PROCESSOR",
    "THE SECRET TO PHONE ADDICTION: INTERMITTENT VARIABLE-RATIO REINFORCEMENT SCHEDULE",
    "THE MOTHER OF HABIT-FORMING TECHNOLOGY IS PROBABLY EMAIL.",
    "ONE DAY WE WILL ALL BE ENGINEERED TO GROW COMPOUND EYES SO WE CAN PROCESS MORE IMAGES AT ONCE",
    "I AM AN EXHIBITIONIST OF THE INTERNET. LOOK AT ME LOOKING",
    "THIS STARING CONTEST WITH THE SCREEN WILL ONLY HAVE ONE VICTOR",
    "I SPEND MORE TIME LOOKING INTO THE EYES OF MY WEBCAM THAN THOSE OF MY LOVER",
    "HOW TO GAZE MORE AMOROUSLY AT YOUR SCREEN",
    "THE WILL TO LIGHT THE NIGHT IS IN ESSENCE A WILL TO POWER.",
    "DON’T SLEEP, WATCH!",
    "WHO WILL WIN THE COMPETITION AGAINST SLEEP?",
    "YOU NOW HAVE A SHORTER ATTENTION SPAN THAN A GOLDFISH",
    "OUR EYES REACH FOR OUR SCREENS",
    "BOTHERED BY THE BRIGHT LIGHTS WE MAKE SIGNS",
    // "",
    // "",
    // "",
    // "",
    // "",
    // "",
    // "",
];

marquees_left = [
    "",
    "",
    "CHECK CHECK CHECK",
    "Is there really a drastic difference in what works on getting me to click versus what i really want?",
    "PLEASE SHARE, SHARE TO PLEASE",
    "SCREEN-GAZING = LESS BLINKING = EFFICIENCY = $$$",
    "",
    "",
    "",
    "The average human adult blinks 12 times per minute, with one blink lasting about ⅓ second. With the average adult awake for 17 hours in a day, that is 1 hour and 8 minutes of blinking that could have been spent on looking.",
    "THE MORE WE LOOK THE LESS WE SEE",
];

const texts_right = [
    "DON’T BLINK",
    "I AM NOTHING IF NOT AN IMAGE PROCESSOR",
    "PIGEON = GAMBLING ADDICT = SMARTPHONE USER?",
    "EMAIL IS A FANTASTIC VARIABLE REWARD MECHANISM.",
    "ONE DAY WE WILL ALL BE ENGINEERED TO GROW COMPOUND EYES SO WE CAN PROCESS MORE IMAGES AT ONCE",
    "COMPUTER DOMINATION TURNS ME ON",
    "THIS STARING CONTEST WITH THE SCREEN WILL ONLY HAVE ONE VICTOR",
    "I SPEND MORE TIME LOOKING INTO THE EYES OF MY WEBCAM THAN THOSE OF MY LOVER",
    "HOW TO GAZE MORE AMOROUSLY AT YOUR SCREEN",
    "INDOOR LIGHT CAUSES DEATH SPIRALS",
    "TV DISCIPLINE",
    "THE MARGINS OF SLEEP ARE PROFIT MARGINS",
    "FAKE NEWS: NO EVIDENCE THAT HUMAN ATTENTION SPANS ARE SHRINKING",
    "SCREEN-GAZING = LESS BLINKING = EFFICIENCY = $$$",
    "MODERN ROMANCE: LONG-DISTANCE RELATIONSHIP BETWEEN EYE AND SCREEN",
    "BOTHERED BY THE BRIGHT LIGHTS WE MAKE SIGNS",
    "",
];

marquees_right = [];

const links = [
    "https://en.wikipedia.org/wiki/Don%27t_Blink_(film)",
    "https://youtu.be/jk6sz25OZgw",
    "",
    "https://www.bbc.co.uk/sounds/play/p04svtlv",
    "https://www.education.com/science-fair/article/bug-eyed/ ",
    "https://mayacfriedman.github.io/seduction-of-machines/",
    "https://www.oregonlive.com/entertainment/2015/05/109th_annual_staring_contest.html",
    "https://youtu.be/SWgg20IqibM ",
    "https://www.abc.net.au/local/photos/2011/09/24/3325159.htm",
    "https://www.bbc.co.uk/sounds/play/p04svtlv",
    "https://www.wired.com/2002/11/fetishists-really-love-their-macs/",
    "https://www.deviantart.com/shadowedhand/art/Miss-Bunny-gif-784412791",
    "https://www.newyorker.com/magazine/2023/02/27/darkness-manifesto-book-johan-eklof ",
    "https://www.scmp.com/news/people-culture/trending-china/article/3200731/too-harsh-parents-china-punish-son-watching-too-much-television-all-night-tv-binge-take-turns-keep",
    "https://youtu.be/4woPg0-xyAA",
    "https://slate.com/news-and-politics/2021/08/russia-prison-tv-navalny.html",
    "https://www.theguardian.com/technology/2017/apr/18/netflix-competitor-sleep-uber-facebook",
    "https://time.com/3858309/attention-spans-goldfish/",
    "https://www.aao.org/eye-health/tips-prevention/should-you-be-worried-about-blue-light ",
    "https://www.upi.com/Odd_News/2019/10/08/Actor-goes-1-hour-17-minutes-3-seconds-without-blinking/5801570550478/",
    "https://youtu.be/LAkFtka3UFw",
    "https://youtu.be/rufnWLVQcKg",
    "",
    "",
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

let text_content = "";

let textHeight;
let textHeight_max = 70;
let textWidth;
let textWidth_max = 40;
let filter = 8;
let filter_max = 8;

// function calcDistances(x1, y1, x2, y2) {
//     return Math.hypot(x1 - x2, y1 - y2);
// }

let set_text = true;
let set_bgtext = true;
let set_color = true;
let left_closed = false;
let right_closed = false;
let been_open = true;

//using this set_text boolean so that index doesn't change like 10 times per blink, since onResults() is being called super quickly. Instead it only changes max once per 150ms
function change_text(text, texts) {
    if (set_text) {
        const text_p = text.querySelector("p");
        set_text = false;
        index++;
        if (index > texts.length - 1) index = 0;
        text_content = texts[index];

        text_p.innerHTML = text_content;
        const character_count = text_content.length;

        text_p.style.setProperty("--marquee_end", -`${character_count}em`);
        //??Why does this return NaN?
        // console.log(window.getComputedStyle(text_p, null));
        // console.log(character_count);
        // console.log(index, text);

        text.querySelector("p").innerHTML = text.textContent.replace(
            /\b\w+\b/g,
            "<span class='word' >$&</span>"
        );

        // text_p.classList.remove("scroll_up");
        text_p.className = "";
        void text_p.offsetHeight;
        text_p.classList.add("scroll_up");

        randomize_color();
        randomize_font(left_text);
        randomize_font(right_text);

        setTimeout(() => (set_text = true), 150);
    }
}

let counter = 0;
let popupWidth_Min = 100;
let popupWidth_Max = 1300;
let popupHeight_Min = 200;
let popupHeight_Max = 900;

function change_bgtext(text, texts) {
    if (set_bgtext) {
        const text_p = text.querySelector("p");
        set_text = false;
        if (bg_index > texts.length - 1) bg_index = 0;

        text_p.innerHTML = texts_bg[bg_index];
        bg_text.style.opacity = 1;
        bg_index++;

        counter++;
        let popupName = "Popup" + counter;
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

        // Open the link at the random index in a new tab
        let popup = window.open(
            links[bg_index],
            popupName,
            `width=${popupWidth},height=${popupHeight}, left=${leftPos}, top=${topPos}`
        );
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
                right_textbox,
                right_text,
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
                left_textbox,
                left_text,
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
    textbox,
    text,
    texts
) {
    let eye_face_ratio =
        ((eye_bottom_y - eye_top_y) / (face_bottom_y - face_top_y)) * 10000;

    if (eye_face_ratio <= 200) {
        change_text(text, texts);
        textHeight = 0;
        filter = 0;

        //checking if eyes are closed
        if (text == left_text) {
            left_closed = true;
        }
        if (text == right_text) {
            right_closed = true;
        }
        if (left_closed && right_closed && been_open) {
            change_bgtext(bg_text, texts_bg);
            been_open = false;
        }
    } else {
        //eyes are open
        if (text == left_text) {
            left_closed = false;
        }
        if (text == right_text) {
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

    textbox.style.height = `${Math.floor(textHeight)}vh`;
    // textbox.style.width = `${Math.floor(textWidth)}vw`;

    let text_coords = textbox.getBoundingClientRect();

    svg_path = "";
    // must input these paths in order (as if drawing the polygon)
    svg_path += `${text_coords.left},${text_coords.top} `;
    svg_path += `${text_coords.right},${text_coords.top} `;
    svg_path += `${text_coords.right},${text_coords.bottom} `;
    svg_path += `${text_coords.left},${text_coords.bottom} `;

    textbox.style[
        "-webkit-mask"
    ] = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;
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
    return (
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

function randomize_font(e) {
    let randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    e.style.fontFamily = randomFont;
}
