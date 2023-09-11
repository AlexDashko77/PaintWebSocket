const express = require("express")
const { Server } = require("socket.io")
const http = require("http")

const path = require("path")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))
app.use(express.json())

server.listen(3000, () => {
  console.log("server started")
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"))
})

io.on("connection", (socket) => {
  socket.on("connected", () => {
    console.log("connected")
  })
  socket.on("draw_line", (msg) => {
    io.emit("draw_line", msg)
  })
})
