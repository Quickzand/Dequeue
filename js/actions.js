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
  var addActionButton = $("#addActionButton");
  var temp = $("<div></div>");
  temp.text(action.actionName);
  temp.css("background-color", action.actionColor);
  temp.addClass("actionButton");
  temp.attr("data-scriptName", action.scriptName)
  temp.insertBefore(addActionButton)
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

clearNewActionInputs();
loadSavedActions();