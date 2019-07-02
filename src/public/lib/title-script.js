

/*  executes when webpage is loaded */
    function homeScreen() {   
        var modal = document.getElementById('home_screen');
        modal.style.display = 'block';
        clickOutsideForm();
        let waitID = setTimeout(() => {
            progressBar();
            clearTimeout(waitID);
        }, 1000);
    }

    function clickOutsideForm() {
        var modal = document.getElementById('home_screen');
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    function pressBtn(id) {
        let btn = document.getElementById(id);
        btn.setAttribute("class", "pressed menuButtons");

        btn.addEventListener("mouseup", () => {
                                            btn.setAttribute("class", "menuButtons");
                                            document.getElementById('home_screen').style.display='none';
                                            // mainGameLoop(); 
                                        }, true);
    }

    /*  progress bar    */
    function progressBar() {
        let elem = document.getElementById("progress-bar"); 
        let width = 1;
        var loading = document.getElementById("loading");
        var load = [];
        var n = 0;
        var i = 0;
        loading.style.color = "rgb(255, 0, 0)";
        load[0] = `Loading`;
        load[1] = `Loading.`;    
        load[2] = `Loading..`;
        load[3] = `Loading...`;
        var animation = setInterval(() => {
            loading.innerHTML = load[n];
            if ((i % 10) === 0) {
                n = (n+1) % 4;
            }
            i++; 
        }, 50);
        let id = setInterval(() => {
            if (width >= 100) {
                clearInterval(id);
                clearInterval(animation);
            } else {
                width++; 
                elem.style.width = `${width}%`;
                elem.innerHTML = `${width}%`; 
            }
            if (width >= 100) {
                let play_game = document.getElementById("PlayGame");
                play_game.className = "enabled menuButtons";
                document.getElementById("loading").style.color= "rgb(0, 255, 0)";
                document.getElementById("loading").innerHTML = `Game Loaded.`;
            }
        }, 20);
    }

// windows.onload = 
(function () {
    let timeOutID = setTimeout(() => {
        homeScreen();
    }, 500);
})();
