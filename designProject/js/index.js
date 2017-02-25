$(function () {
    //登陆
    // $('#login_a').click(function () {
    //
    //     // $('.login').dialog({
    //     //     title:'用户登陆',
    //     //     autoOpen : true,
    //     //     width : 330,
    //     //     height : 300,
    //     //     resizable : false,
    //     //     buttons:{
    //     //         '提交':function () {
    //     //             $(this).dialog('close');
    //     //             $('#login_a').replaceWith("<span id='yonghu'></span>");
    //     //             $('#yonghu').html($('#user').val());
    //     //             $('#yonghu').addClass('actualUser');
    //     //             $('#reg_a').remove();
    //     //             $('#splitLine').remove();
    //     //             $('#yonghu').hover(function () {
    //     //                 $('.cat').css('display','block');
    //     //             },function () {
    //     //                 $('.cat').css('display','none');
    //     //             })
    //     //             $('#yonghu').click(function () {
    //     //                 alert(1);
    //     //             })
    //     //         },
    //     //         '取消':function () {
    //     //             $(this).dialog('close');
    //     //         }
    //     //     },
    //     //     // position:'left top'   弹出框出现的位置
    //     //     // width : 500,     弹出框的大小,默认单位是像素
    //     //     // height: 300,
    //     //     // minWidth:300,    弹出框的最小宽度和最小高度
    //     //     // minHeight:300
    //     //     // maxWidth:700,    弹出框的最大宽度和最大高度
    //     //     // maxHeight:500,
    //     //     // show:true,       弹出框的淡入淡出,如果值是false就等于没写
    //     //     // hide:true,
    //     //     show:'puff',
    //     //     hide:'puff',
    //     //     modal:true,
    //     //     closeText:'关闭'
    //     // })
    // });



    //利用cookie设置用户名
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf('user_name');   //索引的长度
    var str = 'user_name';
    var len = str.length;
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
    }



    //搜索
    $('.search').mousemove(function () {
        $('.searchCon').css('display','block');
        // $(this).css('backgroundImage','url(image/searchHover.png)');
    });
    $('.search').mouseout(function () {
        $('.searchCon').css('display','none');
        // $(this).css('backgroundImage','url(image/search.png)');
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

    //点击标题出现新的页面
    $('.main').on('click','.bigTitle',function () {
        var url = "Specific information.html?id="+$(this).attr('id');
        window.open(url,'_blank');
    });



    //查看用户信息


    var t1;
    $('.main').on('mouseover','.middle',function () {
        $(this).css('color','#ff0000');
        var id = $(this).attr('id');
        var t=id.split('&')[1];
        var t1 = 'xin'+t;
        $.ajax(
            {
                type: 'GET',
                async : false,
                url: '../../tccp/user/getUserInfo?user_id='+id,
                success: function (data) {
                    var tpl   =  $("#Li-tem").html();
                    //原生方法
                    var source = document.getElementById('Li-tem').innerHTML;
                    //预编译模板
                    var template = Handlebars.compile(source);
                    //匹配json内容
                    var html = template(data);
                    //输入模板
                    $("#" + t1).html(html);
                }
            }
        );
        $(this).next().show();
    });
    $('.main').on('mouseout','.middle',function () {
        $(this).css('color','#000');
        $(this).next().hide();
    });
    //切换按钮
    // var num = 0;
    // var flag = 0;
    // $('#next').click(function () {
    //     if($('.btn').hasClass('active1')) {
    //         $('.btn').removeClass('active1');
    //     }
    //     num++;
    //     if(num > 4){
    //         for(var i=0;i<5;i++){
    //             var t = parseInt(document.getElementsByClassName('btn')[i].innerHTML);
    //             t=t+1;
    //             if(t >= 9)
    //             {
    //                 $('#next').attr("disabled", true);
    //             }else{
    //                 document.getElementsByClassName('btn')[i].innerHTML = t;
    //             }
    //         }
    //         $($('.btn')[4]).addClass('active1');
    //         if(flag == 0){
    //             var $pre = $('<button class="buttonTxt" id="pre">上一页</button>');
    //             var $fir = $('<button class="buttonTxt" id="first">首页</button>');
    //             $pre.insertBefore($('button:eq(0)'));
    //             $fir.insertBefore($('button:eq(0)'));
    //             flag = 1;
    //         }
    //     }
    //     $($('.btn')[num]).addClass('active1');
    // });
    // $('.btn').click(function () {
    //     $('.btn').removeClass('active1');
    //     $(this).addClass('active1');
    //     $t = $(this);
    //     $('#next').one('click',function () {
    //         if($('.btn').hasClass('active1')) {
    //             $('.btn').removeClass('active1');
    //         }
    //         $t.next().addClass('active1');
    //     });
    // });


    var ajaxCount = 2 ;
    var ajaxFinished = function() {
        if (ajaxCount == 0) {
            $('#mask').remove();
            $('#face').remove();
        }
    };
    //分页渲染
    var myTemplate = Handlebars.compile($("#dl-template").html());
    var pages;
    $.ajax(
        {
            type: 'GET',
            async : false,
            url: '../../tccp/news/getAllNews?pageNo=1',
            success: function (data) {
                pages = data.pages;
                $('#dlList').html(myTemplate(data));
            }
        }
    ).then(function(){
        ajaxCount --;
        ajaxFinished();
    });

    $(".tcdPageCode").createPage({
        pageCount: pages,
        current:1,
        backFn:function(p){
            $.ajax(
                {
                    type: 'GET',
                    url: '../../tccp/news/getAllNews?pageNo='+p,
                    success: function (data) {
                        $('#dlList').empty();
                        $('#dlList').html(myTemplate(data));
                    }
                }
            );
        }
    });
    //点击文本出现类似消息
    $('.category_list li a').click(function () {
        var fenle = $(this).text();
        $.ajax(
            {
                type: 'GET',
                url: '../../tccp/news/getSubNews?pageNo=1&news_sub='+fenle,
                success: function (data) {
                    $('#dlList').empty();
                    $('#dlList').html(myTemplate(data));
                }
            }
        );
    });

    $.ajax(
        {
            type: 'GET',
            url: '../../tccp/notice/getAllNotice?pageNo=1',
            success: function (data) {
                var liTemplate = Handlebars.compile($("#li-temlate").html());
                $('#divList').html(liTemplate(data));
            }
        }
    ).then(function(){
        ajaxCount --;
        ajaxFinished();
    });



});