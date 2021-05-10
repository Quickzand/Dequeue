function activatePopupWindow() {
  $('#popUpPage').addClass("active");
  $("#pageBlackout").addClass("active")
  // bodyScrollLock.disableBodyScroll(document.getElementsByClassName("scrollable"));
}

function deactivatePopupWindow() {
  $('#popUpPage').removeClass("active");
  $("#pageBlackout").removeClass("active")

}

async function checkKey(key, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      if (xhttp.responseText.includes("API key does not exist")) {
        callback(false, key);
      } else {
        callback(true, key)
      }
    }
  };
  xhttp.open("GET", "https://itsokayboomer.com/dequeue/dequeue.php?api=" + key);
  xhttp.send();
}









function displayErrorMessage(text) {
  $("#errorMessage").text(text)
  $("#errorMessage").addClass("shown")
  setTimeout(function() {
    $("#errorMessage").removeClass("shown")
  }, 2500)
}

function displayInfoMessage(text, time) {
  var time = time | 2500
  $("#notifMessage").text(text)
  $("#notifMessage").addClass("shown")
  setTimeout(function() {
    $("#notifMessage").removeClass("shown")
  }, time)
}