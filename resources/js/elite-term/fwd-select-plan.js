   //var language = "en";
   var stickyHeight = 130;
   var planDetailData = {};
   var appInfoData = {};
   var empEduInfoData = {};
   var beneInfoData = {};
   var underwritingSummData = {};
   var currentSection = 'et-select-plan-section';
   var getBundleLanguage = "";
   var lang = languageP;

   if(lang === "EN"){
   	getBundleLanguage = "en";
   }else
   if(lang === "tc"){
   	getBundleLanguage = "zh";
   }
   else{
   	getBundleLanguage = "en";
   }

// get resource bundle
   function getBundle(lang, key) {
      return fwdGetBundle(lang, key); // New Shared Error Message Bundle

      //var rtn;
      //loadBundles(lang, key, function(value){
      // rtn = value;
      //});
      //return rtn;
   }
   function loadBundles(lang, key, fn) {
   	//var u = window.location.origin+''+home+'/resources/bundle/';
      	$.i18n.properties({
           name: 'Messages',
           path: ''+home_url+'/resources/bundle/',
           mode: 'map',
           language: lang,
           cache: true,
           callback: function() {
           	fn($.i18n.prop(key)); //msg_welcome;	//$.i18n.prop("msg_welcome")
           }
       });
   }

   // REDIRECT TO SPECIFIC SECTION
   var _selectedSection = window.location.hash;
   if (_selectedSection && (_selectedSection === '#application')) {
      $('#et-btn-before-start').removeClass('et-pad-bot-50');
      $('#et-about-yoursel-section').removeClass('hide-element');
      $('#et-btn-ay-self').removeClass('et-pad-bot-50');
      $('#et-plan-option-section').removeClass('hide-element');
      var $_appInfo = $('#et-application-first-section').removeClass('hide-element')
                        .css('margin-bottom', '190px');

      $('body, html').animate({
         scrollTop: ($_appInfo.offset().top - stickyHeight) + 'px'
      }, 500);
   }
   // END OF REDIRECT TO SPECIFIC SECTION


   // Update date to 18 years before current date
   var _date = new Date();
   var _newdate = new Date(_date);
   _newdate.setYear(_newdate.getYear() - 18);
   var sixty = new Date(_date);
   sixty.setYear(sixty.getYear() - 60);
   sixty.setDate(sixty.getDate()+1);

   var $planDate = $('#et-select-plan-date-input').datepicker({
      format: "dd-mm-yyyy",
      container: "#date",
      autoclose: true,
      startView: "decade",
      endDate: _newdate,
      startDate: sixty
   }).datepicker('setDate', new Date(_newdate)).val('DD-MM-YYYY');
   $planDate.on('changeDate', function(e) {
      $('#sales-illu-dob').val(this.value);
   });

   var $infoDOB = $('#sales-illu-dob').datepicker('remove');
   if ((msieversion() > 0) && (msieversion() < 10)) {
      $infoDOB.css('font-family', 'Arial');
   }

   // Bind event to Gender
   $('#et-gender-male, #et-gender-female').on('change', function(e){
      if (this.checked) {
         document.getElementById('savieApplicantBean.gender').value = (this.value === 'M') ? getBundle(getBundleLanguage, "option.male") : getBundle(getBundleLanguage, "option.female");
      } else {
         document.getElementById('savieApplicantBean.gender').value = '';
      }
   });

   // Override the default value color
   $('select.gray-dropdown', '#et-application-info-section')
      .css('color', '#C4C3C3')
      .on('change', function(e) {
         var $self = $(this);

         $self.removeAttr('style');
      });
   $('#et-select-plan-date-input')
      .on('change', function(e) {
         var $self = $(this);

         $self.removeAttr('style');

         if(msieversion() > 0) {
            $('#et-select-plan-date-input').css('font-family','Arial');

            //IE9 placeholder color fix
            if( $self.val() == '' || $self.val()==$self.attr('placeholder') ){
               $self.css('color', '#ccc');
            } else {
               $self.css('color', '#000');
            }
         }
      });

   // Show disctric dropdown if selected country is Hong Kong
   $(document).on('change', '.et-app-info-country', function(e) {
      var $self = $(this);

      if ($self.val() === 'Hong Kong') {
         $self.closest('.selectDiv')
                  .siblings('.et-district-wrapper')
                  .removeClass('hide-element');
      } else {
         $self.closest('.selectDiv')
                  .siblings('.et-district-wrapper')
                  .addClass('hide-element')
                  .find('select')
                  .css('color', '#9ba5a7')
                  .find('option')
                  .first()
                  .attr('selected', 'selected');

      }
   });

   // Active appropriate nav items
   $(window).scroll(function(e) {
      var $self = $(this);
      var $stickyNav = $('.et-bind-btn-header');

      if (currentSection === 'et-application-first-section') {
         $stickyNav.removeClass('active')
                              .eq(1)
                              .addClass('active');
         $('#et-active-section-label').text($stickyNav.eq(1).text());

         return;
      }

      if ($self.scrollTop() > 2100) {
         // Update sticky menu navigator
         $stickyNav.removeClass('active')
                              .eq(1)
                              .addClass('active');
         $('#et-active-section-label').text($stickyNav.eq(1).text());
      } else {
         $stickyNav.removeClass('active')
                              .first()
                              .addClass('active');
         $('#et-active-section-label').text($stickyNav.first().text());
      }
   });

   $('#et-btn-change-date').on('click', function(e) {
      $('body, html').animate({
         scrollTop: ($('#et-about-yoursel-section').offset().top - stickyHeight) + 'px'
      }, 500);
   });


   //PLAN OPTION PROMO CODE HIDE TOGGLE
   $(document).on('click', '#promocode-hide-switch', function(e) {
      if($("#promocode-hidden").hasClass('hidden-xs')) {
         $("#promocode-hidden").removeClass('hidden-xs hidden-sm');
         $(this).find('img').removeClass('reversed');
         $(this).removeClass('et-mbot-15');
      }
      else {
         $("#promocode-hidden").addClass('hidden-xs hidden-sm');
         $(this).find('img').addClass('reversed');
         $(this).addClass('et-mbot-15');
      }
   });

   // Medical declaration collapse event
   $('.et-collapse').on('show.bs.collapse', function(e) {
      var $target = $(e.currentTarget);
      var $prevTarget = $target.data('prev-target');

      if ($prevTarget) {
         $prevTarget = $('#' + $prevTarget);

         if (!$prevTarget.data('is-answered')) {
            e.preventDefault();
         }
      }
   });

   // Medical declaration button yes event
   $(document).on('click', '.et-btn-medic-yes', function(e) {
      e.preventDefault();

      var $self = $(this);
      var $collapseSec = $self.closest('.et-collapse');
      var nextTarget = $self.data('next-target');

      $collapseSec.data('is-answered', true);

      $self.addClass('btn-selected');

      $collapseSec.find('.et-btn-medic-no')
                  .removeClass('btn-selected');

      $('#et-medical-dec-next').prop('disabled', true);
   });

   // Medical declaration button no event
   $(document).on('click', '.et-btn-medic-no', function(e) {
      e.preventDefault();

      var $self = $(this);
      var $collapseSec = $self.closest('.et-collapse');
      var nextTarget = $self.data('next-target');
      var collapseMe = $self.data('current-target');

      $collapseSec.data('is-answered', true);

      $self.addClass('btn-selected');

      $collapseSec.find('.et-btn-medic-yes')
                  .removeClass('btn-selected');
      // Show the next button
      // if all questions are answered with no
      if (isMedicAnsweredWithNo()) {
         $('#et-medical-dec-next').prop('disabled', false);
      }

      // Expand next question
      if (nextTarget) {
    	  setTimeout(function() {
			 if(collapseMe==nextTarget) {
	  			 $('#' + collapseMe).collapse('hide');
	  		 } else {
	  			 $('#' + collapseMe).collapse('hide');
	          	 $('#' + nextTarget).collapse('show');
	  		 }
         }, 50);
      }
   });
   // Medical declaration check event
   $(document).on('change', '#et-medi-question-4', function(e) {
      if (isMedicAnsweredWithNo()) {
         $('#et-medical-dec-next').prop('disabled', false);
      } else {
    	 $('#et-medical-dec-next').prop('disabled', true);
      }
   });

   // Close Login Modal event
   $("#loginModal").on('hide', function(event){
	   window.onbeforeunload=goodbye;
   });
   // Login submit event
   $('#et-login-form').on('submit', function(e) {
      e.preventDefault();

      // Modify the code here for
      // the login implementation
      $('#loginModal').modal('hide');

      var $appInfo = $('#et-application-first-section');
      $appInfo.removeClass('hide-element')
               .css('margin-bottom', '190px');

      // Update current section flag
      $('#' + currentSection).addClass('hide-element');
      currentSection = 'et-application-first-section';

      $('body, html').animate({
         scrollTop: ($appInfo.offset().top - stickyHeight) + 'px'
      }, 500);
   });

   // Apply promo code event
   $('#et-apply-promo-code').on('click', function(e) {
        //applyPromoReward();
   });
   $('#et-promocode').on('blur', function(e) {
        //applyPromoReward();
   });

   // Redirect back to home
//   $('#et-cust-serv-form').on('submit', function(e) {
//       e.preventDefault();
//
//       $('.modal').modal('hide');
//       $('#back-to-home-modal').modal('show');
//
//   });

   // Invoke section scrolling function
   scrollingToSections();

   // Invoke form validations
   $(document).ready(function(){
      etFormValidations();
   });

   //===================================================

    /**
    * Apply the promotion reward
    * Display the amount section
    */
   function applyPromoReward(effectivePeriod) {
        var $promoField = $('#et-promocode');
        var $disPromo = $('#et-dis-promo-amount');
        var $actPromo = $('#et-act-promo-amount');

        // Modify code to do the actual promotion
        // Do the actual calculation
        //var isValid = $promoField.val();

        if(effectivePeriod != null && effectivePeriod == '12'){
            $disPromo.removeClass('hidden')
            //$disPromo.find('.bottom .et-amount')
            //         .html('HK$ 900 <span>/per month</span>');
            //$disPromo.find('.bottom .et-per et-month')
            //         .text('(only HK$ 100 per day)');

            $actPromo.find('.top .et-po-amount-label')
                     .text('2nd - 20th policy year');
        } else {
            $disPromo.addClass('hidden');
            $actPromo.find('.top .et-po-amount-label')
                     .text('first 20 policy years');
        }
   }

   /**
   * Groups the scrolling to each section functions
   */

   // Move to Before We Start section from Underwriting Summary section(EDIT)
   $('#underwriting-summary-edit').on('click', function(e) {
       var $beforeWeStart = $('#et-select-plan-section');
       $beforeWeStart.removeClass('hide-element');
    });

   function scrollingToSections() {
      // Move to before we start section
      //$('#select-plan').on('click', function(e) {
      //   $('body, html').animate({
      //      scrollTop: ($('#et-select-plan-section').offset().top - stickyHeight) + 'px'
      //   }, 500);
      //});

      // Move to About your self section
      $('#et-btn-before-start').on('click', function(e) {
         var $self = $(this);

         if ($self.hasClass('back-to-summary')) {
             $('#et-application-third-section').removeClass('hide-element');
			 $('body, html').animate({
				 scrollTop: ($('#et-application-third-section').offset().top - stickyHeight) + 'px'
			 }, 0);
         } else {
        	 putEtPageKeySession("1");

	         var $aboutYourSelf = $('#et-about-yoursel-section');

	         $self.removeClass('et-pad-bot-50');
	         $aboutYourSelf.removeClass('hide-element')
	                        .css('margin-bottom', '125px');

	         $('body, html').animate({
	            scrollTop: ($aboutYourSelf.offset().top - stickyHeight) + 'px'
	         }, 500);
      	 }

         // Store plan detail data
         if ($('#et-before-yes').prop('checked')) {
            planDetailData.hasExsingInsurancePoliscy = true;
         } else if ($('#et-before-no').prop('checked')) {
            planDetailData.hasExsingInsurancePoliscy = false;
         }
      });

      // Move to Plan option section
      // $('#et-btn-ay-self').on('click', function(e) {
      //    var $self = $(this);
      //    var $planOption = $('#et-plan-option-section');

      //    $self.removeClass('et-pad-bot-50');
      //    $('#et-about-yoursel-section').removeAttr('style');
      //    $planOption.removeClass('hide-element');

      //    if(getWidth()>=992){
      //       $('.et-collapse-link[aria-expanded="true"]').parent()
      //                                              .next()
      //                                              .find('.et-panel-body')
      //                                              .jScrollPane({showArrows: true});
      //    }

      //    $('body, html').animate({
      //       scrollTop: ($planOption.offset().top - stickyHeight) + 'px'
      //    }, 500);

      //    // Store plan detail data
      //    if ($('#et-gender-male').prop('checked')) {
      //       planDetailData.gender = 'Male';
      //    } else if ($('#et-gender-female').prop('checked')) {
      //       planDetailData.gender = 'Female';
      //    }

      //    if ($('#et-smoker-yes').prop('checked')) {
      //       planDetailData.isSmoker = true;
      //    } else if ($('#et-smoker-no').prop('checked')) {
      //       planDetailData.isSmoker = false;
      //    }

      //    planDetailData.dob = $planDate.val();
      // });

      // Move to Medical declaration section
      $('#et-brn-proceed-to-application').on('click', function(e) {

    	 e.preventDefault();
         var $self = $(this);

         // Store plan detail data
         //////var sliderVal = $('#et-slider-range').text();
         //////var monthlyPrem = $('#et-month-dis-amount').text();
         //////var monthlyPremExtra = $('#et-month-amount').text();

         //clear htmls 1st
         ////$('#etaspd-insured-amount').html('');
         ////$('#etaspd-monthly-premium .hkd').html('');
         ////$('#etaspd-monthly-premium-extra-years .hkd').html('');

         //$('#etaspd-insured-amount').html('HK$ '+ sliderVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
         //$('#etaspd-monthly-premium .value').html('HK$ '+ monthlyPrem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
         //$('#etaspd-monthly-premium-extra-years .value').html('HK$ '+ monthlyPremExtra.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

         populateAppSummPD();

         if ($self.hasClass('back-to-summary')) {
        	 storeAppInfo();
             populateAppSummPI();
        	 $('#et-application-first-section').addClass('hide-element');
        	 $('#et-application-third-section').removeClass('hide-element');
             $('body, html').animate({
            	 scrollTop: ($('#et-application-third-section').offset().top - stickyHeight) + 'px'
             }, 0);
         } else if ($self.hasClass('back-to-app')) {
            // Go back to the application form
            $('#et-select-plan-section').addClass('hide-element');
            currentSection = 'et-application-first-section';

            $('body, html').animate({
                scrollTop: ($('#et-application-info-section').offset().top - stickyHeight) + 'px'
            }, 500);
         } else {
        	window.onbeforeunload=null;
            // Open login modal
            $('#loginModal').modal('show');
         }
      });

      // Move to Application Info section
      $('#et-medical-dec-next').on('click', function(e) {
            var $self = $(this);
            var $target = null;

            if (isMedicAnswered()) {
               // Remve datepicker
               $infoDOB.datepicker('remove');

               // Store application info data
               appInfoData.medicalDecStatus = false;

               // Update app info dob
               if (planDetailData.dob && (planDetailData.dob !== 'DD-MM-YYYY')) {
                  $('#sales-illu-dob').val(planDetailData.dob);
               }

               // Update app info gender
               if (planDetailData.gender) {
                  var gender_display = (planDetailData.gender=='Male')?getBundle(getBundleLanguage, "option.male"):getBundle(getBundleLanguage, "option.female");
                  $('#savieApplicantBean\\.gender').val(gender_display);
               }


               if ($self.hasClass('back-to-summary')) {
                  populateAppSummPD();
            	   $('#et-application-third-section').removeClass('hide-element');
            	   $target = $('#et-application-third-section');
               } else {
                   $target = $('#et-application-info-section');
                   $target.removeClass('hide-element');

                   $('#et-application-first-section').removeAttr('style');

                   $('#savieApplicantBean\\.chineseName').val('').trigger('change');
                   $('#savieApplicantBean\\.permanentAddress1').val('').trigger('change');
                   $('#savieApplicantBean\\.permanentAddress2').val('').trigger('change');
                   $('#savieApplicantBean\\.permanentAddress3').val('').trigger('change');
                   $('#savieApplicantBean\\.residentialAdress1').val('').trigger('change');
                   $('#savieApplicantBean\\.residentialAdress2').val('').trigger('change');
                   $('#savieApplicantBean\\.residentialAdress3').val('').trigger('change');
                   $('#savieApplicantBean\\.correspondenceAdress1').val('').trigger('change');
                   $('#savieApplicantBean\\.correspondenceAdress2').val('').trigger('change');
                   $('#savieApplicantBean\\.correspondenceAdress3').val('').trigger('change');

                   // Disable scrolling to the select plan section
                   // Update current section flag
                   if (currentSection === 'et-select-plan-section') {
                      $('#' + currentSection).addClass('hide-element');
                   }
                   currentSection = 'et-application-first-section';
               }
            } else {
               $target = $('#et-application-first-section');

               // Store application info data
               appInfoData.medicalDecStatus = true;
            }

            $('body, html').animate({
               scrollTop: ($target.offset().top - stickyHeight) + 'px'
            }, 500);
      });

      // Move to Declaration section
      $('#et-beneficiary-info-next').on('click', function(e) {

         var $self = $(this);
         var $target = '';


         if (isBeneficaryValid()) {
        	 var beneFormdata = $('#beneficiaryInfoForm\\[0\\]').serialize()+"&"+
     	                        $('#beneficiaryInfoForm\\[1\\]').serialize()+"&"+
     	                        $('#beneficiaryInfoForm\\[2\\]').serialize();
        	 $.ajax({
		         type: "POST",
		         url:contextPath+'/ajax/eliteTerm/putBeneficiaryInfoSession',
		         data: beneFormdata,
		         success:function(data){}
			 });

            // Store beneficiaries data
            storeBeneficiaryInfo();
        	  populateAppSummBI();

            if ($self.hasClass('back-to-summary')) {
               storeBeneficiaryInfo();
               populateAppSummBI();
               $('#et-application-third-section').removeClass('hide-element');
               $('body, html').animate({
            	  scrollTop: ($('#et-application-third-section').offset().top - stickyHeight) + 'px'
               }, 0);

            } else {
               $target = $('#et-application-second-section');
               $target.removeClass('hide-element');
               $('body, html').animate({
                  scrollTop: ($target.offset().top - stickyHeight) + 'px'
               }, 500);

            }

            $('#name-others-now').on('click', function(e) {
            	$('#beneficiaryInfoForm\\[0\\]').data('bootstrapValidator').resetForm(true);
        		if ($('#beneficiaryInfoForm\\[1\\]').length) {
        			$('#beneficiaryInfoForm\\[1\\]').data('bootstrapValidator').resetForm(true);
        		}
        		if ($('#beneficiaryInfoForm\\[2\\]').length) {
        			$('#beneficiaryInfoForm\\[2\\]').data('bootstrapValidator').resetForm(true);
        		}
             });

         } else {
            $('body, html').animate({
                  scrollTop: ($('#et-beneficiary-info-section').offset().top - stickyHeight) + 'px'
            }, 0);
         }
      });

      function checkCheckBoxBySelectPay() {
        var result = true;
        if(!$('#pics-check').is(':checked')) {
          $("#chk1").html(getBundle(getBundleLanguage, "et.PICS.notChecked"));
          result = false;
        }else {
          $("#chk1").html("");
        }

        if(!$('#cancellation-check').is(':checked')) {
          $("#chk2").html(getBundle(getBundleLanguage, "et.cancellation.notChecked"));
          result = false;
        }else {
          $("#chk2").html("");
        }

        if(!$('#application-declaration').is(':checked')) {
          $("#chk3").html(getBundle(getBundleLanguage, "et.tnc.notChecked"));
          result = false;
        }else {
          $("#chk3").html("");
        }

        if($('#is-resident-check').is(':checked')) {
          $("#chk4").html("");
        }else if($('#non-resident-check').is(':checked')) {
          $("#chk4").html(getBundle(getBundleLanguage, "error.handle.cs.hotline"));
          result = false;
        }else {
          $("#chk4").html(getBundle(getBundleLanguage, "et.option.notSelected"));
          result = false;
        }

        if($('#no-policy-replace-check').is(':checked')) {
          $("#chk6").html("");
        } else if($('#yes-policy-replace-check').is(':checked')) {
          $("#chk6").html(getBundle(getBundleLanguage, "error.handle.cs.hotline"));
          result = false;
        } else {
          $("#chk6").html(getBundle(getBundleLanguage, "et.option.notSelected"));
          result = false;
        }

        if($('#no-policy-replace-existing-check').is(':checked')) {
          $("#chk7").html("");
        }else if($('#yes-policy-replace-existing-check').is(':checked')) {
          $("#chk7").html(getBundle(getBundleLanguage, "error.handle.cs.hotline"));
          result = false;
        }else {
          $("#chk7").html(getBundle(getBundleLanguage, "et.option.notSelected"));
          result = false;
        }

        if(!$('#automatic-exchange').is(':checked')) {
          $("#chk8").html(getBundle(getBundleLanguage, "et.tnc.notChecked"));
          result = false;
        }else {
          $("#chk8").html("");
        }
//        if(!$('#application-declaration-promotion').is(':checked')) {
//            $("#chk9").html(getBundle(getBundleLanguage, "et.tnc.notChecked"));
//            result = false;
//        }else {
//            $("#chk9").html("");
//        }

        return result;
      }

      // Show Application Summary section
      $('#et-app-sum-proceed-btn').on('click', function(e) {

    	 if(!checkCheckBoxBySelectPay()){
    		 return false;
    	 }

         var $self = $(this);
         var $appSum = $('#et-application-third-section');
         var $confirmSign = $('#et-confirm-and-sign-btn');
         var $confirmSignWait = $('#et-confirm-and-sign-wait-btn');

         //smoker non-smoker
         if ($('#et-smoker-yes').prop('checked')) {
            planDetailData.isSmooker = true;
         } else if ($('#et-smoker-no').prop('checked')) {
            planDetailData.isSmooker = false;
         }

         // Populate information in application summary
         populateAppSummPD();
         populateAppSummPI();
         populateAppSummEI();
         populateAppSummBI();

         $self.parent().addClass('et-selected');


         // Set timer for confirm and sign button
         var waitSecond = 0;
         if (waitSecond <= 0) {
	         waitSecond = parseInt($confirmSignWait.data('wait'), 10);
	         $confirmSignWait.text('(' + waitSecond + ')');
	         var waitInterval = setInterval(function(){
	        	 waitSecond--;
	        	 $confirmSignWait.text('(' + waitSecond + ')');
	        	 if (waitSecond <= 0) {
	        		 $confirmSignWait.addClass('hide');
	        		 $confirmSign.removeClass('hide');
	        		 clearInterval(waitInterval);
	        	 };
	         }, 1000);
      	}


         $.ajax({
	         type: "POST",
	         url:contextPath+'/ajax/eliteTerm/putDeclarationSession',
	         data: $('#etLicenseInfoForm').serialize(),
	         success:function(data){}
		 });

         //res address
        // if($('#etaspi-res-add').html().length <= 0 || !$('#savieApplicantBean\\.isResidential').prop('checked')) {
        //	 $('#etaspi-res-add').removeClass('hide-element');
        //	 $('#etaspi-res-add').html($('#etaspi-per-add').html());
        // }
        // //corr address
        // if($('#etaspi-corr-add').html().length <= 0 || !$('#savieApplicantBean\\.addressIsSame').prop('checked')) {
        //	 $('#etaspi-corr-add').removeClass('hide-element');
        //	 $('#etaspi-corr-add').html($('#etaspi-res-add').html());
        // }
         $appSum.removeClass('hide-element');

         $('body, html').animate({
            scrollTop: ($appSum.offset().top - stickyHeight) + 'px'
         }, 500);
      });

      // APPLICATION SUMMARY EDIT buttons
      // Move to specific sections
      $(document).on('click', '.et-app-sum-edit', function(e) {
         e.preventDefault();
         var $self = $(this);
         var $target = $($self.data('target'));

         if(getWidth()>=992){
              $('.et-collapse-link[aria-expanded="true"]').parent()
                 .next()
                 .find('.et-panel-body')
                 .jScrollPane({showArrows: true});
           }

         if ($self.hasClass('et-app-edit')) {
	         var backText = $('#et-brn-proceed-to-application').data('back-text');
	         $('#et-brn-proceed-to-application').text(backText);
	         $('#et-brn-proceed-to-application').removeClass('hide-element');
	         $('#et-brn-proceed-to-application').removeClass('back-to-summary');
	         $('#et-brn-proceed-to-application').addClass('back-to-app');
         } else {
	         //hide summary
		     $('#et-application-third-section').addClass('hide-element');
		     $('#et-declaration-proceed-btn').parent().removeClass('hidden');

	         //hide parts
		     $('#et-about-yoursel-section').addClass('hide-element');
	         $('#et-plan-option-section').addClass('hide-element');
	         $('#et-application-info-section').addClass('hide-element');
	         $('#personal-info').addClass('hide-element');
	         $('#et-employment-info-section').addClass('hide-element');
	         $('#et-beneficiary-info-section').addClass('hide-element');
	         $('#et-select-plan-section').addClass('hide-element');
	         $('#et-application-second-section').addClass('hide-element');

	         //update button text
	         var backText = $('#et-app-sum-proceed-btn').data('back-text');
	         //('#et-btn-before-start').addClass('back-to-summary').text(backText);
	         $('#et-brn-proceed-to-application').removeClass('hide-element').addClass('back-to-summary').text(backText);
	         $('#et-medical-dec-next').addClass('back-to-summary').text(backText);
	         $('#et-personal-info-next').addClass('back-to-summary').text(backText);
	         $('#et-employment-info-next').addClass('back-to-summary').text(backText);
	         $('#et-beneficiary-info-next').addClass('back-to-summary').text(backText);
	         $('#et-app-sum-proceed-btn').removeClass('et-btn-view-summary').addClass('back-to-summary').text(backText);

	         //show target
	         if (($self.data('target') === '#personal-info') || ($self.data('target') === '#et-employment-info-section') || $self.data('target') === '#et-beneficiary-info-section') {
	        	 $('#et-application-info-section').removeClass('hide-element');
	         }
      	 }

         $target.removeClass('hide-element');


         if (($self.data('target') === '#et-about-yoursel-section') || $self.data('target') === '#et-plan-option-section') {
            currentSection = 'et-select-plan-section';
            //$('#' + currentSection).removeClass('hide-element');

            //$('#et-brn-proceed-to-application').addClass('back-to-app').text('Back to application');


            $('body, html').animate({
                scrollTop: ($target.offset().top - stickyHeight) + 'px'
            }, 500);
         } else {
            $('body, html').animate({
                scrollTop: ($target.offset().top - stickyHeight) + 'px'
             }, 0);
         }
      });

      // Move to signature section
      $('#et-confirm-and-sign-btn, #et-declaration-proceed-btn').on('click', function(e) {
         e.preventDefault();

         if(!checkCheckBoxBySelectPay()){
    		 return false;
    	 }

         var $self = $(this);
         var $sigSection = $('#et-application-fourth-section');

         $sigSection.removeClass('hide-element');

         if (!$("#signature").find('canvas').length) {

            // determine signature pad height
            var $jSignatureCan = $('.jSignature');

            var sigHeight = '350px';
            if (getWidth() < 992) {
              sigHeight = '260px';
            }

            // Initialize signature area
            $("#signature").jSignature({
               height: sigHeight,
               width: '100%',
               'decor-color': 'transparent',
            }).on('change', function(e) {
               var $self = $(this);

               if ($("#signature").jSignature('getData', 'native').length) {
                  $self.siblings('.correct-signature')
                        .removeClass('hide-element');

                  $('#signature-section .fwd-error-red .help-block').html('').css('display', 'none');

               } else {
                  $self.siblings('.correct-signature')
                        .addClass('hide-element');
               }
            });

            // Signature clear
            $(document).on('click', '#et-clear-signature', function(e) {
               e.preventDefault();

               $('#signature').jSignature('clear');
               $(this).parent()
                     .siblings('.correct-signature')
                     .addClass('hide-element');
            });
         }

         $('body, html').animate({
            scrollTop: ($sigSection.offset().top - stickyHeight) + 'px'
         }, 500);
      });
   }// END OF GROUPS THE SCROLLING TO EACH SECTION FUNCTIONS

   /**
   * Form validation for application info and employment info
   */
   function etFormValidations() {
      //Application Info
      $('#eliteTermsInsuredInfoForm').bootstrapValidator({
         excluded: [':disabled', ':hidden', ':not(:visible)'
                     // 'input[name="savieApplicantBean.firstName"]',
                     //'input[name="savieApplicantBean.lastName"]',
                     //'input[name="savieApplicantBean.chineseName"]'
                  ],
         fields: {
            "savieApplicantBean.firstName": {
               container: '#savieApplicantBeanFirstNameMsg',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "error.given.name.empty")
                  },
                  stringLength: {
                     max: 25,
                     message: getBundle(getBundleLanguage, "et.selectPlan.Given.Name.must.be.no.more.than.25.characters")
                  },
                  regexp: {
                     regexp: /^[a-zA-Z\s]*$/,
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.enter.your.Given.Name.in.English")
                  },
                  callback: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.enter.your.Given.Name.in.English"),
                     callback: function(value, validator) {
                        return value !== document.getElementById('savieApplicantBean.firstName').getAttribute('placeholder');
                     }
                  }
               }
            },
            "savieApplicantBean.lastName": {
               container: '#savieApplicantBeanlastNameMsg',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "error.last.name.empty")
                  },
                  stringLength: {
                     max: 25,
                     message: getBundle(getBundleLanguage, "et.selectPlan.Last.Name.must.be.no.more.than.25.characters")
                  },
                  regexp: {
                     regexp: /^[a-zA-Z\s]*$/,
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.enter.your.Last.Name.in.English")
                  },
                  callback: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.enter.your.Last.Name.in.English"),
                     callback: function(value, validator) {
                        return value !== document.getElementById('savieApplicantBean.lastName').getAttribute('placeholder');
                     }
                  }
               }
            },
            "savieApplicantBean.chineseName": {
               container: '#savieApplicantBeanchineseNameMsg',
               validators: {
                  stringLength: {
                     max: 6,
                     message: getBundle(getBundleLanguage, "et.selectPlan.Chinese.Name.must.be.no.more.than.6.characters")
                  },
                  regexp: {
                     regexp: /^[\s\u4e00-\u9fa5]*$/,
                     message: getBundle(getBundleLanguage, "error.chinese.name.invalid")
                  }/*,
                  remote:{
                  	message: getBundle(getBundleLanguage, "error.chinese.name.simplified"),
                	url: contextPath+"/ajax/validateSimpleChinese",
                	type: "get",
                	dataType: "json",
                	data: {
                		str: function() {
                	        return $("#savieApplicantBean\\.chineseName").val();
                	    }
                	}
	              }*/
               }
            },
            "dob": {
               container: '#sales-illu-dob-msg',
               validators: {
                  notEmpty: {

                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.enter.your.Date.of.birth")
                  }
               }
            },
            // 2016memberID
            // "theClubMembershipNo": {
            //    container: '#errClubMemberID',
            //    trigger: 'blur',
            //    validators: {
            //       notEmpty: {
            //          message: getBundle(getBundleLanguage, "club.member.empty")
            //       },
            //       regexp: {
            //         regexp: /^8[0-9]{9}$/,
            //         message: getBundle(getBundleLanguage, "club.member.digitchk")
            //       }
            //    }
            // },
            "savieApplicantBean.hkId": {
               container: '#hkidMessage',
               trigger: 'blur',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.HKID.is.required")
                  },
                  callback: {
                     message: getBundle(getBundleLanguage, "form.hkid.invalid"),
                     callback: function(value, validator) {
                        return IsHKID(value);
                     }
                  }
               }
            },
            "savieApplicantBean.maritalStatus": {
               container: '#maritalStatusMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Marital.status.is.required")
                  }
               }
            },
            "savieApplicantBean.placeOfBirth": {
               container: '#placeOfBirthMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Place.of.birth.is.required")
                  }
               }
            },
            "savieApplicantBean.nationality": {
               container: '#nationalityMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Nationality.is.required")
                  }
               }
            },
            "savieApplicantBean.residentialTelNo": {
               container: '#resTelMessage',
               validators: {
                  stringLength: {
                      min: 8,
                      max: 8,
                      message: getBundle(getBundleLanguage, "member.telNo.notValidLength.message")
                   },
                   regexp: {
                      regexp: /^1[0-9]{10}$|^[235689][0-9]{7}$/,
                      message: getBundle(getBundleLanguage, "et.selectPlan.Invalid.Telephone.number")
                   }
               }
            },
            "savieApplicantBean.mobileNo": {
               container: '#mobileMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Mobile.number.is.required")
                  },
                  stringLength: {
                      min: 8,
                      max: 8,
                      message: getBundle(getBundleLanguage, "member.mobileNo.notValidLength.message")
                   },
                   regexp: {
                      regexp: /^1[0-9]{10}$|^[5689][0-9]{7}$/,
                      message: getBundle(getBundleLanguage, "et.selectPlan.Invalid.Mobile.number")
                   }
               }
            },
            "savieApplicantBean.emailAddress": {
               container: '#emailMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Email.address.is.required")
                  },
                  emailAddress: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Provide.a.valid.email.address")
                  }
               }
            },
            "savieApplicantBean.residentialDistrict": {
               container: '#resDistrictMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.select.a.district")
                  }
               }
            },
            "savieApplicantBean.residentialDistrictCountry": {
               container: '#residentialDistrictCountryMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.select.a.country")
                  }
               }
            },
            "savieApplicantBean.permanentAddressCountry": {
               container: '#permanentAddressCountryMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.select.a.country")
                  }
               }
            },
            "savieApplicantBean.permanentAddress": {
               container: '#perAddressMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.select.a.district")
                  }
               }
            },
            "savieApplicantBean.correspondenceDistrict": {
               container: '#correspondenceDistrictMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.select.a.district")
                  }
               }
            },
            "savieApplicantBean.correspondenceDistrictCountry": {
               container: '#correspondenceCountryMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "et.selectPlan.Please.select.a.country")
                  }
               }
            },
            "savieApplicantBean.permanentAddress1": {
                container: '#permanentAddressMessage1',
                validators: {
                    notEmpty: {
                      message: getBundle(getBundleLanguage, "form.address.empty")
                    },
                    regexp: {
                      regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                      message: getBundle(getBundleLanguage, "form.address.invalid")
                    }/*,
                    callback: {
                        message: getBundle(getBundleLanguage, "form.address.empty"),
                        callback: function(value, validator) {
                           return value !== document.getElementById('savieApplicantBean.permanentAddress1').getAttribute('placeholder');
                        }
                     }*/
                    /*,
                    callback: {
                        callback: function(value, validator) {
                          return {
                            valid: isPerLineValid(),
                            message: getBundle(getBundleLanguage, "form.address.empty")
                          }
                        }
                    }*/
                }
             },
             "savieApplicantBean.permanentAddress2": {
                 container: '#permanentAddressMessage2',
                 validators: {
                    regexp: {
                       regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                       message: getBundle(getBundleLanguage, "form.address.invalid")
                    }/*,
                    callback: {
                        callback: function(value, validator) {
                        	permanentAddress(value,'permanentAddress2','permanentAddress1', 'permanentAddress3');
                          return true;
                        }
                    }*/
                 }
              },
              "savieApplicantBean.permanentAddress3": {
                 container: '#permanentAddressMessage3',
                 validators: {
                    regexp: {
                       regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                       message: getBundle(getBundleLanguage, "form.address.invalid")
                    }/*,
                    callback: {
                        callback: function(value, validator) {
                        	permanentAddress(value,'permanentAddress3','permanentAddress1','permanentAddress2');
                          return true;
                        }
                    }*/
                 }
              },
              "savieApplicantBean.residentialAdress1": {
                  container: '#residentialAddressMessage1',
                  validators: {
                     notEmpty: {
                        message: getBundle(getBundleLanguage, "form.address.empty")
                     },
                     regexp: {
                        regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                        message: getBundle(getBundleLanguage, "form.address.invalid")
                     }/*,
                     callback: {
                         message: getBundle(getBundleLanguage, "form.address.empty"),
                         callback: function(value, validator) {
                            return value !== document.getElementById('savieApplicantBean.residentialAdress1').getAttribute('placeholder');
                         }
                      }*/
                      /*,
                      callback: {
                          callback: function(value, validator) {
                            return {
                              valid: isResLineValid(),
                              message: getBundle(getBundleLanguage, "form.address.empty")
                            }
                          }
                      }*/
                  }
               },
               "savieApplicantBean.residentialAdress2": {
                   container: '#residentialAddressMessage2',
                   validators: {
                      regexp: {
                         regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                         message: getBundle(getBundleLanguage, "form.address.invalid")
                      }/*,
                      callback: {
                          callback: function(value, validator) {
                          	permanentAddress(value,'residentialAdress2','residentialAdress1', 'residentialAdress3');
                            return true;
                          }
                      }*/
                   }
                },
                "savieApplicantBean.residentialAdress3": {
                   container: '#residentialAddressMessage3',
                   validators: {
                      regexp: {
                         regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                         message: getBundle(getBundleLanguage, "form.address.invalid")
                      }/*,
                      callback: {
                          callback: function(value, validator) {
                          	permanentAddress(value,'residentialAdress3','residentialAdress1', 'residentialAdress2');
                            return true;
                          }
                      }*/
                   }
                },
                "savieApplicantBean.correspondenceAdress1": {
                    container: '#corrAddressMessage1',
                    validators: {
                     notEmpty: {
                        message: getBundle(getBundleLanguage, "form.address.empty")
                     },
                     regexp: {
                          regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                          message: getBundle(getBundleLanguage, "form.address.invalid")
                      }/*,
                      callback: {
                          message: getBundle(getBundleLanguage, "form.address.empty"),
                          callback: function(value, validator) {
                             return value !== document.getElementById('savieApplicantBean.correspondenceAdress1').getAttribute('placeholder');
                          }
                       }*/
                      /*,
                      callback: {
                          callback: function(value, validator) {
                            return {
                              valid: isCorrLineValid(),
                              message: getBundle(getBundleLanguage, "form.address.empty")
                            }
                          }
                      }*/
                    }
                 },
                 "savieApplicantBean.correspondenceAdress2": {
                     container: '#corrAddressMessage2',
                     validators: {
                        regexp: {
                           regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                           message: getBundle(getBundleLanguage, "form.address.invalid")
                        }/*,
                        callback: {
                            callback: function(value, validator) {
                            	permanentAddress(value,'correspondenceAdress2','correspondenceAdress1', 'correspondenceAdress3');
                              return true;
                            }
                        }*/
                     }
                  },
                  "savieApplicantBean.correspondenceAdress3": {
                     container: '#corrAddressMessage3',
                     validators: {
                        regexp: {
                           regexp: /^[a-zA-Z0-9\s,-\/]*$/,
                           message: getBundle(getBundleLanguage, "form.address.invalid")
                        }/*,
                        callback: {
                            callback: function(value, validator) {
                            	permanentAddress(value,'correspondenceAdress3','correspondenceAdress1', 'correspondenceAdress2');
                              return true;
                            }
                        }*/
                     }
                  }

         }
      }).on('success.form.bv', function(e) {
         e.preventDefault();
         var $form = $(this);
         var _form = $('#eliteTermsInsuredInfoForm');
         var isValidAddLine = true;

			// Identify suspicious tax resident
			var tax_resident_info = {};
			tax_resident_info.hkId = $('#savieApplicantBean\\.hkId').val();
			tax_resident_info.placeOfBirth = $('#savieApplicantBean\\.placeOfBirth').val().split("-")[0];
			tax_resident_info.nationality = $('#savieApplicantBean\\.nationality').val().split("-")[0];
			tax_resident_info.permanentAddress = {'line1':$('#savieApplicantBean\\.permanentAddress1').val(),'line2':$('#savieApplicantBean\\.permanentAddress2').val(),'line3':$('#savieApplicantBean\\.permanentAddress3').val(),'line4':'','district':$('#savieApplicantBean\\.permanentAddress').val().split("-")[0]};
			tax_resident_info.residentialAddress = {'line1':$('#savieApplicantBean\\.residentialAdress1').val(),'line2':$('#savieApplicantBean\\.residentialAdress2').val(),'line3':$('#savieApplicantBean\\.residentialAdress3').val(),'line4':'','district':$('#savieApplicantBean\\.residentialDistrict').val().split("-")[0]};
			tax_resident_info.correspondenceAddress = {'line1':$('#savieApplicantBean\\.correspondenceAdress1').val(),'line2':$('#savieApplicantBean\\.correspondenceAdress2').val(),'line3':$('#savieApplicantBean\\.correspondenceAdress3').val(),'line4':'','district':$('#savieApplicantBean\\.correspondenceDistrict').val().split("-")[0]};
			
			console.log(tax_resident_info);
			console.log(JSON.stringify(tax_resident_info));
			
			$.ajax({
				type: "POST",
				async: false,
				contentType: "application/json;charset=utf-8",
				url: contextPath + "/api/member/crs",
				data: JSON.stringify(tax_resident_info),
				success: function (data,code,http_response) {
					console.log(data);
					if (data != null && data.proceed != null && data.proceed != "") {
							if(data.proceed == true){
								$.ajax({
									type: "POST",
									url:contextPath+'/ajax/eliteTerm/putPersonalInfoSession',
									data: $('#eliteTermsInsuredInfoForm').serialize(),
									success:function(data){}
								});
								$('#et-personal-info-next').removeAttr('disabled');

								if ($('#et-personal-info-next').hasClass('back-to-summary')) {
								  storeAppInfo();
									populateAppSummPI();
								$('#et-application-third-section').removeClass('hide-element');
									$('body, html').animate({
										scrollTop: ($('#et-application-third-section').offset().top - stickyHeight) + 'px'
									}, 0);
								} else {
									var $ben = $('#et-employment-info-section');

									$ben.removeClass('hide-element')
											 .css('margin-bottom', '280px');

									$('body, html').animate({
										scrollTop: ($ben.offset().top - stickyHeight) + 'px'
									}, 500);
								}

								//Store application info data
								storeAppInfo();								
							}else{
								$('#tax-resident-modal').modal('show');
							}
							
					}else{
						$('#tax-resident-modal').modal('show');
					}
				}
			});
		
      }).on('error.form.bv', function(e) {
         var $bv = $(this).data('bootstrapValidator');
         var _form = $('#eliteTermsInsuredInfoForm');
         var isValid = false;
         var isValidAddLine = true;


         // Check if permanent address lines
         /*if (!isPerLineValid()) {
            _form.bootstrapValidator('updateStatus', 'savieApplicantBean.permanentAddress1', 'INVALID', 'callback');
            isValidAddLine = false;
         } else {
            _form.bootstrapValidator('updateStatus', 'savieApplicantBean.permanentAddress1', 'VALID', 'callback');
         }

         // Check if res address lines
         if (!isResLineValid()) {
            _form.bootstrapValidator('updateStatus', 'savieApplicantBean.residentialAdress1', 'INVALID', 'callback');
            isValidAddLine = false;
         } else {
            _form.bootstrapValidator('updateStatus', 'savieApplicantBean.residentialAdress1', 'VALID', 'callback');
         }

         // Check if corr address lines
         if (!isCorrLineValid()) {
            _form.bootstrapValidator('updateStatus', 'savieApplicantBean.correspondenceAdress1', 'INVALID', 'callback');
            isValidAddLine = false;
         } else {
            _form.bootstrapValidator('updateStatus', 'savieApplicantBean.correspondenceAdress1', 'VALID', 'callback');
         }

         if (!isValidAddLine) {
            $('body, html').animate({
               scrollTop: ($('#et-application-info-section').offset().top - stickyHeight) + 'px'
            }, 0);
            return false;
         }*/

         if ($bv.$invalidFields.length == 1) {
            for (var i=0; i<$bv.$invalidFields.length; i++) {
               if (($bv.$invalidFields[0].getAttribute('id') === "sales-illu-dob") && $bv.$invalidFields[0].value) {
                  isValid = true;
                  break;
               }
            }
         }

         if ($bv.$invalidFields.length == 0) {
            isValid = true;
         }

         if (isValid) {
            $('#et-personal-info-next').removeAttr('disabled');
            var $ben = $('#et-employment-info-section');

            $ben.removeClass('hide-element')
                  .css('margin-bottom', '280px');

            $('body, html').animate({
               scrollTop: ($ben.offset().top - stickyHeight) + 'px'
            }, 500);

            //Store application info data
            storeAppInfo();
         } else {
            $('body, html').animate({
               scrollTop: ($('#et-application-info-section').offset().top - stickyHeight) + 'px'
            }, 0);
         }
      });

      // Employment Info
      $('#etEmploymentInfoForm').bootstrapValidator({
          fields: {
            "savieEmploymentBean.employmentStatus": {
               container: '#employmentStatusMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "form.employment.status.empty")
                  }
               }
            },
            "savieEmploymentBean.occupation": {
               container: '#occupationMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "form.employment.occupation.empty")
                  }
               }
            },
            "savieEmploymentBean.sourceOfIncome": {
               container: '#sourceOfIncome',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "form.sourceOfIncome.empty")
                  }
               }
            },
            "savieEmploymentBean.liquidAssets": {
               container: '#liquidAssets',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "form.liquidAssets.empty")
                  }
               }
            },
            "savieEmploymentBean.educationLevel": {
               container: '#educationLevelMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "form.education.empty")
                  }
               }
            },
            "savieEmploymentBean.natureOfBusiness": {
               container: '#natureOfBusinessMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "form.employment.nature.empty")
                  }
               }
            },
            "savieEmploymentBean.monthlyPersonalIncome": {
               container: '#monthlyIncomeMessage',
               validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "form.employment.income.empty")
                  }
               }
            },
            "savieEmploymentBean.currentEmployerName": {
                container: '#employerNameMessage',
                validators: {
                  stringLength: {
                      min: 1,
                      max: 35,
                      message: getBundle(getBundleLanguage, "form.employer.name.length")
                  },

                   notEmpty: {
                      message: getBundle(getBundleLanguage, "form.employer.name.empty")
                   }
                }
             },
             "regularIncome": {
                 container: '#has_regular_incomeErMsg',
                 validators: {
                     notEmpty: {
                         message: getBundle(getBundleLanguage, "error.has.regular.income.empty")
                     }
                 }
             }
         }
      }).on('success.form.bv', function(e) {
            e.preventDefault();
            var $form = $(this);

            if ($form.data('bootstrapValidator').isValid()) {
            	$.ajax({
    		         type: "POST",
    		         url:contextPath+'/ajax/eliteTerm/putEmploymentInfoSession',
    		         data: $('#etEmploymentInfoForm').serialize(),
    		         success:function(data){}
    			});

               $('#et-employment-info-next').removeAttr('disabled');
               $('#et-employment-info-section').removeAttr('style');

               if ($('#et-employment-info-next').hasClass('back-to-summary')) {
            	   storeEmpInfo();
            	   populateAppSummEI();
            	  $('#et-application-third-section').removeClass('hide-element');
                  $('body, html').animate({
                 	 scrollTop: ($('#et-application-third-section').offset().top - stickyHeight) + 'px'
                  }, 0);
               } else {
                  var $ben = $('#et-beneficiary-info-section');

                  $('#savieBeneficiaryBean\\[0\\]\\.chineseName').val('').trigger('change');
                  if ($('#beneficiaryInfoForm\\[1\\]').length) {
                	  $('#savieBeneficiaryBean\\[1\\]\\.chineseName').val('').trigger('change');
                  }
                  if ($('#beneficiaryInfoForm\\[1\\]').length) {
                	  $('#savieBeneficiaryBean\\[2\\]\\.chineseName').val('').trigger('change');
                  }

                  $ben.removeClass('hide-element');
                  $('body, html').animate({
                      scrollTop: ($ben.offset().top - stickyHeight) + 'px'
                  }, 500);
               }

               // Modify the codes below
               // to manipulate the form data

               // Store employment info data
               storeEmpInfo();
            } else {
               $('body, html').animate({
                  scrollTop: ($('#et-employment-info-section').offset().top - stickyHeight) + 'px'
               }, 0);
            }
      }).on('error.form.bv', function(e) {
         $('#et-employment-info-next').removeAttr('disabled');
         $('body, html').animate({
            scrollTop: ($('#et-employment-info-section').offset().top - stickyHeight) + 'px'
         }, 0);
      });

   } // END OF FORM VALIDATION FOR APPLICATION INFO AND EMPLOYMENT INFO

   /**
   * Form Validation utility functions
   */
   // Check if application info dob is not empty
   function isAppDobValid() {
      var $dob = $('#sales-illu-dob');

      if (!$dob.val() || ($dob.val() === 'DD-MM-YYYY ')) {
         $dob.siblings('.error-msg')
               .find('.help-block')
               .removeClass('hide-element');

         return false;
      }

      return true;
   }

   // Check if application info en fname is not empty
   function isAppEnFNameValid() {
      var $obj = $('#savieApplicantBean\\.firstName');

      if (!$obj.val() || ($obj.val() === 'Given Name ')) {
         $obj.next('.error-msg')
            .find('.help-block')
            .removeClass('hide-element');

         return false;
      }

      return true;
   }

   // Check if application info en lname is not empty
   function isAppEnLNameValid() {
      var $obj = $('#savieApplicantBean\\.lastName');

      if (!$obj.val() || ($obj.val() === 'Last Name ')) {
         $obj.next('.error-msg')
            .find('.help-block')
            .removeClass('hide-element');

         return false;
      }

      return true;
   }

   // Check if application info ch name is not empty
   function isAppChNameValid() {
      var $obj = $('#savieApplicantBean\\.chineseName');

      if (!$obj.val() || ($obj.val() === 'Name in Chinese ')) {
         $obj.next('.error-msg')
            .find('.help-block')
            .removeClass('hide-element');

         return true;
      }

      return false;
   }

   // Check custom application info validation
   function isAppFormValid() {
      if (isAppEnFNameValid()) {
         return true;
      } else if (isAppEnLNameValid()) {
         return true;
      } else if (isAppChNameValid()) {
         return true;
      } else if (isAppDobValid()) {
         return true;
      }

      return false;
   }

   // Dob change event
   $('#sales-illu-dob').on('change', function(e){
      var $self = $(this);

      if ($self.val()) {
         $self.next('.error-msg')
               .find('.help-block')
               .css('display', 'none');

         $('#et-personal-info-next').removeAttr('disabled');
      }
   });

   // Update employment info fields, if employment status = unemployed
   $('#savieEmploymentBean\\.employmentStatus').on('change', function(e) {
      var $self = $(this);
      var value = $self.val().slice(0,3);

      var status = $(this).val();
      $('#etEmploymentInfoForm').bootstrapValidator('resetForm',true);
      $(this).val(status);

      if (value === 'ES1' || value === 'ES2' || value === 'ES3') {
         $('.et-emp-info-sourceOfIncome-container').addClass('hidden');
         $('.et-emp-info-liq-assets-container').addClass('hidden');
         $('.et-emp-info-nat-business-container').removeClass('hidden');
         $('.et-emp-info-occupation-container').removeClass('hidden');
         $('.et-emp-info-employer-name-container').removeClass('hidden');
         $('.et-emp-info-mon-income-container').removeClass('hidden');
      }
      else {
         $('.et-emp-info-nat-business-container').addClass('hidden');
         $('.et-emp-info-occupation-container').addClass('hidden');
         $('.et-emp-info-employer-name-container').addClass('hidden');
         $('.et-emp-info-mon-income-container').addClass('hidden');
         $('.et-emp-info-sourceOfIncome-container').removeClass('hidden');
         $('.et-emp-info-liq-assets-container').removeClass('hidden');
      }

      $('#savieEmploymentBean\\.natureOfBusiness').prop('selectedIndex', 0).css('color', 'rgb(196, 195, 195)');
      $('#savieEmploymentBean\\.occupation').prop('selectedIndex', 0).css('color', 'rgb(196, 195, 195)');
      $('#savieEmploymentBean\\.liquidAssets').prop('selectedIndex', 0).css('color', 'rgb(196, 195, 195)');
      $('#savieEmploymentBean\\.currentEmployerName').val('');
      $('#savieEmploymentBean\\.monthlyPersonalIncome').prop('selectedIndex', 0).css('color', 'rgb(196, 195, 195)');
      $('#savieEmploymentBean\\.sourceOfIncome').prop('selectedIndex', 0).css('color', 'rgb(196, 195, 195)');
      $('#savieEmploymentBean\\.educationLevel').prop('selectedIndex', 0).css('color', 'rgb(196, 195, 195)');
      //$('#etEmploymentInfoForm').find('.error-msg .help-block').css('display', 'none');
   });

   // Determine if the previous question was answered
   function isMedicAnswered() {
      var result = true;

      $('.et-collapse').each(function() {
         if (!$(this).data('is-answered')) {
            result = false;

            return false;
         }
      });

      return result;
   }

   // Check if all medic questions are answered with no
   function isMedicAnsweredWithNo() {
      var result = true;

      $('.et-btn-medic-no').each(function() {
         if (!$(this).hasClass('btn-selected')) {
            result = false;

            return false;
         }
      });

      if (!$('#et-medi-question-4').prop('checked')) {
    	  return false;
      }

      return result;
   }

   function fnSetStyle(){
      if($('.datepicker.datepicker-dropdown').length){
         //datepicker exist

         var isVisible = $('.datepicker .datepicker-years table thead tr th:last-child').css("visibility");

         if(isVisible == "hidden"){
            //console.log('hidden');
            $('.datepicker .datepicker-years table thead tr th:last-child').removeAttr('style');
            $('.datepicker .datepicker-years table thead tr th:last-child').css(
            {"visibility":'visible !important',
            "cursor":"not-allowed"});
         }else{
            //console.log('vivible');
            $('.datepicker .datepicker-years table thead tr th:last-child').css(
            {"visibility":'visible !important',
            "cursor":"pointer"});
         }
      }else{
         //console.log('doesnot exist');
         //date picker does not exist
      }
   }

   // Utility function
   function permanentAddress(value, id, validator, idSecond) {
	   setTimeout(function(){
       	if((value!=$('#savieApplicantBean\\.'+id).attr('placeholder') && $('#savieApplicantBean\\.'+idSecond)!='') && value!='' && ($('#savieApplicantBean\\.'+validator).val()!='' || $('#savieApplicantBean\\.'+validator).attr('placeholder')!=$('#savieApplicantBean\\.'+validator).val())) {
       		$('#eliteTermsInsuredInfoForm')
            .data('bootstrapValidator')
            .updateStatus('savieApplicantBean.'+validator,'VALID');
       	}
       	else {
       		$('#eliteTermsInsuredInfoForm')
               .data('bootstrapValidator')
               .updateStatus('savieApplicantBean.'+validator,'INVALID','notEmpty');
       	}
   	}, 100);
   }
   function capitalizeFirstLetter(string) {
      return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
   }
   function formatToCapEachLetter(string) {
      if (!string) {
         return '';
      }

      var arr = string.split(' ');

      if (arr.length > 1) {

         for (var i=0; i<arr.length; i++) {
            arr[i] = capitalizeFirstLetter(arr[i]);
         }
         return arr.join(' ');
      } else {
         return capitalizeFirstLetter(arr[0]);
      }

   }

   function tooltipPlacement(context, source) {
      var $source = $(source);
      var position = $source.position();

      if ($source.hasClass('btn-app-info-tooltip')) {
         if ((position.top >= 39) && (position.left < 230)) {
            return 'top';
         } else if ((position.top <= 6) && (position.left > 380) && (position.left < 560) && (getWidth() < 992)) {
            return 'left';
         } else {
            return 'right';
         }
      } else if ($source.hasClass('btn-beneficiary-tooltip')) {
         if (position.left < 350 ) {
            return 'left';
         } else {
            return 'right';
         }
      }
   }

   /**
   * Check if beneficiary form is valid
   */
   function isBeneficaryValid() {
      var res1 = true;
      var res2 = true;
      var res3 = true;

      // Person 1
      if ($('#beneficiaryInfoForm\\[0\\]').length) {
    	  $('#beneficiaryInfoForm\\[0\\]').data('bootstrapValidator').validate();
         if ($('#beneficiaryInfoForm\\[0\\]').data('bootstrapValidator').isValid()) {
            res1 = true;
         } else {
            res1 = false;
            $('#beneficiaryInfoForm\\[0\\]').data('bootstrapValidator').validate();
         }
      }

      // Person 2
      if ($('#beneficiaryInfoForm\\[1\\]').length) {
    	  $('#beneficiaryInfoForm\\[1\\]').data('bootstrapValidator').validate();
         if (isBeneficiaryFormClear(1) || $('#beneficiaryInfoForm\\[1\\]').data('bootstrapValidator').isValid()) {
            res2 = true;
         } else {
            res2 = false;
            $('#beneficiaryInfoForm\\[1\\]').data('bootstrapValidator').validate();
         }
      }

      // Person 3
      if ($('#beneficiaryInfoForm\\[2\\]').length) {
    	  $('#beneficiaryInfoForm\\[2\\]').data('bootstrapValidator').validate();
         if (isBeneficiaryFormClear(2) || $('#beneficiaryInfoForm\\[2\\]').data('bootstrapValidator').isValid()) {
            res3 = true;
         } else {
            res3 = false;
            $('#beneficiaryInfoForm\\[2\\]').data('bootstrapValidator').validate();
         }
      }

      return res1 && res2 && res3;
   }
   function isBeneficiaryFormClear(pos) {
      var $form = $('#beneficiaryInfoForm\\[' + pos +'\\]');

      if (!$('#savieBeneficiaryBean\\[' + pos + '\\]\\.firstName').val()
            && !$('#savieBeneficiaryBean\\[' + pos + '\\]\\.lastName').val()
            && !$('#savieBeneficiaryBean\\[' + pos +'\\]\\.chineseName').val()
            && (!$('#savieBeneficiaryBean\\[' + pos + '\\]\\.hkId').val() || !$('#savieBeneficiaryBean\\[' + pos + '\\]\\.passportNo').val())
            && ((pos === 0) || !$('#savieBeneficiaryBean\\[' + pos + '\\]\\.entitlement').val())
            && !$('#savieBeneficiaryBean\\[' + pos + '\\]\\.relationship').val()
         ) {
    	  $('#beneficiaryInfoForm\\[' + pos +'\\]').find('#remove-beneficiary\\[' + pos +'\\]').trigger('click');
         return true;
      }

      return false;
   }

   /**
   * Populate the application summary with filled in data
   */
   function populateAppSummPD() {
      //$('#etaspd-insured-amount').text('HK$ ' + planDetailData.insuranceAmount);
   }
   function populateAppSummPI() {
      $('#etaspi-en-lname').text(appInfoData.enLName);
      $('#etaspi-fname').text(appInfoData.enFName);
      $('#etaspi-chName').text(appInfoData.chName);
      $('#etaspi-gender').text(appInfoData.gender);
      $('#etaspi-is-smooker').text(planDetailData.isSmooker ? getBundle(getBundleLanguage, "option.yes") : getBundle(getBundleLanguage, "option.no"));
      $('#etaspi-marital-status').text(capitalizeFirstLetter(appInfoData.maritalStat));
      $('#etaspi-dob').text(appInfoData.dob);
      $('#etaspi-pob').text(appInfoData.pob);
      $('#etaspi-nationality').text(appInfoData.nationality);
      $('#etaspi-email').text(appInfoData.email);

      /* var _tempTelSuffix = '';
      if (appInfoData.resTelNoSuffix.length > 4) {
         _tempTelSuffix = appInfoData.resTelNoSuffix.slice(0, 4) + '-' + appInfoData.resTelNoSuffix.slice(4);
      } else {
         _tempTelSuffix = appInfoData.resTelNoSuffix;
      }
      $('#etaspi-tel-no').text('+' + appInfoData.resTelNoPrefix + ' ' + _tempTelSuffix);    */
      $('#etaspi-tel-no').text(appInfoData.resTelNo);

      /* var _tempMobSuffix = '';
      if (appInfoData.resTelNoSuffix.length > 4) {
         _tempMobSuffix = appInfoData.mobNoSuffix.slice(0, 4) + '-' + appInfoData.mobNoSuffix.slice(4);
      } else {
         _tempMobSuffix = appInfoData.resTelNoSuffix;
      }
      $('#etaspi-mob-no').text('+' + appInfoData.mobNoPrefix + ' ' + _tempMobSuffix);   */
      $('#etaspi-mob-no').text(appInfoData.mobNo);
      // 2016memberID
    //   $('#etaspi-clubmember-id').text(appInfoData.clubMemberId);
      var perAddArr = [];
      if (appInfoData.perAddL1 && appInfoData.perAddL1!=$('#savieApplicantBean\\.permanentAddress1').attr('placeholder')) {
         perAddArr.push(appInfoData.perAddL1);
      }
      if (appInfoData.perAddL2 && appInfoData.perAddL2!=$('#savieApplicantBean\\.permanentAddress2').attr('placeholder')) {
         perAddArr.push(appInfoData.perAddL2);
      }
      if (appInfoData.perAddL3 && appInfoData.perAddL3!=$('#savieApplicantBean\\.permanentAddress3').attr('placeholder')) {
         perAddArr.push(appInfoData.perAddL3);
      }
      (appInfoData.perAdd) ? perAddArr.push(appInfoData.perAdd) : '';
      // perAddArr.push(appInfoData.perAddCountry);
      $('#etaspi-per-add').text(perAddArr.join(', '));

      //if ($('#savieApplicantBean\\.isResidential').prop('checked')) {
         //$('#etaspi-res-add').removeClass('hide-element');

         var resAddArr = [];
         if (appInfoData.resAddL1 && appInfoData.resAddL1!=$('#savieApplicantBean\\.residentialAdress1').attr('placeholder')) {
            resAddArr.push(appInfoData.resAddL1);
         }
         if (appInfoData.resAddL2 && appInfoData.resAddL2!=$('#savieApplicantBean\\.residentialAdress2').attr('placeholder')) {
            resAddArr.push(appInfoData.resAddL2);
         }
         if (appInfoData.resAddL3 && appInfoData.resAddL3!=$('#savieApplicantBean\\.residentialAdress3').attr('placeholder')) {
            resAddArr.push(appInfoData.resAddL3);
         }
         (appInfoData.resAdd) ? resAddArr.push(appInfoData.resAdd) : '';
         // resAddArr.push(appInfoData.resAddCountry);
         $('#etaspi-res-add').text(resAddArr.join(', '));
      //} else {
         //$('#etaspi-res-add').addClass('hide-element');
      //}

      //if ($('#savieApplicantBean\\.addressIsSame').prop('checked')) {
         //$('#etaspi-corr-add').removeClass('hide-element');

         var corrAddArr = [];
         if (appInfoData.corrAddL1 && appInfoData.corrAddL1!=$('#savieApplicantBean\\.correspondenceAdress1').attr('placeholder')) {
            corrAddArr.push(appInfoData.corrAddL1);
         }
         if (appInfoData.corrAddL2 && appInfoData.corrAddL2!=$('#savieApplicantBean\\.correspondenceAdress2').attr('placeholder')) {
            corrAddArr.push(appInfoData.corrAddL2);
         }
         if (appInfoData.corrAddL3 && appInfoData.corrAddL3!=$('#savieApplicantBean\\.correspondenceAdress3').attr('placeholder')) {
            corrAddArr.push(appInfoData.corrAddL3);
         }
         (appInfoData.corrAddL) ? corrAddArr.push(appInfoData.corrAddL) : '';
         // corrAddArr.push(appInfoData.corrAddCountry);
         $('#etaspi-corr-add').text(corrAddArr.join(', '));
      //} else {
         //$('#etaspi-corr-add').addClass('hide-element');
      //}

   }
   function populateAppSummEI() {
	  var self = $('#savieEmploymentBean\\.employmentStatus');
	  var value = self.val().slice(0,3);
      if (value === 'ES4' || value === 'ES5' || value === 'ES6' || value === 'ES7') {
         $('.et-stat-unemployed').removeClass('hide-element');
         $('.et-not-stat-unemployed').addClass('hide-element');
         $('#etasei-liq-asset').text(empEduInfoData.liqAsset);
         $('#etasei-source-income').text(empEduInfoData.sourceIncome);
      } else {
         $('.et-not-stat-unemployed').removeClass('hide-element');
         $('.et-stat-unemployed').addClass('hide-element');
         $('#etasei-occupation').text(formatToCapEachLetter(empEduInfoData.occupation));
         $('#etasei-nat-business').text(formatToCapEachLetter(empEduInfoData.natBusiness));
         $('#etasei-mon-income').text(formatToCapEachLetter(empEduInfoData.monIncome));
      }

      $('#etasei-emp-status').text(formatToCapEachLetter(empEduInfoData.status));
      $('#etasei-edu-level').text(formatToCapEachLetter(empEduInfoData.eduLevel));
      $('#etasei-employer-name').text(formatToCapEachLetter(empEduInfoData.empName));
   }
   function populateAppSummBI() {
      // ???
      if ($('#own-estate-now').prop('checked')){
    	   $('.et-own-estate').removeClass('hide-element');
      } else {
    	   $('.et-own-estate').addClass('hide-element');
      }

      if ($('#name-others-now').prop('checked')) {
         // person 1
         if (beneInfoData.first && beneInfoData.first.saved) {
            $('.et-person-1').removeClass('hide-element');

            $('#etasbi-en-fname-1').text( beneInfoData.first.enFName ? beneInfoData.first.enFName : '' );
            $('#etasbi-en-lname-1').text( beneInfoData.first.enLName ? beneInfoData.first.enLName : '' );
            $('#etasbi-ch-name-1').text( beneInfoData.first.chName ? beneInfoData.first.chName : '' );
            var hkidPassValue = beneInfoData.first.hkid ? beneInfoData.first.hkid : beneInfoData.first.passNo;
            $('#etasbi-hkid-pass-1').text( (beneInfoData.first.hkid || beneInfoData.first.passNo) ? hkidPassValue.toUpperCase() : '' );
            $('#etasbi-relationship-1').text( beneInfoData.first.relationship ? capitalizeFirstLetter(beneInfoData.first.relationship) : '' );
            $('#etasbi-gender-1').text( beneInfoData.first.gender ? beneInfoData.first.gender : '' );
            $('#etasbi-entitlement-1').text( beneInfoData.first.entitlement ? beneInfoData.first.entitlement + '%' : '' );

         } else {
            $('.et-person-1').addClass('hide-element');
         }

         // person 2
         if (beneInfoData.second && beneInfoData.second.saved) {
            $('.et-person-2').removeClass('hide-element');

            $('#etasbi-en-fname-2').text( beneInfoData.second.enFName ? beneInfoData.second.enFName : '' );
            $('#etasbi-en-lname-2').text( beneInfoData.second.enLName ? beneInfoData.second.enLName : '' );
            $('#etasbi-ch-name-2').text( beneInfoData.second.chName ? beneInfoData.second.chName : '' );
            var hkidPassValue = beneInfoData.second.hkid ? beneInfoData.second.hkid : beneInfoData.second.passNo;
            $('#etasbi-hkid-pass-2').text( (beneInfoData.second.hkid || beneInfoData.second.passNo) ? hkidPassValue.toUpperCase() : '' );
            $('#etasbi-relationship-2').text( beneInfoData.second.relationship ? capitalizeFirstLetter(beneInfoData.second.relationship) : '' );
            $('#etasbi-gender-2').text( beneInfoData.second.gender ? beneInfoData.second.gender : '' );
            $('#etasbi-entitlement-2').text( beneInfoData.second.entitlement ? beneInfoData.second.entitlement + '%' : '' );

         } else {
            $('.et-person-2').addClass('hide-element');
         }

         // person 3
         if (beneInfoData.third && beneInfoData.third.saved) {
            $('.et-person-3').removeClass('hide-element');

            $('#etasbi-en-fname-3').text( beneInfoData.third.enFName ? beneInfoData.third.enFName : '' );
            $('#etasbi-en-lname-3').text( beneInfoData.third.enLName ? beneInfoData.third.enLName : '' );
            $('#etasbi-ch-name-3').text( beneInfoData.third.chName ? beneInfoData.third.chName : '' );
            var hkidPassValue = beneInfoData.third.hkid ? beneInfoData.third.hkid : beneInfoData.third.passNo;
            $('#etasbi-hkid-pass-3').text( (beneInfoData.third.hkid || beneInfoData.third.passNo) ? hkidPassValue.toUpperCase() : '' );
            $('#etasbi-relationship-3').text( beneInfoData.third.relationship ? capitalizeFirstLetter(beneInfoData.third.relationship) : '' );
            $('#etasbi-gender-3').text( beneInfoData.third.gender ? beneInfoData.third.gender : '' );
            $('#etasbi-entitlement-3').text( beneInfoData.third.entitlement ? beneInfoData.third.entitlement + '%' : '' );

         } else {
            $('.et-person-3').addClass('hide-element');
         }
      } else {
    	  $('.et-person-1').addClass('hide-element');
    	  $('.et-person-2').addClass('hide-element');
    	  $('.et-person-3').addClass('hide-element');
      }
   }

   /**
   * Save all data from application field
   */
   function storeAppInfo() {
      appInfoData.enFName = $('#savieApplicantBean\\.firstName').val();
      appInfoData.enLName = $('#savieApplicantBean\\.lastName').val();
      appInfoData.chName = $('#savieApplicantBean\\.chineseName').val();
      appInfoData.dob = $('#sales-illu-dob').val();
      appInfoData.clubMemberId = $('#theClubMembershipNo').val();

      if ($('#et-gender-male').prop('checked')) {
          planDetailData.gender = getBundle(getBundleLanguage, "option.male");
       } else if ($('#et-gender-female').prop('checked')) {
          planDetailData.gender = getBundle(getBundleLanguage, "option.female");
       }

      //smoker non-smoker
      if ($('#et-smoker-yes').prop('checked')) {
         planDetailData.isSmooker = true;
      } else if ($('#et-smoker-no').prop('checked')) {
         planDetailData.isSmooker = false;
      }

      appInfoData.gender = planDetailData.gender;
      appInfoData.maritalStat = $('option[value="' + $('#savieApplicantBean\\.maritalStatus').val() + '"]', '#savieApplicantBean\\.maritalStatus').text();
      appInfoData.pob = $('option[value="' + $('#savieApplicantBean\\.placeOfBirth').val() + '"]', '#savieApplicantBean\\.placeOfBirth').text();
      appInfoData.nationality = $('option[value="' + $('#savieApplicantBean\\.nationality').val() + '"]', '#savieApplicantBean\\.nationality').text();
      appInfoData.resTelNo = $('#savieApplicantBean\\.residentialTelNo').val();
      appInfoData.mobNo = $('#savieApplicantBean\\.mobileNo').val();
      appInfoData.email = $('#savieApplicantBean\\.emailAddress').val();
      appInfoData.perAddL1 = $('#savieApplicantBean\\.permanentAddress1').val();
      appInfoData.perAddL2 = $('#savieApplicantBean\\.permanentAddress2').val();
      appInfoData.perAddL3 = $('#savieApplicantBean\\.permanentAddress3').val();
      appInfoData.perAdd = $('option[value="' + $('#savieApplicantBean\\.permanentAddress').val() + '"]', '#savieApplicantBean\\.permanentAddress').text();
      //appInfoData.perAddCountry = $('#savieApplicantBean\\.permanentAddressCountry').val();

      // For the residential address
      if ($('#savieApplicantBean\\.isResidential').prop('checked')) {
         appInfoData.resAddL1 = $('#savieApplicantBean\\.residentialAdress1').val();
         appInfoData.resAddL2 = $('#savieApplicantBean\\.residentialAdress2').val();
         appInfoData.resAddL3 = $('#savieApplicantBean\\.residentialAdress3').val();
         appInfoData.resAdd = $('option[value="' + $('#savieApplicantBean\\.residentialDistrict').val() + '"]', '#savieApplicantBean\\.residentialDistrict').text();
         //appInfoData.resAddCountry = $('#savieApplicantBean\\.residentialDistrictCountry').val();
      } else {
         appInfoData.resAddL1 = appInfoData.perAddL1;
         appInfoData.resAddL2 = appInfoData.perAddL2;
         appInfoData.resAddL3 = appInfoData.perAddL3;
         appInfoData.resAdd = appInfoData.perAdd;
      }

      // For the correspondence address
      if ($('#savieApplicantBean\\.addressIsSame').prop('checked')) {
         appInfoData.corrAddL1 = $('#savieApplicantBean\\.correspondenceAdress1').val();
         appInfoData.corrAddL2 = $('#savieApplicantBean\\.correspondenceAdress2').val();
         appInfoData.corrAddL3 = $('#savieApplicantBean\\.correspondenceAdress3').val();
         appInfoData.corrAddL = $('option[value="' + $('#savieApplicantBean\\.correspondenceDistrict').val() + '"]', '#savieApplicantBean\\.correspondenceDistrict').text();
         //appInfoData.corrAddCountry = $('#savieApplicantBean.correspondenceDistrictCountry').val();
      } else {
         appInfoData.corrAddL1 = appInfoData.resAddL1;
         appInfoData.corrAddL2 = appInfoData.resAddL2;
         appInfoData.corrAddL3 = appInfoData.resAddL3;
         appInfoData.corrAddL = appInfoData.resAdd;
      }
   }
   function isPerLineValid() {
      var l1 = $('#savieApplicantBean\\.permanentAddress1').val();
      var l2 = $('#savieApplicantBean\\.permanentAddress2').val();
      var l3 = $('#savieApplicantBean\\.permanentAddress3').val();

      return (l1 || l2 || l3)!='';
   }
   function isResLineValid() {
      if ($('#savieApplicantBean\\.isResidential').prop('checked')) {
         var l1 = $('#savieApplicantBean\\.residentialAdress1').val();
         var l2 = $('#savieApplicantBean\\.residentialAdress2').val();
         var l3 = $('#savieApplicantBean\\.residentialAdress3').val();

         return (l1 || l2 || l3)!='';
      }
      return true;
   }

   function isCorrLineValid() {
      if ($('#savieApplicantBean\\.addressIsSame').prop('checked')) {
         var l1 = $('#savieApplicantBean\\.correspondenceAdress1').val();
         var l2 = $('#savieApplicantBean\\.correspondenceAdress2').val();
         var l3 = $('#savieApplicantBean\\.correspondenceAdress3').val();

         return (l1 || l2 || l3)!='';
      }

      return true;
   }


   /**
   * Save all data from employee fields
   */
   function storeEmpInfo() {




	   empEduInfoData.status = $('#savieEmploymentBean\\.employmentStatus').val().split("-")[1];
	   empEduInfoData.occupation = $('option[value="' + $('#savieEmploymentBean\\.occupation').val() + '"]', '#savieEmploymentBean\\.occupation').text();

       empEduInfoData.eduLevel = $('#savieEmploymentBean\\.educationLevel').val().split("-")[1];
       empEduInfoData.natBusiness = $('#savieEmploymentBean\\.natureOfBusiness').val().split("-")[1];
       empEduInfoData.monIncome = $('#savieEmploymentBean\\.monthlyPersonalIncome').val().split("-")[1];
       empEduInfoData.liqAsset = $('option[value="' + $('#savieEmploymentBean\\.liquidAssets').val() + '"]', '#savieEmploymentBean\\.liquidAssets').text();
       empEduInfoData.empName = $('#savieEmploymentBean\\.currentEmployerName').val();
       empEduInfoData.sourceIncome = $('option[value="' + $('#savieEmploymentBean\\.sourceOfIncome').val() + '"]', '#savieEmploymentBean\\.sourceOfIncome').text();
   }

   /**
   * Save all data from beneficiaries fields
   */
   function storeBeneficiaryInfo() {
      if ($('#own-estate-now').prop('checked')) {
      }
      if ($('#name-others-now').prop('checked')) {
         // Person 1
         beneInfoData.first = {};

         beneInfoData.first.enFName = $('#savieBeneficiaryBean\\[0\\]\\.firstName').val();
         beneInfoData.first.enLName = $('#savieBeneficiaryBean\\[0\\]\\.lastName').val();
         beneInfoData.first.chName = $('#savieBeneficiaryBean\\[0\\]\\.chineseName').val();

         var benHKIDPASS = $('#beneficiaryHkidPassport\\[0\\]').val();

         if ((benHKIDPASS.toLowerCase().indexOf('hkid') > -1)) {
            beneInfoData.first.hkid = $('#savieBeneficiaryBean\\[0\\]\\.hkId').val();
         } else if ((benHKIDPASS.toLowerCase().indexOf('passport') > -1)) {
            beneInfoData.first.passNo = $('#savieBeneficiaryBean\\[0\\]\\.passportNo').val();
         }

         if ($('#male-0').prop('checked')) {
            beneInfoData.first.gender = getBundle(getBundleLanguage, "option.male");
         } else if ($('#female-0').prop('checked')) {
            beneInfoData.first.gender = getBundle(getBundleLanguage, "option.female");
         }

         beneInfoData.first.relationship = $('option[value="' + $('#savieBeneficiaryBean\\[0\\]\\.relationship').val() + '"]', '#savieBeneficiaryBean\\[0\\]\\.relationship').text();
         beneInfoData.first.entitlement = $('#savieBeneficiaryBean\\[0\\]\\.entitlement').val();

         if (beneInfoData.first.enFName) {
            beneInfoData.first.saved = true;
         }

         // Person 2
         if ($('#beneficiaryInfoForm\\[1\\]').length>0 && !$('#beneficiaryInfoForm\\[1\\]').hasClass('hidden')) {
            beneInfoData.second = {};

            beneInfoData.second.enFName = $('#savieBeneficiaryBean\\[1\\]\\.firstName').val();
            beneInfoData.second.enLName = $('#savieBeneficiaryBean\\[1\\]\\.lastName').val();
            beneInfoData.second.chName = $('#savieBeneficiaryBean\\[1\\]\\.chineseName').val();

            var benHKIDPASS = $('#beneficiaryHkidPassport\\[1\\]').val();

            if ((benHKIDPASS.toLowerCase().indexOf('hkid') > -1)) {
               beneInfoData.second.hkid = $('#savieBeneficiaryBean\\[1\\]\\.hkId').val();
            } else if ((benHKIDPASS.toLowerCase().indexOf('passport') > -1)) {
               beneInfoData.second.passNo = $('#savieBeneficiaryBean\\[1\\]\\.passportNo').val();
            }

            if ($('#male-1').prop('checked')) {
               beneInfoData.second.gender = getBundle(getBundleLanguage, "option.male");
            } else if ($('#female-1').prop('checked')) {
               beneInfoData.second.gender = getBundle(getBundleLanguage, "option.female");
            }

            beneInfoData.second.relationship = $('option[value="' + $('#savieBeneficiaryBean\\[1\\]\\.relationship').val() + '"]', '#savieBeneficiaryBean\\[1\\]\\.relationship').text();
            beneInfoData.second.entitlement = $('#savieBeneficiaryBean\\[1\\]\\.entitlement').val();

            if (beneInfoData.second.enFName) {
               beneInfoData.second.saved = true;
            }
         } else {
        	 beneInfoData.second = null;
         }
         // Person 3
         if ($('#beneficiaryInfoForm\\[2\\]').length>0 && !$('#beneficiaryInfoForm\\[2\\]').hasClass('hidden')) {
            beneInfoData.third = {};

            beneInfoData.third.enFName = $('#savieBeneficiaryBean\\[2\\]\\.firstName').val();
            beneInfoData.third.enLName = $('#savieBeneficiaryBean\\[2\\]\\.lastName').val();
            beneInfoData.third.chName = $('#savieBeneficiaryBean\\[2\\]\\.chineseName').val();

            var benHKIDPASS = $('#beneficiaryHkidPassport\\[2\\]').val();

            if ((benHKIDPASS.toLowerCase().indexOf('hkid') > -1)) {
               beneInfoData.third.hkid = $('#savieBeneficiaryBean\\[2\\]\\.hkId').val();
            } else if ((benHKIDPASS.toLowerCase().indexOf('passport') > -1)) {
               beneInfoData.third.passNo = $('#savieBeneficiaryBean\\[2\\]\\.passportNo').val();
            }

            if ($('#male-2').prop('checked')) {
               beneInfoData.third.gender = getBundle(getBundleLanguage, "option.male");
            } else if ($('#female-2').prop('checked')) {
               beneInfoData.third.gender = getBundle(getBundleLanguage, "option.female");
            }

            beneInfoData.third.relationship = $('option[value="' + $('#savieBeneficiaryBean\\[2\\]\\.relationship').val() + '"]', '#savieBeneficiaryBean\\[2\\]\\.relationship').text();
            beneInfoData.third.entitlement = $('#savieBeneficiaryBean\\[2\\]\\.entitlement').val();

            if (beneInfoData.third.enFName) {
               beneInfoData.third.saved = true;
            }
         } else {
        	 beneInfoData.third = null;
         }
      }
   }

   // Policy fake radio button scripts
   $(document).on('change', '.yes-policy-replace-check input[type="checkbox"]', function(e) {
	   e.preventDefault();
	   if($(this).prop('checked')) {
		   $(this).parent().parent().find('.yes-policy-replace-desc .note').show();
		   $(this).closest('.policy-replace-wrap').find('.policy-replace-check input[type="checkbox"]').prop('checked', false);
	   } else {
		   $(this).prop('checked', true);
	   }
   });
   $(document).on('change', '.policy-replace-check input[type="checkbox"]', function(e) {
	   e.preventDefault();
	   if($(this).prop('checked')) {
		   $(this).closest('.policy-replace-wrap').find('.yes-policy-replace-desc .note').hide();
		   $(this).closest('.policy-replace-wrap').find('.yes-policy-replace-check input[type="checkbox"]').prop('checked', false);
	   } else {
		   $(this).prop('checked', true);
	   }
   });

   function putEtPageKeySession(pageKey) {
	// 	$.ajax({
	//         type: "POST",
	//         url:contextPath+'/ajax/eliteTerm/putEtPageKeySession',
	//         data: { "etPageKey":pageKey },
	//         success:function(data){}
	// 	});
	}
