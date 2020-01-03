// 入口函数
/*
    1，登录按钮点击事件
      1.1获取输入框文本
      1.2非空判断
      1.3发送ajax请求
      1.4跳转首页
*/
$(function () {
    $(".input_sub").click(function (e) {
        // 阻止表单默认跳转行为
        e.preventDefault();
        // 1，获取表单文本
        var $username = $(".input_txt").val().trim();
        var $pwd = $(".input_pass").val().trim();
        // 2，非空判断
        if ($username.length == 0 || $pwd.length == 0) {
            // alert('用户名和密码不能为空')
            $('#login_msg').modal();
            $(".modal-body p").text("用户名和密码不能为空");
            return;
        }
        // 3，发送ajax请求
        $.ajax({
            url: BigNew.user_login,
            type: 'post',
            dataType: 'json',
            data: {
                username: $username,
                password: $pwd
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    $(".modal-body>p").text("登录成功");
                    $('#login_msg').modal();
                    $('#login_msg').on('hidden.bs.modal', function () {
                        // 1，将token存入本地
                        localStorage.setItem('token', backData.token);
                        window.location.href = './index.html';
                    });

                } else {
                    $('#login_msg').modal();
                    $(".modal-body>p").text(backData.msg);
                    $('#login_msg').on('hidden.bs.modal', function () {
                        $(".input_txt").val("");
                        $(".input_pass").val("");
                    });

                }
            }
        });



    });
});