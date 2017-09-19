$(document).ready(function () {
	// Resize <area> tags when their images are resized 
	imageMapResize();

	// Highlight the <area> tags
	highlightAreaTags();

	// Create tooltips that show up when hovering over an <area> on the image
	createTooltips();

	// Add pin images to canvas element
	addPins(".good-sample");

	// Show a tooltip after all tooltips have loaded
	// Must set a timeout because we can't access the qtip API until after tooltips are "lazy-loaded" 
	setTimeout(function () {
		$('#good-1').qtip('api').show()
	}, 100);
});

function addPins(classSearch) {
	var can = $(classSearch + " div canvas")[0].getContext("2d");
	for (var area of $("map.good area")) {
		var x = parseInt(area.coords.split(",")[0]);
		var y = parseInt(area.coords.split(",")[1]) - 20;
		can.drawImage($("#pin")[0], x, y, 40, 40);
	}
	//can.drawImage($("#pin")[0], 50, 50);
}

function highlightAreaTags() {
	// NOTE: this does not work on resized images
	// TODO: workaround described here: https://github.com/kemayo/maphilight/issues/21
	$('img').maphilight({
		alwaysOn: true,
		fillOpacity: 0.0,
		strokeOpacity: 0.0
	});
}

function createTooltips() {
	// Add a tooltip to the <area> with id='good-1'
	var qtip_options = {
		// Hide all others when a tooltip is activated
		show: {
			solo: true
		},

		// Do not hide tooltip when mouse leaves
		// Hide when clicking on the <area>
		hide: {
			event: 'click'
		},

		position: {
			my: 'right bottom',
			at: 'center center'
		},

		// Set a CSS class
		style: 'qtip-toolbar'

	};

	var tooltip_content = {
		'#good-1': 'sample',
		'#good-2': 'sample 2',
		'#good-3': 'sample 3',
		'#bad-1': 'sample 4',
		'#bad-2': 'sample 5',
		'#bad-3': 'sample 6'
	};

	// Add s's properties to d
	function extend(s, d) {
		for (var key in s) {
			d[key] = s[key];
		}
		return d;
	}

	for (var key in tooltip_content) {
		$('area' + key).qtip(extend(qtip_options, {
			content: tooltip_content[key]
		}));
	}
}