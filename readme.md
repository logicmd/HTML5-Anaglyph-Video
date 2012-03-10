#HTML5-Anaglyph-Video
The repo consists of three parts.

1. Demo [https://developer.mozilla.org/En/Manipulating_video_using_canvas]
2. HTML5 anaglyph video implemented by native player
3. HTML5 anaglyph video plugin of video-js


> The Documents is mainly for the third part.


## Setup

1. add `video.patched.js` and `video.anaglyph.js` in your head of html.
2. add the following in `<footer>`.

namely

    :::javascript
    window.onload = processor.doLoad('StereoDU','OptimizedAnaglyph');


## Usage

    processor.doLoad(_stereoType, _anaglyphMode);

#### `imgSrc`: url of source, **NOTICE**, the image must be loaded in the html.
#### `stereoType`: Stereo type of the source image
  * `"Flat"`
  * `"Anaglyph"`
  * `"StereoLR"`
  * `"StereoRL"`
  * `"StereoUD"`
  * `"StereoDU"`

#### `anaglyphMode`: Anaglyph Mode of the procedure
  * `"TrueAnaglyph"` `TODO`
  * `"GrayAnaglyph"` `TODO`
  * `"ColorAnaglyph"` `TODO`
  * `"OptimizedAnaglyph"` 

#### `glassType`: Anaglyph Mode of the procedure
  * `"RedCyan"`
  * `"GreenMagenta"` `TODO`

## Roadmap
1. rewrite the code to be javascript style.
2. add various `anaglyphMode` and `glassType`.
3. fix bugs that source video is not compressed at one direction.
4. fix bugs in different video url in HTML and flash.

#### e.g.
using html5

    <video id="videoDiv" class="video-js vjs-default-skin" controls preload="none" width="480" height="360"
      data-setup="{}">
      <source src="video/1.mp4" type='video/mp4'> </source> 
    </video>

while using flash

    <video id="videoDiv" class="video-js vjs-default-skin" controls preload="none" width="480" height="360"
      data-setup="{}">
      <source src="../video/4.flv" type='video/flv'> </source> </source> 
    </video>

> This will not happen when js scripts and video files in the same directory.