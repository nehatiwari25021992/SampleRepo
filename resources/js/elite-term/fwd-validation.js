var beneficiarySelection1 = $( "#beneficiaryHkidPassport\\[0\\] option:selected" ).text();

$(function() {
	//Header Orange Top Menu
	//by: RMN
	
	//Payment
	$('#payment-header-btn').click(function(){
		$('html, body').animate({
			scrollTop: $('#payment').offset().top -  ($('.navbar-fixed-top').height() + $('.application-page-header').height())
		}, 1000);
	});
	
	//Beneficiary 
	$('#beneficiary-header-btn').click(function(){
		$('html, body').animate({
			scrollTop: $('#beneficiary-info').offset().top - ($('.navbar-fixed-top').height() + $('.application-page-header').height())
		}, 1000);
	});
	
	//Employment
	$('#employment-header-btn').click(function(){
		$('html, body').animate({
			scrollTop: $('#employment-info').offset().top - ($('.navbar-fixed-top').height() + $('.application-page-header').height())
		}, 1000);
	});
	
	//Applicant
	$('#applicant-header-btn').click(function(){
		$('html, body').animate({
			scrollTop: $('#personal-info').offset().top - ($('.navbar-fixed-top').height() + $('.application-page-header').height())
		}, 1000);
	});
	
	
	//Date Picker for Application Page
	//by: RMN
	// 18 year ago date
	var dob_end_date = new Date();
	dob_end_date.setFullYear(dob_end_date.getFullYear()-18);
	
	// 86 year ago date
	var dob_start_date = new Date();
	dob_start_date.setFullYear(dob_start_date.getFullYear()-86);
	dob_start_date.setDate(dob_start_date.getDate()+1);
	
	
	if($("#personal-info-datePicker").length > 0) {
		$('#personal-info-datePicker').datepicker({
			startView: "decade",
			startDate: dob_start_date,
			endDate: dob_end_date,
			autoclose: true,
		});
	}
	
	
	$('#checkHKValidID').click(function(){
		var hkid=$('#sampleValidHKID').val();	
		console.log('Answer:'+IsHKID(hkid));

	});
	
	$("#savieApplicantBean\\.addressIsSame").change(function() {
		
		$('#eliteTermsInsuredInfoForm').data('bootstrapValidator').updateStatus('savieApplicantBean.correspondenceAdress1', 'NOT_VALIDATE');
		$('#eliteTermsInsuredInfoForm').data('bootstrapValidator').updateStatus('savieApplicantBean.correspondenceAdress2', 'NOT_VALIDATE');
		$('#eliteTermsInsuredInfoForm').data('bootstrapValidator').updateStatus('savieApplicantBean.correspondenceAdress3', 'NOT_VALIDATE');
		$('#eliteTermsInsuredInfoForm').data('bootstrapValidator').updateStatus('savieApplicantBean.correspondenceDistrict', 'NOT_VALIDATE');
	

		if(this.checked) {
			//console.log('Check');
			if($('#correspondence-address').hasClass('hidden')){
				$('#correspondence-address').removeClass('hidden');
			}
			
			$('#personal-info-next').addClass('correspondence');
		}
		else{
			$('#correspondence-address').addClass('hidden');
			
			if($('#personal-info-next').hasClass('correspondence')){
				$('#personal-info-next').removeClass('correspondence');
			}
			
			$('#savieApplicantBean\\.correspondenceAdress1').val('');
			$('#savieApplicantBean\\.correspondenceAdress2').val('');
			$('#savieApplicantBean\\.correspondenceAdress3').val('');
			$('#savieApplicantBean\\.correspondenceDistrict').val('');
		}

		//$('#correspondence-address').find('.error-msg .help-block').css('display', 'none');
	});
	
    $("#savieApplicantBean\\.isResidential").change(function() {

    	$('#eliteTermsInsuredInfoForm').data('bootstrapValidator').updateStatus('savieApplicantBean.residentialAdress1', 'NOT_VALIDATE');
		$('#eliteTermsInsuredInfoForm').data('bootstrapValidator').updateStatus('savieApplicantBean.residentialAdress2', 'NOT_VALIDATE');
		$('#eliteTermsInsuredInfoForm').data('bootstrapValidator').updateStatus('savieApplicantBean.residentialAdress3', 'NOT_VALIDATE');
		$('#eliteTermsInsuredInfoForm').data('bootstrapValidator').updateStatus('savieApplicantBean.residentialDistrict', 'NOT_VALIDATE');
	
		if(this.checked) {
			//console.log('Check');
			if($('#residential-address').hasClass('hidden')){
				$('#residential-address').removeClass('hidden');
			}

			$('#personal-info-next').addClass('residential');
		}
		else{
			$('#residential-address').addClass('hidden');
			
			if($('#personal-info-next').hasClass('residential')){
				$('#personal-info-next').removeClass('residential');
			}
			
			$('#savieApplicantBean\\.residentialAdress1').val('');
			$('#savieApplicantBean\\.residentialAdress2').val('');
			$('#savieApplicantBean\\.residentialAdress3').val('');
			$('#savieApplicantBean\\.residentialDistrict').val('');
		}

		//$('#residential-address').find('.error-msg .help-block').css('display', 'none');
	});
    
	//hide or show HKID / Passport text box on dropdown change for Form 1
	
	$( "#beneficiaryHkidPassport\\[0\\]" ).on('change', function() {
		var str = "";
		$( "#beneficiaryHkidPassport\\[0\\] option:selected" ).each(function() {
			
			str = $( this ).val();
			if(str == 'HKID'){
				//textbox
				$('#savieBeneficiaryBean\\[0\\]\\.passportNo').addClass('hidden');
				if($('#savieBeneficiaryBean\\[0\\]\\.hkId').hasClass('hidden')){
					$('#savieBeneficiaryBean\\[0\\]\\.hkId').removeClass('hidden');
				}
				
				
				if($('#hkidOrPassportMessage\\[0\\]').hasClass('hidden')){
					$('#hkidOrPassportMessage\\[0\\]').removeClass('hidden');
				}
				
				$('#bnfPassportMessage\\[0\\]').addClass('hidden');
				$('#duplicate-beneficiariesPAssport\\[0\\]').addClass('hidden');
				

			}else{
				//textbox
				$('#savieBeneficiaryBean\\[0\\]\\.hkId').addClass('hidden');
				if($('#savieBeneficiaryBean\\[0\\]\\.passportNo').hasClass('hidden')){
					$('#savieBeneficiaryBean\\[0\\]\\.passportNo').removeClass('hidden');
				}
				
				if($('#bnfPassportMessage\\[0\\]').hasClass('hidden')){
					$('#bnfPassportMessage\\[0\\]').removeClass('hidden');
				}
				
				$('#hkidOrPassportMessage\\[0\\]').addClass('hidden');
				$('#duplicate-beneficiaries\\[0\\]').addClass('hidden');
			}
			
			
		});
		
	}).change();
	
	$('#et-beneficiary-info-next').click(function(){
		var bootstrapValidator1 = $('#beneficiaryInfoForm\\[0\\]').data('bootstrapValidator');
		bootstrapValidator1.enableFieldValidators('savieBeneficiaryBean[0].passportNo',true, $(this).val() == 'Passport');
		bootstrapValidator1.enableFieldValidators('savieBeneficiaryBean[0].hkId',true, $(this).val() == 'HKID');
		
		
		$('#beneficiaryInfoForm\\[0\\]').submit();
		
		if(isBeneficiaryPerson2Hidden() != "hidden"){
			var bootstrapValidator2 = $('#beneficiaryInfoForm\\[1\\]').data('bootstrapValidator');
			bootstrapValidator2.enableFieldValidators('savieBeneficiaryBean[1].passportNo',true, $(this).val() == 'Passport');
			bootstrapValidator2.enableFieldValidators('savieBeneficiaryBean[1].hkId',true, $(this).val() == 'HKID');
			$('#beneficiaryInfoForm\\[1\\]').submit();
			
		}
	
		if(isBeneficiaryPerson3Hidden() != "hidden"){
			var bootstrapValidator3 = $('#beneficiaryInfoForm\\[2\\]').data('bootstrapValidator');
			bootstrapValidator3.enableFieldValidators('savieBeneficiaryBean[2].passportNo',true, $(this).val() == 'Passport');
			bootstrapValidator3.enableFieldValidators('savieBeneficiaryBean[2].hkId',true, $(this).val() == 'HKID');
			$('#beneficiaryInfoForm\\[2\\]').submit();
		}
		
		
		if(  (($('#beneficiaryInfoForm\\[1\\] div').hasClass('has-error')) && (isBeneficiaryPerson2Hidden()!="hidden"))	||
			 (($('#beneficiaryInfoForm\\[0\\] div').hasClass('has-error'))) ||
			 (($('#beneficiaryInfoForm\\[2\\] div').hasClass('has-error')) && (isBeneficiaryPerson3Hidden()!="hidden"))  ){
			//has error do nothing
			console.log('Form has error');
		}else{
			console.log('Form 1 has no error');
			$('html, body').animate({
				scrollTop: $('#payment').offset().top - $('.navbar-fixed-top').height()
			}, 1000);
		}
		
		if($('#own-estate-now').is(':checked')) {
			$('html, body').animate({
				scrollTop: $('#payment').offset().top - $('.navbar-fixed-top').height()
			}, 1000);
		}else{
			//do nothing
		}
		

		//check for Duplicate HKID in Beneficiaries 
		applicantDuplicateBeneficiaries();
		
		//check for Duplicate Passport in Beneficiaries
		applicantDuplicateBeneficiariesPassport();
		
		//check for Beneficiaries Duplicate Chinese Name
		applicantDuplicateBeneficicaryChineseName();
		
		//check for Beneficiaries English Name
		applicantDuplicateBeneficiaryEnglishName();
		
	});
	
	function totalBeneficiaryEntitlement(){
		var doesExceed ='';
		var beneficiaryEntitlement1 =  $('#savieBeneficiaryBean\\[0\\]\\.entitlement').val() != ""  ? $('#savieBeneficiaryBean\\[0\\]\\.entitlement').val(): '0';
		var beneficiaryEntitlement2 =  (($('#savieBeneficiaryBean\\[1\\]\\.entitlement').val() != "") && 
										(typeof $('#savieBeneficiaryBean\\[1\\]\\.entitlement').val()!='undefined')) ? $('#savieBeneficiaryBean\\[1\\]\\.entitlement').val(): '0';
		var beneficiaryEntitlement3 =  (($('#savieBeneficiaryBean\\[2\\]\\.entitlement').val() != "") &&
										(typeof $('#savieBeneficiaryBean\\[2\\]\\.entitlement').val()!='undefined')) ? $('#savieBeneficiaryBean\\[2\\]\\.entitlement').val(): '0';
		
		var beneficiaryEntitlementSum = parseInt(beneficiaryEntitlement1) + parseInt(beneficiaryEntitlement2) + parseInt(beneficiaryEntitlement3);
		
		if(beneficiaryEntitlementSum>100 || beneficiaryEntitlementSum<100){
			doesExceed = "Exceed";
		}else{
			doesExceed = "Does not exceed";
		}
		return doesExceed;
	}

	//Validate Form On Button 2 Click
	$("#add-beneficiary-button-3").click(function(){
		$( "#beneficiaryHkidPassport\\[2\\]" ).on('change', function() {
			var str = "";
			$( "#beneficiaryHkidPassport\\[2\\] option:selected" ).each(function() {
				str = $( this ).val();
				if(str == 'HKID'){
					//textbox
					$('#savieBeneficiaryBean\\[2\\]\\.passportNo').addClass('hidden');
					if($('#savieBeneficiaryBean\\[2\\]\\.hkId').hasClass('hidden')){
						$('#savieBeneficiaryBean\\[2\\]\\.hkId').removeClass('hidden');
					}
					if($('#hkidOrPassportMessage\\[2\\]').hasClass('hidden')){
						$('#hkidOrPassportMessage\\[2\\]').removeClass('hidden');
					}
					$('#bnfPassportMessage\\[2\\]').addClass('hidden');	
					$('#duplicate-beneficiariesPAssport\\[2\\]').addClass('hidden');
				}else{
					$('#savieBeneficiaryBean\\[2\\]\\.hkId').addClass('hidden');
					if($('#savieBeneficiaryBean\\[2\\]\\.passportNo').hasClass('hidden')){
						$('#savieBeneficiaryBean\\[2\\]\\.passportNo').removeClass('hidden');
					}
					
					if($('#bnfPassportMessage\\[2\\]').hasClass('hidden')){
						$('#bnfPassportMessage\\[2\\]').removeClass('hidden');
					}
					
					$('#hkidOrPassportMessage\\[2\\]').addClass('hidden');
					$('#duplicate-beneficiaries\\[2\\]').addClass('hidden');
				}
			});
		}).change();
		
	});
	
	
	
	//Validate Form On Button 2 Click
	$("#add-beneficiary-button-2").click(function(){
		//Beneficiary Info Form [1]
		//by: RMN
		$( "#beneficiaryHkidPassport\\[1\\]" ).on('change', function() {
			var str = "";
			$( "#beneficiaryHkidPassport\\[1\\] option:selected" ).each(function() {
				
				str = $( this ).val();
				if(str == 'HKID'){
					console.log('HKID');
					//textbox
					$('#savieBeneficiaryBean\\[1\\]\\.passportNo').addClass('hidden');
					if($('#savieBeneficiaryBean\\[1\\]\\.hkId').hasClass('hidden')){
						$('#savieBeneficiaryBean\\[1\\]\\.hkId').removeClass('hidden');
					}
					
					
					if($('#hkidOrPassportMessage\\[1\\]').hasClass('hidden')){
						$('#hkidOrPassportMessage\\[1\\]').removeClass('hidden');
					}
					
					$('#bnfPassportMessage\\[1\\]').addClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[1\\]').addClass('hidden');	
					
				}else{
					//textbox
					console.log('PAssport');
					$('#savieBeneficiaryBean\\[1\\]\\.hkId').addClass('hidden');
					if($('#savieBeneficiaryBean\\[1\\]\\.passportNo').hasClass('hidden')){
						$('#savieBeneficiaryBean\\[1\\]\\.passportNo').removeClass('hidden');
					}
					
					if($('#bnfPassportMessage\\[1\\]').hasClass('hidden')){
						$('#bnfPassportMessage\\[1\\]').removeClass('hidden');
					}
					
					$('#hkidOrPassportMessage\\[1\\]').addClass('hidden');
					$('#duplicate-beneficiaries\\[1\\]').addClass('hidden');
				}
				
				
			});
			
		}).change();
	});
	

	
	//Beneficiary Info Form [0]
	//by: RMN
	
	// start of validation
	var counter = 0;
				
	$('#beneficiaryInfoForm\\[0\\]').bootstrapValidator({
		fields: {
			'savieBeneficiaryBean[0].firstName':{
				container: '#beneficiaryFnameMessage\\[0\\]',
				validators: {
					notEmpty: {
						message: getBundle(getBundleLanguage, "form.beneficiary.firstname.empty")
                    },
					stringLength: {
                        max: 25,
                        message: getBundle(getBundleLanguage, "form.beneficiary.firstname.length")
                    },
					regexp: {
						regexp: /^[a-zA-Z\s]+$/ ,
						message: getBundle(getBundleLanguage, "form.beneficiary.firstname.english")
					},
               callback: {
                  message: getBundle(getBundleLanguage, "form.beneficiary.firstname.invalid"),
                  callback: function (value, validator) {
                     return value !== document.getElementById('savieBeneficiaryBean[0].firstName').getAttribute('placeholder');
                  }
               }
				}
			},
			'savieBeneficiaryBean[0].lastName':{
				container: '#beneficiaryLnameMessage\\[0\\]',
				validators: {
					notEmpty: {
						message: getBundle(getBundleLanguage, "form.beneficiary.lastname.empty")
                    },
					stringLength: {
                        min: 1,
                        max: 25,
                        message: getBundle(getBundleLanguage, "form.beneficiary.lastname.length")
                    },
					regexp: {
						regexp: /^[a-zA-Z\s]+$/ ,
						message: getBundle(getBundleLanguage, "form.beneficiary.lastname.english")
					},
               callback: {
                  message: getBundle(getBundleLanguage, "form.beneficiary.lastname.invalid"),
                  callback: function (value, validator) {
                     return value !== document.getElementById('savieBeneficiaryBean[0].lastName').getAttribute('placeholder');
                  }
               }
				}
			},
			'savieBeneficiaryBean[0].chineseName':{
				container: '#beneficiaryChineseNameMessage\\[0\\]',
				validators: {
					stringLength: {
                        min: 1,
                        max: 6,
                        message: getBundle(getBundleLanguage, "form.beneficiary.chineseName.length")
                    },
					regexp: {
						regexp: /^[\s\u4e00-\u9fa5]*$/,
						message: getBundle(getBundleLanguage, "form.beneficiary.chineseName.invalid")
					},
					callback: {
		                  callback: function (value, validator) {
		                	  if(document.getElementById('savieBeneficiaryBean[0].chineseName').getAttribute('placeholder')==value && msieversion()>0) {
		                		  $('#beneficiaryInfoForm\\[0\\]')
	                                .data('bootstrapValidator')
	                                .updateStatus('savieBeneficiaryBean[0].chineseName','VALID');
		                	  }
		                	  return true;		                	  
		                  }
		               }
				}
			},
			'beneficiaryHkidPassport[0]':{
				container: '#beneficiaryHkidPassportErMsg\\[0\\]',
				validators: {
					notEmpty: {
						message: getBundle(getBundleLanguage, "form.beneficiary.hkidorpassport.empty")
					}
				}
			},
			'savieBeneficiaryBean[0].passportNo':{
				container: '#bnfPassportMessage\\[0\\]',
				validators: {
					stringLength: {
                        min: 5,
                        max: 15,
                        message: getBundle(getBundleLanguage, "form.beneficiary.passport.length")
                    },
					notEmpty: {
						message: getBundle(getBundleLanguage, "form.beneficiary.passport.empty")
	               },
	               regexp: {
	                  regexp: /^[a-zA-Z0-9\-]*$/,
	                  message: getBundle(getBundleLanguage, "form.beneficiary.passport.invalid")
	               }
				}
			},
			'savieBeneficiaryBean[0].hkId':{
				container: '#hkidOrPassportMessage\\[0\\]',
				validators: {
					notEmpty: {
						message: getBundle(getBundleLanguage, "form.beneficiary.hkid.empty")
					},
					callback: {
	                  callback: function(value, validator) {
						if( value.toUpperCase() == $('#savieApplicantBean\\.hkId').val().toUpperCase()) {
							return {
								valid: false,
								message: getBundle(getBundleLanguage, "error.beneficiary.equal.applicant")
							}
						}
						if( !IsHKID(value) ){
							return {
								valid: false,
								message: getBundle(getBundleLanguage, "form.beneficiary.hkid.invalid")
							}
						}
						return true;
	                  }
	                }
				}
			},
			'savieBeneficiaryBean[0].relationship':{
				container: '#relationshipMessage\\[0\\]',
				validators: {
					notEmpty: {
						message: getBundle(getBundleLanguage, "form.beneficiary.relationship.empty")
					}
				}
			},
			'savieBeneficiaryBean[0].entitlement':{
				container: '#entitlementMessage\\[0\\]',
				validators: {
					/*regexp: {
						regexp: /[0-9]/, // /^(?:[1-9]\d?|100)$/,
						message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.format")
					},*/
					integer:{
	                	message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.format")
	                },
	                between:{
	                	min: 0,
	                	max: 100,
                        message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.range")
                    },
					callback: {
						message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.total"),
						callback: function (value, validator, $field) {
							if(value==''){
                        		// display the range error message if it is empty
                        		$('#beneficiaryInfoForm\\[0\\]')
                        			.data('bootstrapValidator')
                        			.updateStatus('savieBeneficiaryBean[0].entitlement', 'INVALID', 'between');
                        		return true;
                        	} else {
                        		if (totalBeneficiaryEntitlement() == "Exceed"){
	                          		return false;
	                        	} else {
	                           		return true;
	                        	}
                        	}
						}
					}
				}
			}
		}
	});
	// end of validation
	
	$( "#savieBeneficiaryBean\\[0\\]\\.entitlement" ).on('change', function() {
		if(totalBeneficiaryEntitlement()!="Exceed") {
			if($('#savieBeneficiaryBean\\[1\\]\\.entitlement').length > 0){
			 $('#beneficiaryInfoForm\\[1\\]')
             .data('bootstrapValidator')
             .updateStatus('savieBeneficiaryBean[1].entitlement', 'VALID');
			}
			 if($('#savieBeneficiaryBean\\[2\\]\\.entitlement').length > 0){
				 $('#beneficiaryInfoForm\\[2\\]')
	             .data('bootstrapValidator')
	             .updateStatus('savieBeneficiaryBean[2].entitlement', 'VALID');
			 }
		} else {
			if($('#savieBeneficiaryBean\\[1\\]\\.entitlement').length > 0){
			$('#beneficiaryInfoForm\\[1\\]')
             .data('bootstrapValidator')
             .updateStatus('savieBeneficiaryBean[1].entitlement', 'INVALID','callback');
			}
			 if($('#savieBeneficiaryBean\\[2\\]\\.entitlement').length > 0){
				 $('#beneficiaryInfoForm\\[2\\]')
	             .data('bootstrapValidator')
	             .updateStatus('savieBeneficiaryBean[2].entitlement', 'INVALID','callback');
			 }
		}
	});
	
	//Beneficiary Info Form [1]
	$(document).on('click','#add-beneficiary-button-2',function(){
		 $('#beneficiaryInfoForm\\[1\\]').bootstrapValidator({
	         fields: {
	            'savieBeneficiaryBean[1].firstName':{
	               container: '#beneficiaryFnameMessage\\[1\\]',
	               validators: {
	               notEmpty: {
	                  message: getBundle(getBundleLanguage, "form.beneficiary.firstname.empty")
	                    },
	               stringLength: {
	                        max: 25,
	                        message: getBundle(getBundleLanguage, "form.beneficiary.firstname.length")
	                    },
	               regexp: {
	                  regexp: /^[a-zA-Z\s]+$/ ,
	                  message: getBundle(getBundleLanguage, "form.beneficiary.firstname.english")
	               },
	               callback: {
	                  message: getBundle(getBundleLanguage, "form.beneficiary.firstname.invalid"),
	                  callback: function (value, validator) {
	                     return value !== document.getElementById('savieBeneficiaryBean[1].firstName').getAttribute('placeholder');
	                  }
	               }
	            }
	            },
	            'savieBeneficiaryBean[1].lastName':{
	               container: '#beneficiaryLnameMessage\\[1\\]',
	               validators: {
	               notEmpty: {
	                  message: getBundle(getBundleLanguage, "form.beneficiary.lastname.empty")
	                    },
	               stringLength: {
	                        min: 1,
	                        max: 25,
	                        message: getBundle(getBundleLanguage, "form.beneficiary.lastname.length")
	                    },
	               regexp: {
	                  regexp: /^[a-zA-Z\s]+$/ ,
	                  message: getBundle(getBundleLanguage, "form.beneficiary.lastname.english")
	               },
	               callback: {
	                  message: getBundle(getBundleLanguage, "form.beneficiary.lastname.invalid"),
	                  callback: function (value, validator) {
	                     return value !== document.getElementById('savieBeneficiaryBean[1].lastName').getAttribute('placeholder');
	                  }
	               }
	            }
	            },
	            'savieBeneficiaryBean[1].chineseName':{
	               container: '#beneficiaryChineseNameMessage\\[1\\]',
	               validators: {
	                  stringLength: {
	                           min: 1,
	                           max: 6,
	                           message: getBundle(getBundleLanguage, "form.beneficiary.chineseName.length")
	                       },
	                  regexp: {
	                     regexp: /^[\s\u4e00-\u9fa5]*$/,
	                     message: getBundle(getBundleLanguage, "form.beneficiary.chineseName.invalid")
	                  }/*,
	                  callback: {
	                        callback: function(value, validator) {
	                        	if(document.getElementById('savieBeneficiaryBean[1].chineseName').getAttribute('placeholder')==value && msieversion()>0) {
			                		  $('#beneficiaryInfoForm\\[1\\]')
		                                .data('bootstrapValidator')
		                                .updateStatus('savieBeneficiaryBean[1].chineseName','VALID');
			                	}
			                	 
			                	return true;
							}
						}*/
	                  }
	            },
				'beneficiaryHkidPassport[1]':{
					container: '#beneficiaryHkidPassportErMsg\\[1\\]',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.beneficiary.hkidorpassport.empty")
						}
					}
				},
	            'savieBeneficiaryBean[1].passportNo':{
	               container: '#bnfPassportMessage\\[1\\]',
	               validators: {
	                  stringLength: {
                           min: 5,
                           max: 15,
                           message: getBundle(getBundleLanguage, "form.beneficiary.passport.length")
                       },
	                  notEmpty: {
	                     message: getBundle(getBundleLanguage, "form.beneficiary.passport.empty")
	                  },
	                  regexp: {
	                     regexp: /^[a-zA-Z0-9\-]*$/,
	                     message: getBundle(getBundleLanguage, "form.beneficiary.passport.invalid")
	                  }
	               }
	            },
	            'savieBeneficiaryBean[1].hkId':{
	               container: '#hkidOrPassportMessage\\[1\\]',
	               validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.beneficiary.hkid.empty")
						},
						callback: {
							callback: function(value, validator) {
								if( value.toUpperCase() == $('#savieApplicantBean\\.hkId').val().toUpperCase()) {
									return {
										valid: false,
										message: getBundle(getBundleLanguage, "error.beneficiary.equal.applicant")
									}
								}
								if( !IsHKID(value) ){
									return {
										valid: false,
										message: getBundle(getBundleLanguage, "form.beneficiary.hkid.invalid")
									}
								}
								return true;
							}
	                	}
	               }
	            },
	            'savieBeneficiaryBean[1].relationship':{
	               container: '#relationshipMessage\\[1\\]',
	               validators: {
	                  notEmpty: {
	                     message: getBundle(getBundleLanguage, "form.beneficiary.relationship.empty")
	                  }
	               }
	            },
	            'savieBeneficiaryBean[1].entitlement':{
	               container: '#entitlementMessage\\[1\\]',
	               validators: {
	                  /*regexp: {
	                     regexp: /[0-9]/, // /^(?:[1-9]\d?|100)$/,
	                     message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.format")
	                  },*/
	                  integer:{
	                  	 message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.format")
	                  },
	                  between:{
		                 min: 0,
		                 max: 100,
	                     message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.range")
	                  },
	                  callback: {
	                     message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.total"),
	                     callback: function (value, validator, $field) {
	                        if(value==''){
                        		// display the range error message if it is empty
                        		$('#beneficiaryInfoForm\\[1\\]')
                        			.data('bootstrapValidator')
                        			.updateStatus('savieBeneficiaryBean[1].entitlement', 'INVALID', 'between');
                        		return true;
                        	} else {
                        		if (totalBeneficiaryEntitlement() == "Exceed"){
	                          		return false;
	                        	} else {
	                           		return true;
	                        	}
                        	}
	                     }
	                  }
	               }
	            }
	        }
	      });
		 
		 //input hkid
		 $('#savieBeneficiaryBean\\[1\\]\\.hkId').blur(function (e) {
				var value = $(this).val();
				value = value.replace(/[()]/g,'');
				$(this).val(value);
				//if(IsHKID($('#savieBeneficiaryBean\\[1\\]\\.hkId').val())) {
				//	$('#beneficiaryInfoForm\\[1\\]')
				//    .data('bootstrapValidator')
				//    .updateStatus('savieBeneficiaryBean[1].hkId','VALID');
				//}
			});
		 $('#savieBeneficiaryBean\\[1\\]\\.hkId').css('text-transform','uppercase');
		 
		$( "#savieBeneficiaryBean\\[1\\]\\.entitlement" ).on('change', function() {
			if(totalBeneficiaryEntitlement()!="Exceed") {
				 $('#beneficiaryInfoForm\\[0\\]')
	             .data('bootstrapValidator')
	             .updateStatus('savieBeneficiaryBean[0].entitlement', 'VALID', 'callback');
				 
				 if($('#savieBeneficiaryBean\\[2\\]\\.entitlement').length > 0){
					 $('#beneficiaryInfoForm\\[2\\]')
		             .data('bootstrapValidator')
		             .updateStatus('savieBeneficiaryBean[2].entitlement', 'VALID', 'callback');
				 }
			} else {
				$('#beneficiaryInfoForm\\[0\\]')
	             .data('bootstrapValidator')
	             .updateStatus('savieBeneficiaryBean[0].entitlement', 'INVALID','callback');
				
				 if($('#savieBeneficiaryBean\\[2\\]\\.entitlement').length > 0){
					 $('#beneficiaryInfoForm\\[2\\]')
		             .data('bootstrapValidator')
		             .updateStatus('savieBeneficiaryBean[2].entitlement', 'INVALID','callback');
				 }
			}
		});
	});
	
	//Beneficiary Info Form [2]
	$(document).on('click','#add-beneficiary-button-3',function(){
		$('#beneficiaryInfoForm\\[2\\]').bootstrapValidator({
			fields: {
				'savieBeneficiaryBean[2].firstName':{
					container: '#beneficiaryFnameMessage\\[2\\]',
					validators: {
					notEmpty: {
						message: getBundle(getBundleLanguage, "form.beneficiary.firstname.empty")
                    },
					stringLength: {
                        max: 25,
                        message: getBundle(getBundleLanguage, "form.beneficiary.firstname.length")
                    },
                  regexp: {
	                     regexp: /^[a-zA-Z\s]+$/ ,
	                     message: getBundle(getBundleLanguage, "form.beneficiary.firstname.english")
	                  },
               callback: {
                  message: getBundle(getBundleLanguage, "form.beneficiary.firstname.invalid"),
                  callback: function (value, validator) {
                     return value !== document.getElementById('savieBeneficiaryBean[2].firstName').getAttribute('placeholder');
                  }
               }
				}
				},
				'savieBeneficiaryBean[2].lastName':{
					container: '#beneficiaryLnameMessage\\[2\\]',
					validators: {
	                  notEmpty: {
	                     message: getBundle(getBundleLanguage, "form.beneficiary.lastname.empty")
	                       },
	                  stringLength: {
	                           min: 1,
	                           max: 25,
	                           message: getBundle(getBundleLanguage, "form.beneficiary.lastname.length")
	                       },
	                  regexp: {
	                     regexp: /^[a-zA-Z\s]+$/ ,
	                     message: getBundle(getBundleLanguage, "form.beneficiary.lastname.english")
	                  },
                  callback: {
                     message: getBundle(getBundleLanguage, "form.beneficiary.lastame.invalid"),
                     callback: function (value, validator) {
                        return value !== document.getElementById('savieBeneficiaryBean[2].lastName').getAttribute('placeholder');
                     }
                  }
               }
				},
				'savieBeneficiaryBean[2].chineseName':{
					container: '#beneficiaryChineseNameMessage\\[2\\]',
					validators: {
                  stringLength: {
                           min: 1,
                           max: 6,
                           message: getBundle(getBundleLanguage, "form.beneficiary.chineseName.length")
                       },
                  regexp: {
                     regexp: /^[\s\u4e00-\u9fa5]*$/,
                     message: getBundle(getBundleLanguage, "form.beneficiary.chineseName.invalid")
                  }/*,
                  callback: {
                      callback: function(value, validator) {
                    	  if(document.getElementById('savieBeneficiaryBean[2].chineseName').getAttribute('placeholder')==value && msieversion()>0) {
	                		  $('#beneficiaryInfoForm\\[2\\]')
                                .data('bootstrapValidator')
                                .updateStatus('savieBeneficiaryBean[2].chineseName','VALID');
	                	  }
	                	  return true;
                          }
                   }*/
               }
				},
				'beneficiaryHkidPassport[2]':{
					container: '#beneficiaryHkidPassportErMsg\\[2\\]',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.beneficiary.hkidorpassport.empty")
						}
					}
				},
				'savieBeneficiaryBean[2].passportNo':{
					container: '#bnfPassportMessage\\[2\\]',
					validators: {
                  stringLength: {
                       min: 5,
                       max: 15,
                       message: getBundle(getBundleLanguage, "form.beneficiary.passport.length")
                   },
                  notEmpty: {
	                     message: getBundle(getBundleLanguage, "form.beneficiary.passport.empty")
	                  },
                  regexp: {
                     regexp: /^[a-zA-Z0-9\-]*$/,
                     message: getBundle(getBundleLanguage, "form.beneficiary.passport.invalid")
                  }
               }
				},
				'savieBeneficiaryBean[2].hkId':{
					container: '#hkidOrPassportMessage\\[2\\]',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.beneficiary.hkid.empty")
						},
						callback: {
							callback: function(value, validator) {
								if( value.toUpperCase() == $('#savieApplicantBean\\.hkId').val().toUpperCase()) {
									return {
										valid: false,
										message: getBundle(getBundleLanguage, "error.beneficiary.equal.applicant")
									}
								}
								if( !IsHKID(value) ){
									return {
										valid: false,
										message: getBundle(getBundleLanguage, "form.beneficiary.hkid.invalid")
									}
								}
								return true;
							}
                		}
               		}
				},
				'savieBeneficiaryBean[2].relationship':{
					container: '#relationshipMessage\\[2\\]',
					validators: {
                  notEmpty: {
                     message: getBundle(getBundleLanguage, "form.beneficiary.relationship.empty")
                  }
               }
				},
				'savieBeneficiaryBean[2].entitlement':{
					container: '#entitlementMessage\\[2\\]',
					validators: {
                  /*regexp: {
                     regexp: /[0-9]/, // /^(?:[1-9]\d?|100)$/,
                     message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.format")
                  },*/
                  		integer:{
	                  		message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.format")
	              		},
	              		between:{
			                min: 0,
			                max: 100,
		                    message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.range")
		                },
                  		callback: {
                     		message: getBundle(getBundleLanguage, "form.beneficiary.entitlement.total"),
                     		callback: function (value, validator, $field) {
                        	if(value==''){
                        		// display the range error message if it is empty
                        		$('#beneficiaryInfoForm\\[2\\]')
                        			.data('bootstrapValidator')
                        			.updateStatus('savieBeneficiaryBean[2].entitlement', 'INVALID', 'between');
                        		return true;
                        	} else {
                        		if (totalBeneficiaryEntitlement() == "Exceed"){
	                          		return false;
	                        	} else {
	                           		return true;
	                        	}
                        	}
                     	}
                  	}
               	}
				}
			}
		});
		
		//input hkid
		 $('#savieBeneficiaryBean\\[2\\]\\.hkId').blur(function (e) {
				var value = $(this).val();
				value = value.replace(/[()]/g,'');
				$(this).val(value);
				//if(IsHKID($('#savieBeneficiaryBean\\[2\\]\\.hkId').val())) {
				//	$('#beneficiaryInfoForm\\[2\\]')
				//    .data('bootstrapValidator')
				//    .updateStatus('savieBeneficiaryBean[2].hkId','VALID');
				//}
			});
		 $('#savieBeneficiaryBean\\[2\\]\\.hkId').css('text-transform','uppercase');
		 
		 $( "#savieBeneficiaryBean\\[2\\]\\.entitlement" ).on('change', function() {
				if(totalBeneficiaryEntitlement()!="Exceed") {
					 $('#beneficiaryInfoForm\\[0\\]')
		             .data('bootstrapValidator')
		             .updateStatus('savieBeneficiaryBean[0].entitlement', 'VALID', 'callback');
					 
					 if($('#savieBeneficiaryBean\\[1\\]\\.entitlement').length > 0){
						 $('#beneficiaryInfoForm\\[1\\]')
			             .data('bootstrapValidator')
			             .updateStatus('savieBeneficiaryBean[1].entitlement', 'VALID', 'callback');
					 }
				} else {
					$('#beneficiaryInfoForm\\[0\\]')
		             .data('bootstrapValidator')
		             .updateStatus('savieBeneficiaryBean[0].entitlement', 'INVALID', 'callback');
					
					 if($('#savieBeneficiaryBean\\[1\\]\\.entitlement').length > 0){
						 $('#beneficiaryInfoForm\\[1\\]')
			             .data('bootstrapValidator')
			             .updateStatus('savieBeneficiaryBean[1].entitlement', 'INVALID', 'callback');
					 }
				}
			});
	});
	
	//hkid input
	$('#savieApplicantBean\\.hkId').blur(function (e) {
		var value = $(this).val();
		hkidTemp = value.charAt(0).toUpperCase()+ value.slice(1);
		
		$('#etaspi-hkid').text(hkidTemp);
		value = value.replace(/[()]/g,'');
		//$(this).val(value);
		$('#savieApplicantBean\\.hkId')[0].value = value;

		if(IsHKID($('#savieApplicantBean\\.hkId').val())) {
			$('#eliteTermsInsuredInfoForm')
		    .data('bootstrapValidator')
		    .updateStatus('savieApplicantBean.hkId','VALID');
		}
	});
	
	$('#savieBeneficiaryBean\\[0\\]\\.hkId').blur(function (e) {
		var value = $(this).val();
		value = value.replace(/[()]/g,'');
		//$(this).val(value);
		$('#savieBeneficiaryBean\\[0\\]\\.hkId')[0].value = value;

		//if(IsHKID($('#savieBeneficiaryBean\\[0\\]\\.hkId').val())) {
		//	$('#beneficiaryInfoForm\\[0\\]')
		//    .data('bootstrapValidator')
		//    .updateStatus('savieBeneficiaryBean[0].hkId','VALID');
		//}
	});
	
	if(msieversion() > 0) {
		$('#savieApplicantBean\\.hkId').css('text-transform','uppercase');
		$('#savieBeneficiaryBean\\[0\\]\\.hkId').css('text-transform','uppercase');
	}
	//end
	
	
	$('#employment-info-next').click(function(){
		//Employment Info Form
		//by: RMN
		$('#employmentInfoForm').bootstrapValidator({
			fields:{
				'savieEmploymentBean.employmentStatus':{
					container: '#employmentStatusMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.employment.status.empty")
						}
					}
				},
				'savieEmploymentBean.occupation':{
					container: '#occupationMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.employment.occupation.empty")
						}
					}
				},
				'savieEmploymentBean.natureOfBusiness':{
					container: '#natureOfBusinessMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.employment.nature.empty")
						}
					}
				},
				'savieEmploymentBean.monthlyPersonalIncome':{
					container: '#monthlyIncomeMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.employment.income.empty")
						}
					}
				}
			}
		});
		
		
		if($('#employmentInfoForm div').hasClass('has-error')){
			//alert('has error');
		}else{
			//alert('No error');
			$('html, body').animate({
				scrollTop: $('#beneficiary-info').offset().top - $('.navbar-fixed-top').height()
			}, 1000);
		}
	});
	
	
	
	
	//on button click
	//Insured Info Form
	//by: RMN
	
	$('#personal-info-next').click(function(){
		
		$('#insuredInfoForm').bootstrapValidator({
			fields: {
				//if checkbox is unticked
				'savieApplicantBean.residentialAdress1': {
					container: '#resLine1Message',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.address.empty")
						},
						stringLength: {
							min: 4,
							max: 100,
							message: getBundle(getBundleLanguage, "form.address.length")
						}
					}
				},
				//if checkbox is unticked
				'savieApplicantBean.residentialDistrict': {
					container: '#resDistrictMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.address.distict.empty")
						}
					}
				},
				'savieApplicantBean.mobileNo': {
					container: '#applicantMobNum',
					validators: {
						stringLength: {
							min: 11,
							max: 11,
							message: getBundle(getBundleLanguage, "form.mobile.empty")
						}
					}
				},
				'savieApplicantBean.hkId': {
					container: '#hkidMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.hkid.empty")
						},
						regexp: {
							regexp: /^[A-Z0-9]*$/,
							message: getBundle(getBundleLanguage, "form.hkid.invalid")
						},
						callback: {
                     message: getBundle(getBundleLanguage, "form.hkid.invalid"),
                     callback: function(value, validator) {
                                    return IsHKID(value);
                                }
                            }
					}
				},
				'savieApplicantBean.maritalStatus':{
					container: '#maritalStatusMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.marital.empty")
						}
					}
				},
				'savieApplicantBean.emailAddress':{
					container: '#emailMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.email.empty")
						},
						regexp:{
							regexp:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
							message: getBundle(getBundleLanguage, "form.email.invalid")
						}
					}
				},
				'savieApplicantBean[0].mobileNo':{
					container: '#mobilePrefixMessage',
					validators: {
						regexp:{
							regexp: /^[5689][0-9]{2}$/,
							message: getBundle(getBundleLanguage, "form.mobile.invalid")
						}
					}
				},
				'savieApplicantBean[1].mobileNo':{
					container: '#mobileSuffixMessage',
					validators: {
						regexp:{
							regexp: /^[0-9]{4}$/,
							message: getBundle(getBundleLanguage, "form.mobile.length")
						}
					}
				},
				'savieApplicantBean[2].mobileNo':{
					container: '#mobileSuffixSecondMessage',
					validators: {
						regexp:{
							regexp: /^[0-9]{4}$/,
							message: getBundle(getBundleLanguage, "form.mobile.length")
						}
					}
				},
				'savieApplicantBean[0].residentialTelNo':{
					container: '#resTelPrefixMessage',
					validators: {
						regexp:{
							regexp: /^[0-9]{4}$/,
							message: getBundle(getBundleLanguage, "form.tel.invalid")
						}
					}
				},
				'savieApplicantBean[1].residentialTelNo':{
					container: '#resTelSuffixMessage',
					validators: {
						regexp:{
							regexp: /^[0-9]{4}$/,
							message: getBundle(getBundleLanguage, "form.tel.invalid")
						}
					}
				},
				'savieApplicantBean[2].residentialTelNo':{
					container: '#resTelSuffixSecondMessage',
					validators: {
						regexp:{
							regexp: /^[0-9]{4}$/,
							message: getBundle(getBundleLanguage, "form.tel.invalid")
						}
					}
				},
				'savieApplicantBean.placeOfBirth':{
					container: '#placeOfBirthMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.birthPlace.empty")
						}
					}
				},
				'savieApplicantBean.nationality':{
					container: '#nationalityMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.nationality.empty")
						}
					}
				},
				'savieApplicantBean.birthday':{
					container: '#dobMessage',
					validators: {
						notEmpty: {
							message: getBundle(getBundleLanguage, "form.dob.empty")
						}
					}
				}
				
			}
		});
		
		if($("#insuredInfoForm div").hasClass('has-error')){
			//alert('Has error');
		}else{
			//alert('No error');
			$('html, body').animate({
				scrollTop: $('#employment-info').offset().top - $('.navbar-fixed-top').height()
			}, 1000);
		
		}
	
	});
	
	$('#dup-bnf-btn').click(function(){
		//Duplicate HK ID
		//applicantDuplicateBeneficiaries();
		
		//Duplicate Chinese Name
		//applicantDuplicateBeneficicaryChineseName();
		
		//Duplicate English Name
		applicantDuplicateBeneficiaryEnglishName();
	});
});

/*function isValidHKID(hkid){
   var isValid = false;
   
   if (hkid && (hkid.length > 7)) {
	   
	  if( hkid.charCodeAt(0) >= 97 && hkid.charCodeAt(0) <= 122) { 
		  var string = hkid.charCodeAt(0)-32;
	  	  hkid = String.fromCharCode(string)+hkid.slice(1);
	  }
	  
      if(hkid.indexOf('(') > -1) {
         var message = hkid.slice(0, hkid.indexOf('('));
         var checksum = hkid.slice((hkid.indexOf('(') + 1), hkid.lastIndexOf(')'));
         if(hkid.length > 10) {
             return false;
         }
      }
      else {
         var message = hkid.slice(0, 7);
         var checksum = hkid.slice(7, 8)
         if(hkid.length > 8) {
             return false;
         }
      }      
      checksum = isNaN(checksum) ? 10 : parseInt(checksum, 10);
      var checkCtr = message.length + 1
      var checksumTotal = 0;
      
      for (var i=0; i<message.length; i++) {
         var digit = isNaN(message[i]) ? equivalentInteger(message[i]) : parseInt(message[i], 10);
         
         checksumTotal += (digit * checkCtr--);
      }
      
      //isValid = (checksum === (11 - (checksumTotal) % 11));
      var remainder = checksumTotal % 11; 
      var checkDigit = (remainder==0)?0:11-remainder;
      isValid = checksum == checkDigit || checksum == 'A' && checkDigit == 10;

   }
   
   return isValid;
}

function equivalentInteger(hkidChar){
   var digit;
   switch(hkidChar.toUpperCase()){
      case 'A':
      case 'L':
      case 'W':
         digit = 1;
         break;
      case 'B':
      case 'M':
      case 'X':
         digit = 2;
         break;
      case 'C':
      case 'N':
      case 'Y':
         digit = 3;
         break;
      case 'D':
      case 'O':
      case 'Z':
         digit = 4;
         break;
      case 'E':
      case 'P':
         digit = 5;
         break;
      case 'F':
      case 'Q':
         digit = 6;
         break;
      case 'G':
      case 'R':
         digit = 7;
         break;
      case 'H':
      case 'S':
         digit = 8;
         break;
      case 'I':
      case 'T':
         digit = 9;
         break;
      case 'J':
      case 'U':
         digit = 10;
         break;
      case 'K':
      case 'V':
         digit = 11;
         break;
         
   }
   return digit;
}*/

function maxLengthCheck(object){
	if (object.value.length > object.maxLength)
	object.value = object.value.slice(0, object.maxLength)
}



//Duplicate Beneficiaries
function applicantDuplicateBeneficiaries(){
	var dupStr = duplicateBeneficiaries(); 
	
		if(dupStr!= ''){
			var result = /\d+(?:\.\d+)?/.exec(dupStr);
			
			switch(result.toString()){
				case '01':
					$('#duplicate-beneficiaries\\[0\\]').removeClass('hidden');
					$('#duplicate-beneficiaries\\[1\\]').removeClass('hidden');
					$('#duplicate-beneficiaries\\[2\\]').addClass('hidden');
					break;
				case '02':
					$('#duplicate-beneficiaries\\[0\\]').removeClass('hidden');
					$('#duplicate-beneficiaries\\[2\\]').removeClass('hidden');
					$('#duplicate-beneficiaries\\[1\\]').addClass('hidden');
					break;
				case '12':
					$('#duplicate-beneficiaries\\[1\\]').removeClass('hidden');
					$('#duplicate-beneficiaries\\[2\\]').removeClass('hidden');
					$('#duplicate-beneficiaries\\[0\\]').addClass('hidden');
					break;
				case '012':
					$('#duplicate-beneficiaries\\[0\\]').removeClass('hidden');
					$('#duplicate-beneficiaries\\[1\\]').removeClass('hidden');
					$('#duplicate-beneficiaries\\[2\\]').removeClass('hidden');
					break;
				default:
					$('#duplicate-beneficiaries\\[0\\]').addClass('hidden');
					$('#duplicate-beneficiaries\\[1\\]').addClass('hidden');
					$('#duplicate-beneficiaries\\[2\\]').addClass('hidden');
			}
			
		}else{
			$('#duplicate-beneficiaries\\[0\\]').addClass('hidden');
			$('#duplicate-beneficiaries\\[1\\]').addClass('hidden');
			$('#duplicate-beneficiaries\\[2\\]').addClass('hidden');
		}
	
}


//Check for Duplicate Beneficiaries
function duplicateBeneficiaries(){
	var isDup = '';
	var beneficiary1 = (($('#savieBeneficiaryBean\\[0\\]\\.hkId').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[0\\]\\.hkId').val() != "undefined") &&
						($('#savieBeneficiaryBean\\[0\\]\\.hkId').hasClass('hidden')==false)) ? '1': '0';
	var beneficiary2 = (($('#savieBeneficiaryBean\\[1\\]\\.hkId').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[1\\]\\.hkId').val() != "undefined") &&
						($('#savieBeneficiaryBean\\[1\\]\\.hkId').hasClass('hidden')==false)) ? '1': '0';
	var beneficiary3 = (($('#savieBeneficiaryBean\\[2\\]\\.hkId').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[2\\]\\.hkId').val() != "undefined") &&
						($('#savieBeneficiaryBean\\[2\\]\\.hkId').hasClass('hidden')==false)) ? '1': '0';

	var beneficiary1Val = $('#savieBeneficiaryBean\\[0\\]\\.hkId').val();		
	var beneficiary2Val = $('#savieBeneficiaryBean\\[1\\]\\.hkId').val();	
	var beneficiary3Val = $('#savieBeneficiaryBean\\[2\\]\\.hkId').val();		
	
	var beneficiary1isHidden = $('#savieBeneficiaryBean\\[0\\]\\.hkId').hasClass('hidden'); 
	var beneficiary2isHidden = $('#savieBeneficiaryBean\\[1\\]\\.hkId').hasClass('hidden'); 
	var beneficiary3isHidden = $('#savieBeneficiaryBean\\[2\\]\\.hkId').hasClass('hidden'); 
	
	if(((beneficiary1 == '1') && (beneficiary2 == '1')) ||
	   ((beneficiary2 == '1') && (beneficiary3 == '1')) ||
	   ((beneficiary1 == '1') && (beneficiary3 == '1'))) {
		
		if((beneficiary1Val == beneficiary2Val) || (beneficiary1Val == beneficiary3Val) || (beneficiary2Val == beneficiary3Val)){
			isDup = 'Duplicate';
		}else{
			isDup = '';
		}
		
		if ((beneficiary1Val == beneficiary2Val) && (beneficiary2Val== beneficiary3Val) &&
		    (!beneficiary1isHidden && !beneficiary2isHidden && !beneficiary3isHidden)){
			isDup+='012';
		}else if((beneficiary1Val == beneficiary2Val) && (!beneficiary1isHidden && !beneficiary2isHidden)){
			isDup+='01';
		}else if ((beneficiary1Val == beneficiary3Val) && (!beneficiary1isHidden && !beneficiary3isHidden)){
			isDup+='02';
		}else if ((beneficiary2Val == beneficiary3Val) && (!beneficiary2isHidden && !beneficiary3isHidden)){
			isDup+='12';
		}else{
			//do nothing
		} 
		
	}else{
		//do nothing
		isDup = '';
	}
	return isDup;
	

}


//Duplicate Beneficiaries
function applicantDuplicateBeneficiariesPassport(){
	var dupStr = duplicateBeneficiariesPassport(); 
		
		if(dupStr!= ''){
			var result = /\d+(?:\.\d+)?/.exec(dupStr);
			
			switch(result.toString()){
				case '01':
					$('#duplicate-beneficiariesPAssport\\[0\\]').removeClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[1\\]').removeClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[2\\]').addClass('hidden');
					break;
				case '02':
					$('#duplicate-beneficiariesPAssport\\[0\\]').removeClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[2\\]').removeClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[1\\]').addClass('hidden');
					break;
				case '12':
					$('#duplicate-beneficiariesPAssport\\[1\\]').removeClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[2\\]').removeClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[0\\]').addClass('hidden');
					break;
				case '012':
					$('#duplicate-beneficiariesPAssport\\[0\\]').removeClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[1\\]').removeClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[2\\]').removeClass('hidden');
					break;
				default:
					$('#duplicate-beneficiariesPAssport\\[0\\]').addClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[1\\]').addClass('hidden');
					$('#duplicate-beneficiariesPAssport\\[2\\]').addClass('hidden');
			}
			
		}else{
			$('#duplicate-beneficiariesPAssport\\[0\\]').addClass('hidden');
			$('#duplicate-beneficiariesPAssport\\[1\\]').addClass('hidden');
			$('#duplicate-beneficiariesPAssport\\[2\\]').addClass('hidden');
		}
	
}


//Check for Duplicate Beneficiaries
function duplicateBeneficiariesPassport(){
	var isDup = '';
	var beneficiaryPassport1 = (($('#savieBeneficiaryBean\\[0\\]\\.passportNo').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[0\\]\\.passportNo').val() != "undefined") &&
								($('#savieBeneficiaryBean\\[0\\]\\.passportNo').hasClass('hidden') == false)) ? '1': '0';
	var beneficiaryPassport2 = (($('#savieBeneficiaryBean\\[1\\]\\.passportNo').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[1\\]\\.passportNo').val() != "undefined") &&
								($('#savieBeneficiaryBean\\[1\\]\\.passportNo').hasClass('hidden') == false)) ? '1': '0';	
	var beneficiaryPassport3 = (($('#savieBeneficiaryBean\\[2\\]\\.passportNo').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[2\\]\\.passportNo').val() != "undefined") &&
								($('#savieBeneficiaryBean\\[2\\]\\.passportNo').hasClass('hidden') == false)) ? '1': '0';			

	var beneficiary1PassportVal = $('#savieBeneficiaryBean\\[0\\]\\.passportNo').val();		
	var beneficiary2PassportVal = $('#savieBeneficiaryBean\\[1\\]\\.passportNo').val();	
	var beneficiary3PassportVal = $('#savieBeneficiaryBean\\[2\\]\\.passportNo').val();		
	
	var beneficiaryPassport1isHidden = $('#savieBeneficiaryBean\\[0\\]\\.passportNo').hasClass('hidden'); 
	var beneficiaryPassport2isHidden = $('#savieBeneficiaryBean\\[1\\]\\.passportNo').hasClass('hidden'); 
	var beneficiaryPassport3isHidden = $('#savieBeneficiaryBean\\[2\\]\\.passportNo').hasClass('hidden'); 
						
	
	if(((beneficiaryPassport1 == '1') && (beneficiaryPassport2 == '1')) ||
	   ((beneficiaryPassport2 == '1') && (beneficiaryPassport3 == '1')) ||
	   ((beneficiaryPassport1 == '1') && (beneficiaryPassport3 == '1'))) {
		
		if((beneficiary1PassportVal == beneficiary2PassportVal) || (beneficiary1PassportVal == beneficiary3PassportVal) || (beneficiary2PassportVal == beneficiary3PassportVal)){
			isDup = 'Duplicate';
		}else{
			isDup = '';
		}
		
		if ((beneficiary1PassportVal == beneficiary2PassportVal) && (beneficiary2PassportVal== beneficiary3PassportVal) &&
			(!beneficiaryPassport1isHidden && !beneficiaryPassport2isHidden && !beneficiaryPassport3isHidden)){
			isDup+='012';
		}else if((beneficiary1PassportVal == beneficiary2PassportVal) && 
				(!beneficiaryPassport1isHidden && !beneficiaryPassport2isHidden)){
			isDup+='01';
		}else if ((beneficiary1PassportVal == beneficiary3PassportVal) &&
				(!beneficiaryPassport1isHidden && !beneficiaryPassport3isHidden)){
			isDup+='02';
		}else if ((beneficiary2PassportVal == beneficiary3PassportVal) && 
				(!beneficiaryPassport2isHidden && !beneficiaryPassport3isHidden)){
			isDup+='12';
		}else{
			//do nothing
		} 
		
	}else{
		//do nothing
		isDup = '';
	}
	return isDup;
	

}





//Duplicate Chinese Name
function applicantDuplicateBeneficicaryChineseName(){
	var dupStr = duplicateChineseName(); 
	
	if(dupStr!= ''){
			var result = /\d+(?:\.\d+)?/.exec(dupStr);
			
			switch(result.toString()){
				case '01':
					$('#duplicate-chinese-name\\[0\\]').removeClass('hidden');
					$('#duplicate-chinese-name\\[1\\]').removeClass('hidden');
					$('#duplicate-chinese-name\\[2\\]').addClass('hidden');
					break;
				case '02':
					$('#duplicate-chinese-name\\[0\\]').removeClass('hidden');
					$('#duplicate-chinese-name\\[2\\]').removeClass('hidden');
					$('#duplicate-chinese-name\\[1\\]').addClass('hidden');
					break;
				case '12':
					$('#duplicate-chinese-name\\[1\\]').removeClass('hidden');
					$('#duplicate-chinese-name\\[2\\]').removeClass('hidden');
					$('#duplicate-chinese-name\\[0\\]').addClass('hidden');
					break;
				case '012':
					$('#duplicate-chinese-name\\[0\\]').removeClass('hidden');
					$('#duplicate-chinese-name\\[1\\]').removeClass('hidden');
					$('#duplicate-chinese-name\\[2\\]').removeClass('hidden');
					break;
				default:
					$('#duplicate-chinese-name\\[0\\]').addClass('hidden');
					$('#duplicate-chinese-name\\[1\\]').addClass('hidden');
					$('#duplicate-chinese-name\\[2\\]').addClass('hidden');
			}
			
		}else{
			$('#duplicate-chinese-name\\[0\\]').addClass('hidden');
			$('#duplicate-chinese-name\\[1\\]').addClass('hidden')
			$('#duplicate-chinese-name\\[2\\]').addClass('hidden')
		}
}


//Check for Duplicate Chinese Name
function duplicateChineseName(){
	var isDup = '';
	var chineseName1 = (($('#savieBeneficiaryBean\\[0\\]\\.chineseName').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[0\\]\\.chineseName').val() != "undefined")) ? '1': '0';
	var chineseName2 = (($('#savieBeneficiaryBean\\[1\\]\\.chineseName').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[1\\]\\.chineseName').val() != "undefined")) ? '1': '0';
	var chineseName3 = (($('#savieBeneficiaryBean\\[2\\]\\.chineseName').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[2\\]\\.chineseName').val() != "undefined")) ? '1': '0';

	var chineseName1Val = $('#savieBeneficiaryBean\\[0\\]\\.chineseName').val();		
	var chineseName2Val = $('#savieBeneficiaryBean\\[1\\]\\.chineseName').val();	
	var chineseName3Val = $('#savieBeneficiaryBean\\[2\\]\\.chineseName').val();		
	
	
	if(((chineseName1 == '1') && (chineseName2 == '1')) ||
	   ((chineseName2 == '1') && (chineseName3 == '1')) ||
	   ((chineseName1 == '1') && (chineseName3 == '1'))) {
		
		if((chineseName1Val == chineseName2Val) || (chineseName1Val == chineseName3Val) || (chineseName2Val == chineseName3Val)){
			isDup = 'Duplicate';
		}else{
			isDup = '';
		}
		
		if ((chineseName1Val == chineseName2Val) && (chineseName2Val== chineseName3Val)){
			isDup+='012';
		}else if(chineseName1Val == chineseName2Val){
			isDup+='01';
		}else if (chineseName1Val == chineseName3Val){
			isDup+='02';
		}else if (chineseName2Val == chineseName3Val){
			isDup+='12';
		}else{
			//do nothing
		} 
		
	}else{
		//do nothing
		isDup = '';
	}
	return isDup;
}


//Getting the FullName for Beneficiary 
function getBeneficiaryFullName0(){
	var fName = document.getElementById("savieBeneficiaryBean[0].firstName").value;
	var lName = document.getElementById("savieBeneficiaryBean[0].lastName").value;
	document.getElementById("savieBeneficiaryBean[0].fullName").value = fName + lName;
	
}

function getBeneficiaryFullName1(){
	var fName = document.getElementById("savieBeneficiaryBean[1].firstName").value;
	var lName = document.getElementById("savieBeneficiaryBean[1].lastName").value;
	document.getElementById("savieBeneficiaryBean[1].fullName").value = fName + lName;
	
}

function getBeneficiaryFullName2(){
	var fName = document.getElementById("savieBeneficiaryBean[2].firstName").value;
	var lName = document.getElementById("savieBeneficiaryBean[2].lastName").value;
	document.getElementById("savieBeneficiaryBean[2].fullName").value = fName + lName;
	
}

//Duplicate English Name
function duplicateEnglishName(){
	var isDup = '';
	var fullName1 = (($('#savieBeneficiaryBean\\[0\\]\\.fullName').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[0\\]\\.fullName').val() != "undefined")) ? '1': '0';
	var fullName2 = (($('#savieBeneficiaryBean\\[1\\]\\.fullName').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[1\\]\\.fullName').val() != "undefined")) ? '1': '0';
	var fullName3 = (($('#savieBeneficiaryBean\\[2\\]\\.fullName').val() != "") &&
						(typeof $('#savieBeneficiaryBean\\[2\\]\\.fullName').val() != "undefined")) ? '1': '0';						
	var fullName1Val = $('#savieBeneficiaryBean\\[0\\]\\.fullName').val();
	var fullName2Val = $('#savieBeneficiaryBean\\[1\\]\\.fullName').val();
	var fullName3Val = $('#savieBeneficiaryBean\\[2\\]\\.fullName').val();
	
	if(((fullName1 == '1') && (fullName2 == '1')) ||
	   ((fullName2 == '1') && (fullName3 == '1')) ||
	   ((fullName1 == '1') && (fullName3 == '1'))) {
		
		if((fullName1Val == fullName2Val) || (fullName1Val == fullName3Val) || (fullName2Val == fullName3Val)){
			isDup = 'Duplicate';
		}else{
			isDup = '';
		}
		
		if ((fullName1Val == fullName2Val) && (fullName2Val== fullName3Val)){
			isDup+='012';
		}else if(fullName1Val == fullName2Val){
			isDup+='01';
		}else if (fullName1Val == fullName3Val){
			isDup+='02';
		}else if (fullName2Val == fullName3Val){
			isDup+='12';
		}else{
			//do nothing
		} 
		
	}else{
		//do nothing
		isDup = '';
	}
	return isDup;	
}

function applicantDuplicateBeneficiaryEnglishName(){
	var dupStr = duplicateEnglishName(); 
		
		if(dupStr!= ''){
			var result = /\d+(?:\.\d+)?/.exec(dupStr);
			
			switch(result.toString()){
				case '01':
					$('#duplicate-english-name\\[0\\]').removeClass('hidden');
					$('#duplicate-english-name\\[1\\]').removeClass('hidden');
					$('#duplicate-english-name\\[2\\]').addClass('hidden');
					break;
				case '02':
					$('#duplicate-english-name\\[0\\]').removeClass('hidden');
					$('#duplicate-english-name\\[2\\]').removeClass('hidden');
					$('#duplicate-english-name\\[1\\]').addClass('hidden');
					break;
				case '12':
					$('#duplicate-english-name\\[1\\]').removeClass('hidden');
					$('#duplicate-english-name\\[2\\]').removeClass('hidden');
					$('#duplicate-english-name\\[0\\]').addClass('hidden');
					break;
				case '012':
					$('#duplicate-english-name\\[0\\]').removeClass('hidden');
					$('#duplicate-english-name\\[1\\]').removeClass('hidden');
					$('#duplicate-english-name\\[2\\]').removeClass('hidden');
					break;
				default:
					$('#duplicate-english-name\\[0\\]').addClass('hidden');
					$('#duplicate-english-name\\[1\\]').addClass('hidden');
					$('#duplicate-english-name\\[2\\]').addClass('hidden');
			}
			
		}else{
			$('#duplicate-english-name\\[0\\]').addClass('hidden');
			$('#duplicate-english-name\\[1\\]').addClass('hidden')
			$('#duplicate-english-name\\[2\\]').addClass('hidden')
		}
		
}



//check if Beneficary 2 is not hidden
function isBeneficiaryPerson2Hidden(){
	var isHide = "";
	if($('#beneficiaryInfoForm\\[1\\]').length == 0){
		isHide = "hidden";
	}else{
		if($('#beneficiaryInfoForm\\[1\\]').hasClass('hidden')){
			isHide = "hidden";
		}else{
			isHide = "not hidden";
		}
	}
	
	return isHide;
}


//check if Beneficiary 3 is not hidden
function isBeneficiaryPerson3Hidden(){
	var isHide = "";
	if($('#beneficiaryInfoForm\\[2\\]').length == 0){
		isHide = "hidden";
	}else{
		if($('#beneficiaryInfoForm\\[2\\]').hasClass('hidden')){
			isHide = "hidden";
		}else{
			isHide = "not hidden";
		}
	}
	
	return isHide;
}

