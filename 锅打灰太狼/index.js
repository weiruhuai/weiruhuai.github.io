var timer = document.getElementById("time"), //进度条
    wolfHoles = document.getElementById("wolfs"), //
    startBtn = document.getElementById("start"), //开始按钮
    endWord = document.getElementById("end"), //结束语
    reload = document.getElementById("reload"), //重新开始
    liftCircle = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0], //动画周期
    fraction = document.getElementById("fraction"),
    score = 0, 
    arrPos = [{ l: "98px", t: "115px" }, { l: "17px", t: "160px" }, { l: "15px", t: "221px" }, { l: "30px", t: "294px" }, { l: "122px", t: "274px" }, { l: "207px", t: "296px" }, { l: "200px", t: "212px" }, { l: "187px", t: "142px" }, { l: "100px", t: "192px" }];
    //绑定开始按钮事件
    startBtn.onclick = function() {
        this.style.display = "none";
        //设置计时进度条
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
        //开始创建狼
        var wolfMaker = setInterval(function() {
            if (timer.offsetWidth > 0) {
                createWolf();
            } else {
                clearInterval(wolfMaker);
            }
        }, 1000);
    }

    //绑定重新开始事件
    reload.onclick = function() {
        location.reload();
    };

    //狼构建函数
    function createWolf() {
        //创建狼对象 
        var wolf = document.createElement("img");
        //点击标示
        var flag = true;
        //设置不同狼出现的几率
        wolf.type = rand(0, 9) > 6 ? "x" : "h";
        //设置狼的种类
        wolf.src = wolf.type + "0.png";
        var position = arrPos[rand(0, 9)];
        // 设置狼的洞穴坐标
        wolf.style.top = position.t;
        wolf.style.left = position.l;
        //把狼添加到页面上
        wolfHoles.appendChild(wolf);
        //记录狼的生命周期
        var tmp = 0;
        //播放狼的动画
        var wInterval = setInterval(function() {
            //根据预先设置好的狼的生命周期切换图片
            wolf.src = wolf.type + liftCircle[tmp] + ".png";
            tmp++;
            //当达到狼的最后一个动作 清除计时器 移除当前狼
            if (tmp == liftCircle.length) {
                clearInterval(wInterval);
                wolfHoles.removeChild(wolf);
            }
        }, 200);
        //狼点击事件
        wolf.onclick = function() {
            if (!flag) return;
            flag = false;
            //销毁原动画周期
            clearInterval(wInterval);
            //计分
            scoreCounter(wolf.type);
            //显示被打首张图片
            wolf.src = wolf.type + "6.png";
            //重新设置
            tmp = 7;
            //创建被打动画周期
            var clickInterval = setInterval(function() {
                //当tmp为10 被打动画播放完毕 销毁计时器 移除狼图片
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