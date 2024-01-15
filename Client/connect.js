

function checkUsername() {
    var name = document.getElementById('username').value.trim()
    var REGEX = /^[a-z0-9]+$/i;
    var letters = /^[a-z]+$/i;
    if(name === ''){
        alert("You haven't entered a username!");
    } else if(REGEX.test(name) === true && letters.test(name.charAt(0)) === true ){
        alert("Successfully Connected!");
        window.location.href = ('index.html'); 
    } else{
        alert("Invalid Username!");
    }
    localStorage.setItem('name', name);
}

  
function handleKeyDown(event) {
    const ENTER_KEY = 13 //keycode for enter key
    if (event.keyCode === ENTER_KEY) {
        checkUsername()
      return false //don't propogate event
    }
}

//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    //This function is called after the browser has loaded the web page
  
    //add listener to buttons
    document.getElementById('btn').addEventListener('click', checkUsername)
  
    //add keyboard handler for the document as a whole, not separate elements.
    document.addEventListener('keydown', handleKeyDown)
    //document.addEventListener('keyup', handleKeyUp)
  })

  
//   export {name};