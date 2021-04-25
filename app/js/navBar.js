var currentTab = 1;

function changeTab(changeTo) {
  currentTab = changeTo;
  try {
    document.querySelector(".navButtonContainer.selected").classList.remove("selected");
  } catch {
    console.log("There was no pre-selected tab, going to go to this tab baby");
  }
  document.getElementsByClassName("navButtonContainer")[changeTo - 1].classList.add("selected");
  document.getElementById("pageBody").style.transform = "translateX(" + (-100 * (changeTo - 1)) + "vw)";
  updateTabData({
    location: changeTo
  });

}



function changeTabWithoutAnimation(changeTo) {
  var pBody = document.getElementById("pageBody");
  pBody.classList.add("notransition");
  changeTab(changeTo)
  setTimeout(function() {
    pBody.classList.remove("notransition")
    console.log("AM HERE")
  }, 30)

}



function updateTabData(data) {
  if (true) {
    localStorage.setItem('tab', JSON.stringify(data))
  }
}

function getTabData() {
  if (true) {
    var userData = JSON.parse(localStorage.getItem('tab'));
    if (userData !== null) {
      return userData;
    }
  }
}

function swipeRight() {
  currentTab += 1;
  if (currentTab > 3) currentTab = 1;
  changeTab(currentTab);
}

function swipeLeft() {
  currentTab -= 1;
  if (currentTab < 1) currentTab = 3;
  changeTab(currentTab);
}



var cachedTab = getTabData();
changeTabWithoutAnimation(cachedTab.location);