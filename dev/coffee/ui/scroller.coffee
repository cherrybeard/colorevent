( ($) ->

	$.fn.extend
	  scroller: ->
	    self = $.fn.scroller
	    $(this).each (i, el) ->
	      self.init el

	$.extend $.fn.scroller,
		init: (el) ->
			$el 		 = $(el)

			$el.on 'click', (e) ->
				target = $el.attr('data-scroll-to')
				if target
					e.preventDefault()
					pos = $(target).offset().top
					menuHeight = $('.section-menu').outerHeight()
					console.log(menuHeight)
					$('html, body').animate({
			        scrollTop: (pos - menuHeight + 5)
			    }, 300)

) jQuery
