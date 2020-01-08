$(function () {
    // 1，页面一加载，发送ajax请求评论接口。并且渲染页面。
    loadComment_list(1, true);

    // 2，批准/拒绝/删除功能
    // 2.1删除
    $(".mp20").on("click", ".btn-del", function () {
        var id = $(this).attr("data-id");
        $.ajax({
            url: BigNew.comment_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert("删除成功");
                    window.location.reload();
                }

            }
        });
    });
    // 2.2批准
    $(".mp20").on("click", ".btn-approve", function () {
        var id = $(this).attr("data-id");
        $.ajax({
            url: BigNew.comment_pass,
            type: 'post',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert("审核通过");
                    window.location.reload();
                }
            }
        });
    });
    // 3.3拒绝
    $(".mp20").on("click", ".btn-reject", function () {
        var id = $(this).attr("data-id");
        $.ajax({
            url: BigNew.comment_reject,
            type: 'post',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert("评论已拒绝");
                    window.location.reload();
                }
            }
        });
    });



    // 发送ajax请求函数。请求评论接口。
    function loadComment_list(currentPage, isReload) {
        $.ajax({
            url: BigNew.comment_list,
            type: 'get',
            dataType: 'json',
            data: {
                page: currentPage,
                perpage: 10
            },
            success: function (backData) {
                // console.log(backData);
                // 渲染页面
                $(".mp20>tbody").html(template("comment_list", backData));

                if (isReload) {
                    // 2，分页插件初始化
                    // $('#pagination').twbsPagination('destroy')
                    $('#pagination').twbsPagination({
                        totalPages: backData.data.totalPage,
                        visiblePages: 10,
                        first: '首页',
                        prev: '上一页',
                        next: '下一页',
                        last: '尾页',
                        onPageClick: function (event, page) {
                            // console.log(page);
                            loadComment_list(page);
                        }
                    });
                }
            }
        });
    }
});