
$(function() {

	$('#eServices-mobile-notications').click(function(){
		$('#notifications-mobile').removeClass('hidden');

		$('#headerNavmenu').offcanvas('hide');

		//Landing Page
		if(($('#eServices-landing-page').length) > 0){
			$('#eServices-landing-page').addClass('hidden');
		}

		//Personal Info
		if(($('#eServices-personal-info').length) > 0){
			$('#eServices-personal-info').addClass('hidden');
		}

		//Purchase History
		if(($('#eServices-purchase-history').length) > 0){
			$('#eServices-purchase-history').addClass('hidden');
		}

		//Referrals and Promo
		if(($('#eServices-referral').length) > 0){
			$('#eServices-referral').addClass('hidden');
		}

		//Document Upload
		if(($('#eServices-document-upload').length) > 0){
			$('#eServices-document-upload').addClass('hidden');
		}

		//Signature
		if(($('#eServices-signature').length) > 0){
			$('#eServices-signature').addClass('hidden');
		}
	});

	$('#notifications-mobile-back').click(function(){
		$('#notifications-mobile').addClass('hidden');

		//Landing Page
		if(($('#eServices-landing-page').length) > 0){
			$('#eServices-landing-page').removeClass('hidden');
		}

		//Personal Info
		if(($('#eServices-personal-info').length) > 0){
			$('#eServices-personal-info').removeClass('hidden');
		}

		//Purchase History
		if(($('#eServices-purchase-history').length) > 0){
			$('#eServices-purchase-history').removeClass('hidden');
		}

		//Referrals and Promo
		if(($('#eServices-referral').length) > 0){
			$('#eServices-referral').removeClass('hidden');
		}

		//Document Upload
		if(($('#eServices-document-upload').length) > 0){
			$('#eServices-document-upload').removeClass('hidden');
		}

		//Signature
		if(($('#eServices-signature').length) > 0){
			$('#eServices-signature').removeClass('hidden');
		}

	});


	//E SERVICES REFERRAL CODES!
	if($('.referral').length > 0) {
		$(document).on('click','.referral .view-all',function(){
                $('#referral-discount').removeClass('bottom');
				$('#copy-link').removeClass('invisible');
				$('#referral-date').addClass('hidden');
	            $('.referral-item.display.hidden-xs').removeClass('hidden-xs hidden-sm');

	            if($(this).html()=='Hide') {
	              $('.referral-item.display').addClass('hidden-xs hidden-sm');
	              $(this).html('View all');
                  $(this).css("color", "#ff8200");
				  $('#copy-link').addClass('invisible');
				  $('#referral-date').removeClass('hidden');
				  $('#referral-discount').addClass('bottom');
	            }
	            else {
	              $(this).html('Hide');
                  $(this).css("color", "#ff8200");
	            }
	        });


	        var client = new ZeroClipboard($('.referral-item'));
	        client.on( 'ready', function(event) {

	            client.on( 'copy', function(event) {
	              //var promocode = $(event.target).closest('.referral-item').find('p.discount-code').html();
	              var promocode = $(event.target).find('p.discount-code').html();
	              event.clipboardData.setData('text/plain', promocode);
	            });
	            client.on( 'aftercopy', function(event) {
	                $(event.target).find('button.copy-code').html('Copied to clipboard');
	                setTimeout(function(){
	                    $(event.target).find('button.copy-code').html('Copy code');
	                }, 3000);
	            });
	        });

	       var clientCopy = new ZeroClipboard($('.referral .copy-link'));
	        clientCopy.on( 'ready', function(event) {
	            clientCopy.on( 'copy', function(event) {
	              var link = $(event.target).parent().find('div.link').html();
	              event.clipboardData.setData('text/plain', link);
	            });
	            clientCopy.on( 'aftercopy', function(event) {
	              console.log('Copied text to clipboard: ' + event.data['text/plain']);
	            } );
	        });
	}
	//END


	//Notification Dropdown
	//by: RMN
	$('.dropdown-notification')
		.on('show.bs.dropdown', function(e){
			if($('#arrow-notification').hasClass('hidden')){
				$('#arrow-notification').removeClass('hidden');
			}
		})
		.on('hide.bs.dropdown', function(e){
			$('#arrow-notification').addClass('hidden');
		})
	//Plan Details Validation
	//by: RMN
	$('#sales-illu-apply-now').click(function(){
		var promoCode = $('#promocode').val();
		var planDetailsDob = new Date($('#sales-illu-dob').val());
		var planDetailsAge = calculateAge(planDetailsDob.format('Y-m-d'));

		//check if date of Birth is Empty
		if($('#sales-illu-dob').val() != ""){
			$('#promo-code-dateOfBirthEmpty').addClass('hideSpan');


			if((!invalidPromoCode()) && (planDetailsAge>18)){
				$('#promo-code-errmsg').addClass('hideSpan');
				$('#promo-code-dateOfBirth').addClass('hideSpan');
			}else{

				if(invalidPromoCode()){
					if($('#promo-code-errmsg').hasClass('hideSpan')){
						$('#promo-code-errmsg').removeClass('hideSpan');
					}
				}else{
					$('#promo-code-errmsg').addClass('hideSpan');
				}

				if(planDetailsAge<19){
					if($('#promo-code-dateOfBirth').hasClass('hideSpan')){
						$('#promo-code-dateOfBirth').removeClass('hideSpan');
					}
				}else{
					$('#promo-code-dateOfBirth').addClass('hideSpan');
				}
			}

		}else{
			if($('#promo-code-dateOfBirthEmpty').hasClass('hideSpan')){
				$('#promo-code-dateOfBirthEmpty').removeClass('hideSpan');
			}
		}
	});


	//Thank You Page
	//by: RMN
	//$('#membership-account').bootstrapValidator();

	$('#activate-fwd-account').click(function(){
		$('html, body').animate({
			scrollTop: $('#member-account').offset().top - $('.navbar-fixed-top').height()
		}, 1000);

	});

	//Form Validation
	$("#activate-account-now").click(function(){
		var username = $("#member-username").val();
		var password = $("#member-password").val();
		var confirmPassword = $("#confirmPassword").val();

		if(( (username.match('^[a-zA-Z0-9]+$'))   && (username.length >= 6 && username.length <= 50)) &&
			 (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) &&
			 (confirmPassword == password)
		){
			$('#account-created-divider').removeClass('hidden');
			$('#account-created').removeClass('hidden');
		}else{
			//do nothing
		}

    });

	//change border color set-appointment
	var radioId = $('input[name=set-appointment-select]:checked', '#service-centre').attr("id");
	changeBorder(radioId);

	$('#service-centre input[type="radio"]').on('change', function() {
	   	var radioId = $('input[name=set-appointment-select]:checked', '#service-centre').attr("id");
	   	changeBorder(radioId);
	});

	//Beneficiary Info
	//added by: RMN
	$("#own-estate-now").click(function() {
		$('#beneficiary-contents').addClass('hidden');
		$('#add-beneficiary-1').addClass('hidden');
		$('#add-beneficiary-2').addClass('hidden');

		$('#savieBeneficiaryBean\\[0\\]\\.firstName').val('');
		$('#savieBeneficiaryBean\\[0\\]\\.lastName').val('');
		$('#savieBeneficiaryBean\\[0\\]\\.chineseName').val('');
		$('#beneficiaryHkidPassport\\[0\\]').prop('selectedIndex',0);
		$('#savieBeneficiaryBean\\[0\\]\\.hkId').val('');
		$('#savieBeneficiaryBean\\[0\\]\\.passportNo').val('');
		$('input[name="savieBeneficiaryBean\\[0\\]\\.gender"]#male-0').prop('checked', true);
		$('#savieBeneficiaryBean\\[0\\]\\.relationship').val('');
		$('#savieBeneficiaryBean\\[0\\]\\.entitlement').val(100);
		/*$('#beneficiaryInfoForm\\[0\\]').find('.error-msg .help-block').css('display', 'none');*/
		$('#beneficiaryInfoForm\\[0\\]').find('.error-msg .help-block').addClass('hide-element');

		if ($('#beneficiaryInfoForm\\[1\\]').length) {
			$('#savieBeneficiaryBean\\[1\\]\\.firstName').val('');
			$('#savieBeneficiaryBean\\[1\\]\\.lastName').val('');
			$('#savieBeneficiaryBean\\[1\\]\\.chineseName').val('');
			$('#beneficiaryHkidPassport\\[1\\]').prop('selectedIndex',0);
			$('#savieBeneficiaryBean\\[1\\]\\.hkId').val('');
			$('#savieBeneficiaryBean\\[1\\]\\.passportNo').val('');
			$('input[name="savieBeneficiaryBean\\[1\\]\\.gender"]#male-1').prop('checked', true);
			$('#savieBeneficiaryBean\\[1\\]\\.relationship').val('');
			$('#savieBeneficiaryBean\\[1\\]\\.entitlement').val('');
			$('#beneficiaryInfoForm\\[1\\]').find('.error-msg .help-block').addClass('hide-element');
		}

		if ($('#beneficiaryInfoForm\\[2\\]').length) {
			$('#savieBeneficiaryBean\\[2\\]\\.firstName').val('');
			$('#savieBeneficiaryBean\\[2\\]\\.lastName').val('');
			$('#savieBeneficiaryBean\\[2\\]\\.chineseName').val('');
			$('#beneficiaryHkidPassport\\[2\\]').prop('selectedIndex',0);
			$('#savieBeneficiaryBean\\[2\\]\\.hkId').val('');
			$('#savieBeneficiaryBean\\[2\\]\\.passportNo').val('');
			$('input[name="savieBeneficiaryBean\\[2\\]\\.gender"]#male-2').prop('checked', true);
			$('#savieBeneficiaryBean\\[2\\]\\.relationship').val('');
			$('#savieBeneficiaryBean\\[2\\]\\.entitlement').val('');
			$('#beneficiaryInfoForm\\[2\\]').find('.error-msg .help-block').addClass('hide-element');
		}
	});

	$("#name-others-now").click(function() {
		
		if($('#beneficiary-contents').hasClass('hidden')){
			$('#beneficiary-contents').removeClass('hidden');
		}

		if($('#add-beneficiary-1').hasClass('hidden')){
			$('#add-beneficiary-1').removeClass('hidden');
		}

		if($('#add-beneficiary-2').hasClass('hidden')){
			$('#add-beneficiary-2').removeClass('hidden');
		}
		
		$("#et-beneficiary-info-next").click(function() {
			$('#beneficiaryInfoForm\\[0\\]').find('.error-msg .help-block').removeClass('hide-element');
			if ($('#beneficiaryInfoForm\\[1\\]').length) {
				$('#beneficiaryInfoForm\\[1\\]').find('.error-msg .help-block').removeClass('hide-element');
			}
			if ($('#beneficiaryInfoForm\\[2\\]').length) {
				$('#beneficiaryInfoForm\\[2\\]').find('.error-msg .help-block').removeClass('hide-element');
			}
		});
	});


	//by: RMN
	$("#residence-check").change(function() {
		if(this.checked) {
			$('#passport-section').addClass('hidden');
		}
		else{
			if($('#passport-section').hasClass('hidden')){
				$('#passport-section').removeClass('hidden');
			}
		}
	});


	$("#file-upload").change( function() {
		$('#select-file-section').addClass('hidden');

		if($('#finish-upload').hasClass('hidden')){
			$('#finish-upload').removeClass('hidden');
		}
	});


	$("#fileToUpload").change( function() {
		//$('#select-file-section-address').addClass('hidden');
		//
		//if($('#finish-upload-addr').hasClass('hidden')){
		//	$('#finish-upload-addr').removeClass('hidden');
		//}
		if($('#proof-of-address-progress').hasClass('hidden')){
			$('#proof-of-address-progress').removeClass('hidden');
		}
	});

	//Tooltip
	//by: RMN
	 $('[data-toggle="tooltip"]').tooltip();
	// $('[data-toggle=tooltip]').tooltip({trigger: 'manual'}).tooltip('show');


	//Upload Document Radio Buttons
	//by: RMN
	//give-store
	$("#give-store").click(function() {
		$('#upload-later-section').addClass('hidden');
		$('#upload-now-section').addClass('hidden');
		if($('#submit-btn').hasClass('hidden')){
			$('#submit-btn').removeClass('hidden');
		}
	});

	//upload-later
	$("#upload-later").click(function() {
		if($('#upload-later-section').hasClass('hidden')){
			$('#upload-later-section').removeClass('hidden');
		}

		$('#upload-now-section').addClass('hidden');
		$('#submit-btn').addClass('hidden');
        $('#upload-link-btn').removeClass('hidden');
	});

	//upload-now
	$("#upload-now").click(function() {
		if($('#upload-now-section').hasClass('hidden')){
			$('#upload-now-section').removeClass('hidden');
		}

		if($('#submit-btn').hasClass('hidden')){
			$('#submit-btn').removeClass('hidden');
		}
		$('#upload-later-section').addClass('hidden');
        $('#upload-link-btn').addClass('hidden');
	});

	// Sales Illustration Page to FNA Page
	$("#made-decision-next-btn").on('click', function(){
		$('#planDetailsLoginModal').modal('show');
		//$('#thankYouModal').modal('show');
      //  window.location = "fna";
    });

	// Plan Details Login Button
	$("#planDetailsLogin").on('click', function(){
        //window.location = "application-registration";
		$('#thankYouModal').modal('show');
    });

	// Plan Details - Thank You Continue Button

	// Application Registration
	$("#application-registration button.btn").on('click', function(){
        window.location = "financial-needs-analysis";
    });

	// FNA Page to Application Page
	$("#fna-next-btn").on('click', function(){
        window.location = "financial-needs-analysis-review";
    });

	// FNA Review Page to PDF
	$("#proceed-to-sales-btn").on('click', function(){
        window.location = "web-pdf/savie-proposal";
    });

	// Application Page to Application Summary
	$("#application-proceed-btn").on('click', function(){
		var paymentMethod = document.getElementById("pay-online-radio").checked;
		if (paymentMethod) {
			setCookie("paymentMethod", "online", 30);
			window.location = "application-summary";
		} else {
			setCookie("paymentMethod", "offline", 30);
			window.location = "service-center";
		}
    });

	// Update back button link of application summary
	if ($("#order-summary-return-btn").length > 0) {
		var paymentMethod = getCookie("paymentMethod");
		if (paymentMethod == "online") {
			$("#order-summary-return-btn").attr('href', 'application');
		} else {
			$("#order-summary-return-btn").attr('href', 'service-center');
		}
	}

	// Order Page to Declaration Page
	$("#order-summary-proceed-btn").on('click', function(){
        window.location = "declarations";
    });

	// Declaration Page to Signature Page
	$("#declaration-proceed-btn").on('click', function(){
		var paymentMethod = getCookie("paymentMethod");
		if (paymentMethod == "online") {
			window.location = "signature";
		} else {
			window.location = "confirmation-offline"
		}
    });

	// Signature Page to Set Appointment Page
	$("#signature-proceed-btn").on('click', function(){
        window.location = "document-upload";
    });

	// Set Appointment Page to Upload Document Page
	$("#set-application-confirm-btn").on('click', function(){
		window.location = "application-summary";
	});

	// Upload Document Page to Thank You Page
	$("#upload-doc-submit-btn").on('click', function(){
		window.location = "confirmation-online";
 	});

	// Thank you to Overall
	$("#back-home-btn").on('click', function(){
		//window.location = "overall";
		window.location = "/saving-insurance";
 	});

	// Overall Page Links
	// Sales Illustration Page
	$("#sales-edit-btn").on('click', function(){
        window.location = "plan-details";
    });

	// FNA Page
	$("#fna-edit-btn").on('click', function(){
        window.location = "financial-needs-analysis";
    });

	// Application Page
	$("#application-edit-btn").on('click', function(){
        window.location = "application";
    });

	// Order Summary Page
	$("#application-view-btn").on('click', function(){
        window.location = "application-summary";
    });

	// Set Appointment Page
	$("#appointment-change-btn").on('click', function(){
        window.location = "service-center";
    });

	//Signature Radio Buttons
	//by: RMN

	$("#offline-signature").click(function() {
		$('#signature-section').addClass('hidden');
	});

	$("#digital-signature").click(function() {
		if($('#signature-section').hasClass('hidden')){
			$('#signature-section').removeClass('hidden');
		}

	});
	//change caret class
	window.onload = function() {
		if($('span.caret').hasClass('caret')) {
	        $('span.caret').removeClass('caret').addClass('icon-chevron-thin-down');
	    }
	}

	if ($('#male-0').length > 0) {
		changeColorRadioButtonLabel(1);
	}

	$("#own-estate, #name-others").change(function () {
		if ($("#name-others").is(":checked")) {
			if(getWidth()<992) {
				ifSelected("name-others-label", "own-estate-label");
			}

			else {
				$("#own-estate-label").addClass("hidden-sm hidden-xs");
			}
		}
		else {
			if(getWidth()<992) {
				ifSelected("own-estate-label", "name-others-label");
			}

			else {
				$("#name-others-label").addClass("hidden-sm hidden-xs");
			}
		}
	});

	$("#pay-online-radio, #pay-later-radio").change(function () {
		if ($("#pay-online-radio").is(":checked")) {
			if(getWidth()<992) {
				ifSelected("pay-online-label", "pay-later-label");
			}

			else {
				$("#pay-later-label").addClass("hidden-sm hidden-xs");
			}
		}
		else {
			if(getWidth()<992) {
				ifSelected("pay-later-label", "pay-online-label");
			}

			else {
				$("#pay-online-label").addClass("hidden-sm hidden-xs");
			}
		}
	});

	$("#roundedOne-male, #roundedOne-female").change(function () {
		if ($("#roundedOne-female").is(":checked")) {
			if(getWidth()<992) {
				ifSelected("roundedOne-female-label", "roundedOne-male-label");
			}

			else {
				removeClass("roundedOne-female-label");
			}
		}
		else {
			if(getWidth()<992) {
				ifSelected("roundedOne-male-label", "roundedOne-female-label");
			}

			else {
				removeClass("roundedOne-male-label");
			}
		}
	});

	if ($('#payment-content').length > 0) {
		$("#pay-later-radio, #pay-online-radio").change(function () {
			if($("#pay-later-radio").is(":checked"))
			{
				$("#payment-content").addClass("hidden");
				$("#payment-policy").addClass("hidden");
			}
			else
			{
				$("#payment-content").removeClass("hidden");
				$("#payment-policy").removeClass("hidden");
			}
		});
	}

	if ($('#estate').length > 0) {
		$("#own-estate, #name-others").change(function () {
			if($("#own-estate").is(":checked"))
			{
				$("#beneficiary-contents, #add-beneficiary-2, #add-beneficiary-3").addClass("hidden");
			}
			else
			{
				$("#beneficiary-contents, #add-beneficiary-2, #add-beneficiary-3").removeClass("hidden");
			}
		});
	}

	if($("#personal-info").length > 0) {
		//$("#personal-info-next").click(function(){
        //	$('html, body').animate({
		//		scrollTop: $('#employment-info').offset().top - $('.navbar-fixed-top').height()
		//	}, 1000);
    	//});

    	//$("#employment-info-next").click(function(){
        //	$('html, body').animate({
		//		scrollTop: $('#beneficiary-info').offset().top - $('.navbar-fixed-top').height()
		//	}, 1000);
    	//});

    	//$("#beneficiary-info-next").click(function(){
        //	$('html, body').animate({
		//		scrollTop: $('#payment').offset().top - $('.navbar-fixed-top').height()
		//	}, 1000);
    	//});
	}

	if($("#illustration-next-btn").length > 0) {
		$("#illustration-next-btn").click(function(){
        	$('html, body').animate({
				scrollTop: $('#application-review-container').offset().top - $('.navbar-fixed-top').height()
			}, 1000);
    	});
	}

	if($("#set-appointment-next").length > 0) {
		$("#set-appointment-next").click(function(){
        	$('html, body').animate({
				scrollTop: $('#view-selected-appointment').offset().top - $('.navbar-fixed-top').height()
			}, 1000);
    	});
	}

	if($("#financial-analysis-next").length > 0) {
		$("#financial-analysis-next").click(function(){
        	$('html, body').animate({
				scrollTop: $('#fna-policy-replacement').offset().top - $('.navbar-fixed-top').height()
			}, 1000);
    	});
	}



	//Mobile Menu on Accordion Expanded
	//by: RMN

	$('#travel-mobile-menu').click(function(){
		if($('#travel-mobile-menu').hasClass('collapsed')){
			$('#arrow-travel').removeClass('arrow-right');
			$('#arrow-travel').addClass('arrow-down ');
		}
		else{
			$('#arrow-travel').removeClass('arrow-down');
			$('#arrow-travel').addClass('arrow-right');
		}
	});



	//Input number only
	//by: RMN
	$('#residential-first').keypress(function(e) {
		var a = [];
		var k = e.which;

		for (i = 48; i < 58; i++)
			a.push(i);

		if (!(a.indexOf(k)>=0))
			e.preventDefault();
	});

	$('#residential-second').keypress(function(e) {
		var a = [];
		var k = e.which;

		for (i = 48; i < 58; i++)
			a.push(i);

		if (!(a.indexOf(k)>=0))
			e.preventDefault();
	});

	$('#mobile-first').keypress(function(e) {
		var a = [];
		var k = e.which;

		for (i = 48; i < 58; i++)
			a.push(i);

		if (!(a.indexOf(k)>=0))
			e.preventDefault();
	});

	$('#mobile-second').keypress(function(e) {
		var a = [];
		var k = e.which;

		for (i = 48; i < 58; i++)
			a.push(i);

		if (!(a.indexOf(k)>=0))
			e.preventDefault();
	});


	//Sample only
	$('#previous').click(function(){

	});

	//next button onclick
	$('#next').click(function(){
		$('#timeline-step-2').addClass('done');
	});

	//DATE PICKER
	if($("#datePicker").length > 0 && getWidth() >= 992) {
		var datePlaceholder = (getWidth() >= 992) ? "28th May 1996" : "1996-05-28";
		var $datePicker = $("#datePicker");
		$('#dates').attr('placeholder', datePlaceholder);
		changeDatePickerValue($datePicker);
	}

	if ($("#mobile-date").length > 0) {
		var currentDate = new Date();
		$("#mobile-date").attr('max', currentDate.format('Y-m-d'));
	}

	//SET-APPOINTMENT PAGE DATEPICKER
	if($("#scheduler-datePicker").length > 0) {
		var $sched_datePicker = $("#scheduler-datePicker");
		$sched_datePicker.datepicker({
	        startDate: new Date(),
	       	autoclose: true,
	       	format: 'd MM yy',
	       	language: 'zh-CN'
	    }).on("changeDate", function(e) {
	        $sched_datePicker.datepicker('hide');
	      });
	}
	$('.dropdown')
		.on('show.bs.dropdown', function(e){
			if(!$('.dropdown').hasClass('fwd-header-navgation-menu')){
				if (!$('body').hasClass('page-sales-illustration')) {
					$('.navbar-menu').addClass('show-dropdown');
				}
				
				$(this).find('.dropdown-menu').first().stop(true, true).slideDown(400, function() {
					$(this).addClass('dropdown-menu-open');
					if (!$('body').hasClass('page-sales-illustration')) {
						$('.navbar-menu').addClass('show-dropdown');
					}
				});
				setTimeout(function(){
					$('#overlay').removeClass('hidden');
				},400);
	
				var screenheight = ($('.fwd-savie-wrapper').height() - 170) + 'px';
				$('#overlay').css({"height":screenheight});
			}
		})
		.on('hide.bs.dropdown', function(e){
			if(!$('.dropdown').hasClass('fwd-header-navgation-menu')){
				$('#overlay').addClass('hidden');
				$(this).find('.dropdown-menu').first().stop(true, true).slideUp(400, function() {
					$(this).removeClass('dropdown-menu-open');
					$('#login-button-modal').removeAttr( "data-toggle" );
					if (!$('body').hasClass('page-sales-illustration')) {
						$('.navbar-menu').removeClass('show-dropdown');
					}
				});
			}
		});
	//Sales Illustration Page
	//Dropdown
	if( $('.selectpicker').selectpicker ) {
		$('.selectpicker').selectpicker();
		$('.selectpicker').selectpicker({
			style: 'btn-info',
			size: 3
		});
	}

	window.onresize = function() {
		//Eservices Page
		//by: RMN

		if ($('.et-collapse-link').length) {
	        if(getWidth()>=992){
	         $('.et-collapse-link[aria-expanded="true"]').parent()
	                                                   .next()
	                                                   .find('.et-panel-body')
	                                                   .jScrollPane({showArrows: true});


				$('.et-select-plan-panel').on('shown.bs.collapse', function (e) {
					var $target = $(e.currentTarget);
					var $innerPanel = $target.find('.et-panel-body');

	            if(getWidth()>=992){
	               $innerPanel.jScrollPane({showArrows: true});
	            }
				});

			}else{
	         // Remove the jScrollpane
	         $('.et-panel-body').each(function() {
	            var $self = $(this);

	            if ($self.data().jsp) {
	               $self.data().jsp.destroy();
	            }
	         });
			}
		}//END OF ET Select Plan Page

		if(getWidth()>=992){
			//Promo and Referrals Page
			$('#copy-link').removeClass('invisible');

            $('#eServices-sidebar').removeClass('hidden');
			$('#notifications-mobile').addClass('hidden');
			if(($('#eServices-landing-page').length) > 0){
				$('#eServices-landing-page').removeClass('hidden');
			}

			//Personal Info
			if(($('#eServices-personal-info').length) > 0){
				$('#eServices-personal-info').removeClass('hidden');
			}

			//Purchase History
			if(($('#eServices-purchase-history').length) > 0){
				$('#eServices-purchase-history').removeClass('hidden');
			}

			//Referrals and Promo
			if(($('#eServices-referral').length) > 0){
				$('#eServices-referral').removeClass('hidden');
			}

			//Document Upload
			if(($('#eServices-document-upload').length) > 0){
				$('#eServices-document-upload').removeClass('hidden');
			}

			//Signature
			if(($('#eServices-signature').length) > 0){
				$('#eServices-signature').removeClass('hidden');
			}

		}else{
			//$('#notifications-mobile').addClass('hidden');
			//Promo and Referrals Page
			if($('#referral-view').html() == "View all"){
				$('#copy-link').addClass('invisible');
			}

			//do nothing
			if($('#eServices-body').hasClass('hidden-sm')){
				//do nothing
			}else{
				$('#eServices-sidebar').addClass('hidden');
			}
		}

		if(parseInt($(document).width() )>= 992) {
			//description: add the modal attr for login button
			$('#login-button').attr("data-toggle","modal");

			$('#collapseExplanation').collapse('show');

			if($("body").hasClass('canvas-slid')) {
				$('.navmenu').offcanvas('hide');
				$("body").attr('style','');
			}
		} else {
			//description: remove modal attr for login button
			$('#login-button').removeAttr("data-toggle");
			if($("#loginModal").hasClass("in")){
				$('#loginModal').modal('hide');
			}
			//end here
		}
		if (getWidth() >= 992) {
			$('#sticky-buy-now').removeClass('sticky-button');
		}

		//BACK TO TOP ON SCREEN RESIZE
		if(getWidth() < 992) {
			$('#gotop').addClass('go-top');
			$('#gotop').removeClass('hidden');
			checkPosition();
		}

		if(getWidth() > 991){
			$('#gotop').removeClass('go-top');
			$('#gotop').addClass('hidden');
		}
		//END

		// Made your decision
		if (getWidth() >= 992) {
			$('.made-your-decision-section, footer').removeAttr('style');
		}

		//change color radio button
			changeColorRadioButtonLabel(0);
			changeColorRadioButtonLabel(1);
			changeColorRadioButtonLabel(2);


		if(getWidth()>=992)
		{
			$("#own-estate-label").removeClass("second-label-mobile");
			$("#name-others-label").removeClass("second-label-mobile");

			$("#own-estate, #name-others").change(function () {
				if($("#own-estate").is(":checked"))
					$("#own-estate-label").removeClass("hidden-xs hidden-sm");

				if($("#name-others").is(":checked"))
					$("#name-others-label").removeClass("hidden-xs hidden-sm");
			});

			$("#pay-later-radio, #pay-online-radio").change(function () {
				if($("#pay-later-radio").is(":checked"))
					$("#pay-later-label").removeClass("hidden-xs hidden-sm");

				if($("#pay-online-radio").is(":checked"))
					$("#pay-online-label").removeClass("hidden-xs hidden-sm");
			});
		}
		else
		{
			$("#own-estate-label").addClass("second-label-mobile");
			$("#name-others-label").addClass("second-label-mobile");
		}

		// sales illustration date picker
		if ($('#dates').length > 0) {
			var datePlaceholder = (getWidth() >= 992) ? "28-05-1995" : "1996-05-28";
			$('#dates').attr('placeholder', datePlaceholder);

			var dateVal = new Date($('#dates').val());
			if ($('#dates').val().length > 0) {
				var dateVal = new Date($datePicker.datepicker('getFormattedDate'));
				if (getWidth() >= 992) {
					$('#dates').val(dateVal.format('jS M Y'));
				} else {
					$('#dates').val(dateVal.format('Y-m-d'));
				}
			}
		}

		// modals
		//var top = $('header .navbar-fixed-top').height();
		$('.modal.in').css('margin-top', top + 'px');

		// orange bar
		if ($('.application-page-header').length > 0 ) { // check if flux div exists
			var $application = $('.application-page-header');
			var $mobBar = $('.mob-topbar');

            if ($application.hasClass('sticky-bar')) {
                /* var $stickyElement = $('.navbar-fixed-top').length ? $('.navbar-fixed-top') : ((getWidth() >= 992) ? $('.top-bar:first') : $('.mob-topbar:first'));

                if (!$stickyElement.length) {
                    $stickyElement = $('.top-bar', '#header');
                }

				$application.css('top', $stickyElement.height() + 'px'); */
                if (getWidth() < 992) {
                    $('body').css({

                       //'position' : 'fixed',
                       'width' : '100%',
                       'z-index': 10

                    });
                    $application.css('top', $mobBar.height() + 'px');
                }
			} else {
                $mobBar.removeAttr('style');
            }
		}
	};
	$(window).resize();

	$(window).bind('scroll', function() {
	 	if ($('#flux').length > 0 && getWidth() < 992) { // check if flux div exists
	 		if ($(window).scrollTop() >= $('#flux').offset().top - window.innerHeight && !$('#headerNavmenu').hasClass('canvas-slid')) {
				if (getWidth() < 992) {
					$('#sticky-buy-now').addClass('sticky-button');
				}
	 		} else {
	 			$('#sticky-buy-now').removeClass('sticky-button');
	 		}

	 		if ($(window).scrollTop() >= $('#flux').offset().top + $('#flux').outerHeight() - window.innerHeight) {
	 			$('#sticky-buy-now').removeClass('sticky-button');
	 		}
	 	}

		madeDecisionSticky();
		stickApplicationOrangeBar();
		stickeServicesOrangeBar();
	});


	//BACK TO TOP ONLOAD
	if(getWidth() < 992) {
  		$('#gotop').addClass('go-top');
  		$('#gotop').removeClass('hidden');
		checkPosition();
	}

	if(getWidth() > 991){
		$('#gotop').removeClass('go-top');
		$('#gotop').addClass('hidden');
	}

    // Show or hide the sticky footer button
    $(window).scroll(checkPosition);

    // Animate the scroll to top
    $('.go-top').click(function(event) {
        event.preventDefault();

		$('html, body').animate({scrollTop: 0}, 1000);
    });

	// Power saving Swipe
	if( $(".carousel-inner").swipe ){
		$(".carousel-inner").swipe( {
			//Generic swipe handler for all directions
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				$(this).parent().carousel('next');
			},
			swipeRight: function() {
				$(this).parent().carousel('prev');
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:0
		});
	}

	// add overflow hidden to html
	var windowHeight = ($(window).height()) + 'px';
	$('#headerNavmenu')
		.on('show.bs.offcanvas', function() {
			$('.fwd-savie-wrapper').css({'position': 'relative', 'overflow' : 'hidden', 'height' : windowHeight});
		})
		.on('hide.bs.offcanvas', function() {
			$('.fwd--savie-wrapper').removeAttr('style');
		});

	// Made your decision sticky
	$('#collapseExplanation')
		.on('show.bs.collapse', function() {
			$('html, body').animate({
				scrollTop: $('.explanation-block').offset().top - $('.navbar-fixed-top').height()
			}, 1000, function() {
				if (getWidth() < 992) {
					$('.made-your-decision-section').css({
						'position': 'fixed',
						'bottom': '0'
					});

					$('footer').css('margin-top', $('.made-your-decision-section').outerHeight());
				}
			});
		})
		.on('hide.bs.collapse', function() {
			$('.made-your-decision-section, footer').removeAttr('style');
		});

	// Login Modal
	$('#loginModal, #american-citizen, #fna-no, #fna-yes, #illustration-result,#teaserSurvery, #planDetailsLoginModal, #accessCode').on('show.bs.modal', function() {
		var top = $('header .navbar-fixed-top').height();
		$(this).css('margin-top', top + 'px');
	});
	$('#loginModal, #american-citizen, #fna-no, #fna-yes, #illustration-result,#teaserSurvery, #planDetailsLoginModal, #accessCode').on('hide.bs.modal', function() {
		//$('header .navbar-menu').removeClass('modal-display');
		//$('.fwd-savie-wrapper').removeAttr('style');
	});
});

function getWidth() {
	if (self.innerWidth) {
		return self.innerWidth;
	}
	else if (document.documentElement && document.documentElement.clientHeight){
		return document.documentElement.clientWidth;
	}
	else if (document.body) {
		return document.body.clientWidth;
	}
	return 0;
}

function getHeight() {
  	if (self.innerHeight) {
    	return self.innerHeight;
  	}

  	if (document.documentElement && document.documentElement.clientHeight) {
    	return document.documentElement.clientHeight;
  	}

  	if (document.body) {
    	return document.body.clientHeight;
  	}
}

 //BACK TO TOP
function checkPosition() {

	var footer_height = $(".footer-whole").height();
    if ($(this).scrollTop() > 200) {
		$('.go-top').fadeIn(400);
    }
    else {
     	$('.go-top').fadeOut(400);
    }

    if($(window).scrollTop() + $(window).height() > $(document).height() - $(".footer-whole").height()) {
    	$(".go-top").css("bottom", footer_height+"px");
    	$('#gotop').removeClass('go-top-default');
    }
    else {
    	$(".go-top").css("bottom", 80);
    	$('#gotop').addClass('go-top-default');
    }
}

function forceLower(strInput) {
	strInput.value = strInput.value.toLowerCase();
}

function madeDecisionSticky() {
	var windowScroll = $(window).scrollTop() + $(window).height();
	var footerTopScroll = $(document).height() - $(".footer-whole").height();
	var explanationTopScroll = $(document).height() - $(".explanation-block").height() - $('.made-your-decision-section').outerHeight();

	if ($('.explanation-block').length > 0 && getWidth() < 992) {
		if (windowScroll > footerTopScroll) {
			$('.made-your-decision-section, footer').removeAttr('style');
		} else {
			if ($('#collapseExplanation').hasClass('in')) {
				$('.made-your-decision-section').css({
					'position': 'fixed',
					'bottom': '0',
					'width': '100%'
				});

				$('footer').css('margin-top', $('.made-your-decision-section').outerHeight());
			}
		}

		if (windowScroll < explanationTopScroll) {
			$('.made-your-decision-section, footer').removeAttr('style');
		} else {
			if (windowScroll > footerTopScroll) {
				$('.made-your-decision-section, footer').removeAttr('style');
			} else {
				if ($('#collapseExplanation').hasClass('in')) {
					$('.made-your-decision-section').css({
						'position': 'fixed',
						'bottom': '0',
						'width': '100%'
					});

					$('footer').css('margin-top', $('.made-your-decision-section').outerHeight());
				}
			}
		}
	}
}

function stickApplicationOrangeBar() {
	if ($('.application-flux').length > 0 ) { // check if flux div exists
		var $application = $('.application-flux');
		var $bar = $('.application-page-header');
		var $navbar = $('.navbar-menu').length ? $('.navbar-menu') : ((getWidth() >= 992) ? $('.navbar-inverse:first') : $('.logobox'));
		var $navbarMenu = $('.logobox > .navbar-header');
        //var $fixedTop = $('.navbar-fixed-top').length ? $('.navbar-fixed-top') : ((getWidth() >= 992) ? $('.top-bar:first') : $('.mob-topbar:first'));
        var $mobBar = $('.mob-topbar');
        var $topBar = $('.top-bar');
        var $mobNavbar = $('.navbar.navbar-default.pad-none');
        console.log($navbarMenu.height());
		if ($(window).scrollTop() >= $navbar.height()) {
			$bar.addClass('sticky-bar');
			//$bar.css('top', $fixedTop.height() + 'px');
			$bar.css('top', $topBar.height() + 'px');
            if (getWidth() < 992) {
            	//$bar.removeClass('sticky-bar');
                $mobBar.css({
                   //'position' : 'fixed',
                   'width' : '100%',
                   'z-index': 10
                });
                //$bar.css('top', $mobBar.height() + 'px');
                $bar.css('top', $navbarMenu.height() + 'px');
                //$mobNavbar.removeClass('navbar-fixed-top');
                //$mobBar.addClass('navbar-fixed-top');
                $mobBar.css('top', '0px');
            }
		} else {
			$bar.removeClass('sticky-bar');
			$bar.removeAttr('style');
            $mobBar.removeAttr('style');
		}
	}
}

function stickeServicesOrangeBar() {
	if ($('.notification-header').length > 0 ) { // check if orange bar exists exists
		var $bar = $('.notification-header');

		if ($(window).scrollTop() >= $('.navbar-menu').height()) {
			$bar.addClass('sticky-bar');
			//$bar.css('top', $('.navbar-fixed-top').height() + 'px');
		} else {
			$bar.removeClass('sticky-bar');
			$bar.removeAttr('style');
		}
	}
}

// 18 year ago date
var dob_end_date = new Date();
dob_end_date.setFullYear(dob_end_date.getFullYear()-18);

// 70 year ago date
var dob_start_date = new Date();
dob_start_date.setFullYear(dob_start_date.getFullYear()-66);
dob_start_date.setDate(dob_start_date.getDate()+1);

function changeDatePickerValue($datePicker) {
	$datePicker.datepicker({
       	autoclose: true,
		startView: "decade",
		startDate: dob_start_date,
		endDate: dob_end_date,
		formatDate: 'mm-dd-yyyy'
    }).on("changeDate", function(e) {
        $datePicker.datepicker('hide');

		var dateVal = new Date($datePicker.datepicker('getFormattedDate'));

		//console.log('Next Button'+$('.next').css("visibility"));
		if (getWidth() >= 992) {
			//$('#dates').val(dateVal.format('jS M Y'));
			$('#dates').val(dateVal.format('d-m-Y'));
		} else {
			$('#dates').val(dateVal.format('Y-m-d'));
		}
	});
}

function changeColorRadioButtonLabel (formNumber) {
	if(getWidth()<992){
		ifChecked(formNumber);
	}
	else {
		removeClasses(formNumber);
	}

		$("#male-"+formNumber+",#female-"+formNumber).change(function () {
			if(getWidth()<992) {
				ifChecked(formNumber);
			}

			else {
				removeClasses(formNumber);
			}
		});
}

function removeClasses (formNumberReceive) {
	$("#female-label-"+formNumberReceive).removeClass("hidden");
	$("#male-label-"+formNumberReceive).removeClass("hidden");
	$("#female-label-"+formNumberReceive).removeClass("second-label-mobile");
	$("#male-label-"+formNumberReceive).removeClass("second-label-mobile");
}

function ifChecked (formNumberReceive) {
	if($("#male-"+formNumberReceive).is(":checked")==false) {
		$("#male-label-"+formNumberReceive).addClass("hidden");
		$("#female-label-"+formNumberReceive).removeClass("hidden");
		$("#female-label-"+formNumberReceive).addClass("second-label-mobile");
		$("#male-label-"+formNumberReceive).removeClass("second-label-mobile");
	}
	else {
		$("#male-label-"+formNumberReceive).removeClass("hidden");
		$("#male-label-"+formNumberReceive).addClass("second-label-mobile");
		$("#female-label-"+formNumberReceive).removeClass("second-label-mobile");
		$("#female-label-"+formNumberReceive).addClass("hidden");
	}
}

function ifSelected(id,idRemove) {

		$("#"+id).addClass("hidden-xs hidden-sm");
		$("#"+id).removeClass("hidden-xs hidden-sm");
		$("#"+id).addClass("second-label-mobile");
		$("#"+id).removeClass("second-label-mobile");


		$("#"+idRemove).removeClass("hidden-xs hidden-sm");
		$("#"+idRemove).addClass("hidden-xs hidden-sm");
		$("#"+idRemove).removeClass("second-label-mobile");
		$("#"+idRemove).addClass("second-label-mobile");

}

/** Form Translation **/
function fmTranslation(key){
	return getBundle(getBundleLanguage, key);
}


function changeBorder (radioId) {
	// $('#service-centre .service-centre-cells').css("border","1px solid #b7c3cd");

   	if($("#"+radioId).is(":checked")) {
   		// $("#"+radioId).closest('.service-centre-cells').css("border","1px solid transparent");

   		//change contents
   		var parent = $("#"+radioId).closest('.service-centre-cells');
   		var newTitle = parent.find('h4').html();
   		var newContent = parent.find('.col-md-9').html();
   		$("#view-selected-appointment .view-selected-box .service-centre-cells").html('<h4 class="title-margin">'+newTitle+'</h4> <div class="content">'+newContent+'</div>');
   	}
}

// Getting the Final Residential Tel No Value
function getResidentialFinalValue() {
	var firstValue = document.getElementById("residential-first") ? document.getElementById("residential-first").value : '';
	var secondValue = document.getElementById("residential-second") ? document.getElementById("residential-second").value : '';
	var thirdValue = document.getElementById("residential-third") ? document.getElementById("residential-third").value : '';
	if (document.getElementById("savieApplicantBean.residentialTelNo")) {
      document.getElementById("savieApplicantBean.residentialTelNo").value = firstValue + secondValue + thirdValue;
   }
}

// Getting the Final Mobile No Value
function getMobileFinalValue() {
	var fMobileValue = document.getElementById("mobile-first") ? document.getElementById("mobile-first").value : '';
	var sMobileValue = document.getElementById("mobile-second") ? document.getElementById("mobile-second").value : '';
	var tMobileValue = document.getElementById("mobile-third") ? document.getElementById("mobile-third").value : '';
	if (document.getElementById("savieApplicantBean.mobileNo")) {
      document.getElementById("savieApplicantBean.mobileNo").value = fMobileValue + sMobileValue + tMobileValue;
   }
}

//Check for invalid Promo Code
function invalidPromoCode(){
	var promocode = $('#promocode').val();

	if(promocode == "1234"){
		return true;
	}else{
		return false;
	}
	return false;

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//get the applicants age
var calculateAge = function(birthday) {
    var now = new Date();
    var past = new Date(birthday);
    var nowYear = now.getFullYear();
    var pastYear = past.getFullYear();
    var age = nowYear - pastYear;

    return age;
};

/**
 * Generic Error Modal
 *
 * @param Object _properties:
 *    Structure:
 *       {
 *          header: 'some header text here', (if omitted default value is "Error")
 *          'body': 'some body text here' (required)
 *          'footer': 'some footer button text here' (if omitted default value is "OK")
 *       }
 */
function showErrorModal(_properties) {
   var $genModal = $('#fwd-gen-modal');
   var properties = $.isEmptyObject(_properties) ? {header: 'Error', body: 'Default Body Content', footer: 'OK'} : _properties;

   // Create the modal html if it's not been initialize
   if (!$genModal.length) {
      $genModal = $(['<div id="fwd-gen-modal" class="modal fade fwd-generic-modal" role="dialog">',
                        '<div class="modal-dialog">',
                           '<div class="modal-content">',
                              '<div class="modal-header">',
                                 '<button type="button" class="close" data-dismiss="modal">&times;</button>',
                                 '<h4 class="title text-center">Error</h4>',
                              '</div>',
                              '<div class="modal-body">',
                                 '<p class="content">Error</p>',
                              '</div>',
                              '<div class="modal-footer">',
                                 '<button type="button" class="btn-block btn-footer" id="et-btn-change-date" data-dismiss="modal">OK</button>',
                              '</div>',
                           '</div>',
                        '</div>',
                     '</div>'
                   ].join(''));

      // Append into body
      $genModal.appendTo('body');
   }

   // Append title text
   if (properties.header) {
      $genModal.find('.title')
               .text(properties.header);
   }

   // Append body content
   if (properties.body) {
      $genModal.find('.content')
               .text(properties.body);
   }

   // Append footer button label
   if (properties.footer) {
      $genModal.find('.btn-footer')
               .text(properties.footer);
   }

   $genModal.modal('show');
}

/**
 * Add an error message to specific element
 *
 * @param string|jQuery _element - required
 * @param string _errorMsg - required
 * @param string _errorClassSelector - optional; omit the "." part of a class selector
 */
function addFormFieldError(_element, _errorMsg, _errorClassSelector) {
   if (!arguments.length) {
      throw ('Parameters _element and _errorMsg are required.');
   }

   var $element = (typeof _element === 'string') ? $(_element) : _element;

   if (!$element.length) {
      throw ('The _element parameter must be a valid selector or a valid jQuery Object');
   }

   var errorMsg = _errorMsg || '';
   var errorClassSelector = _errorClassSelector || '';

   $element.append('<small class="help-block dynamic-err-msg ' + errorClassSelector + '">' + errorMsg + '</small>');
};

/**
 * Remove an error message or all error message from specific element
 *
 * @param string|jQuery _element - required
 * @param string _errorClassSelector - optional; omit the "." part of a class selector
 * @param boolean _removeAll - optional
 */
function removeFormFieldError(_element, _errorClassSelector, _removeAll) {
   if (!arguments.length) {
      throw ('Parameter _element is required.');
   }

   var $element = (typeof _element === 'string') ? $(_element) : _element;

   if (!$element.length) {
      throw ('The _element parameter must be a valid selector or a valid jQuery Object');
   }

   var removeAll = _removeAll || false;

   if (removeAll) {
      $element.find('.dynamic-err-msg')
               .remove();
   } else if ((arguments.length === 1) || ((arguments.length > 1) && !arguments[1])) {
      $element.find('.dynamic-err-msg')
               .remove();
   } else {
      $element.find('.' + _errorClassSelector)
               .remove();
   }
}

/**
 * Function helper to determine the IE version
 *
 * @return number
 */
function msieversion() {
   var ua = window.navigator.userAgent
   var msie = ua.indexOf ( "MSIE " )

   if ( msie > 0 )      // If Internet Explorer, return version number
      return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
   else                 // If another browser, return 0
      return 0
}

//upload ie et iframe
function upload(id) {
var fileName = $('#'+id).val().split('\\').pop();

	$('#'+id).closest('.select-file-section').addClass('hidden');
	$('#'+id).parents('.upload-form').find('.finish-upload').removeClass('hidden');
	$('#'+id).parents('.upload-iframe-height').find('.document-upload-progress').removeClass('hidden');
	$('#'+id).parents('.upload-iframe-height').find('.document-upload-progress span').html(fileName);
	$('#'+id).parents('.upload-form').next('.upload-error').addClass('hidden');
}