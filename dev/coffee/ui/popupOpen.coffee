( ($) ->

	$.fn.extend
	  popupOpen: ->
	    self = $.fn.popupOpen
	    $(this).each (i, el) ->
	      self.init el

	$.extend $.fn.popupOpen,
		init: (el) ->
			measureScrollbar = ->
				scrollDiv = document.createElement('div')
				scrollDiv.className = 'scrollbar-measure'
				$body.append(scrollDiv)
				scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
				$body[0].removeChild(scrollDiv)
				scrollbarWidth

			setScrollbarPadding = ($el) ->
				padding = parseInt($el.css('padding-right'))
				$el.css 'padding-right', (measureScrollbar() + padding)

			$el 	= $(el)
			$body = $('body')
			$menu = $('.section-menu')

			$el.on 'click', (e) ->
				if $el.attr('data-popup-open') == 'open'
					unless $body.attr('data-popup-state') == 'closing'
						$body.attr('data-popup-state', 'visible')
						setScrollbarPadding($body)
						setScrollbarPadding($menu)
				else
					$body.attr('data-popup-state', 'closing')
					$body.css('padding-right', '')
					$menu.css('padding-right', '')
					setTimeout ->
						$body.attr('data-popup-state', '')
					, 800



) jQuery
