// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
const firebaseConfig = {
    apiKey: "AIzaSyAT8MKoiBbJkadEi6BXB0me6GidsmV0_54",
    authDomain: "chat-da-wrld.firebaseapp.com",
    projectId: "chat-da-wrld",
    storageBucket: "chat-da-wrld.appspot.com",
    messagingSenderId: "165139937220",
    appId: "1:165139937220:web:ceece7261adf94c119d691",
    measurementId: "G-JE4RXT9TC8"
  };
  // Your web app's Firebase configuration
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // This is very IMPORTANT!! We're going to use "db" a lot.
  var db = firebase.database()
  // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
  class MEME_CHAT{
    // Home() is used to create the home page
    home(){
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = ''
      this.create_title()
      this.create_join_form()
    }
    // chat() is used to create the chat page
    chat(){
      this.create_title()
      this.create_chat()
    }
    // create_title() is used to create the title
    create_title(){
      // This is the title creator. 🎉
      var title_container = document.createElement('div')
      title_container.setAttribute('id', 'title_container')
      var title_inner_container = document.createElement('div')
      title_inner_container.setAttribute('id', 'title_inner_container')

      var title = document.createElement('h1')
      title.setAttribute('id', 'title')
      title.textContent = 'MemeChat 2.0'

      title_inner_container.append(title)
      title_container.append(title_inner_container)
      document.body.append(title_container)
    }
    // create_join_form() creates the join form
    create_join_form(){
      // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!😂
      var parent = this;

      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')

      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('maxlength', 15)
      join_input.placeholder = 'No.... It\'s Patrick Star'
      // Every time we type into the join_input
      join_input.onkeyup  = function(){
        // If the input we have is longer that 0 letters
        if(join_input.value.length > 0){
          // Make the button light up
          join_button.classList.add('enabled')
          // Allow the user to click the button
          join_button.onclick = function(){
            // Save the name to local storage. Passing in
            // the join_input.value
            parent.save_name(join_input.value)
            // Remove the join_container. So the site doesn't look weird.
            join_container.remove()
            // parent = this. But it is not the join_button
            // It is (MEME_CHAT = this).
            parent.create_chat()
          }
        }else{
          // If the join_input is empty then turn off the
          // join button
          join_button.classList.remove('enabled')
        }
      }

      // Append everything to the body
      join_button_container.append(join_button)
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container, join_button_container)
      join_container.append(join_inner_container)
      document.body.append(join_container)
    }
    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id){
      // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
      var parent = this;

      // This is a loading function. Something cool to have.
      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)

    }
    // create_chat() creates the chat container and stuff
    create_chat(){
      // Again! You need to have (parent = this)
      var parent = this;
      // GET THAT MEMECHAT HEADER OUTTA HERE
      var title_container = document.getElementById('title_container')
      var title = document.getElementById('title')
      title_container.classList.add('chat_title_container')
      // Make the title smaller by making it 'chat_title'
      title.classList.add('chat_title')

      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      // Only a max message length of 1000
      chat_input.setAttribute('maxlength', 1000)
      // Get the name of the user
      chat_input.placeholder = `${parent.get_name()}. Say something...`
      chat_input.onkeyup  = function(){
        if(chat_input.value.length > 0){
          chat_input_send.removeAttribute('disabled')
          chat_input_send.classList.add('enabled')
          chat_input_send.onclick = function(){
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){
              return
            }
            // Enable the loading circle in the 'chat_content_container'
            parent.create_load('chat_content_container')
            // Send the message. Pass in the chat_input.value
            parent.send_message(chat_input.value)
            // Clear the chat input box
            chat_input.value = ''
            // Focus on the input just after
            chat_input.focus()
          }
        }else{
          chat_input_send.classList.remove('enabled')
        }
      }

      var chat_logout_container = document.createElement('div')
      chat_logout_container.setAttribute('id', 'chat_logout_container')

      var chat_logout = document.createElement('button')
      chat_logout.setAttribute('id', 'chat_logout')
      chat_logout.textContent = `${parent.get_name()} • logout`
      // "Logout" is really just deleting the name from the localStorage
      chat_logout.onclick = function(){
        localStorage.clear()
        // Go back to home page
        parent.home()
      }

      chat_logout_container.append(chat_logout)
      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
      chat_container.append(chat_inner_container)
      document.body.append(chat_container)
      // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
      parent.create_load('chat_content_container')
      // then we "refresh" and get the chat data from Firebase
      parent.refresh_chat()
    }
    // Save name. It literally saves the name to localStorage
    save_name(name){
      // Save name to localStorage
      localStorage.setItem('name', name)
    }
    // Sends message/saves the message to firebase database
    send_message(message){
      var parent = this
      // if the local storage name is null and there is no message
      // then return/don't send the message. The user is somehow hacking
      // to send messages. Or they just deleted the
      // localstorage themselves. But hacking sounds cooler!!
      if(parent.get_name() == null && message == null){
        return
      }

      // Get the firebase database value
      db.ref('chats/').once('value', function(message_object) {
        // This index is mortant. It will help organize the chat in order
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message_${index}`).set({
          name: parent.get_name(),
          message: message,
          index: index
        })
        .then(function(){
          // After we send the chat refresh to get the new messages
          parent.refresh_chat()
        })
      })
    }
    // Get name. Gets the username from localStorage
    get_name(){
      // Get the name from localstorage
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.home()
        return null
      }
    }
    // Refresh chat gets the message/chat data from firebase
    refresh_chat(){
      var chat_content_container = document.getElementById('chat_content_container')

      // Get the chats from firebase
      db.ref('chats/').on('value', function(messages_object) {
        // When we get the data clear chat_content_container
        chat_content_container.innerHTML = ''
        // if there are no messages in the chat. Retrun . Don't load anything
        if(messages_object.numChildren() == 0){
          return
        }

        // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
        // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!

        // convert the message object values to an array.
        var messages = Object.values(messages_object.val());
        var guide = [] // this will be our guide to organizing the messages
        var unordered = [] // unordered messages
        var ordered = [] // we're going to order these messages

        for (var i, i = 0; i < messages.length; i++) {
          // The guide is simply an array from 0 to the messages.length
          guide.push(i+1)
          // unordered is the [message, index_of_the_message]
          unordered.push([messages[i], messages[i].index]);
        }

        // Now this is straight up from stack overflow 🤣
        // Sort the unordered messages by the guide
        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              // Now push the ordered messages to ordered array
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })

        // Now we're done. Simply display the ordered messages
        ordered.forEach(function(data) {
          var name = data.name
          var message = data.message

          var message_container = document.createElement('div')
          message_container.setAttribute('class', 'message_container')

          var message_inner_container = document.createElement('div')
          message_inner_container.setAttribute('class', 'message_inner_container')

          var message_user_container = document.createElement('div')
          message_user_container.setAttribute('class', 'message_user_container')

          var message_user = document.createElement('p')
          message_user.setAttribute('class', 'message_user')
          message_user.textContent = `${name}`

          var message_content_container = document.createElement('div')
          message_content_container.setAttribute('class', 'message_content_container')

          var message_content = document.createElement('p')
          message_content.setAttribute('class', 'message_content')
          message_content.textContent = `${message}`

          message_user_container.append(message_user)
          message_content_container.append(message_content)
          message_inner_container.append(message_user_container, message_content_container)
          message_container.append(message_inner_container)

          chat_content_container.append(message_container)
        });
        // Go to the recent message at the bottom of the container
        chat_content_container.scrollTop = chat_content_container.scrollHeight;
    })

    }
  }
  // So we've "built" our app. Let's make it work!!
  var app = new MEME_CHAT()
  // If we have a name stored in localStorage.
  // Then use that name. Otherwise , if not.
  // Go to home.
  if(app.get_name() != null){
    app.chat()
  }
}

/index.css
body{
  /* https://www.color-hex.com/color/d3d3d3 */
  background-color: #fff; /*#f6f6f6, EBEBD3, fafafa*/
  font-family: Bungee Outline;
  font-weight: 900;

  overflow: hidden;
  animation: blur 0.5s ease-out;

}
*{
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#title_container{
  width: 100%;
  height: 225px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #D64045;/*#467599;*/
  border-bottom: 5px solid #fff;
  box-shadow: 0 0 30px -18px #D64045;

}
#title_inner_container{
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background-color: #083D77; */
  border-radius: 200px;
}
#title{
  display: inline-block;
  color: #fff;/*EBEBD3, C5283D*/
  font-size: 55px;
  letter-spacing: 2px;
  user-select: none;
}

#join_container{
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  float: left;
  margin-top: 80px;

}
#join_inner_container{
  width: 50%;
  height: 100%;
}
#join_input_container{
  width: 100%;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  float: left;
}
#join_input{
  width: 60%;
  height: 40px;

  color: #1D3354;
  font-family: Varela Round;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  background-color: Transparent;
  border-bottom: 2px dashed #1D3354;

}
#join_input:focus{
  box-shadow: 0 10px 30px -17px #1D3354;
}
#join_button_container{
  width: 100%;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  float: left;
}
#join_button{
  width: 60%;
  height: 40px;

  font-family: Varela Round;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: #fff;
}

#chat_container{
  width: 100%;
  height: 450px;

  display: flex;
  justify-content: center;

  float: left;
  margin-top: 40px;
  /* Fade in container */
  animation: fadeIn 1s linear;

}
#chat_inner_container{
  width: 40%;
  height: 100%;
}
#chat_content_container{
  width: 100%;
  height: 90%;

  float: left;
  overflow-y: auto;
  font-family: Varela Round;

  padding-left: 15px;
  padding-right: 15px;
}
#chat_input_container{
  width: 100%;
  height: 10%;

  float: left;
  border-bottom: 2px dashed #1D3354;
  background-color: Transparent;

  padding-left: 15px;
  padding-right: 15px;
  font-family: Varela Round;
  margin-top: 10px;
}
#chat_input{
  width: 95%;
  height: 100%;
  float: left;
  background-color: Transparent;
  color: #1D3354;
  font-size: 15px;
}
#chat_input_send{
  width: 5%;
  height: 100%;
  float: left;
  font-size: 18px;
  background-color: Transparent;
  text-align: right;
  color: #ccc;
}
#chat_input_send.enabled{
  color: #D64045;
  background-color: Transparent;
  cursor: pointer;

}
#chat_logout_container{
  width: 100%;
  display: inline-block;

  display: flex;
  justify-content: center;
  align-items: center;

  float: left;
  margin-top: 20px;
}
#chat_logout{
  color: #D64045;
  cursor: pointer;
}
#chat_logout:hover{
  text-decoration: underline;
}
.message_container{
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;

}
.message_inner_container{
  width: 100%;
  display: inline-block;

  color: #1D3354;
}
.message_user_container{
  width: 100%;
  display: inline-block;
}
.message_user{
  font-weight: bold;
  font-size: 14px;
}
.message_content_container{
  width: 100%;
  display: inline-block;

  white-space: pre-wrap;
  word-wrap: break-word;
}
.message_content{
  font-weight: normal;
  font-size: 14px;
  margin-top: 5px;
}

.enabled{
  transition: background-color 0.5s;
  color: #fff;
  background-color: #D64045; /*#5B7553;*/
  cursor: pointer;
}
#title_container.chat_title_container{
  transition: 0.8s;
  transition-timing-function: ease-in-out;
  height: 100px;
}
#title.chat_title{
  transition: 0.8s;
  font-size: 47px;
}
.loader_container{
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  border-top: 6px solid #D64045;
  border-bottom: 6px solid #1D3354;
  border-left: 6px solid #E9FFF9;
  border-right: 6px solid #E9FFF9;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes fadeIn {
   0% {opacity: 0;}
   100% {opacity: 1;}
}
@keyframes blur {
  0% {filter: blur(5px);}
  100% {}
}
::selection {
  background-color: #D64045;
  color: #fff;
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #cccs;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #D64045;
  border-radius: 5px;
}


How to USE GOOGLE FONTS in a HTML website

/index.html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title> Using Google Fonts </title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas Neue" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Hanalei Fill" rel="stylesheet">

  </head>
  <body>
    <div id="container">
      <h1> Very Big Header </h1>
      <h2> Cool Header </h2>
      <p>
        This is a cool paragraph! So picture this,
        I'm making a website and Ummm... A giant reindeer
        flew into my window. Guess what! Santa Claus wasn't
        even on the slay.
      </p>
    </div>
  </body>
  <style>
    body, html{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #F4D35E;

      color: #fff;
    }
    #container{
      width: 30%;
      display: inline-block;
      text-align: center;

      margin-top: -150px;
      background-color: #083D77;

      border-radius: 10px;
      box-shadow: 0 0 60px -5px #EE964B;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }
    h1{
      font-family: Raleway;
    }
    h2{
      font-family: Bebas Neue;
    }
    p{
      font-family: Hanalei Fill;
    }
  </style>
</html>

/index.js

/index.css
`

How to WRITE, READ, UPDATE and DELETE data with Firebase database using JavaScript

/index.html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Read, Write, Update, Delete</title>
  </head>
  <body>
    <div id="container">

      <div id="title_container">
        <span id="content">
          <h2 class="typedtext"></h2>
        </span>
        <h2 id="sub_header"> with Firebase Database </h2>
      </div>

      <div id="form_container">
        <input placeholder="Email" type="email" id="email"/>
        <input placeholder="Password" type="password" id="password"/>
        <input placeholder="Username" type="name" id="username"/>
        <input placeholder="Say Something 🤣😂" type="text" id="say_something"/>
        <input placeholder="Favourite Food" type="text" id="favourite_food"/>
      </div>

      <div id="button_container">
        <button id="submit" onclick="save()"> SUBMIT </button>
      </div>

    </div>
  </body>

  <style>
    /* https://coolors.co/003049-d62828-f77f00-fcbf49-eae2b7 */
    html, body {
      width: 100%;
      height: 100%;
      background-color: #FCBF49;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #container {
      width: 35%;
      height: 400px;

      background-color: #fff;
      border-radius: 10px;
      outline: 1px solid #fff;
      outline-offset: 3px;
      -moz-outline-radius: 10px;

    }

    #title_container {
      width: 100%;
      height: 5%;

      text-align: center;
      float: left;
      margin: 0;

      color: #003049;
      text-transform: uppercase;
      font-family: Verdana;
      font-size: 12px;

      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
      margin-bottom: 50px;

      color: #003049;
    }


    #form_container {
      width: 100%;
      height: 50%;

      float: left;
      margin-top: 2px;
      padding-left: 100px;
      padding-right: 100px;

      box-sizing: border-box;
    }

    #form_container * {
      width: 100%;
      height: 30px;

      border: none;
      outline: none;
      border-left: 2px solid #003049;
      background-color: #EBF8FF;
      margin: 0;
      padding: 0;
      text-align: center;

      margin-top: 3px;
      float: left;

    }

    #button_container {
      width: 100%;
      height: 5%;

      text-align: center;
      float: left;
      margin-bottom: 50px;

      font-family: Verdana;

    }

    #submit {
      width: 25%;
      height: 35px;

      background-color: #D62828;
      border-radius: 5px;
      font-weight: bold;
      color: #fff;
      border: none;
      outline: none;
      cursor: pointer;
    }


    #content {
      width: 105px;
      height: 100%;

      margin: 0;
      padding: 0;
      float: left;

      color: #D62828;
      margin-right: 5px;
    }

    .typedtext {
      display: inline-block;
      height: 100%;
      margin: 0;
      padding: 0;

      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 5px;
      border-bottom: 2px solid #D62828;

    }


  </style>
  <script>
    function typingEffect() {
      const contactTexts = shuffleArray(['Read', 'Write', 'Update', 'Delete']);
      const typedtext = document.getElementsByClassName("typedtext")[0];
      let removing = false;
      let idx = char = 0;

      setInterval(() => { // We define the interval of the typing speed

          // If we do not reach the limit, we insert characters in the html
          if (char < contactTexts[idx].length) typedtext.innerHTML += contactTexts[idx][char];

          // 15*150ms = time before starting to remove characters
          if (char == contactTexts[idx].length + 15) removing = true;

          // Removing characters, the last one always
          if (removing) typedtext.innerHTML = typedtext.innerHTML.substring(0, typedtext.innerHTML.length - 1);

          char++; // Next character

          // When there is nothing else to remove
          if (typedtext.innerHTML.length === 0) {

              // If we get to the end of the texts we start over
              if (idx === contactTexts.length - 1) idx = 0
              else idx++;

              char = 0; // Start the next text by the first character
              removing = false; // No more removing characters
          }

      }, 150); // Typing speed, 150 ms

    }
      typingEffect();
      function shuffleArray(array) {
          let currentIndex = array.length,
              temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;

              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
          }

          return array;
      }
  </script>


  <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-database.js"></script>
  <script src="index.js"></script>

</html>
/index.js
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()

function save() {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var username = document.getElementById('username').value
  var say_something = document.getElementById('say_something').value
  var favourite_food = document.getElementById('favourite_food').value

  database.ref('users/' + username).set({
    email : email,
    password : password,
    username : username,
    say_something : say_something,
    favourite_food : favourite_food
  })

  alert('Saved')
}

function get() {
  var username = document.getElementById('username').value

  var user_ref = database.ref('users/' + username)
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()

    alert(data.email)

  })

}

function update() {
  var username = document.getElementById('username').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  var updates = {
    email : email,
    password : password
  }

  database.ref('users/' + username).update(updates)

  alert('updated')
}

function remove() {
  var username = document.getElementById('username').value

  database.ref('users/' + username).remove()

  alert('deleted')
}

/index.css


How to add a YouTube video to an HTML website

/index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Add YouTube Videos</title>
  </head>
  <body>

    <div id="container">
      <iframe
      src="https://www.youtube.com/embed/Fjdx2x03wcs"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    </div>

  </body>
  <style>

    html, body {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      background-image: linear-gradient(-24deg, #0f0f0f 0%, #0f0f0f 60%, #543AC2 60%, #543AC2 60%);
    }

    #container {
      width: 56.45%;
      height: 62%;

      background-color: #fff;
      box-shadow: -5px 5px #EF233C;
      outline: 2px solid white;
      outline-offset: 5px;
      -moz-outline-radius: 10px;

      animation: pulse 2s infinite;

      overflow: hidden;
      border-radius: 10px;
    }

    @keyframes pulse {
      to {
        outline: 2px solid transparent;
        outline-offset: 30px;
      }
    }

    iframe {
      width: 100%;
      height: 100%;
    }

  </style>

</html>

/index.js

/index.css


How to make an awesome TIC TAC TOE game with HTML JS & CSS

/index.html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Counting my X's like: Tic Tac Toe</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

        <link rel="stylesheet" type="text/css" href="index.css">
    </head>
    <body>

        <div id="inner_body">

            <div id="game_title">
                    
                <h2>Counting my X's like: Tic Tac Toe</h2>

            </div>

            <div id="game_container">
                    

            </div>

        </div>

    </body>
    <script type="text/javascript" src="index.js"></script>
</html>
/index.js
// Get our game_container
let game_container = document.getElementById('game_container')

// Create a cursor
let cursor = 0

// Create a gameboard to illustrate tic tac toe board
let gameboard = new Array(9).fill(null)

// Create the two players
let players = ['👧', '😊']

// Create the scroe baord
let scoreboard = [0, 0]

// A function to reset the game
function reset_game(last_cursor) {

    // When we reset the game. Alternate the player who starts.
    cursor = (last_cursor == 0) ? 1 : 0

    // Reset the gameboard to nulls
    gameboard = new Array(9).fill(null)

    // Create the gameboard
    create_game()

}

// Check the game
function check_game() {

    // Define winning states
    let top_row = [ gameboard[0], gameboard[1], gameboard[2] ]
    let middle_row = [ gameboard[3], gameboard[4], gameboard[5] ]
    let bottom_row = [ gameboard[6], gameboard[7], gameboard[8] ]

    let left_column = [ gameboard[0], gameboard[3], gameboard[6] ]
    let middle_column = [ gameboard[1], gameboard[4], gameboard[7] ]
    let right_column = [ gameboard[2], gameboard[5], gameboard[8] ]

    let right_diagonal = [ gameboard[0], gameboard[4], gameboard[8] ]
    let left_diagonal = [ gameboard[2], gameboard[4], gameboard[6] ]

    // COmbine all the possible wins
    let all = [

        top_row,
        middle_row,
        bottom_row,

        left_column,
        middle_column,
        right_column,

        right_diagonal,
        left_diagonal

    ]

    // Define the winning cursor
    let winning_cursor = null

    // Define a flag for "game over"
    let is_game_over = null

    // A short function to determine if all values in an array are the same
    // Win returns [ cursor, has 3 in a row (is a winner)]
    let win = (array) => ( array[0] != null )
        ? [array[0], new Set(array).size == 1]
        : [array[0], false]

    // Check if the gameboard is full.
    // Check if any null values exist in the gameboard array
    let is_gameboard_full = !gameboard.includes(null)

    // Iterate through all our possible wins to find a win
    for (let i = 0; i < all.length; i++) {

        // Make updates before checking
        let is_a_win = win(all[i])
        // Define the winning cursor and is game over
        winning_cursor = is_a_win[0]
        is_game_over = is_a_win[1]

        // The moment we have a win. Stop checking.
        if (is_game_over == true) {

            break

        }

    }

    // Check if the board is full and we don't have a winner.
    if (is_gameboard_full == true && is_game_over == false) {

        // If gameboard is indeed full. Game is done.
        is_game_over = true
        // Set winning_cursor to null
        winning_cursor = null

    }

    // Return an array of the winning cursor and is game over
    return [winning_cursor, is_game_over]

}


// Create the game
function create_game() {

    // Set the last cursor to current cursor
    let last_cursor = cursor

    // Clear the game_container
    game_container.innerHTML = ''

    // For every tab on the gameboard (9)
    for (let i = 0; i < 9; i++) {

        // A function to update the tab cursor
        let udpate_tab_cursor = (tab_cursor, cursor) => tab_cursor.textContent = players[cursor]

        // Create tab
        let tab = document.createElement('div')
        tab.setAttribute('class', 'tab')
        tab.setAttribute('data-index', i)

        // Create the tab cursor
        let tab_cursor = document.createElement('h2')
        tab_cursor.setAttribute('class', 'tab_cursor')
        udpate_tab_cursor(tab_cursor, cursor)

        // When the tab is clicked
        tab.onclick = function() {

            // Check if this tab is already active
            if (this.getAttribute('data-active')) {

                // Don't bother doing anything else in the code.
                return

            }

            // Get the tab index when clicked on.
            let tab_index = this.getAttribute('data-index')

            // Get the tab cursor of this tab
            let tab_cursor = this.querySelector('.tab_cursor')

            // Update the gameboard
            gameboard[tab_index] = cursor

            // After updating the gameboard. Check game!
            let is_a_win = check_game()
            let winning_cursor = is_a_win[0]
            let is_game_over = is_a_win[1]

            // Check if is_game_over is true.
            if (is_game_over == true) {

                // End the game with style.
                // if (winning_cursor == null): We have a draw.
                let selected_player = (winning_cursor == null)
                ? `${players[0]} ${players[1]}`
                : players[winning_cursor]

                // Update the scoreboard of winning player
                scoreboard[winning_cursor] += (winning_cursor == null)
                ? 0
                : 1

                // Create a message. Either "draw" or "win"
                let message = (winning_cursor == null)
                ? 'draw'
                : 'win'

                // Alert a winner
                create_alert(selected_player, message, last_cursor)

            }

            // Add active to tab
            this.setAttribute('data-active', null)
            tab_cursor.classList.add('is_active')
            udpate_tab_cursor(tab_cursor, cursor)

            // Change the cursor. Other players turn.
            cursor = (cursor == 0) ? 1 : 0

            // Define tabs
            let tabs = document.getElementsByClassName('tab')

            // Update all the tab cursors on the gameboard
            for (let i = 0; i < tabs.length; i++) {

                // If this tab is not active
                if (!tabs[i].getAttribute('data-active')) {

                    // Update the tab cursor
                    let tab_cursor = tabs[i].querySelector('.tab_cursor')
                    udpate_tab_cursor(tab_cursor, cursor)

                }

            }

        }


        // Append tab cursor to tab
        tab.append(tab_cursor)

        // Append tab to game container
        game_container.append(tab)

    }

}

// Create alert
function create_alert(selected_player, message, last_cursor) {

    // Create the alert backdrop
    let alert_backdrop = document.createElement('div')
    alert_backdrop.setAttribute('id', 'alert_backdrop')

    let alert_container = document.createElement('div')
    alert_container.setAttribute('id', 'alert_container')

    let alert_message_container = document.createElement('div')
    alert_message_container.setAttribute('id', 'alert_message_container')

    let alert_player = document.createElement('h2')
    alert_player.setAttribute('id', 'alert_player')
    alert_player.textContent = selected_player

    let alert_message = document.createElement('h2')
    alert_message.setAttribute('id', 'alert_message')
    alert_message.textContent = message

    let alert_score = document.createElement('h2')
    alert_score.setAttribute('id', 'alert_score')
    alert_score.textContent = `${scoreboard[0]}-${scoreboard[1]}`

    // Append the 'messages' to the message container
    alert_message_container.append(alert_player, alert_message, alert_score)

    let alert_action_container = document.createElement('div')
    alert_action_container.setAttribute('id', 'alert_action_container')

    let alert_action = document.createElement('button')
    alert_action.setAttribute('id', 'alert_action')
    alert_action.textContent = 'Keep Playing! ▶'

    // Onclick for alert_action
    alert_action.onclick = function() {

        // Remove the alert window
        alert_backdrop.remove()
        alert_container.remove()    

        // Reset the game + Pass in the last_cursor
        reset_game(last_cursor)

    }

    // Append action to the action container
    alert_action_container.append(alert_action)

    alert_container.append(alert_message_container, alert_action_container)
    document.body.append(alert_container, alert_backdrop)

}


// Create the game
create_game()
/index.css
  html, body {

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: -webkit-linear-gradient(335deg, #ff0a54 24%, #0496ff 50%, #f6aa1c 24%);

}

* {
    
    margin: 0;
    padding: 0;

    box-sizing: border-box;
    font-family: Poppins;

}

#inner_body {

    width: 650px;
    height: 650px;

    display: flex;
    flex-direction: column;

}

#game_title {

    width: 100%;
    height: 10%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #6a040f;
    border-radius: 15px;

}

#game_title h2 {

    color: #fff;
    font-size: 30px;
    font-weight: bold;
    font-family: Poppins;

    background: -webkit-linear-gradient(355deg, #fff 30%, #0496ff 50%, #f6aa1c 35%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

}

#game_container {

    width: 100%;
    height: 90%;

}

.tab {

    width: 30%;
    height: 30%;

    margin: 1.6666665%;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    float: left;
    
    cursor: pointer;
    background: -webkit-linear-gradient(355deg, #f5f5f5 50%, #fafafa 50%);
    border: 1px solid #fff;

}

.tab:hover {

    transition: 0.12s;
    transform: scale(1.02);

}

.tab_cursor {

    user-select: none;

    font-size: 75px;
    visibility: hidden;
    
}

.tab:hover > .tab_cursor {

    opacity: .5;
    visibility: visible;

}

.tab_cursor.is_active {

    visibility: visible;
    opacity: 1;

}

.tab:hover > .tab_cursor.is_active {

    visibility: visible;
    opacity: 1;
    
}


#alert_backdrop {

    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;
    
    opacity: 0.4;
    background-color: #888;

}

#alert_container {

    width: 280px;
    height: 270px;

    padding: 10px;
    border-radius: 5px;
    border:  2px solid white;

    box-shadow: 0 0 15px -9px #fff;
    background: -webkit-linear-gradient(355deg, #f5f5f5 50%, #fafafa 50%);

    position: absolute;
    z-index: 2;

}

#alert_message_container {

    width: 100%;
    height: 70%;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    flex-wrap: wrap;

}

#alert_player {

    font-size: 75px;

}

#alert_message {

    text-transform: uppercase;
    font-size: 15px;

}

#alert_score {

    text-transform: uppercase;
    font-size: 15px;
    color:  #ccc;

}

#alert_action_container {

    width: 100%;
    height: 30%;

    display: flex;
    justify-content: center;
    align-items: center;
    
}

#alert_action {

    width: 50%;
    height: 80%;

    border: none;
    outline: none;
    background-color: inherit;

    color: #005F73;

    font-weight: bold;
    font-size: 14px;

    cursor: pointer;
    transition: 0.13s;

}

#alert_action:hover {

    transition: 0.13s;
    transform: translateX(20px);

}

How to select a RANDOM IMAGE in an array using JavaScript

/index.html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title> Random Image </title>
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <link rel="stylesheet" href="index.css"/>
    <script src="index.js"></script>
  </head>
  <body>
    <div id="container">
      <div id="inner_container">
        <img id="image_shower"/>
      </div>
      <div id="button_container">
        <button onclick="get_random_image()"> <i class="fas fa-random"></i> </button>
      </div>
    </div>
  </body>
</html>

/index.js
// Get all the images
image_array = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg'
]

function get_random_image(){
  // Get a random index
  random_index = Math.floor(Math.random() * image_array.length);

  // Get an image at the random_index
  selected_image = image_array[random_index]

  // Display the image
  document.getElementById('image_shower').src = `./images/${selected_image}`
}

/index.css
body{
  background-color: #EDF2F4;

  display: flex;
  justify-content: center;
  align-items: center;
}

#container{
  width: 50%;
  height: 600px;

  border-radius: 5px;

}

#inner_container{
  width: 100%;
  height: 80%;

  box-shadow: 0px 0px 36px -22px #2B2D42;
  float: left;
  margin-bottom: 33px;

}

img{
  width: 100%;
  height: 100%;
  border-radius: 10px;

}

#button_container{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button{
  width: 25%;
  height: 90%;

  font-size: 20px;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;

  border-radius: 5px;
  background-color: #EF233C;
}

button:hover{
  transition: 0.05s;
  background-color: #D90429;
  transform: rotateZ(-10deg);
  box-shadow: 0 0 30px -10px #D90429;
}

button:active{
  transform: translateY(20px);
  transform: rotateZ(10deg);

}


Simple Login & Register with Firebase Authentication using JavaScript | HTML | CSS

/index.html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Login + Firebase Database</title>
         <!-- Cool Google Fonts -->
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap" rel="stylesheet">
        <!-- Our stylesheet -->
        <link rel="stylesheet" type="text/css" href="index.css">
    </head>
    <body>
        <div id="content_container">
            <div id="form_container">
                <div id="form_header_container">
                    <h2 id="form_header"> Login + Firebase Database </h2>
                </div>

                <div id="form_content_container">
                    <div id="form_content_inner_container">
                        <input type="text" id="full_name" placeholder="Full name">
                        <input type="email" id="email" placeholder="Email">
                        <input type="password" id="password" placeholder="New Password">

                        <input type="text" id="favourite_song" placeholder="The Best Song Ever">
                        <input type="text" id="milk_before_cereal" placeholder="Milk Before Cereal? ( Yes | No )">

                        <div id="button_container">
                            <button onclick="login()">Login</button>
                            <button onclick="register()">Register</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </body>
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

    <!-- TODO: Add SDKs for Firebase products that you want to use
         https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js"></script>

    <!-- Our script must be loaded after firebase references -->
    <script src="index.js"></script>

</html>
/index.js
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  favourite_song = document.getElementById('favourite_song').value
  milk_before_cereal = document.getElementById('milk_before_cereal').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      favourite_song : favourite_song,
      milk_before_cereal : milk_before_cereal,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
/index.css
html, body {
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(25deg, #FFBE0B, #FB5607, #FF006E, #8338EC, #3A86FF);

    display: flex;
    justify-content: center;
    align-items: center;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
}
#content_container {
    width: 30%;
    height: 70%;
}

#form_container {
    width: 100%;
    height: 100%;

    background-color: #370617;
    box-shadow: 0 0 50px -20px #000;
    border-radius: 2%;

    overflow: hidden;
}

#form_header_container {
    width: 100%;
    height: 5%;

    display: flex;
    justify-content: center;
    align-items: center;
    float: left;

    padding: 20px;
    padding-bottom: 30px;
    padding-top: 30px;

    border-bottom: 1px solid transparent;
    border-image: -webkit-linear-gradient(25deg, #FFBE0B, #FB5607, #FF006E, #8338EC, #3A86FF) 20;
    background: #000;
}

#form_header {
    display: inline-block;
    font-size: 15px;
    font-family: Bowlby One SC;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1px;


    background: -webkit-linear-gradient(25deg, #FFBE0B, #FB5607, #FF006E, #8338EC, #3A86FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
}

#form_content_container {
    width: 100%;
    height: 90%;

    float: left;

    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 30px;
}

#form_content_inner_container {
    width: 75%;
    height: 100%;

    float: left;

}

input {
    width: 100%;
    height: 40px;

    padding-left: 10px;
    margin-bottom: 20px;

    background: #000;
    font-family: Montserrat;
    font-weight: 500;
    color: #fff;
    font-size: 12px;

    border-bottom: 2px solid transparent;
    border-top-left-radius: 2%;
    border-top-right-radius: 2%;
    border-image: -webkit-linear-gradient(25deg, #FFBE0B, #FB5607, #FF006E, #8338EC, #3A86FF) 1;
}

#button_container {
    width: 100%;
    height: 10%;

    background-image: linear-gradient(80deg, #FFBE0B, #FB5607 50%, #FF006E 50%, #8338EC);
    color: #fff;

    float: left;

    margin-top: 5px;
}

#button_container button {
    width: 50%;
    height: 100%;
    float: left;

    background: transparent;
    color: inherit;

    font-family: Montserrat;
    letter-spacing: 1px;
    font-weight: 900;
    font-size: 12px;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
}
RhymBil © 2023
/index.html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title> MemeChat 2.0 </title>
    <!-- Google fonts. -->
    <link href='https://fonts.googleapis.com/css?family=Bungee Outline' rel='stylesheet'/>
    <link href='https://fonts.googleapis.com/css?family=Varela Round' rel='stylesheet'/>
    <!-- Use font awesome icons. -->
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <!-- Use firebase app and database. -->
    <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-database.js"></script>

    <!-- The CSS and JS file must be declared after the things above-->
    <link rel="stylesheet" href="index.css"/>
    <script type="text/javascript" src="index.js"></script>

  </head>
  <body>
  </body>
</html>

/index.js
// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // This is very IMPORTANT!! We're going to use "db" a lot.
  var db = firebase.database()
  // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
  class MEME_CHAT{
    // Home() is used to create the home page
    home(){
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = ''
      this.create_title()
      this.create_join_form()
    }
    // chat() is used to create the chat page
    chat(){
      this.create_title()
      this.create_chat()
    }
    // create_title() is used to create the title
    create_title(){
      // This is the title creator. 🎉
      var title_container = document.createElement('div')
      title_container.setAttribute('id', 'title_container')
      var title_inner_container = document.createElement('div')
      title_inner_container.setAttribute('id', 'title_inner_container')

      var title = document.createElement('h1')
      title.setAttribute('id', 'title')
      title.textContent = 'MemeChat 2.0'

      title_inner_container.append(title)
      title_container.append(title_inner_container)
      document.body.append(title_container)
    }
    // create_join_form() creates the join form
    create_join_form(){
      // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!😂
      var parent = this;

      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')

      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('maxlength', 15)
      join_input.placeholder = 'No.... It\'s Patrick Star'
      // Every time we type into the join_input
      join_input.onkeyup  = function(){
        // If the input we have is longer that 0 letters
        if(join_input.value.length > 0){
          // Make the button light up
          join_button.classList.add('enabled')
          // Allow the user to click the button
          join_button.onclick = function(){
            // Save the name to local storage. Passing in
            // the join_input.value
            parent.save_name(join_input.value)
            // Remove the join_container. So the site doesn't look weird.
            join_container.remove()
            // parent = this. But it is not the join_button
            // It is (MEME_CHAT = this).
            parent.create_chat()
          }
        }else{
          // If the join_input is empty then turn off the
          // join button
          join_button.classList.remove('enabled')
        }
      }

      // Append everything to the body
      join_button_container.append(join_button)
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container, join_button_container)
      join_container.append(join_inner_container)
      document.body.append(join_container)
    }
    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id){
      // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
      var parent = this;

      // This is a loading function. Something cool to have.
      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)

    }
    // create_chat() creates the chat container and stuff
    create_chat(){
      // Again! You need to have (parent = this)
      var parent = this;
      // GET THAT MEMECHAT HEADER OUTTA HERE
      var title_container = document.getElementById('title_container')
      var title = document.getElementById('title')
      title_container.classList.add('chat_title_container')
      // Make the title smaller by making it 'chat_title'
      title.classList.add('chat_title')

      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      // Only a max message length of 1000
      chat_input.setAttribute('maxlength', 1000)
      // Get the name of the user
      chat_input.placeholder = `${parent.get_name()}. Say something...`
      chat_input.onkeyup  = function(){
        if(chat_input.value.length > 0){
          chat_input_send.removeAttribute('disabled')
          chat_input_send.classList.add('enabled')
          chat_input_send.onclick = function(){
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){
              return
            }
            // Enable the loading circle in the 'chat_content_container'
            parent.create_load('chat_content_container')
            // Send the message. Pass in the chat_input.value
            parent.send_message(chat_input.value)
            // Clear the chat input box
            chat_input.value = ''
            // Focus on the input just after
            chat_input.focus()
          }
        }else{
          chat_input_send.classList.remove('enabled')
        }
      }

      var chat_logout_container = document.createElement('div')
      chat_logout_container.setAttribute('id', 'chat_logout_container')

      var chat_logout = document.createElement('button')
      chat_logout.setAttribute('id', 'chat_logout')
      chat_logout.textContent = `${parent.get_name()} • logout`
      // "Logout" is really just deleting the name from the localStorage
      chat_logout.onclick = function(){
        localStorage.clear()
        // Go back to home page
        parent.home()
      }

      chat_logout_container.append(chat_logout)
      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
      chat_container.append(chat_inner_container)
      document.body.append(chat_container)
      // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
      parent.create_load('chat_content_container')
      // then we "refresh" and get the chat data from Firebase
      parent.refresh_chat()
    }
    // Save name. It literally saves the name to localStorage
    save_name(name){
      // Save name to localStorage
      localStorage.setItem('name', name)
    }
    // Sends message/saves the message to firebase database
    send_message(message){
      var parent = this
      // if the local storage name is null and there is no message
      // then return/don't send the message. The user is somehow hacking
      // to send messages. Or they just deleted the
      // localstorage themselves. But hacking sounds cooler!!
      if(parent.get_name() == null && message == null){
        return
      }

      // Get the firebase database value
      db.ref('chats/').once('value', function(message_object) {
        // This index is mortant. It will help organize the chat in order
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message_${index}`).set({
          name: parent.get_name(),
          message: message,
          index: index
        })
        .then(function(){
          // After we send the chat refresh to get the new messages
          parent.refresh_chat()
        })
      })
    }
    // Get name. Gets the username from localStorage
    get_name(){
      // Get the name from localstorage
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.home()
        return null
      }
    }
    // Refresh chat gets the message/chat data from firebase
    refresh_chat(){
      var chat_content_container = document.getElementById('chat_content_container')

      // Get the chats from firebase
      db.ref('chats/').on('value', function(messages_object) {
        // When we get the data clear chat_content_container
        chat_content_container.innerHTML = ''
        // if there are no messages in the chat. Retrun . Don't load anything
        if(messages_object.numChildren() == 0){
          return
        }

        // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
        // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!

        // convert the message object values to an array.
        var messages = Object.values(messages_object.val());
        var guide = [] // this will be our guide to organizing the messages
        var unordered = [] // unordered messages
        var ordered = [] // we're going to order these messages

        for (var i, i = 0; i < messages.length; i++) {
          // The guide is simply an array from 0 to the messages.length
          guide.push(i+1)
          // unordered is the [message, index_of_the_message]
          unordered.push([messages[i], messages[i].index]);
        }

        // Now this is straight up from stack overflow 🤣
        // Sort the unordered messages by the guide
        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              // Now push the ordered messages to ordered array
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })

        // Now we're done. Simply display the ordered messages
        ordered.forEach(function(data) {
          var name = data.name
          var message = data.message

          var message_container = document.createElement('div')
          message_container.setAttribute('class', 'message_container')

          var message_inner_container = document.createElement('div')
          message_inner_container.setAttribute('class', 'message_inner_container')

          var message_user_container = document.createElement('div')
          message_user_container.setAttribute('class', 'message_user_container')

          var message_user = document.createElement('p')
          message_user.setAttribute('class', 'message_user')
          message_user.textContent = `${name}`

          var message_content_container = document.createElement('div')
          message_content_container.setAttribute('class', 'message_content_container')

          var message_content = document.createElement('p')
          message_content.setAttribute('class', 'message_content')
          message_content.textContent = `${message}`

          message_user_container.append(message_user)
          message_content_container.append(message_content)
          message_inner_container.append(message_user_container, message_content_container)
          message_container.append(message_inner_container)

          chat_content_container.append(message_container)
        });
        // Go to the recent message at the bottom of the container
        chat_content_container.scrollTop = chat_content_container.scrollHeight;
      })

    }
  }
  // So we've "built" our app. Let's make it work!!
  var app = new MEME_CHAT()
  // If we have a name stored in localStorage.
  // Then use that name. Otherwise , if not.
  // Go to home.
  if(app.get_name() != null){
    app.chat()
  }
}