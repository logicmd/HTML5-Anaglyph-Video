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
	 * 	"stereoLR"
	 * 	"stereoRL"
	 * 	"stereoUD"
	 * 	"stereoDU"
	 * 	stereo后第一个字符代表左眼视点，第二个字符代表右眼视点
	 * @stereoMode -> 混合模式
	 * 	"RedCyanOptimized"
	 *
	 * 拿到两个canvas的的context，ctx1和ctx2
	 */
	doLoad : function(_srcType, _stereoMode) {
		this.srcType = _srcType;
		this.stereoMode = _stereoMode;
		this.video = document.getElementById("video");
		this.c1 = document.getElementById("c1");
		//this.bufCtx = this.c1.getContext("2d");
		
		this.cvs = document.getElementById("display");
		this.ctx = this.cvs.getContext("2d");

		this.buf = document.createElement("canvas");
		this.bufCtx = this.buf.getContext("2d");

		var self = this;
		this.video.addEventListener("play", function() {
			self.width = self.video.videoWidth;
			// vidoeWidth is a readonly variable.
			self.height = self.video.videoHeight;
			// vidoeHeight is a readonly variable.
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
		switch (this.srcType) {
			case "stereoUD":
			case "stereoDU":
				this.buf.width = this.c1.width = this.width;
				this.buf.height = this.c1.height = this.height * 2;
				this.imageData = this.ctx.createImageData(this.width, this.height);
				break;
			case "stereoLR":
			case "stereoRL":
				this.imageData = this.ctx.createImageData(this.width, this.height);
				break;
		}
		
		this.cvs.width = this.width;
		this.cvs.height = this.height;
		// 重叠以便覆盖
		this.cvs.style.left = ( 0 - this.width + 10 ) + "px";
	},
	
	displayFrame : function() {
		this.imageData = this.iData1;
		this.ctx.putImageData(this.iData1, 0, 0);
		
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

		this.ctx.putImageData(this.imageData, 0, 0, 0, 0, this.width, this.height);
		return;
	},
	/*
	 * 将video每一帧数据放到buffer context中并切分好放入iData1和iData2
	 * 注意iData1和iData2没有拉伸。
	 */
	splitFrame : function() {
		
		switch (this.srcType) {
			case "stereoUD":
				this.iData1 = this.bufCtx.getImageData(0, 0, this.width, this.height / 2);
				this.iData2 = this.bufCtx.getImageData(0, this.height / 2, this.width, this.height / 2);
				break;
			case "stereoDU":
				this.bufCtx.drawImage(this.video, 0, 0, this.width, this.height, 0, 0, this.width, this.height * 2);
				this.iData2 = this.bufCtx.getImageData(0, 0, this.width, this.height);
				this.iData1 = this.bufCtx.getImageData(0, this.height, this.width, this.height);
				break;
			case "stereoLR":
				this.iData1 = this.bufCtx.getImageData(0, 0, this.width / 2, this.height);
				this.iData2 = this.bufCtx.getImageData(this.width / 2, 0, this.width / 2, this.height);
				break;
			case "stereoRL":
				this.iData2 = this.bufCtx.getImageData(0, 0, this.width / 2, this.height);
				this.iData1 = this.bufCtx.getImageData(this.width / 2, 0, this.width / 2, this.height);
				break;
		}
		return;
	}
};
