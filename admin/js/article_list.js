$(function () {
    // 1，ajax请求所有的文章分类。
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            // 拿到数据渲染页面
            $("#selCategory").html(template("cat_list", backData));
        }
    });
    // 2，筛选按钮：查询文章列表
    // 筛选按钮是在form表单中，需要阻止默认跳转事件。这里不阻止默认跳转。会通过下面的click()会向服务器无限发送请求，导致服务器卡死。注意这是一个坑。
    $("#btnSearch").click(function (e) {
        // 阻止表单默认跳转。
        e.preventDefault();
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $("#selCategory").val(),
                state: $("#selStatus").val(),
                page: 1,
                perpage: 10
            },
            success: function (backData) {
                console.log(backData);
                // 拿到返回的数据渲染到页面。
                $(".mp20>tbody").html(template("article_list", backData));
                // 数据响应之后初始化分页插件
                // 先销毁旧的插件
                $('#pagination').twbsPagination('destroy');
                $('#pagination').twbsPagination({
                    totalPages: backData.data.totalPage,
                    visiblePages: 7,
                    first: '首页',
                    last: '尾页',
                    prev: '上一页',
                    next: '下一页',
                    onPageClick: function (event, page) {
                        $('#page-content').text('Page ' + page);
                        console.log(page);

                    }
                });
            }
        });
    });
    // 页面一加载主动触发筛选按钮点击事件。
    $("#btnSearch").click();

    // 3，分页查询。
    // 4，删除文章。
});