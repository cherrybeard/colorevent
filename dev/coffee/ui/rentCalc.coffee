( ($) ->

	$.fn.extend
	  rentCalc: ->
	    self = $.fn.rentCalc
	    $(this).each (i, el) ->
	      self.init el

	$.extend $.fn.rentCalc,
		init: (el) ->
			$el 		 = $(el)
			$body 	 = $('body')
			$movable = $el.find('.rent-calc-control-move')
			$dimensions	= $el.find('.rent-calc-control-text')
			$price	 = $el.find('.rent-calc-price span')
			$wall		 = $el.find('.rent-calc-wall')

			isMoving 			 = false
			startMovingPos = 0
			startElPos 		 = 0

			sizes = {
				'0':
					size: 'XS',
					price: '18 000',
					dimensions: '200 × 200'
				'1':
					size: 'S',
					price: '28 000',
					dimensions: '250 × 250'
				'2':
					size: 'M',
					price: '34 000',
					dimensions: '300 × 250'
				'3':
					size: 'L',
					price: '47 000',
					dimensions: '420 × 250'
				'4':
					size: 'XL',
					price: '54 000',
					dimensions: '480 × 250'
				'5':
					size: 'XXL',
					price: '61 000',
					dimensions: '540 × 250'
				'6':
					size: 'XXXL',
					price: '70 000',
					dimensions: '600 × 250'
			}


			$el.on 'mousedown', '[data-rent-calc-move]', (e) ->
				e.preventDefault()
				isMoving 			 = true
				startMovingPos = e.pageX
				startElPos 		 = parseInt($movable.css('left'))

			$body.on 'mouseup', (e) ->
				isMoving = false

			$body.on 'mousemove', (e) ->
				if isMoving
					pos = e.pageX
					diff = pos - startMovingPos + startElPos
					size = parseInt(diff / 360 * 7)

					size = 6 if size > 6
					size = 0 if size < 0

					newPos = size * 60

					$movable.css('left', newPos + 'px' )
					$wall.attr('data-size', sizes[size]['size'])
					$price.text(sizes[size]['price'])
					$dimensions.text(sizes[size]['dimensions'])




) jQuery
