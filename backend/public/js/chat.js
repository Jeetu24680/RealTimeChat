const token = localStorage.getItem("token");

const socket = io({
    auth: {
        token: token
    }
});

const user = JSON.parse(localStorage.getItem("user"));
const chatUserId = localStorage.getItem("chatUserId");
const chatUsername = localStorage.getItem("chatUsername");

document.getElementById("chatName").innerText = `Chat with ${chatUsername}`;

function goBack() {
    window.location.href = "dashboard.html";
}

// Send Message
function sendMessage() {

    const text = document.getElementById("message").value.trim();

    if (text === "") return;

    socket.emit("sendMessage", {
        receiver_id: Number(chatUserId),
        message: text
    });

    document.getElementById("message").value = "";
}

async function sendImage() {

    const image = document.getElementById("image").files[0];

    if (!image) return;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("receiver_id", chatUserId);

    const response = await fetch("/api/chat/upload", {

        method: "POST",

        headers: {
            Authorization: `Bearer ${token}`
        },

        body: formData

    });

    const data = await response.json();

    if (response.ok) {

        loadMessages();

        document.getElementById("image").value = "";

    } else {

        alert(data.message);

    }

}

// Load Previous Messages
async function loadMessages() {

    const response = await fetch(`/api/chat/history/${chatUserId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const messages = await response.json();

    let html = "";

    messages.forEach(msg => {

        if (msg.sender_id === user.id) {

            html += `
                <div class="message sent">

                    ${msg.image
                    ? `<img src="/uploads/${msg.image}" style="max-width:250px;border-radius:10px;">`
                    : msg.message}

                    <div class="time">

                        ${new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}

                    </div>

                </div>
            `;

        } else {

            html += `
                <div class="message received">

                    ${msg.image
                        ? `<img src="/uploads/${msg.image}" style="max-width:250px;border-radius:10px;">`
                        : msg.message}

                    <div class="time">

                        ${new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}

                    </div>

                </div>
            `;

        }

    });

    const messageBox = document.getElementById("messages");

    messageBox.innerHTML = html;

    messageBox.scrollTop = messageBox.scrollHeight;
}

// Initial Load
loadMessages();

// Socket Connected
socket.on("connect", () => {
    console.log("Socket Connected");
});

// Real-time Message
socket.on("receiveMessage", () => {
    loadMessages();
});

// Typing Indicator
const input = document.getElementById("message");

let typingTimer;

input.addEventListener("input", () => {

    socket.emit("typing", Number(chatUserId));

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {

        socket.emit("stopTyping", Number(chatUserId));

    }, 1000);

});

socket.on("typing", () => {

    document.getElementById("typingStatus").innerText =
        `${chatUsername} is typing...`;

});

socket.on("stopTyping", () => {

    document.getElementById("typingStatus").innerText = "";

});

document.getElementById("image")
.addEventListener("change", sendImage);