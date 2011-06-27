
/** @const */ var EPERM = 1; /* Operation not permitted */
/** @const */ var ENOENT = 2; /* No such file or directory */
/** @const */ var ESRCH = 3; /* No such process */
/** @const */ var EINTR = 4; /* Interrupted system call */
/** @const */ var EIO = 5; /* I/O error */
/** @const */ var ENXIO = 6; /* No such device or address */
/** @const */ var E2BIG = 7; /* Argument list too long */
/** @const */ var ENOEXEC = 8; /* Exec format error */
/** @const */ var EBADF = 9; /* Bad file number */
/** @const */ var ECHILD = 10; /* No child processes */
/** @const */ var EAGAIN = 11; /* Try again */
/** @const */ var ENOMEM = 12; /* Out of memory */
/** @const */ var EACCES = 13; /* Permission denied */
/** @const */ var EFAULT = 14; /* Bad address */
/** @const */ var ENOTBLK = 15; /* Block device required */
/** @const */ var EBUSY = 16; /* Device or resource busy */
/** @const */ var EEXIST = 17; /* File exists */
/** @const */ var EXDEV = 18; /* Cross-device link */
/** @const */ var ENODEV = 19; /* No such device */
/** @const */ var ENOTDIR = 20; /* Not a directory */
/** @const */ var EISDIR = 21; /* Is a directory */
/** @const */ var EINVAL = 22; /* Invalid argument */
/** @const */ var ENFILE = 23; /* File table overflow */
/** @const */ var EMFILE = 24; /* Too many open files */
/** @const */ var ENOTTY = 25; /* Not a typewriter */
/** @const */ var ETXTBSY = 26; /* Text file busy */
/** @const */ var EFBIG = 27; /* File too large */
/** @const */ var ENOSPC = 28; /* No space left on device */
/** @const */ var ESPIPE = 29; /* Illegal seek */
/** @const */ var EROFS = 30; /* Read-only file system */
/** @const */ var EMLINK = 31; /* Too many links */
/** @const */ var EPIPE = 32; /* Broken pipe */
/** @const */ var EDOM = 33; /* Math argument out of domain of func */
/** @const */ var ERANGE = 34; /* Math result not representable */

var _sys_errlist = [];
_sys_errlist[EPERM] = Module.Pointer_make([79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 110, 111, 116, 32, 112, 101, 114, 109, 105, 116, 116, 101, 100] /* Operation not permitted */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOENT] = Module.Pointer_make([78, 111, 32, 115, 117, 99, 104, 32, 102, 105, 108, 101, 32, 111, 114, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121] /* No such file or directory */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ESRCH] = Module.Pointer_make([78, 111, 32, 115, 117, 99, 104, 32, 112, 114, 111, 99, 101, 115, 115] /* No such process */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EINTR] = Module.Pointer_make([73, 110, 116, 101, 114, 114, 117, 112, 116, 101, 100, 32, 115, 121, 115, 116, 101, 109, 32, 99, 97, 108, 108] /* Interrupted system call */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EIO] = Module.Pointer_make([73, 47, 79, 32, 101, 114, 114, 111, 114] /* I/O error */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENXIO] = Module.Pointer_make([78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101, 32, 111, 114, 32, 97, 100, 100, 114, 101, 115, 115] /* No such device or address */, 0, ALLOC_STATIC, "i8");
_sys_errlist[E2BIG] = Module.Pointer_make([65, 114, 103, 117, 109, 101, 110, 116, 32, 108, 105, 115, 116, 32, 116, 111, 111, 32, 108, 111, 110, 103] /* Argument list too long */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOEXEC] = Module.Pointer_make([69, 120, 101, 99, 32, 102, 111, 114, 109, 97, 116, 32, 101, 114, 114, 111, 114] /* Exec format error */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EBADF] = Module.Pointer_make([66, 97, 100, 32, 102, 105, 108, 101, 32, 110, 117, 109, 98, 101, 114] /* Bad file number */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ECHILD] = Module.Pointer_make([78, 111, 32, 99, 104, 105, 108, 100, 32, 112, 114, 111, 99, 101, 115, 115, 101, 115] /* No child processes */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EAGAIN] = Module.Pointer_make([84, 114, 121, 32, 97, 103, 97, 105, 110] /* Try again */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOMEM] = Module.Pointer_make([79, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121] /* Out of memory */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EACCES] = Module.Pointer_make([80, 101, 114, 109, 105, 115, 115, 105, 111, 110, 32, 100, 101, 110, 105, 101, 100] /* Permission denied */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EFAULT] = Module.Pointer_make([66, 97, 100, 32, 97, 100, 100, 114, 101, 115, 115] /* Bad address */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOTBLK] = Module.Pointer_make([66, 108, 111, 99, 107, 32, 100, 101, 118, 105, 99, 101, 32, 114, 101, 113, 117, 105, 114, 101, 100] /* Block device required */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EBUSY] = Module.Pointer_make([68, 101, 118, 105, 99, 101, 32, 111, 114, 32, 114, 101, 115, 111, 117, 114, 99, 101, 32, 98, 117, 115, 121] /* Device or resource busy */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EEXIST] = Module.Pointer_make([70, 105, 108, 101, 32, 101, 120, 105, 115, 116, 115] /* File exists */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EXDEV] = Module.Pointer_make([67, 114, 111, 115, 115, 45, 100, 101, 118, 105, 99, 101, 32, 108, 105, 110, 107] /* Cross-device link */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENODEV] = Module.Pointer_make([78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99, 101] /* No such device */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOTDIR] = Module.Pointer_make([78, 111, 116, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121] /* Not a directory */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EISDIR] = Module.Pointer_make([73, 115, 32, 97, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121] /* Is a directory */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EINVAL] = Module.Pointer_make([73, 110, 118, 97, 108, 105, 100, 32, 97, 114, 103, 117, 109, 101, 110, 116] /* Invalid argument */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENFILE] = Module.Pointer_make([70, 105, 108, 101, 32, 116, 97, 98, 108, 101, 32, 111, 118, 101, 114, 102, 108, 111, 119] /* File table overflow */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EMFILE] = Module.Pointer_make([84, 111, 111, 32, 109, 97, 110, 121, 32, 111, 112, 101, 110, 32, 102, 105, 108, 101, 115] /* Too many open files */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOTTY] = Module.Pointer_make([78, 111, 116, 32, 97, 32, 116, 121, 112, 101, 119, 114, 105, 116, 101, 114] /* Not a typewriter */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ETXTBSY] = Module.Pointer_make([84, 101, 120, 116, 32, 102, 105, 108, 101, 32, 98, 117, 115, 121] /* Text file busy */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EFBIG] = Module.Pointer_make([70, 105, 108, 101, 32, 116, 111, 111, 32, 108, 97, 114, 103, 101] /* File too large */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ENOSPC] = Module.Pointer_make([78, 111, 32, 115, 112, 97, 99, 101, 32, 108, 101, 102, 116, 32, 111, 110, 32, 100, 101, 118, 105, 99, 101] /* No space left on device */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ESPIPE] = Module.Pointer_make([73, 108, 108, 101, 103, 97, 108, 32, 115, 101, 101, 107] /* Illegal seek */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EROFS] = Module.Pointer_make([82, 101, 97, 100, 45, 111, 110, 108, 121, 32, 102, 105, 108, 101, 32, 115, 121, 115, 116, 101, 109] /* Read-only file system */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EMLINK] = Module.Pointer_make([84, 111, 111, 32, 109, 97, 110, 121, 32, 108, 105, 110, 107, 115] /* Too many links */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EPIPE] = Module.Pointer_make([66, 114, 111, 107, 101, 110, 32, 112, 105, 112, 101] /* Broken pipe */, 0, ALLOC_STATIC, "i8");
_sys_errlist[EDOM] = Module.Pointer_make([77, 97, 116, 104, 32, 97, 114, 103, 117, 109, 101, 110, 116, 32, 111, 117, 116, 32, 111, 102, 32, 100, 111, 109, 97, 105, 110, 32, 111, 102, 32, 102, 117, 110, 99] /* Math argument out of domain of func */, 0, ALLOC_STATIC, "i8");
_sys_errlist[ERANGE] = Module.Pointer_make([77, 97, 116, 104, 32, 114, 101, 115, 117, 108, 116, 32, 110, 111, 116, 32, 114, 101, 112, 114, 101, 115, 101, 110, 116, 97, 98, 108, 101] /* Math result not representable */, 0, ALLOC_STATIC, "i8");


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


var __ourstat = function __ourstat(ptr, f) {
  _memset(ptr, 0, $struct_stat___SIZE);
  HEAP[ptr + 16] = 0x8000;        // st_mode = S_IFREG (0100000)
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

