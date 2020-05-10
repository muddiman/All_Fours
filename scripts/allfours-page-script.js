
function usernameHandler(ev) {
    let name = document.getElementById("player_name").value;
    document.getElementById("player_name").value = "";
    console.log(`Player Name: ${name}`);
    Chat.setUsername(name).init();
    Chat.sendClientDetails();
    ev.preventDefault();
}


/* 
    
    @AUTHOR/PROGRAMMER: muddicode/sauceCode
    @VERSION: 1.0.0

*/