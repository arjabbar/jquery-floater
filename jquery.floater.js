// JQuery Floater
// A JQuery plugin written by Abdur Jabbar

(function($){
	$.fn.float = $.fn.float || function(options){
		
		var settings = $.extend({
			// Defaults
			transitionDuration: 500,
			generatedClassName: 'floater',
			topMargin: 0,
			transitionEnabled: true,
			transitionTimingFunction: 'ease-in-out'
		}, options); 
		
		// Taken from David Walsh to find the vendor prefix
		var prefix = (function () {
		  var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
			  .call(styles)
			  .join('') 
			  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		  return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		  };
		})();
		// End of David Walsh code theft
		
		var alteredValues = ['position', 'top', 'display'];
		
		var transitionProp = 'top ' + settings.transitionDuration + 'ms ' + settings.transitionTimingFunction;
		
		var isOutOfView = function(elem){
			return $(elem).offset().top - window.scrollY < 0;
		}
		
		var isTogether = function(elem1, elem2) {
			return 	$(elem1).offset().top === $(elem2).offset().top;
		}
		
		var saveOriginalCss = function(elem, cssProps) {
			$.each(cssProps, function(index, prop){
				$(elem).data(prop, $(elem).css(prop));
			}); 
		}
		
		var restoreOriginalCss = function(elem, cssProps) {
			$.each(cssProps, function(index, prop){
				$(elem).css(prop, $(elem).data(prop));
			});	
		}
		
		var addTransition = function(elem) {
			var currentTransitionProp = $(elem).css(prefix.css + 'transition');
			if (settings.transitionEnabled && currentTransitionProp.indexOf(settings.transitionProp) === -1)
				$(elem).css(prefix.css + 'transition', currentTransitionProp + ',' + transitionProp);	
		}
		
		var removeTransition = function(elem) {
			var currentTransitionProp = $(elem).css(prefix.css + 'transition');
			if (settings.transitionEnabled && currentTransitionProp.indexOf('top') > -1)
				$(elem).css(prefix.css + 'transition', currentTransitionProp.split(transitionProp)[0].trim());			
		}
		
		return this.each(function(index, elem){
			var randomId = Math.floor(Math.random() * 99999);
			var generatedClass = settings.generatedClassName + '-' + randomId;
			var $elem = $(elem).addClass(generatedClass);
			var $dock = $('<span></span>').addClass(generatedClass + '-dock');
			$dock.insertBefore($elem);
			saveOriginalCss($elem, alteredValues);
			$(window).scroll(function(){
				if ((isOutOfView($elem) || !isTogether($elem, $dock)) && window.scrollY !== 0) {
					var newPosition = Math.max((window.scrollY - $dock.offset().top + settings.topMargin), 0);
					addTransition($elem);
					$elem.css({'position': 'relative',
							'top': newPosition + 'px',
							'display': 'block'});
				} else {
					restoreOriginalCss($elem, alteredValues);
					removeTransition($elem);
				}
			});
		});
	}
})(jQuery);