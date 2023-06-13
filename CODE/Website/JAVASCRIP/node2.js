var dbRefHum = firebase.database().ref("/Hum").child('Hum');
dbRefHum.on('value', snap => {
    var valueHum = snap.val();
    percent_hum.innerHTML = 'Humidity: ' + valueHum + '%';
    updateSoilMoisture(valueHum)
});

function userWarning_hien() {
    document.querySelector('.Proper').style.display = 'block'
    document.querySelector('.Inadequate').style.display = 'none'
}

function userWarning_an() {
    document.querySelector('.Proper').style.display = 'none'
    document.querySelector('.Inadequate').style.display = 'block'
}


var togg = document.querySelector('#togg');
const slider2 = document.querySelector(".slider2");

// trạng thái ban đầu là ko quay
const blades = document.querySelectorAll('.blade');
blades.forEach((blade) => blade.style.animationPlayState = 'paused');

function motorOn() {
    const blades = document.querySelectorAll('.blade');
    blades.forEach((blade) => blade.style.animationPlayState = 'running');
}

function motorOff() {
    const blades = document.querySelectorAll('.blade');
    blades.forEach((blade) => blade.style.animationPlayState = 'paused');
}

var btnOnMo = document.getElementById('motoron');
var btnOffMo = document.getElementById('motoroff');

btnOnMo.onclick = function () {
    firebase.database().ref().child('motor').update({
        "motor": 1
    });
    motorOn();
};

btnOffMo.onclick = function () {
    firebase.database().ref().child('motor').update({
        "motor": 0
    });
    motorOff();
};

function updateSoilMoisture(valueHum) {
    var label = document.querySelector(".soil-moisture-label");
    var bar = document.querySelector(".soil-moisture-bar");

    var sliderValue = (valueHum / 120) * 100;
    bar.style.width = sliderValue + '%';

    if (valueHum >= 55 && valueHum <= 80) {
        bar.style.background = "linear-gradient(to right, #2ecc71, #f1c40f)";
        userWarning_hien()
    } else if (valueHum < 60 && valueHum > 80) {
        bar.style.background = "linear-gradient(to right, #f1c40f, #e67e22)";
        userWarning_an()
    } else {
        bar.style.background = "linear-gradient(to right, #e74c3c, #c0392b)";
        userWarning_an()
    }
    label.innerHTML = valueHum + "%"
}

//  chuyển chế độ
var dbRefHum = firebase.database().ref("/mode2").child('mode2');
dbRefHum.on('value', snap => {
    if (snap.val() == 1) {
        togg.checked = true;
        slider2.classList.add("on");
        btnOnMo.disabled = false;
        btnOffMo.disabled = false;
    } else {
        togg.checked = false;
        slider2.classList.remove("on");
        btnOnMo.disabled = true;
        btnOffMo.disabled = true;
    }
})

var dbRefHum2 = firebase.database().ref("/motor").child('motor');
dbRefHum2.on('value', snap => {
    if (snap.val() == 1) {
        motorOn();
    } else {
        motorOff();
    }
})

togg.addEventListener("click", function () {
    // Kiểm tra trạng thái của input checkbox
    if (togg.checked) {
        // Nếu input checkbox đã được chọn (trạng thái "on"), thì thêm lớp "on" cho slider
        slider2.classList.add("on");
        btnOnMo.disabled = false;
        btnOffMo.disabled = false;
        firebase.database().ref().child('mode2').update({
            "mode2": 1
        });
    } else {
        // Nếu input checkbox không được chọn (trạng thái "off"), thì xóa lớp "on" khỏi slider
        slider2.classList.remove("on");
        btnOnMo.disabled = true;
        btnOffMo.disabled = true;
        firebase.database().ref().child('mode2').update({
            "mode2": 0
        });
    }
});