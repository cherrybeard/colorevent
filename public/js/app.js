(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $(function() {
    var WebFontConfig;
    WebFontConfig = {
      custom: {
        families: ['Fira Sans:n3,i3']
      }
    };
    WebFont.load(WebFontConfig);
    $('[data-slider]').slider();
    $('[data-popup-open]').popupOpen();
    $('[data-rent-calc]').rentCalc();
    $('form#callback').mailForm();
    $('[data-review]').reviewSwitcher();
    return $('[data-scroll-to]').scroller();
  });

  (function($) {
    $.fn.extend({
      mailForm: function() {
        var self;
        self = $.fn.mailForm;
        return $(this).each(function(i, el) {
          return self.init(el);
        });
      }
    });
    return $.extend($.fn.mailForm, {
      init: function(el) {
        var $el;
        $el = $(el);
        $el.on('focus', 'input[type=text]', function() {
          return $(this).closest('.text-input').removeClass('error');
        });
        return $el.on('submit', function(e) {
          var $popup, $this, ajaxData;
          $this = $(this);
          $popup = $(this).parents('.popup');
          e.preventDefault();
          $this.find('input[type=text]').each(function() {
            if (!$(this).val()) {
              return $(this).closest('.text-input').addClass('error');
            }
          });
          if (!$this.find('.text-input.error').length) {
            ajaxData = {
              url: 'index.php',
              type: $this.attr('method'),
              data: $this.serialize()
            };
            $this.find('input[type=submit]').prop('disabled', true);
            return $.ajax(ajaxData).done(function(req) {
              $this.find('input[type=submit]').prop('disabled', false);
              return $popup.attr('data-popup-state', 'confirm');
            });
          }
        });
      }
    });
  })(jQuery);

  (function($) {
    $.fn.extend({
      popupOpen: function() {
        var self;
        self = $.fn.popupOpen;
        return $(this).each(function(i, el) {
          return self.init(el);
        });
      }
    });
    return $.extend($.fn.popupOpen, {
      init: function(el) {
        var $body, $el, $menu, measureScrollbar, setScrollbarPadding;
        measureScrollbar = function() {
          var scrollDiv, scrollbarWidth;
          scrollDiv = document.createElement('div');
          scrollDiv.className = 'scrollbar-measure';
          $body.append(scrollDiv);
          scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
          $body[0].removeChild(scrollDiv);
          return scrollbarWidth;
        };
        setScrollbarPadding = function($el) {
          var padding;
          padding = parseInt($el.css('padding-right'));
          return $el.css('padding-right', measureScrollbar() + padding);
        };
        $el = $(el);
        $body = $('body');
        $menu = $('.section-menu');
        return $el.on('click', function(e) {
          if ($el.attr('data-popup-open') === 'open') {
            if ($body.attr('data-popup-state') !== 'closing') {
              $body.attr('data-popup-state', 'visible');
              setScrollbarPadding($body);
              return setScrollbarPadding($menu);
            }
          } else {
            $body.attr('data-popup-state', 'closing');
            $body.css('padding-right', '');
            $menu.css('padding-right', '');
            return setTimeout(function() {
              return $body.attr('data-popup-state', '');
            }, 800);
          }
        });
      }
    });
  })(jQuery);

  (function($) {
    $.fn.extend({
      rentCalc: function() {
        var self;
        self = $.fn.rentCalc;
        return $(this).each(function(i, el) {
          return self.init(el);
        });
      }
    });
    return $.extend($.fn.rentCalc, {
      init: function(el) {
        var $body, $dimensions, $el, $movable, $price, $wall, isMoving, sizes, startElPos, startMovingPos;
        $el = $(el);
        $body = $('body');
        $movable = $el.find('.rent-calc-control-move');
        $dimensions = $el.find('.rent-calc-control-text');
        $price = $el.find('.rent-calc-price span');
        $wall = $el.find('.rent-calc-wall');
        isMoving = false;
        startMovingPos = 0;
        startElPos = 0;
        sizes = {
          '0': {
            size: 'XS',
            price: '18 000',
            dimensions: '200 × 200'
          },
          '1': {
            size: 'S',
            price: '28 000',
            dimensions: '250 × 250'
          },
          '2': {
            size: 'M',
            price: '34 000',
            dimensions: '300 × 250'
          },
          '3': {
            size: 'L',
            price: '47 000',
            dimensions: '420 × 250'
          },
          '4': {
            size: 'XL',
            price: '54 000',
            dimensions: '480 × 250'
          },
          '5': {
            size: 'XXL',
            price: '61 000',
            dimensions: '540 × 250'
          },
          '6': {
            size: 'XXXL',
            price: '70 000',
            dimensions: '600 × 250'
          }
        };
        $el.on('mousedown', '[data-rent-calc-move]', function(e) {
          e.preventDefault();
          isMoving = true;
          startMovingPos = e.pageX;
          return startElPos = parseInt($movable.css('left'));
        });
        $body.on('mouseup', function(e) {
          return isMoving = false;
        });
        return $body.on('mousemove', function(e) {
          var diff, newPos, pos, size;
          if (isMoving) {
            pos = e.pageX;
            diff = pos - startMovingPos + startElPos;
            size = parseInt(diff / 360 * 7);
            if (size > 6) {
              size = 6;
            }
            if (size < 0) {
              size = 0;
            }
            newPos = size * 60;
            $movable.css('left', newPos + 'px');
            $wall.attr('data-size', sizes[size]['size']);
            $price.text(sizes[size]['price']);
            return $dimensions.text(sizes[size]['dimensions']);
          }
        });
      }
    });
  })(jQuery);

  (function($) {
    $.fn.extend({
      reviewSwitcher: function() {
        var self;
        self = $.fn.reviewSwitcher;
        return $(this).each(function(i, el) {
          return self.init(el);
        });
      }
    });
    return $.extend($.fn.reviewSwitcher, {
      init: function(el) {
        var $el;
        $el = $(el);
        $el.on('click', '[data-review-next]', function(e) {
          var review;
          review = parseInt($el.attr('data-review')) + 1;
          if (review > 5) {
            review = review - 5;
          }
          return $el.attr('data-review', review);
        });
        return $el.on('click', '[data-review-prev]', function(e) {
          var review;
          review = parseInt($el.attr('data-review')) - 1;
          if (review < 1) {
            review = review + 5;
          }
          return $el.attr('data-review', review);
        });
      }
    });
  })(jQuery);

  (function($) {
    $.fn.extend({
      scroller: function() {
        var self;
        self = $.fn.scroller;
        return $(this).each(function(i, el) {
          return self.init(el);
        });
      }
    });
    return $.extend($.fn.scroller, {
      init: function(el) {
        var $el;
        $el = $(el);
        return $el.on('click', function(e) {
          var menuHeight, pos, target;
          target = $el.attr('data-scroll-to');
          if (target) {
            e.preventDefault();
            pos = $(target).offset().top;
            menuHeight = $('.section-menu').outerHeight();
            console.log(menuHeight);
            return $('html, body').animate({
              scrollTop: pos - menuHeight + 5
            }, 300);
          }
        });
      }
    });
  })(jQuery);

  (function($) {
    $.fn.extend({
      slider: function() {
        var self;
        self = $.fn.slider;
        return $(this).each(function(i, el) {
          return self.init(el);
        });
      }
    });
    return $.extend($.fn.slider, {
      init: function(el) {
        var $el, $rentPrice, $rentSliders, $slides, EXT, MARGIN, SLIDERS, STATES, currImage, currOffset, currSlide, getImageIndex, getImageParam, getSlide, getSlideIndex, initSlides, initialized, openSlide, placeSlide, roundIndex, setOffset, setSlideStates, shownRentInfo, sliderName, slidesTotal, toggleInfo, updateRentSlider, updateSlidesPosition, url;
        MARGIN = 16;
        EXT = '.jpg';
        STATES = {
          '-2': 'prevprev',
          '-1': 'prev',
          '0': 'curr',
          '1': 'next',
          '2': 'nextnext'
        };
        SLIDERS = {
          rent: [
            {
              folder: 'dawn',
              file: '1.jpg',
              width: 840,
              alt: 'Фотостена в аренду розового цвета'
            }, {
              folder: 'dawn',
              file: '2.jpg',
              width: 374,
              alt: 'Фотостена из бумажных цветов'
            }, {
              folder: 'dawn',
              file: '3.jpg',
              width: 485,
              alt: 'Фотозона на свадьбу «Рассвет»'
            }, {
              folder: 'gold',
              file: '1.jpg',
              width: 840,
              alt: 'Оформление бумажными цветами'
            }, {
              folder: 'gold',
              file: '2.jpg',
              width: 374,
              alt: 'Белые бумажные цветы'
            }, {
              folder: 'gold',
              file: '3.jpg',
              width: 420,
              alt: 'Бумажные цветы на свадьбу,'
            }, {
              folder: 'winter',
              file: '1.jpg',
              width: 840,
              alt: 'Фотостена из синих бумажных цветов'
            }, {
              folder: 'winter',
              file: '2.jpg',
              width: 840,
              alt: 'Декор бумажными цветами'
            }, {
              folder: 'winter',
              file: '3.jpg',
              width: 809,
              alt: 'Аренда бумажной фотозоны'
            }, {
              folder: 'sepia',
              file: '1.jpg',
              width: 840,
              alt: 'Бумажная фотозона «Сепия»'
            }, {
              folder: 'sepia',
              file: '2.jpg',
              width: 840,
              alt: 'Бумажные цветы для фотостены'
            }, {
              folder: 'sepia',
              file: '3.jpg',
              width: 840,
              alt: 'Фотозона на свадьбу'
            }, {
              folder: 'melody',
              file: '1.jpg',
              width: 932,
              alt: 'Аренда фотозоны из бумажных цветов'
            }, {
              folder: 'melody',
              file: '2.jpg',
              width: 374,
              alt: 'Детская фотозона'
            }, {
              folder: 'melody',
              file: '3.jpg',
              width: 374,
              alt: 'фотозона на день рождения «Мелодия»'
            }, {
              folder: 'melody',
              file: '4.jpg',
              width: 840,
              alt: 'Фотозона для детского праздника'
            }
          ],
          order: [
            {
              folder: 'order',
              file: '1.jpg',
              width: 840,
              alt: 'Фотостена на заказ'
            }, {
              folder: 'order',
              file: '2.jpg',
              width: 840,
              alt: 'Фотозона из бумажных цветов на заказ'
            }, {
              folder: 'order',
              file: '3.jpg',
              width: 840,
              alt: 'Украшение бумажными цветами'
            }
          ]
        };
        $el = $(el);
        $rentPrice = $('[data-rent-price]');
        $rentSliders = $('[data-slider-rent]');
        sliderName = $el.attr('data-slider');
        if (!SLIDERS[sliderName]) {
          return;
        }
        slidesTotal = SLIDERS[sliderName].length;
        url = 'img/sliders/';
        currImage = 1;
        currSlide = 1;
        currOffset = 0;
        $slides = $('<div>').addClass('slider-slides').appendTo($el);
        initialized = false;
        shownRentInfo = {
          dawn: true,
          gold: false,
          winter: false,
          sepia: false,
          melody: false
        };
        toggleInfo = function(state) {
          if (!state) {
            state = $el.attr('data-slider-info') === 'hidden' ? 'show' : 'hide';
          }
          if (state === 'hide') {
            return $el.attr('data-slider-info', 'hidden');
          } else {
            return $el.attr('data-slider-info', '');
          }
        };
        getImageParam = function(image, param) {
          return SLIDERS[sliderName][image - 1][param];
        };
        roundIndex = function(index) {
          if (index > slidesTotal) {
            index -= slidesTotal;
          }
          if (index < 1) {
            index += slidesTotal;
          }
          return index;
        };
        getImageIndex = function(direction) {
          return roundIndex(currImage + direction);
        };
        getSlideIndex = function(direction) {
          return currSlide + direction;
        };
        getSlide = function(direction) {
          var slide;
          slide = getSlideIndex(direction);
          return $slides.find('[data-slide-index=' + slide + ']');
        };
        setSlideStates = function(direction) {
          var k, len, newState, oldState, state, states;
          if (direction > 0) {
            states = [-2, -1, 0, 1, 2];
          } else {
            states = [2, 1, 0, -1, -2];
          }
          for (k = 0, len = states.length; k < len; k++) {
            oldState = states[k];
            newState = oldState - direction;
            if (Math.abs(newState) < 2) {
              state = STATES[newState];
              getSlide(oldState).attr('data-slide-state', state);
            } else {
              getSlide(oldState).remove();
            }
          }
          currSlide += direction;
          return currImage = roundIndex(currImage + direction);
        };
        updateRentSlider = function(direction) {
          var currFolder, newFolder;
          currFolder = getImageParam(getImageIndex(0), 'folder');
          newFolder = getImageParam(getImageIndex(direction), 'folder');
          if (currFolder !== newFolder) {
            if (!shownRentInfo[newFolder]) {
              toggleInfo('show');
              shownRentInfo[newFolder] = true;
            }
            $rentSliders.attr('data-slider-rent', newFolder);
            return $rentPrice.attr('data-rent-price', newFolder);
          }
        };
        updateSlidesPosition = function(states) {
          return $slides.find('.slider-slide').each(function() {
            var $slide, $slideCurr, $slideNext, offset, state;
            $slide = $(this);
            state = $slide.attr('data-slide-state');
            if (indexOf.call(states, state) >= 0) {
              offset = 0;
              switch (state) {
                case 'prevprev':
                  offset = getSlide(-1).position().left - $slide.outerWidth() - MARGIN;
                  break;
                case 'prev':
                  offset = getSlide(0).position().left - $slide.outerWidth() - MARGIN;
                  break;
                case 'curr':
                  offset = ($el.outerWidth() - $slide.outerWidth()) / 2;
                  break;
                case 'next':
                  $slideCurr = getSlide(0);
                  offset = $slideCurr.position().left + $slideCurr.outerWidth() + MARGIN;
                  break;
                case 'nextnext':
                  $slideNext = getSlide(1);
                  offset = $slideNext.position().left + $slideNext.outerWidth() + MARGIN;
              }
              $slide.css('left', offset + 'px');
              return $slide.addClass('visible');
            }
          });
        };
        setOffset = function(offset) {
          currOffset = offset + currOffset;
          return $slides.css('transform', 'translateX(' + currOffset + 'px)');
        };
        openSlide = function(direction) {
          toggleInfo('hide');
          if (sliderName === 'rent') {
            updateRentSlider(direction);
          }
          placeSlide(2 * direction);
          setOffset(-direction * ((getSlide(0).outerWidth() + getSlide(direction).outerWidth()) / 2 + MARGIN));
          return setSlideStates(1 * direction);
        };
        placeSlide = function(direction) {
          var $image, $slide, image, imageIndex, slideIndex, state, states, width;
          image = new Image();
          $image = $(image);
          state = STATES[direction];
          imageIndex = getImageIndex(direction);
          slideIndex = getSlideIndex(direction);
          width = getImageParam(imageIndex, 'width');
          $slide = $('<div>').addClass('slider-slide');
          $slide.appendTo($slides);
          $slide.attr('data-slide-state', state);
          $slide.attr('data-slide-index', slideIndex);
          $slide.css('width', width);
          if (state === 'prevprev') {
            states = ['prev', 'prevprev'];
          } else if (state === 'nextnext') {
            states = ['next', 'nextnext'];
          } else {
            states = ['prev', 'curr', 'next'];
          }
          updateSlidesPosition(states);
          image.onload = function() {
            return $slide.append($image);
          };
          image.src = url + getImageParam(imageIndex, 'folder') + '/' + getImageParam(imageIndex, 'file');
          return image.alt = getImageParam(imageIndex, 'alt');
        };
        initSlides = function() {
          placeSlide(0);
          placeSlide(1);
          placeSlide(-1);
          return initialized = true;
        };
        inView('.slider-' + sliderName).on('enter', function() {
          if (!initialized) {
            return initSlides();
          }
        });
        $(window).on('resize', function() {
          var $slideCurr, offsetNow, offsetTrue, width;
          $el.attr('slider-state', 'fixed');
          $slideCurr = $el.find('[data-slide-state=curr]');
          if ($slideCurr.length) {
            width = $slideCurr.outerWidth();
            offsetNow = $slideCurr.offset().left;
            offsetTrue = ($el.outerWidth() - width) / 2;
            setOffset(offsetTrue - offsetNow);
          }
          return $el.attr('slider-state', '');
        });
        $el.on('click', '[data-slider-toggle]', function(e) {
          e.preventDefault();
          return toggleInfo();
        });
        $el.on('click', '[data-slider-prev]', function(e) {
          e.preventDefault();
          return openSlide(-1);
        });
        $el.on('click', '[data-slider-next]', function(e) {
          e.preventDefault();
          return openSlide(1);
        });
        return $('[data-slider-switcher]').on('click', function(e) {
          var $this, count, currFolder, direction, i, index, j, newFolder, results;
          e.preventDefault();
          $this = $(this);
          index = getImageIndex(0);
          currFolder = getImageParam(index, 'folder');
          newFolder = $this.attr('data-slider-switcher');
          if (currFolder === newFolder) {
            return;
          }
          i = 0;
          j = 0;
          while (getImageParam(roundIndex(index + i), 'folder') !== newFolder) {
            i -= 1;
          }
          while (getImageParam(roundIndex(index + j), 'folder') !== newFolder) {
            j += 1;
          }
          if (Math.abs(i) < Math.abs(j)) {
            direction = -1;
            count = Math.abs(i);
          } else {
            direction = 1;
            count = Math.abs(j);
          }
          results = [];
          while (count !== 0) {
            openSlide(direction);
            results.push(count -= 1);
          }
          return results;
        });
      }
    });
  })(jQuery);

}).call(this);
