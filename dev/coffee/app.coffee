$ ->
	WebFontConfig = {
		custom: {
			families: ['Fira Sans:n3,i3']
		}
	}

	WebFont.load(WebFontConfig)

	$('[data-slider]').slider()
	$('[data-popup-open]').popupOpen()
	$('[data-rent-calc]').rentCalc()
	$('form#callback').mailForm()
	$('[data-review]').reviewSwitcher()
	$('[data-scroll-to]').scroller()
