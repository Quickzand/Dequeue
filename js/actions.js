$.fn.extend({
  disableSelection: function() {
    this.each(function() {
      this.onselectstart = function() {
        return false;
      };
      this.unselectable = "on";
      $(this).css('-moz-user-select', 'none');
      $(this).css('-webkit-user-select', 'none');
    });
    return this;
  }
});

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


function removeAction(actionName) {
  var actions = getActions();
  for (var i in actions) {
    if (actions[i].actionName == actionName) {
      actions.splice(i, 1);
    }
  }
  localStorage.setItem('actions', JSON.stringify({
    actions
  }))

}

function addActionToPage(action) {
  //Creation of the action button DOM element
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
  temp.click(function() {
    actionHandler(temp);
  })
  temp.disableSelection();
  //Detection of hold press on the element
  temp.data("actionName", action.actionName)
  temp.data("scriptName", action.scriptName)

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

function actionHandler(actionElement) {
  // Deletes element if in edit mode
  if (actionElement.hasClass("editMode")) {
    if (confirm('Are you sure you want to delete "' + actionElement.data("actionName") + '"?')) {
      removeAction(actionElement.data("actionName"));
      actionElement.remove()
    }
  } else {
    runAction(actionElement.data("scriptName"))
  }
}


function runAction(scriptName) {
  var key = "beaned"
  console.log("Running script " + scriptName + "...")
  var xhttp = new XMLHttpRequest();
  var temp = {
    "command": "run " + scriptName
  }
  var contents = {
    "api": key,
    "contents": {
      "command": "run " + scriptName
    }
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      console.log(xhttp.responseText)
    }
  };
  xhttp.open("POST", "https://itsokayboomer.com/dequeue/dequeue.php", true);
  // xhttp.setRequestHeader('Content-Type', 'json');
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("api=" + key + "&contents=" + JSON.stringify(temp));
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

function exitEditMode() {
  $(".actionButton").removeClass("editMode");
}

$("*").disableSelection()


clearNewActionInputs();
loadSavedActions();


// runAction("touch children.txt")