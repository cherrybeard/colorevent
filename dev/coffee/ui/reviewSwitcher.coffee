( ($) ->

	$.fn.extend
	  reviewSwitcher: ->
	    self = $.fn.reviewSwitcher
	    $(this).each (i, el) ->
	      self.init el

	$.extend $.fn.reviewSwitcher,
		init: (el) ->
			$el 		 = $(el)

			$el.on 'click', '[data-review-next]', (e) ->
				review = parseInt( $el.attr('data-review') ) + 1
				review = review - 5 if review > 5
				$el.attr('data-review', review)

			$el.on 'click', '[data-review-prev]', (e) ->
				review = parseInt( $el.attr('data-review') ) - 1
				review = review + 5 if review < 1
				$el.attr('data-review', review)

) jQuery
