$(function () {
    // 0，使用jedata与wangEditor插件完成页面布局。
    // 1，获取从article_list页面传递过来的id。 
    var idStr = window.location.href.split("?")[1];
    // 拿到id值。
    var id = idStr.split("=")[1];
    console.log(id);

    //2， 发送ajax请求id的数据，并且渲染页面。
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (backData) {
            console.log(backData);
            // 拿到数据渲染页面
            $("#inputTitle").val(backData.data.title);
            $(".article_cover").attr("src", backData.data.cover);
            $(".category").val("爱生活");
        }
    });

    // 3，文件预览
    // 4，文件提交


});