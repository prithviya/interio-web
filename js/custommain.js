// page init
jQuery(function(){
	"use strict";

	initTabs();
	initbackTop();
	initAddClass();
	initLightbox();
	initMarquee();
	initSlickSlider();
	initStyleChanger();

	jQuery(window).on('load', function() {
		"use strict";

		initIsoTop();
		initPreLoader();
	});

	// Add Class  init
	function initAddClass() {
		"use strict";
		
		jQuery('.nav-opener').on( "click", function(e){
			e.preventDefault();
			jQuery("body").toggleClass("nav-active");
		});
	}

	// IsoTop init
	function initIsoTop() {
		"use strict";

		var isotopeHolder = jQuery('.project-holder'),
			win = jQuery(window);
		jQuery('.filter-list a').on( "click", function(e){
			e.preventDefault();
			
			jQuery('.filter-list li').removeClass('active');
			jQuery(this).parent('li').addClass('active');
			var selector = jQuery(this).attr('data-filter');
			isotopeHolder.isotope({ filter: selector });
		});
		jQuery('.project-holder').isotope({
			itemSelector: '.col',
			transitionDuration: '0.6s',
			masonry: {
		    	columnWidth: '.col'
			}
		});
	}

	// Slick Slider init
	function initSlickSlider() {
		"use strict";

		jQuery('.main-slider').slick({
			dots: true,
			speed: 800,
			infinite: true,
			slidesToShow: 1,
			adaptiveHeight: true,
			autoplay: true,
			arrow: true,
			fade: true,
			autoplaySpeed: 4000
		});
		jQuery('.work-slider').slick({
			dots: false,
			speed: 800,
			infinite: true,
			slidesToShow: 1,
			adaptiveHeight: true,
			autoplay: false,
			arrow: true,
			fade: true,
			autoplaySpeed: 4000
		});
		jQuery('.team-slider').slick({
			dots: false,
			speed: 1000,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			adaptiveHeight: true,
			autoplay: true,
			arrow: true,
			autoplaySpeed: 800,
			responsive: [
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1
              }
            }
            ]
		});
	}

	// backtop init
	function initbackTop() {
		"use strict";

	    var jQuerybackToTop = jQuery("#back-top");
	    jQuery(window).on('scroll', function() {
	        if (jQuery(this).scrollTop() > 100) {
	            jQuerybackToTop.addClass('active');
	        } else {
	            jQuerybackToTop.removeClass('active');
	        }
	    });
	    jQuerybackToTop.on('click', function(e) {
	        jQuery("html, body").animate({scrollTop: 0}, 900);
	    });
	}

	// PreLoader init
	function initPreLoader() {
	    "use strict";

	    jQuery('#loader').delay(300).fadeOut();
	}

	// modal popup init
	function initLightbox() {
		"use strict";

		jQuery('a.lightbox, a[rel*="lightbox"]').fancybox({
			helpers: {
				overlay: {
					css: {
						background: 'rgba(0, 0, 0, 0.65)'
					}
				}
			},
			afterLoad: function(current, previous) {
				// handle custom close button in inline modal
				if(current.href.indexOf('#') === 0) {
					jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e){
						e.preventDefault();
						jQuery.fancybox.close();
					});
				}
			},
			padding: 0
		});
		jQuery("#newsletter-hiddenlink").fancybox().trigger('click');
	}

	// running line init
	function initMarquee() {
		"use strict";

		jQuery('.line-box').marquee({
			line: '.line',
			animSpeed: 50
		});
	}

	// content tabs init
	function initTabs() {
		"use strict";
		
		jQuery('ul.tabset').tabset({
			tabLinks: 'a',
			defaultTab: false
		});
	}

	// style changer
	function initStyleChanger() {
		"use strict";
		
		var element = jQuery('#style-changer');

		if(element) {
			$.ajax({
				url: element.attr('data-src'),
				type: 'get',
				dataType: 'text',
				success: function(data) {
					var newContent = jQuery('<div>', {
						html: data
					});

					newContent.appendTo(element);
				}
			});
		}
	}

});

$("a.prettyphoto").prettyPhoto();

$("a[rel^='prettyPhoto']").prettyPhoto({
    animation_speed: 'fast',
    slideshow: 10000,
    hideflash: false,
    social_tools: '',
    deeplinking: false,
    default_width: '95%',
    allow_resize: true,
    horizontal_padding: 20
});

function OpenPPGallery(galleryId)
{
    var gallery = $("#" + galleryId);
    gallery.click();
    return false;
}

function setWindowTitle(titleText, categoryName) {
    document.title = titleText + " :: " + categoryName + " :: MAHENDRA PUMPS ::";
}

$(".head-after span").click(
    function ()
    {   
        $(this).siblings().removeClass('filterActive');
        $(this).addClass('filterActive');

        var filter = $(this).attr('data-filter');
        if (filter === '*') {
            $(".filter-item").each(function (index) {
                $(this).show(200);
            });
        }
        else {
            $(".filter-item").each(function (index) {
                if ($(this).attr('class').indexOf("filter-" + filter) > -1) {
                    $(this).show(200);
                }
                else {
                    $(this).hide(200);
                }
            });                        
        }
    }
);

function SubscribeEmail(folderPath) {
    var formData = $("#subscribe_mail").serializeArray();
    $.ajax({
        type: "POST",
        url: folderPath + "php/subscribe.php",
        data: formData,
        dataType: "html",
        success: function (result) {
            $('#response').html(result);
            $('#response').delay(3000).fadeOut();
            $("#subscribe_mail").val("");
        },
        error: function (jqXHR, textStatus, errorThrown, result) {
            $('#response').html(result);
        }
    });
    return false;
}

function ShowRMMModal(modalId, itemType) {
    $("#" + modalId).show();

    $("#ConnectForm .purpose").val('');

    $("#ConnectForm .purpose").val(itemType);
}

function HideRMMModal(modalId) {
    $("#" + modalId).hide();
    return false;
}

function SendEnquiryDetails(folderPath) {
    try {
        if ($('#EnquiryForm')[0].checkValidity()) {
            var formData = $("#EnquiryForm").serializeArray();
            formData.push({ name: "CallType", value: "NewEnquiry" });
            $("#EnquiryModal #SubmitDetails").attr("disabled", true);
            $("#EnquiryModal #LoaderImage").show();

            $.ajax({
                type: "POST",
                url: folderPath + "php/Enquiry-Online.php",
                data: formData,
                dataType: "html",
                success: function (result) {
                    if (result.indexOf("Success") > -1) {
                        $("#EnquiryModal #success").show();
                        $("#EnquiryModal #error").hide();

                        $("#EnquiryModal #LoaderImage").hide();
                        $('#EnquiryForm')[0].reset();

                        $('#EnquiryForm').hide();
                        $("#EnquiryModal #SubmitDetails").attr("disabled", false);

                        setTimeout(function ()
                        {
                            $('#EnquiryForm').show();
                            $("#EnquiryModal #success").hide();
                        }, 3000);                        
                    }
                    else {
                        $("#EnquiryModal #success").hide();
                        $("#EnquiryModal #error").show();
                        $("#EnquiryModal #SubmitDetails").attr("disabled", false);
                        $("#EnquiryModal #LoaderImage").hide();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown, result) {
                    $("#EnquiryModal #SubmitDetails").attr("disabled", false);
                    $("#EnquiryModal #LoaderImage").hide();
                }
            });
        }
    }
    catch (e) {
        $("#EnquiryModal #SubmitDetails").attr("disabled", false);
        $("#EnquiryModal #LoaderImage").hide();
        //alert("Error: " + e.Message);
    }
    return false;
}

$("#navbar-main a").click(
    function (event)
    {
        if ($(this).attr('href')) {
            //$("#loader").show();
        }
    }
);