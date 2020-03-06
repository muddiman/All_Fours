
function usernameHandler(ev) {
    let name = document.getElementById("player_name").value;
    document.getElementById("player_name").value = "";
    console.log(`Player Name: ${name}`);
    Chat.username = name;
    sendConnectionMsg();
    ev.preventDefault();
}