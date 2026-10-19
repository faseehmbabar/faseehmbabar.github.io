/*
	Dark mode toggle.
	Pairs with the inline anti-flash script in <head> of every page,
	which already sets data-theme on <html> before first paint.
*/
(function() {

	var root = document.documentElement;
	var STORAGE_KEY = 'theme';

	function applyIcon(theme) {
		var btn = document.getElementById('theme-toggle');
		if (!btn) return;
		btn.classList.toggle('fa-moon', theme !== 'dark');
		btn.classList.toggle('fa-sun', theme === 'dark');
		btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
	}

	function init() {
		var current = root.getAttribute('data-theme') || 'light';
		applyIcon(current);

		var btn = document.getElementById('theme-toggle');
		if (!btn) return;

		btn.addEventListener('click', function() {
			var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			root.setAttribute('data-theme', next);
			try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
			applyIcon(next);
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

})();