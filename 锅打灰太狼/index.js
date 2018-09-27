var timer = document.getElementById("time"), //进度条
    wolfHoles = document.getElementById("wolfs"), //狼窝
    startBtn = document.getElementById("start"), //开始按钮
    endWord = document.getElementById("end"), //结束语
    reload = document.getElementById("reload"), //重新开始
    liftCircle = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0], //动画周期
    fraction = document.getElementById("fraction"),
    score = 0, 
    flag = false;
    arrPos = [{ l: "98px", t: "115px" }, { l: "17px", t: "160px" }, { l: "15px", t: "221px" }, { l: "30px", t: "294px" }, { l: "122px", t: "274px" }, { l: "207px", t: "296px" }, { l: "200px", t: "212px" }, { l: "187px", t: "142px" }, { l: "100px", t: "192px" }];
    //绑定开始按钮事件
    startBtn.onclick = function() {
        this.style.display = "none";
        var timerInterval = setInterval(function() {
            if (timer.offsetWidth == 0) {
                clearInterval(timerInterval);
                reload.style.display = "block";
                endWord.style.display = "block";
                if (score > 50) {
                    endWord.innerHTML = "太厉害了!";
                } else {
                    endWord.innerHTML = "game over!";
                }
            } else {
                timer.style.width = timer.offsetWidth - 9 > 0 ? timer.offsetWidth - 9 + "px" : "0px";
            }
        }, 500);
        var wolfMaker = setInterval(function() {
            if (timer.offsetWidth > 0) {
                createWolf();
            } else {
                clearInterval(wolfMaker);
            }
        }, 1000);
    }
    //狼构建函数
    function createWolf() {
        var wolf = document.createElement("img");
        var flag = true;
        wolf.type = rand(0, 9) > 6 ? "x" : "h";
        wolf.src = wolf.type + "0.png";
        var position = arrPos[rand(0, 9)];
        wolf.style.top = position.t;
        wolf.style.left = position.l;
        wolfHoles.appendChild(wolf);
        var tmp = 0;
        var wInterval = setInterval(function() {
            wolf.src = wolf.type + liftCircle[tmp] + ".png";
            tmp++;
            if (tmp == liftCircle.length) {
                clearInterval(wInterval);
                wolfHoles.removeChild(wolf);
            }
        }, 200);
        //狼点击事件
        wolf.onclick = function() {
            if (!flag) return;
            flag = false;
            clearInterval(wInterval);
            scoreCounter(wolf.type);
            wolf.src = wolf.type + "6.png";
            tmp = 7;
            var clickInterval = setInterval(function() {
                if (tmp == 10) {
                    wolfHoles.removeChild(wolf);
                    clearInterval(clickInterval);
                } else {
                    wolf.src = wolf.type + tmp + ".png";
                    tmp++;
                }
            }, 200);
        }
    }
    //随机函数
    function rand(min, max) {
        return parseInt((max - min) * Math.random()) + min
    }
    //计分函数
    function scoreCounter(type) {
        type == "h" ? score += 10 : score -= 10;
        fraction.innerText = score;
    }
    reload.onclick = function() {
        location.reload();
    };