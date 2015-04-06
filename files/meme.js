/*
Script modificado por Henrique Eihara para App: Sorocaba é de Todos!
A versão original deste javascript, você pode encontra em:
https://github.com/BuddyMeme/Meme.js

********************************************************************************

Copyright (c) 2012 BuddyMeme

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

window.Meme = function(image, canvas, top, bottom) {

	/*
	Default top and bottom
	*/

	top = top || '';
	bottom = bottom || '';

	/*
	Deal with the canvas
	*/

	// If it's nothing, set it to a dummy value to trigger error
	if (!canvas)
		canvas = 0;

	// If it's a string, conver it
	if (canvas.toUpperCase)
		canvas = document.getElementById(canvas);

	// If it's jQuery or Zepto, convert it
	if (($) && (canvas instanceof $))
		canvas = canvas[0];

	// Throw error
	if (!(canvas instanceof HTMLCanvasElement))
		throw new Error('No canvas selected');

	// Get context
	var context = canvas.getContext('2d');

	/*
	Deal with the image
	*/

	// If there's no image, set it to a dummy value to trigger an error
	if (!image)
		image = 0;

	// Convert it from a string
	if (image.toUpperCase) {
		var src = image;
		image = new Image();
		image.src = src;
	}

	// Set the proper width and height of the canvas
	var setCanvasDimensions = function(w, h) {
		canvas.width = w;
		canvas.height = h;
	};
	setCanvasDimensions(image.width, image.height);	

	/*
	Draw a centered meme string
	*/

	var drawText = function(text, topOrBottom, y) {

		// Variable setup
		topOrBottom = topOrBottom || 'top';
		var fontSize = (canvas.height / 10);
		var x = 260;
		if (typeof y === 'undefined') {
			y = 360;
			if (topOrBottom === 'bottom')
				y = 260;
		}

		// Should we split it into multiple lines?
		if (context.measureText(text).width > (430)) {

			// Split word by word
			var words = text.split(' ');
			var wordsLength = words.length;

			// Start with the entire string, removing one word at a time. If
			// that removal lets us make a line, place the line and recurse with
			// the rest. Removes words from the back if placing at the top;
			// removes words at the front if placing at the bottom.
			if (topOrBottom === 'top') {
				var i = wordsLength;
				while (i --) {
					var justThis = words.slice(0, i).join(' ');
					if (context.measureText(justThis).width < 430) {
						drawText(justThis, topOrBottom, y);
						drawText(words.slice(i, wordsLength).join(' '), topOrBottom, y + fontSize);
						return;
					}
				}
			}else if (topOrBottom === 'bottom') {
				for (var i = 0; i < wordsLength; i ++) {
					var justThis = words.slice(i, wordsLength).join(' ');
					if (context.measureText(justThis).width < (canvas.width * 1.0)) {
						drawText(justThis, topOrBottom, y);
						drawText(words.slice(0, i).join(' '), topOrBottom, y - fontSize);
						return;
					}
				}
			}
		}

		// Draw!
		context.fillText(text, x, y, canvas.width * 0.5);

	};

	/*
	Do everything else after image loads
	*/

	image.onload = function() {

		// Set dimensions
		setCanvasDimensions(this.width, this.height);

		// Draw the image
		context.drawImage(image, 0, 0);

		// Set up text variables
		context.fillStyle = 'black';
		context.lineWidth = 2;
		var fontSize = (canvas.height / 10);
		context.font = fontSize + 'px ARIAL';
		context.textAlign = 'center';

		// Draw them!
		drawText(top, 'top');

		// Set up text variables
		context.fillStyle = 'black';
		context.lineWidth = 2;
		var fontSize = 30;
		context.font = fontSize + 'px ARIAL';
		context.textAlign = 'center';

		drawText(bottom, 'bottom');

	};


};

