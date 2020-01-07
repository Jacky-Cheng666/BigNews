$(function () {
    // 1，页面一加载请求文章所有类别接口，渲染文章类别下拉框。
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".category").html(template("category_list", backData));
        }
    });
    // 2，文件预览
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });

    // 3.1,文件上传（发布）
    $('.btn-release').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        article_release('已发布')
    });
    // 3.1文章上传(存为草稿)
    $('.btn-draft').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        article_release('草稿')
    });

    function article_release(state) {
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($("#form")[0]);
        fd.append("state", state);
        fd.append("content", editor.txt.text());
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert("文章新增成功");
                    // window.location.href = './article_list.html';
                    // console.log($(".level02 li:eq(0)", window.parent.document)[0]);
                    $(".level02 li:eq(0) a", window.parent.document)[0].click();

                }
            }
        });
    }
});