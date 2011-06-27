#!/bin/bash
# build as per ${EMSCRIPTEN}/tests/python/readme.txt

PYTHON_SRC=${HOME}/downloads/Python-2.7.1.tar.bz2
PYTHON_BIN=${HOME}/pkg/bin/python2.7
LLVM=${HOME}/downloads/llvm-2.9/cbuild/Release/bin
LLVM_GCC=${HOME}/downloads/llvm-gcc-4.2-2.9.source/cbuild/install/bin
EMSCRIPTEN=${HOME}/reposs/emscripten
CLOSURE_JAR=${HOME}/reposs/closure-compiler/build/compiler.jar

DEPENDS="Python-2.7.1.tar.bz2 environment.js app.js externs.js"

# check we have all the dependencies before starting
for dep in ${DEPENDS}; do
  if [ ! -r ${dep} ]; then
    echo "Dependency '${dep}' not found!" >&2
    exit 1
  fi
done

# extract Python
rm -rf Python-2.7.1
tar jxf ${PYTHON_SRC}
cd Python-2.7.1
mkdir -p bin/pylibs
cd bin

# setup ccproxy
cp ${EMSCRIPTEN}/tests/python/ccproxy.py .
chmod +x ccproxy.py
sed -i "s@\.\.LLVM_GCC_DIR\.\.@${LLVM_GCC}@; s@\.\.LLVM_DIR\.\.@${LLVM}@" ccproxy.py

# configure
CC=./ccproxy.py ../configure --without-threads --without-pymalloc
sed -i 's@HAVE_GCC_ASM_FOR_X87@PY_NO_SHORT_FLOAT_REPR@' pyconfig.h
sed -i -r 's@(^#define\s+HAVE_SIG.*)@// \1@; s@^// (#define\s+HAVE_SIGNAL_H\s)@\1@' pyconfig.h

# add the static modules we're after
cat > Modules/Setup.local <<EOF
operator operator.c	              # operator.add() and similar goodies
_random _randommodule.c	          # Random number generator
_collections _collectionsmodule.c # Container types
itertools itertoolsmodule.c	      # Functions creating iterators for efficient looping 
strop stropmodule.c		            # String manipulations
_functools _functoolsmodule.c	    # Tools for working with functions and callable objects
math mathmodule.c _math.c         # -lm # math library functions, e.g. sin()
EOF

# work out the frozen modules
mkdir _frozen
cd _frozen
cat > code.py <<EOF
import ast
import collections
import cStringIO
import functools
import itertools
import random
import re
import StringIO
EOF
${PYTHON_BIN} -S ../../Tools/freeze/freeze.py -X BaseHTTPServer -X FixTk -X SocketServer -X bdb -X ctypes -X difflib -X dis -X doctest -X dummy_thread -X dummy_threading -X email -X ftplib -X getopt -X getpass -X gettext -X httplib -X linecache -X locale -X logging -X mimetools -X mimetypes -X ntpath -X nturl2path -X optcode -X optparse -X os -X os2emxpath -X ptb -X pkgutil -X encodings -X posixpath -X pydoc -X quopri -X rfc822 -X site -X socket -X ssl -X struct -X subprocess -X sysconfig -X tempfile -X threading -X tty -X unittest -X webbrowser code.py
sed '/__main__/d' frozen.c | awk '(!end){ print $0; } ($0 == "};"){ end=1; }' > ../../Python/frozen.c
cat >> ../../Python/frozen.c <<EOF
// tell the interpreter we're running in embedded mode
extern int Py_FrozenFlag;
Py_FrozenFlag = 1;
EOF
rm frozen.c config.c M___main__.c
cat M_*.c >> ../../Python/frozen.c
cd ..
rm -rf _frozen 

# make until failure
make

# manually link and disassemble
cd pylibs
ar x ../libpython2.7.a
cp ../Modules/python.o .
${LLVM}/llvm-link -o=python.bc *.o
${LLVM}/llvm-dis -show-annotations python.bc

# return
cd ../../..

# run byte code through emscripten
time ${EMSCRIPTEN}/emscripten.py Python-2.7.1/bin/pylibs/python.ll > python2.7.1.js

# run the produced JS through closure
time java -Xmx2g -jar ${CLOSURE_JAR} \
  --compilation_level ADVANCED_OPTIMIZATIONS \
  --js_output_file python2.7.1.closure.js \
  --variable_map_output_file closure.vars \
  --externs externs.js \
  --js python2.7.1.js --js environment.js --js app.js 2> closure.log

