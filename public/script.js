const socket = io()
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
const color = document.querySelector("input")
context.lineCap = "round"
context.lineWidth = 8

color.addEventListener("input", () => {
  context.strokeStyle = color.value
})
canvas.onmousemove = function drawIfPressed(e) {
  const x = e.offsetX
  const y = e.offsetY
  const dx = e.movementX
  const dy = e.movementY
  if (e.buttons > 0) {
    socket.emit("draw_line", { x, y, dx, dy })
    draw(x, y, dx, dy)
  }
}
socket.on("draw_line", (msg) => {
  draw(msg.x, msg.y, msg.dx, msg.dy)
})

function draw(x, y, dx, dy) {
  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x - dx, y - dy)
  context.stroke()
  context.closePath()
}
