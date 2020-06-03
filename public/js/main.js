const chatform = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();
socket.on('message', message =>{
    console.log(message);
    outputMessage(message);

    // scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// submit message
chatform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    // emit message to server
    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// show message
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}