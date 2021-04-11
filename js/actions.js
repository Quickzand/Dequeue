function createNewAction() {
  var actionName = $("input[name='actionName']").val();
  var scriptName = $("input[name='scriptName']").val();
  var actionColor = $("input[name='actionColor']").val();

  var newAction = {
    actionName,
    scriptName,
    actionColor
  }
  clearNewActionInputs();
  deactivatePopupWindow();
  saveAction(newAction);
  addActionToPage(newAction)
}


function clearNewActionInputs() {
  $("input[name='actionName']").val(null);
  $("input[name='scriptName']").val(null);
  $("input[name='actionColor']").val("#6666ff");
}

function getActions() {
  var actions = JSON.parse(localStorage.getItem('actions'));
  if (actions != null) actions = actions.actions
  else actions = []
  return actions;
}



function saveAction(action) {
  var actions = getActions();
  actions.push(action);
  console.log("TEST")
  console.log(JSON.stringify({
    actions
  }))
  localStorage.setItem('actions', JSON.stringify({
    actions
  }))
}

function addActionToPage(action) {
  var colorTemp = hexToRgb(action.actionColor);
  var bgColor = "rgba(" + colorTemp.r + "," + colorTemp.g + "," + colorTemp.b + ", 0.25)"
  var addActionButton = $("#addActionButton");
  var temp = $("<div></div>");
  temp.addClass("actionButton");
  temp.attr("data-scriptName", action.scriptName)
  temp.css("background-color", bgColor);
  $("#newestAction").removeAttr("id")
  temp.attr("id", "newestAction")
  var tempBg = $("<div></div>");
  tempBg.addClass("actionButtonBg")
  var tempText = $("<div></div>");
  tempText.text(action.actionName);
  temp.append(tempBg);
  temp.prepend(tempText)
  temp.insertBefore(addActionButton)
  var mc = new Hammer.Manager(document.getElementById("newestAction"));
  mc.add(new Hammer.Press({
    time: 750
  }))
  mc.on('press', function(ev) {
    enterEditMode();
  })
}


function loadSavedActions() {
  var actions = getActions();
  actions.forEach((x) => {
    addActionToPage(x)
  })
}


function runAction(scriptName) {
  console.log("Running script " + scriptName + "...")
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function enterEditMode() {
  $(".actionButton").addClass("editMode");
}



clearNewActionInputs();
loadSavedActions();