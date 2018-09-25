var timeLine = document.getElementById("time");
var startBtn = document.getElementById("start");
var startMenu = document.getElementById("startMenu");
var endMenu = document.getElementById("endMenu");
var fraction = document.getElementById("fraction");
var reloadBtn = document.getElementById("reload");
var wolfHouse = document.getElementById("wolfs");

var liftCircle = [0,1,2,3,4,5,4,3,2,1,0],

//洞穴坐标
arrPos = [["98px","115px"],["17px","160px"],["15px","221px"],["30px","294px"],["122px","274px"],["207px","296px"],["200px","212px"],["187px","142px"],["100px","192px"]];
var timer = 0;

function randomNum(min, max) {
    return parseInt((max - min) * Math.random()) + min
}
//点击开始
startBtn.onclick = function() {
    startMenu.style.display = "none";
    timeLineRun();
    timer = setInterval(func, 1000);
};
function func() {
    if (timeLine.offsetWidth > 0) {
        creatWolf();
    } else {
        clearInterval(timer);
    }
}
function timeLineRun(){
    var timeLineTimer = setInterval(function(){
        if(timeLine.offsetWidth > 0) {
            timeLine.style.width = timeLine.offsetWidth - 1 + "px";
        } else {
            clearInterval(timeLineTimer);
            clearInterval(timer);
            endMenu.innerHTML = "game over!<br/>你的得分是:" + fraction.innerHTML;
            endMenu.style.display = "block";
            reloadBtn.style.display = "block";
        }
    }, 200);
}
//重新开始
reloadBtn.onclick = function() {
    window.location.reload();
}
function creatWolf() {
    wolfHouse.onclick = null;
    var wolfImg = document.createElement("img");
    var wolfType = randomNum(0, 10) > 4 ? "h" : "x";
    console.log(wolfType)
    var a = randomNum(0, 9);
    var position = arrPos[a];
    wolfHouse.index = 0;
    wolfHouse.clicked = false;
    wolfImg.src = wolfType + wolfHouse.index + ".png";
    wolfHouse.appendChild(wolfImg);
    wolfHouse.style.left = position[0];
    wolfHouse.style.top = position[1];
    // 让狼动起来
    var tmp = 0;
    var showTime = setInterval(function(){
        tmp++;
        if(tmp < liftCircle.length){
            wolfHouse.index = liftCircle[tmp];
            wolfImg.src = wolfType + wolfHouse.index + ".png";
        }else{
            clearInterval(showTime);
            wolfHouse.removeChild(wolfImg);
        }
    },100);

    //给狼设置点击事件
    wolfHouse.onclick = function() {
        clearInterval(timer);
        if (this.clicked) {
            return;
        }
        scoreCounter(wolfType)
        //关掉动画
        wolfHouse.index = 5;
        clearInterval(showTime);
        var hitWolf = setInterval(function(){
            if(wolfHouse.index < 10){
                wolfImg.src = wolfType + wolfHouse.index + ".png";
                wolfHouse.index++;
            }else{
                clearInterval(hitWolf);
                wolfHouse.removeChild(wolfImg);
                timer = setInterval(func, 1000)
            }
        }, 100);
        this.clicked = true;
    }
    function scoreCounter(wolfType) {
        var score = parseInt(fraction.innerHTML)
        if (wolfType == "h") {
            fraction.innerHTML = score + 10;
        } else {
            fraction.innerHTML = score - 10;
        }
    }
}
