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
  document.getElementById('popUpPage').classList.add("active");

}

function deactivatePopupWindow() {
  document.getElementById('popUpPage').classList.remove("active");
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



bodyScrollLock.disableBodyScroll(document.body);