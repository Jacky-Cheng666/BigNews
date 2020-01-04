$(function () {


    // 1，页面一加载，ajax请求个人信息
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            // 数据响应之后渲染页面。
            $(".user_info>img").attr("src", backData.data.userPic);
            $(".user_info>span").html("欢迎&nbsp;&nbsp;" + backData.data.nickname);
            $(".user_center_link img").attr("src", backData.data.userPic);

        }
    });

    // 2，退出功能。
    $(".logout").click(function () {
        // (1)清除token
        localStorage.removeItem("token");
        // (2)跳转首页
        window.location.href = './login.html';
    });

    // ******使用原生的ajax发送token
    //(1).实例化ajax对象
    // var xhr = new XMLHttpRequest();
    // //(2).设置请求方法和地址
    // //get请求的数据直接添加在url的后面 格式是 url?key=value
    // xhr.open('get', 'http://localhost:8080/api/v1/admin/user/info');

    // // 设置token请求头。
    // xhr.setRequestHeader('Authorization', localStorage.getItem('token'));

    // //(3).发送请求
    // xhr.send();
    // //(4).注册回调函数
    // xhr.onload = function () {
    //     console.log(xhr.responseText)
    // };


    // 2，侧边栏点击事件
    // 2.1一级菜单点击事件
    $(".menu .level01").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        // 如果是点击第二个菜单，还需要做下拉动画。
        if ($(this).index() == 1) {
            // a,下拉动画
            $(".level02").slideToggle();
            // b，旋转动画
            $(this).find("b").toggleClass("rotate0");
            // 默认选中第一个：DOM对象。**************************
            // 注意: 原生DOM语法中有一个click()事件，可同时触发 注册事件(样式标黄)+默认事件(跳转链接)。与jq中click()语法不一样，注意区分。
            $(".level02>li").eq(0).children("a")[0].click();
            // 注意：这里的a通过冒泡，触发了li的点击事件，所以字变成黄色了。
        } else {
            //如果点击的不是文章管理一级菜单列表，则移除二级列表的选中样式
            $(".level02>li").removeClass("active");
        }
    });
    // 2.2二级菜单点击事件
    $(".level02>li").click(function () {
        $(this).addClass("active").siblings("li").removeClass("active");

    });

})