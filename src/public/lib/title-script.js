


function homeScreen() {   
    var modal = document.getElementById('home_screen');
    modal.style.display = 'block';
    clickOutsideForm();
    animateLoading();
}

function clickOutsideForm() {
    var modal = document.getElementById('home_screen');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
/* 
function loginForm() {
    var modal = document.getElementById('loginform');
    modal.style.display = 'block';
    clickOutsideForm();
}
 */
/*     function clickOutsideForm() {
    var modal = document.getElementById('loginform');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
} */

/*  progress bar    */
function progressBar() {
    var elem = document.getElementById("progress-bar"); 
    var width = 1;
    var id = setInterval(() => {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%'; 
        }

        if (width >= 100) {
            let play_game = document.getElementById("PlayGame");
            play_game.className = "enabled";
            document.getElementById("loading").innerHTML = `Game Loaded.`;
        }
    }, 20);
}
/*     function frame() {        
    } */


/*  word loading    */
function animateLoading() {
    var loading = document.getElementById("loading");
    var load = [];
    var n = 0;
    var i = 0;
    load[0] = `Loading`;
    load[1] = `Loading.`;    
    load[2] = `Loading..`;
    load[3] = `Loading...`;
    let animation = setInterval(() => {
        loading.innerHTML = load[n];
        if ((i % 10) === 0) {
            n = (n+1) % 4;
        }
        i++; 
    }, 50);
 
}