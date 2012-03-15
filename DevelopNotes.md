#HTML5-Anaglyph-Video 开发心得
## demo 修改Javascript
`let`似乎不被主流浏览器支持。

## Naive Video Player 开发心得
1. `doLoad()`-> 至少需要两个canvas，一个用于最终显示（#display），一个用于中间计算（buffer）。
2. `splitFrame()`-> 为了把原始每帧图像拉伸到正常比例，我没有考虑差值（非naive code耗CPU），而是采用`context.drawImage()`手动指定dst的长宽以完成拉伸。
3. `splitFrame()`-> 使用`iData1`和`iData2`两个`imagedata`分别截取buffer中的两个视点。
4. `computeFrame()`-> 将`iData1`和`iData2`分别抽取RGB通道合成放入`imageData`显示出来。

## Video JS Player 开发心得
1. `doLoad()`-> 使3D得以使用在videojs框架关键在于找到待处理的video，考虑到videojs会在DOM load时候对DOM tree rewrite，很棘手。
2. `doLoad()`-> 即使这个video tag之后要被rename ID，但是在浏览器看了它还是有同一个唯一的objectID，这个ID不会改变，所以，我们就拿之前的ID就可以了。
3. 控制条覆盖问题。设置css z-index。
4. 控制条FadeIn, FadeOut无效问题，修改video.js，增加canvas#display的两个EventListener
5. 全屏进入和全屏退出问题，同样修改video.js，增加对应的video.anaglyph.js的两个方法`enterFullScreen()`和 `exitFullScreen()`。
6. 全屏放大问题，使用canvas的`scale()`方法。同样的API已经被加入HTML5-Anaglyph-Image。使用`scale()`的流程，需要一个tmpcvs来存储scale前的imagedata，然后对于显示canvas#display设置scaleRate，然后再使用`translate()`对上下左右预留黑边，注意到，黑边预留大小要除scaleRate。
7. 全屏的seek问题。本质上就是seek问题，每次seek其实都触发了play事件，全屏seek时候会调用`prepareSizeLoc()`，改函数没有考虑全屏的样式。`this.width`和`this.height`不再是clientWidth和clientHeight，这个是视频显示大小，我们对`this.width`和`this.height`进行了封装在保证onLoad的时候不为空同时，在正常的时候对于视频实际大小。
8. 修复视频外框不能任意大小的时候，沿用了全屏时候的操作，继续scale。
9. 修复`<video>`放在不同位置的全屏会错位的bug时，考虑了`<video>`初始的位置和滚动条的位置。
