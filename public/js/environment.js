
var EPERM = 1; /* Operation not permitted */
var ENOENT = 2; /* No such file or directory */
var ESRCH = 3; /* No such process */
var EINTR = 4; /* Interrupted system call */
var EIO = 5; /* I/O error */
var ENXIO = 6; /* No such device or address */
var E2BIG = 7; /* Argument list too long */
var ENOEXEC = 8; /* Exec format error */
var EBADF = 9; /* Bad file number */
var ECHILD = 10; /* No child processes */
var EAGAIN = 11; /* Try again */
var ENOMEM = 12; /* Out of memory */
var EACCES = 13; /* Permission denied */
var EFAULT = 14; /* Bad address */
var ENOTBLK = 15; /* Block device required */
var EBUSY = 16; /* Device or resource busy */
var EEXIST = 17; /* File exists */
var EXDEV = 18; /* Cross-device link */
var ENODEV = 19; /* No such device */
var ENOTDIR = 20; /* Not a directory */
var EISDIR = 21; /* Is a directory */
var EINVAL = 22; /* Invalid argument */
var ENFILE = 23; /* File table overflow */
var EMFILE = 24; /* Too many open files */
var ENOTTY = 25; /* Not a typewriter */
var ETXTBSY = 26; /* Text file busy */
var EFBIG = 27; /* File too large */
var ENOSPC = 28; /* No space left on device */
var ESPIPE = 29; /* Illegal seek */
var EROFS = 30; /* Read-only file system */
var EMLINK = 31; /* Too many links */
var EPIPE = 32; /* Broken pipe */
var EDOM = 33; /* Math argument out of domain of func */
var ERANGE = 34; /* Math result not representable */

var _sys_errlist = [];
_sys_errlist[EPERM] = Module.Pointer_make(Module.intArrayFromString("Operation not permitted"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOENT] = Module.Pointer_make(Module.intArrayFromString("No such file or directory"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ESRCH] = Module.Pointer_make(Module.intArrayFromString("No such process"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EINTR] = Module.Pointer_make(Module.intArrayFromString("Interrupted system call"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EIO] = Module.Pointer_make(Module.intArrayFromString("I/O error"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENXIO] = Module.Pointer_make(Module.intArrayFromString("No such device or address"), 0, ALLOC_STATIC, "i8");
_sys_errlist[E2BIG] = Module.Pointer_make(Module.intArrayFromString("Argument list too long"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOEXEC] = Module.Pointer_make(Module.intArrayFromString("Exec format error"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EBADF] = Module.Pointer_make(Module.intArrayFromString("Bad file number"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ECHILD] = Module.Pointer_make(Module.intArrayFromString("No child processes"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EAGAIN] = Module.Pointer_make(Module.intArrayFromString("Try again"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOMEM] = Module.Pointer_make(Module.intArrayFromString("Out of memory"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EACCES] = Module.Pointer_make(Module.intArrayFromString("Permission denied"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EFAULT] = Module.Pointer_make(Module.intArrayFromString("Bad address"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOTBLK] = Module.Pointer_make(Module.intArrayFromString("Block device required"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EBUSY] = Module.Pointer_make(Module.intArrayFromString("Device or resource busy"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EEXIST] = Module.Pointer_make(Module.intArrayFromString("File exists"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EXDEV] = Module.Pointer_make(Module.intArrayFromString("Cross-device link"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENODEV] = Module.Pointer_make(Module.intArrayFromString("No such device"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOTDIR] = Module.Pointer_make(Module.intArrayFromString("Not a directory"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EISDIR] = Module.Pointer_make(Module.intArrayFromString("Is a directory"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EINVAL] = Module.Pointer_make(Module.intArrayFromString("Invalid argument"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENFILE] = Module.Pointer_make(Module.intArrayFromString("File table overflow"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EMFILE] = Module.Pointer_make(Module.intArrayFromString("Too many open files"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOTTY] = Module.Pointer_make(Module.intArrayFromString("Not a typewriter"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ETXTBSY] = Module.Pointer_make(Module.intArrayFromString("Text file busy"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EFBIG] = Module.Pointer_make(Module.intArrayFromString("File too large"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOSPC] = Module.Pointer_make(Module.intArrayFromString("No space left on device"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ESPIPE] = Module.Pointer_make(Module.intArrayFromString("Illegal seek"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EROFS] = Module.Pointer_make(Module.intArrayFromString("Read-only file system"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EMLINK] = Module.Pointer_make(Module.intArrayFromString("Too many links"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EPIPE] = Module.Pointer_make(Module.intArrayFromString("Broken pipe"), 0, ALLOC_STATIC, "i8");
_sys_errlist[EDOM] = Module.Pointer_make(Module.intArrayFromString("Math argument out of domain of func"), 0, ALLOC_STATIC, "i8");
_sys_errlist[ERANGE] = Module.Pointer_make(Module.intArrayFromString("Math result not representable"), 0, ALLOC_STATIC, "i8");


STDIO.read = function(stream, ptr, size) {
  var info = STDIO.streams[stream];
  if (!info)
    return -1;
  if (info.interactiveInput) {
    for (var i = 0; i < size; i++) {
      if (info.data.length === 0) {
        var items = print.items;
        var rawData = Module.stdin(items.length > 0 ? items[items.length - 1].value: '?');
        __print__(null); // flush
        print(rawData, 'input');
        __print__(null); // flush
        info.data = intArrayFromString(rawData).map(function(x) { return x === 0 ? 10 : x }); // change 0 to newline
        if (info.data.length === 0)
          return i;
      }
      HEAP[ptr]=info.data.shift();
      ptr++;
    }
    return size;
  }
  for (var i = 0; i < size; i++) {
    if (info.position >= info.data.length) {
      info.eof = 1;
      return 0; // EOF
    }
    HEAP[ptr]=info.data[info.position];
    info.position++;
    ptr++;
  }
  return size;
}


function print(text, klass) {
  if (!print.items)
    print.items = [];
  print.items.push({value: text, klass: klass});
}


function __print__(text) {
  if (text === null) { // flush
    return;
  }
  print(text);
}


read = function read(url) {
  HEAP[___errno_location()] = ENOENT;
  throw 'read(url) is not implemented';
};


_getuid = function _getuid() { 
  return 100; 
};


_getgid = function _getgid() { 
  return 100; 
};


var __ourstat = function __ourstat(ptr, f) {
  _memset(ptr, 0, $struct_stat___SIZE);
  HEAP[ptr + 16] = 0100000;       // st_mode = S_IFREG 
  HEAP[ptr + 24] = _getuid();     // st_uid = getuid()
  HEAP[ptr + 28] = _getgid();     // st_uid = getgid()
  HEAP[ptr + 44] = f.data.length; // st_size = stream.data.length
  return 0;
};


___01stat64_ = function ___01stat64(path, ptr) {
  var pathStr = Pointer_stringify(path);
  var fd = STDIO.filenames[pathStr];
  if (fd === undefined) {
    HEAP[___errno_location()] = ENOENT;
    return -1;
  }
  return __ourstat(ptr, STDIO.streams[fd]);
};


___01fstat64_ = function ___01fstat64(fd, ptr) {
  var f = STDIO.streams[fd];
  if (f === undefined) {
    HEAP[___errno_location()] = ENOENT;
    return -1;
  }
  return __ourstat(ptr, f);
};


var _realpath = function _realpath (path, resolved_path) {
  return _strcpy(resolved_path, path);
};


var _strerror = function _strerror(errnum) {
  return _sys_errlist[errnum];
};


var _unlink = function _unlink(pathname) {
  var pathStr = Pointer_stringify(pathname);
  var fd = STDIO.filenames[pathStr];
  if (fd === undefined) {
    HEAP[___errno_location()] = ENOENT;
    return -1;
  }
  delete STDIO.filenames[pathStr];
  return 0;
};


var ___01open64_ = function ___01open64_(pathname, flags, mode) {
  var pathStr = Pointer_stringify(pathname);
  var fd = STDIO.filenames[pathStr];
  if (fd === undefined)
    fd = STDIO.prepare(pathStr);
  return fd;
};


var _fdopen = function _fdopen(fd, mode) {
  return fd;
};


var ___01lseeko64_ = function ___01lseeko64_(fd, offset, whence) {
  return ___01fseeko64_(fd, offset, whence);
};

var ___01lseek64_ = function ___01lseek64(fd, offset, whence) {
  return ___01fseeko64_(fd, offset, whence);
};


_ungetc = function _ungetc(chr, stream) {
  var f = STDIO.streams[stream];
  if (f === undefined)
    return -1; // EOF
  if (!f.interactiveInput)
    f.position--;
  return chr;
}


var __IO_putc = function(c, stream) {
  if (!Module._putc_ptr) 
    Module._putc_ptr = _malloc(1);
  HEAP[Module._putc_ptr] = c;
  var ret = STDIO.write(stream, Module._putc_ptr, 1);
  if (ret == -1)
    return -1; // EOF
  return c;
}

