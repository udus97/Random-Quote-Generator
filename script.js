$(function () {

  // initial URL for sending a tweet to Twitter (url) and the root endpoint for the quote API
  var url = 'https://twitter.com/intent/tweet?text=', apiUrl = 'https://api.forismatic.com/api/1.0/';

  //Initialise variables .
  var $getQuoteButton, $tweetButton, $quoteString, $quoteAuthor, $warningContainer, tweet;
  var c = console.clear, l = console.log, e = encodeURI;

  // Get the DOM elements to be used in the application.
  $getQuoteButton = $('button').eq(0);
  $tweetButton = $('button').eq(1);
  $quoteString = $('p').eq(0);
  $quoteAuthor = $('p').eq(1);
  $warningContainer = $('div');

  //Add the click event handler to the  Get Quote button. Disable the button once it is clicked
  // and enable it once the API returns the tweet
  $getQuoteButton.click(function () {
    $(this).attr('disabled', true)
    getQuote();
  });

  // Add the click event handler to the link that appears once a quote is greater than 280 characters and untweetable
  // Clicking the link trigers the click event handler on the $getQuoteButton which in turn asks the API for another quote
  $('a').click(function (e) {
    $getQuoteButton.trigger('click');
    e.preventDefault();
  })

  // Add the click event handler to the tweet! Button to send the quote to twitter
  // A new window is opened when this button is clicked and the quote is automatically pasted in the twitter textarea input
  $tweetButton.click(function () {
    window.open(url + e(tweet));
  })

  //The main logic of the app
  function getQuote() {
    $.ajax({
      url: apiUrl,
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: { method: 'getQuote', format: 'jsonp', lang: 'en', },
      success: function (data) {
        // Enable the Get Quote button once the API returns the quote
        $getQuoteButton.attr('disabled', false)
        // Insert the string of the quote into the $quoteString paragraph tag
        $quoteString.html(data.quoteText);
        // Store the total length(trimmed to remove any whitespace) of the string containing the quote and
        // the name of the author in the tweet variable
        tweet = (data.quoteText + '\n-' + data.quoteAuthor).trim();

        // If the quote has an author insert the name of the author in the $quoteAuthor paragraph tag
        // Otherwise, insert the word '-Anonymous' in the paragraph tag
        if (data.quoteAuthor.trim().length > 0) {
          $quoteAuthor.html('&mdash;' + data.quoteAuthor);
        } else {
          $quoteAuthor.html('-Anonymous');
        }

        //Change the text of the Get Quote! button after the first time it has been clicked
        $getQuoteButton.text('Get another quote');

        // If the length of the tweet string is greater than 280, disable the Tweet! button
        // and show the user a warning
        if (tweet.length <= 280) {
          $tweetButton.prop('disabled', false);
          $warningContainer.addClass('hide');
        } else {
          $tweetButton.prop('disabled', true);
          $warningContainer.removeClass('hide').addClass('warning');
        }
      }
    });
  }
})