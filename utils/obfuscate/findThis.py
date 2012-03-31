import re

source = '../../src/video.anaglyph.js'

srcFile = open( source, 'r' )
src = srcFile.read();
srcFile.close()

thisPattern = re.compile("this\.[A-Za-z]+")
thisArray = thisPattern.findall(src)

thisDict = ["#this expression"]
for i in thisArray:
    if i not in thisDict:
        thisDict.append(i)

wordList=open('thisExp.txt',"w")
wordList.write("\n".join(thisDict))
wordList.close()