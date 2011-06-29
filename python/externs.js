
/**
 * Interface for the ACE editor session
 * @interface 
 **/
function EditorSession(){};
/** @return {string} **/
EditorSession.prototype.getValue = function(){};
/** **/
EditorSession.prototype.setMode = function(mode){};
/** @param {number} **/
EditorSession.prototype.setTabSize = function(size){};
/** @param {string} **/
EditorSession.prototype.setValue = function(s){};
/** @param {boolean} **/
EditorSession.prototype.setUseSoftTabs = function(b){};
/** @param {boolean} **/
EditorSession.prototype.setUseWrapMode = function(b){};


/**
 * Interface for the ACE editor
 * @interface 
 **/
function Editor(){};
/** @param {number} **/
Editor.prototype.gotoLine = function(line){};
/** @return {EditorSession} **/
Editor.prototype.getSession = function(){};
/**
 * @param {string}
 * @param {?Object}
 **/
Editor.prototype.find = function(needle, options){};
/** **/
Editor.prototype.findNext = function(){};
/** **/
Editor.prototype.findPrevious = function(){};
/** @param {string} **/
Editor.prototype.insert = function(s){};
/** @param {string} **/
Editor.prototype.replace = function(s){};
/** @param {string} **/
Editor.prototype.replaceAll = function(s){};
/** @param {boolean} **/
Editor.prototype.setReadOnly = function(b){};
/** @param {boolean} **/
Editor.prototype.setHighlightActiveLine = function(b){};
/** @param {boolean} **/
Editor.prototype.setShowPrintMargin = function(b){};


/**
 * Getter for the global ACE editor instance
 * @return {Editor} 
 **/
function getEditor(){};

