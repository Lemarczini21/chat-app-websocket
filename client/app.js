// global variable

let userName;

// const
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));

const messages = [];
//login form logic
function login(e) {
  e.preventDefault();
  if (userNameInput.value) {
    userName = userNameInput;
    loginForm.classList.toggle('show');
    messagesSection.classList.toggle('show');
  } else {
    alert('Username cannot be empty');
  }
}

loginForm.addEventListener('submit', login);

// add messages form

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) {
    message.classList.add('message--self');
  }
  message.innerHTML = `
<h3 class="message__author">${userName === author ? 'You' : author}</h3>
<div class="message__content">
  ${content}
</div>
`;
  messagesList.appendChild(message);
}
// function sendMessage(e) {
//   e.preventDefault();
//   if (messageContentInput.value) {
//     addMessage(userName, messageContentInput.value);
//   } else {
//     alert('Message cannot be empty');
//   }
//   messageContentInput.value = '';
// }

function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert('You have to type something!');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContentInput.value = '';
  }
}

addMessageForm.addEventListener('submit', sendMessage);
