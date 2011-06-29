function execute() {
  print.items = [];
  var isTB = false, tbLine = -1;

  var li = document.createElement('li');
  var good = true;

  var data = intArrayFromString(getEditor().getSession().getValue(), true)
  var fd = STDIO.filenames['yourcode.py'];
  if (fd) {
    var f = STDIO.streams[fd];
    f.data = data;
    f.position = 0;
    f.eof = 0;
    f.error = 0;
  }
  else
    STDIO.prepare('yourcode.py', data);
  
  run(['-S', '-B', 'yourcode.py']);
///  var ptr = Pointer_make(window.Module.intArrayFromString(text), 0, 2, 'i8'); // leak!
  try {
///    _PyRun_SimpleStringFlags(ptr, 0);
  }
  catch(e) {
    if (e === 'halting, since this is the first run') 
      return;
    li.innerHTML = 'JS crash: |<b>' + e + '</b>|. Please let us know about this problem!';
    li.className = 'jsdeath';
    good = false;
  }
  
  if (good) {
    if (true) { // if (printed)
      var linesHTML = '', item, value, match;
      for (var i = 0; i < print.items.length; i++) {
        item = print.items[i];
        value = item.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        if (value.match(/^Traceback \(most recent call last\):/) || value.match(/^\s+File /)) {
          if (!isTB) {
            isTB = true;
            linesHTML += '<span class="traceback">';
          }
          match = value.match(/\s+File "[^"]+", line (\d+)/);
          if (match)
            tbLine = match[1];
          linesHTML += value;
        }
        else if (isTB) {
          linesHTML += value;
          match = value.match(/\s+File "[^"]+", line (\d+)/);
          if (match)
            tbLine = match[1];
          if (value.match(/^[_A-Za-z][_a-zA-Z0-9]*: /)) {
            isTB = false;
            linesHTML += '</span>';
          }
        }
        else {
          if (item.klass)
            linesHTML += '<span class="' + item.klass + '">' + value + '</span>';
          else
            linesHTML += value;
        }

      }
      li.innerHTML = linesHTML;
    } 
    else {
      li.innerHTML = ''; //<small><i>(no output)</i></small>';
    }
  }

  var output = document.getElementById('output');
  if (output.hasChildNodes())
    output.insertBefore(li, output.firstChild);
  else
    output.appendChild(li);

  // if traceback, try and jump to the appropriate line of death
  if (isTB && tbLine != "-1") {
    tbLine = parseInt(tbLine);
    getEditor().gotoLine(tbLine);
    var aceCells = document.getElementById('editor').getElementsByClassName('ace_gutter-cell');
    aceCells[tbLine - 1].className += ' error';
    aceCells = document.getElementById('editor').getElementsByClassName('ace_line');
    aceCells[tbLine - 1].className += ' error';
  }
}
window['execute'] = execute;


