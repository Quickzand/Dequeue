function updateSettingsData(data) {
  localStorage.setItem('settings', JSON.stringify(data))
}

function getSettingsData() {

  var userData = JSON.parse(localStorage.getItem('settings'));
  if (userData !== null) {
    return userData;
  }
}


function activatePopupWindow() {
  $('#popUpPage').addClass("active");
  $("#pageBlackout").addClass("active")
  bodyScrollLock.disableBodyScroll(document.getElementsByClassName("scrollable"));
}

function deactivatePopupWindow() {
  $('#popUpPage').removeClass("active");
  $("#pageBlackout").removeClass("active")
  // bodyScrollLock.enableBodyScroll(document.body);
  // bodyScrollLock.clearAllBodyScrollLocks();
}

async function checkKey(key) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      if (xhttp.responseText == "API key does not exist!") console.log(false);
      console.log(true);
    }
  };
  xhttp.open("GET", "https://itsokayboomer.com/dequeue/dequeue.php?api=" + key);
  xhttp.send();
}





var rightGestureListener;
var leftGestureListener;
var popupWindowGestureListener;

// Adds swipe event listeners
setTimeout(function() {
  rightGestureListener = new Hammer(document.getElementById('rightSwipeDetection'))
  leftGestureListener = new Hammer(document.getElementById('leftSwipeDetection'))
  popupWindowGestureListener = new Hammer(document.getElementById('popUpPage'))
  rightGestureListener.on('swipe', function(ev) {
    if (ev.velocityX < 0) {
      swipeRight()
    }
  });

  leftGestureListener.on('swipe', function(ev) {
    if (ev.velocityX > 0) {
      swipeLeft()
    }
  })


  popupWindowGestureListener.on('pan', function(ev) {
    if (ev.direction == Hammer.DIRECTION_DOWN) {
      deactivatePopupWindow();
    }
  })
}, 200)

// bodyScrollLock.disableBodyScroll(document.getElementsByClassName("scrollable"));


// checkKey("beaned").then(res => {
//   console.log(res)
// })