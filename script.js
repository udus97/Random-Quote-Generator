let url = 'https://twitter.com/intent/tweet?text=', endpoint = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';


let getQuoteButton, tweetButton, quoteString, quoteAuthor, warningContainer, tweet, a; c = console.clear, l = console.log, e = encodeURI;


getQuoteButton = document.querySelectorAll('button')[0];
tweetButton = document.querySelectorAll('button')[1];
quoteString = document.querySelectorAll('p')[0];
quoteAuthor = document.querySelectorAll('p')[1];
warningContainer = document.querySelector('div');
a = document.querySelector('a');

getQuoteButton.addEventListener('click', () => {
  getQuote();
});

a.addEventListener('click', (e) => {
  getQuote();
  e.preventDefault();
});

tweetButton.addEventListener('click', () => {
  window.open(url + e(tweet));
});


function getQuote() {
  fetch(endpoint)
    .then((resp) => resp.json())
    .then(function (data) {
      quoteString.innerHTML = data.quoteText;
      tweet = (data.quoteText + '\n-' + data.quoteAuthor).trim();

      if (data.quoteAuthor.trim().length > 0) {
        quoteAuthor.innerHTML = '-' + data.quoteAuthor;
      } else {
        quoteAuthor.innerHTML = '-Anonymous';
      }

      getQuoteButton.innerHTML = 'Get another quote';
      if (tweet.length <= 280) {
        tweetButton.disabled = false;
        warningContainer.classList.add('hide');
      } else {
        tweetButton.disabled = true;
        warningContainer.classList.remove('hide');
        warningContainer.classList.add('warning');
      }

    })
    .catch(function (error) {
      console.log(error)
    })
}