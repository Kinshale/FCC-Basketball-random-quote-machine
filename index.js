import quotes from "./Quotes.js";

window.onload = function () {
    quoteText.innerHTML = "Press new quote";
    author.innerHTML = "— ";

    backImg.src = "Players-Image/4Kobe+Jordan.jpg";
}
window.onresize = function () {
    windowWidth = document.documentElement.clientWidth;
    if (windowWidth > 768) { document.body.style.overflowX = "hidden"; }
    else { document.body.style.overflowX = "" };

    fccWord.style.width = "auto";
    initialWidth = fccWord.clientWidth;
    finalWidth = freeCodeCamp.clientWidth;

    checkFontSize(indexes[currentPos]);
}

let windowWidth = document.documentElement.clientWidth;

if (windowWidth > 768) { document.body.style.overflowX = "hidden"; }

// <h1> FCC word effect
let fccWord = document.getElementById("FCC-word");
let initialWidth = fccWord.clientWidth;
fccWord.style.width = initialWidth + "px";

let freeCodeCamp = document.getElementById("final-width");
let finalWidth = freeCodeCamp.clientWidth;

fccWord.addEventListener('mouseenter', function (event) {
    fccWord.style.transition = "width 1.4s ease";
    fccWord.innerHTML = "FreeCodeCamp";
    fccWord.style.width = finalWidth + "px";
});

fccWord.addEventListener('mouseout', function (event) {
    fccWord.style.transition = "width 0.6s ease-out";
    fccWord.innerHTML = "FCC";
    fccWord.style.width = initialWidth + "px";
})

// slideshow

const slideshowContainer = document.getElementById("slideshow");
let slides = document.querySelectorAll(".slide");

var slideIndex = 0;

setInterval(nextSlide, 9000);

function nextSlide() {
    if (slideIndex % 3 == 0) {
        slides[0].style.display = "none";
        slides[1].style.display = "flex";
    }
    if (slideIndex % 3 == 1) {
        slides[1].style.display = "none";
        slides[2].style.display = "flex";
    }
    if (slideIndex % 3 == 2) {
        slides[2].style.display = "none";
        slides[0].style.display = "flex";
    }
    slideIndex += 1;
}


// menu icon

const menuIcon = document.querySelector(".icon-cont");
const scMenu = document.querySelector(".shortcut-menu");

menuIcon.onclick = function () {
    menuIcon.classList.toggle("open");
    scMenu.toggleAttribute("hidden");
    scMenu.classList.toggle("bounce");
}

const quoteBox = document.getElementById("quote-box");

// getting a New Quote;
let indexes = [];
let currentPos = 0;

function randomIndex() { return Math.floor(Math.random() * quotes.length) };

function uniqueIndex() {
    let index = randomIndex();

    if (!indexes.slice(-3).includes(index)) {
        indexes.push(index);
        currentPos = indexes.length - 1;
        return index;
    } else {
        return uniqueIndex();
    }
}

const sectionQuote = document.getElementById("section-quote");
const quoteText = document.getElementById("text");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const backImg = document.getElementById("quotes-bg-img");

function newQuote() {
    let uniqIndex = uniqueIndex();
    let newText = quotes[uniqIndex].text;
    let newAuthor = quotes[uniqIndex].author;

    quoteText.innerHTML = newText;
    author.innerHTML = "— " + newAuthor;
    backImg.src = quotes[uniqIndex].img;

    checkFontSize(uniqIndex);

    generateTweetUrl(newText, newAuthor);
    sectionQuote.scrollIntoView(top);
}

const checkFontSize = (index) => {
    if (index == 2 || index == 4) {
        if (windowWidth > 768) {
            quoteText.style.fontSize = "2.7em";
        } else {
            quoteText.style.fontSize = "2.3em";
        }
    } else {
        if (windowWidth > 768) {
            quoteText.style.fontSize = "3.3em";
        } else {
            quoteText.style.fontSize = "2.8em";
        }
    }
}

newQuoteBtn.addEventListener("click", newQuote);

// tweetting quote;
const tweetBtn = document.getElementById("tweet-quote");
function generateTweetUrl(text, author) {
    var url = "https://twitter.com/intent/tweet?text=";
    url = url + text + " " + author;
    tweetBtn.setAttribute('href', url);
}

// key board shortcuts
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { newQuote() }
    if (event.key === "ArrowRight") { nextQuote() };
    if (event.key === "ArrowLeft") { prevQuote() };
    if (event.key === "T" && event.shiftKey) {
        window.open("https://twitter.com/intent/tweet?text=", "_blank")
    }
    if (event.key === "O" && event.shiftKey) {
        menuIcon.classList.toggle("open");
        scMenu.toggleAttribute("hidden");
        scMenu.classList.toggle("bounce");
    }
    if (event.key === "D" && event.shiftKey) {
        sectionQuote.scrollIntoView(top)
    }
})


const nextQuote = () => {
    if (currentPos == indexes.length - 1) {
        alert("Press 'New Quote' ");
        return;
    }
    currentPos = currentPos + 1;

    let nextIndex = indexes[currentPos];
    let nextText = quotes[nextIndex].text;
    let nextAuthor = quotes[nextIndex].author;

    generateTweetUrl(nextText, nextAuthor);

    quoteText.innerHTML = nextText;
    author.innerHTML = "— " + nextAuthor;
    backImg.src = quotes[nextIndex].img;

    checkFontSize(indexes[currentPos]);

    sectionQuote.scrollIntoView(top);
}
const prevQuote = () => {
    if (currentPos == 0) {
        alert("Queue ended");
        return;
    }
    currentPos = currentPos - 1;

    let prevIndex = indexes[currentPos];
    let prevText = quotes[prevIndex].text;
    let prevAuthor = quotes[prevIndex].author;

    generateTweetUrl(prevText, prevAuthor);

    quoteText.innerHTML = prevText;
    author.innerHTML = "— " + prevAuthor;
    backImg.src = quotes[prevIndex].img;

    checkFontSize(indexes[currentPos]);

    sectionQuote.scrollIntoView(top);
}




