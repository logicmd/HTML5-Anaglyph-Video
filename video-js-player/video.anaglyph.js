var processor = {
	timerCallback : function() {
		if(this.video.paused || this.video.ended) {
			return;
		}
		this.splitFrame();
		this.computeFrame();
		var self = this;
		// 每次算完一帧以后，等待0ms
		// 完成了timerCallback的死循环。
		setTimeout(function() {
			self.timerCallback();
		}, 0);
	},
	/*
	 * Initializer
	 * @srcType -> 立体模式
	 * 	"StereoLR"
	 * 	"StereoRL"
	 * 	"StereoUD"
	 * 	"StereoDU"
	 * 	stereo后第一个字符代表左眼视点，第二个字符代表右眼视点
	 * @stereoMode -> 混合模式
	 * 	"OptimizedAnaglyph"
	 *
	 * 拿到两个canvas的的context，ctx1和ctx2
	 */
	doLoad : function(_srcType, _stereoMode, _offsetX, _offsetY) {
		this.srcType = _srcType;
		this.stereoMode = _stereoMode;
		this.video = document.getElementById("videoDiv");
		this.fullscreenOffsetX = _offsetX;
		this.fullscreenOffsetY = _offsetY;
		// 即使这个video tag之后要被rename ID，但是在浏览器看了它还是有同一个唯一的ID
		// 这个ID不会改变，所以，我们就拿之前的ID就O了
		
		this.isFullScreen = false;
		
		this.cvs = document.getElementById("display");
		this.ctx = this.cvs.getContext("2d");

		this.buf = document.createElement("canvas");
		this.bufCtx = this.buf.getContext("2d");

		var self = this;
		this.video.addEventListener("play", function() {
			self.width = self.video.clientWidth;
			self.height = self.video.clientHeight;
			self.prepareSizeLoc();
			self.timerCallback();
		}, false);
	},
	/*
	 * 根据源的类型，确定中间canvas拉伸后的大小。
	 * context的尺寸会跟着canvas的尺寸一起伸缩。
	 * 
	 */
	prepareSizeLoc : function() {
		// for videoJS only
		//this.video.width = this.width;
		//this.video.height = this.height;
		switch (this.srcType) {
			case "StereoUD":
			case "StereoDU":
				this.buf.width = this.width;
				this.buf.height = this.height * 2;
				this.imageData = this.ctx.createImageData(this.width, this.height);
				break;
			case "StereoLR":
			case "StereoRL":
				this.buf.width = this.width * 2;
				this.buf.height = this.height;
				this.imageData = this.ctx.createImageData(this.width, this.height);
				break;
		}
		
		this.cvs.width = this.width;
		this.cvs.height = this.height;
		// 重叠以便覆盖
		this.cvs.style.position = "relative";
		this.cvs.style.top = ( 0 - this.height ) + "px";
	},
	
	computeFrame : function() {
		switch (this.stereoMode) {
			default:
				break;
		}
		var index = 0;
		var idr = this.iData2;
		var idg = this.iData1;
		var idb = this.iData1;

		var y = this.imageData.width * this.imageData.height;

		for( x = 0; x++ < y; ) {
			r = idr.data[index + 1] * 0.7 + idr.data[index + 2] * 0.3;
			g = idg.data[index + 1];
			b = idb.data[index + 2];
			r = Math.min(Math.max(r, 0), 255);
			this.imageData.data[index++] = r;
			this.imageData.data[index++] = g;
			this.imageData.data[index++] = b;
			this.imageData.data[index++] = 0xFF;
		}
		
		
		if(!this.isFullScreen) {
			this.ctx.putImageData(this.imageData, 0, 0);
		} else {
			this.tmpCvs.getContext("2d").putImageData(this.imageData, 0, 0);
			
			this.ctx.drawImage(this.tmpCvs, 0, 0);
		}
		return;
	},
	/*
	 * 将video每一帧数据放到buffer context中并切分好放入iData1和iData2
	 * 注意iData1和iData2没有拉伸。
	 */
	splitFrame : function() {
		
		switch (this.srcType) {
			case "StereoUD":
				this.bufCtx.drawImage(this.video, 0, 0, this.width, this.height, 0, 0, this.buf.width, this.buf.height);			
				this.iData1 = this.bufCtx.getImageData(0, 0, this.width, this.height);
				this.iData2 = this.bufCtx.getImageData(0, this.height, this.width, this.height);
				break;
			case "StereoDU":
				this.bufCtx.drawImage(this.video, 0, 0, this.width, this.height, 0, 0, this.buf.width, this.buf.height);
				this.iData2 = this.bufCtx.getImageData(0, 0, this.width, this.height);
				this.iData1 = this.bufCtx.getImageData(0, this.height, this.width, this.height);
				break;
			case "StereoLR":
				this.bufCtx.drawImage(this.video, 0, 0, this.width, this.height, 0, 0, this.buf.width, this.buf.height);
				this.iData1 = this.bufCtx.getImageData(0, 0, this.width, this.height);
				this.iData2 = this.bufCtx.getImageData(this.width, 0, this.width, this.height);
				break;
			case "StereoRL":
				this.bufCtx.drawImage(this.video, 0, 0, this.width, this.height, 0, 0, this.buf.width, this.buf.height);
				this.iData2 = this.bufCtx.getImageData(0, 0, this.width, this.height);
				this.iData1 = this.bufCtx.getImageData(this.width, 0, this.width, this.height);
				break;
		}
		return;
	},
	
	enterFullScreen : function() {
		// 存scale前数据
		this.tmpCvs = document.createElement('canvas');
		this.tmpCvs.width = this.imageData.width;
		this.tmpCvs.height = this.imageData.height;
		
		var ctrlHeight = 45;
		this.cvs.width  = window.screen.width; //= this.ctx.width
		this.cvs.height = window.screen.height - ctrlHeight;//= this.ctx.height
		this.cvs.style.zIndex = "2147483647";
		this.cvs.style.top = ( 0 - this.height - 9 ) + "px";
		this.cvs.style.left = ( 0 - 9 ) + "px";
		
		// Due to the bug of video-js issue #153
		// https://github.com/zencoder/video-js/issues/153
		//var hRate = this.cvs.height / this.imageData.height;
		var hRate = (window.screen.height + 1) / this.imageData.height;
		var wRate = (this.cvs.width + 1) / this.imageData.width;

		this.scaleRate = ( hRate < wRate ) ?　 hRate : wRate;

		// scale 是状态量，scale一次即可。
		this.ctx.scale(this.scaleRate, this.scaleRate);
		// translate some pixels to cover original video perfectly.
		this.ctx.translate(
			 (this.cvs.width + 1 - this.imageData.width * this.scaleRate) / 2 / this.scaleRate,
			 (window.screen.height + 1 - this.imageData.height * this.scaleRate) / 2 / this.scaleRate
			);
		// TODO dity constants.
		//this.ctx.translate(this.fullscreenOffsetX, this.fullscreenOffsetY);
		this.isFullScreen = true;
		
		return;
	},
	
	exitFullScreen : function() {
		this.cvs.width = this.width;
		this.cvs.height = this.height;
		this.cvs.style.zIndex = "1";
		this.cvs.style.top = ( 0 - this.height ) + "px";
		this.cvs.style.left = 0 + "px";
 
		this.isFullScreen = false;
		return;
	},
	
	// not important.
	displayFrame : function() {
		this.imageData = this.iData1;
		this.ctx.putImageData(this.iData1, 0, 0);
		
	},
};
