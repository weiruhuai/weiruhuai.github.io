$(".navigation a").click(function () {
    $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top - 20 + "px"
    }, 500);
    return false;
});
//当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
$(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
        //淡入
        $("#back-to-top").fadeIn(1300);
    } else {
        //淡出
        $("#back-to-top").fadeOut(1300);
    }
});
//当点击跳转链接后，回到页面顶部位置
$("#back-to-top").click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1000);
    return false;
});