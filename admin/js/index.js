$(function () {


    // 1，页面一加载，ajax请求个人信息
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/user/info',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            // 数据响应之后渲染页面。
            $(".user_info>img").attr("src", backData.data.userPic);
            $(".user_info>span").html("欢迎&nbsp;&nbsp;" + backData.data.nickname);
            $(".user_center_link img").attr("src", backData.data.userPic);

        }
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
})