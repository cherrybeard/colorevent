( ($) ->

	$.fn.extend
	  mailForm: ->
	    self = $.fn.mailForm
	    $(this).each (i, el) ->
	      self.init el

	$.extend $.fn.mailForm,
		init: (el) ->
			$el = $(el)

			$el.on 'focus', 'input[type=text]', ->
				$(this).closest('.text-input').removeClass('error')

			$el.on 'submit', (e) ->
				$this = $(this)
				$popup = $(this).parents('.popup')

				e.preventDefault()

				$this.find('input[type=text]').each ->
					if !$(this).val()
						$(this).closest('.text-input').addClass 'error'

				unless $this.find('.text-input.error').length
					ajaxData = {
					  url: 'index.php'
					  type: $this.attr 'method'
					  data: $this.serialize()
					}

					$this.find('input[type=submit]').prop 'disabled', true

					$.ajax(ajaxData).done (req) ->
						$this.find('input[type=submit]').prop('disabled',false);
						$popup.attr 'data-popup-state', 'confirm'

) jQuery
