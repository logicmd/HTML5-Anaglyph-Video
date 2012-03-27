 # coding=utf-8
import re

build = '../build/video.anaglyph.js'
vars = 'obfuscate/variable.txt'
out = 'out.js'
counter = 65 # ascii for 'A'

file = open( build, 'r' )
varF = open( vars, 'r')
content = file.read()
file.close()


#for line in varF:
#    line = line.strip()
#    print line
#    if line=="this.video":
#        print "true"

for i in varF:
   ## strip rstrip lstrip
   variable_original = i.strip()
   variable_obsfucated = "this." + chr(counter)
   content = content.replace(variable_original, variable_obsfucated)
   pos = content.find(variable_obsfucated)
   print pos
   if pos == -1:
       print variable_original
       ## 目前this.bufCtx的this.buf会被先替换掉。。。
   counter+=1
 
varF.close()

outF = open( out, 'w' )
outF.write(content)
outF.close()
