/**
 * Created by Xu on 2017/6/4.
 */

/*****************************The url ***********************************************/
var COMMON_URL = "http://localhost:1189/api/";

$(function () {
    /******************检测用户是否登陆 *****************/
    var token = localStorage.getItem("token");
    var token_type = localStorage.getItem("token_type");
    if (token && token_type) {
        $("div.user-entrance").hide();
        $("div.user-entrance.after-login").show();

        $("div.header-user-entrance").hide();

        $("span.user-name").text(localStorage.getItem("name"));
    }
    /*******************注销 *****************************/
    $("div.user-entrance.after-login span.log-out").click(function () {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("token_type");
        if(location.href.indexOf("personal") === -1){
            location.reload();
        } else{
            window.location.href = "index.html";
        }
    });
    /*************** 为search bar添加动态效果  **********/
    $("#inpt_search").on('focus', function () {
        $(this).parent('label').addClass('active');
    }).on('blur', function () {
        if ($(this).val().length == 0)
            $(this).parent('label').removeClass('active');
    }).on('mouseover', function () {
        $("div.cntr-innr p").css("display", "block")
            .removeClass("hover");
    }).on('mouseout', function () {
        $("div.cntr-innr p").css("display", "inline-block")
            .addClass("hover");
    });
    /************** 增加动态效果********************************/
    $("div.main div.index-content").addClass("animated fadeInDown");
    $("div.main div.search-bar").addClass("animated fadeInUp");
    $("label.search").mouseover(function () {
        $("div.main").addClass("fading");
    }).mouseleave(function () {
        $("div.main").removeClass("fading");
    });
    /*******************************for the search ************************/
    $("li.full-empty-star").append(' <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1496747430879" class="icon" viewBox="0 0 1026 1024" version="1.1" p-id="1428" width="200.390625" height="200"><defs></defs><path d="M512.275763 112.128l112.64 228.352c11.776 24.064 34.816 40.96 61.44 44.544l252.416 36.864-182.784 178.176c-19.456 18.944-28.16 45.568-23.552 72.192l43.008 251.392-225.792-118.784c-11.776-6.144-24.576-9.216-37.888-9.216-13.312 0-26.112 3.072-37.888 9.216l-225.792 118.784 43.008-251.392c4.608-26.624-4.096-53.248-23.552-72.192L85.779763 421.888 338.195763 385.536c26.624-4.096 49.664-20.48 61.44-44.544L512.275763 112.128M512.275763 23.552c-9.728 0-19.456 5.12-24.576 15.36L350.995763 316.928c-4.096 8.192-11.776 13.824-20.48 14.848L23.315763 376.32c-22.528 3.072-31.232 30.72-14.848 46.08L230.675763 638.976c6.656 6.144 9.216 15.36 7.68 24.064l-52.224 305.664c-3.072 17.408 10.752 31.744 26.624 31.744 4.096 0 8.704-1.024 12.8-3.072l274.432-144.384c4.096-2.048 8.192-3.072 12.8-3.072 4.096 0 8.704 1.024 12.8 3.072l274.432 144.384c4.096 2.048 8.704 3.072 12.8 3.072 15.872 0 29.696-14.336 26.624-31.744l-52.224-305.664c-1.536-8.704 1.536-17.92 7.68-24.064l222.208-216.576c15.872-15.872 7.168-43.008-14.848-46.08l-306.688-44.544c-8.704-1.536-16.384-6.656-20.48-14.848L536.851763 38.912C531.731763 28.672 522.003763 23.552 512.275763 23.552L512.275763 23.552z" p-id="1429"/><path d="M487.699763 38.912 350.995763 316.928c-4.096 8.192-11.776 13.824-20.48 14.848L23.315763 376.32c-22.528 3.072-31.232 30.72-14.848 46.08L230.675763 638.976c6.656 6.144 9.216 15.36 7.68 24.064l-52.224 305.664c-3.584 22.016 19.456 38.912 39.424 28.672l274.432-144.384c4.096-2.048 7.168-3.072 12.8-3.072L512.787763 23.552C501.523763 23.552 492.819763 28.672 487.699763 38.912z" p-id="1430"/></svg>');

    //增加动态效果
    $("div.header").addClass("animated fadeInDown");
    $("table.movie-person").addClass("animated fadeInLeft");
    $("table.movie").addClass("animated fadeInRight");


    /*****************************绑定ajax事件 *****************************/
    var login = function (name, pwd) {
        $.ajax({
            type: 'post',
            url: COMMON_URL + 'token',
            data: {
                userName: name,
                password: pwd,
                grant_type: "password"
            },
            success: function (data, textStatus) {
                if (data.access_token && data.token_type) {
                    var token = data.access_token;
                    var bearer = data.token_type;
                }
                $("div.error-message.login").hide();
                $("div#loginModal").modal('hide');
                $("div.user-entrance").hide();
                $("div.user-entrance.after-login").show();

                $("div.header-user-entrance").hide();


                localStorage.setItem("name", name);
                localStorage.setItem("token", token);
                localStorage.setItem("token_type", bearer);

                $("div.user-entrance.after-login span.user-name").text(name);
            },
            error: function () {
                $("div.error-message.login").show().text("*账号或者密码错误");
            }
        });
    };
    $("#login_btn").click(function () {
        var name = $("#login-name").val();
        var pwd = $("#login-pwd").val();
        login(name, pwd);
    });
    $("#register_btn").click(function () {
        var name = $("#register-name").val();
        var pwd = $("#register-pwd").val();
        var re_pwd = $("#register-re-pwd").val();
        var $message = $("div.error-message.register");

        if (!name) {
            $message.show().text("*用户名为空");
            return;
        }
        if (!pwd || pwd.length < 8) {
            $message.show().text("*密码长度须大于8个字符");
            return;
        }
        if (pwd !== re_pwd) {
            $message.show().text("*两次密码输入不匹配");
            return;
        }

        $.ajax({
            type: 'post',
            url: COMMON_URL +  'account/register',
            data: {
                userName: name,
                password: pwd,
                confirmPassword: re_pwd
            },
            success: function (data, textStatus) {
                var name = data.userName;
                var pwd = data.password;
                login(name, pwd);
                $("div#registerModal").modal('hide');
            },
            error: function () {
                $("div.error-message.register").show().text("*该用户名已存在");
            }
        });
    });

    /********************************搜索事件***********************************/
    $("input#inpt_search").bind('keydown', function (event) {
        if (event.keyCode === 13) {
            var keyword = $(this).val();
            if (!keyword) {
                return;
            }
            // keyword = encodeURIComponent(keyword);
            // var url = "search-result.html?key=" + keyword;
            // window.location.href = encodeURI(url);
            window.location.href = connectURL("search-result.html", "key", keyword);
        }
    });
    /**************************评论事件******************************/
    $("#review_btn").click(function () {
        var review_text = $("textarea.review").val();
        var objKey = getParams();
        var keyword = objKey["movieId"];

        var is_scored = false;
        //必须先打分, false为没有打分
        $("ul.score li").each(function(){
            if($(this).hasClass("glyphicon glyphicon-star")){
                is_scored = true;
                return;
            }
        });
        if(is_scored == false){
            alert("请先打分");
            return;
        }

        $.ajax({
            type: 'POST',
            url: COMMON_URL +  'reviews/create',
            data: {
                movieId: keyword,
                Description: review_text
            },
            beforeSend: function (XMLHttpRequest) {
                var token = localStorage.getItem("token");
                var type = localStorage.getItem("token_type");
                XMLHttpRequest.setRequestHeader("Authorization", type + " " + token);
            },
            success: function () {
                $("#reviewModal").modal('hide');
                location.reload();
            },
            error: function () {
            }
        });

    });
    /***************************打分事件***************************/
    $("ul.score li.glyphicon.glyphicon-star-empty").click(function () {
        if ($(this).prevAll().hasClass("glyphicon glyphicon-star") || $(this).hasClass("glyphicon glyphicon-star")) {
            return;
        }

        var len = $(this).prevAll().length + 1;
        var $right_li = $(this);

        var objKey = getParams();
        var keyword = objKey["movieId"];
        $.ajax({
            type: 'POST',
            url: COMMON_URL +  'movies/score?movieId=' + keyword + "&score=" + len,
            data: {
                movieId: keyword,
                score: len
            },
            beforeSend: function (XMLHttpRequest) {
                var token = localStorage.getItem("token");
                var type = localStorage.getItem("token_type");
                XMLHttpRequest.setRequestHeader("Authorization", type + " " + token);
            },
            success: function () {
                $("span.score-final").text(len);
                $right_li.prevAll().removeClass().addClass("glyphicon glyphicon-star");
                $right_li.removeClass().addClass("glyphicon glyphicon-star");
                for (var i = 0; i < len; ++i) {
                    $("div#reviewModal li.glyphicon.glyphicon-star-empty:nth-child(" + (i + 1) + ")").removeClass().addClass("glyphicon glyphicon-star");
                }
            },
            error: function () {
                alert("请先登陆！");
            }
        });
    });
    //模态框
    $("div#reviewModal ul.score li.glyphicon.glyphicon-star-empty").click(function () {
        if ($(this).prevAll().hasClass("glyphicon glyphicon-star") || $(this).hasClass("glyphicon glyphicon-star")) {
            return;
        }

        var len = $(this).prevAll().length + 1;
        var $right_li = $(this);

        var objKey = getParams();
        var keyword = objKey["movieId"];

        $.ajax({
            type: 'POST',
            url: COMMON_URL +  'movies/score?movieId=' + keyword + '&score=' + len,
            data: {
                movieId: keyword,
                score: len
            },
            beforeSend: function (XMLHttpRequest) {
                var token = localStorage.getItem("token");
                var type = localStorage.getItem("token_type");
                XMLHttpRequest.setRequestHeader("Authorization", type + " " + token);
            },
            success: function () {
                $("span.score-final").text(len);
                $right_li.prevAll().removeClass().addClass("glyphicon glyphicon-star");
                $right_li.removeClass().addClass("glyphicon glyphicon-star");

                for (var i = 0; i < len; ++i) {
                    $("div.function-bar li.glyphicon.glyphicon-star-empty:nth-child(" + (i + 1) + ")").removeClass().addClass("glyphicon glyphicon-star");
                }
            },
            error: function () {
            }
        });

    });
    /********************************了解更多****************************/
    $("span.director-more, span.actor-more").click(function () {
        var text = $(this).parent().parent().find("span.person-title").text();
        var url = "http://www.baidu.com/s?wd=" + text;
        window.location.href = url;
    });
    /************************按类型搜索******************************/
    $("div.movie-dropdown-content ul li").click(function () {
        var type = $(this).attr("id");
        if (type == null) {
            return;
        }
        window.location.href = connectURL("search-type.html", "type", type);
    });
    /**************************top100**********************************/
    $("a#movie-top-search").click(function(){
        window.location.href = "top-movie.html";
    });
    /************链接到homepage******************/
    $("span.user-name, span.user-profile").click(function(){
        window.location.href = "personal.html";
    });
    /***********homepage 中的导航栏*************/
    $("div.side-bar ul li").click(function(){
        var content = $(this).text();
        $("h3.panel-title a").each(function(){
            if( $(this).text().indexOf(content) != -1){
                $(this).click();
            }
        });
    });

     /****************************轮播技术**********************************************/
    $("div.movie-ticket span.carousel-left").click(function(e){
        var $current = $("div#movie-carousel div.active");
        if($current.prev() && $current.prev().hasClass("item")){
            $current.removeClass("active");
            $current.hide();
            $current.prev().addClass("active");
            $current.prev().show();
        }
    });
    $("div.movie-ticket span.carousel-right").click(function(){
        var $current = $("div#movie-carousel div.active");
        if($current.next() && $current.next().hasClass("item")){
            $current.removeClass("active");
            $current.hide();
            $current.next().addClass("active");
            $current.next().show();
        }
    });

    /******************************增加影院座位**************************************/
    var $theater = $("div.movie-theater");
    for(var i = 0; i < 10; ++ i) {
        for(var j = 0; j < 12; ++ j) {
            var $seat = $("<div class='movie-seat'></div>");
            $seat.attr("data-row", i);
            $seat.attr("data-col", j);
            $theater.append($seat);
        }
    }
    $("div.movie-theater div.movie-seat").click(function(){
        var row = $(this).data("row");
        var col = $(this).data("col");
        console.log(row + "  " + col);
        $(this).css("background-color", "#F38994");
    });
    /********************************购票入口************************************/
    $("#buy-ticket").click(function(){
        if(localStorage.getItem("token") && localStorage.getItem("token_type")){
            window.location.href = "buy-ticket.html";
        } else{
            alert("请先登录！");
        }
    });
});

/********************************************End of document loading****************************************/

 /**************点赞或者踩评论********************/
function upReview(right) {
    var $right = $(right);
    var option = 'up';
     if($right.prop("reviewed")){
        return;
    }

    $right.prop("reviewed", true);

    upDown($right, option);
}
function downReview(right){
    var $right = $(right);
    var option = 'down';
    if($right.prop("reviewed")){
        return;
    }
    $right.prop("reviewed", true);
    upDown($right, option);
}
function upDown($right, option){
    var id = $right.parent().data("review");

    $.ajax({
        type: 'POST',
        url: COMMON_URL +  'reviews/updown?reviewId=' + id + '&updown=' + option,
        data:{
            reviewId: id,
            upDown: option
        },
         beforeSend: function (XMLHttpRequest) {
                var token = localStorage.getItem("token");
                var type = localStorage.getItem("token_type");
                XMLHttpRequest.setRequestHeader("Authorization", type + " " + token);
        },
        success: function(data){
            var $num = $right.prev();
            $num.text(parseInt($num.text()) + 1);

        },
        error: function(){
            alert("请登录");
        }
    });
}

//loading effect
function loadingEffect($loading) {

    $(document).ajaxStart(function () {
        $loading.show();
        $("div.main div[class^='movie-']").hide();
        $("div.personal.main div[class^='movies-']").hide();
    }).ajaxStop(function () {
        $loading.hide();
        $("div.main div[class^='movie-']").show();
        $("div.personal.main div[class^='movies-']").show();
    });
}

function connectURL(url, key, value) {
    value = encodeURIComponent(value);
    url = url + "?" + key + "=" + value;
    return encodeURI(url);
}

function getParams() {
    var search = decodeURI(location.search);
    search = decodeURIComponent(search);
    var theRequest = {};
    if (search.indexOf("?") != -1) {
        var str = search.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; ++i) {
            var pairs = strs[i].split("=");
            theRequest[pairs[0]] = decodeURIComponent(pairs[1]);
        }
    }
    return theRequest;
}
//增加评分星星数量
function addStars(movies) {
    var $starList = $("div.allstar ul");

    $starList.each(function (index) {
        var score = Math.floor(movies[index].score);
        var over = Math.ceil(movies[index].score);
        var empty = 5;

        for (var j = 0; j < score; ++j) {
            $(this).append('<li class="glyphicon glyphicon-star"></li>');
        }
        if (score == 5) {
            return;
        } else if (score !== over) {
            $(this).append('<li class="full-empty-star"></li>');
            empty = 4;
        }

        for (var k = j; k < empty; ++k) {
            $(this).append('<li class="glyphicon glyphicon-star-empty"></li>');
        }
    });
    $("li.full-empty-star").append(' <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1496747430879" class="icon" viewBox="0 0 1026 1024" version="1.1" p-id="1428" width="200.390625" height="200"><defs></defs><path d="M512.275763 112.128l112.64 228.352c11.776 24.064 34.816 40.96 61.44 44.544l252.416 36.864-182.784 178.176c-19.456 18.944-28.16 45.568-23.552 72.192l43.008 251.392-225.792-118.784c-11.776-6.144-24.576-9.216-37.888-9.216-13.312 0-26.112 3.072-37.888 9.216l-225.792 118.784 43.008-251.392c4.608-26.624-4.096-53.248-23.552-72.192L85.779763 421.888 338.195763 385.536c26.624-4.096 49.664-20.48 61.44-44.544L512.275763 112.128M512.275763 23.552c-9.728 0-19.456 5.12-24.576 15.36L350.995763 316.928c-4.096 8.192-11.776 13.824-20.48 14.848L23.315763 376.32c-22.528 3.072-31.232 30.72-14.848 46.08L230.675763 638.976c6.656 6.144 9.216 15.36 7.68 24.064l-52.224 305.664c-3.072 17.408 10.752 31.744 26.624 31.744 4.096 0 8.704-1.024 12.8-3.072l274.432-144.384c4.096-2.048 8.192-3.072 12.8-3.072 4.096 0 8.704 1.024 12.8 3.072l274.432 144.384c4.096 2.048 8.704 3.072 12.8 3.072 15.872 0 29.696-14.336 26.624-31.744l-52.224-305.664c-1.536-8.704 1.536-17.92 7.68-24.064l222.208-216.576c15.872-15.872 7.168-43.008-14.848-46.08l-306.688-44.544c-8.704-1.536-16.384-6.656-20.48-14.848L536.851763 38.912C531.731763 28.672 522.003763 23.552 512.275763 23.552L512.275763 23.552z" p-id="1429"/><path d="M487.699763 38.912 350.995763 316.928c-4.096 8.192-11.776 13.824-20.48 14.848L23.315763 376.32c-22.528 3.072-31.232 30.72-14.848 46.08L230.675763 638.976c6.656 6.144 9.216 15.36 7.68 24.064l-52.224 305.664c-3.584 22.016 19.456 38.912 39.424 28.672l274.432-144.384c4.096-2.048 7.168-3.072 12.8-3.072L512.787763 23.552C501.523763 23.552 492.819763 28.672 487.699763 38.912z" p-id="1430"/></svg>');
}

//针对搜索结果增加链接
function addAllLinks() {
    //针对人名标签
    $("span.person").click(function () {
        if ($(this).data("director")) {
            var directorId = $(this).data("director");
            goToDirectors(directorId);
        } else {
            var actorId = $(this).data("actor");
            goToAcotrs(actorId);
        }
    });
    //针对人物海报
    $("td.person").click(function () {
        var $id = $(this).parent().find("span.person.person-title");
        if ($id.data("director")) {
            goToDirectors($id.data("director"));
        } else {
            goToAcotrs($id.data("actor"));
        }
    });
    //针对电影标题
    $("span.movie-title").click(function () {
        goToMovies($(this).data("movie"));
    });
    //针对电影海报
    $("td.movie").click(function () {
        var $id = $(this).parent().find("span.movie-title");
        goToMovies($id.data("movie"));
    });
}
//针对电影页面增加链接
function addMovieLinks() {
    $("div.recommend-movie img").click(function () {
        var $id = $(this).next();
        goToMovies($id.data("movie"));
    });
    $("div.recommend-movie a").click(function () {
        goToMovies($(this).data("movie"));
    });
}

//ajax to director
function goToDirectors(dId) {
    window.location.href = connectURL("director.html", "directorId", dId);
}
//ajax to actor
function goToAcotrs(aId) {
    window.location.href = connectURL("actor.html", "actorId", aId);
}
//ajax to movie
function goToMovies(mId) {
    window.location.href = connectURL("movie.html", "movieId", mId);
}

var searchByType = function (type) {
    if (type == null) {
        return;
    }
    $.ajax({
        type: 'GET',
        url:  COMMON_URL + 'movies/genres',
        data: {
            genre: type
        },
        success: function (data) {
            var movies = data;
            $("div.movie-person").hide();

            Vue.filter('formatDate', function (input) {
                if (!input) return " ";
                var year = input.slice(0, 4);
                var month = input.slice(4, 6);
                var day = input.slice(6, 8);
                return year + "-" + month + "-" + day;
            });
            var mmovie = new Vue({
                el: '#movie_list',
                data: {
                    movies: movies
                }
            });
            addStars(movies);
            addAllLinks();
        },
        error: function () {
        }
    });
}


function dealWithInfoScore($starList, score) {
    var fscore = Math.floor(score);
    var over = Math.ceil(score);
    var empty = 5;

    for (var j = 0; j < fscore; ++j) {
        $starList.append("<li class='glyphicon glyphicon-star'></li>");
    }
    if (fscore != 5) {
        if (fscore !== over) {
            var $empty_full = $('<li class="full-empty-star"></li>');
            $empty_full.append(' <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1496747430879" class="icon" viewBox="0 0 1026 1024" version="1.1" p-id="1428" width="200.390625" height="200"><defs></defs><path d="M512.275763 112.128l112.64 228.352c11.776 24.064 34.816 40.96 61.44 44.544l252.416 36.864-182.784 178.176c-19.456 18.944-28.16 45.568-23.552 72.192l43.008 251.392-225.792-118.784c-11.776-6.144-24.576-9.216-37.888-9.216-13.312 0-26.112 3.072-37.888 9.216l-225.792 118.784 43.008-251.392c4.608-26.624-4.096-53.248-23.552-72.192L85.779763 421.888 338.195763 385.536c26.624-4.096 49.664-20.48 61.44-44.544L512.275763 112.128M512.275763 23.552c-9.728 0-19.456 5.12-24.576 15.36L350.995763 316.928c-4.096 8.192-11.776 13.824-20.48 14.848L23.315763 376.32c-22.528 3.072-31.232 30.72-14.848 46.08L230.675763 638.976c6.656 6.144 9.216 15.36 7.68 24.064l-52.224 305.664c-3.072 17.408 10.752 31.744 26.624 31.744 4.096 0 8.704-1.024 12.8-3.072l274.432-144.384c4.096-2.048 8.192-3.072 12.8-3.072 4.096 0 8.704 1.024 12.8 3.072l274.432 144.384c4.096 2.048 8.704 3.072 12.8 3.072 15.872 0 29.696-14.336 26.624-31.744l-52.224-305.664c-1.536-8.704 1.536-17.92 7.68-24.064l222.208-216.576c15.872-15.872 7.168-43.008-14.848-46.08l-306.688-44.544c-8.704-1.536-16.384-6.656-20.48-14.848L536.851763 38.912C531.731763 28.672 522.003763 23.552 512.275763 23.552L512.275763 23.552z" p-id="1429"/><path d="M487.699763 38.912 350.995763 316.928c-4.096 8.192-11.776 13.824-20.48 14.848L23.315763 376.32c-22.528 3.072-31.232 30.72-14.848 46.08L230.675763 638.976c6.656 6.144 9.216 15.36 7.68 24.064l-52.224 305.664c-3.584 22.016 19.456 38.912 39.424 28.672l274.432-144.384c4.096-2.048 7.168-3.072 12.8-3.072L512.787763 23.552C501.523763 23.552 492.819763 28.672 487.699763 38.912z" p-id="1430"/></svg>');

            $starList.append($empty_full);
            empty = 4;
        }
    }
    for (var k = j; k < empty; ++k) {
        $starList.append('<li class="glyphicon glyphicon-star-empty"></li>');
    }
}

function dealWithReviewScore(reviews){
    var $starList = $("div.comment-zone ul.allstar");

    $starList.each(function(index){
        var score = reviews[index].score;
        dealWithInfoScore($(this), score);
    });
}











