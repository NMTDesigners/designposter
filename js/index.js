// Add s's properties to d
function extend(s, d) {
	for (var key in s) {
		d[key] = s[key];
	}
	return d;
}


// Find all elements that have id set to "prefixN" where N=1,2,... 
// Call action("prefixN", element)
function forEachStartingWith(prefixes, action) {
    prefixes.forEach(function (prefix) {
        for (var i = 1; true; i++) {
            var id = prefix + i,
                element = document.getElementById(id);

            if (element !== null) {
                action(id, element); 
            } else {
                // Found the last element, now stop
                break;
            }
        }
    });
}


$(document).ready(function () {
	// Resize <area> tags when their images are resized 
	imageMapResize();

	// Highlight the <area> tags
	highlightAreaTags();

	// Create tooltips that show up when hovering over an <area> on the image
	createTooltips();

	// Add pin images to canvas element
	addPins('good');
	addPins('bad');
});

function addPins(tag) {
	var can = $('.' + tag + '-sample div canvas')[0].getContext('2d');
	for (var area of $('map.' + tag + ' area')) {
		var x = parseInt(area.coords.split(',')[0]) - 25;
		var y = parseInt(area.coords.split(',')[1]) - 25;
		can.drawImage($('#pin.'+tag)[0], x, y, 50, 50);
	}
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
    // These options are applied to all <area> elements
	var qtip_options = {
		// Hide all others when a tooltip is activated
		show: {
			solo: true,
            event: 'click mouseenter'
		},

		// Do not hide tooltip when mouse leaves
		hide: {
			event: ''
		},

		position: {
			my: 'center bottom',
			at: 'center top'
		},

		// Set a CSS class
		style: 'qtip-toolbar'

	};

    forEachStartingWith(['good-', 'bad-'], function (id, element) {
        // Create a tooltip at each <area> element with id "prefixN"
        // Set the tooltip content to the <area>'s content attribute
        // (if it exists)
        var content = element.getAttribute('content');

        if (content !== null) {
    		$('area#' + id).qtip(extend(qtip_options, {
			    content: content 
		    }));
        }
    });
}
