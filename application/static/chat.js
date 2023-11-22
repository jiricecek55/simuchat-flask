let socketio = io()

let messages = document.getElementById("messages")

function createMessage(name, text, time, type) {
    let new_message = `
    <div class="message message-${type}">
        <span class="name">
            ${name}
        </span>
        <span class="text">
            ${text}
        </span>
        <span class="date">
            ${time}
        </span>
    </div>
    `
    messages.innerHTML += new_message
    messages.scrollTop = messages.scrollHeight
}

socketio.on("message", (data) => {
    createMessage(data.name, data.text, data.time, data.type)
})

function sendMessage() {
    let message_input = document.getElementById("message")
    if (message_input.value == "") return
    socketio.emit("message", {text: message_input.value})
    message_input.value = ""
}

document.getElementById("message").addEventListener("keydown", handleKeyPress)

function handleKeyPress(event) {
    if (event.key == "Enter") {
        sendMessage()
    } 
}

let old_messages = JSON.parse(document.getElementById("messages_input").value)

old_messages.forEach(element => {
    createMessage(element.name, element.text, element.time, element.type)
});