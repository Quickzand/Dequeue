function toggleNavGroup() {
  $(".smallNavButtonGroup").toggleClass("open").toggleClass("closed")
  console.log("test")
}

// Sends request post request to server
function sendRequest(input) {
  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/api/v1/user", true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      console.log(request.responseText);
    }
  };
  request.send(input);
}