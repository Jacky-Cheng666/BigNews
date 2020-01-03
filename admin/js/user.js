$(function () {
    // 1，页面一加载发送ajax，请求获取用户详情接口。返回的数据渲染页面。
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            console.log(backData);
            // 渲染数据到页面
            // $("#inputEmail1").val(backData.data.username);
            // $("#inputEmail2").val(backData.data.nickname);
            // $("#inputEmail3").val(backData.data.email);
            // $("#inputEmail4").val(backData.data.password);
            $(".user_pic").attr("src", backData.data.userPic);
            // 遍历对象可以解决代码冗余问题。
            for (var k in backData.data) {
                $("." + k).val(backData.data[k]);

            }
        }
    });

    // 2，上传文件预览。
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    // 3，修改信息，掉用修改信息接口。
    $('.btn-edit').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($("#form")[0])
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert("更新成功");
                    /* 
                    1，发现问题：刷新的是user.html页面。
                    2，分析问题：window:是当前页面user.html
                                window.parent：父页面 index.html
                    */
                    // 刷新父页面。(window.parent)
                    window.parent.location.reload();

                }
            }
        });
    });
});