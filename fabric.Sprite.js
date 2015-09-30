//Fork of Klortho https://github.com/Klortho/ file. 
//Javascript used in the Fabric.js Sprite demo, http://fabricjs.com/animated-sprite/. 
//Written by Juriy Zaytsev, https://github.com/kangax.

fabric.Sprite = fabric.util.createClass(fabric.Image, {

	type: 'sprite',

	spriteWidth: 50,
	spriteHeight: 72,
	spriteIndex: 0,
	spriteInterval: 100,

	initialize: function(element, options) {
		options || (options = { });

		options.width = this.spriteWidth;
		options.height = this.spriteHeight;

		this.callSuper('initialize', element, options);

		this.createTmpCanvas();
		this.createSpriteImages();
	},

	createTmpCanvas: function() {
		this.tmpCanvasEl = fabric.util.createCanvasElement();
		this.tmpCanvasEl.width = this.spriteWidth || this.width;
		this.tmpCanvasEl.height = this.spriteHeight || this.height;
	},

	createSpriteImages: function() {
		this.spriteImages = [ ];

		var steps = this._element.width / this.spriteWidth;
		for (var i = 0; i < steps; i++) {
			this.createSpriteImage(i);
		}
	},

	createSpriteImage: function(i) {
		var tmpCtx = this.tmpCanvasEl.getContext('2d');
		tmpCtx.clearRect(0, 0, this.tmpCanvasEl.width, this.tmpCanvasEl.height);
		tmpCtx.drawImage(this._element, -i * this.spriteWidth, 0);

		var dataURL = this.tmpCanvasEl.toDataURL('image/png');
		var tmpImg = fabric.util.createImage();

		tmpImg.src = dataURL;

		this.spriteImages.push(tmpImg);
	},

	_render: function(ctx) {
		ctx.drawImage(
			this.spriteImages[this.spriteIndex],
			-this.width / 2,
			-this.height / 2
		);
	},

	play: function() {
		var _this = this;
		this.animInterval = setInterval(function() {

			_this.onPlay && _this.onPlay();

			_this.spriteIndex++;
			if (_this.spriteIndex === _this.spriteImages.length) {
				_this.spriteIndex = 0;
			}
		}, this.spriteInterval);
	},

	stop: function() {
		clearInterval(this.animInterval);
	}
});

fabric.Sprite.fromImage = function(img, callback, imgOptions) {
	callback(new fabric.Sprite(img._element, imgOptions));
};

fabric.Sprite.fromURL = function(url, callback, imgOptions) {
	fabric.util.loadImage(url, function(img) {
		console.log(img);
		callback(new fabric.Sprite(img, imgOptions));
	});
};

fabric.Sprite.async = true;
