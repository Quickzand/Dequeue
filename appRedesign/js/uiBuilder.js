class smallNavButton {
  constructor(buttonIcon, callback, isHidden, data) {
    this.element = $("<div></div>")
    this.element.addClass("smallNavButton")
    this.element.text("test")
    this.data = data
    $("body").append(this.element)
  }
}