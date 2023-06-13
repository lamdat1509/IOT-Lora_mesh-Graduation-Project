//--------------------------------------------------------REFERENCES--------------------------------------------------//
let userlink = document.getElementById('userlink');
let signoutlink = document.getElementById('signoutlink')
let header = document.getElementById('hh')
var currentUser = null
//--------------------------------------------------------FUNCTIONS---------------------------------------------------//
function getUsername() {
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");

    if (keepLoggedIn == 'yes') {
        currentUser = JSON.parse(localStorage.getItem('user'));
    }
    else {
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
}
function Signout() {
    sessionStorage.removeItem('user')
    localStorage.removeItem('user')
    window.location = "home.html";
}
//------------------------------------Windowns loads-----------------------------------------------------------------//
window.onload = function () {
    getUsername()
    if (currentUser == null) {
        userlink.innerText = "Create New Account"
        userlink.classList.replace("nav-link", "btn")
        userlink.classList.add("btn-primary")
        userlink.href = "web_Sign.html";

        Signout.innerText = "Login"
        signoutlink.classList.replace("nav-link", "btn")
        signoutlink.classList.add("btn-success")
        signoutlink.href = "web_login.html"
    }

    else {
        userlink.innerText = currentUser.getUsername
        header.innerText = "welcome" + currentUser.fullname
        userlink.classList.replace("btn", "nav-link")
        userlink.classList.add("btn-primary")
        userlink.href = "#";

        Signout.innerText = "Sign Out"
        signoutlink.classList.replace("btn", "nav-link")
        signoutlink.classList.add("btn-success")
        signoutlink.href = "javascript:Sigout()"
    }
}

//-------------------------------------------NODE_1-------------------------------------------------------------//
var nhietDo = document.getElementById('nhietDo');
var dbRef = firebase.database().ref("/nhietDo").child('nhietDo');
dbRef.on('value', function (snapshot) {
    let value = snapshot.val();
    percent.innerHTML = value + '&#176' + 'C';

    if (value >= 25 && value <= 40) {
        document.querySelector('.Suitable').style.display = 'block';
        document.querySelector('.Inappropriate').style.display = 'none';
    } else {
        document.querySelector('.Suitable').style.display = 'none';
        document.querySelector('.Inappropriate').style.display = 'block';
    }

    small_round.style.setProperty("transform", `rotate(${value / 100 * 360}deg)`);
    container.style.setProperty("transform", `rotate(${1 * (value - 100) / 100 * 360}deg) translate(${0}px)`);
    above.style.setProperty("stroke-dashoffset", `${910 - value * (910 / 100)}`);
});


const box = document.querySelector("#box");
const under = document.querySelector(".unders");
const above = document.querySelector(".aboves");
const small_round = document.querySelector(".small_rounds");
const container = document.querySelector(".containers");
const percent = document.querySelector("#percent");

function updateSlider(event) {
    // tọa độ của tâm O
    var x_mind = box.getBoundingClientRect().left + box.getBoundingClientRect().height / 2;
    var y_mind = box.getBoundingClientRect().top + box.getBoundingClientRect().height / 2;

    // tọa độ x , y so với tâm O 
    var x = event.clientX - x_mind;
    var y = event.clientY - y_mind;

    // angle tính bằng độ
    var rad = Math.atan(y / x) * 180 / Math.PI;
    // điều khiệm hàm arctan
    if (x > 0) {
        rad = rad;
    } else if (x < 0 && y >= 0) {
        rad = rad + 180;
    } else if (x < 0 && y < 0) {
        rad = rad - 180;
    } else if (x == 0 && y > 0) {
        rad = 90;
    } else if (x == 0 && y > 0) {
        rad = -90;
    } else {
    }
    if (rad < 0) { rad = rad + 360; }
    rad = rad - 180;

    if (rad < 0) { rad = rad + 360; }

    let ratio = ((rad + 180) * 100 / 360).toFixed();
    percent.innerHTML = ratio + '&#176' + 'C';
}




