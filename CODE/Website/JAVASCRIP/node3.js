type = "module"
// USA
// const firebaseConfig = {
//     apiKey: "AIzaSyD-kSjt8kcw8Xs1PESVzc_4pP5WUbfUenk",
//     authDomain: "datiot-f0d92.firebaseapp.com",
//     projectId: "datiot-f0d92",
//     storageBucket: "datiot-f0d92.appspot.com",
//     messagingSenderId: "98953618621",
//     appId: "1:98953618621:web:4ebe3b6dbe8ef402d943d4",
//     measurementId: "G-1QQGJDFMY4"
// };

// Singapo
const firebaseConfig = {
    apiKey: "AIzaSyC33V38Hx84QDyFkvnV8bTsISou-os3ENE",
    authDomain: "test-7e8c2.firebaseapp.com",
    databaseURL: "https://test-7e8c2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-7e8c2",
    storageBucket: "test-7e8c2.appspot.com",
    messagingSenderId: "962009503887",
    appId: "1:962009503887:web:07ecbe61bcb66ab66338fa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var btnOn = document.getElementById("btn_Ledon");
var btnOff = document.getElementById("btn_Ledoff");

btnOn.onclick = function () {
    firebase.database().ref().child('den').update({
        "den": 1
    });
}
btnOff.onclick = function () {
    firebase.database().ref().child('den').update({
        "den": 0
    });
}

var toggleSwitch = document.querySelector('#toggleSwitch');
const slider = document.querySelector(".slider");

function morning() {
    document.querySelector('.block-Ngay').style.display = 'block'
    document.querySelector('.block-Dem').style.display = 'none'
}

function evening() {
    document.querySelector('.block-Ngay').style.display = 'none'
    document.querySelector('.block-Dem').style.display = 'block'
}

var dbReftt = firebase.database().ref("/den").child('tt');
dbReftt.on('value', snap => {
    if (snap.val() == 0) {
        morning()
    } else {
        evening()
    }
})

var dbRef1 = firebase.database().ref("/den").child('den');
dbRef1.on('value', snap => {
    if (snap.val() == 1) {
        den_St.innerText = "ON";
        document.getElementById("led").src = "./assest/img/sang1.png"
    } else {
        den_St.innerText = "OFF";
        document.getElementById("led").src = "./assest/img/toi.png"
    }
})

var dbRef2 = firebase.database().ref("/mode").child('mode');
dbRef2.on('value', snap => {
    if (snap.val() == 1) {
        toggleSwitch.checked = true;
        slider.classList.add("on");
        btnOn.disabled = false;
        btnOff.disabled = false;
    } else {
        toggleSwitch.checked = false;
        slider.classList.remove("on");
        btnOn.disabled = true;
        btnOff.disabled = true;
    }
})

toggleSwitch.addEventListener("click", function () {
    // Kiểm tra trạng thái của input checkbox
    if (toggleSwitch.checked) {
        // Nếu input checkbox đã được chọn (trạng thái "on"), thì thêm lớp "on" cho slider
        slider.classList.add("on");
        btnOn.disabled = false;
        btnOff.disabled = false;
        firebase.database().ref().child('mode').update({
            "mode": 1
        });
    } else {
        // Nếu input checkbox không được chọn (trạng thái "off"), thì xóa lớp "on" khỏi slider
        slider.classList.remove("on");
        btnOn.disabled = true;
        btnOff.disabled = true;
        firebase.database().ref().child('mode').update({
            "mode": 0
        });
    }
});


