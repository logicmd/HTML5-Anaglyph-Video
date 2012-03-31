## build video anaglyph js
import os
from obfuscate import obfuscate

def buildit(sourcePath, buildPath, licensePath):
    os.system( 'java -jar compiler/compiler.jar --language_in=ECMASCRIPT5 --js ' + sourcePath + ' --js_output_file ' + buildPath )

    buildFile = open( buildPath, 'r' )
    contents = buildFile.read();
    buildFile.close()

    licenseFile = open( licensePath, 'r' )
    license_contents = licenseFile.read();
    licenseFile.close()

    buildFile = open( buildPath, 'w' )
    buildFile.write( license_contents + contents )
    buildFile.close()

## here comes
obfuscate()

#build anaglyph js
source = 'middle.js'
build = '../build/video.anaglyph.js'
license = '../src/LICENSE'

buildit(source, build, license)

## build video js
source2 = 'middle2.js'
build = '../build/video.patched.js'
license = '../src/LICENSE-VideoJS'

buildit(source2, build, license)


os.remove(source)
os.remove(source2)

