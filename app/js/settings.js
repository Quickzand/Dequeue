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
  settings = settings ? settings : {}
  settings.onClickAction = onClickAction;
  var newWidget = widgetBuilder(title, icon, null, settings)
  newWidget.addClass("button")
  $("#settingsList").append(newWidget)
  console.log(settings)
}


function newSettingWidgetTextInput(title, icon, input, settings) {
  var newWidget = widgetBuilder(title, icon, input, settings).addClass("textInput")
  $("#settingsList").append(newWidget)
}

function newSettingWidgetText(title, icon, bodyText, settings) {
  var newWidget = widgetBuilder(title, icon, bodyText, settings).addClass("textInput")
  $("#settingsList").append(newWidget);
}


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
  newWidget.click(settings.onClickAction)
  return newWidget
}

newSettingWidgetText("Dequeue", null, "Beta 1.0.0", {
  "id": "versionNumber"
})

newSettingWidgetTextInput("Computer Key", null, '<input type="text" name="" id="apiKeyInput" placeholder="1111">')


newSettingWidgetButton("Feedback", '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 57 57" style="enable-background:new 0 0 57 57;" xml:space="preserve"> <g> <path d="M52,3c-2.757,0-5,2.243-5,5v2.268L7.964,22.645C7.781,20.607,6.084,19,4,19c-2.206,0-4,1.794-4,4v11c0,2.206,1.794,4,4,4 c2.084,0,3.781-1.607,3.964-3.645l3.207,1.017c-0.437,0.437-0.776,0.978-0.976,1.595c-0.328,1.014-0.241,2.097,0.246,3.051 c0.486,0.954,1.313,1.66,2.326,1.987l14.27,4.623c0.397,0.129,0.811,0.194,1.227,0.194c1.744,0,3.275-1.112,3.812-2.767 c0.139-0.429,0.124-1.295,0.059-2.037L47,46.732V49c0,2.757,2.243,5,5,5s5-2.243,5-5V8C57,5.243,54.757,3,52,3z M30.173,43.439 c-0.327,1.011-1.493,1.617-2.519,1.287l-14.271-4.623c-0.505-0.164-0.918-0.517-1.161-0.995c-0.244-0.478-0.289-1.019-0.125-1.523 c0.248-0.766,0.963-1.298,1.763-1.36l15.213,4.823c0.318,0.202,0.816,0.557,0.974,0.867C30.292,42.393,30.337,42.934,30.173,43.439 z" /> </g> </svg>')

newSettingWidgetButton("Refresh", '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 487.23 487.23" style="enable-background:new 0 0 487.23 487.23;" xml:space="preserve"> <g> <g> <path d="M55.323,203.641c15.664,0,29.813-9.405,35.872-23.854c25.017-59.604,83.842-101.61,152.42-101.61 c37.797,0,72.449,12.955,100.23,34.442l-21.775,3.371c-7.438,1.153-13.224,7.054-14.232,14.512 c-1.01,7.454,3.008,14.686,9.867,17.768l119.746,53.872c5.249,2.357,11.33,1.904,16.168-1.205 c4.83-3.114,7.764-8.458,7.796-14.208l0.621-131.943c0.042-7.506-4.851-14.144-12.024-16.332 c-7.185-2.188-14.947,0.589-19.104,6.837l-16.505,24.805C370.398,26.778,310.1,0,243.615,0C142.806,0,56.133,61.562,19.167,149.06 c-5.134,12.128-3.84,26.015,3.429,36.987C29.865,197.023,42.152,203.641,55.323,203.641z" /> <path d="M464.635,301.184c-7.27-10.977-19.558-17.594-32.728-17.594c-15.664,0-29.813,9.405-35.872,23.854 c-25.018,59.604-83.843,101.61-152.42,101.61c-37.798,0-72.45-12.955-100.232-34.442l21.776-3.369 c7.437-1.153,13.223-7.055,14.233-14.514c1.009-7.453-3.008-14.686-9.867-17.768L49.779,285.089 c-5.25-2.356-11.33-1.905-16.169,1.205c-4.829,3.114-7.764,8.458-7.795,14.207l-0.622,131.943 c-0.042,7.506,4.85,14.144,12.024,16.332c7.185,2.188,14.948-0.59,19.104-6.839l16.505-24.805 c44.004,43.32,104.303,70.098,170.788,70.098c100.811,0,187.481-61.561,224.446-149.059 C473.197,326.043,471.903,312.157,464.635,301.184z" /> </g> </g> </svg>', function() {
  location.reload(true);
})






updateApiKeyField();


$("#apiKeyInput").change(function(e) {
  setApiKey($("#apiKeyInput").val())
})