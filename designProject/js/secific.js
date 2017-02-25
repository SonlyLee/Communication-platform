$(function () {
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf('user_name');   //索引的长度
    var str = 'user_name';
    var len = str.length;

      if(cookie_pos == -1){
          $('.word').detach();
         $('.p').after('<div id="Prompt">您还没有登录或者注册！</div>');
      }
    if (cookie_pos != -1)
    {
        cookie_pos =cookie_pos+ len+1;      //这里容易出问题，所以请大家参考的时候自己好好研究一下
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1)
        {
            cookie_end = allcookies.length;
        }
        var t = allcookies.substring(cookie_pos, cookie_end);
        $('#login_a').replaceWith("<a id='yonghu'></a>");
        $('#reg_a').replaceWith("<a id='out' href='../tccp/signIn.html'></a>");
        $('#yonghu').text(t);
        $('#out').text('登出');
        $('.name').after('<span>'+t+'<span>');
    }

    //搜索
    $('.search').mousemove(function () {
        $('.searchCon').css('display','block');
    });
    $('.search').mouseout(function () {
        $('.searchCon').css('display','none');
    });
    $('.searchBox').click(function () {
        $('.search').mouseout(function () {
            $('.searchCon').css('display','block');
            $('.search').css({backgroundImage :'url(image/searchHover.png)',backgroundColor:'#fff'});
        })
    });
    $(document).click(function () {
        $('.searchCon').css('display','none');
        $('.search').css({backgroundImage :'url(image/search.png)',backgroundColor:'#48525e'});
        $('.searchBox').attr('placeholder','搜索...');
    });
    var id = window.location.href.split('=')[1];
    $.ajax({
        type : "GET",
        url : '/tccp/news/getNewsContent?news_id='+id,
        success : function (data) {
            var jjj=data;
            var liTemplate = Handlebars.compile($("#dl-template").html());
            $('#divList1').html(liTemplate(jjj));
        }
    });

 
    //查看评论里
    var liTemplate = Handlebars.compile($("#li-template").html());
    var news_id = window.location.href.split('=')[1];
    var pages;
    $.ajax({
        type : "GET",
        async : false,
        url :"/tccp/comment/getNewsComments?pageNo=1&news_id="+news_id,
        success : function (data) {
            pages = data.pages;
            $('#liList').html(liTemplate(data));
        }
    });

    $(".tcdPageCode").createPage({
        pageCount:pages,
        current:1,
        backFn:function(p){
            $.ajax(
                {
                    type: 'GET',
                    url: '../../tccp/news/getAllNews?pageNo='+p,
                    success: function (data) {
                        $('#liList').empty();
                        $('#liList').html(liTemplate(data));
                    }
                }
            );
        }
    });

    //向上拉回滚动条
    $('.backTop').click(function () {
        $('body').animate({scrollTop:0},1000);
        return false;
    });

    //留言
    $('#submit').click(function () {
        var user_message = $('#message').val();
        var data = {
            user_message : user_message
        };
        var url = "/tccp/comment/getNewsComments?pageNo=1&news_id="+news_id;
        $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/json",
            dataType : "json",
            data : JSON.stringify(data),
            success: function(data){
                alert(JSON.stringify(data));
                $('#liList').html(liTemplate(data));
            }
        });
            $('#message').val(' ');
        return false;
    });

});
