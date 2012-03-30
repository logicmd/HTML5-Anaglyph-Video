#HTML5-Anaglyph-Video
The repo focus on HTML5 anaglyph video plugin of video-js. 

>####NOTICE#####
>
>It can only be used in Chrome on Windows and Safari on Mac. 
>
>For more info check out Known issues part.

## Setup

1. add `video.patched.js` and `video.anaglyph.js` in your head of html.
2. add the following in `<footer>`.

namely

    :::javascript
    window.onload = processor.doLoad('StereoDU','OptimizedAnaglyph','RedCyan',480, 360, videoDivVar.width, videoDivVar.height);


## Usage

    processor.doLoad(_srcType, _stereoMode, _glassType, _videoWidth, _videoHeight, _displayWidth, _displayHeight);

#### `imgSrc`: url of video source.
#### `stereoType`: Stereo type of the source image
  * `"Flat"`
  * `"Anaglyph"`
  * `"StereoLR"`
  * `"StereoRL"`
  * `"StereoUD"`
  * `"StereoDU"`

#### `anaglyphMode`: Anaglyph Mode of the procedure
  * `"TrueAnaglyph"` 
  * `"GrayAnaglyph"` 
  * `"ColorAnaglyph"` 
  * `"OptimizedAnaglyph"` 

#### `glassType`: Anaglyph Mode of the procedure
  * `"RedCyan"`
  * `"GreenMagenta"` 

#### `videoWidth` `videoHeight`: width and height of original video.

#### `displayWidth` `displayHeight`: width and height of display canvas.

## Known issues
1. Compatibilty issue in IE/Firefox/iOS Safari
2. Unexpected displpay issue when Exit full screen on Escape key 
3. Different video url issue in HTML and flash

#### e.g.
using html5

    <video id="videoDiv" class="video-js vjs-default-skin" controls preload="none" width="480" height="360"
      data-setup="{}">
      <source src="video/1.mp4" type='video/mp4'> </source> 
    </video>

while using flash

    <video id="videoDiv" class="video-js vjs-default-skin" controls preload="none" width="480" height="360"
      data-setup="{}">
      <source src="../video/4.flv" type='video/flv'> </source>
    </video>

> This will not happen when js scripts and video files in the same directory.

## Roadmap
* fix all issues.
* rewrite the code to be javascript style.