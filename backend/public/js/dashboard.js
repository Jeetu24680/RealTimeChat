const token = localStorage.getItem("token");
const socket = io({
    auth: {
        token: token
    }
});

let onlineUsers = [];
const user = JSON.parse(localStorage.getItem("user"));

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("welcome").innerText =
    `Welcome ${user.username}`;

async function searchUsers() {

    const username = document.getElementById("search").value;

    const response = await fetch(`/api/users/search?username=${username}`, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const users = await response.json();

    let html = "";

    users.forEach(u => {

        html += `

<div class="user">

<div>

<h3>${u.username}</h3>

<p>${u.email}</p>

</div>

<button class="search-btn" onclick="sendRequest(${u.id})">

Add Friend

</button>

</div>

`;

    });

    document.getElementById("users").innerHTML = html;

}

async function sendRequest(receiverId){

    const response = await fetch("/api/friends/send-request",{

        method:"POST",

        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },

        body:JSON.stringify({
            receiver_id:receiverId
        })

    });

    const data=await response.json();

    alert(data.message);

}

document
.getElementById("logout")
.onclick=()=>{

localStorage.clear();

window.location.href="login.html";

}

async function loadRequests() {

    const response = await fetch("/api/friends/requests", {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const requests = await response.json();

    let html = "";

    if (requests.length === 0) {
        html = "<p>No Pending Requests</p>";
    }

    requests.forEach(r => {

        html += `

<div class="user">

<div>

<h3>${r.username}</h3>

<p>${r.email}</p>

</div>

<div class="friend-actions">

<button class="accept-btn" onclick="acceptRequest(${r.id})">

Accept

</button>

<button class="reject-btn" onclick="rejectRequest(${r.id})">

Reject

</button>

</div>

</div>

`;
    });

    document.getElementById("requests").innerHTML = html;

}

async function acceptRequest(id){

    const response = await fetch("/api/friends/accept-request",{

        method:"POST",

        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },

        body:JSON.stringify({
            request_id:id
        })

    });

    const data=await response.json();

    alert(data.message);

    loadRequests();
    loadFriends();

}

async function rejectRequest(id){

    const response = await fetch("/api/friends/reject-request",{

        method:"POST",

        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },

        body:JSON.stringify({
            request_id:id
        })

    });

    const data=await response.json();

    alert(data.message);

    loadRequests();

}

async function loadFriends(){

    const response = await fetch("/api/friends/list",{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    const friends = await response.json();

    let html = "";

    if(friends.length===0){

        html="<p>No Friends Yet</p>";

    }

    friends.forEach(friend=>{

        html += `

        <div class="user">

        <div class="friend-info">

        <span class="${onlineUsers.includes(friend.id) ? "online-dot" : "offline-dot"}"></span>

        <div>

        <h3>${friend.username}</h3>

        <p>${onlineUsers.includes(friend.id) ? "Online" : "Offline"}</p>

        </div>

        </div>

        <div class="friend-actions">

        <button class="chat-btn" onclick="openChat(${friend.id},'${friend.username}')">

        Chat

        </button>

        </div>

        </div>

        `;

    });

    document.getElementById("friends").innerHTML=html;

}

function openChat(id,name){

    localStorage.setItem("chatUserId",id);

    localStorage.setItem("chatUsername",name);

    window.location.href="chat.html";

}

loadRequests();

loadFriends();

socket.on("onlineUsers", (users) => {

    onlineUsers = users;

    loadFriends();

});