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

const fonts = [
    "Bodoni, serif",
    "Helvetica, sans-serif",
    "Futura, sans-serif",
    // "Univers, sans-serif",
    "Pico, sans-serif",
    "proxima-nova, sans-serif",
    "myriad-pro, sans-serif",
];

const texts = [
    "DON'T BLINK! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(3),
    "Shocking Truth Revealed: Why We're Addicted to our Phones and Can't Look Away! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Animal Vision: What You Didn't Know About Ocelli, Compound Eyes, and Camera Eyes - Mind Blowing! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Are Your Devices Killing Your Love Life? The Surprising Science Behind Intimate Machines and Arousal. &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "The Annual Staring Contest in Portland: Can You Handle the Eye-Straining Tension? &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Big Train Staring Final: Who Will Emerge Victorious in this Epic Battle of Wills? &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Eyesore Wins 40-Minute Staring Competition - The Shocking Upset You Didn't See Coming! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Macs and Fetishes: The Surprising Link You Need to Know About! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Is Our Planet Doomed? The Shocking Truth About How Artificial Light is Poisoning Our Environment. &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Parents Punish Son with All-Night TV Binge - Is This the Craziest Punishment Ever? &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "The Clockwork Orange Ludovico Technique: What You Need to Know About This Infamous Mind Control Method. &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Political Prisoners Forced to Watch State TV in Russia - The Shocking Reality You Didn't Know About! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Move Over Netflix, Sleep is Your Biggest Streaming Competitor! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Are You Smarter Than a Goldfish? Shocking New Study Reveals the Truth About Your Attention Span. &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "The Attention Span Myth Debunked - What You Really Need to Know! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Blue Light: The Silent Killer of Your Vision? Find Out Now! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "Actor Sets Unbelievable Blinking Record - How Did He Do It? &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "The Surprising Reason Why So Many People Need Glasses Now - You Won't Believe It! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
    "The Unbelievable Morse Code Message Admiral Jeremiah Denton Sent Using Just His Blinks - Mind Blowing! &nbsp; &nbsp; &nbsp; &nbsp;".repeat(
        3
    ),
];

marquees_left = [];

marquees_right = [];

const links = [
    // "https://en.wikipedia.org/wiki/Don%27t_Blink_(film)",
    // "https://youtu.be/jk6sz25OZgw?autoplay=0",
    "https://vimeo.com/327611575",
    "https://www.bbc.co.uk/sounds/play/p04svtlv",
    "https://www.education.com/science-fair/article/bug-eyed/ ",
    "https://mayacfriedman.github.io/seduction-of-machines/",
    "https://www.oregonlive.com/entertainment/2015/05/109th_annual_staring_contest.html",
    // "https://youtu.be/SWgg20IqibM ",
    "https://vimeo.com/18966431",
    "https://www.abc.net.au/local/photos/2011/09/24/3325159.htm",
    "https://www.wired.com/2002/11/fetishists-really-love-their-macs/",
    // "https://www.deviantart.com/shadowedhand/art/Miss-Bunny-gif-784412791",
    "https://www.newyorker.com/magazine/2023/02/27/darkness-manifesto-book-johan-eklof ",
    "https://www.scmp.com/news/people-culture/trending-china/article/3200731/too-harsh-parents-china-punish-son-watching-too-much-television-all-night-tv-binge-take-turns-keep",
    // "https://youtu.be/4woPg0-xyAA",
    "https://3.bp.blogspot.com/-6saQ9u7ILBc/UZ3CJ0SmjdI/AAAAAAAADQs/6df5HjF37HU/s1600/aclockworkorange5.gif",
    "https://slate.com/news-and-politics/2021/08/russia-prison-tv-navalny.html",
    "https://www.theguardian.com/technology/2017/apr/18/netflix-competitor-sleep-uber-facebook",
    "https://time.com/3858309/attention-spans-goldfish/",
    "https://www.bbc.com/news/health-38896790",
    "https://www.aao.org/eye-health/tips-prevention/should-you-be-worried-about-blue-light ",
    "https://www.upi.com/Odd_News/2019/10/08/Actor-goes-1-hour-17-minutes-3-seconds-without-blinking/5801570550478/",
    "https://youtu.be/LAkFtka3UFw",
    "https://youtu.be/rufnWLVQcKg",
];

//??How to get these text animations right??
const text_anims = [
    "marquee 8s linear infinite",
    "marquee 30s linear infinite",
    "marquee 50s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
    "marquee 30s linear infinite",
];

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
        console.log(text_p);
        set_text = false;
        if (index > texts.length - 1) index = 0;
        text_content = texts[index];

        text_p.innerHTML = text_content;
        const character_count = text_content.length;

        text_p.style.setProperty("--marquee_end", -`${character_count}em`);
        //??Why does this return NaN?
        // console.log(window.getComputedStyle(text_p, null));
        // console.log(character_count);
        // console.log(index, text);

        text_p.innerHTML = text_p.textContent.replace(
            /\b\w+\b/g,
            "<span class='word' >$&</span>"
        );

        // text_p.classList.remove("scroll_up");
        // text_p.className = "";
        // void text_p.offsetHeight;
        // text_p.classList.add("scroll_up");

        // text_p.style.animation = text_anims[index];

        text_p.className = "";
        void text_p.offsetWidth;

        text_p.classList.add("scrolling");
        console.log("animation", text_p.style.animation);

        randomize_color();
        randomize_font(left_text);
        randomize_font(right_text);

        change_marquee();

        index++;
        setTimeout(() => (set_text = true), 150);
    }
}

change_text();

//??Something is not right with these marquee animations, sometimes restarts in middle of animation?
function change_marquee() {
    const marquee_clones = document.querySelectorAll(".clone");
    marquee_clones.forEach(function (clone) {
        clone.remove();
    });
    const marquees = document.querySelectorAll(".bottom_bar");
    marquees.forEach(function (marquee) {
        const marquee_p = marquee.querySelector("p");
        marquee_p.innerHTML = `${links[index]}`;

        const marquee_p_width = marquee_p.offsetWidth;
        const marquee_p_clone = marquee_p.cloneNode(true);
        const marquee_p_clone2 = marquee_p.cloneNode(true);

        marquee_p_clone.classList.add("clone");
        marquee_p_clone2.classList.add("clone");

        marquee_p.insertAdjacentElement("afterend", marquee_p_clone);
        //??Why doesn't this work? Why is + 5em not enough of a padding?
        marquee_p_clone.style.left = `calc(${marquee_p_width}px + 15em)`;

        marquee_p_clone.insertAdjacentElement("afterend", marquee_p_clone2);
        marquee_p_clone2.style.left = `calc((${marquee_p_width}px + 15em)*2)`;
    });
}

let counter = -1;
let popup_w;
let popupWidth_Min = 100;
let popupWidth_Max = 1300;
let popupHeight_Min = 200;
let popupHeight_Max = 900;

function popup() {
    if (set_popup) {
        if (counter > links.length - 2) counter = -1;
        if (counter >= 0) {
            //??This doesn't work all the popups with youtube videos in them?
            popup_w.close();
        }
        counter++;
        console.log("counter", counter);
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
        // popup_w = window.open(
        //     links[counter],
        //     "popup",
        //     `width=${popupWidth},height=${popupHeight}, left=${leftPos}, top=${topPos}`
        // );

        popup_w = window.open(
            `/html/popup${counter}.html`,
            "popup",
            `width=${popupWidth},height=${popupHeight}, left=${leftPos}, top=${topPos}`
        );

        console.log("index", index);
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

    svg_path = "";
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

document.body.addEventListener("click", () => {
    document.querySelector(".black_screen").style.display = "none";
});

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
