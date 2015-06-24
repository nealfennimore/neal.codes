'use strict';

var app = (function(document, $) {
	var _init = function() {
	};

  $.fn.extend({
    getSVG: function getSVG() {
      var objDoc = this[0].contentDocument;

      return $(objDoc.firstChild);
    }
  });


    /*
   * jGFeed 1.0 - Google Feed API abstraction plugin for jQuery
   *
   * Copyright (c) 2009 jQuery HowTo
   *
   * Licensed under the GPL license:
   *   http://www.gnu.org/licenses/gpl.html
   *
   * URL:
   *   http://jquery-howto.blogspot.com
   *
   * Author URL:
   *   http://me.boo.uz
   *
   */
  $.extend({
    jGFeed : function(url, fn, num, key){
      // Make sure url to get is defined
      if(url == null) {return false;}
      // Build Google Feed API URL
      var gurl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+url;
      if(num != null) {gurl += "&num="+num;}
      if(key != null) {gurl += "&key="+key;}
      // AJAX request the API
      $.getJSON(gurl, function(data){
        if(typeof fn == 'function') {
          fn.call(this, data.responseData.feed);
        } else {
          return false;
        }
      });
    }
  });

  $.jGFeed('http://codepen.io/nealfennimore/popular/feed/', function(feed){
    var regex = /src=\"(.*)\"/;

    function constructPen (el){
      var title   = el.title,
          link    = el.link,
          imgLink = regex.exec(el.content)[1];

      var codepen = $('<li class="codepen">' +
                        '<a class="codepen__link" href="' + link + '">' +
                          '<img class="codepen__image" src="' + imgLink + '">' +
                           title +
                        '</a>' +
                     '</li>'
                    );

      return codepen;
    }

    var $ul = $('<ul>', {class: 'codepens__column__container'});

    feed.entries.forEach(function(el, index){
      $ul.append( constructPen(el) );
    });

    $('.codepens__column').append($ul);

  });

  var skillBars = $('.skill-bar');
    skillBars.on("mouseover", function(event) {
      this.classList.remove('fadeInLeft');
      TweenLite.killTweensOf(this);
      TweenLite.to(this, 0.25, {css:'transform: translateX(10%)', ease:Power3.easeOut});
    });

    skillBars.on("mouseleave", function(event) {
      TweenLite.killTweensOf(this);
      TweenLite.to(this, 0.25, {css:'transform: translateX(0%)', ease:Power3.easeOut});
    });


	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();








