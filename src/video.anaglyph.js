/*
 *  HTML5 Anaglyph Video
 * 
 *  Copyright (C) 2012 Kevin Tong (logicmd AT gmail.com)
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
	doLoad : function(_srcType, _stereoMode, _glassType, _videoWidth, _videoHeight) {
		
		this.srcType = _srcType;
		this.stereoMode = _stereoMode;
		this.glassType = _glassType;
		this.video = document.getElementById("videoDiv");
		// 即使这个video tag之后要被rename ID，但是在浏览器看了它还是有同一个唯一的ID
		// 这个ID不会改变，所以，我们就拿之前的ID就O了
		
		this.isFullScreen = false;
		
		this.cvs = document.getElementById("display");
		this.ctx = this.cvs.getContext("2d");

		this.buf = document.createElement("canvas");
		this.bufCtx = this.buf.getContext("2d");

		var self = this;
		this.video.addEventListener("play", function() {
			// Fix INDEX ERR when seeking & Fullscreen Progressive bar bug
			self.width = (self.video.width == 0) ? self.video.clientWidth : self.video.width ;
			self.height = (self.video.height == 0) ? self.video.clientHeight : self.video.height ;
			
			// TO Fix abitary resolution issues

			self.vwidth = (self.video.videoWidth == 0) ? _videoWidth : self.video.videoWidth ;
			self.vheight = (self.video.videoHeight == 0) ? _videoHeight : self.video.videoHeight ;
				
			// 第一遍载入时没有normWidth和normHeight，我们读clientWidth和clientHeight（屏幕实际显示大小）
			// 之后过这一块的时候我们永远用normWidth和normHeight，即视频的原始大小。
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
		var vwidth = this.vwidth;
		var vheight = this.vheight;
		 
		switch (this.srcType) {
			case "StereoUD":
			case "StereoDU":
				this.buf.width = vwidth;
				this.buf.height = vheight * 2;
				this.imageData = this.ctx.createImageData(vwidth, vheight);
				break;
			case "StereoLR":
			case "StereoRL":
				this.buf.width = vwidth * 2;
				this.buf.height = vheight;
				this.imageData = this.ctx.createImageData(vwidth, vheight);
				break;
		}
		
		
		this.cvs.style.position = "relative";
		// 重叠以便覆盖
		if (!this.isFullScreen) {
			this.enterNormMode();
		} else {
			this.enterFullScreen();
		}
		
		
	},
	
	computeFrame : function() {
		var glassType = this.glassType;
		
		var index = 0;
		var iData1 = this.iData1;
		var iData2 = this.iData2;
		var imageData = this.imageData;

		var y = this.imageData.width * this.imageData.height;
		
		switch(this.stereoMode) {
			case 'TrueAnaglyph':
				if (glassType == 'RedCyan') {
					var idr = iData1;
					var idg = iData2;
					var idb = iData2;
				}
				else if (glassType == 'GreenMagenta') {
					var idr = iData2;
					var idg = iData1;
					var idb = iData1;
				}
				else {
					return;
				}
					
				for (x = 0; x++ < y; ) {
					// Data1 - left; Data2 - right
					r = idr.data[index+0] * 0.299 + idr.data[index+1] * 0.587 + idr.data[index+2] * 0.114;
					if (glassType == 'GreenMagenta') {
						g = idg.data[index+0] * 0.299 + idg.data[index+1] * 0.587 + idg.data[index+2] * 0.114;
						b = 0;
					} else {
						g = 0;
						b = idb.data[index+0] * 0.299 + idb.data[index+1] * 0.587 + idb.data[index+2] * 0.114;
					}
					r = Math.min(Math.max(r, 0), 255);
					b = Math.min(Math.max(b, 0), 255);
					imageData.data[index++] = r;
					imageData.data[index++] = g;
					imageData.data[index++] = b;
					imageData.data[index++] = 0xFF;

				};
				break;
			
			case 'GrayAnaglyph':
				if (glassType == 'RedCyan') {
					var idr = iData1;
					var idg = iData2;
					var idb = iData2;
				}
				else if (glassType == 'GreenMagenta') {
					var idr = iData2;
					var idg = iData1;
					var idb = iData2;
				}
				else {
					return;
				}
					
				for (x = 0; x++ < y; ) {
					// Data1 - left; Data2 - right
					r = idr.data[index+0] * 0.299 + idr.data[index+1] * 0.587 + idr.data[index+2] * 0.114;
					g = idg.data[index+0] * 0.299 + idg.data[index+1] * 0.587 + idg.data[index+2] * 0.114;
					b = idb.data[index+0] * 0.299 + idb.data[index+1] * 0.587 + idb.data[index+2] * 0.114;
					r = Math.min(Math.max(r, 0), 255);
					g = Math.min(Math.max(g, 0), 255);
					b = Math.min(Math.max(b, 0), 255);
					imageData.data[index++] = r;
					imageData.data[index++] = g;
					imageData.data[index++] = b;
					imageData.data[index++] = 0xFF;
				};
				break;
				
			case 'ColorAnaglyph':
				if (glassType == 'RedCyan') {
					var idr = iData1;
					var idg = iData2;
					var idb = iData2;
				}
				else if (glassType == 'GreenMagenta') {
					var idr = iData2;
					var idg = iData1;
					var idb = iData2;
				}
				else {
					return;
				}
					
				for (x = 0; x++ < y; ) {
					// Data1 - left; Data2 - right
					imageData.data[index] = idr.data[index++];
					imageData.data[index] = idg.data[index++];
					imageData.data[index] = idb.data[index++];
					imageData.data[index] = 0xFF; index++;
				};
				break;
			
			case 'OptimizedAnaglyph':
				if (glassType == 'RedCyan') {
					var idr = iData1;
					var idg = iData2;
					var idb = iData2;
				}
				else if (glassType == 'GreenMagenta') {
					var idr = iData2;
					var idg = iData1;
					var idb = iData2;
				}
				else {
					return;
				}
					
				for (x = 0; x++ < y; ) {
					// Data1 - left; Data2 - right
					r = idr.data[index+1] * 0.7 + idr.data[index+2] * 0.3;
					g = idg.data[index+1];
					b = idb.data[index+2];
					r = Math.min(Math.max(r, 0), 255);			
					imageData.data[index++] = r;
					imageData.data[index++] = g;
					imageData.data[index++] = b;
					imageData.data[index++] = 0xFF;
				}
				break;			
			
			case 'Optimized+Anaglyph':
				if (glassType == 'RedCyan') {
					var idr = iData1;
					var idg = iData2;
					var idb = iData2;
				}
				else if (glassType == 'GreenMagenta') {
					var idr = iData2;
					var idg = iData1;
					var idb = iData2;
				}
				else {
					return;
				}
					
				for (x = 0; x++ < y; ) {
					// Data1 - left; Data2 - right
					g = idr.data[index+1] + 0.45 * Math.max(0, idr.data[index+0] - idr.data[index+1]);
					b = idr.data[index+2] + 0.25 * Math.max(0, idr.data[index+0] - idr.data[index+2]);
					r = g * 0.749 + b * 0.251;
					//r = Math.pow(g * 0.749 + b * 0.251, 1/1.6);
					g = idg.data[index+1] + 0.45 * Math.max(0, idg.data[index+0] - idg.data[index+1]);
					b = idb.data[index+2] + 0.25 * Math.max(0, idb.data[index+0] - idb.data[index+2]);
					r = Math.min(Math.max(r, 0), 255);
					g = Math.min(Math.max(g, 0), 255);
					b = Math.min(Math.max(b, 0), 255);
					imageData.data[index++] = r;
					imageData.data[index++] = g;
					imageData.data[index++] = b;
					imageData.data[index++] = 0xFF;
				}
				break;	
		}
		
			//全屏也好，不全屏也罢，大家都有scale
			this.tmpCvs.getContext("2d").putImageData(this.imageData, 0, 0);
			this.ctx.drawImage(this.tmpCvs, 0, 0);
			
		return;
	},
	/*
	 * 将video每一帧数据放到buffer context中并切分好放入iData1和iData2
	 * 注意iData1和iData2没有拉伸。
	 */
	splitFrame : function() {
		var vwidth = this.vwidth;
		var vheight = this.vheight;
		
		this.bufCtx.drawImage(this.video, 0, 0, vwidth, vheight, 0, 0, this.buf.width, this.buf.height);
		
		switch (this.srcType) {
			case "StereoUD":
				this.iData1 = this.bufCtx.getImageData(0, 0, vwidth, vheight);
				this.iData2 = this.bufCtx.getImageData(0, vheight, vwidth, vheight);
				break;
			case "StereoDU":
				this.iData2 = this.bufCtx.getImageData(0, 0, vwidth, vheight);
				this.iData1 = this.bufCtx.getImageData(0, vheight, vwidth, vheight);
				break;
			case "StereoLR":
				this.iData1 = this.bufCtx.getImageData(0, 0, vwidth, vheight);
				this.iData2 = this.bufCtx.getImageData(vwidth, 0, vwidth, vheight);
				break;
			case "StereoRL":
				this.iData2 = this.bufCtx.getImageData(0, 0, vwidth, vheight);
				this.iData1 = this.bufCtx.getImageData(vwidth, 0, vwidth, vheight);
				break;
		}
		return;
	},
	
	enterNormMode : function() {
		// 存scale前数据
		this.tmpCvs = document.createElement('canvas');
		this.tmpCvs.width = this.imageData.width;
		this.tmpCvs.height = this.imageData.height;
		
		this.cvs.width  = this.width;
		this.cvs.height = this.height;
		this.cvs.style.top = ( 0 - this.height - 1 ) + "px";
		this.cvs.style.left = -1 + "px";
		this.cvs.style.zIndex = "2";
		
		var hRate = (this.cvs.height + 1) / this.imageData.height;
		var wRate = (this.cvs.width + 1) / this.imageData.width;

		var scaleRate = ( hRate < wRate ) ? hRate : wRate;

		// scale 是状态量，scale一次即可。
		this.ctx.scale(scaleRate, scaleRate);

		this.ctx.translate(
			 (this.cvs.width + 1 - this.imageData.width * scaleRate) / 2 / scaleRate,
			 (this.cvs.height + 1 - this.imageData.height * scaleRate) / 2 / scaleRate
			);
		this.isFullScreen = false;
		
		return;
	},
	
	enterFullScreen : function(_offsetX, _offsetY) {
		// 存scale前数据
		this.tmpCvs = document.createElement('canvas');
		this.tmpCvs.width = this.imageData.width;
		this.tmpCvs.height = this.imageData.height;
		
		var ctrlHeight = 45;
		this.cvs.width  = window.screen.width;
		this.cvs.height = window.screen.height - ctrlHeight;
		this.cvs.style.zIndex = "2147483647";
		
		// 只有第一次call的时候才能拿到正确的offset，之后再seek的时候拿不到，因此我们需要保存这个值
		(_offsetX != 0) ? ( this.offsetX = _offsetX ) : ( _offsetX = this.offsetX );
		(_offsetY != 0) ? ( this.offsetY = _offsetY ) : ( _offsetX = this.offsetY );
		
		this.cvs.style.top = ( 0 - this.height - _offsetY ) + "px";
		this.cvs.style.left = ( 0 - _offsetX ) + "px";
		
		// Due to the bug of video-js issue #153
		// https://github.com/zencoder/video-js/issues/153
		//var hRate = this.cvs.height / this.imageData.height;
		var hRate = window.screen.height / this.imageData.height;
		var wRate = this.cvs.width / this.imageData.width;

		var scaleRate = ( hRate < wRate ) ? hRate : wRate;

		// scale 是状态量，scale一次即可。
		this.ctx.scale(scaleRate, scaleRate);
		// translate some pixels to cover original video perfectly.		
		// Thanks to Chao's help.
		this.ctx.translate(
			 (this.cvs.width - this.imageData.width * scaleRate) / 2 / scaleRate,
			 (window.screen.height - this.imageData.height * scaleRate) / 2 / scaleRate
			);
		this.isFullScreen = true;
		
		return;
	},
	
	exitFullScreen : function() {
		this.enterNormMode();
		this.isFullScreen = false;
		return;
	}
	
};
