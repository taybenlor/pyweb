var editor;

function getEditor() {
  if (!getEditor.editor)
    getEditor.editor = ace.edit("editor");
  return getEditor.editor;
}
window['getEditor'] = getEditor;


var loadPython = function loadPython() {
  var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.XctiveXObject("Microsoft.XMLHTTP");
  var doLoad = function() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerText = xhr.responseText;
    document.head.appendChild(s);
  };

  // check for W3C Progress Event support
  if ('onload' in xhr) {
    ///xhr.addEventListener("loadstart", function(pe) { console.log("onloadstart"); }, false);
    ///xhr.addEventListener("loadend", function(pe) { console.log("onloadend"); }, false);
    xhr.addEventListener("error", function(pe) { 
      console.log("onerror"); 
///      Loader.hide();
    }, false);
    xhr.addEventListener("abort", function(pe) { 
      console.log("onabort"); 
///      Loader.hide();
    }, false);
    xhr.addEventListener("load", function(pe) {
      doLoad();
///      Loader.hide();
    }, false);
    xhr.addEventListener("progress", function(pe) { 
      if (console && console.log)
        console.log(pe.lengthComputable, pe.total, pe.loaded);
    }, false);
  }
  else {
    xhr.addEventListener("readystatechange", function(e) {
      if (xhr.readyState == 4) {
        doLoad();
///        Loader.hide();
      }
    }, false);
  }

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

