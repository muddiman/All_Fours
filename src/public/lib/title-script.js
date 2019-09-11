

/*  executes when webpage is loaded */
    function homeScreen() { 
        let menuScreen = document.getElementById('menu_screen');
        if (menuScreen.style.display === 'block') {
            menuScreen.style.display = 'none';
        }  
        var modal = document.getElementById('home_screen');
        modal.style.display = 'block';
        clickOutsideForm();
        let waitID = setTimeout(() => {
            progressBar();
            clearTimeout(waitID);
        }, 1000);
        let waitTwoID = setTimeout(() => {
            modal.classList = "fade_trans modal gMenu";
            clearTimeout(waitTwoID);
        }, 2000);
    }

    function menuScreen() {   
        let menuScreen = document.getElementById('menu_screen');
        // var progressSection = document.getElementById('progress_section');
        menuScreen.style.display = 'block';
        clickOutsideForm();
        // progressSection.style.display = 'none';
    }

    function config() {
        let menuScreen = document.getElementById('menu_screen');
        menuScreen.style.display = 'block';
/*         let timeOutID = setTimeout(() => {
            menuScreen.style.display = 'block';
            clearTimeout(timeOutID);
            let button1 = document.getElementById('button_1');
            let button2 = document.getElementById('button_2');
            let button3 = document.getElementById('button_3');
            let button4 = document.getElementById('button_4');
            button1.innerText = 'Difficulty';
            button2.innerText = 'Mode';
            button3.innerText = 'Audio';
            button4.innerText = 'Back';
            menuScreen.style.display = 'block';
        }, 500); */
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
                                            if (id === 'button_2') {
                                                config();
                                            }
                                            switch (id) {
                                                case 'button_2':
                                                    config();
                                                    break;
                                                case 'button_8':
                                                    homeScreen();
                                                    break;
                                                default:
                                                    break;
                                            }
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
                let button1 = document.getElementById("button_1");
                button1.className = "enabled menuButtons";
                document.getElementById("loading").style.color= "rgb(0, 255, 0)";
                document.getElementById("loading").innerHTML = `Game Loaded.`;
            }
        }, 20);
    }
    function closeCtrlPanel() {
        /*    removes game control panel */
      document.getElementById("controlPanel").style.visibility = "hidden";
    }
// windows.onload = 
(function () {
    let timeOutID = setTimeout(() => {
        homeScreen();
        clearTimeout(timeOutID);
    }, 500);
})();
