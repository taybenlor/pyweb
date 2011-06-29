
function IEEditorSession(parentId) { 
  this.e = document.createElement('textarea');
  this.e.id = 'ieeditor';
  document.getElementById(parentId).appendChild(this.e);
};
IEEditorSession.prototype.getValue = function() { return this.e.value; };
IEEditorSession.prototype.setMode = function(mode) { };
IEEditorSession.prototype.setTabSize = function(size) { };
IEEditorSession.prototype.setValue = function(value) { this.e.value = value; };
IEEditorSession.prototype.setUseSoftTabs = function(b) { };
IEEditorSession.prototype.setUseWrapMode = function(b) { };

function IEEditor(parentId) { this.session = new IEEditorSession(parentId); };
IEEditor.prototype.gotoLine = function(line) { };
IEEditor.prototype.getSession = function() { return this.session; }
IEEditor.prototype.setShowPrintMargin = function(b) { };
IEEditor.prototype.setTheme = function(theme) { };

