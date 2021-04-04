var currentBackground = null;

function getBackgroundData() {
  var userData = JSON.parse(localStorage.getItem('background'));
  if (userData !== null) {
    return userData;
  }
}

function updateBackgroundData(data) {
  localStorage.setItem('background', JSON.stringify(data))
}

function removeBackground() {
  updateBackgroundData(backgroundJson = {
    fileURL: null
  });
  setBackground();
  document.getElementsByClassName("listOption selected")[0].classList.remove("selected")
}

function setBackground() {
  document.body.style.backgroundImage = getBackgroundData().fileURL;
  setBgRotation(45, getBackgroundData().fileURL)
  setRemoveBackgroundButton();
}




function setRemoveBackgroundButton() {
  var temp = document.body.style.backgroundImage
  if (temp.includes("null") || temp == "") document.getElementById('removeBackground').style.display = "none";
  else document.getElementById('removeBackground').style.display = "flex";
}

function setPresetBackground(bg) {
  try {
    document.getElementsByClassName("listOption selected")[0].classList.remove("selected")
  } catch (e) {

  }
  document.body.style.backgroundImage = bg.getAttribute("data-bg");
  setBgRotation(45, bg.getAttribute("data-bg"));
  bg.classList.add("selected");
  updateBackgroundData(backgroundJson = {
    fileURL: bg.getAttribute("data-bg")
  });
  setRemoveBackgroundButton();
}

function setBgRotation(deg, bg) {
  if (bg != null) {
    document.body.style.backgroundImage = bg.replace("DEG", deg + "deg");
  }

}



setBackground()
setRemoveBackgroundButton();