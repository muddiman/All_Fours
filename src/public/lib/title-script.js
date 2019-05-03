


function homeScreen() {   
        var modal = document.getElementById('home_screen');
        modal.style.display = 'block';
        clickOutsideForm();
}

/*  TODO: disable closing home screen until game is fully loaded  */
function clickOutsideForm() {
    var modal = document.getElementById('home_screen');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function loginForm() {
    var modal = document.getElementById('loginform');
    modal.style.display = 'block';
    clickOutsideForm();
}

    function clickOutsideForm() {
    var modal = document.getElementById('loginform');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

/*  progress bar    */
function move() {
    var loading = document.getElementById("loading");
    var load = [];
    var n = 0;
    var i = 0;
    load[0] = `Loading`;
    load[1] = `Loading.`;    
    load[2] = `Loading..`;
    load[3] = `Loading...`;
    var elem = document.getElementById("progress-bar"); 
    var width = 1;
    var id = setInterval(frame, 20);
    function frame() {
        //  width = 
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%'; 
        }
        loading.innerHTML = load[n];
        if ((i % 10) === 0) {
            n = (n+1) % 4;
        }
        i++;
        if (width >= 100) {
            let play_game = document.getElementById("PlayGame");
            play_game.className = "enabled";
        }
    }
  }