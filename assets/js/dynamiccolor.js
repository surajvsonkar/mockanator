(function($) {
  "use strict";

  window.mkdf = {};
  mkdf.scroll = 0;
  mkdf.body = $('body');
  mkdf.windowHeight = $(window).height();
  var common = {};

  common.mkdfOnDocumentReady = mkdfOnDocumentReady;

  /*
   * Init Element in View
   */
  function mkdfElementInView(element) {
    $(window).scroll(function() {
      if (mkdf.scroll > element.offset().top - mkdf.windowHeight && mkdf.scroll < element.offset().top + element.height()) {
        if (!element.hasClass('mkdf-in-view')) {
          element.addClass('mkdf-in-view');
        }
      } else {
        if (element.hasClass('mkdf-in-view')) {
          element.removeClass('mkdf-in-view');
        }
      }
    });
  }

  /**
   * Dynamic Background Color 
   */
  function mkdfDynamicBackgroundColor() {
    var bgrndIntances = $("[data-dynamic-bgrnd]");

    if (mkdf.body.hasClass('mkdf-dynamic-background-color') && bgrndIntances.length) {
      $('.main-content').append('<div id="mkdf-dynamic-bgrnds"></div');
      var holder = $('#mkdf-dynamic-bgrnds'),
        scrollBuffer = mkdf.scroll,
        scrollingDown = true,
        currentScroll, instancesInView, activeEl;

      //add bgrnd divs
      bgrndIntances.each(function() {
        mkdfElementInView($(this));
      });

      //calculate scroll direction
      var scrollDirection = function() {
        currentScroll = mkdf.scroll;

        if (currentScroll > scrollBuffer) {
          scrollingDown = true;
        } else {
          scrollingDown = false;
        }
        scrollBuffer = currentScroll;
      };

      holder.css('background-color', bgrndIntances.first().attr('data-dynamic-bgrnd'));

      //colors change logic
      $(window).on('scroll', function() {
        scrollDirection();
        instancesInView = bgrndIntances.filter('.mkdf-in-view');

        if (instancesInView.length) {
          if (scrollingDown) {
            activeEl = instancesInView.last();
          } else {
            activeEl = instancesInView.first();
          }

          holder.css('background-color') !== activeEl.attr('data-dynamic-bgrnd') &&
            holder.css('background-color', activeEl.attr('data-dynamic-bgrnd'));
        }
      });
    }
  }



  function mkdfOnDocumentReady() {
    mkdfDynamicBackgroundColor();
  }

  $(document).ready(mkdfOnDocumentReady);

})(jQuery);