var editor;

function getEditor() {
  if (!getEditor.editor)
    getEditor.editor = ace.edit("editor");
  return getEditor.editor;
}
window['getEditor'] = getEditor;


var pageLoaded = function pageLoaded() {
  doRun(); // do our initial checks
  var runButton = document.getElementById("run");
  runButton.addEventListener("click", function(){
    execute();
  });
  
  // editor
  var Mode = require("ace/mode/python").Mode;
  editor = getEditor();
  editor.setTheme("ace/theme/gumby");
  editor.setShowPrintMargin(false);
  editor.getSession().setMode(new Mode());
  editor.getSession().setValue("import sys\n\nprint 'Hello world! This is Python {} on {}'.format(sys.version, sys.platform)\n\nprint 'Here are some numbers:', [2*x for x in range(5)][:4]");
};
window['pageLoaded'] = pageLoaded


function doRun() {
}

