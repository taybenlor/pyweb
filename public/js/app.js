var editor;


function addScriptResource(attrs) {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  for (var key in attrs)
    s[key] = attrs[key];
  document.body.appendChild(s);
}


function getEditor() {
  if (!getEditor._editor) {
    // Ace fails horribly in IE, so fake it
    if (Flow.Browser.IE)
      getEditor._editor = new IEEditor('editor');
    else
      getEditor._editor = ace.edit('editor');
  }
  return getEditor._editor;
}
window['getEditor'] = getEditor;


var loadPython = function loadPython() {
  // seriously, screw IE
  if (Flow.Browser.IE) {
    addScriptResource({src: '/js/mylibs/python2.7.1.closure.js'});
    return;
  }

  var xhr = new window.XMLHttpRequest();
  var doLoad = function() {
    addScriptResource({innerText: xhr.responseText});
  };

  // check for W3C Progress Event support
  if ('onload' in xhr) {
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
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4) {
        doLoad();
///        Loader.hide();
      }
    };
  }

  xhr.open("GET", "/js/mylibs/python2.7.1.closure.js");
  xhr.send();
};
window['loadPython'] = loadPython;


var pageLoaded = function pageLoaded() {
  loadPython();
  doRun(); // do our initial checks
  var runButton = document.getElementById('run');
  runButton.addEventListener("click", function(event){
    execute();
  }, false);
  
  // editor
  editor = getEditor();
  var Mode = require("ace/mode/python").Mode;
  editor.setTheme("ace/theme/gumby");
  editor.setShowPrintMargin(false);
  editor.getSession().setMode(new Mode());
  editor.getSession().setValue("import sys\n\nprint 'Hello world! This is Python {} on {}'.format(sys.version, sys.platform)\n\nprint 'Here are some numbers:', [2*x for x in range(5)][:4]");
};
window['pageLoaded'] = pageLoaded


function doRun() {
}

