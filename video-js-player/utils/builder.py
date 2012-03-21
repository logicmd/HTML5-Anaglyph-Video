## build video anaglyph js
import os

source = '../video.anaglyph.js'
build = '../video.anaglyph.min.js'
header = '// https://bitbucket.org/logicmd/html5-anaglyph-video\n'
license = '../LICENSE'

os.system( 'java -jar compiler/compiler.jar --language_in=ECMASCRIPT5 --js ' + source + ' --js_output_file ' + build )

file = open( build, 'r' )
contents = file.read();
file.close()

file = open( license, 'r' )
license_contents = file.read();
file.close()

file = open( build, 'w' )
file.write( license_contents + header + contents )
file.close()

## build video js
source = '../video.patched.js'
build = '../video.patched.min.js'
license = '../LICENSE-VideoJS'

os.system( 'java -jar compiler/compiler.jar --language_in=ECMASCRIPT5 --js ' + source + ' --js_output_file ' + build )

file = open( build, 'r' )
contents = file.read();
file.close()

file = open( license, 'r' )
license_contents = file.read();
file.close()

file = open( build, 'w' )
file.write( license_contents + contents )
file.close()
