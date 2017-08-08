jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
        isMobileHead = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
        if(isMobileHead){
        headerHeight = $('.logobox').height()+$('.mob-topbar').height();
        }else{
            headerHeight = $('.top-bar').height();
        }
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
//	$(window).load(function(){'use strict';
//		var $portfolio_selectors = $('.portfolio-filter >li>a');
//		var $portfolio = $('.portfolio-items');
//		$portfolio.isotope({
//			itemSelector : '.portfolio-item',
//			layoutMode : 'fitRows'
//		});

//		$portfolio_selectors.on('click', function(){
//			$portfolio_selectors.removeClass('active');
//			$(this).addClass('active');
//			var selector = $(this).attr('data-filter');
//			$portfolio.isotope({ filter: selector });
//			return false;
//		});
//	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});


	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});

	//Pretty Photo
//	$("a[rel^='prettyPhoto']").prettyPhoto({
//		social_tools: false
//	});

});

//Account Drop Down
	$(document).ready(function(e){
    $('#acc_drop .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('#acc_drop span#search_concept').text(concept);

	});
});


// travel plan


$(".product_header_path_item.back").click(function(){
	BackMe();
});


// PANELS

var chk = 0;
  $('.fwdpanel-minimize').click(function(e){
    e.preventDefault();
    if(chk == 0){
    	chk = 1;
    var $target = $(this).parent().parent().parent().next('.fwdpanel-body');
    $(this).children('i').toggleClass('fa-minus');


    $target.slideToggle("slow", function(){
    	chk = 0;
    });
    //chk = 0;
    }
 });

var product_plan_panel_valid=true;
$('.product_plan_panel').click(function(e){
	if(product_plan_panel_valid){
		product_plan_panel_valid=false;
		$panel=$(this);

		if($panel.next('.product_plan_panel_content:visible').length>0){
			$('.product_plan_panel').find('.fa-chevron-up').addClass('fa-chevron-down');
			$('.product_plan_panel').find('.fa-chevron-up').removeClass('fa-chevron-up');
			$('.product_plan_panel_content:visible').slideUp("slow",function(){
				$(".product_plan_panel_content").mCustomScrollbar("destroy");
				product_plan_panel_valid=true;
			});
		}else if($('.product_plan_panel_content:visible').length>0){
			$('.product_plan_panel').find('.fa-chevron-up').addClass('fa-chevron-down');
			$('.product_plan_panel').find('.fa-chevron-up').removeClass('fa-chevron-up');
			$('.product_plan_panel_content:visible').slideUp("slow",function(){
				$(".product_plan_panel_content").mCustomScrollbar("destroy");

				var $target = $panel.next('.fwdpanel-body');
				scrollDownProductPanel($target);
			});
		}else{
			var $target = $panel.next('.fwdpanel-body');
			scrollDownProductPanel($target);
		}
	}
});

var product_plan_inner_panel_valid=true;
$('.product_plan_inner_panel').click(function(e){
	//console.log("1");
	if(product_plan_inner_panel_valid){
		product_plan_inner_panel_valid=false;
		$panel=$(this);
		//console.log($panel);
		if($panel.next('.product_plan_inner_panel_content:visible').length>0){
			$('.product_plan_inner_panel').find('.fa-minus').addClass('fa-plus');
			$('.product_plan_inner_panel').find('.fa-minus').removeClass('fa-minus');
			$('.product_plan_inner_panel_content:visible').slideUp("slow",function(){
				var $target = $panel.next('.fwdpanel-body');
				$target.find('table').parent().removeAttr('id');

				product_plan_inner_panel_valid=true;
				//console.log($panel.parents(".mCustomScrollbar"));
				$panel.parents(".mCustomScrollbar").mCustomScrollbar('scrollTo', $panel);

			});
		}else if($('.product_plan_inner_panel_content:visible').length>0){
			$("#plan-no-more-tables").removeAttr('id');
			$('.product_plan_inner_panel').find('.fa-minus').addClass('fa-plus');
			$('.product_plan_inner_panel').find('.fa-minus').removeClass('fa-minus');
			$('.product_plan_inner_panel_content:visible').slideUp("fast",function(){
				var $target = $panel.next('.fwdpanel-body');
				$target.find('table').parent().attr('id', 'plan-no-more-tables');
				$target.slideDown("slow", function(){
					$panel.find('i').removeClass('fa-plus');
					$panel.find('i').addClass('fa-minus');

					product_plan_inner_panel_valid=true;
					$panel.parents(".mCustomScrollbar").mCustomScrollbar('scrollTo', $panel);
					$('html, body').animate({
						scrollTop: $panel.offset().top - headerHeight
					}, 500);
				});
			});
		}else{
			$("#plan-no-more-tables").removeAttr('id');
			var $target = $panel.next('.fwdpanel-body');
			$target.find('table').parent().attr('id', 'plan-no-more-tables');
			$target.slideDown("slow", function(){
				$panel.find('i').removeClass('fa-plus');
				$panel.find('i').addClass('fa-minus');

				product_plan_inner_panel_valid=true;
				$panel.parents(".mCustomScrollbar").mCustomScrollbar('scrollTo', $panel);
				$('html, body').animate({
					scrollTop: $panel.offset().top - headerHeight
				}, 500);
			});
		}
	}
});

function scrollDownProductPanel($element){
	$element.slideDown("slow", function(){
		$panel.find('i').addClass('fa-chevron-up');
		$panel.find('i').removeClass('fa-chevron-down');
		$.mCustomScrollbar.defaults.scrollButtons.enable=true; //enable scrolling buttons by default
		$.mCustomScrollbar.defaults.axis="y";
		$(".product_plan_panel_content").mCustomScrollbar({
			theme:"light-2"
		});

		product_plan_panel_valid=true;

		$('html, body').animate({
			scrollTop: $panel.offset().top - headerHeight
		}, 500);
	});
}




//Scroll top  Get more link
$(document).ready(function(){

  //Check to see if the window is top if not then display button
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  var scrollToTopValid=true;
  //Click event to scroll to top
  $('.scroll-to-top').click(function(){
if(scrollToTopValid){
	scrollToTopValid=false;
	$('html, body').animate({scrollTop : 0},400, function() {
		scrollToTopValid=true;
	});
}
  });

//Check to see if the window is top if not then display button
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });

  //Click event to scroll to top
  $('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 0},400);
    return false;
  });

});
/// Auto fill inputbox on   plan details
//$("#inputFullName").keyup(function() {
//   document.getElementById("txtAdFullName1").value = this.value;
//});

//$("#inputTxtAppHkid").keyup(function() {
//   //document.getElementById("txtInsuHkid1").value = this.value;
//	$("#txtInsuHkid1").val(this.value).css("color", "#000000");
//});



jQuery(document).ready(function() {

	/* fixed-content js */

	/*if($(window).height() > $('.carousel').height()  + 40 + 131 + $('#middle').height()){
		jQuery('#middle').removeClass("fixed-content");
	}else if($('#middle').length){
		$(window).scroll(function (event) {
		    var scroll = $(window).scrollTop();
		    var winh = $(window).height();
		    var diff = $('.carousel').height() + 40 + 131 + $('#middle').height() - winh;

		    // Do something
		    if (scroll > diff) {
			    jQuery('#middle').removeClass("fixed-content");
			  } else {
			    jQuery('#middle').addClass("fixed-content");
			  }
		});
	}


	if($(window).height() > $('.carousel').height()  + 40 + 131 + $('#homecare-scroll').height()){
		jQuery('#homecare-scroll').removeClass("fixed-content");
	}else if($('#homecare-scroll').length){

	        $(window).scroll(function (event) {
	            var scroll = $(window).scrollTop();
	            var winh = $(window).height();
	            var diff = $('.carousel').height()  + 40 + 131 + $('#homecare-scroll').height() - winh;

	            // Do something
	            if (scroll > diff) {
	                jQuery('#homecare-scroll').removeClass("fixed-content");
	              } else {
	                jQuery('#homecare-scroll').addClass("fixed-content");
	              }
	            });
	    //}
	}
	*/
	if(jQuery("#d_clip_button").length){
		var clip = new ZeroClipboard(jQuery("#d_clip_button"));
		var message = getBundle(getBundleLanguage, "confirmation.share.copy");
	  clip.on("ready", function() {
		var oldText = jQuery("#d_clip_button").text();
	    this.on("aftercopy", function(event) {
	    	jQuery("#d_clip_button").width(jQuery("#d_clip_button").width()).text(message).css('padding',0);
	    	setTimeout(function(){ jQuery("#d_clip_button").text(oldText) }, 10000);
	    });
	  });
	}
	if($('.account-dropdown').length && $('#tab-dropdown').length){
		$('.account-dropdown .dropdown-menu a').click(function(){
			var $this = $(this);
			var anchor = $(this).attr('href');
			$('.tab-content .tab-pane').hide();
			$(anchor).show();
			$this.parents('.account-dropdown').children('button').children('.button-text').text($this.text());
			$this.parents('.dropdown-menu').children('li').removeClass('active');
			$this.parent('li').addClass('active');
		});
		$('#tab-dropdown li a').click(function(){
			var $this = $(this);
			var anchor = $(this).attr('href');
			var anchor = $(this).attr('href');
			$('.tab-content .tab-pane').hide();
			$(anchor).show();
			$('.account-dropdown').children('button').children('.button-text').text($this.text());
			$('.account-dropdown .dropdown-menu').children('li').removeClass('active');
			$('.account-dropdown .dropdown-menu').children('li').each(function(){
				$(this).removeClass('active');
				if($(this).children('a').attr('href') == anchor){
					$(this).addClass('active');
				}
			});
		});
	}
});

var chk_cat = 0;
$('.faq_content').click(function(e){
	e.preventDefault();
	if(chk_cat == 0){
		$panel=$(this);

		chk_cat = 1;
		var $target = $(this).next('.faq_cat_detail');

		$(this).children('.faq_cat_arrow').children('.faq_cat_mini').children('i').toggleClass('fa-chevron-down');
		$(this).children('.faq_cat_arrow').children('.faq_cat_mini').children('i').toggleClass('fa-chevron-up');

		$target.slideToggle(function(){
			chk_cat = 0;

			$('html, body').animate({
				scrollTop: ($panel.offset().top - 50)
			}, 800);

		});
	}
});


var faq_url_click = false;
$(".faq_answer_url").click(function () {
	faq_url_click = true;
});


var chk_qna = 0;
$('.faq_qna').click(function(e){
	if (faq_url_click != true) {
		e.preventDefault();
		if(chk_qna == 0){
			$panel=$(this);

			chk_qna = 1;
			var $target = $(this).children('.faq_answer_container');

			$(this).children().children('.faq_question_arrow').children('.faq_qna_mini').children('i').toggleClass('fa-minus');

			var $question = $(this).parent().prev('.faq_question');

			$question.toggleClass("active");

			$target.slideToggle(function(){
				chk_qna = 0;

				$('html, body').animate({
					scrollTop: ($panel.offset().top - 50)
				}, 800);
			});
		}
	}
	faq_url_click = false;
});

function faqChangeCare(element, care, remote){
	$(".faq_menu_item").removeClass('active');
	if(remote == false){
		$(element).addClass('active');
	}else if(remote == true){
		$("#"+element).addClass('active');
	}

	$(".faq_care_container").hide();
	$("#faq_"+care).show();
}

function faqChangeCareMob(care){
	$("#faq_main_menu_mob").hide();
	$("#faq_"+care+"_mob").show();
}

function faqMainMenuMob(care){
	$("#faq_"+care+"_mob").hide();
	$("#faq_main_menu_mob").show();
}

/* Added on June 17 */
function showSubmitError(msg, bShow){
	//Assume only 1 submit error message for a page
	if(bShow){
		$('.submit__error').addClass('submit__error--show');
		$('.submit__errormsg').html(msg);
	} else {
		$('.submit__error').removeClass('submit__error--show');
		$('.submit__errormsg').html('');
	}
}

/* added on 07-11-2016 for 1111 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
function resize_image_and_to_center(ele){
	var window_width = $(window).width();
	var window_height = $(window).height();
	$(ele).css({
		"max-width" : window_width,
		"max-height" : window_height,
	});
	var img_height = $(ele).height();
	var img_width = $(ele).width();
	$(ele).css({
		"margin-left" : -img_width/2,
		"margin-top" : -img_height/2,
	});
}
function show_1111_campaign(domain,lang){
	var is_show_1111 = getCookie("is_show_1111");
	if(is_show_1111 == ""){
		var img_src_small = domain + "/resources/images/1111_campaign/small";
		var img_src_large = domain + "/resources/images/1111_campaign/large";
		var img_src = img_src_large;
		var window_width = $(window).width();
		var window_height = $(window).height();
		if(window_width <= 768){
			img_src = img_src_small
		}
		if(lang=="en"){
			img_src += "_en.jpg"
		}else{
			img_src += "_tc.jpg"
		}
		var html = "<div class=\"wrapper_1111\"><div class=\"modal-backdrop fade in\"></div>";
		var img = "<img class=\"img_1111\" src=\""+ img_src +"\" ></img>";
		html = (html + img + "</div>");
		$("body").prepend(html);
		$(".wrapper_1111 .modal-backdrop").click(function(){$(".wrapper_1111").hide();});
		resize_image_and_to_center(".img_1111");
		/* center the image */
		$(".img_1111").load(function(){
			var img_height = $(".img_1111").height();
			var img_width = $(".img_1111").width();
			console.log(img_height);
			$(this).css({
				"margin-left" : -img_width/2,
				"margin-top" : -img_height/2,
				"opacity" : "1"
			});
			$(this).click(function(){
				window.location.href = "https://1111.fwd.com.hk/" + lang;
			})
		});
		$(window).resize(function(){
			resize_image_and_to_center(".img_1111");
		});
		
		var d = new Date();
	    d.setTime(d.getTime() + (3*60*60*1000));	//show again after 3hours
	    //d.setTime(d.getTime() + (20*1000)); //20s for testing
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = "is_show_1111=1;path=/;expires=" + expires;
	}
}
/* added on 07-11-2016 for 1111 */