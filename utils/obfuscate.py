import re

build = '../build/video.anaglyph.js'
vars = 'obfuscate/variable.txt'
out = 'out.js'

file = open( build, 'r' )
varf = open( vars, 'r')

content = file.read();

counter = 0;

for line in varf.readlines():
    
    thisPattern = re.compile(line)
    
    obsfucated = "this.obs" + str(++counter) ;
    
    info = []
    for i in content:
        c = re.sub(thisPattern,obsfucated,i)
        info.append(c)

c = ''.join(info)
file.close()



file = open( out, 'w' )
content = file.write(c);
file.close()
