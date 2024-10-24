$(".mainnav--wrapper").hide();

$("#navbar-main .nav-item a").click(function () {
    $(this).parent().addClass('nav-item-open').siblings().removeClass('nav-item-open');
});
$("#navbar-main .nav-item").click(function () {
    $(this).addClass('nav-item-open').siblings().removeClass('nav-item-open');
});
$("#navbar-main .nav-item").mouseover(function () {
    $(this).addClass('nav-item-open').siblings().removeClass('nav-item-open');
});


function OpenPrdFinder() {
    $("#PrdFinderNav").toggle("slide");
}

function ClosePrdFinder() {
    $("#PrdFinderNav").toggle("slide");
}

$("#MenuOpen").click(function () {
    $(".mainnav--wrapper").toggle("slide");
});

$("#MenuClose").click(function () {
    $(".mainnav--wrapper").toggle("slide");
});

$(document.body).mousedown(function (event) {
    var target = $(event.target);
    if (!target.parents().andSelf().is('.mainnav')) {
        $(".mainnav--wrapper").hide();
    }
    if (!target.parents().andSelf().is('#PrdFinderNav')) {
        $("#PrdFinderNav").hide();
    }
});

$(".productlineups a").click(function () {
    var href = $(this).attr("href");
    var offsetTop = $(href).offset().top;
    $('html, body').stop().animate({
        scrollTop: offsetTop - 250
    }, 850);    
});

function HighlightPrdMenu() {
    try {
        var scrollPos = $(document).scrollTop();
        $('.productlineups a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top - 350 <= scrollPos && refElement.position().top + refElement.height() - 300 > scrollPos) {
                $('.productlineups a').removeClass("active");
                currLink.parent().addClass("active");
            }
            else {
                currLink.parent().removeClass("active");
            }
        });
    }
    catch (e) { }
}

function StickHeader() {    
    var height = '';
    var backImage = '';

    if ($('.page-banner').css('background-image') != "none") {
        backImage = $('.page-banner').css('background-image');        
    }
    else {
        backImage = "url('images/Sliders/water.jpg')";
    }

    height = $('.page-banner').css('min-height');
    height = height.replace("px", "");

    if ($(window).scrollTop() >= $(".page-banner").offset().top + Number(height) -100)
    {
        $(".header-holder").css('background-image', backImage);        
    }
    else {
        $(".header-holder").css('background-image', 'none');        
    }    
}

$(document).ready(function () {
    $(window).scroll(function () {
        try {
            if ($(window).scrollTop() + 150 >= $("#RegProducts").offset().top) {
                $("#TopProductsSection").show();
                $("#RegProducts").css('visibility', 'hidden');
            }
            else {
                $("#TopProductsSection").hide();
                $("#RegProducts").css('visibility', 'visible');
            }

            if ($(window).scrollTop() + 250 >= $("#EoProd").offset().top) {
                $("#TopProductsSection").hide();
            }
        }
        catch (e) { }

        HighlightPrdMenu();
        StickHeader();
    });
});

var imgHover = 0;
function FlipImage(imgSrc, baseTag) {
    var targetSrc = $(baseTag).find("img").prop('src');
    $("#" + imgSrc).attr("src", targetSrc);
    imgHover = 1;
}

function ResetFlip(imgSrc, oldSrc) {
    imgHover = 0;
    window.setTimeout(function () { if (imgHover == 0) { $("#" + imgSrc).attr("src", oldSrc); imgHover = 0; } }, 500);
}

function ShowRMMModal(modalId) {
    $("#" + modalId).show();
}

function HideRMMModal(modalId) {
    $("#" + modalId).hide();
}