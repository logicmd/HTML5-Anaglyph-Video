import re

build = '../build/video.anaglyph.js'
vars = 'obfuscate/variable.txt'
out = 'out.js'
counter = 0;

file = open( build, 'r' );
varF = open( vars, 'r');
content = file.read();
file.close();

for variable_orginal in varF.readlines():
   variable_obsfucated = "this.ob" + str(counter);
   content = content.replace(variable_orginal, variable_obsfucated);
   pos = content.find(variable_obsfucated)
   counter+=1;
 
varF.close()

outF = open( out, 'w' )
outF.write(content)
outF.close()
