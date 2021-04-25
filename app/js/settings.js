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



updateApiKeyField();


$("#apiKeyInput").change(function(e) {
  setApiKey($("#apiKeyInput").val())
})