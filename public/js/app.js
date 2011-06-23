var editor;

window.pageLoaded = function() {
  doRun(); // do our initial checks
  var runButton = document.getElementById("run");
  runButton.addEventListener("click", function(){
    execute(editor.getSession().getValue());
  });
  
  // editor
  var Mode = require("ace/mode/python").Mode;
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/gumby");
  editor.setShowPrintMargin(false);
  editor.getSession().setMode(new Mode());
  editor.getSession().setValue("import sys\n\nprint 'Hello world! This is Python {} on {}'.format(sys.version, sys.platform)\n\nprint 'Here are some numbers:', [2*x for x in range(5)][:4]");
};


function execute(text) {
  print.lines = [];
  var isTB = false, tbLine = -1;

  var li = document.createElement('li'), good = true;
  window.STDIO.prepare('yourcode.py', window.Module.intArrayFromString(editor.getSession().getValue(), true));
  window.Module.run(['-S', '-B', 'yourcode.py']);
///  var ptr = window.Module.Pointer_make(window.Module.intArrayFromString(text), 0, 2, 'i8'); // leak!
  try {
///    window.Module._PyRun_SimpleStringFlags(ptr, 0);
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
      var linesHTML = '', line, value, match;
      for (var i = 0; i < print.lines.length; i++) {
        line = print.lines[i];
        value = line.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        if (value.match(/^Traceback \(most recent call last\):$/) || value.match(/^\s+File /)) {
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
          if (line.klass)
            linesHTML += '<span class="' + line.klass + '">' + value + '</span>';
          else {
            linesHTML += value;
          }
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
    editor.gotoLine(tbLine);
    var aceCells = document.getElementById('editor').getElementsByClassName('ace_gutter-cell');
    aceCells[tbLine - 1].className += ' error';
    aceCells = document.getElementById('editor').getElementsByClassName('ace_line');
    aceCells[tbLine - 1].className += ' error';
  }
}


function doRun() {
}
