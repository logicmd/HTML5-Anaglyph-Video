HTML5-Anaglyph-Video
====================
The repo focus on HTML5 anaglyph video plugin of video-js.

__NOTICE: It can only be used in Chrome on Windows and Safari on Mac. For more info check out Known issues part.__

## Setup

- add the following in `<footer>` of your html.

    <script src="video.patched.js"></script>
    <script src="video.anaglyph.js"></script>
    window.onload = processor.doLoad( 'StereoDU', 'OptimizedAnaglyph', 'RedCyan', 480, 360, videoDivVar.width, videoDivVar.height);


## Usage

    processor.doLoad(_srcType, _stereoMode, _glassType, _videoWidth, _videoHeight, _displayWidth, _displayHeight);

-  __imgSrc__: url of video source.
-  __stereoType__: Stereo type of the source image
  * "Flat"
  * "Anaglyph"
  * "StereoLR"
  * "StereoRL"
  * "StereoUD"
  * "StereoDU"

-  __anaglyphMode__: Anaglyph Mode of the procedure
  * "TrueAnaglyph"
  * "GrayAnaglyph"
  * "ColorAnaglyph"
  * "OptimizedAnaglyph"

-  __glassType__: Anaglyph Mode of the procedure
  * "RedCyan"
  * "GreenMagenta"

-  __videoWidth__ / __videoHeight__: width and height of original video.

- __displayWidth__ / __displayHeight__: width and height of display canvas.

## Known issues
1. Compatibilty issue in IE/Firefox/iOS Safari
2. Unexpected displpay issue when Exit full screen on Escape key
3. Different video url issue in HTML and flash

e.g. using html5

    <video id="videoDiv" class="video-js vjs-default-skin" controls preload="none" width="480" height="360"
      data-setup="{}">
      <source src="video/1.mp4" type='video/mp4'> </source>
    </video>

while using flash

    <video id="videoDiv" class="video-js vjs-default-skin" controls preload="none" width="480" height="360"
      data-setup="{}">
      <source src="../video/4.flv" type='video/flv'> </source>
    </video>

__This will not happen when js scripts and video files in the same directory.__

## Roadmap
* fix all issues.
* rewrite the code to be javascript style.