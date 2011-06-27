var editor;

function getEditor() {
  if (!getEditor.editor)
    getEditor.editor = ace.edit("editor");
  return getEditor.editor;
}
window['getEditor'] = getEditor;


var loadPython = function loadPython() {
  var xhr = new XMLHttpRequest();
///  xhr.onprogress = function(pe) {
///    console.log("progress", pe.lengthComputable, pe.total, pe.loaded);
///  };
  xhr.addEventListener("loadstart", function(pe) { console.log("onloadstart"); });
  xhr.addEventListener("loadend", function(pe) { console.log("onloadend"); });
  xhr.addEventListener("error", function(pe) { console.log("onerror"); });
  xhr.addEventListener("abort", function(pe) { console.log("onabort"); });
  xhr.addEventListener("load", function(pe) { console.log("onload"); });
  xhr.addEventListener("progress", function(pe) { console.log("onprogress"); });
  xhr.addEventListener("readystatechange", function(e) {
    console.log("readystatechange", xhr.readyState);
    if (xhr.readyState == 4) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.innerText = xhr.responseText;
      document.head.appendChild(s);
    }
  });
  console.log(xhr);
  xhr.open("GET", "/js/mylibs/python2.7.1.closure.js");
  xhr.send();
};
window['loadPython'] = loadPython;


var pageLoaded = function pageLoaded() {
  loadPython();
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

