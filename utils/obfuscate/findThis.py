import re

source = '../src/video.anaglyph.js'
build = '../build/video.anaglyph.js'

srcFile = open( source, 'r' )
src = srcFile.read();
srcFile.close()

thisPattern = re.compile("this\.[A-Za-z]+")
thisArray = thisPattern.findall(src)

m = ["#this expression"]
for i in thisArray:
    if i not in m:
        m.append(i)

wordList=open('exp.txt',"w")
wordList.write("\n".join(m))
wordList.close()