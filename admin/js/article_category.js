$(function () {
    // 1,页面一加载查询所有的分类。发送请求，并且渲染页面。
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $(".category_table>tbody").html(template("article_category", backData));

        }
    });
    /*本页面难点分析：
    1，点击新增分类和编辑都要弹出模态框。(模态框的复用)
    2，新增分类 与 编辑分类业务逻辑不同。
        2.1 新增
            (1)模态框显示 新增按钮
            (2)点击 新增，发送新增ajax请求。
        2.2 编辑
            (1)模态框显示 编辑按钮
            (2)页面传值，(显示当前编辑的分类信息)
            (3)点击 编辑，发送编辑ajax请求。
    解决方案：查询bootstrap官网文档模态框使用。
    */
    // 2,新增分类，弹出模态框
    $("#xinzengfenlei").click(function () {
        $(".btn-confirm").text("新增");
        $("#exampleModalLabel").text("新增分类");
        $('#add_category').modal();
    });


    // 3，编辑分类(动态添加的数据只能通过事件委托来注册)，弹出模态框
    $("tbody").on("click", ".btn-edit", function () {
        $(".btn-confirm").text("编辑");
        $("#exampleModalLabel").text("编辑分类");
        $('#add_category').modal();

        // 将需要编辑的数据写入表单。
        $("#category_name").val($(this).parent().prev().prev().text());
        $("#message_text").val($(this).parent().prev().text());
        // 给btn-confirm按钮传递一个data-id的属性值
        $(".btn-confirm").attr("data-id", $(this).attr("data-id"));
    });

    // 4，给btn-confirm注册点击事件
    $(".btn-confirm").on("click", function () {
        var $name = $("#category_name").val();
        var $slug = $("#message_text").val();
        // 2.1新增按钮发送ajax请求。
        if ($(this).text() == '新增') {
            // var $name = $("#category_name").val();
            // var $slug = $("#message_text").val();
            // 发送ajax请求新增数据接口
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $name,
                    slug: $slug
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 201) {
                        alert("新增成功");
                        // 刷新当前页面
                        window.location.reload();
                    }
                }
            });
        } else {
            var id = $(this).attr("data-id");
            // 2.2 调用编辑文章类别的接口/admin/category/edit
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id,
                    name: $name,
                    slug: $slug
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 200) {
                        alert("编辑成功");
                        window.location.reload();
                    }
                }
            });

        }
    })

    // 5，给取消按钮注册点击事件。清空表单内容。
    $(".btn-cancel").click(function () {
        $(".modal-body>form")[0].reset();    
    });
    // 4，删除分类。
    $("tbody").on("click", ".btn-del", function () {
        var id = $(this).attr("data-id");
        if (confirm("请确认是否要删除?")) {
            // 发送ajax请求来删除数据。(调用删除接口)
            $.ajax({
                url: BigNew.category_delete,
                type: 'post',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 204) {
                        alert("删除成功");
                        window.location.reload();
                    }
                }
            });
        }

    });


});