 # coding=utf-8
import re

src = '../src/video.anaglyph.js'
src2 = '../src/video.patched.js'
vars = 'obfuscate/variable.txt'
operations = 'obfuscate/operation.txt'
out = 'middle.js'
out2 = 'middle2.js'
counter = 65 # ascii for 'A'

file = open( src, 'r' )
varF = open( vars, 'r')
operF = open( operations, 'r' ) 
content = file.read()
content2 = open( src2, 'r' ).read()
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

counter = 65
print "here comes operation"

for i in operF:
   operation_original = i.strip()
   operation_obsfucated = "func" + chr(counter)
   content = content.replace(operation_original, operation_obsfucated)
   content2 = content2.replace(operation_original, operation_obsfucated)
   pos = content.find(operation_obsfucated)
   print pos
   if pos == -1:
       print operation_original
       ## 目前this.bufCtx的this.buf会被先替换掉。。。

   if content2.find(operation_obsfucated) == -1:
       print "fucked in patched.js" + operation_original
       
   counter+=1
   
 
varF.close()

outF = open( out, 'w' )
outF.write(content)
outF.close()

outF2 = open( out2, 'w' )
outF2.write(content2)
outF2.close()
