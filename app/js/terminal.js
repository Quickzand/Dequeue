var term = new Terminal({
  cursorBlink: "block",
  theme: {
    background: "transparent"
  },
  allowTransparency: true
});
var curr_line = "";
var entries = [];
term.open(document.getElementById('terminal'));
newLine("")

$("#terminalContainer").draggable({
  "axis": "x",
  containment: "parent",
  stop: function(event, ui) {
    console.log(ui);
    if (ui.offset.left < 100) {
      $("#terminalContainer").css({
        left: '0px'
      })
    } else {
      closeTerminal();
    }
  }
})


function openTerminal() {
  $("#terminalDraggingBounds").addClass("active")
  $("#terminalContainer").css({
    left: '0px'
  })
  $(".xterm-helper-textarea").focus()
}

function closeTerminal() {
  $("#terminalDraggingBounds").removeClass("active")
  $(".xterm-helper-textarea").blur()
}


term.onKey((key) => {
  switch (key.domEvent.keyCode) {
    //Backspace
    case 8:
      if (curr_line) {
        curr_line = curr_line.slice(0, curr_line.length - 1);
        term.write("\b \b")
      }
      break;
      //Enter
    case 13:
      if (curr_line) {
        newLine(curr_line)
        curr_line = ""
      }
      break;
      // Normal characters
    default:
      curr_line += key.key;
      term.write(key.key)
  }
});


function newLine(currentLine) {
  console.log(currentLine)
  term.write("\r\n")
  term.write("$")
}