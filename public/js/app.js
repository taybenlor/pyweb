var Loader = { 
  error: function(text) {
    var msg = document.getElementById('loader-text');
    msg.className = 'error';
    msg.innerText = text;
    document.getElementById('loader-spinner').style.display = 'none';
    document.getElementById('loader-msg').innerHTML = '';
  },
  hide: function() {
    document.getElementById('loader').className += ' hidden';
    document.getElementById('run').className = document.getElementById('run').className.replace(/\bdisabled\b/,'');
    document.getElementById('run').disabled = false;
  },
  show: function() {
    document.getElementById('loader-spinner').style.display = 'block';
    var msg = document.getElementById('loader-text');
    msg.className = '';
    msg.innerText = 'Loading ...';
    document.getElementById('loader-msg').innerHTML = '';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('run').disabled = true;
    
  },
  update: function(loaded, outOf) {
    var percent = (100.0 * loaded) / outOf;
    document.getElementById('loader-msg').innerHTML = percent.toFixed(0) + '%';
  }
};


function addScriptResource(attrs, onLoaded) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.onreadystatechange = function() {
    if ((this.readyState == 'loaded' || this.readyState == 'complete') && onLoaded)
      onLoaded();
  };
  for (var key in attrs)
    script[key] = attrs[key];
  document.body.appendChild(script);
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
    addScriptResource({src: '/js/mylibs/python2.7.1.closure.js'}, function() {
      Loader.hide();
    });
    return;
  }

  var xhr = new window.XMLHttpRequest();
  var doLoad = function() {
    addScriptResource({innerText: xhr.responseText});
  };

  // check for W3C Progress Event support
  if ('onload' in xhr) {
    xhr.addEventListener("error", function(pe) { Loader.error("An error occurred while loading"); }, false);
    xhr.addEventListener("abort", function(pe) { Loader.error("Loading cancelled"); }, false);
    xhr.addEventListener("load", function(pe) {
      doLoad();
      Loader.hide();
    }, false);
    xhr.addEventListener("progress", function(pe) { 
      if (pe.lengthComputable)
        Loader.update(pe.loaded, pe.total);
    }, false);
  }
  else {
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4) {
        doLoad();
        Loader.hide();
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
  
  var aboutButton = document.getElementById("about");
  var aboutBox = document.getElementById("about-box");
  var open = false;
  aboutButton.addEventListener("click", function(event){
    open = !open;
    if(open){
      aboutBox.className = aboutBox.className.replace(/\bclosed\b/, '');
    }
    else{
      aboutBox.className += "closed";
    }
  }, false);
  
  // editor
  var editor = getEditor();
  var Mode = require("ace/mode/python").Mode;
  editor.setTheme("ace/theme/gumby");
  editor.setShowPrintMargin(false);
  editor.getSession().setMode(new Mode());
};
window['pageLoaded'] = pageLoaded


function doRun() {
}

