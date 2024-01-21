const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// i am getting quotes from api
let apiQuotes = [];

// show that i am loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hiding my loader
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//?? new quote every time we fetch from api
function newQuote() {
  loading();
  //?? picking a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  }
  authorText.textContent = quote.author;

  if (quote.text.length > 90) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //  set quote and hiding loader
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = await fetch(
    "https://jacintodesign.github.io/quotes-api/data/quotes.json"
  );

  apiQuotes = await apiUrl.json();
  // console.log(apiQuotes[13]);
  newQuote();
}

// Tweeting quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}  - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// adding event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();
