

var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

(function () {
	"use strict";

	RocknCoder.Pages.paintPage = (function () {
		var ctx, lineStyle,
			$window = $(window),
			$canvas = $('#flexBox'),
			canvas = $canvas.get(0),
			// resize the canvas after retrieving the current dimensions
			reSizeCanvas = function () {
				var dims = RocknCoder.Dimensions.get();
				$canvas.attr({
					width: dims.width - 4,
					height: dims.height - 4
				});
				return dims;
			},
			// get the context and create a yellow pen
			setContext = function () {
				ctx = canvas.getContext('2d');
				lineStyle = {
					strokeStyle: "rgba(250,250,0,1)",
					lineWidth: 2,
					lineCap: "round"
				};
				$.extend(ctx, lineStyle);
			},
			// do all of the canvas and context stuff
			updateContext = function () {
				window.scrollTo(1, 0);
				reSizeCanvas();
				setContext();
			},
			// extract the x&y
			extractXY = function (oe) {
				return {
					x: oe.pageX,
					y: oe.pageY
				};
			},
			// to truly make this code your own, add more code here
			pageshow = function () {
				// start tracking the touches, move the pen to the beginning of a line
				$canvas.bind('touchstart', function (event) {
					var xy = extractXY(event.originalEvent.touches[0]);
					ctx.moveTo(xy.x, xy.y);
					event.preventDefault();
					return false;
				});
				// draw a line from the last point to this one
				$canvas.bind('touchmove', function (event) {
					var xy = extractXY(event.originalEvent.touches[0]);
					ctx.lineTo(xy.x, xy.y);
					ctx.stroke();
					event.preventDefault();
					return false;
				});
				updateContext();
			},
			// be a good citizen, unhook any events we hook
			pagehide = function () {
				$canvas.unbind('touchstart');
				$canvas.unbind('touchmove');
			};
		return {
			pageshow: pageshow,
			pagehide: pagehide
		};
	}());
}());
