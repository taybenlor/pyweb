

/*
Namespace: The Flow Namespace
	The Flow namespace, Array Extras, Plugin support, and other goodies.
	
About: Version
	1.1.1

License:
	- Flow is licensed under a Creative Commons Attribution-Share Alike 3.0 License <http://creativecommons.org/licenses/by-sa/3.0/us/>. You are free to share, modify and remix our code as long as you share alike.

Notes:
	- Some documentation assumes familiarity with the Firebug API <http://getfirebug.com/console.html>. Because if you're not, you probably should go there. Now.
*/
var Flow = {
	
	Utils : {
		
		stripWhitespace : function(element) {
			// Private variables
			var i = 0, kids = element.childNodes;
			
			var preTest = function(element) {
				if (element) {
					if ((/pre|code/).test(element.nodeName.toLowerCase()) || ((element.style) && (element.style.whiteSpace))) {
						return true;
					}
				}
				return false;
			};
			
			// Break if '<pre>' or 'white-space: pre;' is detected
			var parent = element;
			
			while (parent) {
				if (preTest(parent)) {
					return;
				}
				
				parent = parent.parentNode;
			}
			
			// Loop
			while (i < kids.length) {
				// If nodeType is 3 (TEXT_NODE) and does not include text
				if ((kids[i].nodeType == 3) && !(/\S/.test(kids[i].nodeValue))) {
					// Remove child
					element.removeChild(kids[i]);
				}
				i++;
			}
		},
		
		match : function(attribute) {
			return new RegExp("(^|\\s)" + attribute.replace(/\-/g, "\\-") + "(\\s|$)");
		},
		
		xpath : {
			
			snapshot : (window.XPathResult) ? XPathResult.ORDERED_NODE_SNAPSHOT_TYPE : null,
			
			contains : function(attribute, value, that) {
				return document.evaluate(".//*[contains(concat(' ', @" + attribute + ", ' '), ' " + value + " ')]", that, null, this.snapshot, null);
			}
		},
		
		liveNodeList : function(nodes) {
			var F = Flow,
			    B = F.Browser;
			
			// Firefox && Safari 3 handle this perfectly
			if (B.GK || B.S3) {
				return [].slice.call(nodes, 0, nodes.length);
			} else {
				var i = 0, node, clones = [];
				if (nodes && nodes.length) {
					while (i < nodes.length) {
						node = nodes[i];
						if (node) {
							clones.push(node);
						}
						i++;
					}
				}
				return clones;
			}
		},
		
		toCamelCase : function(cssProp) {
			var hyphen = /(-[a-z])/ig;
			while (hyphen.exec(cssProp)) {
				cssProp = cssProp.replace(RegExp.$1, RegExp.$1.substr(1).toUpperCase());
			}
			return cssProp;
		},
				
		RGBtoHex : function(r, g, b) {
			var hexify = function(n) {
				if (n === null) {
					return "00";
				}

				n = parseInt(n);

				if ((n === 0) || isNaN(n)) {
					return "00";
				}

				n = Math.max(0, n);
				n = Math.min(n, 255);
				n = Math.round(n);

				return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
			};
			
			return "#" + hexify(r) + hexify(g) + hexify(b);
		}
	},
	
	Augment : function(subclass, superclass) {
		subclass = subclass[0] ? subclass : [subclass];
		
		for (var i = 0, j = subclass.length; i < j; i++) {
			for (var key in superclass) {
				if (!subclass[i][key] && superclass.hasOwnProperty(key)) {
					subclass[i][key] = superclass[key];
				}
			}
		}
	},
	
	/*
	Class: Browser
		Sets a few Browser/DOM flags.

	Note:
		These are more for internal use than external.
		The entire goal of Flow Core is that you don't need to worry about browser detection.

	Properties:
		Flow.Browser.IE - Internet Explorer.
		Flow.Browser.IE6 - Internet Explorer 6
		Flow.Browser.IE7 - Internet Explorer 7
		Flow.Browser.IE8 - Internet Explorer 8
		Flow.Browser.GK - Gecko-based
		Flow.Browser.WK - Webkit
		Flow.Browser.S3 - Safari 3
		Flow.Browser.Chrome - Chrome
		Flow.Browser.OP - Opera
	*/
	Browser : {
		IEWhich : function() {
			var e = this;

			e.IE = {};
			e.IE.jscript/*@cc_on =@_jscript_version@*/;

			switch (e.IE.jscript) {
				case 5.8 :
				e.IE8 = true;
				break;

				case 5.7 :
				e.IE7 = true;
				break;

				case 5.6 :
				e.IE6 = true;
				break;
			}
		},
		init : function() {
			var B = Flow.Browser,
			    A = Array,
			    proto = A.prototype;
			
			var ua = function(browser) {
				return (browser).test(navigator.userAgent.toLowerCase());
			};
			
			Flow.Augment(B, {
				W3 : !!(document.getElementById && document.createElement), // W3C
				IE : /*@cc_on !@*/false, // IE
				GK : !!(ua(/gecko/)), // Gecko
				WK : !!(ua(/webkit/)), // Webkit
				S3 : !!(ua(/webkit/) && window.devicePixelRatio), // Safari 3
				Chrome : !!(ua(/chrome/)), // Chrome
				KHTML : !!(ua(/khtml|webkit|icab/i)), // KHTML
				OP : !!(ua(/opera/)) // Opera
			});
			
			/*
				Class: Array
				A collection of Array Extras.
			*/
			Flow.Augment([proto, A], {
				/*
				Property: every
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:every>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					>var isBigEnough = function(element, index, array) {
					>  return (element >= 10);
					>};
					>var passed = [12, 5, 8, 130, 44].every(isBigEnough); // passed is false
					>passed = [12, 54, 18, 130, 44].every(isBigEnough); // passed is true
				*/
				every : function(fun /*, caller*/) {
					var that = this;

					var len = this.length, i = 0;
					var caller = arguments[1];
					
					while (i < len) {
						if (i in this && !fun.call(caller, this[i], i, this)) {
							return false;
						}
						i++;
					}

					return true;
				},

				/*
				Property: some
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:some>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					>var isBigEnough = function(element, index, array) {
					>  return (element >= 10);
					>};
					>var passed = [2, 5, 8, 1, 4].some(isBigEnough); // passed is false
					>passed = [12, 5, 8, 1, 4].some(isBigEnough); // passed is true
				*/
				some : function(fun /*, caller*/) {
					var that = this;

					var len = this.length, i = 0;
					var caller = arguments[1];
					
					while (i < len) {
						if (i in this && fun.call(caller, this[i], i, this)) {
							return true;
						}
						i++;
					}

					return false;
					
				},

				/*
				Property: filter
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:filter>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					>var isBigEnough = function(element, index, array) {
					>  return (element >= 10);
					>};
					>var filtered = [12, 5, 8, 130, 44].filter(isBigEnough); // returns [12, 130, 44]
				*/
				filter : function(fun /*, caller*/) {
					var that = this;

					var res = [],
					    caller = arguments[1];
					
					var i = 0;
					while (i < that.length) {
						if (i in that) {
							var val = that[i]; // in case fun mutates this
							if (fun.call(caller, val, i, that)) {
								res.push(val);
							}
						}
						i++;
					}
					return res;
				},

				/*
				Property: map
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:map>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					>var numbers = [1, 4, 9];
					>var roots = numbers.map(Math.sqrt); // roots is now [1, 2, 3]
					>// numbers is still [1, 4, 9]
				*/
				map : function(fun /*, caller*/) {
					var that = this,
					     len = this.length;

					var res = [len], i = 0;
					var caller = arguments[1];
					
					while (i < len) {
						if (i in this) {
							res[i] = fun.call(caller, this[i], i, this);
						}
						i++;
					}

					return res;
				},

				/*
				Property: indexOf
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:indexOf>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					>var array = [2, 5, 9];
					>var index = array.indexOf(2); // index is 0
					>index = array.indexOf(7); // index is -1
				*/
				indexOf : function(elt, start) {
					var that = this;

					var i = start || 0;
					
					while (i < that.length) {
						if (that[i] === elt) {
							return i;
						}
						i++;
					}
					return -1;
				},
				
				/*
				Property: lastIndexOf
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:lastIndexOf>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					(start code)
					var array = [2, 5, 9, 2];
					var index = array.lastIndexOf(2); // index is 3
					index = array.lastIndexOf(7); // index is -1
					index = array.lastIndexOf(2, 3); // index is 3
					index = array.lastIndexOf(2, 2); // index is 0
					index = array.lastIndexOf(2, -2); // index is 0
					index = array.lastIndexOf(2, -1); // index is 3
					(end code)
				*/
				lastIndexOf : function(elt, from) {
					var that = this,
					    length = that.length;
					
					from = from || length;
					if (from >= length) {
						from = length;
					}
					if (from < 0) {
						from = length + from;
					}
					var i = from;
					while (i >= 0) {
						if (that[i] === elt) {
							return i;
						}
						i--;
					}
					return -1;
				},
				
				/*
				Property: forEach
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:filter>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					(start code)
					var lis = document.getElementsByTagName("li");
					lis.forEach(function(element, index, array) {
						console.log(element.nodeName.toLowerCase == "li") // alerts true
						console.log(i) // Alerts current index
						console.log(array) // alerts the elements container array
					});
					(end code)
				*/
				forEach : function(fun /*, caller*/) {
					var that = this;
					
					var caller = arguments[1],
					    i = 0;
					
					while (i < that.length) {
						if (i in that) {
							fun.call(caller, that[i], i, that);
						}
						i++;
					}
				},
				
				/*
				Property: reduce
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:reduce>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					Flatten an array of arrays:
					(start code)
					var flattened = [[0,1], [2,3], [4,5]].reduce(function(a,b) {
					  return a.concat(b);
					}, []);
					// flattened is [0, 1, 2, 3, 4, 5]
					(end code)
				*/
				reduce : function(fun /*, initial*/) {
					var that = this;
					
					var len = that.length, i = 0;
					
					if (arguments.length >= 2) {
						var rv = arguments[1];
					} else {
						do {
							if (i in that) {
								rv = that[i++];
								break;
							}
						} while (true);
					}
					for (; i < len; i++) {
						if (i in that) {
							rv = fun.call(null, rv, that[i], i, that);
						}
					}
					return rv;
				},
				
				/*
				Property: reduceRight
					<http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:reduceRight>

				Parameters:
					element - the element to test against
					index - _(optional)_ A.K.A. "i", the current index in loop
					array - _(optional)_ element's parent

				Example:
					Flatten an array of arrays:
					(start code)
					var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
					  return a.concat(b);
					}, []);
					// flattened is [4, 5, 2, 3, 0, 1]
					(end code)
				*/
				reduceRight : function(fun /*, initial*/) {
					var that = this;
					
					var len = that.length,
					    i = len - 1;
					
					if (arguments.length >= 2) {
						var rv = arguments[1];
					} else {
						do {
							if (i in that) {
								rv = that[i--];
								break;
							}
						} while (true);
					}
					for (; i >= 0; i--) {
						if (i in that) {
							rv = fun.call(null, rv, that[i], i, that);
						}
					}
					return rv;
				},
				
				/*
				Property: exit
					Provides a way to break out of a forEach loop

				Parameters:
					index - A.K.A. "i", the current index in loop

				Example:
					Break a forEach loop:
					(start code)
					var array = [1, 2, 0, 3, 4, 5];
					array.forEach(function(item, i) {
					  if (item === 0) {
					    array = array.exit(i); // Break!
					  } else {
					    console.log(item);
					  }
					});
					console.log(array); // returns [1, 2, 0, 3, 4, 5];
					(end code)
				*/
				exit : function(index) {
					var that = this;
					return that.concat(that.splice(index, that.length - index));
				}
			});
			
			// Turn off background image caching for IE 
			if (B.IE) {
				B.IEWhich();
				try {
					document.execCommand("BackgroundImageCache", false, true);
				} catch (e) {}
			}
		}
	},
	
	/*
	Class: Apply
		Used to extend Flow to elements.

	Note:
		Flow auto-extends every element.
		getInnerHTML / setInnerHTML take care of adding Flow to elements using innerHTML
		However if you insist on using native innerHTML, you need to re-bind Flow to injected elements using Flow.Apply
	*/
	Apply : function(element) {
		return Flow.Bind.extend(element);
	},
	
	Bind : {
		// Each DOM element is flagged with a unique ID
		UNIQUE : 1,
	
		methods : {
			// We know DOM will be on every node
			DOM : "DOM"
		},

		apply : function(object) {
			var that = this;
		
			that.objects = that.objects || [];
			that.objects.push(object);
		
			that.document(document);
		},

		// Binds functions to elements
		extend : function(nodes) {
			var that = this,
			    F = Flow;

			// Sanity check
			if (!nodes) {
				return;
			}
			var one, i, node;

			// Parameter is not an array. Flag it, make it so
			if (nodes.nodeName) {
				one = true;
				nodes = [nodes];
			}

			// Reverse while loop (faster than a straight for)
			i = nodes.length;

			while (i >= 0) {
				node = nodes[i];
			
				// This is how I check if it's bound.
				// If it hasn't, it has no DOM reference
				if ((node && !node.DOM) || (node && node.nodeType === 9)) {
				
					// Bind events to element
					that.bind(node);

					// Strip whitespace from element
					F.Utils.stripWhitespace(node);

					// Assign DOM reference
					node.DOM = node.DOM || ("SCH_" + that.UNIQUE++);
				
				}

				// Reverse while loop
				i--;
			}
		
			return one ? nodes[0] : nodes;
		},

		// Custom document events
		document : function(node) {
			var that = this;

			// Private variables
			var i = 0, doc, F = Flow;
		
			// Assign DOM reference
			node.DOM = node.DOM || ("SCH_" + that.UNIQUE++);
		
			while (i < that.objects.length) {
				doc = that.objects[i];
				doc.boundElements = doc.boundElements || {};
			
				if (!doc.boundElements[node.DOM]) {
					that.iterate(doc.document, node);
				
					node._defaultView = node.defaultView;
				
					if (typeof node.defaultView === "undefined") {
						node.defaultView = window;
					}
				
					that.iterate(doc.computed, node.defaultView);
				
					doc.boundElements[node.DOM] = node.DOM;
				}
				i++;
			}
			that.extend(node);
		},

		iterate : function(object, node) {
			var that = this;
		
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					if (!node.DOM || !node[key] || !that.methods[key]) {
						// ARCHIVED NATIVE METHODS
					
						try {
							if (node == Array.prototype) {
								node[key] = function() {
									var i = 0, array = this, call,
									    args = arguments, combo = [];
								
									var singleProps = ["getFirstChild", "getLastChild"],
									    curr = args.callee.key;
									while (i < singleProps.length) {
										if (curr == singleProps[i]) {
											throw curr + " property can only be called on single element.";
										}
										i++;
									}
								
									i = 0;
									while (i < array.length) {
										// Yay, a useful purpose for arguments.callee!
										call = array[i][curr].apply(array[i], args);
										if (call) {
											var j = 0;
											while (j < call.length) {
												if (call[j]) {
													combo.push(call[j]);
												}
												j++;
											}
										}
										i++;
									}
									return combo[0] ? combo : array;
								};
								node[key].key = key;
							} else {

								if (node[key]) {
									var orig = "_" + key;
									node[orig] = node[key];
									that.methods[orig] = that.methods[orig] || orig;
								}
								node[key] = object[key];
							}
							that.methods[key] = that.methods[key] || key;
							that.shortcut(node, key);
						} catch (e) {}
					}
				}
			}
		},

		shortcut : function(node, key) {
			var that = this;
		
			var reg = /(get|query)(Element[s]?|Selector)?(By(Class|Tag|Id|Attr)|All)?(Name|ibute)?/;
			if (reg.test(key)) {
				var shorthand = key.replace(reg, "$1$3");
				node[shorthand] = node[key];
				that.methods[shorthand] = that.methods[shorthand] || shorthand;
			}
		},

		bind : function(node) {
			var that = this;

			if (!node.DOM || (node && node.nodeType === 9)) {
				var i = 0, j, k,
				    obj = that.objects;
			
				while (i < obj.length) {
					j = obj[i];
				
					if (j.nodes && j.nodes.limit) {
						k = 0;
						while (k < j.nodes.limit.length) {
							var type = j.nodes.limit[k];
							if (node.nodeName.toLowerCase() == type) {
								that.iterate(j.nodes, node);
							}
							k++;
						}
					} else {
						that.iterate(j.nodes, node);
					}
				
					// IE fixes for botched API
					if (Flow.Browser.IE) {
						that.iterate(j.ie, node);
					}
					i++;
				}
			}
		}
	},
	
	/*
		Class: Plugin
		Allows you to extend the Flow namespace

		Example:
			(start code)
			// define closure
			new Flow.Plugin({
				name : "Foo", // You've defined "Flow.Foo"
				version : "1.0.2 (fixes conflict with 'Soda.Grape')", // Versioning info
				description : "Foo integrates Flow with 'Soda.Orange'.", // Brief description

				constructor : { // The meat n' potatoes. Your Function/Object goes here
					init : function(e) {
						e = e.toUpperCase();
						this.orange(e);
					},
					orange : function(e) {
						this.flavor = e;
						this.fizz();
					},
					fizz : function() {
						alert("soda");
					}
				}.init("orange") // call constructor.init
			}); // closure
			(end code)
	*/
	Plugin : function(plugin) {
		// if no plugin.name, assume anonymous
		if (plugin.name) {
			if (Flow[plugin.name]) {
				throw "Flow." + plugin.name + " already exists";
			}
			Flow[plugin.name] = plugin.constructor;

			if (plugin.bind) {
				Flow.Bind.apply(plugin.constructor);
			}
		} else {
			plugin.constructor();
		}
	}
	
};

Flow.Browser.init();


/*
Namespace: The Dom Namespace
	Extends the native JS DOM API across all grade-A browsers.

About: Version
	1.1.1

Requires:
	Flow.js.

License:
	- Flow is licensed under a Creative Commons Attribution-Share Alike 3.0 License <http://creativecommons.org/licenses/by-sa/3.0/us/>. You are free to share, modify and remix our code as long as you share alike.

Notes:
	- Some documentation assumes familiarity with the Firebug API <http://getfirebug.com/console.html>. Because if you're not, you probably should go there. Now.
*/

new Flow.Plugin({
	name : "Dom",
	version : "1.1.1",
	bind : true,
	constructor : function() {

		var F = Flow,
		    D = F.Dom,
		    X = F.Bind,
		    B = F.Browser,
		    U = F.Utils,
		    E = F.Event;
		
		var className = "className",
		    firstChild = "firstChild",
		    lastChild = "lastChild",
		    evalString = "evaluate",
		    doc = document,
		    zero = null,
		    that;

		return {
			/*
			Interface: Element
				These functions are bound to _elements_.
			*/
			nodes : {

				/*
				Property: getElementsByClassName
					http://developer.mozilla.org/en/docs/DOM:document.getElementsByClassName

				Shorthand:
					getByClass

				Parameters:
					className - the class to retrieve.

				Example:
					>var foo = document.getElementsByClassName("foo");
					>var foo = document.getByClass("foo"); // shortcut
				*/
				getElementsByClassName : function() {
					var format = function(className) {
						if (!(className instanceof Array)) {
							className = className.replace(/^\s?|\s?$/g, "");
							if (/ /.test(className)) {
								className = className.split(" ");
							}
							className = (typeof className == "string") ? [className] : className;
						}
						return className;
					};
					
					var hasClass = function(elClass, element) {
						return new RegExp("(?:^|\\s+)" + elClass + "(?:\\s+|$)").test(element[className]);
					};
					var match = function(reg, element) {
						var i = 0, ex;
						while (ex = reg[i++]) {
							if (!ex.test(element[className])) {
								element = zero;
								break;
							}
						}
						return element;
					};
					var evaluate = function(className, that) {
						var evals = [], reg = [],
						    i = 0, Class;
						while (Class = className[i++]) {
							if (doc[evalString] && that) {
								evals.push(U.xpath.contains("class", Class, that));
							}
							reg.push(U.match(Class));
						}
						return {
							evals : evals,
							reg : reg
						};
					};
					var empty = function(className) {
						return (typeof className == "object" && !className[0]) || (className === "");
					};

					// native
					if (doc._getElementsByClassName) {
						return function(className) {

							var that = this;

							var nodes = new U.liveNodeList(that._getElementsByClassName(className));
							return X.extend(nodes);
						};
					}

					// xpath
					if (doc[evalString]) {
						return function(className) {
					
							var that = this;
					
							if (empty(className)) {
								// Paranoid
								return [];
							}
					
							// Clean className
							className = format(className);
							var nodes = [], element, i = 0, x = 0,
							    regEx = evaluate(className, that),
							    evals = regEx.evals, xpath,
							    reg = regEx.reg, _match;
					
							while (xpath = evals[i++]) {
								while (element = xpath.snapshotItem(x++)) {
									_match = match(reg, element);
									if (_match) {
										nodes.push(_match);
									}
								}
							}
							return X.extend(new U.liveNodeList(nodes));
						};
					}
					
					// generic
					return function(className) {
					
						var that = this;
					
						if (empty(className)) {
							// Paranoid
							return [];
						}
					
						className = format(className);
						// Private variables
						var nodes, elArray = [], element, i = 0, _match;
						nodes = that._getElementsByTagName("*");
						var regEx = evaluate(className),
						    reg = regEx.reg;
					
						while (element = nodes[i++]) {
							_match = match(reg, element);
							if (_match) {
								elArray.push(_match);
							}
						}
						
						return X.extend(elArray);
					};
				}(),

				/*
				Property: getElementsByTagName
					http://developer.mozilla.org/en/docs/DOM:document.getElementsByTagName

				Shorthand:
					getByTag

				Parameters:
					tagName - the tag to retrieve.

				Example:
					>var foo = document.getElementsByTagName("li");
					>var foo = document.getByTag("li"); // shortcut
				*/
				getElementsByTagName : function() {
					
					if (doc[evalString]) {
						return function(tagName) {
							tagName = tagName.toLowerCase();
							
							switch (tagName) {
								case "applet" :
								case "embed" :
								return document._getElementsByTagName(tagName);
								
								default:
								var i = 0, element, that = this;

								var xpath = doc[evalString](".//" + tagName, that, zero, U.xpath.snapshot, zero),
								    nodes = [];

								while (element = xpath.snapshotItem(i++)) {
									nodes.push(element);
								}

								nodes = X.extend(nodes);

								return nodes;
							}
						};
					}
					return function(tagName) {
						tagName = tagName.toLowerCase();

						var that = this;

						switch (tagName) {
							case "applet" :
							case "embed" :
							return document._getElementsByTagName(tagName);
							
							default:
							var nodes = X.extend(that._getElementsByTagName(tagName));
							
							var clones = [];
							for (var i = 0, j = nodes.length; i < j; i++) {
								clones.push(nodes[i]);
							}
							
							return clones;
						}
					};
				}(),

				// cloneNode wrapper
				cloneNode : function(deep) {
					var clone = this._cloneNode(deep);

					// DOM elements should not have the same ID
					if (deep) {
						var i = 0,
						    children = clone.getElementsByTagName("*");
						while (i < children.length) {
							X.extend(children[i]);
							children[i].DOM = "SCH_" + X.UNIQUE++;
							i++;
						}
					}
					clone = X.extend(clone);
					
					// Assign new DOM ID
					clone.DOM = "SCH_" + X.UNIQUE++;
					
					return clone;
				},

				// removeChild wrapper
				removeChild : function(childNode) {
					E = E || F.Event;
					if (E && childNode && childNode.DOM && childNode.nodeType == 1) {
						E.cache.flush(childNode);
					}
					
					if (typeof this._removeChild !== "undefined") {
						this._removeChild(childNode);
					}
				},

				// replaceChild wrapper
				replaceChild : function(newNode, referenceNode) {
					E = E || F.Event;
					if (E && referenceNode && referenceNode.DOM && referenceNode.nodeType == 1) {
						E.cache.flush(referenceNode);
					}
					
					if (this.replaceNode) {
						referenceNode.replaceNode(newNode);
					} else {
						this._replaceChild(newNode, referenceNode);
					}
				}
			},

			/*
			Interface: Document
				These functions are bound to _document_.
			*/
			document : {

				/*
				Property: getElementById
					http://developer.mozilla.org/en/docs/DOM:document.getElementById

				Shorthand:
					getById

				Parameters:
					idName - the id to retrieve.

				Example:
					>var foo = document.getElementById("foo");
					>var foo = document.getById("foo"); // shortcut
				*/
				getElementById : function(idName) {
					D = D || F.Dom;
					
					var element = doc._getElementById(idName);
					
					if (element) {
						//make sure that it is a valid match on id
						var attr = element.attributes["id"];
						if (attr && attr.value && (attr.value == idName)) {
							return X.extend(element);
						} else {
							if (B.WK) {
								// Safari 2 chokes on attributes["id"]
								// But we know it returns an id regardless, so we give it a pass
								return X.extend(element);
							} else {
								//otherwise find the correct element
								for (var i = 1; i < document.all[idName].length; i++) {
									if(document.all[idName][i].id == idName) {
										return X.extend(document.all[idName][i]);
									}
								}
							}
						}
					}
				},

				/*
				Property: getElementsByName
					http://developer.mozilla.org/en/docs/DOM:document.getElementsByName

				Shorthand:
					getByName

				Parameters:
					name - the name to retrieve.

				Example:
					>var foo = document.getElementsByName("foo");
					>var foo = document.getByName("foo"); // shortcut
				*/
				getElementsByName : function(name) {
					D = D || F.Dom;

					var element = X.extend(doc._getElementsByName(name));
					element = new U.liveNodeList(element);
					return element;
				},

				// Binds custom events to newly created elements
				createElement : function(element) {
					var newElement = this._createElement(element);
					return X.extend(newElement);
				}
			},

			/*
			Interface: IE Fixes
				These functions are fixed for Internet Explorer.
			*/
			ie : {

				/*
				Property: getAttribute
					http://developer.mozilla.org/en/docs/DOM:element.getAttribute

				Parameters:
					attribute - the attribute to retrieve.

				Example:
					>var foo = document.getElementById("foo");
					>var attr = foo.getAttribute("class");
					>// returns class (yes, even in IE)
				*/
				getAttribute : function(attribute) {
					that = this;

					switch (attribute) {
						case "style" :
						var style = that.style.cssText.toLowerCase();
						
						// Perfectionist's addition of semicolon ;)
						if (!(/;$/.test(style))) {
							style += ";";
						}
						return style;

						case "class" :
						return that[className];

						case "for" :
						return that.htmlFor;
						
						case "type" :
						return that.type;

						case "href" :
						case "src" :
						case "value" :
						return that._getAttribute(attribute, 2);

						default :
						return that._getAttribute(attribute);
					}
				},

				/*
				Property: setAttribute
					http://developer.mozilla.org/en/docs/DOM:element.setAttribute

				Parameters:
					attribute - the attribute to set.
					value - the value to set.

				Example:
					>var foo = document.getElementById("foo");
					>foo.setAttribute("class", "bar");
					>// sets class (yes, even in IE)
				*/
				setAttribute : function(attribute, value) {
					that = this;

					switch (attribute) {
						case "style" :
						that.style.cssText = value;
						return;

						case "class" :
						that[className] = value;
						return;

						case "for" :
						that.htmlFor = value;
						return;

						case "title" :
						that.title = value;
						return;
						
						case "type" :
						that.type = value;
						return;

						default :
						that._setAttribute(attribute, value);
						return;
					}
				},

				/*
				Property: hasAttribute
					http://developer.mozilla.org/en/docs/DOM:element.hasAttribute

				Parameters:
					attribute - the attribute to set.
					value - the value to set.

				Example:
					>var foo = document.getElementById("foo");
					>if (foo.hasAttribute("class")) {
					>	foo.removeAttribute("class");
					>}
					>// (yes, even in IE)
				*/
				hasAttribute : function(attribute) {
					return this.getAttribute(attribute) !== zero;
				}
			},

			/*
			Interface: Window
				These functions are bound to _document.defaultView_.
			*/
			computed : {

				/*
				Property: getComputedStyle
					http://developer.mozilla.org/en/docs/DOM:window.getComputedStyle

				Parameters:
					element - the computed element to retrieve.
					pseudoElt - _(optional)_ the computed pseudo-element to retrieve.

				Example:
					>var foo = document.getElementById("foo");
					>var computedStyle = document.defaultView.getComputedStyle(foo, null);
				*/
				getComputedStyle : function(element, pseudoElt) {

					/*
					Property: getPropertyValue
						Grabs individual property values from an element's computed style

					Parameters:
						property - the property to retrieve.

					Example:
						>var foo = document.getElementById("foo");
						>var width = document.defaultView.getComputedStyle(foo, null).getPropertyValue("width");
					*/
					var RGBtoHex = U.RGBtoHex;
					
					if (document.defaultView._getComputedStyle) {
						
						var computedStyle = document.defaultView._getComputedStyle(element, pseudoElt);
						
						if (!B.Chrome) {
							computedStyle.getPropertyValue = function(property) {
							
								var value = document.defaultView._getComputedStyle(element, pseudoElt).getPropertyValue(property);
								switch (/color|background/.test(property)) {
									case true :
									if (/rgb/.test(value)) {
										// Switch to Hex
										var rgb = (/rgb\(([^\)]+)\)/).exec(value);
										if (rgb && rgb[1]) {
											rgb = rgb[1].split(/\, ?/);
											return RGBtoHex(rgb[0], rgb[1], rgb[2]).toLowerCase();
										}
									} else {
										// Make sure hex is lowercase
										var hexcode = (/\#[a-zA-Z0-9]+/).exec(value);
										if (hexcode && hexcode[0]) {
											value = value.replace(hexcode[0], hexcode[0].toLowerCase());
										}
										return value;
									}
									break;
								
									default :
									return value;
								}
							};
						}
						
						return computedStyle;
					} else {
						element.getPropertyValue = function(property) {
							property = U.toCamelCase(property);

							var unAuto = function(prop) {

								var calcPx = function(props, dir) {
									var value;
									dir = dir.replace(dir.charAt(0), dir.charAt(0).toUpperCase());

									var globalProps = {
										visibility : "hidden",
										position : "absolute",
										left : "-9999px",
										top : "-9999px"
									};

									var dummy = element.cloneNode(true);

									for (var i = 0, j = props.length; i < j; i++) {
										dummy.style[props[i]] = "0";
									}
									for (var key in globalProps) {
										dummy.style[key] = globalProps[key];
									}

									document.body.appendChild(dummy);
									value = dummy["offset" + dir];
									document.body.removeChild(dummy);

									return value;
								};

								switch (prop) {
									case "width" :
									props = ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"];
									prop = calcPx(props, prop);
									break;

									case "height" :
									props = ["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"];
									prop = calcPx(props, prop);
									break;

									default :
									prop = style[prop];
									break;
								}

								return prop;
							};


							var PIXEL = /^\d+(px)?$/i;
							var COLOR = /color|backgroundColor/i;
							var SIZES = /width|height|top|bottom|left|right|margin|padding|border(.*)?Width/;
							
							// Limited to HTML 4.01 defined names
							// http://www.w3.org/TR/REC-html40/types.html#h-6.5
							var getHexColor = {
								aqua : "00FFFF",
								black : "000000",
								blue : "0000FF",
								fuchsia : "FF00FF",
								green : "008000",
								grey : "808080",
								lime : "00FF00",
								maroon : "800000",
								navy : "000080",
								olive : "808000",
								purple : "800080",
								red : "FF0000",
								silver : "C0C0C0",
								teal : "008080",
								white : "FFFFFF",
								yellow : "FFFF00"
							};
							
							var getPixelValue = function(prop, name) {
								if (PIXEL.test(prop)) {
									return prop;
								}
								
								// if property is auto, do some messy appending
								if (prop === "auto") {
									prop = unAuto(name);
								} else {
									var style = this.style.left,
									    runtimeStyle = this.runtimeStyle.left;

									this.runtimeStyle.left = this.currentStyle.left;
									this.style.left = prop || 0;
									prop = this.style.pixelLeft;
									this.style.left = style;
									this.runtimeStyle.left = runtimeStyle;
								}
								
								return prop + "px";
							};
							
							var getColorValue = function(value) {
								// Hex must be 7 chars in length, including octothorpe.
								if (/#/.test(value) && value.length !== 7) {
									var hex = (/[a-zA-Z0-9]+/).exec(value)[0].split("");
									value = "#" + [hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]].join("").toLowerCase();
								} else if (/rgb/.test(value)) {
									// Switch to Hex
									value = (/rgb\(([^\)]+)\)/).exec(value)[1].split(/\, ?/);
									return RGBtoHex(value[0], value[1], value[2]).toLowerCase();
								} else if (getHexColor[value]) {
									value = "#" + getHexColor[value].toLowerCase();
								}
								
								return value;
							};
							
							if (COLOR.test(property)) {
								property = getColorValue(this.currentStyle[property]);
							} else if (SIZES.test(property)) {
								property = getPixelValue.call(this, this.currentStyle[property], property);
							} else {
								property = this.currentStyle[property];
							}

							/**
							 * @returns property (or empty string if none)
							*/
							return property || "";
						};

						/*
						Property: removeProperty
							Removes individual property values from an element's computed style

						Parameters:
							property - the property to remove.

						Example:
							>var foo = document.getElementById("foo");
							>var width = document.defaultView.getComputedStyle(foo, null).removeProperty("width");
						*/
						element.removeProperty = function(property) {
							property = U.toCamelCase(property);
							this.currentStyle[property] = "";
						};

						/*
						Property: setProperty
							Sets individual property values on an element's computed style

						Parameters:
							property - the property to modify.
							value - the value to set

						Example:
							>var foo = document.getElementById("foo");
							>var width = document.defaultView.getComputedStyle(foo, null).setProperty("width", "200");
						*/
						element.setProperty = function(property, value) {
							property = U.toCamelCase(property);
							this.currentStyle[property] = value;
						};

						return element;
					}
				}
			},

			init : function() {
				doc.getByTag("*");
			}
		};

	}()
});

/*
Namespace: The Event Namespace
	Never again worry about memory leaks. Event automagically garbage-collects any node you remove/replace, and flushes event listeners on unload. In addition, Event brings native event handling API support.

About: Version
	1.1.1

License:
	- Some parts of _addEventListener_ based on Dean Edwards' event methods <http://dean.edwards.name/weblog/2005/10/add-event/>
	  and Tino Zijdel's subsequent modifications <crisp@xs4all.nl>
	
	- Some parts of _cache_ based on Mark Wubben's EventCache Version 1.0 <http://novemberborn.net/javascript/event-cache>.
	  Licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>.
	
	- Flow is licensed under a Creative Commons Attribution-Share Alike 3.0 License <http://creativecommons.org/licenses/by-sa/3.0/us/>. You are free to share, modify and remix our code as long as you share alike.

Requires:
	Flow.js.
*/
new Flow.Plugin({
	name : "Event",
	version : "1.1.1",
	bind : true,
	constructor : function() {
		var F = Flow,
		    B = F.Browser,
		    E = F.Event,
		    U = F.Utils,
		    C = F.CustomEvent,
		    that,
		    UNIQUE = 1,
		    doc = document,
		    readyState = "readyState",
		    ContentLoaded = /ContentLoaded/;
		
		var isFB = function() {
			return !!(window.console && window.console.firebug);
		}();
		
		return {

			/*
			Interface: Element
				These functions are bound to _elements_.
			*/
			nodes : {
				/*
				Property: addEventListener
					http://developer.mozilla.org/en/docs/DOM:element.addEventListener

				Parameters:
					type - the type of event to bind.
					handler - the event to bind.
					useCapture - turn event bubbling on/off.

				Example:
					(start code)
					var foo = document.getElementsByClassName("foo");
					var ZOMG = function(e) {
						console.log("zomg");
						e.preventDefault();
					};
					foo.addEventListener("click", ZOMG, false);
					(end code)
				*/
				addEventListener : function (type, handler, useCapture) {
					E = E || F.Event;

					// Add event to cache (avoid memory leaks)
					E.cache.add(this, type, handler, useCapture);
					
					if ((type == "DOMContentLoaded") && (B.IE || B.WK)) {
						if (B.WK) {
							E.stack.push(handler);
							var timer = setInterval(function() {
								if (/loaded|complete/.test(doc[readyState])) {
									clearInterval(timer);
									E.fire();
								}
							}, 10);
						} else if (B.IE) {
							E.stack.push(handler);
							
							// Write in a trigger for IE.
							// IE supports the defer attribute, which allows this to load when the DOM is ready.
							// aka: onDOMContentLoaded
							doc.write("<script id=_ready defer src=//:><\/script>");

							// Target the trigger.
							doc.all._ready.onreadystatechange = function() {
								// Access IE's readyState property.
								// Once complete, remove trigger, compile and fire our list of events.
								if (this.readyState == "complete") {
									this.removeNode();
									Flow.Event.fire();
								}
							};
						}
					} else {
						// Handle the event
						var handleEvent = function(event) {

							// Handle the event
							// Fix event if not handled properly
							event = event || function(event) {
								// The Magix

								// Now supporting preventDefault
								event.preventDefault = function() {
									this.returnValue = false;
								};

								// Now supporting stopPropagation
								event.stopPropagation = function() {
									this.cancelBubble = true;
								};
								
								// Now supporting relatedTarget
								event.relatedTarget = event.toElement;

								// Now supporting target
								event.target = event.srcElement || document;
								
								// Now supporting page X/Y
								var element = doc.documentElement, body = doc.body;
								event.pageX = event.clientX + (element && element.scrollLeft || body && body.scrollLeft || 0) - (element.clientLeft || 0);
								event.pageY = event.clientY + (element && element.scrollTop || body && body.scrollTop || 0) - (element.clientTop || 0);
								
								// Now supporting which
								event.which = (event.charCode || event.keyCode);
								
								// Now supporting metaKey
								event.metaKey = event.ctrlKey;

								return event;
							}(window.event);

							var handlers = this.events[event.type],
							    returnValue, key;
							for (key in handlers) {
								if (handlers.hasOwnProperty(key) && handlers[key].call(this, event) === false) {
									returnValue = false;
								}
							}

							return returnValue;
						};
						
						var attachEvent = function(type, handler) {
							var node = this;
							handler.SCH = handler.SCH || UNIQUE++;

							node.events = node.events || {};

							if (!node.events[type]) {

								node.events[type] = {};

								if (node["on" + type]) {
									node.events[type][0] = node["on" + type];
								}
								
								if (B.IE && (typeof(this.event) !== "undefined")) {
									node = window;
								}
								
								// If "DOM" event, these don't support "on" attachments
								if (/DOM/.test(type)) {
									if (type === "DOMMouseScroll" && B.IE)
									  node.attachEvent("onmousewheel", handler)
									else
                    node._addEventListener(type, handler, false);
								} else {
									node["on" + type] = handleEvent;
								}
							}
							
							node.events[type][handler.SCH] = handler;
							
						};
						
						// Firebug does not like Flow's overriding of addEventListener
						// We'll give it the default implementation.
						if ((/firebug/).test(type)) {
							this._addEventListener(type, handler, false);
						} else {
							attachEvent.call(this, type, handler);
						}
					}

					return that;
				},

				/*
				Property: removeEventListener
					http://developer.mozilla.org/en/docs/DOM:element.removeEventListener

				Parameters:
					type - the type of event to unbind.
					handler - the event to unbind.
					useCapture - turn event bubbling on/off.

				Example:
					>var foo = document.getElementsByClassName("foo");
					>foo.removeEventListener("click", ZOMG, false);
				*/
				removeEventListener : function (type, handler, useCapture) {
					that = this;
					
					var key, i;
					if (that.events) {
						if (!type) {
							for (key in that.events) {
								for (i in that.events[key]) {
									delete that.events[key][i];
								}
							}
						} else if (type && !handler) {
							for (key in that.events[type]) {
								delete that.events[type][key];
							}
						} else if (handler.SCH) {
							delete that.events[type][handler.SCH];
						}
					}
				},
				
				/*
				Property: dispatchEvent
					http://developer.mozilla.org/en/docs/DOM:element.dispatchEvent
					(differs slightly from implementation)

				Parameters:
					type - the type of event to fire.

				Example:
					(start code)
					var foo = document.getElementById("foo");
					foo.addEventListener("click", ZOMG, false);
					
					document.getById("trigger").addEventListener("click", function() {
						foo.dispatchEvent("click"); // Triggers foo's click event handler
					}, false);
					(end code)
				*/
				dispatchEvent : function(type) {
					that = this;
					
					var key;
					
					var fireEvents = function() {
						if ((typeof type === "string") && that.events && that.events[type]) {
							for (key in that.events[type]) {
								that.events[type][key].call(that);
							}
						}
					};
					
					// Firebug no likee
					if (isFB) {
						try {
							that._dispatchEvent(type);
						} catch (e) {
							fireEvents();
						}
					} else {
						fireEvents();
					}
					
					return that;
				}
				
			},

			stack : [],

			cache : function() {
				var eventCache = {};

				return {
					add : function(element, type, handler, useCapture) {
						// Let's create a cache of events
						var key = element.DOM;
						eventCache[key] = eventCache[key] || [];
						eventCache[key].push(arguments);
					},
					list : function(element) {
						return element ? (eventCache[element.DOM] || null) : eventCache;
					},
					flush : function(element) {
						var that = F.Event.cache,
						    key;

						// Time to flush
						var methods = F.Bind.methods;
						
						if (element && element.DOM) {
							key = element.DOM;
							that.iterate(eventCache[key], key);
							that.nullify(element, methods);
						} else {
							
							for (key in eventCache) {
								that.iterate(eventCache[key], key);
							}

							var all = document._getElementsByTagName("*"),
							    node, i = 0;

							while (node = all[i++]) {
								if (node && node.DOM) {
									that.nullify(node, methods);
								}
							}
						}
					},

					// Loop through each array and remove each event
					iterate : function(array, key) {
						if (array && key) {
							var i, item;
							for (i = array.length - 1; i >= 0; i = i - 1) {
								item = array[i];
								item[0].removeEventListener(item[1], item[2], item[3]);
							}
							eventCache[key] = null;
						}
					},

					// Augmenting DOM nodes can lead to memory leaks
					// Here I'm removing all custom methods from each node
					nullify : function(node, methods) {
						var key;
						
						// Problems with other libraries accessing node properties onunload
						// caused undefined errors. This will merely revert the element
						// back to its unaltered state.
						try {
							for (key in methods) {
								if (!(/^\_/).test(key)) {
									node[key] = node["_" + key] || null;
								}
							}
							
							for (key in methods) {
								if ((/^\_/).test(key)) {
									node[key] = null;
								}
							}
						} catch(e) {}
					}
				};
			}(),

			// Load objects when the DOM loads
			// @author Dean Edwards / Matthias Miller / John Resig / Mark Wubben / Paul Sowden
			fire : function() {
				if (arguments.callee.done) {
					return;
				}
				arguments.callee.done = true;
				var i = 0,
				    that = this;

				while (i < that.stack.length) {
					that.stack[i]();
					i++;
				}
			},

			init : function() {
				// Needed to support DOMContentLoaded
				var globals = [window, document],
				    onload = globals[0].onload,
				    i = 0, node, nodes, key, fire;

				if (!doc._addEventListener || B.WK) {
					while (i < globals.length) {
						node = globals[i];
						nodes = Flow.Event.nodes;
						for (key in nodes) {
							// ARCHIVED NATIVE METHODS
							if (node[key]) {
								node["_" + key] = node[key];
							}
							node[key] = nodes[key];
						}
						i++;
					}
				}

				if (Flow.Dom) {
					globals[0].addEventListener("DOMContentLoaded", Flow.Dom.init, false);
				}
			}
		};
	}()
});

(function() {
	var E = Flow.Event;
	E.init();
	// Flush the cache onunload
	window.addEventListener("unload", E.cache.flush, false);
})();


/*
Namespace: The Extend Namespace
	Extend allows you to chain one function after another, and introduces support for helper functions.

About: Version
	1.1.1

	License:
		- Flow is licensed under a Creative Commons Attribution-Share Alike 3.0 License <http://creativecommons.org/licenses/by-sa/3.0/us/>. You are free to share, modify and remix our code as long as you share alike.

Requires:
	- Flow.js.
	- Dom.js.
	- Event.js.
*/
new Flow.Plugin({
	name : "Extend",
	version : "1.1.1",
	bind : true,
	constructor : function() {

		var F = Flow,
		    B = F.Browser,
		    U = F.Utils,
		    X = F.Bind;

		var doc = document,
		    className = "className",
		    zero = null,
		    that;

		return {

			/*
			Interface: Element
				These functions are bound to _elements_.
			*/
			nodes : {

				/*
				Property: addClass
					Adds class name to element

				Parameters:
					elClass - the class to add.

				Example:
					>var foo = document.getElementById("foo");
					>foo.addClass("zomg");
				*/
				addClass : function(elClass) {
					that = this;
					
					var curr = that[className];
					if (!new RegExp(("(^|\\s)" + elClass + "(\\s|$)"), "i").test(curr)) {
						that[className] = curr + ((curr.length > 0) ? " " : "") + elClass;
					}
					return that;
				},

				/*
				Property: removeClass
				 	Removes class name to element

				Parameters:
					elClass - _(optional)_ the class to remove.

				Example:
					>var foo = document.getElementById("foo");
					>foo.removeClass("zomg"); // removes class "zomg"
					>foo.removeClass(); // removes all classes
				*/
				removeClass : function(elClass) {
					that = this;
					
					if (elClass) {
						var classReg = new RegExp(("(^|\\s)" + elClass + "(\\s|$)"), "i");
						that[className] = that[className].replace(classReg, function(e) {
							var value = "";
							if (new RegExp("^\\s+.*\\s+$").test(e)) {
								value = e.replace(/(\s+).+/, "$1");
							}
							return value;
						}).replace(/^\s+|\s+$/g, "");
						
						if (that.getAttribute("class") === "") {
							that.removeAttribute("class");
						}
					} else {
						that[className] = "";
						that.removeAttribute("class");
					}
					return that;
				},

				/*
				Property: replaceClass
				 	Replaces element's class with another one

				Parameters:
					elClass - the class to replace.

				Example:
					>var foo = document.getElementById("foo");
					>foo.replaceClass("zomg", "lolz");
				*/
				replaceClass : function(elClass, elNewClass) {
					that = this;
					
					if (that.hasClass(elClass)) {
						that.removeClass(elClass).addClass(elNewClass);
					}
					
					if (that.getAttribute("class") === "") {
						that.removeAttribute("class");
					}
					
					return that;
				},

				/*
				Property: hasClass
				 	Tests if element has class

				Parameters:
					elClass - the class to test.

				Example:
					>var foo = document.getElementById("foo");
					>if (foo.hasClass("zomg")) {
					>	console.log("lolz");
					>}
				*/
				hasClass : function(elClass) {
					that = this;
					
					return new RegExp(("(^|\\s)" + elClass + "(\\s|$)"), "i").test(that[className]);
				},

				/*
				Property: toggleClass
				 	Toggles a class on/off

				Parameters:
					elClass - the class to toggle.

				Example:
					>var foo = document.getElementById("foo");
					>foo.toggleClass("zomg");
				*/
				toggleClass : function(elClass) {
					that = this;

					that.hasClass(elClass) ? that.removeClass(elClass) : that.addClass(elClass);
					return that;
				},

				/*
				Property: getElementsByAttribute
					Grabs elements By Attribute and optional Value pair

				Shorthand:
					getByAttr

				Parameters:
					elAttribute - the attribute to retrieve.
					elValue - _(optional)_ a matching value pair

				Example:
					>var foo = document.getElementsByAttribute("type", "submit");
					>var foo = document.getByAttr("type", "submit"); // shortcut
				*/
				getElementsByAttribute : function() {

					var reg = /class/;

					// native
					if (doc._getElementsByAttribute) {
						return function(elAttribute, elValue) {
							var that = this;
							var nodes = new U.liveNodeList(that._getElementsByAttribute(elAttribute, elValue));
							return X.extend(nodes);
						};
					}

					// xpath
					if (doc.evaluate) {
						return function(elAttribute, elValue) {
							that = this;
					
							if (reg.test(elAttribute) && elValue) {
								return that.getByClass(elValue);
							}
					
							var xpath, x = 0, node, nodes = [];
							elValue = (elValue == "*") ? null : elValue;
							if (elValue) {
								xpath = U.xpath.contains(elAttribute, elValue, that);
							} else {
								xpath = doc.evaluate(".//*[@" + elAttribute  + "]", that, zero, U.xpath.snapshot, zero);
							}
					
							x = 0;
							while (node = xpath.snapshotItem(x++)) {
								nodes.push(node);
							}
					
							return X.extend(nodes);
						};
					}
					
					// else
					return function(elAttribute, elValue) {
						that = this;
					
						if (reg.test(elAttribute) && elValue) {
							return that.getByClass(elValue);
						}
					
						var nodes = that._getElementsByTagName("*"),
						    i = 0, exists, element, attrArray = [];
					
						while (element = nodes[i++]) {
							if (element.getAttribute) {
								exists = element.getAttribute(elAttribute);
							}
							if (exists && (!elValue || (elValue == "*") || U.match(elValue).test(exists))) {
								attrArray.push(element);
							}
						}
						return X.extend(attrArray);
					};

				}(),

				/*
				Property: insertAfter
					Inserts an element after a specified reference point
					(Honestly, why the heck isn't this spec'd?) <http://developer.mozilla.org/en/docs/DOM:element.insertBefore#Specification>

				Parameters:
					newNode - the node to insert.
					referenceNode - the reference point to insert after

				Example:
					>var foo = document.createElement("div").addClass("foo");
					>foo.insertAfter(foo, document.getById("zomg"));
				*/
				insertAfter : function(newNode, referenceNode) {
					that = this;

					if (that._insertAfter) {
						that._insertAfter(newNode, referenceNode);
					} else {
						// If referenceNode is lastChild of this, just append
						(that.lastChild == referenceNode) ? that.appendChild(newNode) : that.insertBefore(newNode, referenceNode.nextSibling);
					}
				},

				/*
				Property: elementName
					Returns the proper (lowercased) nodeName

				Example:
					>var foo = document.getElementById("foo");
					>console.log(foo.nodeName); // returns "DIV" in some browsers, "div" in others
					>console.log(foo.elementName()); // always returns "div"
				*/
				elementName : function() {
					return this.nodeName.toLowerCase();
				},

				/*
				Property: getFirstChild
					Returns the first child of a parent element

				Parameters:
					childNode - _(optional)_ Filter results by element type

				Example:
					>var foo = document.getElementById("foo");
					>var child = foo.getFirstChild(); // returns first child
					>child = foo.getFirstChild("li"); // returns first li child
				*/
				getFirstChild : function(childNode) {

					that = this;

					if (childNode) {
						var nodeList = that._getElementsByTagName(childNode);
						return (nodeList && nodeList[0]) ? nodeList[0] : null;
					}

					return that.childNodes[0];
				},

				/*
				Property: getLastChild
					Returns the last child of a parent element

				Parameters:
					childNode - _(optional)_ Filter results by element type

				Example:
					>var foo = document.getElementById("foo");
					>var child = foo.getLastChild(); // returns last child
					>child = foo.getLastChild("li"); // returns last li child
				*/
				getLastChild : function(childNode) {

					that = this;

					var nodeList;

					if (childNode) {
						nodeList = that._getElementsByTagName(childNode);
						return (nodeList && nodeList[0]) ? nodeList[nodeList.length - 1] : null;
					}

					nodeList = that.childNodes;
					return nodeList[0] ? nodeList[nodeList.length - 1] : null;
				},

				/*
				Property: hasChildNode
					Tests if element has a specified child node

				Parameters:
					childNode - The specified child node

				Example:
					>var foo = document.getElementById("foo");
					>if (foo.hasChildNode("li")) {
					>	console.log("zomg");
					>}
				*/
				hasChildNode : function(childNode) {
					var nodeList = this._getElementsByTagName(childNode);
					return (nodeList && nodeList[0]) ? true : false;
				},

				/*
				Property: hasParentNode
					Tests if element has a specified parent node

				Parameters:
					parentNode - The specified parent node

				Example:
					>var foo = document.getElementById("foo");
					>if (foo.hasParentNode("body")) {
					>	console.log("zomg");
					>}
				*/
				hasParentNode : function(parentNode) {
					var parent = this.parentNode;

					while (parent.parentNode && (parent.nodeName.toLowerCase() != parentNode)) {
						parent = parent.parentNode;
					}

					if (parent.nodeName.toLowerCase() == parentNode) {
						return X.extend(parent);
					}
					return false;

				},

				/*
				Property: getChildNodes
					Get an element's child nodes

				Parameters:
					parentNode - _(optional)_ Filter results by element type

				Example:
					>var foo = document.getElementById("foo");
					>var children = foo.getChildNodes(); // Returns all child nodes
					>children = foo.getChildNodes("li"); // Returns all child "li" nodes
				*/
				getChildNodes : function(childNode) {
					var nodeList;
					
					if (B.WK && !B.S3) {
						nodeList = [];
						for (var i = 0, j = this.childNodes.length; i < j; i++) {
							nodeList.push(this.childNodes[i]);
						}
					} else {
						nodeList = new U.liveNodeList(this.childNodes);
					}
					
					if (childNode) {
						nodeList = nodeList.filter(function(element) {
							return (element.nodeName.toLowerCase() == childNode);
						});
					}

					return nodeList;
				},

				/*
				Property: getParentNode
					Get an element's parentNode (can be specified)

				Parameters:
					parentNode - _(optional)_ Filter results by element type

				Example:
					>var foo = document.getElementById("foo");
					>var children = foo.getParentNode(); // Returns immediate parentNode
					>children = foo.getChildNodes("div"); // Returns first "div" parent
				*/
				getParentNode : function(parentNode) {
					var parent = this.parentNode;
					if (parentNode) {
						while (parent.parentNode && (parent.nodeName.toLowerCase() != parentNode)) {
							if (parent.nodeName.toLowerCase() == "body") {
								return null;
							}
							parent = parent.parentNode;
						}
					}

					return X.extend(parent);
				},
				
				/*
				Property: removeNode
					Remove an element from the DOM
					http://msdn2.microsoft.com/en-us/library/ms536708.aspx (shock!)

				Example:
					>var foo = document.getElementById("foo");
					>foo.parentNode.removeChild(foo); // The DOM 3 way
					>foo.removeNode(); // faster method
				*/
				removeNode : function() {
					that = this;
					
					if (that._removeNode) {
						that._removeNode();
					} else {
						that.parentNode.removeChild(that);
					}
				},
				
				/*
				Property: getText
					Get an element's text value

				Example:
					>var foo = document.getElementById("foo");
					>var text = foo.getText();
				*/
				getText : function() {
					var child = this.firstChild;
					if (child && child.nodeValue) {
						return this.firstChild.nodeValue;
					}
					return false;
				},
				
				/*
				Property: setText
					Set an element's text value

				Parameters:
					range - _(optional)_ Set a range to replace (can be string or RegExp)
					text - The text to insert

				Example:
					>var foo = document.getElementById("foo");
					>var text = /I are bored/; // can also be a string
					>foo.setText(text, "NOT!");
					>
					>foo.setText("I am so not bored.");
				*/
				setText : function(range, text) {
					var child = this.firstChild;
					
					if (!child) {
						this.appendChild(document.createTextNode(' '));
						child = this.firstChild;
					}

					if (text) {
						child.nodeValue = child.nodeValue.replace(range, text);
					} else {
						child.nodeValue = range;
					}
					
				},
				
				/*
				Property: setOpacity
					Set an element's opacity value

				Parameters:
					value - _(optional)_ The opacity value (1-100 scale)

				Example:
					>var foo = document.getElementById("foo");
					>foo.setOpacity(50); // Set to 50% opaque
				*/
				setOpacity : function(value) {
					var that = this;
					value = parseFloat(value);
					value = (value < 1) ? value : (value / 100);
					if (F.Browser.IE) {
						// Triggering hasLayout for IE (filter prop requires this)
						that.style.zoom = that.style.zoom || 1;
						that.style.filter = "alpha(opacity=" + (value * 100) + ")";
					} else {
						that.style.opacity = value;
					}
				},
				
				/*
				Property: getComputedStyle
					Shortcut for the verbose document.defaultView.getComputedStyle

				Parameters:
					cssProp - The property to retrieve

				Example:
					>var foo = document.getElementById("foo");
					>var width = document.defaultView.getComputedStyle(foo, null).getPropertyValue("width");
					>width = foo.getComputedStyle("width"); // Much shorter
				*/
				getComputedStyle : function(cssProp) {
					var style = document.defaultView.getComputedStyle(this, null);
					if (cssProp) {
						style = style.getPropertyValue(cssProp);
					}
					return style;
				},

				/*
				Property: setStyle
					Shortcut for foo.style[property] = value;

				Parameters:
					cssProp - The property to retrieve
					value - The value to set

				Example:
					>var foo = document.getElementById("foo");
					>foo.setStyle("width", "200px");
					>foo.setStyle({
					>	width : "200px",
					>	opacity : 40,
					>	display : "block"
					>});
				*/
				setStyle : function(cssProp, value) {
					if (cssProp instanceof Object) {
						for (var key in cssProp) {
							this.setStyle(key, U.toCamelCase(cssProp[key]));
						}
					} else if (cssProp && (typeof value !== "undefined")) {
						switch (cssProp) {
							case "opacity" :
							this.setOpacity(value);
							break;
							
							default :
							// if RGB
							if (/rgb/.test(value)) {
								value = (/rgb\(([^\)]+)\)/).exec(value)[1].split(/\, ?/);
								value = U.RGBtoHex(value[0], value[1], value[2]).toLowerCase();
							}
							
							this.style[U.toCamelCase(cssProp)] = value;
							break;
						}
					}
					
					return this;
				},

				/*
				Property: getPosition
					Get an element's current position relative to its parent

				Example:
					>var foo = document.getElementById("foo");
					>var pos = foo.getPosition(); // returns {x, y} coordinates
					>console.log(pos.x, pos.y);
				*/
				getPosition : function() {
					var curleft = this.offsetLeft,
					    curtop = this.offsetTop;
					    element = this;

					/**
					 * @returns an object of the current position {x, y};
					*/
					return {
						x : curleft,
						y : curtop
					};
				},
				
				/*
				Property: getDocumentPosition
					Get an element's current position relative to the document

				Example:
					>var foo = document.getElementById("foo");
					>var pos = foo.getDocumentPosition(); // returns {x, y} coordinates
					>console.log(pos.x, pos.y);
				*/
				getDocumentPosition : function() {
					var curleft = 0,
					    curtop = 0,
					    element = this;
					
					if (element.offsetParent) {

						curleft = element.offsetLeft;
						curtop = element.offsetTop;

						while (element = element.offsetParent) {
							curleft += element.offsetLeft;
							curtop += element.offsetTop;
						}
					}

					/**
					 * @returns an object of the current position {x, y};
					*/
					return {
						x : curleft,
						y : curtop
					};
				},
				
				// Overwriting markup using straight innerHTML will not bind our custom functions to events
				// Using setInnerHTML / getInnerHTML will resolve this issue

				/*
				Property: setInnerHTML
					Set an element's innerHTML

				Parameters:
					markup - The markup to insert
					method - _(optional)_ If defined, append or prepend to element

				Example:
					>var foo = document.getElementById("foo");
					>foo.setInnerHTML("&lt;li&gt;zomg&lt;/li&gt;"); // overrides innerHTML
					>foo.setInnerHTML("&lt;li&gt;lolz&lt;/li&gt;", "append"); // appends HTML to foo
					>foo.setInnerHTML("&lt;li&gt;wtf&lt;/li&gt;&quot;, "prepend"); // prepends HTML to foo
				*/
				setInnerHTML : function(markup, method) {
					/**
					 * @see HTML
					*/
					var dummy = function(markup) {

						// Create a dummy node
						var dummy = doc.createElement("div");

						// Attach our markup to dummy
						dummy.innerHTML = markup;
						U.stripWhitespace(dummy);

						// Use getElementsByTagName to attach functions
						var all = dummy._getElementsByTagName("*"),
						    i = 0;

						while (i < all.length) {
							var element = all[i];
							U.stripWhitespace(element);
							element.DOM = null;
							X.extend(element);
							i++;
						}

						/**
						 * @returns element
						*/
						return dummy;
					}(markup),

					that = this;

					if (!method) {
						// Remove nodes from target
						// While this has child nodes
						while (that.hasChildNodes()) {

							// remove child
							that.removeChild(that.lastChild);
						}
					}
					
					var returnNode = dummy.childNodes;
					if (!returnNode[1]) {
						returnNode = returnNode[0];
					}

					// While dummy has child nodes
					while (dummy.hasChildNodes()) {

						if (method && (/(^pre)|before/).test(method)) {
							// prepend child node to element
							that.insertBefore(dummy.lastChild, that.firstChild);
						} else {
							// append child node to element
							that.appendChild(dummy.firstChild);
						}

					}
					
					return returnNode;
				},

				/*
				Property: getInnerHTML
					Get an element's innerHTML

				Example:
					>var foo = document.getElementById("foo");
					>var inner = foo.getInnerHTML();
					>console.log(inner); // returns foo's innerHTML
				*/
				getInnerHTML : function() {
					return this.innerHTML;
				}
			},

			/*
			Interface: Chaining
				Extend introduces a way to chain getters and setters.

			Example:
				*Chaining getters:*

				Grab all *.zomg* elements inside all *.foo* elements
				>var foo = document.getByClass("foo").getByClass("zomg");

				Let's filter that. Grab all *li.zomg* elements inside all *ul.foo* elements
				(start code)
				var foo = document.getByTag("ul").filter(function(ul) {
					return ul.hasClass("foo");
				}).getByTag("li").filter(function(li) {
					return li.hasClass("zomg");
				});
				(end code)

				*Chaining setters:*

				Grab all *.zomg* elements inside all *ul.foo* elements, add an event listener to each

				(start code)
				var foo = document.getByTag("ul").filter(function(ul) {
					return ul.hasClass("foo");
				}).getByClass("zomg").addEventListener("click", function() {
					console.log(this);
				});
				(end code)

				Grab all *.zomg* elements inside all *ul.foo* elements, add an event listener to each, add classname "done"
				
				(start code)
				var foo = document.getByTag("ul").filter(function(ul) {
					return ul.hasClass("foo");
				}).getByClass("zomg").addEventListener("click", function() {
					console.log(this);
				}).addClass("done");
				(end code)
			*/
			chaining : {}

		};

	}()
});

// Sweet, sweet chainability
Flow.Bind.bind(Array.prototype);

// Don't bind, but set properties...
if (Flow.Dom) {
	Flow.Bind.iterate(Flow.Dom.ie, Array.prototype);
}

/*
Namespace: The Remote Namespace
	All internal references use the Flow namespace.

About: Version
	1.1.1

License:
	- Sergey Ilinsky's cross-browser XHR solution <http://www.ilinsky.com>. Licensed under the Apache License, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>.
	
	- Modified by Richard Herrera <http://doctyper.com>
	
	- Flow is licensed under a Creative Commons Attribution-Share Alike 3.0 License <http://creativecommons.org/licenses/by-sa/3.0/us/>. You are free to share, modify and remix our code as long as you share alike.

Requires:
	Flow.js.
*/

/*
Class: Remote
	These functions are bound to _elements_.

Example:
	(start code)
	var foo = document.getElementById("foo");
	var ani = new Flow.Animate({
		node : foo,
		from : {
			height : 10,
			width : 10
		},
		to : {
			height : 200,
			width : 200
		},
		tween : "Expo.inout"
	}, 1).start();
	(end code)
*/
/*
Property: XMLHttpRequest
	This is the standard XHR call. However, this implementation has a major drawback:
		- Safari 2 and IE 7 do not support overwriting XMLHttpRequest. As such, this functionality is limited to the implementation of those browsers (no flags).

Parameters:
	type - the type of event to bind.
	handler - the event to bind.
	useCapture - turn event bubbling on/off.

Example:
	(start code)
	var req = new XMLHttpRequest();
	req.open("GET", "foo.xml", true);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200 || req.status == 304) {
				console.log(req.responseXML); // req = XHR object
			} else {
				console.log(req.status); // 404'd
			}
		}
	}
	req.send(null);
	(end code)
*/
/*
Property: HttpRequest
	A non-standard property with standards-compliant behavior. Use HttpRequest if you'd like all functionality detailed in the specs. Also contains several helper functions for a drastic reduction in code.

Parameters:
	type - the type of event to bind.
	handler - the event to bind.
	useCapture - turn event bubbling on/off.

Example:
	(start code)
	var req = new HttpRequest();
	req.open("GET", "foo.xml", true);
	req.onsuccess = function() {
		console.log(this.responseXML); // this = XHR object
	}
	req.onerror = function() {
		console.log(this.status); // 404'd
	}
	req.send();
	(end code)
*/
/*
new Flow.Plugin({
	name : "Remote",
	version : "1.1.1",
	constructor : 
	
	// Copyright 2007 Sergey Ilinsky (http://www.ilinsky.com)
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//   http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.

	function () {

		// Save reference to earlier defined object implementation (if any)
		var oXMLHttpRequest = window.XMLHttpRequest;

		// Define on browser type
		var B = Flow.Browser;
		
		var bGecko = B.GK,
		    bIE = B.IE;

		// Constructor
		var cXMLHttpRequest = function() {
			this._object = oXMLHttpRequest ? new oXMLHttpRequest : new window.ActiveXObject('Microsoft.XMLHTTP');
		};

		// BUGFIX: Firefox with Firebug installed would break pages if not executed
		if (bGecko && oXMLHttpRequest.wrapped) {
			cXMLHttpRequest.wrapped = oXMLHttpRequest.wrapped;
		}

		// Constants
		cXMLHttpRequest.UNSENT = 0;
		cXMLHttpRequest.OPENED = 1;
		cXMLHttpRequest.HEADERS_RECEIVED = 2;
		cXMLHttpRequest.LOADING = 3;
		cXMLHttpRequest.DONE = 4;

		// Public Properties
		cXMLHttpRequest.prototype.readyState = cXMLHttpRequest.UNSENT;
		cXMLHttpRequest.prototype.responseText = "";
		cXMLHttpRequest.prototype.responseXML = null;
		cXMLHttpRequest.prototype.status = 0;
		cXMLHttpRequest.prototype.statusText = "";

		// Instance-level Events Handlers
		cXMLHttpRequest.prototype.onreadystatechange = null;

		// Class-level Events Handlers
		cXMLHttpRequest.onreadystatechange = null;
		cXMLHttpRequest.onopen = null;
		cXMLHttpRequest.onsend = null;
		cXMLHttpRequest.onabort = null;
		
		// Custom functions
		cXMLHttpRequest.onsuccess = null;
		cXMLHttpRequest.onerror = null;

		// Public Methods
		cXMLHttpRequest.prototype.open = function(sMethod, sUrl, bAsync, sUser, sPassword) {

			// Save async parameter for fixing Gecko bug with missing readystatechange in synchronous requests
			this._async = bAsync;
			this.url	= sUrl;
			this.async = bAsync;

			if (this.query) {
				var query = (/\?/.test(this.url)) ? "&" : "?",
				    qArray = [];

				for (var i in this.query) {
					if (this.query.hasOwnProperty(i)) {
						qArray.push(i + "=" + this.query[i]);
					}
				}
				sUrl += query + qArray.join("&");
				this.url = sUrl;
			}

			// Set the onreadystatechange handler
			var oRequest = this,
				nState = this.readyState;

			// BUGFIX: IE - memory leak on page unload (inter-page leak)
			if (bIE) {
				var fOnUnload = function() {
					if (oRequest._object.readyState != cXMLHttpRequest.DONE) {
						fCleanTransport(oRequest);
					}
				};
				if (bAsync) {
					window.attachEvent("onunload", fOnUnload);
				}
			}

			this._object.onreadystatechange = function() {
				if (bGecko && !bAsync) {
					return;
				}

				// Synchronize state
				oRequest.readyState = oRequest._object.readyState;

				//
				fSynchronizeValues(oRequest);

				// BUGFIX: Firefox fires unneccesary DONE when aborting
				if (oRequest._aborted) {
					// Reset readyState to UNSENT
					oRequest.readyState = cXMLHttpRequest.UNSENT;

					// Return now
					return;
				}

				if (oRequest.readyState == cXMLHttpRequest.DONE) {
					//
					fCleanTransport(oRequest);
					
					// Uncomment this block if you need a fix for IE cache
	
					// BUGFIX: IE - memory leak in interrupted
					if (bIE && bAsync) {
						window.detachEvent("onunload", fOnUnload);
					}
				}

				// BUGFIX: Some browsers (Internet Explorer, Gecko) fire OPEN readystate twice
				if (nState != oRequest.readyState) {
					fReadyStateChange(oRequest);
				}

				nState = oRequest.readyState;
			};

			// Add method sniffer
			if (cXMLHttpRequest.onopen) {
				cXMLHttpRequest.onopen.apply(this, arguments);
			}

			this._object.open(sMethod, sUrl, bAsync, sUser, sPassword);

			// BUGFIX: Gecko - missing readystatechange calls in synchronous requests
			if (!bAsync && bGecko) {
				this.readyState = cXMLHttpRequest.OPENED;

				fReadyStateChange(this);
			}
		};
		cXMLHttpRequest.prototype.send = function(vData) {
			// Add method sniffer
			if (cXMLHttpRequest.onsend) {
				cXMLHttpRequest.onsend.apply(this, arguments);
			}

			// BUGFIX: Safari - fails sending documents created/modified dynamically, so an explicit serialization required
			// BUGFIX: IE - rewrites any custom mime-type to "text/xml" in case an XMLNode is sent
			// BUGFIX: Gecko - fails sending Element (this is up to the implementation either to standard)
			if (vData && vData.nodeType) {
				vData = window.XMLSerializer ? new window.XMLSerializer().serializeToString(vData) : vData.xml;
				if (!this._headers["Content-Type"]) {
					this._object.setRequestHeader("Content-Type", "application/xml");
				}
			}

			this._object.send(vData);

			// BUGFIX: Gecko - missing readystatechange calls in synchronous requests
			if (bGecko && !this._async) {
				this.readyState = cXMLHttpRequest.OPENED;

				// Synchronize state
				fSynchronizeValues(this);

				// Simulate missing states
				while (this.readyState < cXMLHttpRequest.DONE) {
					this.readyState++;
					fReadyStateChange(this);
					// Check if we are aborted
					if (this._aborted) {
						return;
					}
				}
			}
		};
		cXMLHttpRequest.prototype.abort = function() {
			// Add method sniffer
			if (cXMLHttpRequest.onabort) {
				cXMLHttpRequest.onabort.apply(this, arguments);
			}

			// BUGFIX: Gecko - unneccesary DONE when aborting
			if (this.readyState > cXMLHttpRequest.UNSENT) {
				this._aborted = true;
			}

			this._object.abort();

			// BUGFIX: IE - memory leak
			fCleanTransport(this);
		};

		// Custom functions
		cXMLHttpRequest.prototype.setquery = function(name, value) {
			var that = this;

			that.query = that.query || {};
			if (typeof name === "object") {
				for (var i in name) {
					if (name.hasOwnProperty(i)) {
						that.query[i] = name[i];
					}
				}
			} else {
				that.query[name] = value;
			}
		};
		
		cXMLHttpRequest.prototype.addEventListener = function(type, event) {
			return cXMLHttpRequest.prototype["on" + type] = event;
		};
		
		cXMLHttpRequest.prototype.getAllResponseHeaders = function() {
			return this._object.getAllResponseHeaders();
		};
		cXMLHttpRequest.prototype.getResponseHeader = function(sName) {
			return this._object.getResponseHeader(sName);
		};
		cXMLHttpRequest.prototype.setRequestHeader = function(sName, sValue) {
			// BUGFIX: IE - cache issue
			if (!this._headers) {
				this._headers = {};
			}
			this._headers[sName] = sValue;

			return this._object.setRequestHeader(sName, sValue);
		};
		cXMLHttpRequest.prototype.toString = function() {
			return '[' + "object" + ' ' + "XMLHttpRequest" + ']';
		};
		cXMLHttpRequest.toString = function() {
			return '[' + "XMLHttpRequest" + ']';
		};

		// Helper function
		var fReadyStateChange = function(oRequest) {
			// Execute onreadystatechange
			if (oRequest.onreadystatechange) {
				oRequest.onreadystatechange.apply(oRequest);
			}

			// Sniffing code
			if (cXMLHttpRequest.onreadystatechange) {
				cXMLHttpRequest.onreadystatechange.apply(oRequest);
			}

			// Custom functions
			if (oRequest.readyState == cXMLHttpRequest.DONE) {
				// Execute onsuccess
				if (oRequest.onsuccess && (oRequest.status == 200 || oRequest.status == 304)) {
					oRequest.onsuccess.apply(oRequest);
				}
				// Execute onerror
				if (oRequest.onerror && oRequest.status == 404) {
					oRequest.onerror.apply(oRequest);
				}
			}
		};

		var fGetDocument = function(oRequest) {
			var oDocument = oRequest.responseXML;
			// Try parsing responseText
			if (bIE && oDocument && !oDocument.documentElement && oRequest.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) {
				oDocument = new ActiveXObject('Microsoft.XMLDOM');
				oDocument.loadXML(oRequest.responseText);
			}
			// Check if there is no error in document
			if (oDocument) {
				if ((bIE && oDocument.parseError !== 0) || (oDocument.documentElement && oDocument.documentElement.tagName == "parsererror")) {
					return null;
				}
			}
			return oDocument;
		};

		var fSynchronizeValues = function(oRequest) {
			try {
				oRequest.responseText = oRequest._object.responseText;
			} catch (e) {}
			
			try {
				oRequest.responseXML = fGetDocument(oRequest._object);
			} catch (e) {}
			
			try {
				oRequest.status = oRequest._object.status;
			} catch (e) {}
			
			try {
				oRequest.statusText = oRequest._object.statusText;
			} catch (e) {}
		};

		var fCleanTransport = function(oRequest) {
			// BUGFIX: IE - memory leak (on-page leak)
			oRequest._object.onreadystatechange = new window.Function;

			// Delete private properties
			delete oRequest._headers;
		};

		// Register new object with window
		window.XMLHttpRequest = window.HttpRequest = cXMLHttpRequest;
	}()
	
});
*/

/*
Namespace: The Viewport Namespace
	Viewport includes window and screen dimension reporting, window position and popup functions.

About: Version
	1.1.1

License:
	- Created by Michael Bester <http://kimili.com>. Released to the public domain.
	
	- Flow is licensed under a Creative Commons Attribution-Share Alike 3.0 License <http://creativecommons.org/licenses/by-sa/3.0/us/>. You are free to share, modify and remix our code as long as you share alike.

Requires:
	Flow.js.
*/

new Flow.Plugin({
	name : "Viewport",
	version : "1.1.1",
	constructor : function() {
		var doc = document,
		    body = "body",
		    docElement = "documentElement",
		    win = window;

		return {
			/**
			 *	getSize()
			 *	Cross-browser script to get the current size of the browser win without chrome in pixels.
			 * 
			 *	@returns {Object} Contains the height and width of a user's win in a JSON object, like so: { w : 820, h : 600 }
			**/
			getSize : function() {
				var size = {};
				if (Flow.Browser.WK) {
					size.w = self.innerWidth;
					size.h = self.innerHeight;
				} else if (Flow.Browser.OP) {
					size.w = doc[body].clientWidth;
					size.h = doc[body].clientHeight;
				} else {
					size.w = doc[docElement].clientWidth;
					size.h = doc[docElement].clientHeight;
				}
				return size;
			},

			/**
			 *	getScreenSize()
			 *	Allows you to get the size of a user's screen in pixels.
			 * 
			 *	@returns {Object} Contains the height and width of a users screen in a JSON object, like so: { w : 1024, h : 768 }
			**/
			getScreenSize : function() { 
				return {
					w : (typeof self.screen.availWidth !== "undefined") ? self.screen.availWidth : self.screen.width,
					h : (typeof self.screen.availHeight !== "undefined") ? self.screen.availHeight : self.screen.height
				};
			},

			/**
			 *	getOuterSize()
			 *	Gets the size of the browser win including chrome in pixels if available.
			 * 
			 *	@returns {Object} Contains the height and width of a users width in a JSON object, like so: { w : 1024, h : 768 } or { w : null, h : null }
			**/
			getOuterSize : function() {
				return {
					w : (typeof self.outerWidth !== "undefined") ? self.outerWidth : null,
					h : (typeof self.outerHeight !== "undefined") ? self.outerHeight : null
				};	
			},

			/**
			 *	getScrollOffset()
			 *	Gets the amount the win has been scrolled, both horozontally and vertically, from the top left corner.
			 * 
			 *	@returns {Object} Contains the horozontal (x) and vertical (y) scroll offsets in a JSON object, like so: { x : 0, y : 120 }
			**/
			getScrollOffset : function() {
				var scroll = {};
				if (Flow.Browser.IE) {
					scroll.x = doc[docElement].scrollLeft;
					scroll.y = doc[docElement].scrollTop;				
				} else if (Flow.Browser.WK) {	
					scroll.x = doc[body].scrollLeft;
					scroll.y = doc[body].scrollTop;
				} else {
					scroll.x = self.pageXOffset;
					scroll.y = self.pageYOffset;
				}
				return scroll;
			},

			/**
			 *	getScrollSize()
			 *	Gets the the total horizontal and vertical scroll sizes
			 * 
			 *	@returns {Object} Contains the horozontal (w) and vertical (h) scroll sizes in a JSON object, like so: { w : 850, h : 1162 }
			**/
			getScrollSize : function() {
				var size = {};
				if (Flow.Browser.IE) {
					size.w = Math.max(doc[docElement].offsetWidth, doc[docElement].scrollWidth);
					size.h = Math.max(doc[docElement].offsetHeight, doc[docElement].scrollHeight);				
				} else if (Flow.Browser.WK) {	
					size.w = doc[body].scrollWidth;
					size.h = doc[body].scrollHeight;
				} else {
					size.w = doc[docElement].scrollWidth;
					size.h = doc[docElement].scrollHeight;
				}
				return size;
			},

			/**
			 *	getPosition()
			 *	Gets the position of the current browser win on the user's screen, measured from the top left corner.
			 * 
			 *	@returns {Object} Contains the horozontal (x) and vertical (y) win coordinates in a JSON object, like so: { x : 210, y : 50 }
			**/
			getPosition : function() {
				return {
					x : (typeof win.screenX !== "undefined") ? win.screenX : win.screenTop,
					y : (typeof win.screenY !== "undefined") ? win.screenY : win.screenLeft
				};
			},

			/**
			 *	getMousePosition()
			 *	Gets the coordinates of the users cursor in the browser win, measured from the top left corner.
			 * 
			 *	@returns {Object} Contains the horozontal (x) and vertical (y) cursor coordinates in a JSON object, like so: { x : 210, y : 50 }
			**/		
			getMousePosition : function(e) {
				var pos = {};
				
				e = e || win.event;

				if ((typeof e.pageX !== "undefined") || (typeof e.pageY !== "undefined")) {
					pos.x = e.pageX;
					pos.y = e.pageY;
				} else if (e.clientX || e.clientY) {
					pos.x = e.clientX + doc[body].scrollLeft + doc[docElement].scrollLeft;
					pos.y = e.clientY + doc[body].scrollTop + doc[docElement].scrollTop;
				}
				return pos;
			},

			/**
			 *	popup()
			 *	Generic popup win generator.
			 *
			 *	@param url {String} The url you want to load in the new win.
			 *	@param options {Object} A JSON object with the win options you want.  Available parameters for the options object are (defaults in parenthesis): width (600), height (400), scrollbars (true), resizable (true), left (horizontally centers win on screen), top (vertically centers win on screen), toolbar (false), location (false), status (false), name ("popup").
			 * 
			 *	@returns {Object} A reference to the newly created popup win.
			 *
			 *	@example var myWin = Flow.Window.popup("http://www.google.com", { height: 600, location: true });
			**/
			popup : function(url) {

				if (!url || url === "") {
					return;
				}

				var options, name, newWin, scr, config = "", opt;

				options = {
					width : 600, 
					height : 400, 
					scrollbars : 1, 
					resizable: 1,
					toolbar : 0,
					location : 0,
					status : 0,
					name : "popup"
				};

				if (arguments.length > 1) {
					if (typeof arguments[1] === "object") {
						for (opt in arguments[1]) {
							if (arguments[1].hasOwnProperty(opt)) {
								options[opt] = arguments[1][opt];
							}
						}
					}
				}

				/*
				 * If top or left not set, center the win
				**/

				scr = Flow.Viewport.getSize();

				if (typeof options.left == "undefined") {
					options.left = (scr.w / 2 - options.width / 2);
				}
				if (typeof options.top == "undefined") {
					options.top	= (scr.h / 2 - options.height / 2);
				}

				/*
				 * Build options string
				**/
				for (opt in options) {
					if (options.hasOwnProperty(opt)) {
						if (opt === 'name') {
							name = options[opt];
						} else {
							if ((typeof options[opt] === 'number' || typeof options[opt] === 'boolean') && (opt !== 'height' && opt !== 'width' && opt !== 'top' && opt !== 'left') ) {
								options[opt] = (Number(options[opt]) === 0) ? 'no' : 'yes';
							}
							config += (opt + "=" + options[opt] + ",");
						}
					}
				}
				
				newWin = window.open(url, name, config.replace(/\,$/,''));			
				if (newWin) {
					newWin.focus();
				}

				/* return newWin; */
			}
		};

	}()
});
