


function homeScreen() {   
        var modal = document.getElementById('home_screen');
        modal.style.display = 'block';
        clickOutsideForm();
}

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