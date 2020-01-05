$(function () {
    // 1，ajax请求所有的文章分类,渲染到下拉框。
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
        // $.ajax({
        //     url: BigNew.article_query,
        //     type: 'get',
        //     dataType: 'json',
        //     data: {
        //         type: $("#selCategory").val(),
        //         state: $("#selStatus").val(),
        //         page: 1,
        //         perpage: 10
        //     },
        //     success: function (backData) {
        //         console.log(backData);
        //         // 拿到返回的数据渲染到页面。
        //         $(".mp20>tbody").html(template("article_list", backData));
        //         // 数据响应之后初始化分页插件
        //         loadPagination(backData.data.totalPage, 1);
        //     }
        // });
        getArticleList(1, true);
    });
    // 页面一加载主动触发筛选按钮点击事件。
    $("#btnSearch").click();

    // 3，分页查询。getArticleList()和loadPagination()函数。
    // 4，删除文章。
    // 删除按钮是动态添加的，需要注册委托事件(事件冒泡)。
    $(".mp20>tbody").on("click", ".delete", function () {
        var id = $(this).attr("data-id");
        // 发送ajax请求删除文章。
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (backData) {
                console.log(backData);
                if (confirm("确认要删除吗")) {
                    if (backData.code == 204) {
                        alert("删除成功");
                        // 删除成功后刷新当前页面。
                        window.location.reload();
                    }
                }
            }
        });

    });


    /*************************************************************************************/
    // 根据页数请求文章列表函数getArticleList();
    function getArticleList(currentPage, flag) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $("#selCategory").val(),
                state: $("#selStatus").val(),
                page: currentPage,
                perpage: 10
            },
            success: function (backData) {
                $(".mp20>tbody").html(template("article_list", backData));
                // 加载插件

                /*1，发现问题：页面出现递归调用，导致代码死循环
                  2，分析问题
                    (1) 页面一加载，默认请求第一页数据getArticleList(1)
                    (2) 在getArticleList(1)中，数据响应之后调用loadPagination()
                    (3)在loadPagination()，插件加载会默认触发第一页点击事件。
                  3，解决问题：给递归添加结束条件。
                    方案一：只有点击页数 与 当前加载页数 不一致才结束递归
                    方案二：给getArticleList()方法添加一个布尔类型参数，表示是否需要加载分页插件。
                */
                if (flag) {
                    loadPagination(backData.data.totalPage, currentPage);
                }
            }
        });
    }
    /**
    * @description:加载分页插件的函数loadPagination()
    * @param {type} totalPage:总页数
    * @param {type} startPage:起始页
    * @return: 
    */
    function loadPagination(totalPage, startPage) {
        // (1)先销毁旧的插件
        $('#pagination').twbsPagination('destroy');
        // (2)加载新的分页插件。
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            visiblePages: 7,
            startPage: startPage,
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            onPageClick: function (event, page) {
                // console.log(page);
                // console.log(startPage);

                // 加载currentPage页数据。
                // if (page != startPage) {
                //     getArticleList(page);
                // }
                getArticleList(page);

            }
        });
    }
});