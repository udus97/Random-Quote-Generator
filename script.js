

$(function () {

  var url = 'https://twitter.com/intent/tweet?text=';

  var $getQuoteButton, $tweetButton, $quoteString, $quoteAuthor, $warningContainer, tweet;
  var c = console.clear, l = console.log, e = encodeURI;
  $getQuoteButton = $('button').eq(0);
  $tweetButton = $('button').eq(1);
  $quoteString = $('p').eq(0);
  $quoteAuthor = $('p').eq(1);
  $warningContainer = $('div');

  $getQuoteButton.click(function () {
    getQuote();
  });

  $('a').click(function (e) {
    $getQuoteButton.trigger('click');
    e.preventDefault();
  })

  $tweetButton.click(function () {
    window.open(url + e(tweet));
  })




  function getQuote() {
    $.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en', function (data) {
      $quoteString.html(data.quoteText);
      tweet = (data.quoteText + '\n-' + data.quoteAuthor).trim();

      if (data.quoteAuthor.trim().length > 0) {
        $quoteAuthor.html('-' + data.quoteAuthor);
      } else {
        $quoteAuthor.html('-Anonymous');
      }

      $getQuoteButton.text('Get another quote');
      if (tweet.length <= 280) {
        $tweetButton.prop('disabled', false);
        $warningContainer.addClass('hide');
      } else {
        $tweetButton.prop('disabled', true);
        $warningContainer.removeClass('hide').addClass('warning');
      }
    });
  }
})