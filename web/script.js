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

const links = [
    {
        title: "The Global Effects of Extractive Technology",
        url: "https://www.humanetech.com/insights/the-global-effects-of-extractive-technology-video#:~:text=Extractive%20technology%20depletes%20finite%20resources,they%20can%20actually%20deplete%20it.",
    },
    {
        title: "How Tobii Dynavox eye tracking works",
        url: "https://www.youtube.com/watch?v=Y7_f-pR8SBY&ab_channel=TobiiDynavox",
    },
    {
        title: "Exercise Your Eyes with Dr. Jacob Liberman",
        url: "https://www.youtube.com/watch?v=hQEbDd2ZfQQ&ab_channel=MauiFilms",
    },
    {
        title: "Don't Blink (film)",
        url: "https://en.wikipedia.org/wiki/Don%27t_Blink_(film)",
    },
    {
        title: "Apple – Don’t Blink",
        url: "https://youtu.be/jk6sz25OZgw",
    },
    {
        title: "Why Can't We Stop Looking at our Phones?",
        url: "https://www.bbc.co.uk/sounds/play/p04svtlv",
    },
    {
        title: "Animal Vision: Ocelli, Compound Eyes, and Camera Eyes",
        url: "https://www.education.com/science-fair/article/bug-eyed/",
    },
    {
        title: "Big Train - Staring final",
        url: "https://www.youtube.com/watch?v=SWgg20IqibM&ab_channel=richeddie",
    },
    {
        title: "'109th Annual' Staring Contest strains eyeballs in Portland",
        url: "https://www.oregonlive.com/entertainment/2015/05/109th_annual_staring_contest.html",
    },
    {
        title: "Privacy Considerations for a Pervasive Eye Tracking World",
        url: "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/eyetracking-privacy-cameraready.pdf",
    },
    {
        title: "Victory for 'Eyesore' in 40-minute staring competition",
        url: "https://www.abc.net.au/local/photos/2011/09/24/3325159.htm",
    },
    {
        title: "Tristan Harris Congress Testimony: Understanding the Use of Persuasive Technology",
        url: "https://youtu.be/ZRrguMdzXBw",
    },
    {
        title: "The Seduction of Intimate Machines",
        url: "https://mayacfriedman.github.io/seduction-of-machines/",
    },
    {
        title: "Fetishists Really Love Their Macs",
        url: "https://www.wired.com/2002/11/fetishists-really-love-their-macs/",
    },
    {
        title: "Miss Bunny (gif)",
        url: "https://www.deviantart.com/shadowedhand/art/Miss-Bunny-gif-784412791",
    },
    {
        title: "‘This is too harsh’: parents in China punish son who watches too much television with all-night TV binge, take turns to keep him awake — dividing public opinion",
        url: "https://www.scmp.com/news/people-culture/trending-china/article/3200731/too-harsh-parents-china-punish-son-watching-too-much-television-all-night-tv-binge-take-turns-keep",
    },
    {
        title: "Clockwork Orange (1971): Ludovico technique",
        url: "https://youtu.be/4woPg0-xyAA",
    },
    {
        title: "Political Prisoners in Russia Are Forced to Watch State TV All Day Long",
        url: "https://slate.com/news-and-politics/2021/08/russia-prison-tv-navalny.html",
    },
    {
        title: "Netflix's biggest competitor? Sleep",
        url: "https://www.theguardian.com/technology/2017/apr/18/netflix-competitor-sleep-uber-facebook",
    },
    {
        title: "You Now Have a Shorter Attention Span Than a Goldfish",
        url: "https://time.com/3858309/attention-spans-goldfish/",
    },
    {
        title: "Busting the attention span myth",
        url: "https://www.bbc.com/news/health-38896790",
    },
    {
        title: "What to Know About Attention-Seeking Behavior",
        url: "https://www.verywellmind.com/attention-seeking-behavior-causes-traits-treatment-5213790",
    },
    {
        title: "Why so many people need glasses now",
        url: "https://www.youtube.com/watch?v=LAkFtka3UFw&ab_channel=Vox",
    },
    {
        title: "Is Artificial Light Poisoning the Planet?",
        url: "https://www.newyorker.com/magazine/2023/02/27/darkness-manifesto-book-johan-eklof",
    },
    {
        title: "Should You Be Worried About Blue Light?",
        url: "https://www.aao.org/eye-health/tips-prevention/should-you-be-worried-about-blue-light",
    },
    {
        title: "Actor goes 1 hour, 17 minutes, 3 seconds without blinking",
        url: "https://www.upi.com/Odd_News/2019/10/08/Actor-goes-1-hour-17-minutes-3-seconds-without-blinking/5801570550478/",
    },
    {
        title: "[LIVE] Bawal Kumurap: Allan K vs Paolo Ballesteros",
        url: "https://www.facebook.com/watch/?v=1349941765173376",
    },
    {
        title: "Admiral Jeremiah Denton Blinks T-O-R-T-U-R-E using Morse Code as P.O.W.",
        url: "https://www.youtube.com/watch?v=rufnWLVQcKg&ab_channel=AudieMurphyAmericanLegend",
    },
    {
        title: "Eye Tracking Heatmap: Front Row Seats To Your Visitor’s Worldview",
        url: "https://vwo.com/blog/eye-tracking-heatmap/",
    },
    {
        title: "How Eye Tracking Can Help You With Website Optimization?",
        url: "https://vwo.com/blog/eye-tracking-website-optimization/",
    },
    {
        title: "Shock & Awe: Achieving Rapid Dominance",
        url: "http://www.dodccrp.org/files/Ullman_Shock.pdf",
    },
    {
        title: "Optimizing user experience and advertising research with eye tracking",
        url: "https://youtu.be/ConsSlIf6n4",
    },
    {
        title: "How to Exercise Your Eyes",
        url: "https://www.wikihow.com/Exercise-Your-Eyes",
    },
    // {
    //     title: "",
    //     url: "",
    // },
];

let titles = links.map(({ title }) => title);
let urls = links.map(({ url }) => url);

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
        if (index > links.length - 1) index = 0;
        //repeating the titles (for better marquee animation) and adding spacing between repeats
        text_content = `${titles[index]} &nbsp; &nbsp; &nbsp; &nbsp;`.repeat(3);

        text_p.innerHTML = text_content;
        const character_count = text_content.length;

        text_p.innerHTML = text_p.textContent.replace(
            /\b\w+\b/g,
            "<span class='word' >$&</span>"
        );

        text_p.className = "";
        void text_p.offsetWidth;

        text_p.classList.add("marquee");
        text_p.style.animationDuration = character_count / 25 + "s";

        randomize_color();

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
        marquee_p.innerHTML =
            `<a href="">${urls[index]}</a> &nbsp; &nbsp; &nbsp; &nbsp;`.repeat(
                3
            );

        const marquee_p_width = marquee_p.offsetWidth;

        const marquee_speed = marquee_p_width / 300 + "s";
        marquee_p.style.animationDuration = marquee_speed;
    });
}

let counter = 0;
let popup_w;
let popupWidth_Min = 100;
let popupHeight_Min = 200;
let popupWidth_Max = 1300;
let popupHeight_Max = 1000;
const PosIncrement = 500;
// let leftPos = -PosIncrement;
let leftPos;
let topPos;
// let topPos = 0;

//index resets while counter does not
function popup() {
    if (set_popup) {
        // console.log("index", index);

        //giving unique popupNames to each popup makes them not replace each other on each window.open()
        const popupName = "Popup" + counter;

        // console.log("counter", counter);
        let popupWidth =
            Math.floor(Math.random() * (popupWidth_Max - popupWidth_Min + 1)) +
            popupWidth_Min;
        let popupHeight =
            Math.floor(
                Math.random() * (popupHeight_Max - popupHeight_Min + 1)
            ) + popupHeight_Min;
        const screenWidth = window.screen.availWidth;
        const screenHeight = window.screen.availHeight;
        let maxLeftPos = screenWidth - popupWidth;
        let maxTopPos = screenHeight - popupHeight;

        //if popups appear at left and right sides of window
        if (Math.random() >= 0.5) {
            popupWidth =
                Math.floor(
                    Math.random() *
                        (popupWidth_Max / 5 - popupWidth_Min / 2 + 1)
                ) +
                popupWidth_Min / 2;
            maxLeftPos = screenWidth - popupWidth;
            leftPos = Math.random() >= 0.5 ? 0 : maxLeftPos;
            topPos = Math.random() * maxTopPos;
        } else {
            popupHeight =
                Math.floor(
                    Math.random() *
                        (popupHeight_Max / 5 - popupHeight_Min / 2 + 1)
                ) +
                popupHeight_Min / 2;
            // redefining maxTopPos since popupHeight has changed, otherwise popup appears not flush to bottom of screen
            maxTopPos = screenHeight - popupHeight;
            topPos = Math.random() >= 0.5 ? 0 : maxTopPos;
            leftPos = Math.random() * maxLeftPos;
        }

        //         {
        //         //??why is this throwing error? Trying to get popups to circle around window infinitely
        //         //moving left->right, across top
        //         // if (leftPos < maxLeftPos && topPos <= 0) {
        //         //     leftPos += PosIncrement;
        //         //     topPos = 0;
        //         //     popupWidth_Max = 1300;
        //         //     popupHeight_Max = 100;
        //         //     console.log("1");
        //         // }
        //         // //moving top->bottom, across right
        //         // else if (leftPos >= maxLeftPos && topPos < maxTopPos) {
        //         //     leftPos = maxLeftPos;
        //         //     topPos += PosIncrement;
        //         //     popupWidth_Max = 300;
        //         //     popupHeight_Max = 900;
        //         //     console.log("2");
        //         // }
        //         // //moving right->left, across bottom
        //         // else if (leftPos > 0 && topPos >= maxTopPos) {
        //         //     leftPos -= PosIncrement;
        //         //     topPos = maxTopPos;
        //         //     popupWidth_Max = 1300;
        //         //     popupHeight_Max = 100;
        //         //     console.log("3");
        //         // }
        //         // //moving bottom->top, across left
        //         // else if (leftPos <= 0 && topPos <= maxTopPos) {
        //         //     topPos -= PosIncrement;
        //         //     leftPos = 0;
        //         //     popupWidth_Max = 300;
        //         //     popupHeight_Max = 900;
        //         //     console.log("4");
        //         // } else {
        //         //     console.log("error");
        //         //     console.log("leftPos", leftPos);
        //         //     console.log("topPos", topPos);
        //         //     console.log("maxLeftPos", maxLeftPos);
        //         //     console.log("maxTopPos", maxTopPos);
        //         // }
        // }

        // Open the link at the index in a new popup
        popup_w = window.open(
            //use -1 here because index already ++ in change_text()
            urls[index - 1],
            popupName,
            `width=${popupWidth},height=${popupHeight}, left=${leftPos}, top=${topPos}`
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
    // full_textbox.style[
    //     "-webkit-mask"
    // ] = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;

    // full_textbox.style.mask = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;
    // add clipPath to full_textbox

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
        // full_textbox.style.clipPath = `inset(60px 60px 60px 60px)`;
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
    // full_textbox.style.mask = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 1330 793.046875" preserveAspectRatio="none"><polygon points="${full_svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;
    full_textbox.style[
        "-webkit-mask"
    ] = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${full_svg_path}" fill="black"/></svg>') 0/100% 100%, linear-gradient(#fff, #fff)`;

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

function init() {
    document.querySelector(".black_screen").style.display = "none";

    // Event Listener
    faceMesh.onResults(onResults);

    window.removeEventListener("click", init);
}

//for testing only
// window.addEventListener("click", function () {
//     change_text();
// });

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
