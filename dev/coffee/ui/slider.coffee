( ($) ->

	$.fn.extend
	  slider: ->
	    self = $.fn.slider
	    $(this).each (i, el) ->
	      self.init el

	$.extend $.fn.slider,
		init: (el) ->
			MARGIN = 16
			EXT		 = '.jpg'
			STATES = {
				'-2': 'prevprev'
				'-1': 'prev'
				'0' : 'curr'
				'1' : 'next'
				'2' : 'nextnext'
			}
			SLIDERS = {
				rent: [
					{ folder: 'dawn', 	file: '1.jpg', 	width: 840, alt: 'Фотостена в аренду розового цвета' },
					{ folder: 'dawn', 	file: '2.jpg', 	width: 374, alt: 'Фотостена из бумажных цветов' },
					{ folder: 'dawn', 	file: '3.jpg', 	width: 485, alt: 'Фотозона на свадьбу «Рассвет»' },
					{ folder: 'gold', 	file: '1.jpg', 	width: 840, alt: 'Оформление бумажными цветами' },
					{ folder: 'gold', 	file: '2.jpg', 	width: 374, alt: 'Белые бумажные цветы' },
					{ folder: 'gold', 	file: '3.jpg', 	width: 420, alt: 'Бумажные цветы на свадьбу,' },
					{ folder: 'winter', file: '1.jpg', 	width: 840, alt: 'Фотостена из синих бумажных цветов' },
					{ folder: 'winter', file: '2.jpg', 	width: 840, alt: 'Декор бумажными цветами' },
					{ folder: 'winter', file: '3.jpg', 	width: 809, alt: 'Аренда бумажной фотозоны' },
					{ folder: 'sepia', 	file: '1.jpg', 	width: 840, alt: 'Бумажная фотозона «Сепия»' },
					{ folder: 'sepia', 	file: '2.jpg', 	width: 840, alt: 'Бумажные цветы для фотостены' },
					{ folder: 'sepia', 	file: '3.jpg', 	width: 840, alt: 'Фотозона на свадьбу' },
					{ folder: 'melody', file: '1.jpg', 	width: 932, alt: 'Аренда фотозоны из бумажных цветов' },
					{ folder: 'melody', file: '2.jpg', 	width: 374, alt: 'Детская фотозона' },
					{ folder: 'melody', file: '3.jpg', 	width: 374, alt: 'фотозона на день рождения «Мелодия»' },
					{ folder: 'melody', file: '4.jpg', 	width: 840, alt: 'Фотозона для детского праздника' }
				]
				order: [
					{ folder: 'order', file: '1.jpg',  width: 840, alt: 'Фотостена на заказ'  },
					{ folder: 'order', file: '2.jpg',	 width: 840, alt: 'Фотозона из бумажных цветов на заказ' },
					{ folder: 'order', file: '3.jpg',  width: 840, alt: 'Украшение бумажными цветами'  }
				]
			}

			$el 				= $(el)
			$rentPrice	= $('[data-rent-price]')
			$rentSliders= $('[data-slider-rent]')
			sliderName	= $el.attr('data-slider')
			return unless SLIDERS[sliderName]
			slidesTotal = SLIDERS[sliderName].length #parseInt($el.attr('data-slider-amount'))
			url					= 'img/sliders/'
			currImage		= 1
			currSlide 	= 1
			currOffset  = 0
			$slides 		= $('<div>').addClass('slider-slides').appendTo($el)
			initialized = false
			shownRentInfo		= {
				dawn: true
				gold: false
				winter: false
				sepia: false
				melody: false
			}

			toggleInfo = (state) ->
				unless state
					state = if $el.attr('data-slider-info') == 'hidden' then 'show' else 'hide'
				if state == 'hide'
					$el.attr 'data-slider-info', 'hidden'
				else
					$el.attr 'data-slider-info', ''

			getImageParam = (image, param) ->
				SLIDERS[sliderName][image-1][param]

			roundIndex = (index) ->
				index -= slidesTotal if index > slidesTotal
				index += slidesTotal if index < 1
				return index

			getImageIndex = (direction) ->
				roundIndex(currImage + direction)

			getSlideIndex = (direction) ->
				(currSlide + direction)

			getSlide = (direction) ->
				slide = getSlideIndex(direction)
				$slides.find('[data-slide-index='+slide+']')

			setSlideStates = (direction) ->
				if direction > 0
					states = [-2, -1, 0, 1, 2]
				else
					states = [2, 1, 0, -1, -2]

				for oldState in states
					newState = oldState - direction
					if Math.abs(newState) < 2
						state = STATES[newState]
						getSlide(oldState).attr('data-slide-state', state)
					else
						getSlide(oldState).remove()

				currSlide += direction
				currImage = roundIndex(currImage + direction)

			updateRentSlider = (direction) ->
				currFolder = getImageParam(getImageIndex(0), 'folder')
				newFolder = getImageParam(getImageIndex(direction), 'folder')
				unless currFolder == newFolder
					unless shownRentInfo[newFolder]
						toggleInfo('show')
						shownRentInfo[newFolder] = true
					$rentSliders.attr('data-slider-rent', newFolder)
					$rentPrice.attr('data-rent-price', newFolder)

			updateSlidesPosition = (states) ->
				$slides.find('.slider-slide').each ->
					$slide = $(this)
					state = $slide.attr('data-slide-state')
					if state in states
						offset = 0
						switch state
							when 'prevprev'
								offset = getSlide(-1).position().left - $slide.outerWidth() - MARGIN
							when 'prev'
								offset = getSlide(0).position().left - $slide.outerWidth() - MARGIN
							when 'curr'
								offset = ($el.outerWidth() - $slide.outerWidth()) / 2
							when 'next'
								$slideCurr = getSlide(0)
								offset		 = $slideCurr.position().left + $slideCurr.outerWidth() + MARGIN
							when 'nextnext'
								$slideNext = getSlide(1)
								offset		 = $slideNext.position().left + $slideNext.outerWidth() + MARGIN
						$slide.css 'left', offset+'px'
						$slide.addClass('visible')

			setOffset = (offset) ->
				currOffset = offset + currOffset
				$slides.css('transform', 'translateX('+currOffset+'px)')

			openSlide = (direction) ->
				toggleInfo('hide')
				if sliderName == 'rent'
					updateRentSlider(direction)
				placeSlide(2 * direction)
				setOffset( - direction * (( getSlide(0).outerWidth() + getSlide(direction).outerWidth() ) / 2 + MARGIN) )
				setSlideStates(1 * direction)

			placeSlide = (direction) ->
				image  = new Image()
				$image = $(image)
				state  = STATES[direction]
				imageIndex = getImageIndex(direction)
				slideIndex = getSlideIndex(direction)
				width = getImageParam(imageIndex, 'width')
				$slide = $('<div>').addClass('slider-slide')

				$slide.appendTo($slides)
				$slide.attr('data-slide-state', state)
				$slide.attr('data-slide-index', slideIndex)
				$slide.css('width', width)

				if state == 'prevprev'
					states = ['prev', 'prevprev']
				else if state == 'nextnext'
					states = ['next', 'nextnext']
				else
					states = ['prev', 'curr', 'next']
				updateSlidesPosition(states)

				image.onload = ->
					$slide.append($image)

				image.src = url+getImageParam(imageIndex, 'folder')+'/'+getImageParam(imageIndex, 'file')
				image.alt = getImageParam(imageIndex, 'alt')

			initSlides = ->
				placeSlide(0)
				placeSlide(1)
				placeSlide(-1)
				initialized = true

			inView('.slider-'+sliderName).on 'enter', ->
				unless initialized
					initSlides()

			$(window).on 'resize', ->
				$el.attr('slider-state', 'fixed')
				$slideCurr 	= $el.find('[data-slide-state=curr]')
				if $slideCurr.length
					width				= $slideCurr.outerWidth()
					offsetNow 	= $slideCurr.offset().left
					offsetTrue 	= ($el.outerWidth() - width) / 2
					setOffset(offsetTrue - offsetNow)
				$el.attr('slider-state', '')


			$el.on 'click', '[data-slider-toggle]', (e) ->
				e.preventDefault()
				toggleInfo()

			$el.on 'click', '[data-slider-prev]', (e) ->
				e.preventDefault()
				openSlide(-1)

			$el.on 'click', '[data-slider-next]', (e) ->
				e.preventDefault()
				openSlide(1)

			$('[data-slider-switcher]').on 'click', (e) ->
				e.preventDefault()
				$this = $(this)
				index = getImageIndex(0)
				currFolder = getImageParam(index, 'folder')
				newFolder = $this.attr('data-slider-switcher')
				return if currFolder == newFolder

				i = 0
				j = 0
				i-= 1 until getImageParam(roundIndex(index+i), 'folder') == newFolder
				j+= 1 until getImageParam(roundIndex(index+j), 'folder') == newFolder
				if Math.abs(i)<Math.abs(j)
					direction = -1
					count = Math.abs(i)
				else
					direction = 1
					count = Math.abs(j)

				until count == 0
					openSlide(direction)
					count -= 1

) jQuery
