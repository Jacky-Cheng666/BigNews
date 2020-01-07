$(function () {
    // 0，使用jedata与wangEditor插件完成页面布局。
    // 1，获取从article_list页面传递过来的id。
    // 拿到id值。
    var id = window.location.href.split("=")[1];
    console.log(id);
    /*ajax首先要请求所有分类*/
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            // 拿到数据渲染下拉框
            $(".category").html(template("category_list", backData));
        }
    });

    //2， 发送ajax请求id的数据，并且渲染页面。
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (backData) {
            // console.log(backData);
            // 拿到数据渲染页面
            $("#inputTitle").val(backData.data.title);
            $(".article_cover").attr("src", backData.data.cover);
            $(".category").val(backData.data.categoryId);
            $("#testico").val(backData.data.date);
            // 编辑器内容
            editor.txt.html(backData.data.content)
        }
    });

    // 3，文件预览
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });
    // 4，文件提交(编辑与草稿是同一个ajax，只是参数不同)
    // 4.1修改按钮
    $('.btn-edit').on('click', function (e) {
        //(1)禁用表单默认提交事件
        e.preventDefault();
        // (2)编辑文字
        editArticle("已发布");
    });

    // 4.2存为草稿
    $(".btn-draft").on("click", function (e) {
        //(1)禁用表单默认提交事件
        e.preventDefault();
        editArticle("草稿");
    })

    function editArticle(state) {
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($("#form")[0]);
        /*1，发现问题：编辑失败
        2，分析问题：参数缺失
         a,formData只能获取有name属性的表单元素
         b,如果formData获取的参数小于ajax接口文档参数
        3，解决问题：
            第一种：使用隐藏文本域(少用)
            第二种：使用append()方法追加。
        */ 
        fd.append("id", id);
        fd.append("date", $("#testico").val());
        fd.append("content", editor.txt.text());
        fd.append("state", state);
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert("编辑成功");
                    window.location.href = './article_list.html';
                }

            }
        });
    }


});