(function () {
	'use strict';

	function textFill(el, options) {
		var opts = options || {};
		var fontSize = opts.maxFontPixels || 100;
		var span = el.querySelector('span');
		if (!span) {
			return el;
		}

		var maxWidth = el.getBoundingClientRect().width;
		var textWidth;
		var lineHeight;

		do {
			span.style.fontSize = fontSize + 'px';
			span.style.wordWrap = 'normal';
			span.style.letterSpacing = '-0.02em';
			lineHeight = 0.98 * fontSize;
			fontSize = fontSize - 2;
			span.style.lineHeight = (lineHeight + lineHeight / 20) + 'px';
			textWidth = span.getBoundingClientRect().width;
		} while (textWidth > maxWidth && fontSize > 3);

		return el;
	}

	function fillAll() {
		var elements = document.querySelectorAll('.jtextfill');
		elements.forEach(function (el) {
			textFill(el, { maxFontPixels: 660 });
		});
	}

	function debounce(fn, waitMs) {
		var timeoutId;
		return function () {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(fn, waitMs);
		};
	}

	function init() {
		fillAll();
		window.addEventListener('resize', debounce(fillAll, 150));
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
