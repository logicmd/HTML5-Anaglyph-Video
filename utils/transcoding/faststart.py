import os
import sys

if len(sys.argv) > 2:  
    print 'Usage: faststart <input>'

#mp4_path = "../super/"
#exe_path = "qt-"

filename = sys.argv[1]
filename_origin = filename[:-4] + "_o" + filename[-4:]
#print sys.argv[0]
print filename
print filename_origin
os.rename(filename, filename_origin)
os.system( 'qt-faststart' + filename_origin + ' ' + filename )