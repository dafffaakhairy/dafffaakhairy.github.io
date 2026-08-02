/* ==========================================================
   ELEMENT
========================================================== */

const music = document.getElementById("music");

const startBtn = document.getElementById("startBtn");

const openLetter = document.getElementById("openLetter");
const closeLetter = document.getElementById("closeLetter");

const overlay = document.getElementById("overlay");

const typing = document.getElementById("typing");

const letterSource = document.querySelectorAll(
    "#typing-source p"
);

const galleryImages = document.querySelectorAll(
    ".gallery img"
);

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById(
    "lightboxImage"
);

const closeLightbox = document.getElementById(
    "closeLightbox"
);

const daysElement = document.getElementById(
    "days"
);


/* ==========================================================
   CONFIG
========================================================== */


// tanggal jadian
const anniversary = new Date(
    "2026-05-02"
);


let musicStarted = false;



/* ==========================================================
   START EXPERIENCE
========================================================== */


startBtn.addEventListener(
    "click",
    () => {

        confetti({

            particleCount: 200,

            spread: 180,

            origin: {
                y: .6
            }

        });

        createHeartBurst();

        startBtn.innerHTML =
            "❤️ Cerita Dimulai";

        startBtn.disabled = true;

        setTimeout(() => {

            document.querySelector(".counter").scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

            startMusic();

        }, 800);

    }
);



/* ==========================================================
   MUSIC
========================================================== */


function startMusic() {


    if (musicStarted)
        return;


    musicStarted = true;


    music.volume = .4;


    music.play()
        .catch(() => { });


}



/* ==========================================================
   COUNTER
========================================================== */


function updateCounter() {


    const now =
        new Date();


    const diff =
        now - anniversary;


    const days =
        Math.floor(
            diff /
            (1000 * 60 * 60 * 24)
        );


    if (daysElement) {

        daysElement.textContent =
            days;

    }


}


updateCounter();



/* ==========================================================
   LETTER TYPING PER PARAGRAPH
========================================================== */


function startLetterTyping() {


    typing.innerHTML = "";


    let index = 0;


    function nextParagraph() {


        if (index >= letterSource.length)
            return;



        const p =
            document.createElement("p");


        typing.appendChild(p);



        const text =
            letterSource[index]
                .textContent
                .trim();



        let char = 0;



        function type() {


            if (char < text.length) {


                p.textContent +=
                    text.charAt(char);


                char++;


                setTimeout(
                    type,
                    35
                );


            }
            else {


                index++;


                setTimeout(
                    nextParagraph,
                    500
                );


            }


        }


        type();


    }



    nextParagraph();


}



/* ==========================================================
   OPEN LETTER
========================================================== */


openLetter.addEventListener(
    "click",
    () => {


        startMusic();


        overlay.classList.add(
            "show"
        );


        startLetterTyping();



        confetti({

            particleCount: 120,

            spread: 120,

            origin: {
                y: .5
            }

        });


    }
);



/* ==========================================================
   CLOSE LETTER
========================================================== */


closeLetter.addEventListener(
    "click",
    () => {


        overlay.classList.remove(
            "show"
        );


    }
);



overlay.addEventListener(
    "click",
    (e) => {


        if (
            e.target === overlay
        ) {

            overlay.classList.remove(
                "show"
            );

        }


    }
);



/* ==========================================================
   GALLERY LIGHTBOX
========================================================== */


galleryImages.forEach(
    img => {


        img.addEventListener(
            "click",
            () => {


                lightbox.classList.add(
                    "show"
                );


                lightboxImage.src =
                    img.src;


                startMusic();


            }
        );


    }
);



closeLightbox.addEventListener(
    "click",
    () => {


        lightbox.classList.remove(
            "show"
        );


    }
);



lightbox.addEventListener(
    "click",
    (e) => {


        if (
            e.target === lightbox
        ) {

            lightbox.classList.remove(
                "show"
            );

        }


    }
);



/* ==========================================================
   ESC CLOSE
========================================================== */


document.addEventListener(
    "keydown",
    (e) => {


        if (e.key === "Escape") {


            overlay.classList.remove(
                "show"
            );


            lightbox.classList.remove(
                "show"
            );


        }


    }
);



/* ==========================================================
   FLOATING HEARTS
========================================================== */


function createHeart() {


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "heart";


    heart.innerHTML =
        "❤️";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (
            15 +
            Math.random() * 25
        )
        + "px";


    heart.style.animationDuration =
        (
            5 +
            Math.random() * 6
        )
        + "s";



    document.body.appendChild(
        heart
    );



    setTimeout(
        () => {
            heart.remove();
        },
        12000
    );


}



setInterval(
    createHeart,
    900
);




function createHeartBurst() {


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 100
        );

    }


}



/* ==========================================================
   SCROLL REVEAL
========================================================== */


const observer =
    new IntersectionObserver(
        entries => {


            entries.forEach(
                entry => {


                    if (
                        entry.isIntersecting
                    ) {


                        entry.target.style.opacity = 1;


                        entry.target.style.transform =
                            "translateY(0)";


                    }


                }
            );


        },
        {
            threshold: .15
        }
    );



document
    .querySelectorAll(
        "section, footer"
    )
    .forEach(
        el => {


            el.style.opacity = 0;


            el.style.transform =
                "translateY(50px)";


            el.style.transition =
                "all .8s ease";


            observer.observe(
                el
            );


        }
    );