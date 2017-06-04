/**
 * Created by Xu on 2017/6/4.
 */
$(function () {
    /*************** 为search bar添加动态效果  **********/
    $("#inpt_search").on('focus', function () {
        $(this).parent('label').addClass('active');
    }).on('blur', function () {
        if ($(this).val().length == 0)
            $(this).parent('label').removeClass('active');
    }).on('mouseover', function(){
         $("div.cntr-innr p").css("display", "block")
             .removeClass("hover");
    }).on('mouseout', function(){
         $("div.cntr-innr p").css("display", "inline-block")
             .addClass("hover");
    });

});
