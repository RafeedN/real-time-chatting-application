// import {name}  from './connect.js';
let username = localStorage.getItem('name');
console.log(localStorage.getItem('name'));

const link = document.querySelector('h3');
link.textContent = "Connected As: " + username;

//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page

socket.on('serverSays', function(message) {
  
  let msgDiv = document.createElement('div')
  let h = document.createElement('h1')
  const myArray = message.split(":");
  if(myArray.length > 2){
    var groupPriv = myArray[1].split(",")
  }

  if(myArray[0].trim() == username){
    h.className = "sender"
    h.innerText = message
    msgDiv.appendChild(h)
    msgDiv.className = "cont"
  }else if(myArray.length == 2 && myArray[0].trim() != username){
    h.className = "others"
    h.innerText = message
    msgDiv.appendChild(h)
    msgDiv.className = "dddd"
  }else if(myArray.length > 2){
    for (let x = 0; x < groupPriv.length; x++) {
      if(groupPriv[x].trim() == username){
        h.className = "private"
        h.innerText = message
        msgDiv.appendChild(h)
        msgDiv.className = "dddd"
      }
    }
    
  }
  

  document.getElementById('messages').appendChild(msgDiv)
  var chat = document.getElementById("messages");
  chat.scrollTop = chat.scrollHeight;
})




function sendMessage() {
  let message = document.getElementById('msg').value.trim()
  if(message === '') return //do nothing
  var usname = username + ": " + message;
  socket.emit('clientSays', usname)
  //socket.emit('clientSays', "this is a test")
  //socket.broadcast.emit('clientSays', "this is a test");
  document.getElementById('msg').value = ''
}

function clearMessage() {
  document.getElementById('messages').innerHTML = "";
}

function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }
}

//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  
  document.getElementById('Send').addEventListener('click', sendMessage)
  document.getElementById('Clear').addEventListener('click', clearMessage)

  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})