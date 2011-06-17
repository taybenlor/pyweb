window.pageLoaded = function(){
  doRun(); //Do our initial checks
  console.log('hi?');
  var run_button = document.getElementById("run");
  var input_area = document.getElementById("the_input");
  run_button.addEventListener("click", function(){
    console.log('hi');
    execute(input_area.value);
  });
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

  var element = document.getElementById('the_output');
  if (!element) 
    return; // perhaps during startup

  var ptr = window.Module.Pointer_make(window.Module.intArrayFromString(text), 0, 2); // leak!
  try {
    window.Module._PyRun_SimpleStringFlags(ptr, 0);
  } 
  catch(e) {
    if (e === 'halting, since this is the first run') return;
    element.innerHTML = 'JS crash: |<b>' + e + '</b>|. Please let us know about this problem!<hr>' + element.innerHTML;
    return;
  }

  if (printed) {
    var lines_html = "";
    for(var i = 0; i < lines.length; i++){
      lines_html += lines[i].replace("<","&lt;", "g") + "<br>"
    }
    lines_html += "<hr>"
    element.innerHTML = lines_html + element.innerHTML;
  } 
  else {
    element.innerHTML = '<small><i>(no output)</i></small><hr>' + element.innerHTML;
  }
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