const express = require("express")
const app = express()
const http = require("http").Server(app)
const PORT = process.env.PORT || 8999;

const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

class Comment {
  constructor(id, text, top, fontSize, fontColor) {
	this.element = document.createElement("span");
	this.element.textContent = text;
    this.element.setAttribute("id",id);
    this.element.setAttribute("class","comment");
    this.element.style.color = fontColor;
	this.element.style.top = `${top}px`;
	this.element.style.fontSize = `${fontSize}px`;
  }
  viewFromBody() {
    document.body.appendChild(this.element)
    this.left = window.innerWidth;
    this.width = this.element.offsetWidth;
  }
  Move() {
    this.moveTime = setInterval( () => {
	  this.element.style.left = `${this.left}px`;
	  this.left -= 1;
	  if ((this.width * -1) > this.dx) {
		clearInterval(this.moveTime);
		this.element.parentNode.removeChild(this.element);
	  }
	}, 5);
  }
}
let commentId = 1
const io = require("socket.io").listen(server)
io.on("connection", (socket) => {
  socket.on("chat", function(text) {
    commentId += 1
    var top = Math.random() * (window.innerHeight + 1 - 60) ;
    comment = new Comment(commentId,text, top, 40, "#000000");
    comment.viewFromBody();
    comment.Move()
  })
})
