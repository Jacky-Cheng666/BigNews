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

    // 2,新增分类
    $("#xinzengfenlei").click(function () {
        $('#add_category').modal();
    });
    $('#add_category').on('hidden.bs.modal', function (e) {
        var $name = $("#category_name").val();
        var $slug = $("#another_name").val();
        // 模态框消失之后发送ajax请求。
        $.ajax({
            url: BigNew.category_add,
            type: 'post',
            dataType: 'json',
            data: {
                name: $name,
                slug: $slug
            },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 201) {
                    alert("新增成功");
                    window.location.reload();
                }
            }
        });
    })

    // 3，编辑分类(动态添加的数据只能通过事件委托来注册)
    $("tbody").on("click", ".btn-edit", function () {
        alert(1)
    });

    // 4，删除分类。

});