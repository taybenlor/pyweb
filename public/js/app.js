var editor;

window.pageLoaded = function(){
  doRun(); //Do our initial checks
  var run_button = document.getElementById("run");
  run_button.addEventListener("click", function(){
    execute(editor.getSession().getValue());
  });
  
  /* Editor */
  var Mode = require("ace/mode/python").Mode;
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/gumby");
  editor.setShowPrintMargin(false);
  editor.getSession().setMode(new Mode());
  editor.getSession().setValue("import sys\n\nprint 'Hello world! This is Python {} on {}'.format(sys.version, sys.platform)\n\nprint 'Here are some numbers:', [2*x for x in range(5)][:4]");
};


// print function which the Python engine will call
var lines = [], printed = false;

function print(text) {
  lines.push(text);
  printed = true;
}


function execute(text) {
  lines = [];
  printed = false;

  var li = document.createElement('li'), good = true;
  var ptr = window.Module.Pointer_make(window.Module.intArrayFromString(text), 0, 2); // leak!
  try {
    window.Module._PyRun_SimpleStringFlags(ptr, 0);
  } 
  catch(e) {
    if (e === 'halting, since this is the first run') 
      return;
    li.innerHTML = 'JS crash: |<b>' + e + '</b>|. Please let us know about this problem!';
    li.className = 'death';
    good = false;
  }
  
  if (good) {
    if (printed) {
      var linesHTML = '', line;
      for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        linesHTML += (line == '') ? '\n' : line;
      }
      li.innerText = linesHTML;
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
}


function doRun() {
  args = ['-S', '-c', 'print ""'];
  try {
    window.Module.run(args);
  } 
  catch (e) {
    if (e !== 'halting, since this is the first run') 
      throw e;
  }
  execute("");
}
