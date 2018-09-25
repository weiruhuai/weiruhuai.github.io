//进度条
var timeLine = document.getElementById("time");
//开始按钮
var startBtn = document.getElementById("start");
//开始菜单
var startMenu = document.getElementById("startMenu");
//结束菜单
var endMenu = document.getElementById("endMenu");
//分数
var fraction = document.getElementById("fraction");
//重新开始按钮
var reloadBtn = document.getElementById("reload");
//狼窝
var wolfHouse = document.getElementById("wolfs");
//背景音乐
var jsMusic = document.getElementById("music");
//动画周期
// var score = 0;

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
    //进度条开始读条
    timeLineRun();
    //背景音乐
    // jsMusic.play();
    timer = setInterval(func, 1000);
};
function func() {
    if (timeLine.offsetWidth > 0) {
        //创建灰太狼
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
            //清除计时器
            clearInterval(timeLineTimer);
            clearInterval(timer);
            //出现结束语
            endMenu.innerHTML = "game over!<br/>你的得分是:" + fraction.innerHTML;
            endMenu.style.display = "block";
            //出现重新开始
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
    //创建img显示狼
    var wolfImg = document.createElement("img");
    //设置狼的种类
    var wolfType = randomNum(0, 10) > 4 ? "h" : "x";
    console.log(wolfType)
    //随机获取狼窝的位置
    var a = randomNum(0, 9);
    var position = arrPos[a];
    //设置初始图片编号
    wolfHouse.index = 0;
    //设置未被点击
    wolfHouse.clicked = false;
    //设置img的src属性
    wolfImg.src = wolfType + wolfHouse.index + ".png";
    //将狼添加到页面
    wolfHouse.appendChild(wolfImg);
    //设置位置
    wolfHouse.style.left = position[0];
    wolfHouse.style.top = position[1];
    // 让狼动起来
    var tmp = -1;
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
        //如果执行了点击就不要在点击了
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
