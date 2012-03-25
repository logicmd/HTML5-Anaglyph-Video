## build video anaglyph js
import os

source = '../src/video.anaglyph.js'
build = '../build/video.anaglyph.js'
license = '../src/LICENSE'

os.system( 'java -jar compiler/compiler.jar --language_in=ECMASCRIPT5 --js ' + source + ' --js_output_file ' + build )

buildFile = open( build, 'r' )
contents = buildFile.read();
buildFile.close()

licenseFile = open( license, 'r' )
license_contents = licenseFile.read();
licenseFile.close()

buildFile = open( build, 'w' )
buildFile.write( license_contents + contents )
buildFile.close()

## build video js
source = '../src/video.patched.js'
build = '../build/video.patched.js'
license = '../src/LICENSE-VideoJS'

os.system( 'java -jar compiler/compiler.jar --language_in=ECMASCRIPT5 --js ' + source + ' --js_output_file ' + build )

buildFile = open( build, 'r' )
contents = buildFile.read();
buildFile.close()

licenseFile = open( license, 'r' )
license_contents = licenseFile.read();
licenseFile.close()

buildFile = open( build, 'w' )
buildFile.write( license_contents + contents )
buildFile.close()

## more obfuscate
buildFile = open( build, 'r' )
contents = buildFile.read();
buildFile.close()

