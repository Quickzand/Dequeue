function updateSettingsData(data) {
  localStorage.setItem('settings', JSON.stringify(data))
}

function getSettingsData() {
  var userData = JSON.parse(localStorage.getItem('settings'));
  if (userData !== null) {
    return userData;
  } else return {};
}



function setApiKey(key) {
  checkKey(key, setApiKeyCallback)
}

function setApiKeyCallback(keyExists, key) {
  console.log(keyExists)
  if (keyExists) {
    var settings = getSettingsData()
    settings.apiKey = key;
    $("#apiKeyInput").removeClass("invalid")
    updateSettingsData(settings)
  } else {
    console.log("Please input a valid key")
    displayErrorMessage("Key Does Not Exist");
    $("#apiKeyInput").addClass("invalid")
  }
}


// Updates the input field for the api key
function updateApiKeyField() {
  var apiKey = getSettingsData().apiKey || ""
  $("#apiKeyInput").val(apiKey)
}


function newSettingWidgetButton(title, icon, onClickAction, settings) {
  settings.onClick = onClickAction;
  var newWidget = widgetBuilder(title, icon, null, settings)
  newWidget.addClass("button")
  $("#settingsList").append(newWidget)
}


function newSettingWidgetTextInput(title, icon, input, settings) {
  var newWidget = widgetBuilder(title, icon, input, settings).addClass("textInput")
  $("#settingsList").append(newWidget)
}

function newSettingWidgetText(title, icon, bodyText, settings) {
  var newWidget = widgetBuilder(title, icon, bodyText, settings).addClass("textInput")
  $("#settingsList").append(newWidget);
}

function newSettingWidgetList(title, icon, list, settings) {
  var widgetList = $("<div></div>").addClass("widgetList")
  for (var i in list) {
    widgetList.append($("<div></div>").addClass("listItem").append(list[i]))
  }
  var newWidget = widgetBuilder(title, icon, widgetList, settings).addClass("list")
  $("#settingsList").append(newWidget);
  if (settings.callback) settings.callback();
}


// THIS IS THE FUNCTION TO RUN TO PUT NEW SETTING IN THE DOM
function newSettingWidget(settings) {
  settings = settings ? settings : {}
  switch (settings.type) {
    case "button":
      newSettingWidgetButton(settings.title, settings.icon, settings.onClick, settings)
      break;
    case "textInput":
      newSettingWidgetTextInput(settings.title, settings.icon, settings.body, settings)
      break;
    case "text":
      newSettingWidgetText(settings.title, settings.icon, settings.body, settings)
      break;
    case "list":
      newSettingWidgetList(settings.title, settings.icon, settings.body, settings)
      break;
  }
}


function backgroundListItemConstructor() {

}

// Function used to construct widgets
function widgetBuilder(title, icon, body, settings) {
  settings = settings ? settings : {}
  var newWidget = $("<div></div>").addClass("widget")
  var widgetHeader = $("<div></div>").addClass("widgetHeader")
  var widgetTitle = $("<div></div>").addClass("widgetTitle").text(title)
  var widgetIcon = $("<div></div>").addClass("widgetIcon").append(icon)
  if (body) {
    var widgetBody = $("<div></div>").addClass("widgetBody").append(body)
  }
  widgetHeader.append(widgetIcon);
  widgetHeader.append(widgetTitle);
  newWidget.append(widgetHeader);
  newWidget.append(widgetBody);
  newWidget.attr("id", settings.id)
  newWidget.click(new Function(settings.onClick))
  return newWidget
}


// Gets default settings data from server
function getSettings(callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var settingsData = JSON.parse(this.responseText);
      if (callback) callback(settingsData)
    }
  };
  xmlhttp.open("GET", "tabs/settings.json", true);
  xmlhttp.send();
}


// Loads in the settings
function loadSettings(settingsData) {
  for (var i in settingsData.widgets) {
    newSettingWidget(settingsData.widgets[i])
  }
  var storedBackground = localStorage.getItem("background");
  $(".backgroundButton").each(function(index) {
    if ($(this).attr("data-background") == storedBackground && storedBackground) {
      setBackground(this)
    }
  })

}


getSettings(loadSettings);

//TODO FINISH BACKGROUND CODE
function setBackground(backgroundElement) {
  var backgroundElement = $(backgroundElement);
  $("#backgroundList .listItem div.active").removeClass("active");
  backgroundElement.addClass("active");
  var newBackground = backgroundElement.attr("data-background");
  document.documentElement.style.setProperty('--background', newBackground);
  document.documentElement.style.setProperty('--background-blend-mode', backgroundElement.attr("data-background-blend-mode"));
  localStorage.setItem("background", newBackground)
}





updateApiKeyField();


$("#apiKeyInput").change(function(e) {
  setApiKey($("#apiKeyInput").val())
})