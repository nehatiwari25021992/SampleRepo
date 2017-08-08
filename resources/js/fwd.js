var reg = /^[a-zA-Z]+$/;
var emailreg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var regex_malasia = /\+60[-]\d{2,4}[-]?\d{6,9}\b/;
var mobile_pattern = /^1[0-9]{10}$|^[5689][0-9]{7}$/;   /* /^\d{8}$/; */
var plan_user = /^(([a-zA-Z0-9]+)|(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-\_]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)))$/;

var password_full_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[&%$!]).{8,}$/;
var password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
var passport_pattern = /^[a-zA-Z0-9]{5,15}$/;

var name_eng_pattern = /^[a-zA-Z\s\u4e00-\u9fa5]*$/; /*English chars only*/
var name_chi_pattern = /^[\u4e00-\u9fa5\s]*$/; /*Chinese chars only*/
var name_eng_chi_pattern = /^[a-zA-Z\s\u4e00-\u9fa5]*$/; /*Chinese and english chars only*/

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
 
	
var getBundleLanguage = "";
var lang = UILANGUAGE;

if(lang === "EN"){
	getBundleLanguage = "en";
}else 
if(lang === "tc"){
	getBundleLanguage = "zh";
} 
else{
	getBundleLanguage = "en";
}

var chin = false;
/* datepicker script*/

/* hkid validation script */
function IsHKID(str) {
	var strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

		// basic check length
		if (str.length < 8)
			return false;

	// handling bracket
	if (str.charAt(str.length - 3) == '(' && str.charAt(str.length - 1) == ')')
		str = str.substring(0, str.length - 3) + str.charAt(str.length - 2);

	// convert to upper case
	str = str.toUpperCase();

	// regular expression to check pattern and split
	var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
	var matchArray = str.match(hkidPat);
	
	var hkidPat2 = /^([A-Z]{1,2})([0-9]{6})([(])([A0-9])([)])$/;
	var matchArray2 = str.match(hkidPat2);

	// not match, return false
	if (matchArray == null && matchArray2 == null)
		return false;

	// the character part, numeric part and check digit part
	var charPart = matchArray[1];
	var numPart = matchArray[2];
	var checkDigit = matchArray[3];

	// calculate the checksum for character part
	var checkSum = 0;
	if (charPart.length == 2) {
		checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
		checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
	} else {
		checkSum += 9 * 36;
		checkSum += 8 * (10 + strValidChars.indexOf(charPart));
	}

	// calculate the checksum for numeric part
	for (var i = 0, j = 7; i < numPart.length; i++, j--)
		checkSum += j * numPart.charAt(i);

	// verify the check digit
	var remaining = checkSum % 11;
	var verify = remaining == 0 ? 0 : 11 - remaining;

	return verify == checkDigit || (verify == 10 && checkDigit == 'A');
}

/* empty error message when*/
function emptyMembershipError(){
	$(".error-hide").hide();
}


$(function () {
	
    /* scrolling code starts */
		var floatingbox = $('.floatingbox');
	    
	    if (floatingbox[0]){
	    	var floatingboxY = floatingbox.offset().top,
	        wrapboxY = $("#quote-wrap").offset().top;
	        var topMargin = 40;
	        
	        $(window).on('scroll', function(event) {
	        	if ($("#quote-wrap").height() > $(".floatingbox").height()){
	        		var scrollTop = $(window).scrollTop();
	        		var wrapboxRY = wrapboxY+$("#quote-wrap").height();
	        		var floatingboxRY = scrollTop+$(".floatingbox").height()+topMargin;

	        		if (wrapboxRY > floatingboxRY){
	        			floatingbox.stop(false).animate({
	                        top: scrollTop < floatingboxY ? 0 : scrollTop - floatingboxY + topMargin
	                    }, 100);
	        		}else{
	        			if (floatingboxRY > wrapboxRY){
	                        floatingbox.css("top", $("#quote-wrap").height()-$(".floatingbox").height())
	                    }
	        		}
	        	}
	        });
	    }
    /* scrolling code ends */
    
	/* payment seccode start*/
	$( "#seccode" ).on( "change blur", function() {
	    var seccode = $(this).val();
		if (seccode.trim() == "") {
			$("#errcode").html( getBundle(getBundleLanguage, "payment.creditCard.securityCode.notNull.message"));//"Please enter your Name in English.";
			$("#seccode").addClass("invalid-field");
			return false;
		}else{
			if(seccode.length<3)
			{
				$('#errcode').html(getBundle(getBundleLanguage, "payment.creditCard.securityCode.notValid.message"));
				$("#seccode").addClass("invalid-field");
				return false;
			}
		}
		$("#seccode").removeClass("invalid-field");
		$("#errcode").html('');
	});
	
	/* payment seccode end */
	
	
	chin = $('body').hasClass('chin');
	
	/*get now date*/
	
	
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var tillDate_from= new Date((new Date()).getTime() + 89*24*60*60*1000);
	var tillDate_from_travel= new Date((new Date()).getTime() + 179*24*60*60*1000);
	var duration = $('#frmTravelGetQuote').length > 0 || $('#frmTravelPlan').length > 0 ? 180*24*60*60*1000 :30*24*60*60*1000;
	var oneDay=24*60*60*1000;
	
	
	
	
	var checkout;
	/* desktoip datepicker*/
	$("#txtStartDateDesk").blur(function() {
		var dateDiff = dateDiffInDaysFromNow(checkin.datepicker("getDate").valueOf());
	    if(dateDiff < 0){ this.focus();return false; }
	});
	$("#txtEndDateDesk").blur(function() {
		var dateDiff = dateDiffInDaysFromNow(checkout.datepicker("getDate").valueOf());
	    if(dateDiff < 0){ this.focus();return false; }
	});	
	
	$("#txtStartDateMob").blur(function() {
		var dateDiff = dateDiffInDaysFromNow(checkin2.datepicker("getDate").valueOf());
	    if(dateDiff < 0){ this.focus();return false; }
	});
	$("#txtEndDateMob").blur(function() {
		var dateDiff = dateDiffInDaysFromNow(checkout2.datepicker("getDate").valueOf());
	    if(dateDiff < 0){ this.focus();return false; }
	});
	
	$("#txtStartDateBtm").blur(function() {
		var dateDiff = dateDiffInDaysFromNow(checkin3.datepicker("getDate").valueOf());
	    if(dateDiff < 0){ this.focus();return false; }
	});
	$("#txtEndDateBtm").blur(function() {
		var dateDiff = dateDiffInDaysFromNow(checkout3.datepicker("getDate").valueOf());
	    if(dateDiff < 0){ this.focus();return false; }
	});
	
	
	
	
	//================================================================================================================================
	//================================================================================================================================trval detail page datepicker
	//================================================================================================================================
	
	
	var checkinTravelDetail = $('#trval-dp1').datepicker({
		beforeShowDay: function (date) {
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from;
		},
		//startDate:nowTemp,
		//endDate:  tillDate_from,
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy",


	}).on('changeDate', function (ev) {
		//if (ev.date.valueOf() > checkout.datepicker("getDate").valueOf() || !checkout.datepicker("getDate").valueOf()) {
		
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate());
								
			
			var startDate = $("#trval-dp1").datepicker("getDate");
			var endDate = $("#trval-dp2").datepicker("getDate");
			
			
						
			
			if(startDate>endDate){					
				$('#trval-dp2').datepicker('update', newDate);								
			}
			
			
			
					                 
			//-------------------------------------------------------------------------------ajax
			
			var path = window.location.href;		
			
	
					
		
				end = path.indexOf('travel-insurance');
				fullPath = path.substring(0, end) + "travel-insurance/quote";			
			
			
			
			//要搵返D 變數post 返
					
//			$.ajax({
//				  type: "POST",
//				  url: fullPath,
//				  data: { 'trLeavingDate': dateFormate(startDate),
//					  	  'trBackDate': dateFormate(endDate),
//					  	  'totalAdultTraveller':'',
//					  	  'totalChildTraveller':'',					  	  
//					  	  'days':'',
//					  	  'travellerCount':'',
//					  	  'ToalDue':'1',
//					  	  'planSelected':''					  	 
//				  },					  				  							  
//				  success: function(){					 					 
//				  }
//			
//			});
							
			//-------------------------------------------------------------------------------ajax		
						
			
	    
	});
	
	
	
	
	



	
	
	checkoutTravelDetail = $('#trval-dp2').datepicker({
		beforeShowDay: function (date) {
			if (!checkinTravelDetail.datepicker("getDate").valueOf()) {

				return date.valueOf() >= new Date().valueOf() && date.valueOf() < tillDate_from;
			} else {
				
				return date.valueOf() >= checkinTravelDetail.datepicker("getDate").valueOf() && date.valueOf() < checkinTravelDetail.datepicker("getDate").valueOf()+duration;
			}
		},
		autoclose: true,
		
		format: "dd-mm-yyyy"

	}).on('changeDate', function (ev) {
		
		var startDate = new Date($('#trval-dp1').datepicker("getDate").valueOf());
		var endDate = new Date($('#trval-dp2').datepicker("getDate").valueOf());
		
		
		
		
		//-------------------------------------------------------------------------------ajax
		
		var path = window.location.href;		
		

				
	
			end = path.indexOf('travel-insurance');
			fullPath = path.substring(0, end) + "travel-insurance/quote";			
		
		
		
		//要搵返D 變數post 返
				
//		$.ajax({
//			  type: "POST",
//			  url: fullPath,
//			  data: { 'trLeavingDate': dateFormate(startDate),
//				  	  'trBackDate': dateFormate(endDate),
//				  	  'totalAdultTraveller':'',
//				  	  'totalChildTraveller':'',					  	  
//				  	  'days':'',
//				  	  'travellerCount':'',
//				  	  'ToalDue':'1',
//				  	  'planSelected':''					  	 
//			  },					  				  							  
//			  success: function(){					 					 
//			  }
//		
//		});
								
		
		
		
	//	document.getElementById("divPersonsDesk").style.visibility = "visible";
	//	document.getElementById("lblDaysDesk").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);

	});

	
	
	
	
	
	
	
	
	
	
	
	//================================================================================================================================
	//================================================================================================================================flight detail page datepicker
	//================================================================================================================================
	
	
	var checkinFightDetail = $('#dp1-detail-page').datepicker({
		beforeShowDay: function (date) {
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from;
		},
		//startDate:nowTemp,
		//endDate:  tillDate_from,
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy",


	}).on('changeDate', function (ev) {
		//if (ev.date.valueOf() > checkout.datepicker("getDate").valueOf() || !checkout.datepicker("getDate").valueOf()) {
		
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate());
								
			
			var startDate = $("#dp1-detail-page").datepicker("getDate");
			var endDate = $("#dp2-detail-page").datepicker("getDate");
			
			
						
			
			if(startDate>endDate){					
				$('#dp2-detail-page').datepicker('update', newDate);								
			}
			
			
			
					                 
			//-------------------------------------------------------------------------------ajax
			
			var path = window.location.href;		
			
			var end = path.indexOf('flight-insurance');
			var fullPath = "";				
			
			if(end>0){
				fullPath = path.substring(0, end) + "flight-insurance/quote";					
			}
			else{
				path.indexOf('travel-insurance');
				fullPath = path.substring(0, end) + "travel-insurance/quote";			
			}
			
			
			
					
//			$.ajax({
//				  type: "POST",
//				  url: fullPath,
//				  data: { 'departureDate': dateFormate(startDate),
//					  	  'returnDate': dateFormate(endDate),
//					  	  'totalAdultTraveller':'',
//					  	  'totalChildTraveller':'',					  	  
//					  	  'days':'',
//					  	  'travellerCount':'',
//					  	  'ToalDue':'1',
//					  	  'planSelected':''					  	 
//				  },					  				  							  
//				  success: function(){					 					 
//				  }
//			
//			});
							
			//-------------------------------------------------------------------------------ajax		
						
			
	    
	});
	
	
	
	
	function dateFormate(thisDate){
		
		 var monthNames = [
		                      "January", "February", "March",
		                      "April", "May", "June", "July",
		                      "August", "September", "October",
		                      "November", "December"
		                  ];

		                  var date = new Date(thisDate);
		                  var day = date.getDate();
		                 if(day<10){		                	 
		                	 day = '0' + day;
		                 }
		                 
		                  var monthIndex = date.getMonth();		                  
		                  var year = date.getFullYear();
		                  var formateDate = day + " " + monthNames[monthIndex] +" " + year;
		                  return formateDate;
		
	}
	
	
	
	
	
	checkoutFightDetail = $('#dp2-detail-page').datepicker({
		beforeShowDay: function (date) {
			if (!checkinFightDetail.datepicker("getDate").valueOf()) {

				return date.valueOf() >= new Date().valueOf() && date.valueOf() < tillDate_from;
			} else {
				
				return date.valueOf() >= checkinFightDetail.datepicker("getDate").valueOf() && date.valueOf() < checkinFightDetail.datepicker("getDate").valueOf()+duration;
			}
		},
		autoclose: true,
		
		format: "dd-mm-yyyy"

	}).on('changeDate', function (ev) {
		
		var startDate = new Date($('#dp1-detail-page').datepicker("getDate").valueOf());
		var endDate = new Date($('#dp2-detail-page').datepicker("getDate").valueOf());
		
		
		
		
		//-------------------------------------------------------------------------------ajax
							
		var path = window.location.href;		
		var end = path.indexOf('flight-insurance');
		var fullPath = path.substring(0, end) + "flight-insurance/quote";
				
//		$.ajax({
//			  type: "POST",
//			  url: fullPath,
//			  data: { 'departureDate': dateFormate(startDate),
//				  	  'returnDate': dateFormate(endDate),
//				  	  'totalAdultTraveller':'',
//				  	  'totalChildTraveller':'',					  	  
//				  	  'days':'',
//				  	  'travellerCount':'',
//				  	  'ToalDue':'1',
//				  	  'planSelected':''					  	 
//			  },					  				  							  
//			  success: function(){					 					 
//			  }
//		
//		});
						
		//-------------------------------------------------------------------------------ajax			
		
		
		
	//	document.getElementById("divPersonsDesk").style.visibility = "visible";
	//	document.getElementById("lblDaysDesk").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);

	});

	
	
	
	
	//================================================================================================================================	
	//================================================================================================================================ end fight page detail datepicker
	//================================================================================================================================
	// 35 day
	var dob_42_date = new Date();
	dob_42_date.setDate(dob_42_date.getDate()-43);
	
	// 18 year ago date
	var dob_end_date = new Date();
	dob_end_date.setFullYear(dob_end_date.getFullYear()-18);
	// this year
	var dob_end_date_this_year = new Date();
	// this year - 90 days
	var dob_end_date_this_year_plus_90 = new Date();
	dob_end_date_this_year_plus_90.setDate(dob_end_date_this_year_plus_90.getDate() + 90);
	
	
	// 65 year ago date
	var dob_65_date = new Date();
	dob_65_date.setFullYear(dob_end_date_this_year.getFullYear() - 65);		
	dob_65_date.setDate(dob_65_date.getDate() + 1);
	
	// 12 year ago date
	var dob_12_date = new Date();
	dob_12_date.setFullYear(dob_12_date.getFullYear() - 12);		
	dob_12_date.setDate(dob_12_date.getDate() + 90);
	
	// 10 year and 9 month ago date
	var dob_10_date = new Date();
	dob_10_date.setFullYear(dob_10_date.getFullYear() - 11);		
	dob_10_date.setDate(dob_10_date.getDate() + 90);
		
	// 86 year ago date
	var dob_start_date = new Date();
	dob_start_date.setFullYear(dob_start_date.getFullYear()-86);
	dob_start_date.setDate(dob_start_date.getDate()+1);
	
	// 71 year ago date
	var dob_70_date = new Date();
	dob_70_date.setFullYear(dob_70_date.getFullYear()-71);
	dob_70_date.setDate(dob_70_date.getDate());
	
	// 70 year ago date for Annual Travel
	var dob_69_date = new Date();
	dob_69_date.setFullYear(dob_69_date.getFullYear()-70);
	//console.log(dob_69_date);
	dob_69_date.setDate(dob_69_date.getDate());
	
	//Start at 1900
	/*var dob_1900_date = new Date();
	dob_1900_date.setFullYear(1900,0,1);*/
	
	//one day before 69 year old date
	var dob_70_99_date = new Date();
	dob_70_99_date.setFullYear(dob_70_99_date.getFullYear()-69);
	dob_70_99_date.setDate(dob_70_99_date.getDate() + 1);
	
	// birthday datepicker, only 18-85 year-old users can buy the insurance
	$('#input_dob').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_start_date,
		endDate: dob_end_date
		/*language: getBundleLanguage*/
	}).on('changeDate', function (ev) {
		var selected = 2;
		if(ev.date != undefined) {
			if(ev.date.valueOf() < dob_end_date.valueOf() && ev.date.valueOf() > dob_70_date.valueOf()){
				selected = 2;
			}else{
				selected = 3;
			}
			if($("#selectAgeRange1").length > 0){
				$("#selectAgeRange1").val(selected);
			}else if($("#insureDob1").length > 0){
				$("#insureDob1").val($("#applicantDob").val());
			}
		}
		$("#dobInvalid").html("");
		$("#input_dob").removeClass("invalid-field");
	});
	$('#input_dob').datepicker('setDate', dob_end_date);
	
	$('#input_oversea_dob').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_70_99_date,
		endDate: dob_end_date
	}).on('changeDate', function (ev) {
		if (document.getElementById("applicantRelationship").value == 'SE'){
			$('#oversea_insure_dob').datepicker('setDate', $("#applicantDob").val());
			//console.log($('#oversea_insure_dob').datepicker('getDate'));
			//console.log($('#applicantDob').val());
		}
		$("#dobInvalid").html("");
		$("#errtxtInsuDob").html("");
		$("#errtxtAdDob1").html("");
		$("#dobInsuredInvalid").html("");
		$("#input_oversea_dob").removeClass("invalid-field");
		$("#oversea_insure_dob").removeClass("invalid-field");
	}).on('show', function(ev){
	       $("td.day.old,td.day.new").addClass("disabled");        
	}); 
	
	$('#oversea_insure_dob').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_70_99_date,
		endDate: dob_12_date
		/*language: getBundleLanguage*/
	}).on('changeDate', function (ev) {
		$("#dobInsuredInvalid").html("");
		$("#oversea_insure_dob").removeClass("invalid-field");		
	}).on('show', function(ev){
	       $("td.day.old,td.day.new").addClass("disabled");        
	});	
		
	$('#oversea_educational_insured_dob').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_start_date,
		endDate: dob_end_date
	}).on('changeDate', function (ev) {
		$(this).next().html("");
		$(this).removeClass("invalid-field");
	}).on('show', function(ev){
	       $("td.day.old,td.day.new").addClass("disabled");        
	}); 
	
	$('#oversea_departure_date').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_end_date_this_year,
		endDate: dob_end_date_this_year_plus_90
	}).on('changeDate', function (ev) {
		$(this).next().html("");
		$(this).removeClass("invalid-field");
	}).on('show', function(ev){
	       $("td.day.old,td.day.new").addClass("disabled");        
	}); 
	
	$('#input_annual_dob').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_69_date,
		endDate: dob_end_date
	}).on('changeDate', function (ev) {
		$('#input_insure_dob1').datepicker('setDate', $("#applicantDob").val());
		$('#input_adult_dob1').datepicker('setDate', $("#applicantDob").val());
		$("#dobInvalid").html("");
		$("#errtxtInsuDob1").html("");
		$("#errtxtAdDob1").html("");
		$("#input_annual_dob").removeClass("invalid-field");
	});
	
	$('.annual_dob').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_69_date,
		endDate: dob_end_date
	}).on('changeDate', function (ev) {
		$(this).next().html("");
		$(this).removeClass("invalid-field");
	});
	
	$('.annual_child_dob').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_end_date,
		endDate: dob_42_date
	}).on('changeDate', function (ev) {
		$(this).next().html("");
		$(this).removeClass("invalid-field");
	});
	
	$('.dob_input').datepicker({
		startView: "decade",
		autoclose: true,
		format: "dd-mm-yyyy",
		startDate: dob_start_date,
		endDate: dob_end_date
		/*language: getBundleLanguage*/
	}).on('changeDate', function (ev) {
//		var selected = 2;
//		if(ev.date != undefined) {
//			if(ev.date.valueOf() < dob_end_date.valueOf() && ev.date.valueOf() > dob_70_date.valueOf()){
//				selected = 2;
//			}else{
//				selected = 3;
//			}
//			
//			
//			if($("#selectAgeRange1").length > 0){
//				$("#selectAgeRange1").val(selected);
//			}
//		}
		$(this).next().html("");
		$(this).removeClass("invalid-field");
	});
	$('.dob_input').datepicker('setDate', dob_end_date);
	

	var checkin = $('#dp1').datepicker({
		beforeShowDay: function (date) {
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from;
		},
		//startDate:nowTemp,
		//endDate:  tillDate_from,
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy",
	}).on('changeDate', function (ev) {
		//if (ev.date.valueOf() > checkout.datepicker("getDate").valueOf() || !checkout.datepicker("getDate").valueOf()) {
		
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate());
			
			
			$('#dp3').datepicker('update', newDate);
			$('#dp5').datepicker('update', newDate);
			if (ev.date.valueOf() > checkout.datepicker("getDate").valueOf() || !checkout.datepicker("getDate").valueOf()) {
				checkout.datepicker("update", newDate);
				checkout2.datepicker("update", newDate);
				checkout3.datepicker("update", newDate);
			}else if(ev.date.valueOf()+duration <= checkout.datepicker("getDate").valueOf()){
				var lastDate = new Date(ev.date.valueOf()+duration-oneDay);
				lastDate.setDate(lastDate.getDate());
				
				checkout.datepicker("update", lastDate);
				checkout2.datepicker("update", lastDate);
				checkout3.datepicker("update", lastDate);
			}else{
				var lastDate = new Date(checkout.datepicker("getDate").valueOf());
				lastDate.setDate(lastDate.getDate());
				
				checkout.datepicker("update", lastDate);
				checkout2.datepicker("update", lastDate);
				checkout3.datepicker("update", lastDate);
			}
			//checkout.datepicker("setEndDate", new Date(checkin.datepicker("getDate").valueOf() + duration));
			
		//}
		
		
		
			$('#dp2')[0].focus();
			var startDate = new Date($('#dp1').datepicker("getDate").valueOf());
			var endDate = new Date($('#dp2').datepicker("getDate").valueOf());
			/*document.getElementById("divPersonsDesk").style.visibility = "visible";
			document.getElementById("lblDaysDesk").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);*/
	    
		
			
			
			$('#dp2-detail-page').datepicker('update', newDate);
		
		
				
			//-------------------------------------------------------------------------------ajax
			var path = window.location.href;		
			
			var end = path.indexOf('flight-insurance');
			var fullPath = "";				
			
			if(end>0){
				fullPath = path.substring(0, end) + "flight-insurance/quote";	
//				$.ajax({
//					  type: "POST",
//					  url: fullPath,
//					  data: { 'departureDate': dateFormate(startDate),
//						  	  'returnDate': dateFormate(endDate),
//						  	  'totalAdultTraveller':'',
//						  	  'totalChildTraveller':'',					  	  
//						  	  'days':'',
//						  	  'travellerCount':'',
//						  	  'ToalDue':'1',
//						  	  'planSelected':''					  	 
//					  },					  				  							  
//					  success: function(){					 					 
//					  }
//				
//				});
				
			}else{
				end = path.indexOf('travel-insurance')
				fullPath = path.substring(0, end) + "travel-insurance/quote";	
				
				
//				$.ajax({
//					  type: "POST",
//					  url: fullPath,
//					  data: { 'trLeavingDate': dateFormate(startDate),
//						  	  'trBackDate': dateFormate(endDate),
//						  	  'totalAdultTraveller':'',
//						  	  'totalChildTraveller':'',					  	  
//						  	  'days':'',
//						  	  'travellerCount':'',
//						  	  'ToalDue':'1',
//						  	  'planSelected':''					  	 
//					  },					  				  							  
//					  success: function(){					 					 
//					  }
//				
//				});
			}
			
			
					
			
							
			//-------------------------------------------------------------------------------ajax			
			
			
			
			
	
			if($(this).hasClass("bmg-flight-inline-dp1")){
				updateFlightQuote();
			}else if($(this).hasClass("bmg-travel-inline-dp1")){
				updateTravelQuote();
			}
	});
	
	checkout = $('#dp2').datepicker({
		beforeShowDay: function (date) {
			if (!checkin.datepicker("getDate").valueOf()) {

				return date.valueOf() >= new Date().valueOf() && date.valueOf() < tillDate_from;
			} else {
				
				return date.valueOf() >= checkin.datepicker("getDate").valueOf() && date.valueOf() < checkin.datepicker("getDate").valueOf()+duration;
			}
		},
		autoclose: true,
		
		format: "dd-mm-yyyy"

	}).on('changeDate', function (ev) {
		var startDate = new Date($('#dp1').datepicker("getDate").valueOf());
		var endDate = new Date($('#dp2').datepicker("getDate").valueOf());
		/*document.getElementById("divPersonsDesk").style.visibility = "visible";
		document.getElementById("lblDaysDesk").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);*/

		if (ev.date.valueOf() < checkin.datepicker("getDate").valueOf() || !checkin.datepicker("getDate").valueOf()) {
			checkin.datepicker("update", endDate);
			checkin2.datepicker("update", endDate);
			checkin3.datepicker("update", endDate);
		}
		
		$('#dp4').datepicker('update', endDate);
		$('#dp6').datepicker('update', endDate);
		
		
		//-------------------------------------------------------------------------------ajax		
		//-------------------------------------------------------------------------------ajax
		var path = window.location.href;		
		
		var end = path.indexOf('flight-insurance');
		var fullPath = "";				
		
		if(end>0){
			fullPath = path.substring(0, end) + "flight-insurance/quote";	
//			$.ajax({
//				  type: "POST",
//				  url: fullPath,
//				  data: { 'departureDate': dateFormate(startDate),
//					  	  'returnDate': dateFormate(endDate),
//					  	  'totalAdultTraveller':'',
//					  	  'totalChildTraveller':'',					  	  
//					  	  'days':'',
//					  	  'travellerCount':'',
//					  	  'ToalDue':'1',
//					  	  'planSelected':''					  	 
//				  },					  				  							  
//				  success: function(){					 					 
//				  }
//			
//			});
			
		}
		
		else{
			
			 end = path.indexOf('travel-insurance')
			
			fullPath = path.substring(0, end) + "travel-insurance/quote";	
			
			
//			$.ajax({
//				  type: "POST",
//				  url: fullPath,
//				  data: { 'trLeavingDate': dateFormate(startDate),
//					  	  'trBackDate': dateFormate(endDate),
//					  	  'totalAdultTraveller':'',
//					  	  'totalChildTraveller':'',					  	  
//					  	  'days':'',
//					  	  'travellerCount':'',
//					  	  'ToalDue':'1',
//					  	  'planSelected':''					  	 
//				  },					  				  							  
//				  success: function(){					 					 
//				  }
//			
//			});
			
			
		}
		
		
				
		
						
		//-------------------------------------------------------------------------------ajax		
		
				
		
						
		//-------------------------------------------------------------------------------ajax			
		//-------------------------------------------------------------------------------ajax			
		
		if($(this).hasClass("bmg-flight-inline-dp2")){
			updateFlightQuote();
		}else if($(this).hasClass("bmg-travel-inline-dp2")){
			updateTravelQuote();
		}
	});



	/* mobile datepicker */
	var checkin2 = $('#dp3').datepicker({
		beforeShowDay: function (date) {
			//return date.valueOf() >= now.valueOf();
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from;
		},
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy"

	}).on('changeDate', function (ev) {
		//if (ev.date.valueOf() > checkout2.datepicker("getDate").valueOf() || !checkout2.datepicker("getDate").valueOf()) {
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate());
			
			$('#dp1').datepicker('update', newDate);
			$('#dp5').datepicker('update', newDate);
			
			if (ev.date.valueOf() > checkout2.datepicker("getDate").valueOf() || !checkout2.datepicker("getDate").valueOf()) {
				checkout.datepicker("update", newDate);
				checkout2.datepicker("update", newDate);
				checkout3.datepicker("update", newDate);
			}else if(ev.date.valueOf()+duration <= checkout2.datepicker("getDate").valueOf()){
				var lastDate = new Date(ev.date.valueOf()+duration-oneDay);
				lastDate.setDate(lastDate.getDate());
				
				checkout.datepicker("update", lastDate);
				checkout2.datepicker("update", lastDate);
				checkout3.datepicker("update", lastDate);
			}else{
				var lastDate = new Date(checkout2.datepicker("getDate").valueOf());
				lastDate.setDate(lastDate.getDate());
				
				checkout.datepicker("update", lastDate);
				checkout2.datepicker("update", lastDate);
				checkout3.datepicker("update", lastDate);
			}
		//}
		$('#dp4')[0].focus();

		var startDate = new Date($('#dp3').datepicker("getDate").valueOf());
		var endDate = new Date($('#dp4').datepicker("getDate").valueOf());
		document.getElementById("divPersonsMob").style.visibility = "visible";
		document.getElementById("lblDaysMob").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);

		
	});
	var checkout2 = $('#dp4').datepicker({
		beforeShowDay: function (date) {
//			if (!checkin2.datepicker("getDate").valueOf()) {
//				return date.valueOf() >= new Date().valueOf();
//			} else {
//				return date.valueOf() >= checkin2.datepicker("getDate").valueOf();
//			}
			if (!checkin2.datepicker("getDate").valueOf()) {

				return date.valueOf() >= new Date().valueOf() && date.valueOf() < tillDate_from;
			} else {
				
				return date.valueOf() >= checkin2.datepicker("getDate").valueOf() && date.valueOf() < checkin2.datepicker("getDate").valueOf()+duration;
			}
		},
		autoclose: true,
		format: "dd-mm-yyyy"

	}).on('changeDate', function (ev) {

		var startDate = new Date($('#dp3').datepicker("getDate").valueOf());
		var endDate = new Date($('#dp4').datepicker("getDate").valueOf());
		document.getElementById("divPersonsMob").style.visibility = "visible";
		document.getElementById("lblDaysMob").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);

		if (ev.date.valueOf() < checkin2.datepicker("getDate").valueOf() || !checkin2.datepicker("getDate").valueOf()) {
			checkin.datepicker("update", endDate);
			checkin2.datepicker("update", endDate);
			checkin3.datepicker("update", endDate);
		}
		
		$('#dp2').datepicker('update', endDate);
		$('#dp6').datepicker('update', endDate);
	});



	/* bottom datepicker */
	var checkin3 = $('#dp5').datepicker({
		beforeShowDay: function (date) {
			//return date.valueOf() >= now.valueOf();
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from;
		},
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy"

	}).on('changeDate', function (ev) {
		//if (ev.date.valueOf() > checkout3.datepicker("getDate").valueOf() || !checkout3.datepicker("getDate").valueOf()) {
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate());
			
			if (ev.date.valueOf() > checkout3.datepicker("getDate").valueOf() || !checkout3.datepicker("getDate").valueOf()) {
				checkout.datepicker("update", newDate);
				checkout2.datepicker("update", newDate);
				checkout3.datepicker("update", newDate);
			}else if(ev.date.valueOf()+duration <= checkout3.datepicker("getDate").valueOf()){
				var lastDate = new Date(ev.date.valueOf()+duration-oneDay);
				lastDate.setDate(lastDate.getDate());
				
				checkout.datepicker("update", lastDate);
				checkout2.datepicker("update", lastDate);
				checkout3.datepicker("update", lastDate);
			}else{
				var lastDate = new Date(checkout3.datepicker("getDate").valueOf());
				lastDate.setDate(lastDate.getDate());
				
				checkout.datepicker("update", lastDate);
				checkout2.datepicker("update", lastDate);
				checkout3.datepicker("update", lastDate);
			}
			
			$('#dp1').datepicker('update', newDate);
			$('#dp3').datepicker('update', newDate);
			
		//}
		$('#dp6')[0].focus();
		var startDate = new Date($('#dp5').datepicker("getDate").valueOf());
		var endDate = new Date($('#dp6').datepicker("getDate").valueOf());
		document.getElementById("divPersonsBtm").style.visibility = "visible";
		document.getElementById("lblDaysBtm").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);

		
	});
	var checkout3 = $('#dp6').datepicker({
		beforeShowDay: function (date) {
//			if (!checkin3.datepicker("getDate").valueOf()) {
//
//				return date.valueOf() >= new Date().valueOf();
//			} else {
//				return date.valueOf() >= checkin3.datepicker("getDate").valueOf();
//			}
			if (!checkin3.datepicker("getDate").valueOf()) {

				return date.valueOf() >= new Date().valueOf() && date.valueOf() < tillDate_from;
			} else {
				
				return date.valueOf() >= checkin3.datepicker("getDate").valueOf() && date.valueOf() < checkin3.datepicker("getDate").valueOf()+duration;
			}
		},
		autoclose: true,
		format: "dd-mm-yyyy"

	}).on('changeDate', function (ev) { 

		var startDate = new Date($('#dp5').datepicker("getDate").valueOf());
		var endDate = new Date($('#dp6').datepicker("getDate").valueOf());
		document.getElementById("divPersonsBtm").style.visibility = "visible";
		document.getElementById("lblDaysBtm").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);

		if (ev.date.valueOf() < checkin3.datepicker("getDate").valueOf() || !checkin3.datepicker("getDate").valueOf()) {
			checkin.datepicker("update", endDate);
			checkin2.datepicker("update", endDate);
			checkin3.datepicker("update", endDate);
		}
		
		$('#dp2').datepicker('update', endDate);
		$('#dp4').datepicker('update', endDate);
	});
	
	/**
	 * travel detepicker
	 */
	var tcheckin = $('#tdp1').datepicker({
		beforeShowDay: function (date) {
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from;
		},
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy",
	}).on('changeDate', function (ev) {
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate());
			$('#tdp3').datepicker('update', newDate);
			$('#tdp5').datepicker('update', newDate);
			if (ev.date.valueOf() > tcheckout.datepicker("getDate").valueOf() || !tcheckout.datepicker("getDate").valueOf()) {
				tcheckout.datepicker("update", newDate);
				tcheckout2.datepicker("update", newDate);
				tcheckout3.datepicker("update", newDate);
			}else if(ev.date.valueOf()+duration <= tcheckout.datepicker("getDate").valueOf()){
				var lastDate = new Date(ev.date.valueOf()+duration-oneDay);
				lastDate.setDate(lastDate.getDate());
				
				tcheckout.datepicker("update", lastDate);
				tcheckout2.datepicker("update", lastDate);
				tcheckout3.datepicker("update", lastDate);
			}else{
				var lastDate = new Date(tcheckout.datepicker("getDate").valueOf());
				lastDate.setDate(lastDate.getDate());
				
				tcheckout.datepicker("update", lastDate);
				tcheckout2.datepicker("update", lastDate);
				tcheckout3.datepicker("update", lastDate);
			}
			$('#tdp2')[0].focus();
			var startDate = new Date($('#tdp1').datepicker("getDate").valueOf());
			var endDate = new Date($('#tdp2').datepicker("getDate").valueOf());
			var path = window.location.href;		
			var end = path.indexOf('flight-insurance');
			var fullPath = "";				
			
			if(end>0){
				fullPath = path.substring(0, end) + "flight-insurance/quote";	
			}else{
				end = path.indexOf('travel-insurance')
				fullPath = path.substring(0, end) + "travel-insurance/quote";	
			}
	});
	tcheckout = $('#tdp2').datepicker({
		beforeShowDay: function (date) {
			if (!tcheckin.datepicker("getDate").valueOf()) {
				return date.valueOf() >= new Date().valueOf() && date.valueOf() < tillDate_from_travel;
			} else {
				return date.valueOf() >= tcheckin.datepicker("getDate").valueOf() && date.valueOf() < tcheckin.datepicker("getDate").valueOf()+180*24*60*60*1000;
			}
		},
		autoclose: true,
		format: "dd-mm-yyyy"
	}).on('changeDate', function (ev) {
		var startDate = new Date($('#tdp1').datepicker("getDate").valueOf());
		var endDate = new Date($('#tdp2').datepicker("getDate").valueOf());
		$('#tdp4').datepicker('update', endDate);
		$('#tdp6').datepicker('update', endDate);
		var path = window.location.href;		
		var end = path.indexOf('flight-insurance');
		var fullPath = "";				
		if(end>0){
			fullPath = path.substring(0, end) + "flight-insurance/quote";	
		}else{
			 end = path.indexOf('travel-insurance')
			fullPath = path.substring(0, end) + "travel-insurance/quote";	
		}
	});
	var tcheckin2 = $('#tdp3').datepicker({
		beforeShowDay: function (date) {
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from;
		},
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy"

	}).on('changeDate', function (ev) {
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate());
			$('#tdp1').datepicker('update', newDate);
			$('#tdp5').datepicker('update', newDate);
			if (ev.date.valueOf() > tcheckout2.datepicker("getDate").valueOf() || !tcheckout2.datepicker("getDate").valueOf()) {
				tcheckout.datepicker("update", newDate);
				tcheckout2.datepicker("update", newDate);
				tcheckout3.datepicker("update", newDate);
			}else if(ev.date.valueOf()+duration <= tcheckout2.datepicker("getDate").valueOf()){
				var lastDate = new Date(ev.date.valueOf()+duration-oneDay);
				lastDate.setDate(lastDate.getDate());
				tcheckout.datepicker("update", lastDate);
				tcheckout2.datepicker("update", lastDate);
				tcheckout3.datepicker("update", lastDate);
			}else{
				var lastDate = new Date(tcheckout2.datepicker("getDate").valueOf());
				lastDate.setDate(lastDate.getDate());
				tcheckout.datepicker("update", lastDate);
				tcheckout2.datepicker("update", lastDate);
				tcheckout3.datepicker("update", lastDate);
			}
		$('#tdp4')[0].focus();
		var startDate = new Date($('#tdp3').datepicker("getDate").valueOf());
		var endDate = new Date($('#tdp4').datepicker("getDate").valueOf());
		document.getElementById("divPersonsMob").style.visibility = "visible";
		document.getElementById("lblDaysMob").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
	});
	var tcheckout2 = $('#tdp4').datepicker({
		beforeShowDay: function (date) {
			if (!tcheckin2.datepicker("getDate").valueOf()) {
				return date.valueOf() >= new Date().valueOf() && date.valueOf() < tillDate_from_travel;
			} else {
				return date.valueOf() >= tcheckin2.datepicker("getDate").valueOf() && date.valueOf() < tcheckin2.datepicker("getDate").valueOf()+180*24*60*60*1000;;
			}
		},
		autoclose: true,
		format: "dd-mm-yyyy"
	}).on('changeDate', function (ev) {
		var startDate = new Date($('#tdp3').datepicker("getDate").valueOf());
		var endDate = new Date($('#tdp4').datepicker("getDate").valueOf());
		document.getElementById("divPersonsMob").style.visibility = "visible";
		document.getElementById("lblDaysMob").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
		$('#tdp2').datepicker('update', endDate);
		$('#tdp6').datepicker('update', endDate);
	});

	var tcheckin3 = $('#tdp5').datepicker({
		beforeShowDay: function (date) {
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from;
		},
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy"
	}).on('changeDate', function (ev) {
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate());
			
			if (ev.date.valueOf() > tcheckout3.datepicker("getDate").valueOf() || !tcheckout3.datepicker("getDate").valueOf()) {
				tcheckout.datepicker("update", newDate);
				tcheckout2.datepicker("update", newDate);
				tcheckout3.datepicker("update", newDate);
			}else if(ev.date.valueOf()+duration <= tcheckout3.datepicker("getDate").valueOf()){
				var lastDate = new Date(ev.date.valueOf()+duration-oneDay);
				lastDate.setDate(lastDate.getDate());
				
				tcheckout.datepicker("update", lastDate);
				tcheckout2.datepicker("update", lastDate);
				tcheckout3.datepicker("update", lastDate);
			}else{
				var lastDate = new Date(tcheckout3.datepicker("getDate").valueOf());
				lastDate.setDate(lastDate.getDate());
				
				tcheckout.datepicker("update", lastDate);
				tcheckout2.datepicker("update", lastDate);
				tcheckout3.datepicker("update", lastDate);
			}
			
			$('#tdp1').datepicker('update', newDate);
			$('#tdp3').datepicker('update', newDate);
		$('#tdp6')[0].focus();
		var startDate = new Date($('#tdp5').datepicker("getDate").valueOf());
		var endDate = new Date($('#tdp6').datepicker("getDate").valueOf());
		document.getElementById("divPersonsBtm").style.visibility = "visible";
		document.getElementById("lblDaysBtm").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
	});
	var tcheckout3 = $('#tdp6').datepicker({
		beforeShowDay: function (date) {
			if (!tcheckin3.datepicker("getDate").valueOf()) {

				return date.valueOf() >= new Date().valueOf() && date.valueOf() < tillDate_from_travel;
			} else {
				return date.valueOf() >= tcheckin3.datepicker("getDate").valueOf() && date.valueOf() < tcheckin3.datepicker("getDate").valueOf()+180*24*60*60*1000;;
			}
		},
		autoclose: true,
		format: "dd-mm-yyyy"
	}).on('changeDate', function (ev) { 
		var startDate = new Date($('#tdp5').datepicker("getDate").valueOf());
		var endDate = new Date($('#tdp6').datepicker("getDate").valueOf());
		document.getElementById("divPersonsBtm").style.visibility = "visible";
		document.getElementById("lblDaysBtm").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
		$('#tdp2').datepicker('update', endDate);
		$('#tdp4').datepicker('update', endDate);
	});
});//]]>  

/* No spinner */




function dateDiffInDays(a, b) {
	// Discard the time and time-zone information.
	var diffDays = (b - a) / 1000 / 60 / 60 / 24;
	return diffDays + 1;
}


/* login popup and overlay scirpt */


/*$("#fwd-login").on('click', function (e) {
	if (!$('#overlay').length) {
		$('body').append('<div id="overlay"> </div>')
	}
})
$('body').click(function (e) {
	if (!$(e.target).is('#fwd-login')) {
		$('#overlay').remove();
	}
})*/

$('#myDropdown .dropdown-menu,#myDropdownMob .dropdown-menu').on({
	"click": function (e) {
		e.stopPropagation();
	}
});
$('#myFWDropdown .dropdown-menu,#myFWDropdownMob .dropdown-menu,#myFWDropdownBtm .dropdown-menu').on({
	"click": function (e) {
		e.stopPropagation();
	}
});
$('#travelTypeDropdown .dropdown-menu,#travelTypeDropdownMob .dropdown-menu,#travelTypeDropdownBtm .dropdown-menu').on({
	"click": function (e) {
		/*e.stopPropagation();*/
	}
});

function setDropDownValue(elm, val){
	var dropdown = $(elm).closest(".simulate-drop-down");
	dropdown.find(".select-label").html($(elm).html());
	dropdown.find("[role=value]").val(val);
}

/* flight plan details your details validation */

function fPlanValid()
{
	var flag=true;
	$('#chk1').html('');
	$('#chk2').html('');
	
	$('#dobInvalid').html('');
	
	if($("#inputFullName").val().trim()==namePlaceholder.trim()){
    	$("#inputFullName").val('');
    }
	if($("#inputTxtAppHkid").val().trim()==hkidPlaceholder.trim()){
    	$("#inputTxtAppHkid").val('');
    }
	
	
	var fullname = document.getElementById("inputFullName").value;
	var emailId = document.getElementById("inputEmailId").value;
	var mobileNo = document.getElementById("inputMobileNo").value;
	var appHkid = document.getElementById("inputTxtAppHkid").value;
	var applicantDob = document.getElementById("applicantDob").value;

	
	//first error element
	var firstErrorElementId="";
	
	

	


    if (fullname.trim() == "") {
    	document.getElementById("fullnameinvalid").innerHTML = getBundle(getBundleLanguage, "applicant.name.notNull.message");
    	$("#inputFullName").addClass("invalid-field");
    	if(firstErrorElementId==""){
			firstErrorElementId="inputFullName";
		}
        flag = false;
    }
    
    if (appHkid.trim() == "") {
    	document.getElementById("errAppHkid").innerHTML = getBundle(getBundleLanguage, "applicant.hkId.notNull.message");
    	$("#inputTxtAppHkid").addClass("invalid-field");
    	if(firstErrorElementId==""){
			firstErrorElementId="inputTxtAppHkid";
		}
        flag = false;
    }
	else
	{
		var tr=IsHKID(appHkid.trim());
		if(tr==false)
		{
				
			document.getElementById("errAppHkid").innerHTML = getBundle(getBundleLanguage, "applicant.hkId.notValid.message");
			$("#inputTxtAppHkid").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="inputTxtAppHkid";
			}
        	flag = false;
		}
	}
    
    if (applicantDob.trim() == "") {
        document.getElementById("dobInvalid").innerHTML = getBundle(getBundleLanguage, "applicant.dob.notNull.message");
        $("#input_dob").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="input_dob";
		}
        flag = false;
    } else {
		 var age = document.getElementById("selectAgeRange1").value;
		 var applicantDobs = new Array();
		 applicantDobs = applicantDob.split("-");
		 var applicantDob1 = new Date(applicantDobs[2],applicantDobs[1] - 1,applicantDobs[0], 0, 0, 0, 0);
		 var applicantDobDate = new Date(applicantDob1);
		 var today = new Date();

		 var insured1Hkid = document.getElementById("txtInsuHkid1").value;
		 
		 var difference = Math.abs(today - applicantDobDate);
		 difference = Math.floor((difference + 1000 * 3600 * 24) / (1000 * 3600 * 24 * 365.25)); 
         // check only when same "id" found
		 if (age == 1) {
			 if ( difference > 18) {
				 $('#dobInvalid').html(getBundle(getBundleLanguage, "applicant.dob.notValid.message"));
				 $("#input_dob").addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="input_dob";
					}
			     flag = false;		 
			 }  
		 } else if (age == 2) {
			 if ( difference < 18 || difference > 70) {
				 $('#dobInvalid').html(getBundle(getBundleLanguage, "applicant.dob.notValid.message"));
				 $("#input_dob").addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="input_dob";
					}
			     flag = false;		 
			 }
		 } else if (age == 3) {
			 if ( difference < 71 || difference > 85) {
				 $('#dobInvalid').html(getBundle(getBundleLanguage, "applicant.dob.notValid.message"));
				 $("#input_dob").addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="input_dob";
					}
			     flag = false;		 
			 }
		 }
	 }
    
    if (mobileNo.trim() == "") {
        document.getElementById("mobileNoInvalid").innerHTML = getBundle(getBundleLanguage, "applicant.mobileNo.notNull.message");
        $("#inputMobileNo").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="inputMobileNo";
		}
        flag = false;
    }
    else {        
        if (mobile_pattern.test(mobileNo) == false) {
            document.getElementById("mobileNoInvalid").innerHTML = getBundle(getBundleLanguage, "applicant.mobileNo.notValid.message");
            $("#inputMobileNo").addClass("invalid-field");
            if(firstErrorElementId==""){
    			firstErrorElementId="inputMobileNo";
    		}
            flag = false;
        }
    }

    if (emailId.trim() == "") {
        document.getElementById("emailid").innerHTML = getBundle(getBundleLanguage, "applicant.email.notNull.message");
        $("#inputEmailId").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="inputEmailId";
		}
        flag = false;
    }
    else {
        if (emailreg.test(emailId) == false) {
            document.getElementById("emailid").innerHTML = getBundle(getBundleLanguage, "applicant.email.notValid.message");
            $("#inputEmailId").addClass("invalid-field");
            if(firstErrorElementId==""){
    			firstErrorElementId="inputEmailId";
    		}
            flag = false;
        }
    }
    
   
// bug fix - avoid unnecessary validation if the user already login
	var isLogin = document.getElementById("isLogin").value;
	if (!isLogin)
	{
	   if( verifyUserBookingRegistration() === false)
		   flag = false;
	}
	


	var rowCountAdult=document.getElementById("totalAdultTraveler").value;
	var rowCountChild=document.getElementById("totalCountOfChild").value;
	var rowCountOther=document.getElementById("totalCountOther").value;
	var rowCountPersonal=document.getElementById("totalPersonalTraveller").value;

	for (var i = 1; i <= parseInt(rowCountPersonal) ; i++)
	{
		if($("#txtInsuFullName" + i).val().trim()==insureNamePlaceholder.trim()){
	    	$("#txtInsuFullName" + i).val('');
	    }
		if($("#txtInsuHkid" + i).val().trim()==insureHkidPlaceholder.trim()){
	    	$("#txtInsuHkid" + i).val('');
	    }
		
		var fullname = document.getElementById("txtInsuFullName" + i).value;
		if (fullname.trim() == "") {
			document.getElementById("errtxtPersonalFullName" + i).innerHTML = getBundle(getBundleLanguage, "insured.name.notNull.message"); //"Please enter Insured Person's Name in English.";
			$("#txtInsuFullName"+i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="txtInsuFullName"+i;
			}
			flag = false;
		}else{
			document.getElementById("errtxtPersonalFullName" + i).innerHTML = "";
		}
		
		var age = document.getElementById("selectAgeRange" + i).value;
		if (age.trim() == "" || age.trim() == 0) {
			document.getElementById("errselectAgeRange" + i).innerHTML = getBundle(getBundleLanguage, "insured.age.notValid.message");
			$("#selectAgeRange"+i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="selectAgeRange"+i;
			}
			flag = false;
		}else{
			document.getElementById("errselectAgeRange" + i).innerHTML = "";
		}
		var hkid = document.getElementById("txtInsuHkid" + i).value;
		document.getElementById("errtxtInsuHkid" + i).innerHTML = "";
		if (hkid.trim() == "") {
			document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notNull.message"); // "Please enter Insured Person's HKID No.";
			$("#txtInsuHkid" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="txtInsuHkid"+i;
			}
			flag = false;
		}
		else
		{
			var tr=IsHKID(hkid.trim());
			if(tr==false)
			{
				document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notValid.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
				$("#txtInsuHkid" + i).addClass("invalid-field");
		        if(firstErrorElementId==""){
					firstErrorElementId="txtInsuHkid"+i;
				}
				flag = false;
			}
		}
		if (hkid.trim() != "") {
			for (var j = 1; j <= i-1; j++)
			{
				var hkid1 = document.getElementById("txtInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase())
				{	
					$('#errtxtInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid"+j;
					}
					flag = false;
				}
			}
			
			for (var j=1; j<=parseInt(rowCountChild);j++){
				var hkid1 = document.getElementById("txtChldInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase()){
					$('#errtxtChldInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtChldInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid"+j;
					}
					flag = false;
				}
			}

			for (var j=1; j<=parseInt(rowCountOther);j++){
				var hkid1 = document.getElementById("txtOtherInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase()){
					$('#errtxtOtherInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtOtherInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid"+j;
					}
					flag = false;
				}
			}
		}
		var selectedValue = document.getElementById("personalselectBenificiary" + i).value;
		var HkidPass = document.getElementById("personalBenefitiaryHKId"+i).value;
		var selectPersonalBenefitiaryHkidPass = document.getElementById("selectPersonalBenefitiaryHkidPass" + i).value;
		
		if($("#personalBenefitiaryId" + i).val().trim()==benNamePlaceholder.trim()){
	    	$("#personalBenefitiaryId" + i).val('');
	    }
		if($("#personalBenefitiaryHKId" + i).val().trim()==benHkidPlaceholder.trim()){
	    	$("#personalBenefitiaryHKId" + i).val('');
	    }
		
		
		if(selectedValue != "SE"){
			
//			if (HkidPass.trim() == "") {
//				document.getElementById("errpersonalBenefitiaryHKId" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message")
//				flag = false;
//			}
//			else
//			{
//				var tr=IsHKID(HkidPass.trim());
//				if(tr==false)
//				{
//					document.getElementById("errpersonalBenefitiaryHKId" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message");;
//					flag = false;
//				}
//			}
//			
			
			if (document.getElementById("personalBenefitiaryId" + i).value.trim() == "")
			{
				document.getElementById("errpersonalBenefitiaryId" + i).innerHTML= getBundle(getBundleLanguage, "beneficiary.name.notNull.message"); // getBundle(getBundleLanguage, "beneficiary.name.notNull.message");;
				$("#personalBenefitiaryId" + i).addClass("invalid-field");
		        if(firstErrorElementId==""){
					firstErrorElementId="personalBenefitiaryId"+i;
				}
				flag = false;             
			}
			else
			{
				document.getElementById("errpersonalBenefitiaryId" + i).innerHTML = "";
			}
			
			var hkida = document.getElementById("personalBenefitiaryHKId" + i).value;
			
			if (selectPersonalBenefitiaryHkidPass.toUpperCase() == 'HKID' ) {
				if (hkida.trim() == "") {
			    	$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			    	$("#personalBenefitiaryHKId" + i).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="personalBenefitiaryHKId"+i;
					}
			    	flag = false;
			    } else {
			    	if(IsHKID(hkida.trim())==false)
					{	
						$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
						$("#personalBenefitiaryHKId" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="personalBenefitiaryHKId"+i;
						}
						flag = false;
					} else if (hkid.toUpperCase() == HkidPass.toUpperCase()){
						$('#errpersonalBenefitiaryHKId'+i).html(getBundle(getBundleLanguage, "beneficiary.hkId.duplicate.message"));
						$("#personalBenefitiaryHKId" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="personalBenefitiaryHKId"+i;
						}
						flag = false;
					}	
			    }
					
				
			} else {
				if (hkida.trim() == "") {
					document.getElementById("errpersonalBenefitiaryHKId" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
					$("#personalBenefitiaryHKId" + i).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="personalBenefitiaryHKId"+i;
					}
					flag = false;
				} else {
					if(chkTravelHKPass(hkida.trim()) == false) {
						$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
						$("#personalBenefitiaryHKId" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="personalBenefitiaryHKId"+i;
						}
						flag = false;
					}
					if(chkTravelHKPassLen(hkida.trim()) == false) {
						$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
						$("#personalBenefitiaryHKId" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="personalBenefitiaryHKId"+i;
						}
			        	flag = false;
					}
				}

				
				
			}

		}
	}
	
	/* Adult Beneficiary validation */
	for (var i = 1; i <= parseInt(rowCountAdult) ; i++)
	{
		if($("#txtInsuFullName" + i).val().trim()==insureNamePlaceholder.trim()){
	    	$("#txtInsuFullName" + i).val('');
	    }
		if($("#txtInsuHkid" + i).val().trim()==insureHkidPlaceholder.trim()){
	    	$("#txtInsuHkid" + i).val('');
	    }
		

		var fullname = document.getElementById("txtInsuFullName" + i).value;
		if (fullname.trim() == "") {
			document.getElementById("errtxtAdFullName" + i).innerHTML = getBundle(getBundleLanguage, "insured.name.notNull.message"); //"Please enter Insured Person's Name in English.";
			$("#txtInsuFullName" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="txtInsuFullName"+i;
			}
			flag = false;
		}else{
			document.getElementById("errtxtAdFullName" + i).innerHTML = "";
		}

		var age = document.getElementById("selectAgeRange" + i).value;
		if (age.trim() == "" || age.trim() == 0) {
			document.getElementById("errselectAgeRange" + i).innerHTML = getBundle(getBundleLanguage, "insured.age.notValid.message");
			$("#selectAgeRange" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="selectAgeRange"+i;
			}
			flag = false;
		}else{
			document.getElementById("errselectAgeRange" + i).innerHTML = "";
		}



		var hkid = document.getElementById("txtInsuHkid" + i).value;
		document.getElementById("errtxtInsuHkid" + i).innerHTML = "";
		
		if (hkid.trim() == "") {
			document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notNull.message")
			$("#txtInsuHkid" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="txtInsuHkid"+i;
			}
			flag = false;
		}
		else
		{
			var tr=IsHKID(hkid.trim());
			if(tr==false)
			{
				document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
				$("#txtInsuHkid" + i).addClass("invalid-field");
		        if(firstErrorElementId==""){
					firstErrorElementId="txtInsuHkid"+i;
				}
				flag = false;
			}
		}
		
		
		if (hkid.trim() != "") {
			for (var j = 1; j <= i-1; j++)
			{
				var hkid1 = document.getElementById("txtInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase())
				{	
					$('#errtxtInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid"+j;
					}
					flag = false;
				}
			}
			
			for (var j=1; j<=parseInt(rowCountChild);j++){
				var hkid1 = document.getElementById("txtChldInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase()){
					$('#errtxtChldInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtChldInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid"+j;
					}
					flag = false;
				}
			}
			
			for (var j=1; j<=parseInt(rowCountOther);j++){
				var hkid1 = document.getElementById("txtOtherInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase()){
					$('#errtxtOtherInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtOtherInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid"+j;
					}
					flag = false;
				}
			}
		}
		
		var selectedValue = document.getElementById("adultsselectBenificiary" + i).value;
		var HkidPass = document.getElementById("adultBenefitiaryHKId"+i).value;

		
		var selectAdBenefitiaryHkidPass = document.getElementById("selectAdBenefitiaryHkidPass" + i).value;
		
		if($("#adultBenefitiaryId" + i).val().trim()==benNamePlaceholder.trim()){
	    	$("#adultBenefitiaryId" + i).val('');
	    }
		if($("#adultBenefitiaryHKId" + i).val().trim()==benHkidPlaceholder.trim()){
	    	$("#adultBenefitiaryHKId" + i).val('');
	    }
		
		if(selectedValue != "SE"){
			
//			if (HkidPass.trim() == "") {
//				document.getElementById("erradultBenefitiaryHKId" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message")
//				flag = false;
//			}
//			else
//			{
//				var tr=IsHKID(hkid.trim());
//				if(tr==false)
//				{
//					document.getElementById("erradultBenefitiaryHKId" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message");;
//					flag = false;
//				}
//			}
			
			if (document.getElementById("adultBenefitiaryId" + i).value == "")
			{
				document.getElementById("erradultBenefitiaryId" + i).innerHTML= getBundle(getBundleLanguage, "beneficiary.name.notNull.message"); // getBundle(getBundleLanguage, "beneficiary.name.notNull.message");;
				$("#adultBenefitiaryId" + i).addClass("invalid-field");
		        if(firstErrorElementId==""){
					firstErrorElementId="adultBenefitiaryId"+i;
				}
				flag = false;             
			}
			else
			{
				document.getElementById("erradultBenefitiaryId" + i).innerHTML = "";
			}
			
			var hkida = document.getElementById("adultBenefitiaryHKId" + i).value;

			if (selectAdBenefitiaryHkidPass.toUpperCase() == 'HKID' ) {				
				if (hkida.trim() == "") {
			    	$("#erradultBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			    	$("#adultBenefitiaryHKId" + i).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="adultBenefitiaryHKId"+i;
					}
			    	flag = false;
			    } else {
			    	if(IsHKID(hkida.trim())==false)
					{	
						$("#erradultBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
						$("#adultBenefitiaryHKId" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId"+i;
						}
						flag = false;
					} else if (hkid.toUpperCase() == HkidPass.toUpperCase()){
						$('#erradultBenefitiaryHKId'+i).html(getBundle(getBundleLanguage, "beneficiary.hkId.duplicate.message"));
						$("#adultBenefitiaryHKId" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId"+i;
						}
						flag = false;
					}	
			    }
				
					
				
			} else {
				if (hkida.trim() == "") {
					document.getElementById("erradultBenefitiaryHKId" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
					$("#adultBenefitiaryHKId" + i).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="adultBenefitiaryHKId"+i;
					}
					flag = false;
				} else {
					if(chkTravelHKPass(hkida.trim()) == false) {
						$("#erradultBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
						$("#adultBenefitiaryHKId" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId"+i;
						}
			        	flag = false;
					}
					if(chkTravelHKPassLen(hkida.trim()) == false) {
						$("#erradultBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
						$("#adultBenefitiaryHKId" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId"+i;
						}
			        	flag = false;
					}
				}

				
				
			}
			
			
		} 
			


	}

	/* Child Beneficiary validation */
	for (var i = 1; i <= parseInt(rowCountChild) ; i++)
	{
		
		if($("#txtChldFullName" + i).val().trim()==insureNamePlaceholder.trim()){
	    	$("#txtChldFullName" + i).val('');
	    }
		if($("#txtChldInsuHkid" + i).val().trim()==insureHkidPlaceholder.trim()){
	    	$("#txtChldInsuHkid" + i).val('');
	    }
		
		var fullname = document.getElementById("txtChldFullName" + i).value;
		var age = document.getElementById("selectchildAgeRange" + i).value;
		if (fullname.trim() == "") {
			document.getElementById("errtxtChldFullName" + i).innerHTML = getBundle(getBundleLanguage, "insured.name.notNull.message");
			$("#txtChldFullName" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="txtChldFullName"+i;
			}
			flag = false;
		}else{
			document.getElementById("errtxtChldFullName" + i).innerHTML = "";
		}

		if (age.trim() == "" || age.trim() == 0) {
			document.getElementById("errchildRange" + i).innerHTML = getBundle(getBundleLanguage, "insured.age.notValid.message"); // getBundle(getBundleLanguage, "insured.age.notValid.message");;
			$("#selectchildAgeRange" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="selectchildAgeRange"+i;
			}
			flag = false;
		}else{
			document.getElementById("errchildRange" + i).innerHTML = "";
		}
		
		
		
		
		var hkid = document.getElementById("txtChldInsuHkid" + i).value;
		
		
		
		if (hkid.trim() == "") {
			document.getElementById("errtxtChldInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notNull.message")
			$("#txtChldInsuHkid" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="txtChldInsuHkid"+i;
			}
			flag = false;
		}
		else
		{
			var tr=IsHKID(hkid.trim());
			if(tr==false)
			{
				document.getElementById("errtxtChldInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
				$("#txtChldInsuHkid" + i).addClass("invalid-field");
		        if(firstErrorElementId==""){
					firstErrorElementId="txtChldInsuHkid"+i;
				}
				flag = false;
			}
		}
		
		if (hkid.trim() != "") {
			
			for (var j = 1; j <= i-1; j++)
			{
				var hkid1 = document.getElementById("txtChldInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase())
				{	
					$('#errtxtChldInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtChldInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid"+j;
					}
					flag = false;
				}
			}
			for (var j=1; j<=parseInt(rowCountOther);j++){
				var hkid1 = document.getElementById("txtOtherInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase()){
					$('#errtxtOtherInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtOtherInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid"+j;
					}
					flag = false;
				}
			}
		}
		
		
		var selectedValue = document.getElementById("childselectBenificiary" + i).value;
		var HkidPass = document.getElementById("txtchildInsuHkid"+i).value;
		var selectedChldBenefitiaryHkidPass = document.getElementById("selectChldBenefitiaryHkidPass" + i).value;

		
		if($("#childBenefitiaryName" + i).val().trim()==benNamePlaceholder.trim()){
	    	$("#childBenefitiaryName" + i).val('');
	    }
		if($("#txtchildInsuHkid" + i).val().trim()==benHkidPlaceholder.trim()){
	    	$("#txtchildInsuHkid" + i).val('');
	    }
		
		if(selectedValue != "SE"){
			
//			if (HkidPass.trim() == "") {
//				document.getElementById("errtxtchildInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message")
//				flag = false;
//			}
//			else
//			{
//				var tr=IsHKID(HkidPass.trim());
//				if(tr==false)
//				{
//					document.getElementById("errtxtchildInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message");;
//					flag = false;
//				}
//			}
//			
			
			if (document.getElementById("childBenefitiaryName" + i).value == "")
			{
				document.getElementById("errchildBenefitiaryName" + i).innerHTML= getBundle(getBundleLanguage, "beneficiary.name.notNull.message"); // getBundle(getBundleLanguage, "beneficiary.name.notNull.message");;
				$("#childBenefitiaryName" + i).addClass("invalid-field");
		        if(firstErrorElementId==""){
					firstErrorElementId="childBenefitiaryName"+i;
				}
				flag = false;             
			}
			else
			{
				document.getElementById("errchildBenefitiaryName" + i).innerHTML = "";
			}
			
			var hkida = document.getElementById("txtchildInsuHkid" + i).value;
			if (selectedChldBenefitiaryHkidPass.toUpperCase() == 'HKID' ) {
				if (hkida.trim() == "") {
			    	$("#errtxtchildInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			    	$("#txtchildInsuHkid" + i).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtchildInsuHkid"+i;
					}
			    	flag = false;
			    } else {
					if(IsHKID(hkida.trim())==false)
					{	
						$("#errtxtchildInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
						$("#txtchildInsuHkid" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid"+i;
						}
						flag = false;
					} else if (hkid.toUpperCase() == HkidPass.toUpperCase()){
						$('#errtxtchildInsuHkid'+i).html(getBundle(getBundleLanguage, "beneficiary.hkId.duplicate.message"));
						$("#txtchildInsuHkid" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid"+i;
						}
						flag = false;
					}	
			    }
				
			} else {
				if (hkida.trim() == "") {
					document.getElementById("errtxtchildInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
					$("#txtchildInsuHkid" + i).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtchildInsuHkid"+i;
					}
					flag = false;
				} else {
					if(chkTravelHKPass(hkida.trim()) == false) {
						$("#errtxtchildInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
						$("#txtchildInsuHkid" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid"+i;
						}
						flag = false;
					}
					if(chkTravelHKPassLen(hkida.trim()) == false) {
						$("#errtxtchildInsuHkid" + i).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
						$("#txtchildInsuHkid" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid"+i;
						}
			        	flag = false;
					}
				}
			}
		}

	}

	/* Other Beneficiary validation */
	for (var i = 1; i <= parseInt(rowCountOther) ; i++)
	{
		if($("#txtOtherFullName" + i).val().trim()==insureNamePlaceholder.trim()){
	    	$("#txtOtherFullName" + i).val('');
	    }
		if($("#txtOtherInsuHkid" + i).val().trim()==insureHkidPlaceholder.trim()){
	    	$("#txtOtherInsuHkid" + i).val('');
	    }
		
		var hkid = document.getElementById("txtOtherInsuHkid" + i).value;
		var fullname = document.getElementById("txtOtherFullName" + i).value;
		var age = document.getElementById("selectOtherAgeRange" + i).value;
		if (fullname.trim() == "") {
			document.getElementById("errtxtOtherFullName" + i).innerHTML = getBundle(getBundleLanguage, "insured.name.notNull.message");
			$("#txtOtherFullName" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="txtOtherFullName"+i;
			}
			flag = false;
		}else{
			document.getElementById("errtxtOtherFullName" + i).innerHTML = "";
		}


		if (age.trim() == "" || age.trim() == 0) {
			document.getElementById("errselectOtherAgeRange" + i).innerHTML = getBundle(getBundleLanguage, "insured.age.notValid.message");
			$("#selectOtherAgeRange" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="selectOtherAgeRange"+i;
			}
			flag = false;
		}else{
			document.getElementById("errselectOtherAgeRange" + i).innerHTML = "";
		}

		if (hkid.trim() == "") {
			document.getElementById("errtxtOtherInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notNull.message")
			$("#txtOtherInsuHkid" + i).addClass("invalid-field");
	        if(firstErrorElementId==""){
				firstErrorElementId="txtOtherInsuHkid"+i;
			}
			flag = false;
		}
		else
		{
			var tr=IsHKID(hkid.trim());
			if(tr==false)
			{
				document.getElementById("errtxtOtherInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
				$("#txtOtherInsuHkid" + i).addClass("invalid-field");
		        if(firstErrorElementId==""){
					firstErrorElementId="txtOtherInsuHkid"+i;
				}
				flag = false;
			}
		}

		if (hkid.trim() != "") {
			for (var j = 1; j <= i-1 ; j++)
			{
				var hkid1 = document.getElementById("txtOtherInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase())
				{
					document.getElementById("errtxtOtherInsuHkid" + j).innerHTML = getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage");
					$("#txtOtherInsuHkid" + j).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid"+j;
					}
					flag = false;
				}
			}
		}

		if($("#otherBenefitiaryName" + i).val().trim()==benNamePlaceholder.trim()){
	    	$("#otherBenefitiaryName" + i).val('');
	    }
		if($("#txtOtherBenInsuHkid" + i).val().trim()==benHkidPlaceholder.trim()){
	    	$("#txtOtherBenInsuHkid" + i).val('');
	    }
		
		var selectedValue = document.getElementById("otherSelectBenificiary" + i).value;
		if(selectedValue != "SE"){
//			if (hkid.trim() == "") {
//				document.getElementById("errtxtOtherBenInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message")
//				flag = false;
//			}
//			else
//			{
//				var tr=IsHKID(hkid.trim());
//				if(tr==false)
//				{
//					document.getElementById("errtxtOtherBenInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message");;
//					flag = false;
//				}
//			}
			
			
			if (document.getElementById("otherBenefitiaryName" + i).value == "")
			{
				document.getElementById("errotherBenefitiaryName" + i).innerHTML=getBundle(getBundleLanguage, "beneficiary.name.notNull.message");
				$("#otherBenefitiaryName" + i).addClass("invalid-field");
		        if(firstErrorElementId==""){
					firstErrorElementId="otherBenefitiaryName"+i;
				}
				flag = false;             
			}
			else
			{
				document.getElementById("errotherBenefitiaryName" + i).innerHTML = "";
				
			}

			var hkidc = document.getElementById("txtOtherBenInsuHkid" + i).value;
			$("#errtxtOtherBenInsuHkid" + i).html("");
			var selectOtherBenefitiaryHkidPass = document.getElementById("selectOtherBenefitiaryHkidPass" + i).value;
			
			if (selectOtherBenefitiaryHkidPass.toUpperCase() == 'HKID' ) {
				if (hkidc.trim() == "") {
			    	$("#errtxtOtherBenInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			    	$("#txtOtherBenInsuHkid" + i).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtOtherBenInsuHkid"+i;
					}
			    	flag = false;
			    } else {
					if(IsHKID(hkidc.trim())==false)
					{	
						$("#errtxtOtherBenInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
						$("#txtOtherBenInsuHkid" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid"+i;
						}
						flag = false;
					} else if (hkid.toUpperCase() == hkidc.toUpperCase()){
						$('#errtxtOtherBenInsuHkid'+i).html(getBundle(getBundleLanguage, "beneficiary.hkId.duplicate.message"));
						$("#txtOtherBenInsuHkid" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid"+i;
						}
						flag = false;
					}	
			    }
				
			} else {
				if (hkidc.trim() == "") {
					document.getElementById("errtxtOtherBenInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
					$("#txtOtherBenInsuHkid" + i).addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="txtOtherBenInsuHkid"+i;
					}
					flag = false;
				} else {
					if(chkTravelHKPass(hkidc.trim()) == false) {
						$("#errtxtOtherBenInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
						$("#txtOtherBenInsuHkid" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid"+i;
						}
						flag = false;
					}
					if(chkTravelHKPassLen(hkidc.trim()) == false) {
						$("#errtxtOtherBenInsuHkid" + i).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
						$("#txtOtherBenInsuHkid" + i).addClass("invalid-field");
				        if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid"+i;
						}
			        	flag = false;
					}
				}
			}
		}
	}
	
	if (document.getElementById("checkbox1").checked == false) {
		document.getElementById("chk1").innerHTML = getBundle(getBundleLanguage, "travelcare.declaration.notChecked.message");
		if(firstErrorElementId==""){
			firstErrorElementId="checkbox1";
		}
		flag = false;
	}
	if (document.getElementById("checkbox2").checked == false) {
		document.getElementById("chk2").innerHTML = getBundle(getBundleLanguage, "homecare.tnc.notChecked.message");
		if(firstErrorElementId==""){
			firstErrorElementId="checkbox2";
		}
		flag = false;
	}
	
	if(firstErrorElementId!=""){
		scrollToElement(firstErrorElementId);
	}

	if(!flag){
		$('#loading-overlay').modal('hide');
	}

	return flag;

}

function allLetter(inputtxt) {
	var letters = /^[A-Za-z ]+$/;
	if (inputtxt.match(letters)) {
		
		return true;
	} else {
		
		return false;
	}
}

// bmg input fields validation START
function validateName(inputId, errorId, insureBoolean, inputType){
	var placeholder='';
	if(inputType=="applicant"){
		placeholder=namePlaceholder;
	}else if(inputType=="insured"){
		placeholder=insureNamePlaceholder;
	}else if(inputType=="beneficiary"){
		placeholder=benNamePlaceholder;
	}
	
	if($("#"+inputId).val()==placeholder.trim()){
		$("#"+inputId).val('');
    }
	
	var fullname = $("#"+inputId).val();
	
	if (fullname.trim() == "") {
		$("#"+inputId).addClass("invalid-field");
		if(inputType=="applicant"){
			$("#"+errorId).html( getBundle(getBundleLanguage, "applicant.name.notNull.message"));
		}else if(inputType=="insured"){
			$("#"+errorId).html( getBundle(getBundleLanguage, "insured.name.notNull.message"));
		}else if(inputType=="beneficiary"){
			$("#"+errorId).html( getBundle(getBundleLanguage, "beneficiary.name.notNull.message"));
		}
		$("#"+inputId).val(placeholder);
		return false;
	}
	if (allLetter(fullname) == false) {
		$("#"+inputId).addClass("invalid-field");
		if(inputType=="applicant"){
			$("#"+errorId).html( getBundle(getBundleLanguage, "applicant.name.notNull.message"));
		}else if(inputType=="insured"){
			$("#"+errorId).html( getBundle(getBundleLanguage, "insured.name.notNull.message"));
		}else if(inputType=="beneficiary"){
			$("#"+errorId).html( getBundle(getBundleLanguage, "beneficiary.name.notNull.message"));
		}
		return false;
	}
	if(insureBoolean){
		if (document.getElementById("applicantRelationship") != null) {
			if (document.getElementById("applicantRelationship").value == 'SE'){
				$("#txtInsuFullName1").val(fullname);
				$("#txtInsuFullName1").removeClass("bmg_custom_placeholder");
				
				$("#txtInsuFullName1").removeClass("invalid-field");
				$("#errtxtPersonalFullName1").html("");
				$("#errtxtAdFullName1").html("");
			}
		}
		else {
			$("#txtInsuFullName1").val(fullname);
			$("#txtInsuFullName1").removeClass("bmg_custom_placeholder");
			
			$("#txtInsuFullName1").removeClass("invalid-field");
			$("#errtxtPersonalFullName1").html("");
			$("#errtxtAdFullName1").html("");
		}
	}
	
	$("#"+errorId).html('');
	$("#"+inputId).removeClass("invalid-field");
}

function validateHkid(inputId, selectId, errorId, insureBoolean, inputType){
	var placeholder='';
	if(inputType=="applicant"){
		placeholder=hkidPlaceholder;
	}else if(inputType=="insured"){
		placeholder=insureHkidPlaceholder;
	}else if(inputType=="beneficiary"){
		placeholder=benHkidPlaceholder;
	}
	
	if($("#"+inputId).val()==placeholder.trim()){
		$("#"+inputId).val('');
    }
	
	$('#'+inputId).val($('#'+inputId).val().toUpperCase());
	var appHkid = $('#'+inputId).val();
	var mySelectId = $('#'+selectId).val();
	if($('#'+selectId).length > 0 && ($('#'+selectId).val().toLowerCase() == 'passport' || $('#'+selectId).val().toLowerCase() == 'apppassport')){
		if (appHkid.trim() == "") {
			$("#"+inputId).addClass("invalid-field");
			if(inputType=="applicant"){
				$('#'+errorId).html(getBundle(getBundleLanguage, "applicant.passport.notNull.message"));
			}else if(inputType=="insured"){
				$("#"+errorId).html(getBundle(getBundleLanguage, "insured.passport.lengthViolation.message"));
			}else if(inputType=="beneficiary"){
				$("#"+errorId).html(getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"));
			}
			return false;
		}else{
			var tr = chkTravelHKPassLen(appHkid.trim());
            var tr1 = chkTravelHKPass(appHkid.trim());
            
			if (tr == false) {
				$("#"+inputId).addClass("invalid-field");
				$('#'+errorId).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
				return false;
			}	
			if (tr1 == false) {
				$("#"+inputId).addClass("invalid-field");
				if(inputType=="applicant"){
					$('#'+errorId).html(getBundle(getBundleLanguage, "applicant.passport.notEnglish.message"));
				}else if(inputType=="insured"){
					$("#"+errorId).html(getBundle(getBundleLanguage, "insured.passport.notEnglish.message"));
				}else if(inputType=="beneficiary"){
					$("#"+errorId).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
				}			
				return false;						
			}
		}
	}else{
		if (appHkid.trim() == "") {
			$("#"+inputId).addClass("invalid-field");
			if(inputType=="applicant"){
				$('#'+errorId).html(getBundle(getBundleLanguage, "applicant.hkId.notNull.message"));
			}else if(inputType=="insured"){
				$("#"+errorId).html(getBundle(getBundleLanguage, "insured.hkId.notNull.message"));
			}else if(inputType=="beneficiary"){
				$("#"+errorId).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			}
			$("#"+inputId).val(placeholder);
			return false;
		}
		var tr=IsHKID(appHkid.trim());
		if(tr==false){
			$("#"+inputId).addClass("invalid-field");
			if(inputType=="applicant"){
				$('#'+errorId).html(getBundle(getBundleLanguage, "applicant.hkId.notValid.message"));
			}else if(inputType=="insured"){
				$("#"+errorId).html(getBundle(getBundleLanguage, "insured.hkId.notValid.message"));
			}else if(inputType=="beneficiary"){
				$("#"+errorId).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
			}	
			return false;
		}
	}
	
	if(insureBoolean){
		if (document.getElementById("applicantRelationship") != null) {
			if (document.getElementById("applicantRelationship").value == 'SE'){
				$("#txtInsuHkid1").val(appHkid);
				$("#txtInsuHkid1").removeClass("bmg_custom_placeholder");
			
				$("#txtInsuHkid1").removeClass("invalid-field");
				$("#errtxtInsuHkid1").html("");
			}
		}
		else {
			$("#txtInsuHkid1").val(appHkid);
			$("#txtInsuHkid1").removeClass("bmg_custom_placeholder");
		
			$("#txtInsuHkid1").removeClass("invalid-field");
			$("#errtxtInsuHkid1").html("");
		}
	}
	$('#'+errorId).html('');
	$("#"+inputId).removeClass("invalid-field");
}

function validateEmail(inputId, errorId, inputType){
	var emailId = $("#"+inputId).val();
	
	if (emailId.trim() == "" || emailId.trim() ==appEmailPlaceholder) {
		$("#"+inputId).addClass("invalid-field");
		$("#"+errorId).html(getBundle(getBundleLanguage, "applicant.email.notNull.message"));
		return false;
	} else if (emailreg.test(emailId) == false) {
		$("#"+inputId).addClass("invalid-field");
		$("#"+errorId).html(getBundle(getBundleLanguage, "applicant.email.notValid.message"));
		return false;
	}
	$("#"+errorId).html("");
	$("#"+inputId).removeClass("invalid-field");
	return true;
}

function validateMobile(inputId, errorId, inputType){
	var mobileNo = $("#"+inputId).val();
	
	if (mobileNo.trim() == "" || mobileNo.trim() ==appMobilePlaceholder) {
		$("#"+inputId).addClass("invalid-field");
		$("#"+errorId).html(getBundle(getBundleLanguage, "applicant.mobileNo.notNull.message"));
		return false;
	}else if (mobile_pattern.test(mobileNo) == false) {
		$("#"+inputId).addClass("invalid-field");
		$("#"+errorId).html(getBundle(getBundleLanguage, "applicant.mobileNo.notValid.message"));
		return false;
	}
	$("#"+errorId).html("");
	$("#"+inputId).removeClass("invalid-field");
	return true;
}


function validateDob(inputId, errorId, inputType){
	var dob = $("#"+inputId).val();
	
	if (dob.trim() == "") {
		$("#input_dob").addClass("invalid-field");
		$("#"+errorId).html(getBundle(getBundleLanguage, "applicant.dob.notNull.message"));
		return false;
	} else {
		$("#"+errorId).html("");	
	}
	
	$("#input_dob").removeClass("invalid-field");
}

//bmg input fields validation END



$(function () {
	if($('#inputFullName').length > 0){   // run only for the flight-plan-details page
		
//		$("#inputFullName").blur(function() {
//			var fullname = document.getElementById("inputFullName").value;
//			
//			if (fullname.trim() == "") {
//				$("#fullnameinvalid").html( getBundle(getBundleLanguage, "applicant.name.notNull.message"));//"Please enter your Name in English.";
//				return false;
//			}
//			if (allLetter(fullname) == false) {
//				
//				$("#fullnameinvalid")
//						.html(
//								getBundle(getBundleLanguage,
//										"applicant.name.notNull.message"));
//				return false;
//			}
//				
//			$("#txtAdFullName1").val($(this).val());
//			$("#fullnameinvalid").html('');
//		});
//		
//		$("#inputTxtAppHkid, #txtAppHkid").blur(function() {
//			var appHkid = $(this).val();
//				
//			if($('#selectHkidPass').length > 0 && ($('#selectHkidPass').val().toLowerCase() == 'passport' || $('#selectHkidPass').val().toLowerCase() == 'apppassport')){
//
//				if (appHkid.trim() == "") {
//					$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.missingHkidOrPassport.message"));
//					return false;
//				}else{
//					var tr = chkTravelHKPass(appHkid.trim());
//                    var tr1 = chkTravelHKPassLen(appHkid.trim());
//                    
//					if (tr == false) {
//						$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.passport.notEnglish.message"));
//						
//						return false;
//					}	
//					if (tr1 == false) {
//						$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
//						
//						return false;						
//					}
//				}
//				
//			}else{ 
//				if (appHkid.trim() == "") {
//					$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.hkId.notNull.message"));//"Please enter your Name in English.";
//					return false;
//				}
//				var tr=IsHKID(appHkid.trim());
//				if(tr==false)
//				{
//					$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.hkId.notValid.message"));
//					return false;
//				}
//			}
//			
//			$("#txtInsuHkid1").val($(this).val());
//			$('#errAppHkid').html('');
//		});
//		
//		$("#inputEmailId").blur(function() {
//			var emailId = $(this).val();
//			
//			if (emailId.trim() == "") {
//				$("#emailid").html(getBundle(getBundleLanguage, "applicant.email.notNull.message"));
//				return false;
//			} else {
//				if (emailreg.test(emailId) == false) {
//
//					$("#emailid").html(getBundle(getBundleLanguage, "applicant.email.notValid.message"));
//					return false;
//				}
//			}
//			$("#emailid").html("");
//			
//		});
//		
//		$("#inputMobileNo").blur(function() {
//			var mobileNo = $(this).val();
//			
//			if (mobileNo.trim() == "") {
//				$("#mobileNo").html(getBundle(getBundleLanguage, "applicant.mobileNo.notNull.message"));
//				return false;
//			}else {        
//				if (mobile_pattern.test(mobileNo) == false) {
//					$("#mobileNo").html(getBundle(getBundleLanguage, "applicant.mobileNo.notValid.message"));
//					return false;
//				}
//			}
//			$("#mobileNo").html("");
//		});
		
		// Adult Validation for the next 2 actions
		
//		$( "input[id^='txtAdFullName']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("txtAdFullName").pop(); 
//			  var fullname = $(this).val();
//				if (fullname.trim() == "") {
//					$("#errtxtAdFullName"+errNo).html( getBundle(getBundleLanguage, "insured.name.notNull.message"));//"Please enter your Name in English.";
//					return false;
//				}
//				$("#errtxtAdFullName"+errNo).html('');
//		});
//		
//		$( "input[id^='txtInsuHkid']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("txtInsuHkid").pop(); 
//				
//				var appHkid = $(this).val();
//				
//				
//				
//				if($('#selectedAdHkidPass'+errNo).length > 0 && $('#selectedAdHkidPass'+errNo).val().toLowerCase() == 'passport'){
//
//					if (appHkid.trim() == "") {
//						$("#errtxtInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.passport.lengthViolation.message"));
//						return false;
//					}else{
//						var tr = chkTravelHKPass(appHkid.trim());
//						if (tr == false) {
//							$("#errtxtInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.passport.notEnglish.message"));
//							
//							return false;
//						}	
//					}
//					
//				}else{ 
//				
//					if (appHkid.trim() == "") {
//						$("#errtxtInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.hkId.notNull.message"));//"Please enter your Name in English.";
//						return false;
//					}
//					var tr=IsHKID(appHkid.trim());
//					if(tr==false)
//					{
//						$("#errtxtInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.hkId.notValid.message"));
//						return false;
//					}
//				}
//				
//				$("#errtxtInsuHkid"+errNo).html('');
//				
//				
//				
//		});
		
		//Child Validation for the next 2 actions
		
//		$( "input[id^='txtChldFullName']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("txtChldFullName").pop(); 
//			  var fullname = $(this).val();
//				if (fullname.trim() == "") {
//					$("#errtxtChldFullName"+errNo).html( getBundle(getBundleLanguage, "insured.name.notNull.message"));//"Please enter your Name in English.";
//					return false;
//				}
//				
//				if (allLetter(fullname) == false) {
//					
//					$("#fullnameinvalid")
//							.html(
//									getBundle(getBundleLanguage,
//											"insured.name.notNull.message"));
//					return false;
//				}
//					
//				$("#errtxtChldFullName"+errNo).html('');
//		});
//		$( "input[id^='txtChldInsuHkid']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("txtChldInsuHkid").pop(); 
//				
//				var appHkid = $(this).val();
//				
//				
//				if($('#selectChldHkidPass'+errNo).length > 0 && $('#selectChldHkidPass'+errNo).val().toLowerCase() == 'passport'){
//
//					if (appHkid.trim() == "") {
//						$("#errtxtChldInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.passport.lengthViolation.message"));
//						return false;
//					}else{
//						var tr = chkTravelHKPass(appHkid.trim());
//						if (tr == false) {
//							$("#errtxtChldInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.passport.notEnglish.message"));
//							
//							return false;
//						}	
//					}
//					
//				}else{ 
//				
//					if (appHkid.trim() == "") {
//						$("#errtxtChldInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.hkId.notNull.message"));//"Please enter your Name in English.";
//						return false;
//					}
//					var tr=IsHKID(appHkid.trim());
//					if(tr==false)
//					{
//						$("#errtxtChldInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.hkId.notValid.message"));
//						return false;
//					}
//					
//				}
//				$("#errtxtChldInsuHkid"+errNo).html('');
//				
//		});
		
		// Others Validation for the next 2 actions
		
//		$( "input[id^='txtOtherFullName']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("txtOtherFullName").pop(); 
//			  var fullname = $(this).val();
//				if (fullname.trim() == "") {
//					$("#errtxtOtherFullName"+errNo).html( getBundle(getBundleLanguage, "insured.name.notNull.message"));//"Please enter your Name in English.";
//					return false;
//				}
//				$("#errtxtOtherFullName"+errNo).html('');
//		});
//		$( "input[id^='txtOtherInsuHkid']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("txtOtherInsuHkid").pop(); 
//				
//				var appHkid = $(this).val();
//				
//				if($('#selectOtHkidPass'+errNo).length > 0 && $('#selectOtHkidPass'+errNo).val().toLowerCase() == 'passport'){
//
//					if (appHkid.trim() == "") {
//						$("#errtxtOtherInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.passport.lengthViolation.message"));
//						return false;
//					}else{
//						var tr = chkTravelHKPass(appHkid.trim());
//						if (tr == false) {
//							$("#errtxtOtherInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.passport.notEnglish.message"));
//							
//							return false;
//						}	
//					}
//					
//				}else{ 
//				
//					if (appHkid.trim() == "") {
//						$("#errtxtOtherInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.hkId.notNull.message"));//"Please enter your Name in English.";
//						return false;
//					}
//					var tr=IsHKID(appHkid.trim());
//					if(tr==false)
//					{
//						$("#errtxtOtherInsuHkid"+errNo).html(getBundle(getBundleLanguage, "insured.hkId.notValid.message"));
//						return false;
//					}
//				}
//				$("#errtxtOtherInsuHkid"+errNo).html('');
//		});
		
		
		// Set the default values of Benefeciary to Self
		$('input[id^="childselectBenificiary"],input[id^="adultsselectBenificiary"],input[id^="otherSelectBenificiary"] ').each(function( index ) {
			  $(this).val('SE');
		});
		
		// Set the default values of the Age for child and adults
		
		
		
		
		// Adult Beneficiary Validation for the next 2 actions
		
//		$( "input[id^='adultBenefitiaryId']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("adultBenefitiaryId").pop(); 
//			  var fullname = $(this).val();
//				if (fullname.trim() == "" && $(this).parent().parent().hasClass('hide') == false) {
//					$("#erradultBenefitiaryId"+errNo).html( getBundle(getBundleLanguage, "beneficiary.name.notNull.message"));//"Please enter your Name in English.";
//					return false;
//				}
//				$("#erradultBenefitiaryId"+errNo).html('');
//		});
//		$( "input[id^='adultBenefitiaryHKId']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("adultBenefitiaryHKId").pop(); 
//				
//				var appHkid = $(this).val();
//				
//				if($('#selectAdBenefitiaryHkidPass'+errNo).length > 0 && $('#selectAdBenefitiaryHkidPass'+errNo).val().toLowerCase() == 'passport'){
//
//					if (appHkid.trim() == "") {
//						$("#erradultBenefitiaryHKId"+errNo).html(getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"));
//						return false;
//					}else{
//						var tr = chkTravelHKPass(appHkid.trim());
//						if (tr == false) {
//							$("#erradultBenefitiaryHKId"+errNo).html(getBundle(getBundleLanguage, "beneficiary.passport.lengthViolation.message"));
//							
//							return false;
//						}	
//					}
//					
//				}else{ 
//				
//					if (appHkid.trim() == "") {
//						$("#erradultBenefitiaryHKId"+errNo).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));//"Please enter your Name in English.";
//						return false;
//					}
//					var tr=IsHKID(appHkid.trim());
//					if(tr==false)
//					{
//						$("#erradultBenefitiaryHKId"+errNo).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
//						return false;
//					}
//				}
//				$("#erradultBenefitiaryHKId"+errNo).html('');
//		});
		
		// Child Beneficiary Validation for the next 2 actions
		
//		$( "input[id^='childBenefitiaryName']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("childBenefitiaryName").pop(); 
//			  var fullname = $(this).val();
//				if (fullname.trim() == "") {
//					$("#errchildBenefitiaryName"+errNo).html( getBundle(getBundleLanguage, "beneficiary.name.notNull.message"));//"Please enter your Name in English.";
//					return false;
//				}
//				$("#errchildBenefitiaryName"+errNo).html('');
//		});
//		$( "input[id^='txtchildInsuHkid']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("txtchildInsuHkid").pop(); 
//				
//				var appHkid = $(this).val();
//				
//				
//				if($('#selectChldBenefitiaryHkidPass'+errNo).length > 0 && $('#selectChldBenefitiaryHkidPass'+errNo).val().toLowerCase() == 'passport'){
//
//					if (appHkid.trim() == "") {
//						$("#errtxtchildInsuHkid"+errNo).html(getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"));
//						return false;
//					}else{
//						var tr = chkTravelHKPass(appHkid.trim());
//						if (tr == false) {
//							$("#errtxtchildInsuHkid"+errNo).html(getBundle(getBundleLanguage, "beneficiary.passport.lengthViolation.message"));
//							return false;
//						}	
//					}
//					
//				}else{ 
//				
//					if (appHkid.trim() == "") {
//						$("#errtxtchildInsuHkid"+errNo).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));//"Please enter your Name in English.";
//						return false;
//					}
//					var tr=IsHKID(appHkid.trim());
//					if(tr==false)
//					{
//						$("#errtxtchildInsuHkid"+errNo).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
//						return false;
//					}
//				}
//				$("#errtxtchildInsuHkid"+errNo).html('');
//		});
		
		// Others Beneficiary Validation for the next 2 actions
		
//		$( "input[id^='otherBenefitiaryName']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("otherBenefitiaryName").pop(); 
//			  var fullname = $(this).val();
//				if (fullname.trim() == "") {
//					$("#errotherBenefitiaryName"+errNo).html( getBundle(getBundleLanguage, "beneficiary.name.notNull.message"));//"Please enter your Name in English.";
//					return false;
//				}
//				$("#errotherBenefitiaryName"+errNo).html('');
//		});
//		$( "input[id^='txtOtherBenInsuHkid']" ).on( "change blur", function() {
//			  var errNo = $(this).attr('id').split("txtOtherBenInsuHkid").pop(); 
//				
//				var appHkid = $(this).val();
//				
//				if($('#selectOtherBenefitiaryHkidPass'+errNo).length > 0 && $('#selectOtherBenefitiaryHkidPass'+errNo).val().toLowerCase() == 'passport'){
//
//					if (appHkid.trim() == "") {
//						$("#errtxtOtherBenInsuHkid"+errNo).html(getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"));
//						return false;
//					}else{
//						var tr = chkTravelHKPass(appHkid.trim());
//						if (tr == false) {
//							$("#errtxtOtherBenInsuHkid"+errNo).html(getBundle(getBundleLanguage, "beneficiary.passport.lengthViolation.message"));
//							return false;
//						}	
//					}
//					
//				}else{ 
//					if (appHkid.trim() == "") {
//						$("#errtxtOtherBenInsuHkid"+errNo).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));//"Please enter your Name in English.";
//						return false;
//					}
//					var tr=IsHKID(appHkid.trim());
//					if(tr==false)
//					{
//						$("#errtxtOtherBenInsuHkid"+errNo).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
//						return false;
//					}
//				}
//				$("#errtxtOtherBenInsuHkid"+errNo).html('');
//		});	
	
	
		
		$('select[id^="selectOtherAgeRange"],select[id^="selectAgeRange"]').each(function( index ) {
			  $(this).val('2');
		});
		$('select[id^="selectchildAgeRange"]').each(function( index ) {
			  $(this).val('1');
		});
		
		$('select[id^="selectAgeRange"]').on( "change",function( index ) {
			  var errNo = $(this).attr('id').split("selectAgeRange").pop();
			  if($(this).val() == '' || $(this).val() == 0){
				  $('#errselectAgeRange'+errNo).html(getBundle(getBundleLanguage, "insured.age.notValid.message"));
			  }else{
				  $('#errselectAgeRange'+errNo).html("");
			  } 
		});
		$('select[id^="selectchildAgeRange"]').on( "change",function( index ) {
			  var errNo = $(this).attr('id').split("selectchildAgeRange").pop();
			  if($(this).val() == '' || $(this).val() == 0){
				  $('#errchildRange'+errNo).html(getBundle(getBundleLanguage, "insured.age.notValid.message"));
			  }else{
				  $('#errchildRange'+errNo).html("");
			  } 
		});		
		$('select[id^="selectOtherAgeRange"]').on( "change",function( index ) {
			  var errNo = $(this).attr('id').split("selectOtherAgeRange").pop();
			  if($(this).val() == '' || $(this).val() == 0){
				  $('#errselectOtherAgeRange'+errNo).html(getBundle(getBundleLanguage, "insured.age.notValid.message"));
			  }else{
				  $('#errselectOtherAgeRange'+errNo).html("");
			  } 
		});		
		

		
		/*if($('#selectAgeRange1').length > 0){
			$('#selectAgeRange1').val('2');
			//$('#selectAgeRange1').parent
		}
		
		
		if($('#selectchildAgeRange1').length > 0){
			$('#selectchildAgeRange1').val('1');
		}*/
		
	}
	
});




//Travel plan details page validation
var travelp_click = false;
function tPlanValid()
{
	if($("#inputFullName").val().trim()==namePlaceholder.trim()){
    	$("#inputFullName").val('');
    }
	if($("#inputTxtAppHkid").val().trim()==hkidPlaceholder.trim()){
    	$("#inputTxtAppHkid").val('');
    }

	var flag=true;
	document.getElementById("fullnameinvalid").innerHTML = "";
	document.getElementById("errAppHkid").innerHTML = "";
	document.getElementById("emailid").innerHTML = "";    
	document.getElementById("mobileNo").innerHTML = "";
	document.getElementById("dobInvalid").innerHTML = "";
	document.getElementById("chk1").innerHTML = "";
	document.getElementById("chk2").innerHTML = "";

	var fullname = document.getElementById("inputFullName").value;
	var emailId = document.getElementById("inputEmailId").value;
	var mobileNo = document.getElementById("inputMobileNo").value;
	var appHkid = document.getElementById("inputTxtAppHkid").value;
	var applicantDob = document.getElementById("applicantDob").value;
	

	//first error element
	var firstErrorElementId="";
	
	

	

	if (fullname.trim() == "") {
		document.getElementById("fullnameinvalid").innerHTML = getBundle(getBundleLanguage, "applicant.name.notNull.message");//"Please enter your Name in English.";
		$('#inputFullName').addClass('invalid-field');
		if(firstErrorElementId==""){
			firstErrorElementId="inputFullName";
		}
		flag = false;
	}
	
	/**** VAlidation for HKID and Passport ***/
	var selectHkidPass = document.getElementById("selectHkidPass").value;
	if (appHkid.trim() == "") {
		if (selectHkidPass.toUpperCase() == "HKID") {
			$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.hkId.notNull.message"));
			$('#inputTxtAppHkid').addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="inputTxtAppHkid";
			}
			flag = false;
		}
		else {
			$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.passport.notNull.message"));
			$('#inputTxtAppHkid').addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="inputTxtAppHkid";
			}
			flag = false;
		}
	}
	else {
		if (selectHkidPass.toUpperCase() == "HKID") {
			var tr = IsHKID(appHkid.trim());
			if (tr == false) {
				$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.hkId.notValid.message"));
				$('#inputTxtAppHkid').addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="inputTxtAppHkid";
				}
				flag = false;
			}
		}
		else {
			var tr = chkTravelHKPass(appHkid.trim());
			var tr1 = chkTravelHKPassLen(appHkid.trim());
			if (tr == false) {
				$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.passport.notEnglish.message"));
				$('#inputTxtAppHkid').addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="inputTxtAppHkid";
				}
				flag = false;
			}
			if (tr1 == false) {
				$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
				$('#inputTxtAppHkid').addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="inputTxtAppHkid";
				}
				flag = false;
			}			
		}
	}
	
	if (applicantDob.trim() == "") 
	 {
		 $('#dobInvalid').html(getBundle(getBundleLanguage, "applicant.dob.notNull.message"));
		 $('#input_dob').addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="input_dob";
			}
	     flag = false;
	 } else {
		 var age = document.getElementById("selectAgeRange1").value;
		 var today = new Date();

		 var applicantDobs = new Array();
		 applicantDobs = applicantDob.split("-");
		 var applicantDob1 = new Date(applicantDobs[2],applicantDobs[1] - 1,applicantDobs[0], 0, 0, 0, 0);
		 var applicantDobDate = new Date(applicantDob1);
		 
		 var insured1Hkid = document.getElementById("txtInsuHkid1").value;
		 
		 var difference = Math.abs(today - applicantDobDate);
		 difference = Math.floor((difference + 1000 * 3600 * 24) / (1000 * 3600 * 24 * 365.25)); 
		 //difference = Math.floor(difference / (1000 * 3600 * 24 * 365.26));
		 
		 if (age == 1) {
			 if ( difference > 18) {
				 $('#dobInvalid').html(getBundle(getBundleLanguage, "applicant.dob.notValid.message"));
				 $("#input_dob").addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="input_dob";
					}
			     flag = false;		 
			 }  
		 } else if (age == 2) {
			 if ( difference < 18 || difference > 70) {
				 $('#dobInvalid').html(getBundle(getBundleLanguage, "applicant.dob.notValid.message"));
				 $("#input_dob").addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="input_dob";
					}
			     flag = false;		 
			 }
		 } else if (age == 3) {
			 if ( difference < 71 || difference > 85) {
				 $('#dobInvalid').html(getBundle(getBundleLanguage, "applicant.dob.notValid.message"));
				 $("#input_dob").addClass("invalid-field");
			        if(firstErrorElementId==""){
						firstErrorElementId="input_dob";
					}
			     flag = false;		 
			 }
		 }
		 
	 }
	
	if (mobileNo.trim() == "") 
	 {
		 	$('#errMobileNo').html(getBundle(getBundleLanguage, "applicant.mobileNo.notNull.message"));
		 	$('#inputMobileNo').addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="inputMobileNo";
			}
	        flag = false;
	 }
	 else 
	 {        
	        if (mobile_pattern.test(mobileNo) == false) 
	        {
	            $('#errMobileNo').html(getBundle(getBundleLanguage, "applicant.mobileNo.notValid.message"));
	            $('#inputMobileNo').addClass('invalid-field');
	    		if(firstErrorElementId==""){
	    			firstErrorElementId="inputMobileNo";
	    		}
	            flag = false;
	        }
	 }

	if (emailId.trim() == "") {
		$('#emailid').html(getBundle(getBundleLanguage, "applicant.email.notNull.message"));
		$('#inputEmailId').addClass('invalid-field');
		if(firstErrorElementId==""){
			firstErrorElementId="inputEmailId";
		}
		flag = false;
	} else {
		if (emailreg.test(emailId) == false) {
			$('#emailid').html(getBundle(getBundleLanguage, "applicant.email.notValid.message"));
			$('#inputEmailId').addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="inputEmailId";
			}
			flag = false;
		}
	}
	
	var rowCountAdult=document.getElementById("totalAdultTraveler").value;
	var rowCountChild=document.getElementById("totalCountOfChild").value;
	var rowCountOther=document.getElementById("totalCountOther").value;
	var rowCountPersonal=document.getElementById("totalPersonalTraveller").value;
	

	for (var i = 1; i <= parseInt(rowCountPersonal) ; i++)
	{
		if($("#txtInsuFullName" + i).val().trim()==insureNamePlaceholder.trim()){
	    	$("#txtInsuFullName" + i).val('');
	    }
		if($("#txtInsuHkid" + i).val().trim()==insureHkidPlaceholder.trim()){
	    	$("#txtInsuHkid" + i).val('');
	    }
		
		var fullname = document.getElementById("txtInsuFullName" + i).value;
		if (fullname.trim() == "") {
			document.getElementById("errtxtPersonalFullName" + i).innerHTML = getBundle(getBundleLanguage, "insured.name.notNull.message"); //"Please enter Insured Person's Name in English.";
			$("#txtInsuFullName" + i).addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="txtInsuFullName" + i;
			}
			flag = false;
		}else{
			document.getElementById("errtxtPersonalFullName" + i).innerHTML = "";
		}
		
		var age = document.getElementById("selectAgeRange" + i).value;
		if (age.trim() == "" || age.trim() == 0) {
			document.getElementById("errselectAgeRange" + i).innerHTML = getBundle(getBundleLanguage, "insured.age.notValid.message");
			$("#selectAgeRange" + i).addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="selectAgeRange" + i;
			}
			flag = false;
		}else{
			document.getElementById("errselectAgeRange" + i).innerHTML = "";
		}
		var hkid = document.getElementById("txtInsuHkid" + i).value;
		document.getElementById("errtxtInsuHkid" + i).innerHTML = "";
		
		
		var selectedPersonalHkidPass = document.getElementById("selectedPersonalHkidPass" + i).value;
		if (hkid.trim() == "") {
			if (selectedPersonalHkidPass.toUpperCase() == 'HKID') {
				document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notNull.message"); // "Please enter Insured Person's HKID No.";
				$("#txtInsuHkid" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="selectedPersonalHkidPass" + i;
				}
				flag = false;	
			} else {
				document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
				$("#txtInsuHkid" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="selectedPersonalHkidPass" + i;
				}
				flag = false;	
			}
			
		}
		else
		{
			if (selectedPersonalHkidPass.toUpperCase() == 'HKID') {
				var tr=IsHKID(hkid.trim());
				if(tr==false)
				{
					document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notValid.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid" + i;
					}
					flag = false;
				}
			} else {
				var tr=chkTravelHKPass(hkid.trim());
				if(tr==false)
				{
					document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notValid.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid" + i;
					}
					flag = false;
				}
				var tr1=chkTravelHKPassLen(hkid.trim());
				if(tr1==false)
				{
					document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid" + i;
					}
					flag = false;
				}
			}
			
		}
		if (hkid.trim() != "") {
			for (var j = 1; j <= i-1; j++)
			{
				var hkid1 = document.getElementById("txtInsuHkid" + j).value;
				var selectedPersonalHkidPass1 = document.getElementById("selectedPersonalHkidPass" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase() && selectedPersonalHkidPass.toUpperCase() == selectedPersonalHkidPass1.toUpperCase()){	
					$('#errtxtInsuHkid'+j).html(getBundle(getBundleLanguage, selectedPersonalHkidPass.toUpperCase() == "HKID" ? "insured.hkId.duplicate.meesage" : "insured.passport.duplicate.message"));
					$("#txtInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid" + j;
					}
					flag = false;
				}
			}
			
			for (var j=1; j<=parseInt(rowCountChild);j++){
				var hkid1 = document.getElementById("txtChldInsuHkid" + j).value;
				var selectedPersonalHkidPass1 = document.getElementById("selectedPersonalHkidPass" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase() && selectedPersonalHkidPass.toUpperCase() == selectedPersonalHkidPass1.toUpperCase()){
					$('#errtxtChldInsuHkid'+j).html(getBundle(getBundleLanguage, selectedPersonalHkidPass.toUpperCase() == "HKID" ? "insured.hkId.duplicate.meesage" : "insured.passport.duplicate.message"));
					$("#txtChldInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid" + j;
					}
					flag = false;
				}
			}

			for (var j=1; j<=parseInt(rowCountOther);j++){
				var hkid1 = document.getElementById("txtOtherInsuHkid" + j).value;
				var selectedPersonalHkidPass1 = document.getElementById("selectedPersonalHkidPass" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase() && selectedPersonalHkidPass.toUpperCase() == selectedPersonalHkidPass1.toUpperCase()){
					$('#errtxtOtherInsuHkid'+j).html(getBundle(getBundleLanguage, selectedPersonalHkidPass.toUpperCase() == "HKID" ? "insured.hkId.duplicate.meesage" : "insured.passport.duplicate.message"));
					$("#txtOtherInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid" + j;
					}
					flag = false;
				}
			}
		}
		var selectedValue = document.getElementById("personalselectBenificiary" + i).value;
		var HkidPass = document.getElementById("personalBenefitiaryHKId"+i).value;
		var selectPersonalBenefitiaryHkidPass = document.getElementById("selectPersonalBenefitiaryHkidPass" + i).value;
		
		
		
		if($("#personalBenefitiaryId" + i).val().trim()==benNamePlaceholder.trim()){
	    	$("#personalBenefitiaryId" + i).val('');
	    }
		if($("#personalBenefitiaryHKId" + i).val().trim()==benHkidPlaceholder.trim()){
	    	$("#personalBenefitiaryHKId" + i).val('');
	    }
		
		if(selectedValue != "SE"){
			

			if (document.getElementById("personalBenefitiaryId" + i).value.trim() == "")
			{
				document.getElementById("errpersonalBenefitiaryId" + i).innerHTML= getBundle(getBundleLanguage, "beneficiary.name.notNull.message"); // getBundle(getBundleLanguage, "beneficiary.name.notNull.message");;
				$("#personalBenefitiaryId" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="personalBenefitiaryId" + i;
				}
				flag = false;             
			}
			else
			{
				document.getElementById("errpersonalBenefitiaryId" + i).innerHTML = "";
			}
			
			var hkida = document.getElementById("personalBenefitiaryHKId" + i).value;
			
			if (selectPersonalBenefitiaryHkidPass.toUpperCase() == 'HKID' ) {
				if (hkida.trim() == "") {
			    	$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			    	$("#personalBenefitiaryHKId" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="personalBenefitiaryHKId" + i;
					}
					flag = false;
			    } else {
			    	if(IsHKID(hkida.trim())==false)
					{	
						$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
						$("#personalBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="personalBenefitiaryHKId" + i;
						}
						flag = false;
					} else if (hkida.toUpperCase() == hkid.toUpperCase()){
						$('#errpersonalBenefitiaryHKId'+i).html(getBundle(getBundleLanguage, "beneficiary.hkId.duplicate.message"));
						$("#personalBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="personalBenefitiaryHKId" + i;
						}
						flag = false;
					}	
			    }
					
				
			} else {
				if (hkida.trim() == "") {
					document.getElementById("errpersonalBenefitiaryHKId" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
					$("#personalBenefitiaryHKId" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="personalBenefitiaryHKId" + i;
					}
					flag = false;
				} else {
					if(chkTravelHKPassLen(hkida.trim()) == false) {
						$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
						$("#personalBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="personalBenefitiaryHKId" + i;
						}
						flag = false;
					}else if(chkTravelHKPass(hkida.trim()) == false) {
						$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
						$("#personalBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="personalBenefitiaryHKId" + i;
						}
						flag = false;
					}else if (hkida.toUpperCase() == hkid.toUpperCase()){
						$('#errpersonalBenefitiaryHKId'+i).html(getBundle(getBundleLanguage, "beneficiary.passport.duplicate.message"));
						$("#personalBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtInsuFullName" + i;
						}
						flag = false;
					}	 
					
					
					
				}

				
				
			}

		}
	}
	
	/* Adult Beneficiary validation */
	for (var i = 1; i <= parseInt(rowCountAdult) ; i++)
	{
		if($("#txtInsuFullName" + i).val().trim()==insureNamePlaceholder.trim()){
	    	$("#txtInsuFullName" + i).val('');
	    }
		if($("#txtInsuHkid" + i).val().trim()==insureHkidPlaceholder.trim()){
	    	$("#txtInsuHkid" + i).val('');
	    }

		var fullname = document.getElementById("txtInsuFullName" + i).value;
		if (fullname.trim() == "") {
			document.getElementById("errtxtAdFullName" + i).innerHTML = getBundle(getBundleLanguage, "insured.name.notNull.message"); //"Please enter Insured Person's Name in English.";
			$("#txtInsuFullName" + i).addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="txtInsuFullName" + i;
			}
			flag = false;
		}else{
			document.getElementById("errtxtAdFullName" + i).innerHTML = "";
		}

		var age = document.getElementById("selectAgeRange" + i).value;
		if (age.trim() == "" || age.trim() == 0) {
			document.getElementById("errselectAgeRange" + i).innerHTML = getBundle(getBundleLanguage, "insured.age.notValid.message");
			$("#selectAgeRange" + i).addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="selectAgeRange" + i;
			}
			flag = false;
		}else{
			document.getElementById("errselectAgeRange" + i).innerHTML = "";
		}



		var hkid = document.getElementById("txtInsuHkid" + i).value;
		document.getElementById("errtxtInsuHkid" + i).innerHTML = "";
		var selectedAdHkidPass = document.getElementById("selectedAdHkidPass" + i).value;
		
		if (hkid.trim() == "") {
			if (selectedAdHkidPass.toUpperCase() == 'HKID') {
				document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notNull.message")
				$("#txtInsuHkid" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="txtInsuHkid" + i;
				}
				flag = false;					
			} else {
				document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notNull.message")
				$("#txtInsuHkid" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="txtInsuHkid" + i;
				}
				flag = false;
			}
			
		}
		else
		{
			if (selectedAdHkidPass.toUpperCase() == 'HKID') {
				var tr=IsHKID(hkid.trim());
				if(tr==false)
				{
					document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid" + i;
					}
					flag = false;
				}
			} else {
				var tr=chkTravelHKPass(hkid.trim());
				if(tr==false)
				{
					document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notValid.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid" + i;
					}
					flag = false;
				}
				var tr1=chkTravelHKPassLen(hkid.trim());
				if(tr1==false)
				{
					document.getElementById("errtxtInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid" + i;
					}
					flag = false;
				}
			}
		}
		
		
		if (hkid.trim() != "") {
			for (var j = 1; j <= i-1; j++)
			{
				var hkid1 = document.getElementById("txtInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase())
				{	
					$('#errtxtInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtInsuHkid" + j;
					}
					flag = false;
				}
			}
			
			for (var j=1; j<=parseInt(rowCountChild);j++){
				var hkid1 = document.getElementById("txtChldInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase()){
					$('#errtxtChldInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtChldInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid" + j;
					}
					flag = false;
				}
			}
			
			for (var j=1; j<=parseInt(rowCountOther);j++){
				var hkid1 = document.getElementById("txtOtherInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase()){
					$('#errtxtOtherInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtOtherInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid" + j;
					}
					flag = false;
				}
			}
		}
		
		var selectedValue = document.getElementById("adultsselectBenificiary" + i).value;
		var HkidPass = document.getElementById("adultBenefitiaryHKId"+i).value;

		
		var selectAdBenefitiaryHkidPass = document.getElementById("selectAdBenefitiaryHkidPass" + i).value;
		
		if($("#adultBenefitiaryId" + i).val().trim()==benNamePlaceholder.trim()){
	    	$("#adultBenefitiaryId" + i).val('');
	    }
		if($("#adultBenefitiaryHKId" + i).val().trim()==benHkidPlaceholder.trim()){
	    	$("#adultBenefitiaryHKId" + i).val('');
	    }
		
		if(selectedValue != "SE"){
			if (document.getElementById("adultBenefitiaryId" + i).value == "")
			{
				document.getElementById("erradultBenefitiaryId" + i).innerHTML= getBundle(getBundleLanguage, "beneficiary.name.notNull.message"); // getBundle(getBundleLanguage, "beneficiary.name.notNull.message");;
				$("#adultBenefitiaryId" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="adultBenefitiaryId" + i;
				}
				flag = false;             
			}
			else
			{
				document.getElementById("erradultBenefitiaryId" + i).innerHTML = "";
			}
			
			var hkida = document.getElementById("adultBenefitiaryHKId" + i).value;

			if (selectAdBenefitiaryHkidPass.toUpperCase() == 'HKID' ) {				
				if (hkida.trim() == "") {
			    	$("#erradultBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			    	$("#adultBenefitiaryHKId" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="adultBenefitiaryHKId" + i;
					}
					flag = false;
			    } else {
			    	if(IsHKID(hkida.trim())==false)
					{	
						$("#erradultBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
						$("#adultBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId" + i;
						}
						flag = false;
					} else if (hkid.toUpperCase() == HkidPass.toUpperCase()){
						$('#erradultBenefitiaryHKId'+i).html(getBundle(getBundleLanguage, "beneficiary.hkId.duplicate.message"));
						$("#adultBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId" + i;
						}
						flag = false;
					}	
			    }
				
					
				
			} else {
				if (hkida.trim() == "") {
					document.getElementById("erradultBenefitiaryHKId" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
					$("#adultBenefitiaryHKId" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="adultBenefitiaryHKId" + i;
					}
					flag = false;
				} else {
					if(chkTravelHKPassLen(hkida.trim()) == false) {
						$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
						$("#adultBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId" + i;
						}
						flag = false;
					}else if(chkTravelHKPass(hkida.trim()) == false) {
						$("#errpersonalBenefitiaryHKId" + i).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
						$("#adultBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId" + i;
						}
						flag = false;
					}else if (hkida.toUpperCase() == hkid.toUpperCase()){
						$('#errpersonalBenefitiaryHKId'+i).html(getBundle(getBundleLanguage, "beneficiary.passport.duplicate.message"));
						$("#adultBenefitiaryHKId" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="adultBenefitiaryHKId" + i;
						}
						flag = false;
					}	 
				}

				
				
			}
			
			
		} 
			


	}

	/* Child Beneficiary validation */
	for (var i = 1; i <= parseInt(rowCountChild) ; i++)
	{
		if($("#txtChldFullName" + i).val().trim()==insureNamePlaceholder.trim()){
	    	$("#txtChldFullName" + i).val('');
	    }
		if($("#txtChldInsuHkid" + i).val().trim()==insureHkidPlaceholder.trim()){
	    	$("#txtChldInsuHkid" + i).val('');
	    }
		
		var fullname = document.getElementById("txtChldFullName" + i).value;
		var age = document.getElementById("selectchildAgeRange" + i).value;
		if (fullname.trim() == "") {
			document.getElementById("errtxtChldFullName" + i).innerHTML = getBundle(getBundleLanguage, "insured.name.notNull.message");
			$("#txtChldFullName" + i).addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="txtChldFullName" + i;
			}
			flag = false;
		}else{
			document.getElementById("errtxtChldFullName" + i).innerHTML = "";
		}

		if (age.trim() == "" || age.trim() == 0) {
			document.getElementById("errchildRange" + i).innerHTML = getBundle(getBundleLanguage, "insured.age.notValid.message"); // getBundle(getBundleLanguage, "insured.age.notValid.message");;
			$("#selectchildAgeRange" + i).addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="selectchildAgeRange" + i;
			}
			flag = false;
		}else{
			document.getElementById("errchildRange" + i).innerHTML = "";
		}
		
		
		
		
		var hkid = document.getElementById("txtChldInsuHkid" + i).value;
		var selectedChldHkidPass = document.getElementById("selectedChldHkidPass" + i).value;
		
		
		if (hkid.trim() == "") {
			if (selectedChldHkidPass.toUpperCase() == 'HKID') {
				document.getElementById("errtxtChldInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notNull.message")
				$("#txtChldInsuHkid" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="txtChldInsuHkid" + i;
				}
				flag = false;	
			} else {
				document.getElementById("errtxtChldInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notNull.message")
				$("#txtChldInsuHkid" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="txtChldInsuHkid" + i;
				}
				flag = false;	
			}
			 
		}
		else
		{
			if (selectedChldHkidPass.toUpperCase() == 'HKID') {
				var tr=IsHKID(hkid.trim());
				if(tr==false)
				{
					document.getElementById("errtxtChldInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtChldInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid" + i;
					}
					flag = false;
				}
			} else {
				var tr=chkTravelHKPass(hkid.trim());
				if(tr==false)
				{
					document.getElementById("errtxtChldInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notValid.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtChldInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid" + i;
					}
					flag = false;
				}
				var tr1=chkTravelHKPassLen(hkid.trim());
				if(tr1==false)
				{
					document.getElementById("errtxtChldInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtChldInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid" + i;
					}
					flag = false;
				}
			}
		}
		
		if (hkid.trim() != "") {
			
			for (var j = 1; j <= i-1; j++)
			{
				var hkid1 = document.getElementById("txtChldInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase())
				{	
					$('#errtxtChldInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtChldInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtChldInsuHkid" + j;
					}
					flag = false;
				}
			}
			for (var j=1; j<=parseInt(rowCountOther);j++){
				var hkid1 = document.getElementById("txtOtherInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase()){
					$('#errtxtOtherInsuHkid'+j).html(getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage"));
					$("#txtOtherInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid" + j;
					}
					flag = false;
				}
			}
		}
		
		
		var selectedValue = document.getElementById("childselectBenificiary" + i).value;
		var HkidPass = document.getElementById("txtchildInsuHkid"+i).value;
		var selectedChldBenefitiaryHkidPass = document.getElementById("selectedChldBenefitiaryHkidPass" + i).value;

		
		if($("#childBenefitiaryName" + i).val().trim()==benNamePlaceholder.trim()){
	    	$("#childBenefitiaryName" + i).val('');
	    }
		if($("#txtchildInsuHkid" + i).val().trim()==benHkidPlaceholder.trim()){
	    	$("#txtchildInsuHkid" + i).val('');
	    }
		
		if(selectedValue != "SE"){
			
			
			if (document.getElementById("childBenefitiaryName" + i).value == "")
			{
				document.getElementById("errchildBenefitiaryName" + i).innerHTML= getBundle(getBundleLanguage, "beneficiary.name.notNull.message"); // getBundle(getBundleLanguage, "beneficiary.name.notNull.message");;
				$("#childBenefitiaryName" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="childBenefitiaryName" + i;
				}
				flag = false;             
			}
			else
			{
				document.getElementById("errchildBenefitiaryName" + i).innerHTML = "";
			}
			
			var hkida = document.getElementById("txtchildInsuHkid" + i).value;
			if (selectedChldBenefitiaryHkidPass.toUpperCase() == 'HKID' ) {
				if (hkida.trim() == "") {
			    	$("#errtxtchildInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			    	$("#txtchildInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtchildInsuHkid" + i;
					}
					flag = false;
			    } else {
					if(IsHKID(hkida.trim())==false)
					{	
						$("#errtxtchildInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
						$("#txtchildInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid" + i;
						}
						flag = false;
					} else if (hkid.toUpperCase() == HkidPass.toUpperCase()){
						$('#errtxtchildInsuHkid'+i).html(getBundle(getBundleLanguage, "beneficiary.hkId.duplicate.message"));
						$("#txtchildInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid" + i;
						}
						flag = false;
					}	
			    }
				
			} else {
				if (hkida.trim() == "") {
					document.getElementById("errtxtchildInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
					$("#txtchildInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtchildInsuHkid" + i;
					}
					flag = false;
				} else {
					if(chkTravelHKPassLen(hkida.trim()) == false) {
						$("#errtxtchildInsuHkid" + i).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
						$("#txtchildInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid" + i;
						}
						flag = false;
					}else if(chkTravelHKPass(hkida.trim()) == false) {
						$("#errtxtchildInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
						$("#txtchildInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid" + i;
						}
						flag = false;
					}else if (hkida.toUpperCase() == hkid.toUpperCase()){
						$('#errtxtchildInsuHkid'+i).html(getBundle(getBundleLanguage, "beneficiary.passport.duplicate.message"));
						$("#txtchildInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtchildInsuHkid" + i;
						}
						flag = false;
					}	 
				}
			}
		}

	}

	/* Other Beneficiary validation */
	for (var i = 1; i <= parseInt(rowCountOther) ; i++)
	{
		if($("#txtOtherFullName" + i).val().trim()==insureNamePlaceholder.trim()){
	    	$("#txtOtherFullName" + i).val('');
	    }
		if($("#txtOtherInsuHkid" + i).val().trim()==insureHkidPlaceholder.trim()){
	    	$("#txtOtherInsuHkid" + i).val('');
	    }
		
		var hkid = document.getElementById("txtOtherInsuHkid" + i).value;
		var fullname = document.getElementById("txtOtherFullName" + i).value;
		var age = document.getElementById("selectOtherAgeRange" + i).value;
		var selectedValue = document.getElementById("otherSelectBenificiary" + i).value;
		var selectOtHkidPass = document.getElementById("selectOtHkidPass" + i).value;
		
		if (fullname.trim() == "") {
			document.getElementById("errtxtOtherFullName" + i).innerHTML = getBundle(getBundleLanguage, "insured.name.notNull.message");
			$("#txtOtherFullName" + i).addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="txtOtherFullName" + i;
			}
			flag = false;
		}else{
			document.getElementById("errtxtOtherFullName" + i).innerHTML = "";
		}


		if (age.trim() == "" || age.trim() == 0) {
			document.getElementById("errselectOtherAgeRange" + i).innerHTML = getBundle(getBundleLanguage, "insured.age.notValid.message");
			$("#selectOtherAgeRange" + i).addClass('invalid-field');
			if(firstErrorElementId==""){
				firstErrorElementId="selectOtherAgeRange" + i;
			}
			flag = false;
		}else{
			document.getElementById("errselectOtherAgeRange" + i).innerHTML = "";
		}

		if (hkid.trim() == "") {
			if (selectOtHkidPass.toUpperCase() == 'HKID') {
				document.getElementById("errtxtOtherInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notNull.message")
				$("#txtOtherInsuHkid" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="txtOtherInsuHkid" + i;
				}
				flag = false;	
			} else {
				document.getElementById("errtxtOtherInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notNull.message")
				$("#txtOtherInsuHkid" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="txtOtherInsuHkid" + i;
				}
				flag = false;	
			}
			 
		}
		else
		{
			if (selectOtHkidPass.toUpperCase() == 'HKID') {
				var tr=IsHKID(hkid.trim());
				if(tr==false)
				{
					document.getElementById("errtxtOtherInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtOtherInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid" + i;
					}
					flag = false;
				}
			} else {
				var tr=chkTravelHKPass(hkid.trim());
				if(tr==false)
				{
					document.getElementById("errtxtOtherInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notValid.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtOtherInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid" + i;
					}
					flag = false;
				}
				
				var tr1=chkTravelHKPassLen(hkid.trim());
				if(tr1==false)
				{
					document.getElementById("errtxtOtherInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					$("#txtOtherInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid" + i;
					}
					flag = false;
				}
			}
		}

		if (hkid.trim() != "") {
			for (var j = 1; j <= i-1 ; j++)
			{
				var hkid1 = document.getElementById("txtOtherInsuHkid" + j).value;
				if (hkid.toUpperCase() == hkid1.toUpperCase())
				{
					document.getElementById("errtxtOtherInsuHkid" + j).innerHTML = getBundle(getBundleLanguage, "insured.hkId.duplicate.meesage");
					$("#txtOtherInsuHkid" + j).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherInsuHkid" + j;
					}
					flag = false;
				}
			}
		}
		var selectOtherBenefitiaryHkidPass = document.getElementById("selectOtherBenefitiaryHkidPass" + i).value;
		
		if($("#otherBenefitiaryName" + i).val().trim()==benNamePlaceholder.trim()){
	    	$("#otherBenefitiaryName" + i).val('');
	    }
		if($("#txtOtherBenInsuHkid" + i).val().trim()==benHkidPlaceholder.trim()){
	    	$("#txtOtherBenInsuHkid" + i).val('');
	    }
		
		if(selectedValue != "SE"){
			var benInsuHkid = document.getElementById("txtOtherBenInsuHkid" + i).value;
		    
			/*if (hkid.trim() == "") {
			    if (selectOtherBenefitiaryHkidPass.toUpperCase() == 'HKID') {
				    document.getElementById("errtxtOtherBenInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message")
				    flag = false;	
			    } else {
				    document.getElementById("errtxtOtherBenInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.passport.notNull.message")
				    flag = false;	
			    }
		    }
		    else
		    {
			    if (selectOtherBenefitiaryHkidPass.toUpperCase() == 'HKID') {
				    var tr=IsHKID(hkid.trim());
				
				    if(tr==false)
				    {
					    document.getElementById("errtxtOtherBenInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message");;
					    flag = false;
				    }
			    } else {
				    var tr=chkTravelHKPass(hkid.trim());
				    if(tr==false)
				    {
					    document.getElementById("errtxtOtherBenInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "insured.passport.notValid.message"); // getBundle(getBundleLanguage, "insured.hkId.notValid.message");;
					    flag = false;
				    }
			    }
		    }*/
			
			
			if (document.getElementById("otherBenefitiaryName" + i).value == "")
			{
				document.getElementById("errotherBenefitiaryName" + i).innerHTML=getBundle(getBundleLanguage, "beneficiary.name.notNull.message");
				$("#otherBenefitiaryName" + i).addClass('invalid-field');
				if(firstErrorElementId==""){
					firstErrorElementId="otherBenefitiaryName" + i;
				}
				flag = false;             
			}
			else
			{
				document.getElementById("errotherBenefitiaryName" + i).innerHTML = "";
				
			}

			var hkidc = document.getElementById("txtOtherBenInsuHkid" + i).value;
			$("#errtxtOtherBenInsuHkid" + i).html("");
			var selectOtherBenefitiaryHkidPass = document.getElementById("selectOtherBenefitiaryHkidPass" + i).value;
			
			
			if (selectOtherBenefitiaryHkidPass.toUpperCase() == 'HKID' ) {
				if (hkidc.trim() == "") {
			    	$("#errtxtOtherBenInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message"));
			    	$("#txtOtherBenInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherBenInsuHkid" + i;
					}
					flag = false;
			    } else {
					if(IsHKID(hkidc.trim())==false)
					{	
						$("#errtxtOtherBenInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message"));
						$("#txtOtherBenInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid" + i;
						}
						flag = false;
					} else if (hkidc.toUpperCase() == hkid.toUpperCase()){
						$('#errtxtOtherBenInsuHkid'+i).html(getBundle(getBundleLanguage, "beneficiary.hkId.duplicate.message"));
						$("#txtOtherBenInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid" + i;
						}
						flag = false;
					}	
			    }
				
			} else {
				if (hkidc.trim() == "") {
					document.getElementById("errtxtOtherBenInsuHkid" + i).innerHTML = getBundle(getBundleLanguage, "beneficiary.passport.notNull.message"); // "Please enter Insured Person's HKID No.";
					$("#txtOtherBenInsuHkid" + i).addClass('invalid-field');
					if(firstErrorElementId==""){
						firstErrorElementId="txtOtherBenInsuHkid" + i;
					}
					flag = false;
				} else {
					if(chkTravelHKPassLen(hkidc.trim()) == false) {
						$("#errtxtOtherBenInsuHkid" + i).html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
						$("#txtOtherBenInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid" + i;
						}
						flag = false;
					}else if(chkTravelHKPass(hkidc.trim()) == false) {
						$("#errtxtOtherBenInsuHkid" + i).html(getBundle(getBundleLanguage, "beneficiary.passport.notValid.message"));
						$("#txtOtherBenInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid" + i;
						}
						flag = false;
					}else if (hkidc.toUpperCase() == hkid.toUpperCase()){
						$('#errtxtOtherBenInsuHkid'+i).html(getBundle(getBundleLanguage, "beneficiary.passport.duplicate.message"));
						$("#txtOtherBenInsuHkid" + i).addClass('invalid-field');
						if(firstErrorElementId==""){
							firstErrorElementId="txtOtherBenInsuHkid" + i;
						}
						flag = false;
					}	 
				}
			}
		}
	}
	
	if (document.getElementById("checkbox1").checked == false) {
		document.getElementById("chk1").innerHTML = getBundle(getBundleLanguage, "travelcare.declaration.notChecked.message"); //"Please read and accept the Declaration, Terms & Conditions before submitting the application.";
		if(firstErrorElementId==""){
			firstErrorElementId="checkbox1";
		}
		flag = false;
	}
	if (document.getElementById("checkbox2").checked == false) {
		document.getElementById("chk2").innerHTML = getBundle(getBundleLanguage, "homecare.tnc.notChecked.message");;//"Please read and accept the Personal Information Collection Statement before submitting the application";
		if(firstErrorElementId==""){
			firstErrorElementId="checkbox2";
		}
		flag = false;
	}
	
	if(firstErrorElementId!=""){
		scrollToElement(firstErrorElementId);
	}
	
	
    if(travelp_click){
    	$('#loading-overlay').modal('hide');
    	return false;
    }else{
    	if(flag){
    		travelp_click = true;
    	}else{
    		$('#loading-overlay').modal('hide');
    	}
    	
    	return flag;
    }	
	

}
function isAlphaNumericWithSpecialChar(evt) {
	evt = (evt) ? evt : event;
	var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
	console.log(charCode);
	if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && (charCode < 43 || charCode > 57)) {
		return false;
	}
	return true;
}


function isAlphaNumeric(evt) {
	evt = (evt) ? evt : event;
	var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
	if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}
function replaceAlphaNumeric(id) {
	var string = id.value;
	string = string.replace(/[^a-zA-Z0-9 ]/g, '');
	id.value = string;
}
function isNumeric(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
			if (charCode > 31 && (charCode < 48 || charCode > 57))
				return false;

	return true;
}
function replaceNumeric(id) {
	var string = id.value;
	string = string.replace(/[^0-9]/g, '');
	id.value = string;
}
function alphaOnly(evt) {
	evt = (evt) ? evt : event;
	var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
	if((evt.charCode == 0 && evt.keyCode==37) || (evt.charCode == 0  && evt.keyCode==39) || (evt.charCode == 0  && evt.keyCode==46)){
		return true;
	}
	if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
		return false;
	}
	return true;
}
function replaceAlpha(id) {
	var string = id.value;
	string = string.replace(/[^\sa-zA-Z]/g, '');
	id.value = string;
}

/* ReplaceAplha version 2.
*  Customed for credit card name field to accept '.'
*/
function replaceAlphaEx2(id) {
	var string = id.value;
	string = string.replace(/[^\sa-zA-Z.]/g, '');
	id.value = string;
}
/* flight page apply for no button validation */


/* Apply for now Top */
// flight
function flightValidateDesk()
{
	var flag = true;
	flag = flightValidateGetQuote("txtStartDateDesk", "startDateDeskIn", "txtEndDateDesk", "endDateDeskIn", "txtTravellersDesk", "lblPeopleDesk", "travelCountDeskIn");

	return flag;
}
function flightValidateMob() {
	var flag = true;

	flag = flightValidateGetQuote("txtStartDateMob", "startDateMobIn", "txtEndDateMob", "endDateMobIn", "txtTravellersMob", "lblPeopleMob", "travelCountMobIn");
	return flag;

}
function flightValidateBtm() {
	var flag = true;

	flag = flightValidateGetQuote("txtStartDateBtm", "startDateBtmIn", "txtEndDateBtm", "endDateBtmIn", "txtTravellersBtm", "lblPeopleBtm", "travelCountBtmIn");
	return flag;

}
function flightValidateGetQuote(depDateId, errDepDateId, returnDateId, errReturnDateId, travellersId, peopleCountId, errTravelCountId){
	var flag = true;
	
	
	//default
	if( document.getElementById(errTravelCountId) ){
		document.getElementById(errTravelCountId).style.display = "none";
	}
	
	var travellers = document.getElementById(travellersId).value;
	var peopleCount = document.getElementById(peopleCountId).innerHTML;
	
	var returnDateElement = document.getElementById(returnDateId);
	flag = chkValidFlightDate(returnDateElement, errReturnDateId, getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"), depDateId, errDepDateId, getBundle(getBundleLanguage, "date.policy.startDate.notValid.message"));
	if(travellers > 0){
		
	}else if(peopleCount > 0){
		
	}
	else{
		if (travellers.trim() == "" || travellers =="0") {

			document.getElementById(errTravelCountId).style.display = "block";
			
			var msg = getBundle(getBundleLanguage, "flight.traveller.notNull.message");
			document.getElementById(errTravelCountId).innerHTML =msg;		
			flag = false;
		}
		if (peopleCount.trim()=="" || peopleCount=="0"){

			document.getElementById(errTravelCountId).style.display = "block";
		
			var msg = getBundle(getBundleLanguage, "flight.traveller.notNull.message");
			document.getElementById(errTravelCountId).innerHTML =msg;		
			flag = false;
		}
		if (peopleCount.trim() > 15){
			document.getElementById(errTravelCountId).style.display = "block";
			
			var msg = getBundle(getBundleLanguage, "flight.traveller.notValid.message");
			document.getElementById(errTravelCountId).innerHTML =msg;
			flag = false;
		}
	}
	
	if($('#'+depDateId).closest('form').find('input:radio[name=planSelected]:checked').val() == 'personal'){
		$('#txtAdultsMob, #txtChildMob, #txtOtherMob').val(0);
 		$('#txtAdultsBtm, #txtChildBtm, #txtOtherBtm').val(0);
 		$('#txtAdultsDesk, #txtOtherDesk, #txtChildDesk').val(0);
	}
	
	return flag;
}

function flightValidateDeskTravel(){
	var flag = true;
	document.getElementById("travelTypeDeskIn").innerHTML = "";
	document.getElementById("startDateDeskIn").innerHTML = "";
	document.getElementById("endDateDeskIn").innerHTML = "";
	document.getElementById("travelCountDeskIn").style.display = "none";
	
	var travelType = $("#travelTypeDesk").val();
	var startDate = $("#txtStartDateDesk").val();    
	var endDate = $("#txtEndDateDesk").val();
	var travellers = $("#txtTravellersDesk").val();
	var peopleCount = document.getElementById("lblPeopleDesk").innerHTML;
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	
	var startDates= new Array();
	startDates=startDate.split("-");
	var new_start = new Date(startDates[2],startDates[1] - 1,startDates[0], 0, 0, 0, 0);
	
	var endDates = new Array();
	endDates = endDate.split("-");
	var new_end = new Date(endDates[2],endDates[1] - 1,endDates[0], 0, 0, 0, 0);
	
	var startdays = dateDiffInDays(now, new_start);
	var enddays = dateDiffInDays(new_start, new_end);

	if(travelType.trim()==""){
		$('#travelTypeDeskIn').html(getBundle(getBundleLanguage, "travel.travelType.notSelected.message"));
		flag = false;
	}
	
	if(startDate.trim()==""){
		$('#startDateDeskIn').html(getBundle(getBundleLanguage, "date.policy.startDate.notValid.message"));
		flag = false;
	}else {
		if (startdays > 90){
			$('#startDateDeskIn').html(getBundle(getBundleLanguage, "travelcare.policy.startDate.moreThan30Days.message"));
			flag = false;
		}
	}
	if(travelType != "annual"){
		if(endDate.trim()==""){
			$('#endDateDeskIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
			flag = false;
		}else{
			if(enddays > 180) {
				$('#endDateDeskIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
				flag = false;
			}
		}
	}
	
	if(travellers.trim()==""){
		document.getElementById("travelCountDeskIn").style.display = "block";
		flag = false;
	}
	if(peopleCount.trim()==""||peopleCount=="0"){
		document.getElementById("travelCountDeskIn").style.display = "block";
		flag = false;
	}
	
	if(flag && travelType == "annual"){
		return prepareTravelInsuranceQuote();
	}else {
		return flag;
	}
}

function prepareTravelInsuranceQuote() {
	var result = false;
	var formId = '#frmTravelGetQuoteDesk';
	var method = contextPath+'/ajax/annualTravel/prepareTravelInsuranceQuote';
	console.log($(formId).serialize());
	$.ajax({
		type : "POST",
		url : method,
		data : $(formId).serialize(),
		async : false,
		success : function(data) {
			if (data == 'success') {
				result = true;
			} else {
				console.log(data);
				$('#startDateDeskIn').html(data.errMsgs);
				result = false;
			}
		}
	});
	return result;
}

function flightValidateMobTravel() {
	var flag = true;

	document.getElementById("travelTypeMobIn").innerHTML = "";
	document.getElementById("startDateMobIn").innerHTML = "";
	document.getElementById("endDateMobIn").innerHTML = "";
	document.getElementById("travelCountMobIn").style.display = "none";
	
	var travelType = $("#travelTypeMob").val();
	var startDate = $("#txtStartDateMob").val();
	var endDate = $("#txtEndDateMob").val();
	var travellers = $("#txtTravellersMob").val();
	
	var peopleCount = document.getElementById("lblPeopleMob").innerHTML;
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	
	var startDates=startDate.split("-");
	var new_start = new Date(startDates[2],startDates[1] - 1,startDates[0], 0, 0, 0, 0);
	
	var endDates=endDate.split("-");
	var new_end = new Date(endDates[2],endDates[1] - 1,endDates[0], 0, 0, 0, 0);
	
	var startdays = dateDiffInDays(now, new_start);
	var enddays = dateDiffInDays(new_start, new_end);

	if(travelType.trim()==""){
		$('#travelTypeMobIn').html(getBundle(getBundleLanguage, "travel.travelType.notSelected.message"));
		flag = false;
	}
	
	if (startDate.trim() == "") {
		$('#startDateMobIn').html(getBundle(getBundleLanguage, "date.policy.startDate.notValid.message"));
		flag = false;
	} else {
		if (startdays > 90) {
			
			$('#startDateMobIn').html(getBundle(getBundleLanguage, "travelcare.policy.startDate.moreThan30Days.message"));
			flag = false;
		}
	}
	
	if(travelType != "annual"){
		if (endDate.trim() == "") {
			$('#endDateMobIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
			flag = false;
		} else {
			if (enddays > 180) {
				$('#endDateMobIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
				flag = false;
			}
		}
	}
	
	if (travellers.trim() == "") {
		document.getElementById("travelCountMobIn").style.display = "block";
		flag = false;
	}
	if(peopleCount.trim()==""||peopleCount=="0")
	{
		document.getElementById("travelCountMobIn").style.display = "block";
		flag = false;
	}
	if(flag && travelType == "annual"){
		return prepareTravelInsuranceQuote();
	}else {
		return flag;
	}

}
function flightValidateBtmTravel() {
	var flag = true;

	document.getElementById("travelTypeBtmIn").innerHTML = "";
	document.getElementById("startDateBtmIn").innerHTML = "";
	document.getElementById("endDateBtmIn").innerHTML = "";
	$("#travelCountBtmIn").hide();
	
	var travelType = $("#travelTypeBtm").val();
	var startDate =$("#txtStartDateBtm").val();
	var endDate = $("#txtEndDateBtm").val();
	var travellers = $("#txtTravellersBtm").val();
	
	var peopleCount = document.getElementById("lblPeopleBtm").innerHTML;
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	
	var startDates= new Array();
	startDates=startDate.split("-");
	var new_start = new Date(startDates[2],startDates[1] - 1,startDates[0], 0, 0, 0, 0);
	
	var endDates = new Array();
	endDates = endDate.split("-");
	var new_end = new Date(endDates[2],endDates[1] - 1,endDates[0], 0, 0, 0, 0);
	
	var startdays = dateDiffInDays(now, new_start);
	var enddays = dateDiffInDays(new_start, new_end);

	if(travelType.trim()==""){
		$('#travelTypeBtmIn').html(getBundle(getBundleLanguage, "travel.travelType.notSelected.message"));
		flag = false;
	}
	
	if (startDate.trim() == "") {
		$('#startDateBtmIn').html(getBundle(getBundleLanguage, "date.policy.startDate.notValid.message"));
		flag = false;
	}else{
		if(startdays>90){
			$('#startDateBtmIn').html(getBundle(getBundleLanguage, "travelcare.policy.startDate.moreThan30Days.message"));
			flag = false;
		}
	}
	
	if(travelType != "annual"){
		if (endDate.trim() == "") {
			$('#endDateBtmIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
			flag = false;
		}else{
			if (enddays > 180) {
				$('#endDateBtmIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
				flag = false;
			}
		}
	}
	
	if (travellers.trim() == "") {
		$("#travelCountBtmIn").show();
		flag = false;
	}
	if(peopleCount.trim()==""||peopleCount=="0"){
		$("#travelCountBtmIn").show();
		flag = false;
	}
	if(flag && travelType == "annual"){
		return prepareTravelInsuranceQuote();
	}else {
		return flag;
	}

}

function flightValidateDeskWorkingHoliday()
{
	return true;
	var flag = true;

	document.getElementById("startDateDeskIn").innerHTML = "";
	document.getElementById("endDateDeskIn").innerHTML = "";
	document.getElementById("workingholidayCountDeskIn").style.display = "none";
	/*var startDate = document.getElementById("txtStartDateDesk").value;    
	var endDate = document.getElementById("txtEndDateDesk").value;
	var workingholidayers = document.getElementById("txtworkingholidayersDesk").value;*/
	
	var startDate = $("#txtStartDateDesk").val();    
	var endDate = $("#txtEndDateDesk").val();
	var workingholidayers = $("#txtworkingholidayersDesk").val();
	var peopleCount = document.getElementById("lblPeopleDesk").innerHTML;

	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var new_start = new Date(startDate);
	var new_end = new Date(endDate);
	var startdays = dateDiffInDays(now, new_start);
	var enddays = dateDiffInDays(new_start, new_end);
	if(startDate.trim()=="")
	{
		$('#startDateDeskIn').html(getBundle(getBundleLanguage, "date.policy.startDate.notValid.message"));
		flag = false;
	}
	else {
		if (startdays > 30) {
			$('#startDateDeskIn').html(getBundle(getBundleLanguage, "travelcare.policy.startDate.moreThan30Days.message"));
			flag = false;
		}
	}
	if(endDate.trim()=="")
	{
		$('#endDateDeskIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
		flag = false;
	}
	else {
		if (enddays > 180) {
			$('#endDateDeskIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
			flag = false;
		}
	}
	if(workingholidayers.trim()=="")
	{
		document.getElementById("workingholidayCountDeskIn").style.display = "block";
		flag = false;
	}
	if(peopleCount.trim()==""||peopleCount=="0")
	{
		document.getElementById("workingholidayCountDeskIn").style.display = "block";
		flag = false;
	}
	return flag;

}


function flightValidateBtmWorkingHoliday() {
	return true;
	var flag = true;

	document.getElementById("startDateBtmIn").innerHTML = "";
	document.getElementById("endDateBtmIn").innerHTML = "";
	$("#workingholidayCountBtmIn").hide();
	/*var startDate = document.getElementById("txtStartDateBtm").value;
	var endDate = document.getElementById("txtEndDateBtm").value;
	var workingholidayers = document.getElementById("txtworkingholidayersBtm").value;*/
	var startDate = $("#txtStartDateBtm").val();
	var endDate = $("#txtEndDateBtm").val();
	var workingholidayers = $("#txtworkingholidayersBtm").val();
	
	var peopleCount = document.getElementById("lblPeopleBtm").innerHTML;
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var new_start = new Date(startDate);
	var new_end = new Date(endDate);
	var startdays = dateDiffInDays(now, new_start);
	var enddays = dateDiffInDays(new_start, new_end);

	if (startDate.trim() == "") {
		$('#startDateBtmIn').html(getBundle(getBundleLanguage, "date.policy.startDate.notValid.message"));
		flag = false;
	}
	else
	{
		if(startdays>30)
		{
			$('#startDateBtmIn').html(getBundle(getBundleLanguage, "travelcare.policy.startDate.moreThan30Days.message"));
			flag = false;
		}
	}
	if (endDate.trim() == "") {
		$('#endDateBtmIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
		flag = false;
	}
	else
	{
		if (enddays > 180) {
			$('#endDateBtmIn').html(getBundle(getBundleLanguage, "date.policy.endDate.notValid.message"));
			flag = false;
		}
	}
	if (workingholidayers.trim() == "") {
		$("#workingholidayCountBtmIn").show();
		flag = false;
	}
	if(peopleCount.trim()==""||peopleCount=="0")
	{
		$("#workingholidayCountBtmIn").show();
		flag = false;
	}
	return flag;

}





/*  forgot password validation */
function forgotPassword()
{

	var valid = true;


	var mobileNo = document.getElementById("fMobileNo").value;

	var emailId = document.getElementById("fEmailAddress").value; 
	var userName = document.getElementById("fUserName").value; 
	
	document.getElementById("forgotpassword-err-msg1").style.display = "none";
	document.getElementById("success-message1").style.display = "none";
	
	document.getElementById("errorFEmptyMob").style.display = "none";
	document.getElementById("errorFInvalidMob").style.display = "none";
	document.getElementById("errorFEmptyEmailId").style.display = "none";
	document.getElementById("errorFInvalidEmailId").style.display = "none";
	document.getElementById("errorFEmptyUName").style.display = "none";    
	document.getElementById("errorFInvalidUName").style.display = "none";
	
	$("#fMobileNo").removeClass("invalid-field");
	$("#fEmailAddress").removeClass("invalid-field");
	$("#fUserName").removeClass("invalid-field");

	// Mobile Number Validation
	if (mobileNo.trim() == "") {
		document.getElementById("errorFEmptyMob").style.display = "block";
		$("#fMobileNo").addClass("invalid-field");
		valid = false;

	} else {
		if (mobile_pattern.test(mobileNo) == false) {
			document.getElementById("errorFInvalidMob").style.display = "block";
			$("#fMobileNo").addClass("invalid-field");
			valid = false;
		}
	}

	// Email Address Validation
	if (emailId.trim() == "") {
		document.getElementById("errorFEmptyEmailId").style.display = "block";
		$("#fEmailAddress").addClass("invalid-field");
		valid = false;
	} else {
		if (emailreg.test(emailId) == false) {
			document.getElementById("errorFInvalidEmailId").style.display = "block";
			$("#fEmailAddress").addClass("invalid-field");
			valid = false;
		}
	}

	// UserName Validation
	if (userName.trim() == "") {
		document.getElementById("errorFEmptyUName").style.display = "block";
		$("#fUserName").addClass("invalid-field");
		valid = false;

	}else if(userName.length < 6 || userName.length > 50) {
		document.getElementById("errorFInvalidUName").style.display = "block";
		$("#fUserName").addClass("invalid-field");
		valid = false;
		/*return getBundle(getBundleLanguage, "user.username.length.message");*/
	}
	/*else {
		if (reg.test(userName) == false) {
			document.getElementById("errorFInvalidUName").style.display = "block";
			valid = false;
		}
	}*/
	return valid;
}
function forgotUserName() {
	var valid = true;
	var mobileNo = document.getElementById("mobileNo").value;
	var emailId = document.getElementById("emailAddress").value;
	document.getElementById("errorEmptyMob").style.display = "none";
	document.getElementById("errorInvalidMob").style.display = "none";
	document.getElementById("errorEmptyEmailId").style.display = "none";
	document.getElementById("errorInvalidEmailId").style.display = "none";
	$("#mobileNo").removeClass("invalid-field");
	$("#emailAddress").removeClass("invalid-field");

	// Mobile Number Validation
	if (mobileNo.trim() == "") {
		document.getElementById("errorEmptyMob").style.display = "block";
		$("#mobileNo").addClass("invalid-field");
		valid = false;
	} else {
		if (mobile_pattern.test(mobileNo) == false) {
			document.getElementById("errorInvalidMob").style.display = "block";
			$("#mobileNo").addClass("invalid-field");
			valid = false;
		}
	}

	// Email Address Validation
	if (emailId.trim() == "") {
		document.getElementById("errorEmptyEmailId").style.display = "block";
		$("#emailAddress").addClass("invalid-field");
		valid = false;
	} else {
		if (emailreg.test(emailId) == false) {
			document.getElementById("errorInvalidEmailId").style.display = "block";
			$("#emailAddress").addClass("invalid-field");
			valid = false;
		}
	}

	return valid;
}

function forgotUserName1() {
	var valid = true;
	var mobileNo = document.getElementById("fMobileNo").value;
	var emailId = document.getElementById("fEmailAddress").value;
	document.getElementById("fErrorEmptyMob").style.display = "none";
	document.getElementById("fErrorInvalidMob").style.display = "none";
	document.getElementById("fErrorEmptyEmailId").style.display = "none";
	document.getElementById("fErrorInvalidEmailId").style.display = "none";
	$("#fMobileNo").removeClass("invalid-field");
	$("#fEmailAddress").removeClass("invalid-field");

	// Mobile Number Validation
	if (mobileNo.trim() == "") {
		document.getElementById("fErrorEmptyMob").style.display = "block";
		$("#fMobileNo").addClass("invalid-field");
		valid = false;
	} else {
		if (mobile_pattern.test(mobileNo) == false) {
			document.getElementById("fErrorInvalidMob").style.display = "block";
			$("#fMobileNo").addClass("invalid-field");
			valid = false;
		}
	}

	// Email Address Validation
	if (emailId.trim() == "") {
		document.getElementById("fErrorEmptyEmailId").style.display = "block";
		$("#fEmailAddress").addClass("invalid-field");
		valid = false;
	} else {
		if (emailreg.test(emailId) == false) {
			document.getElementById("fErrorInvalidEmailId").style.display = "block";
			$("#fEmailAddress").addClass("invalid-field");
			valid = false;
		}
	}

	return valid;
}

function resetPassword() {

	var flag = true;

	var pass = document.getElementById("password").value;
	var confpass = document.getElementById("confirmPassword").value;
	document.getElementById("errconfpass").innerHTML = "";
	document.getElementById("errpass").innerHTML = "";

	if (pass.trim() == "") {

		flag = false;
		document.getElementById("errpass").innerHTML = getBundle(getBundleLanguage, "memeber.password.notNull.message"); // "Please enter a Password";
	}
	else {
		if (password_pattern.test(pass) == false) {
			document.getElementById("errpass").innerHTML = getBundle(getBundleLanguage, "memeber.password.notValid.message"); // "Please enter a Valid Password";
			flag = false;
		}
	}

	if (confpass.trim() == "") {
		document.getElementById("errconfpass").innerHTML = getBundle(getBundleLanguage, "memeber.confirmPassword.notNull.message"); // "Please enter a Confirm Password";
		flag = false;
	} else {
		if (confpass !== pass) {
			document.getElementById("errconfpass").innerHTML = getBundle(getBundleLanguage, "memeber.confirmPassword.notValid.message"); // "Please enter a Valid Confirm Password";
			flag = false;
		}
	}
	return flag;
}

function validUser(formID)
{
	var flag = true;
	var userName = $("#"+formID+" #headerUserName").val();//document.getElementById("headerUserName").value;
	var password = $("#"+formID+" #headerPassword").val();//document.getElementById("headerPassword").value;
	//document.getElementById("errUserName").innerHTML = "";
	//document.getElementById("errPass").innerHTML = "";
	$("#"+formID+" #errUserName").html("");
	$("#"+formID+" #errPass").html("");

	if ($.trim(password) == "" || $.trim(password) == $("#"+formID+" #headerPassword").attr("placeholder"))
	{    	
		$("#"+formID+" #headerPassword").addClass("invalid-field");
		$("#"+formID+" #errPass").html(getBundle(getBundleLanguage, "user.password.notNull.message"));
		$("#"+formID+" #errPass").attr("style","color: red;");
		flag = false;
	} 
	if ($.trim(userName) == "" || $.trim(userName) == $("#"+formID+" #headerUserName").attr("placeholder")) {
		$("#"+formID+" #headerUserName").addClass("invalid-field");
		$("#"+formID+" #errUserName").html(getBundle(getBundleLanguage, "user.username.empty.message"));
		$("#"+formID+" #errUserName").attr("style","color: red;");
		flag = false;
	}
	return flag;
}
var device = 0; // 0 of desktop and 1 for mob
$(window).resize(function() {
	  var width = $(window).width();
	  
	  if(width>=992 && device == 1){
		 if($('body').hasClass('canvas-slid')){
			  $('.navmenu').offcanvas('hide');
			  $('.offcanvas').hide();
			  $('#overlay').remove();
	  	}
		  device = 0;
	  }else if( width <= 991 && device == 0){
		  $('#myDropdown').removeClass('open');
		  $('#overlay').remove();
		  device = 1;
	  }
	  
	  
})




//Chat API Calling
/*function zopim_chat_start(lang)
{
	window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
	d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
	_.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
	$.src='//v2.zopim.com/?2sTG811AexKTVEObAoKHjEIw6cIoJccV';z.t=+new Date;$.
	type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');

	$zopim(function() {
        $zopim.livechat.setLanguage(lang);
    });
}
zopim_chat_start('en');*/


function isCreditCard(CC) {
	
    if (CC.length > 19) return (false);
  
    sum = 0;
    mul = 1;
    l = CC.length;
    for (i = 0; i < l; i++) {
      digit = CC.substring(l - i - 1, l - i);
      tproduct = parseInt(digit, 10) * mul;
      if (tproduct >= 10) sum += (tproduct % 10) + 1;
      else sum += tproduct;
      if (mul == 1) mul++;
      else mul--;
    }
    if ((sum % 10) == 0) return (true);
    else return (false);
}

//travel Payment Summary Payment details//
function validatecardnumber(cardnumber) {

	cc = cardnumber.replace(/[ -]/g, '');
	// See if the card is valid
	if( fwdPayment.isValid(cc) ){
		
		if( fwdPayment.isVisa(cc) ){
			if( document.getElementById("chkVisa") ){
				document.getElementById("chkVisa").checked=true;
			}
		} else if( fwdPayment.isMaster(cc) ){
			if( document.getElementById("chkMaster") ){
				document.getElementById("chkMaster").checked=true;
			}
		}

		if( document.getElementById('errcardno') ){
			document.getElementById('errcardno').innerHTML = '';
		}
	} else{

		if( document.getElementById('errcardno') ){
			
			if(cc=="") {
				document.getElementById('errcardno').innerHTML = getBundle(getBundleLanguage, "applicant.creditcard.notNull.message")
			}
			else {
				document.getElementById('errcardno').innerHTML = getBundle(getBundleLanguage, "applicant.creditcard.notValid.message");//'(invalid card number)';
			}
		}

		$(".cardnumber").addClass("invalid-field");
		$("#card-num").addClass("invalid-field");
		return false;
	}

	$(".cardnumber").removeClass("invalid-field");
	$("#card-num").removeClass("invalid-field");
	
	return true;
}

function payValid(paymentType)
{
	if (paymentType == null) {
		paymentType = "cc";
	}
	var flag=true;
	var cardno=(document.getElementById("cardnumber"))?document.getElementById("cardnumber").value:'';

	var month=(document.getElementById("month"))?document.getElementById("month").value:'';


	var year=(document.getElementById("year"))?document.getElementById("year").value:'';
	var seccode=(document.getElementById("seccode"))?document.getElementById("seccode").value:'';
	var holdername=(document.getElementById("holdername"))?document.getElementById("holdername").value:'';

	if( document.getElementById('errcardno') ) document.getElementById('errcardno').innerHTML="";
	if( document.getElementById('errmonth') ) document.getElementById('errmonth').innerHTML="";
	if( document.getElementById('erryear') ) document.getElementById('erryear').innerHTML="";
	if( document.getElementById('errname') ) document.getElementById('errname').innerHTML="";
	if( document.getElementById('errcode') ) document.getElementById('errcode').innerHTML="";
	$("#seccode").removeClass("invalid-field");
	if( document.getElementById('errchk1') ) document.getElementById('errchk1').innerHTML="";
	/*document.getElementById('errchk2').innerHTML="";*/

	//first error element
	var firstErrorElementId="";	
	if(paymentType=="" || paymentType=="cc"){	
		if(cardno.length<16)
		{
			flag=false;
			$('#errcardno').html(getBundle(getBundleLanguage, "payment.creditCard.number.notValid.message"));
			$("#cardnumber").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="cardnumber";
			}
		}
		
		if(!fwdPayment.isValid(cardno))
		{
			flag=false;
			$('#errcardno').html(getBundle(getBundleLanguage, "applicant.creditcard.notValid.message"));
			$("#cardnumber").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="cardnumber";
			}
		}
		
		if(month=="" || month== 0)
		{
			flag=false;
			$('#errmonth').html(getBundle(getBundleLanguage, "payment.creditCard.expiryDate.month.notValid.message"));
			$("#inputMonth").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="inputMonth";
			}
		}
		if(year=="" || year == 0)
		{
			flag=false;
			$('#erryear').html(getBundle(getBundleLanguage, "payment.creditCard.expiryDate.year.notValid.message"));
			$("#inputYear").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="inputYear";
			}
		}
		if(holdername.trim()=="")
		{
			flag=false;
			$('#errname').html(getBundle(getBundleLanguage, "payment.creditCard.name.notValid.message"));
			$("#holdername").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="holdername";
			}
		}
		if(seccode.trim()=="")
		{
			flag=false;
			$('#errcode').html(getBundle(getBundleLanguage, "payment.creditCard.securityCode.notNull.message"));
			$("#seccode").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="seccode";
			}
		}
		
		if(seccode.trim() != "" && seccode.length <3)
		{
			flag=false;
			$('#errcode').html(getBundle(getBundleLanguage, "payment.creditCard.securityCode.notValid.message"));
			$("#seccode").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="seccode";
			}
		}
		if (document.getElementById("checkbox3").checked == false)
		{
			$('#errchk1').html(getBundle(getBundleLanguage, "payment.tnc.notChecked.message"));
			flag = false;
			if(firstErrorElementId==""){
				firstErrorElementId="checkbox3";
			}
		}
		
		if(firstErrorElementId!=""){
			scrollToElement(firstErrorElementId);
		}
	}else if(paymentType=="tg"){
		if (document.getElementById("checkbox3").checked == false)
		{
			$('#errchk1').html(getBundle(getBundleLanguage, "payment.tnc.notChecked.message"));
			flag = false;
			if(firstErrorElementId==""){
				firstErrorElementId="checkbox3";
			}
		}
		
		if(firstErrorElementId!=""){
			scrollToElement(firstErrorElementId);
		}		
	}	
	return flag;
}


/*Promo popup*/
function get_promo_val()
{

	var valid = true;
	var emailId = document.getElementById("emailToSendPromoCode").value; 
	document.getElementById("errPromoEmail").style.display = "none";
	// Email Address Validation
	if (emailId.trim() == "") {
		document.getElementById("errPromoEmail").style.display = "block";
		document.getElementById("errPromoEmail").innerHTML = getBundle(getBundleLanguage, "promotion.email.notNull.message");//"Your E-mail Address is invalid.";
		valid = false;

	} else {

		if (emailreg.test(emailId) == false) {
			document.getElementById("errPromoEmail").style.display = "block";
			document.getElementById("errPromoEmail").innerHTML = getBundle(getBundleLanguage, "promotion.email.notValid.message");//"Your E-mail Address is invalid.";
			valid = false;
		}
	}

	return valid;
}

//Side Menu

//<![CDATA[ 
$(window).load(function(){
	$('.navmenu-fixed-left').offcanvas({
		placement: 'left',
		autohide: 'true',
		recalc: 'true'
	});
});//]]> 

function chkTravelHKPassLen(value) {
   var len = value.length;
   
   if (len > 15 || len < 5)
   {
	   return false;
   }
   else
   {
	   return true;
   }
}

function chkTravelHKPass(value) {
    var flag = true;
    var filter = passport_pattern;///^[!??%&??)*\+,.\/;\[\\\]\^_`{|}~-]+$/;
    
    value = value.replace(/[-/(/)]/g, '');
    if(!chkTravelHKPassLen(value.trim())){
    	flag = false;
    }
    var data = value.trim();
    if (data != "") {
        /*if (/^[A-Za-z ]+$/.test(data)) {
            //there are only characters
            flag = false;
        }
        else if (/^[0-9 ]+$/.test(data)) {
            //it contains numbers
            flag = false;
        }
        else */
        if (!filter.test(data)) {
            flag = false;
        }
    }
    else {
        flag = false;
    }
    return flag;
}

//ie9 placeholder solution
function placeholderOnFocus(element, placeholderVal){
	$(element).removeClass("bmg_custom_placeholder");
	//console.log($(element).val().trim());
	if($(element).val().trim()==placeholderVal.trim()){
		$(element).val('');
	}
}

function placeholderOnBlur(element, placeholderVal){
	if($(element).val()==''){
		$(element).addClass("bmg_custom_placeholder");
		$(element).val(placeholderVal);
	}
}


//HOME CARE VALIDATION
var home_click = false;
function hc_planValid() {
    var flag = true;
    
//    document.getElementById("appfullname").innerHTML = "";
//    var appFullName = document.getElementById("inputFullName").value;
//    
//    document.getElementById("errAppHkid").innerHTML = "";
//    var appHkid = document.getElementById("txtAppHkid").value;
//    
//    document.getElementById("errMobileNo").innerHTML = "";
//    var mobileNo = document.getElementById("inputMobileNo").value;
//    
//    document.getElementById("errEmailid").innerHTML = "";
//    
//    document.getElementById("dobInvalid").innerHTML = "";
//    
//    
//    var EmailId = document.getElementById("inputEmailId").value;
    
    /*document.getElementById("errRegUser").innerHTML = "";
    var RegUserName = document.getElementById("inputRegUserName").value;
    document.getElementById("errRegPass").innerHTML = "";
    var RegPass = document.getElementById("inputRegPass").value;
    document.getElementById("errRegCPass").innerHTML = "";
    var RegCPass = document.getElementById("inputRegCPass").value;*/
    // corrosponding address
//    document.getElementById("errCABuilding").innerHTML = "";
//    var CABuilding = document.getElementById("inputCABuilding").value;
//    document.getElementById("errCAEstate").innerHTML = "";
//    var CAEstate = document.getElementById("inputCAEstate").value;
//    // address details
//    document.getElementById("errABuilding").innerHTML = "";
//    var ABuilding = document.getElementById("inputABuilding").value;
//    document.getElementById("errAEstate").innerHTML = "";
//    var AEstate = document.getElementById("inputAEstate").value;
//    document.getElementById("errNFA").innerHTML = "";
//    var NFA = document.getElementById("selectNFA").value;
//    document.getElementById("errEffDate").innerHTML = "";
//    var EffDate = document.getElementById("txtEffDate").value;
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var new_start = new Date(EffDate);
    var startdays = dateDiffInDays(now, new_start);
    
    
    
    
    //bmg edit
    if($("#inputFullName").val().trim()==namePlaceholder.trim()){
    	$("#inputFullName").val('');
    }
    if($("#txtAppHkid").val().trim()==hkidPlaceholder.trim()){
    	$("#txtAppHkid").val('');
    }
    
    
    if($("#inputCARoom").val().trim()==roomPlaceholder.trim()){
    	$("#inputCARoom").val('');
    }
    if($("#inputCAFloor").val().trim()==floorPlaceholder.trim()){
    	$("#inputCAFloor").val('');
    }
    if($("#inputCABlock").val().trim()==blockPlaceholder.trim()){
    	$("#inputCABlock").val('');
    }
    if($("#inputCABuilding").val().trim()==buildingPlaceholder.trim()){
    	$("#inputCABuilding").val('');
    }
    if($("#inputCAEstate").val().trim()==estatePlaceholder.trim()){
    	$("#inputCAEstate").val('');
    }
    if($("#inputCAStreetNo").val().trim()==streetNoPlaceholder.trim()){
    	$("#inputCAStreetNo").val('');
    }
    if($("#inputCAStreetName").val().trim()==streetNamePlaceholder.trim()){
    	$("#inputCAStreetName").val('');
    }
    
    
    if($("#inputARoom").val().trim()==roomPlaceholder.trim()){
    	$("#inputARoom").val('');
    }
    if($("#inputAFloor").val().trim()==floorPlaceholder.trim()){
    	$("#inputAFloor").val('');
    }
    if($("#inputABlock").val().trim()==blockPlaceholder.trim()){
    	$("#inputABlock").val('');
    }
    if($("#inputABuilding").val().trim()==buildingPlaceholder.trim()){
    	$("#inputABuilding").val('');
    }
    if($("#inputAEstate").val().trim()==estatePlaceholder.trim()){
    	$("#inputAEstate").val('');
    }
    if($("#inputAStreetNo").val().trim()==streetNoPlaceholder.trim()){
    	$("#inputAStreetNo").val('');
    }
    if($("#inputAStreetName").val().trim()==streetNamePlaceholder.trim()){
    	$("#inputAStreetName").val('');
    }
    
    document.getElementById("appfullname").innerHTML = "";
    var appFullName = $("#inputFullName").val();
    
    document.getElementById("errAppHkid").innerHTML = "";
    var appHkid = $("#txtAppHkid").val();
    
    document.getElementById("errMobileNo").innerHTML = "";
    var mobileNo = $("#inputMobileNo").val();
    
    document.getElementById("errEmailid").innerHTML = "";
    
    document.getElementById("dobInvalid").innerHTML = "";
    
    
    var EmailId = $("#inputEmailId").val();
    
    /*document.getElementById("errRegUser").innerHTML = "";
    var RegUserName = document.getElementById("inputRegUserName").value;
    document.getElementById("errRegPass").innerHTML = "";
    var RegPass = document.getElementById("inputRegPass").value;
    document.getElementById("errRegCPass").innerHTML = "";
    var RegCPass = document.getElementById("inputRegCPass").value;*/
    // corrosponding address
    document.getElementById("errCABuilding").innerHTML = "";
    var CABuilding = $("#inputCABuilding").val();
    document.getElementById("errCAEstate").innerHTML = "";
    var CAEstate = $("#inputCAEstate").val();
    // address details
    document.getElementById("errABuilding").innerHTML = "";
    var ABuilding = $("#inputABuilding").val();
    document.getElementById("errAEstate").innerHTML = "";
    var AEstate = $("#inputAEstate").val();
    document.getElementById("errNFA").innerHTML = "";
    var NFA = $("#selectNFA").val();
    document.getElementById("errEffDate").innerHTML = "";
    var EffDate = $("#txtEffDate").val();
    
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var new_start = new Date(newEffDate);
    
    var EffDates = new Array();
    EffDates = EffDate.split("-");
    var newEffDate = new Date(EffDates[2],EffDates[1] - 1,EffDates[0], 0, 0, 0, 0);
    
    var startdays = dateDiffInDays(now, new_start);
    
    //bmg edit
    
    document.getElementById("chk1").innerHTML = "";
    document.getElementById("chk2").innerHTML = "";
    
    $('#errCADist').html('');
    $('#errADist').html('');
    
    
    
    //first error element
	var firstErrorElementId="";
    
    
    
	
	
	if (appFullName.trim() == "") {
        document.getElementById("appfullname").innerHTML = getBundle(getBundleLanguage, "applicant.name.notNull.message");
        $("#inputFullName").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="inputFullName";
		}
		flag = false;
    }
    
    /**** VAlidation for HKID and Passport ***/
//    var selectHkidPass = document.getElementById("selectHkidPass").value;
    var selectHkidPass = $("#selectHkidPass").val();
	if (appHkid.trim() == "") {
		if (selectHkidPass == "appHkid") {
			$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.hkId.notNull.message"));
			$("#txtAppHkid").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="txtAppHkid";
			}
			flag = false;
		}
		else {
			$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.passport.notNull.message"));
			$("#txtAppHkid").addClass("invalid-field");
			if(firstErrorElementId==""){
				firstErrorElementId="txtAppHkid";
			}
			flag = false;
		}
	}
	else {
		if (selectHkidPass == "appHkid") {
			var tr = IsHKID(appHkid.trim());
			if (tr == false) {
				$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.hkId.notValid.message"));
				$("#txtAppHkid").addClass("invalid-field");
				if(firstErrorElementId==""){
					firstErrorElementId="txtAppHkid";
				}
				flag = false;
			}
		}
		else {
			var tr = chkTravelHKPass(appHkid.trim());
			if (tr == false) {
				$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.passport.notEnglish.message"));
				$("#txtAppHkid").addClass("invalid-field");
				if(firstErrorElementId==""){
					firstErrorElementId="txtAppHkid";
				}
				flag = false;
			}
			var tr1 = chkTravelHKPassLen(appHkid.trim());
			if (tr1 == false) {
				$('#errAppHkid').html(getBundle(getBundleLanguage, "applicant.passport.notValidLength.message"));
				$("#txtAppHkid").addClass("invalid-field");
				if(firstErrorElementId==""){
					firstErrorElementId="txtAppHkid";
				}
				flag = false;
			}
		}
	}
//	var applicantDob = document.getElementById("applicantDob").value;
	var applicantDob = $("#applicantDob").val();
	if (applicantDob.trim() == "") {
		document.getElementById("dobInvalid").innerHTML = getBundle(getBundleLanguage, "applicant.dob.notNull.message");
		$("#input_dob").addClass("invalid-field");
		if(firstErrorElementId==""){
			firstErrorElementId="input_dob";
		}
		flag = false;
    
	}
    
    
    if (mobileNo.trim() == "") {
        document.getElementById("errMobileNo").innerHTML = getBundle(getBundleLanguage, "applicant.mobileNo.notNull.message");
        $("#inputMobileNo").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="inputMobileNo";
		}
		flag = false;
    }
    else {        
        if (mobile_pattern.test(mobileNo) == false) {
            document.getElementById("errMobileNo").innerHTML = getBundle(getBundleLanguage, "applicant.mobileNo.notValid.message");
            $("#inputMobileNo").addClass("invalid-field");
            if(firstErrorElementId==""){
    			firstErrorElementId="inputMobileNo";
    		}
    		flag = false;
        }
    }
    
    if (EmailId.trim() == "") {
        document.getElementById("errEmailid").innerHTML = getBundle(getBundleLanguage, "applicant.email.notNull.message");
        $("#inputEmailId").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="inputEmailId";
		}
		flag = false;
    }
    else {
        if (emailreg.test(EmailId) == false) {

            document.getElementById("errEmailid").innerHTML = getBundle(getBundleLanguage, "applicant.email.notValid.message");
            $("#inputEmailId").addClass("invalid-field");
            if(firstErrorElementId==""){
    			firstErrorElementId="inputEmailId";
    		}
    		flag = false;
        }
    }
    

    /*if (RegUserName.trim() != "") {
        if (reg.test(RegUserName) == false) {
            document.getElementById("errRegUser").innerHTML = "Please enter an Username";
            flag = false;
        }
    }
    if (RegPass.trim() != "") {
        if (password_pattern.test(RegPass) == false) {
            document.getElementById("errRegPass").innerHTML = "Please enter a Valid Password";
            flag = false;
        }
        if (RegCPass !== RegPass) {
            document.getElementById("errRegCPass").innerHTML = "Password does not match";
            flag = false;
        }
    }*/
    if (CABuilding.trim() == "" && CAEstate.trim() == "") {
        //document.getElementById("errCABuilding").innerHTML = "Name of Building is invalid.";
        $('#errCABuilding').html(getBundle(getBundleLanguage, "homecare.correspondingAddress.building.notNull.message"));
        $('#errCAEstate').html(getBundle(getBundleLanguage, "homecare.correspondingAddress.estate.notNull.message"));
        $("#inputCABuilding").addClass("invalid-field");
        $("#inputCAEstate").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="inputCABuilding";
		}
		flag = false;
    }
    if($('#selectCADist').val() == ''){
    	$('#errCADist').html(getBundle(getBundleLanguage, "homecare.district.notNull.message"));
    	$("#inputCADistrict").addClass("invalid-field");
    	if(firstErrorElementId==""){
			firstErrorElementId="inputCADistrict";
		}
		flag = false;
    }
    
    if (ABuilding.trim() == "" && AEstate.trim() == "") {
        //document.getElementById("errABuilding").innerHTML = "Please enter your Corresponding Address.";
        $('#errABuilding').html(getBundle(getBundleLanguage, "homecare.correspondingAddress.building.notNull.message"));
        $('#errAEstate').html(getBundle(getBundleLanguage, "homecare.correspondingAddress.estate.notNull.message"));
        $("#inputABuilding").addClass("invalid-field");
        $("#inputAEstate").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="inputABuilding";
		}
		flag = false;
    }
    if($('#selectADist').val() == ''){
    	$('#errADist').html(getBundle(getBundleLanguage, "homecare.district.notNull.message"));
    	$("#inputADistrict").addClass("invalid-field");
    	if(firstErrorElementId==""){
			firstErrorElementId="inputADistrict";
		}
		flag = false;
    }
     
    if (NFA.trim() == "") {
        //document.getElementById("errNFA").innerHTML = "Please select Net Floor Area.";
        $('#errNFA').html(getBundle(getBundleLanguage, "homecare.netFloorArea.notNull.message"));
        $("#inputNFA").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="inputNFA";
		}
		flag = false;
    }
    
    if (EffDate.trim() == "") {
       // document.getElementById("errEffDate").innerHTML = "Effective Date must be within 60 days of Application Date.";
        $('#errEffDate').html(getBundle(getBundleLanguage, "homecare.effectiveDate.notValid.message"));
        $("#homecareDp").addClass("invalid-field");
        if(firstErrorElementId==""){
			firstErrorElementId="homecareDp";
		}
		flag = false;
    }
    else {
        if (startdays > 60) {
           // document.getElementById("errEffDate").innerHTML = "Effective Date must be within 60 days of Application Date.";
            $('#errEffDate').html(getBundle(getBundleLanguage, "homecare.effectiveDate.notValid.message"));
            $("#homecareDp").addClass("invalid-field");
            if(firstErrorElementId==""){
    			firstErrorElementId="homecareDp";
    		}
    		flag = false;
        }
    }
    if (document.getElementById("checkbox1").checked == false) {
        //document.getElementById("chk1").innerHTML = "Please read and accept the Declaration, Terms & Conditions before submitting the application.";
        $('#chk1').html(getBundle(getBundleLanguage, "travelcare.declaration.notChecked.message"));
        if(firstErrorElementId==""){
			firstErrorElementId="checkbox1";
		}
		flag = false;
    }
    if (document.getElementById("checkbox2").checked == false) {
        //document.getElementById("chk2").innerHTML = "Please read and accept the Personal Information Collection Statement before submitting the application.";
        $('#chk2').html(getBundle(getBundleLanguage, "homecare.tnc.notChecked.message"));
        if(firstErrorElementId==""){
			firstErrorElementId="checkbox2";
		}
		flag = false;
    }
    
    
    
    if(firstErrorElementId!=""){
		scrollToElement(firstErrorElementId);
	}
    
    //Remove the disabled / area select
    if(flag){
    	$('#selectADist').removeAttr('disabled');
    	$('#inlineDeskRadio31').removeAttr('disabled');
    	$('#inlineDeskRadio41').removeAttr('disabled');
    	$('#inlineDeskRadio51').removeAttr('disabled');
    }
    
    
    if(home_click){
    	$('#loading-overlay').modal('hide');
    	return false;
    }else{
    	if(flag){
             home_click = true;
    	}else{
    		$('#loading-overlay').modal('hide');
    	}
    	return flag;
    }	
    
}


////home care page validation
function msgAlertDesk(formID) {
    var flag = true;

    if(formID == 'getHomeQuote'){
    	if (document.getElementById("inlineDeskRadio1a1").checked){
        	flag=false;
        } else if (document.getElementById("inlineDeskRadio1a2").checked){
        	flag=false;
        }
    }else if(formID == 'getHomeQuoteMob'){
    	if (document.getElementById("inlineDeskRadio2a1").checked){
        	flag=false;
        } else if (document.getElementById("inlineDeskRadio2a2").checked){
        	flag=false;
        }
    }else if(formID == 'getHomeQuoteBottom'){
    	if (document.getElementById("inlineDeskRadio3a1").checked){
        	flag=false;
        } else if (document.getElementById("inlineDeskRadio3a2").checked){
        	flag=false;
        }
    }
    
    if (flag == false) {
    	$('#oldHome').modal('show');
    	$('#oldHome').on('shown.bs.modal', function (e) {
			var newHeight=($( window ).height()/2)-($('#homecareLandingModal').height()/2);
    		$('#homecareLandingModal').css({'top':newHeight+"px"});
        })
    	
	}
    return flag;    
}
/*
$('#oldHome').on('show.bs.modal', function (event) {
	  var modal = $(this);
	  modal.find('.errorMsg').text(getBundle(getBundleLanguage, "homecare.uw.question1.notEntitled.message"));
})*/
 
// common function
String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];
    
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    
    return theString;
}
function IsNumeric(input){
   return (input - 0) == input && input.length > 0;
}




//validation
function resetErrElement(errElementId){
	if(errElementId != null && document.getElementById(errElementId) != null){
		document.getElementById(errElementId).innerHTML = "";
	}
}
function isNull(element){
	if(element != null){
		if(element.value == null || element.value.trim() == ""){
			return true;
		}else{
			return false
		}
	}
	return false;
}
function dateLessThanCurrent(dat){
	
}
function dateDiffInDaysFromNow(dat){	
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    return dateDiffInDays(now, dat);
}

// validation - date
function chkValidDate(element, errElementId, name){
	if(isNull(element)){

		var msg = getBundle(getBundleLanguage, "date.notNull.message");
		msg = String.format(msg, name);
		document.getElementById(errElementId).innerHTML = msg;
		return false;
	}else{
		//resetErrElement(errElementId);
		return true;		
	}
}

// flight
function chkValidFlightDepartureDate(element, errElementId, name){
	
	if(chkValidDate(element, errElementId, name)){
	    //var departureDate = element.value;
		var departureDate = $(element).val();
		
		var departureDates= new Array();
		departureDates=departureDate.split("-");
		departureDate = new Date(departureDates[2],departureDates[1] - 1,departureDates[0], 0, 0, 0, 0);
	    //departureDate = new Date(departureDate);
	    var dateDiff = dateDiffInDaysFromNow(departureDate);
	    
	    if(dateDiff < 0){
	    	var msg = getBundle(getBundleLanguage, "flight.departureDate.notLessThanCurrent.message");
        	document.getElementById(errElementId).innerHTML = msg;
            return false;
	    }
	    if (dateDiff > 90) {
        	var msg = getBundle(getBundleLanguage, "flight.departureDate.notValid.message");
        	document.getElementById(errElementId).innerHTML = msg;
            return false;
        }else{
        	//resetErrElement(errElementId);
        	return true;
        }        
	}else{
		return false;
	}	
}
function chkValidFlightDate(element, errElementId, name, departureDateId, errDepartureDateId, departureDateName){
	//check departure date
	var flag = true;
//	var departureDate = document.getElementById("txtStartDateDesk").value;
//	
//	var returnDate = document.getElementById("txtEndDateDesk").value;
//	
//	if (departureDate.trim() == "") {
//		document.getElementById("startDateDeskIn").innerHTML = getBundle(getBundleLanguage, "date.policy.startDate.notValid.message");
//		flag = false;
//	}
//	if (returnDate.trim() == "") {
//		document.getElementById("endDateDeskIn").innerHTML = getBundle(getBundleLanguage, "date.policy.endDate.notValid.message");
//		flag = false;
//	}
//	
	/*var departureDate = document.getElementById(departureDateId).value; 
	var returnDate = element.value;*/
	
	var departureDate = $("#"+departureDateId).val(); 
	var returnDate = $(element).val();
	

	
	
	if (departureDate.trim() == "") {
		document.getElementById(errDepartureDateId).innerHTML = departureDateName;
		flag = false;
	}
	
	
	if (returnDate.trim() == "") {
		document.getElementById(errElementId).innerHTML = name;
		flag = false;
	}
	
	
	
	var elementDepartureDate = document.getElementById(departureDateId);

	if(chkValidFlightDepartureDate(elementDepartureDate, errDepartureDateId, departureDateName)){
		// check return date
		if(chkValidDate(element, errElementId, name)){
		    var departureDate = elementDepartureDate.value;
		    var returnDate = element.value;	    
		    
		    var departureDates= new Array(); 
		    departureDates=departureDate.split("-"); 
		    departureDate = new Date(departureDates[2],departureDates[1] - 1,departureDates[0], 0, 0, 0, 0);
			var returnDates= new Array();
			returnDates=returnDate.split("-");
			returnDate = new Date(returnDates[2],returnDates[1] - 1,returnDates[0], 0, 0, 0, 0);
		    
		    //departureDate = new Date(departureDate);
		    //returnDate = new Date(returnDate);
		    
		    var dateDiff = dateDiffInDays(departureDate, returnDate);
		    if(dateDiff < 0){
		    	var msg = getBundle(getBundleLanguage, "flight.returnDate.notLessThanCurrent.message");
	        	document.getElementById(errElementId).innerHTML = msg;
	        	flag = false;
		    }
	        if (dateDiff > 31) {
	        	var msg = getBundle(getBundleLanguage, "flight.returnDate.notValid.message");
	        	document.getElementById(errElementId).innerHTML = msg;
	        	flag = false;
	        } 
		}else{
			flag = false;
		}			
	}
	return flag;
}

// validation - applicant  
function chkNotNullApplicantName(element, errElementId, placeholder){
	if($(element).val()==placeholder.trim()){
		$(element).val('');
    }
	
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "applicant.name.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		
		$(element).addClass('invalid-field');
		$(element).val(placeholder);
		return false;
	}else{
		resetErrElement(errElementId);
		$(element).removeClass('invalid-field');
		return true;
	}
}
function chkValidApplicantHkId(element, errElementId, typeId){
	var type = "";
	if(typeId != ""){	//idType is id of control
		var e = document.getElementById(typeId);  
		var type = e.options[e.selectedIndex].text;
	}
	if(type == "" || type == "香港身份證"){
		type="HKID";
	}else if(type == "護照號碼"){
		type="Passport";
	}
	element.value = element.value.toUpperCase();
	
	if(isNull(element) && type == 'HKID'){
		var msg = getBundle(getBundleLanguage, "applicant.hkId.notNull.message");
		msg = String.format(msg, type);
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else if(!IsHKID(element.value) && type == 'HKID'){
		var msg = getBundle(getBundleLanguage, "applicant.hkId.notValid.message");
		msg = String.format(msg, type);
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else if(isNull(element) && type == 'Passport'){
		var msg = getBundle(getBundleLanguage, "applicant.passport.notNull.message");
		msg = String.format(msg, type);
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else if(!chkTravelHKPassLen(element.value) && type == 'Passport'){
		var msg = getBundle(getBundleLanguage, "applicant.passport.notValidLength.message");
		msg = String.format(msg, type);
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else if(!chkTravelHKPass(element.value) && type == 'Passport'){
		var msg = getBundle(getBundleLanguage, "applicant.passport.notEnglish.message");
		msg = String.format(msg, type);
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else{
		resetErrElement(errElementId);
		$(element).removeClass('invalid-field');
		return true;
	}		
}
function chkValidApplicantMobileNo(element, errElementId){
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "applicant.mobileNo.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else if(!mobile_pattern.test(element.value)){
		var msg = getBundle(getBundleLanguage, "applicant.mobileNo.notValid.message");
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else{
		resetErrElement(errElementId);
		$(element).removeClass('invalid-field');
		return true;
	}	
}
function chkValidApplicantEmail(element, errElementId){
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "applicant.email.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else if(!emailreg.test(element.value)){
		var msg = getBundle(getBundleLanguage, "applicant.email.notValid.message");
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else{
		resetErrElement(errElementId);
		$(element).removeClass('invalid-field');
		return true;
	}	
}
//validation - insured
function chkNotNullInsuredName(element, errElementId){
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "insured.name.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else{
		resetErrElement(errElementId);
		$(element).removeClass('invalid-field');
		return true;
	}
}
function chkValidInsuredHkId(element, errElementId, typeId){
	var type = "";
	if(typeId != ""){	//idType is id of control
		var e = document.getElementById(typeId);  
		var type = e.options[e.selectedIndex].text;
	}
	if(type == ""){
		type="HKID";
	}
	
	if(isNull(element)){	
		var msg = getBundle(getBundleLanguage, "insured.hkId.notNull.message");
		msg = String.format(msg, type);
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else if(!IsHKID(element.value)){
		var msg = getBundle(getBundleLanguage, "insured.hkId.notValid.message");
		msg = String.format(msg, type);
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}
	else{
		resetErrElement(errElementId);
		$(element).removeClass('invalid-field');
		return true;
	}
}
function chkNotNullBeneficiary(element, errElementId){
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "insured.beneficiary.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		$(element).addClass('invalid-field');
		return false;
	}else{
		resetErrElement(errElementId);
		$(element).removeClass('invalid-field');
		return true;
	}	
}
//validation - beneficiary
function chkNotNullBeneficiaryName(element, errElementId, beneficiary){
	if(beneficiary != null){
		var selectedValue = beneficiary.value;
		if(selectedValue != "SE"){
			if(isNull(element)){
				var msg = getBundle(getBundleLanguage, "beneficiary.name.notNull.message");
				document.getElementById(errElementId).innerHTML = msg;
				$(element).addClass('invalid-field');
				return false;
			}else{
				resetErrElement(errElementId);
				$(element).removeClass('invalid-field');
				return true;
			}			
		}else{
			resetErrElement(errElementId);
			$(element).removeClass('invalid-field');
			return true;
		}
	}
}
function chkNotNullBeneficiaryHkId(element, errElementId, beneficiary){
	if(beneficiary != null){
		var selectedValue = beneficiary.value;
		if(selectedValue != "SE"){
			if(isNull(element)){
				var msg = getBundle(getBundleLanguage, "beneficiary.hkId.notNull.message");
				document.getElementById(errElementId).innerHTML = msg;
				$(element).addClass('invalid-field');
				return false;
			}else if(!IsHKID(element.value)){
				var msg = getBundle(getBundleLanguage, "beneficiary.hkId.notValid.message");
				document.getElementById(errElementId).innerHTML = msg;
				$(element).addClass('invalid-field');
				return false;
			}
			else{
				resetErrElement(errElementId);
				$(element).removeClass('invalid-field');
				return true;
			}			
		}else{
			resetErrElement(errElementId);
			$(element).removeClass('invalid-field');
			return true;
		}
		
	}
}
// validation - credit card
function chkValidCreditCard(element, errElementId){
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "applicant.creditcard.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		return false;
	}else if(element.value.length<16){
		var msg = getBundle(getBundleLanguage, "applicant.creditcard.notValid.message");
		document.getElementById(errElementId).innerHTML = msg;
		return false;
	}else{
		resetErrElement(errElementId);
		return true;
	}	
}
function chkValidCreditCardExpDate(element, errElementId, monthId, errMonthElementId){
	var month = 0;
	var year = 0;
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth();
	if(monthId != ""){	//idType is id of control
		var e = document.getElementById(monthId);  
		month = e.options[e.selectedIndex].value;

		if(!IsNumeric(month)){
			var msg = getBundle(getBundleLanguage, "applicant.creditcard.month.notNull.message");
			document.getElementById(errMonthElementId).innerHTML = msg;
			$("#inputMonth").addClass("invalid-field");
			$("#"+monthId).addClass("invalid-field");
			return false;
		}else if (month < 1){
			var msg = getBundle(getBundleLanguage, "applicant.creditcard.month.notValid.message");
			document.getElementById(errMonthElementId).innerHTML = msg;
			$("#inputMonth").addClass("invalid-field");
			$("#"+monthId).addClass("invalid-field");
			return false;
		}else{
			resetErrElement(errMonthElementId);
			$("#inputMonth").removeClass("invalid-field");
			$("#"+monthId).removeClass("invalid-field");
			return true;
		}
			
		
	}
	
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "applicant.creditcard.year.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		$("#inputYear").addClass("invalid-field");
		$("#year").addClass("invalid-field");
		return false;
	}else{	
		year = element.value;
		
		if(!IsNumeric(year)){
			var msg = getBundle(getBundleLanguage, "applicant.creditcard.year.notValid.message");
			document.getElementById(errElementId).innerHTML = msg;
			$("#inputYear").addClass("invalid-field");
			$("#year").addClass("invalid-field");
			return false;
		} else {
			year = parseInt(year);
			nowYear = parseInt(nowYear);
			
			month = parseInt(month);
			nowMonth = parseInt(nowMonth);
			
			
			if(year < nowYear){	
				var msg = getBundle(getBundleLanguage, "applicant.creditcard.year.notValid.message");
				document.getElementById(errElementId).innerHTML = msg;
				$("#inputYear").addClass("invalid-field");
				$("#year").addClass("invalid-field");
				return false;
				
			} else if(year <= nowYear && month <= nowMonth){
			
				var msg = getBundle(getBundleLanguage, "applicant.creditcard.month.notValid.message");
				document.getElementById(errMonthElementId).innerHTML = msg;
				$("#inputMonth").addClass("invalid-field");
				$("#month").addClass("invalid-field");
				var msg = getBundle(getBundleLanguage, "applicant.creditcard.year.notValid.message");
				document.getElementById(errElementId).innerHTML = msg;
				$("#inputYear").addClass("invalid-field");
				$("#year").addClass("invalid-field");
				return false;
				
			} else{
				resetErrElement(errElementId);
				resetErrElement(errMonthElementId);
				$("#inputYear").removeClass("invalid-field");
				$("#year").removeClass("invalid-field");
				$("#inputMonth").removeClass("invalid-field");
				$("#month").removeClass("invalid-field");
				return true;
			}			
		}
			
	}		
}
function chkNotNullCreditCareName(element, errElementId)
{
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "applicant.creditcard.name.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		$("#holdername").addClass("invalid-field");
		$("#card-name").addClass("invalid-field");
		return false;
	}
	else if (element.value.length < 7 && element.value.trim().indexOf(" ") > 0) {
		var msg = getBundle(getBundleLanguage, "applicant.creditcard.noSpaces.message");
		document.getElementById(errElementId).innerHTML = msg;
		$("#holdername").addClass("invalid-field");
		$("#card-name").addClass("invalid-field");
		return false;
	}
	else{
		resetErrElement(errElementId);
		$("#holdername").removeClass("invalid-field");
		$("#card-name").removeClass("invalid-field");
		return true;
	}
}

/* Skip space checking */
function chkNotNullCreditCareNameEx2(element, errElementId)
{
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "applicant.creditcard.name.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		$("#holdername").addClass("invalid-field");
		$("#card-name").addClass("invalid-field");
		return false;
	}
	else{
		resetErrElement(errElementId);
		$("#holdername").removeClass("invalid-field");
		$("#card-name").removeClass("invalid-field");
		return true;
	}
}

function chkNotNullCardCvv(element, errElementId)
{
	if(isNull(element)){
		$('#errcode').html(getBundle(getBundleLanguage, "payment.creditCard.securityCode.notNull.message"));
		$("#card-cvv").addClass("invalid-field");
		return false;
	}
	else if (element.value != "" && element.value.length <3) {
		$('#errcode').html(getBundle(getBundleLanguage, "payment.creditCard.securityCode.notValid.message"));
		$("#card-cvv").addClass("invalid-field");
		return false;
	}
	else{
		resetErrElement(errElementId);
		$("#card-cvv").removeClass("invalid-field");
		return true;
	}
}
// validation - address
function chkNotNullCABuilding(element, errElementId){
	document.getElementById(errElementId).innerHTML = '';
	//COMMENT BY NAT - AS THE RULE NOW IS EITHER BUILDING / ESTATE NEED TO FILLED
	
	$(element).removeClass('invalid-field');
	return true;
//	if(isNull(element)){
//		var msg = getBundle(getBundleLanguage, "applicant.address.correspondence.building.notNull.message");
//		document.getElementById(errElementId).innerHTML = msg;
//		return false;
//	}else{
//		resetErrElement(errElementId);
//		return true;
//	}	
}
function chkNotNullCAEstate(element, errElementId){
	document.getElementById(errElementId).innerHTML = '';
	//COMMENT BY NAT - AS THE RULE NOW IS EITHER BUILDING / ESTATE NEED TO FILLED
	
	$(element).removeClass('invalid-field');
	return true;
//	if(isNull(element)){
//		var msg = getBundle(getBundleLanguage, "applicant.address.correspondence.estate.notNull.message");
//		document.getElementById(errElementId).innerHTML = msg;
//		return false;
//	}else{
//		resetErrElement(errElementId);
//		return true;
//	}	
}
function chkNotNullIABuilding(element, errElementId){
	document.getElementById(errElementId).innerHTML = '';
	//COMMENT BY NAT - AS THE RULE NOW IS EITHER BUILDING / ESTATE NEED TO FILLED
	$(element).removeClass('invalid-field');
	return true;
//	if(isNull(element)){
//		var msg = getBundle(getBundleLanguage, "insured.address.building.notNull.message");
//		document.getElementById(errElementId).innerHTML = msg;
//		return false;
//	}else{
//		resetErrElement(errElementId);
//		return true
//	}	
}
function chkNotNullIAEstate(element, errElementId){
	document.getElementById(errElementId).innerHTML = '';
	//COMMENT BY NAT - AS THE RULE NOW IS EITHER BUILDING / ESTATE NEED TO FILLED
	$(element).removeClass('invalid-field');
	return true;
//	if(isNull(element)){
//		var msg = getBundle(getBundleLanguage, "insured.address.estate.notNull.message");
//		document.getElementById(errElementId).innerHTML = msg;
//		return false;
//	}else{
//		resetErrElement(errElementId);
//		return true;
//	}	
}
function chkNotNullIANetFloorArea(element, errElementId){
	if(isNull(element)){
		var msg = getBundle(getBundleLanguage, "insured.address.netFloorArea.notNull.message");
		document.getElementById(errElementId).innerHTML = msg;
		$("#inputNFA").addClass("invalid-field");
		return false;
	}else{
		resetErrElement(errElementId);
		$("#inputNFA").removeClass("invalid-field");
		return true;
	}		
}
function chkValidIAEffDate(element, errElementId, name){
	if(chkValidDate(element, errElementId, name)){
	    var EffDate = element.value;
	    var startdays = dateDiffInDaysfromNow(EffDate);
        if (startdays > 60) {
        	var msg = getBundle(getBundleLanguage, "insured.address.effectiveDate.notValid.message");
        	document.getElementById(errElementId).innerHTML = msg;
            return false;
        }else{
        	resetErrElement(errElementId);
        	return true;
        }
        
	}
}

// get resource bundle
//function getBundle(lang, key) {
//	
//	return fwdGetBundle(lang, key); // New Shared Error Message Bundle
//
//	//var rtn; 
//	//loadBundles(lang, key, function(value){
//	//	rtn = value;
//	//});
//	//return rtn;
//}
//function loadBundles(lang, key, fn) {
//	//var u = window.location.origin+''+home+'/resources/bundle/';
//   	$.i18n.properties({
//        name: 'Messages',
//        path: ''+home_url+'/resources/bundle/',
//        mode: 'map',
//        language: lang,
//        cache: true,
//        callback: function() {
//        	fn($.i18n.prop(key)); //msg_welcome;	//$.i18n.prop("msg_welcome")      
//        }
//    });
//}





///////////////

function isAccountNumeric(num){
    return !isNaN(num)
}

function isValidUsername(el){
	var atLeastOneCharacterReg = /^[A-Za-z]+$/;
	if (el.trim() == "") {
		return getBundle(getBundleLanguage, "user.username.empty.message");
		
		valid = false;

	} else if (isAccountNumeric(el)) {
		return getBundle(getBundleLanguage, "user.username.notValid.message");
	} else if (!plan_user.test(el)) {
		return getBundle(getBundleLanguage, "user.username.notValid.message");
	} else if(el.length < 6 || el.length > 50) {
		return getBundle(getBundleLanguage, "user.username.length.message");
	} else {
		return true;
	}
}
function isValidPassword(el){
	var passwordPattern = "[a-zA-Z0-9]{8,}";
	var passwordPattern2 = "[A-Z]";
	var passwordPattern3 = "[a-z]";
	var passwordPattern4 = "[0-9]";
	var specialChar = "\\W";
	var rg = new RegExp(passwordPattern);
	var rg2 = new RegExp(passwordPattern2);
	var rg3 = new RegExp(passwordPattern3);
	var rg4 = new RegExp(passwordPattern4);
	var spChar = new RegExp(specialChar);
	
	if (el.trim() == ""){
		message  = getBundle(getBundleLanguage, "user.password.notNull.message");
		return message;
	} else if(!rg.test(el)) { 
		message = getBundle(getBundleLanguage, "user.password.validate.message");
		return message;
	} else if(!rg2.test(el)) { 
		message = getBundle(getBundleLanguage, "user.password.validate.message");
		return message;
	} else if(!rg3.test(el)) { 
		message = getBundle(getBundleLanguage, "user.password.validate.message");
		return message;
	} else if(!rg4.test(el)) { 
		message = getBundle(getBundleLanguage, "user.password.validate.message");
		return message;
	} else if(spChar.test(el)){
		message = getBundle(getBundleLanguage, "user.password.validate.message");
		return message;
	}
	else{
		return true;
	}
}
function passMatch(pass, confirm){
	if (confirm.trim() == "") {
		return getBundle(getBundleLanguage, "user.confirmPassword.empty.message");
	} else if (confirm !== pass) {
		return getBundle(getBundleLanguage, "user.confirmPassword.validate.message");
	}
	else{
		return true;
	}
}

function verifyUserBookingRegistration()
{
	var check = true;
	var userName = $('#Username').val();
	var password = $('#Password').val();
	var checkPassword = $('#Confirm-Password').val();
	if(userName.trim() === '' && password.trim() === '' && checkPassword.trim() === '')
	{
		$('#UsernameError').text('');
		$('#PasswordError').text('');
		$('#Confirm-PasswordError').text('');
	}
	else
	{
		if(isValidUsername(value) !== true){
			$('#UsernameError').text(isValidUsername(value));
			
			check = false;
		};
		if(isValidPassword(value) !== true){
			$('#PasswordError').text(isValidPassword(value));
			check = false;
		};
		if(passMatch(passwordToMatch, value) !== true){
			$('#Confirm-PasswordError').text(passMatch(passwordToMatch, value));
			check = false;
		};
	}
	return check;
}
function checkMembership(field){
	result = true;
	if (field == "Username"){
		value = $("#Username").val().trim();
		$("#Username").val(value);
		if(value == ''){
			$('#UsernameError').text('');
			$("#Username").removeClass("invalid-field");
		}else if(isValidUsername(value) !== true){
			$("#Username").addClass("invalid-field");
			$('#UsernameError').text(isValidUsername(value));
			result = false;
		}else if(checkUsername(value) !== true){
			$("#Username").addClass("invalid-field");
			$('#UsernameError').text(checkUsername(value));
			result = false;
		}else{
			$('#UsernameError').text('');
			$("#Username").removeClass("invalid-field");
		}
	}else if (field == "Password"){
		value = $("#Password").val().trim();
		$("#Password").val(value);
		if(value == ''){
			$('#PasswordError').text('');
			$("#Password").removeClass("invalid-field");
		}
		else if(isValidPassword(value) !== true){
			$("#Password").addClass("invalid-field");
			$('#PasswordError').text(isValidPassword(value));
			result = false;
		}else if(value == $("#Username").val().trim()){
			$("#Password").addClass("invalid-field");
			$('#PasswordError').text(getBundle(getBundleLanguage, "user.password.same.message"));
			result = false;
		}else{
			$('#PasswordError').text('');
			$("#Password").removeClass("invalid-field");
		}
	}else if (field == "Confirm-Password"){
		var passwordToMatch = $('#Password').val();
		value = $("#Confirm-Password").val().trim();
		$("#Confirm-Password").val(value);
		if(value == ''){
			$('#Confirm-PasswordError').text('');
			$("#Confirm-Password").removeClass("invalid-field");
		}
		else if(passMatch(passwordToMatch, value) !== true){
			$("#Confirm-Password").addClass("invalid-field");
			$('#Confirm-PasswordError').text(passMatch(passwordToMatch, value));
			result = false;
		} else {
			$('#Confirm-PasswordError').text('');
			$("#Confirm-Password").removeClass("invalid-field");
		}
	}
	return result;
}

/**
 * 验证包含的"@"和".",各自只能有一个且不能为开头和结尾
 */
function checkUsername(el){
	if(el.split('@').length-1 > 1){
		return getBundle(getBundleLanguage, 'user.username.only64.message');
	/*}else if (el.split('.').length-1 > 1){
		return getBundle(getBundleLanguage, 'user.username.only46.message');*/
	}else if (el.indexOf('@') == 0 || el.lastIndexOf('@') == el.length - 1){
		return getBundle(getBundleLanguage, 'user.username.beginorover64.message');
	}else if (el.indexOf('.') == 0 || el.lastIndexOf('.') == el.length - 1){
		return getBundle(getBundleLanguage, 'user.username.beginorover46.message');
	}
	return true
}

$(function () {
if($('#Username').length){
	$cur = $('#Username');
	$cur.on('blur', function(){
		checkMembership("Username");
		
	})
}
if($('#Password').length){
	$cur = $('#Password');
	$cur.on('blur', function(){
		checkMembership("Password");
	})
}
if($('#Confirm-Password').length && $('#Password').length){
	$cur = $('#Confirm-Password');
	$cur.on('blur', function(){
		checkMembership("Confirm-Password");
		
	})
}
});


function isMobileNo(val){
	if(val == ''){
		return getBundle(getBundleLanguage, "applicant.mobileNo.notNull.message");
	}
	else if(!mobile_pattern.test(val)){
		return getBundle(getBundleLanguage, "applicant.mobileNo.notValid.message");
	}
	else{
		return true;
	}
}

function isEmail(val){
	if(val == ''){
		return getBundle(getBundleLanguage, "applicant.email.notNull.message");
	}
	else if(!emailreg.test(val)){
		return getBundle(getBundleLanguage, "applicant.email.notValid.message");
	}
	else{
		return true;
	}
}


//forbade to input special character
function hkidValid(ths){
	childObj = $(ths);
	inputId =$(ths).attr('id');
	parentObj = $(ths).parent();
	preObj = parentObj.prev();
	childrenObj = preObj.children();
	grandson = childrenObj.children();
	selectId = grandson.attr('id');
	
	var inputVal = $('#'+inputId).val();
	var selectHkPass = document.getElementById(selectId).value;
	if(selectHkPass == 'HKID' || selectHkPass == 'appHkid'){
		var newVal = inputVal.replace(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()]/g,'');
		if(inputVal != newVal){
			$('#'+inputId).val(newVal);
		}
	}
}

function hkidOnkeypress(evt) {
	evt = (evt) ? evt : event;
	var eCode = evt.keyCode;
	var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
	var keychar = String.fromCharCode(charCode)
	// || (charCode == 37 && eCode==37) || (charCode == 39  && eCode==39)
	// || (charCode == 37 && keychar != "%") || (charCode == 39  && keychar != "'")
	if ( (charCode >=48 && charCode <=57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 127 || charCode == 8 
			|| (evt.charCode == 0 && evt.keyCode==37) || (evt.charCode == 0 && evt.keyCode==46) || (evt.charCode == 0  && evt.keyCode==39)) {
		return true;
	}
	return false;
}

	
//no chinese method
$(':text').keyup(function(e) {
	
	/* if support chinese, skip */
	if( $(this).hasClass('chinese-input') ){
	// use following if case when backend ready for deploy on Chinese Address of Personal-Details
	//if( $(this).hasClass('chinese-input') || $(this).hasClass('residential-chinese-input') ){
		e.stopPropagation();
		return false;
	}

    var inputVal = $(this).val();
    var newVal = inputVal.replace(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789() @.,-_']/g,'');
    if(inputVal != newVal){
    	$('#'+$(this).attr('id')).val(newVal);
    }
});


// ***** homecare *****

// 1. save credit card info by calling processHomeCarePayment
// 2. post to payment gatway when step 1 success 



$(function () {
	
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var tillDate_from_home= new Date((new Date()).getTime() + 59*24*60*60*1000);
	
	//Homecare Calender
	var checkin = $('#homecareDp').datepicker({
		beforeShowDay: function (date) {
			return date.valueOf() >= now.valueOf() && date.valueOf() < tillDate_from_home;
		},
		autoclose: true,
		todayHighlight: true,
		format: "dd-mm-yyyy"
	}).on('changeDate', function (ev) {
		$(".hidden-sm .form-container .topten").html($('#txtEffDate').val());
		$('#errEffDate').html('');
		$("#homecareDp").removeClass("invalid-field");
	});
	
});

//select text function 
function autoSelect(id){
	var sel = window.getSelection(),
    range = document.createRange();
					
	range.setStart($("#"+id)[0].firstChild, 0);
	range.setEnd($("#"+id)[0].firstChild, $("#"+id)[0].firstChild.length);
	sel.removeAllRanges();
	sel.addRange(range);
	$("#copyTipBox").show();
}

$("#toBeCopied").on("blur",function(){
	$("#copyTipBox").hide();
});

//hkid placehoder
function togglePlaceholder(selectElement, inputId, placeholder){
	if(selectElement.value=="HKID"){
		$("#"+inputId).val(placeholder);
	}else{
		$("#"+inputId).val('');
	}
}

var split;
//Avoid running twice; that would break the `nativeSplit` reference
split = split || function (undef) {

 var nativeSplit = String.prototype.split,
     compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
     self;

 self = function (str, separator, limit) {
     // If `separator` is not a regex, use `nativeSplit`
     if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
         return nativeSplit.call(str, separator, limit);
     }
     var output = [],
         flags = (separator.ignoreCase ? "i" : "") +
                 (separator.multiline  ? "m" : "") +
                 (separator.extended   ? "x" : "") + // Proposed for ES6
                 (separator.sticky     ? "y" : ""), // Firefox 3+
         lastLastIndex = 0,
         // Make `global` and avoid `lastIndex` issues by working with a copy
         separator = new RegExp(separator.source, flags + "g"),
         separator2, match, lastIndex, lastLength;
     str += ""; // Type-convert
     if (!compliantExecNpcg) {
         // Doesn't need flags gy, but they don't hurt
         separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
     }
     /* Values for `limit`, per the spec:
      * If undefined: 4294967295 // Math.pow(2, 32) - 1
      * If 0, Infinity, or NaN: 0
      * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
      * If negative number: 4294967296 - Math.floor(Math.abs(limit))
      * If other: Type-convert, then use the above rules
      */
     limit = limit === undef ?
         -1 >>> 0 : // Math.pow(2, 32) - 1
         limit >>> 0; // ToUint32(limit)
     while (match = separator.exec(str)) {
         // `separator.lastIndex` is not reliable cross-browser
         lastIndex = match.index + match[0].length;
         if (lastIndex > lastLastIndex) {
             output.push(str.slice(lastLastIndex, match.index));
             // Fix browsers whose `exec` methods don't consistently return `undefined` for
             // nonparticipating capturing groups
             if (!compliantExecNpcg && match.length > 1) {
                 match[0].replace(separator2, function () {
                     for (var i = 1; i < arguments.length - 2; i++) {
                         if (arguments[i] === undef) {
                             match[i] = undef;
                         }
                     }
                 });
             }
             if (match.length > 1 && match.index < str.length) {
                 Array.prototype.push.apply(output, match.slice(1));
             }
             lastLength = match[0].length;
             lastLastIndex = lastIndex;
             if (output.length >= limit) {
                 break;
             }
         }
         if (separator.lastIndex === match.index) {
             separator.lastIndex++; // Avoid an infinite loop
         }
     }
     if (lastLastIndex === str.length) {
         if (lastLength || !separator.test("")) {
             output.push("");
         }
     } else {
         output.push(str.slice(lastLastIndex));
     }
     return output.length > limit ? output.slice(0, limit) : output;
 };

 // For convenience
 String.prototype.split = function (separator, limit) {
     return self(this, separator, limit);
 };

 return self;

}();


function validationUsername(evt){	
		evt = (evt) ? evt : event;
		var eCode = evt.keyCode;
		var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		var keychar = String.fromCharCode(charCode)
		if ( (charCode >=48 && charCode <=57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 127 || charCode == 8 
				|| (evt.charCode == 0 && evt.keyCode==37) || (evt.charCode == 0 && evt.keyCode==46) || (evt.charCode == 0  && evt.keyCode==39) 
				|| charCode == 45 || charCode == 95 || charCode == 46 || charCode == 64) {
			return true;
		}
		return false;
	}

try{$("#Username").unbind("keyup");}catch(err){}
try{$("#txtUserName1").unbind("keyup");}catch(err){}
try{$("#fUserName").unbind("keyup");}catch(err){}
try{$("#headerUserName").unbind("keyup");}catch(err){}
try{$("#userName").unbind("keyup");}catch(err){}
try{$("#inputEmailId").unbind("keyup");}catch(err){}

function validationEmail(evt){	
	evt = (evt) ? evt : event;
	var eCode = evt.keyCode;
	var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
	var keychar = String.fromCharCode(charCode)
	if ( (charCode >=48 && charCode <=57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 127 || charCode == 8 
			|| (evt.charCode == 0 && evt.keyCode==37) || (evt.charCode == 0 && evt.keyCode==46) || (evt.charCode == 0  && evt.keyCode==39) 
			|| charCode == 45 || charCode == 95 || charCode == 46 || charCode == 64) {
		return true;
	}
	return false;
}

function scrollToElement(elementId){
	$('html, body').animate({
        scrollTop: $("#"+elementId).offset().top - 100
    }, 1000);
}

function scrollToElementEx(elementId, top){

	var topAdjust = parseInt(top);
	if( topAdjust == NaN || topAdjust == Infinity ){
		topAdjust = 0;
	}

	$('html, body').animate({
        scrollTop: $("#"+elementId).offset().top - topAdjust
    }, 1000);
}

window.jQuery(function() {
  // detect browser scroll bar width
  var scrollDiv = $('<div class="scrollbar-measure"></div>')
        .appendTo(document.body)[0],
      scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  $(document)
    .on('hidden.bs.modal', '.modal', function(evt) {
      // use margin-right 0 for IE8
      $(document.body).css('margin-right', '');
      $(".top-bar").css('padding-right', '');
    })
    .on('show.bs.modal', '.modal', function() {
      // When modal is shown, scrollbar on body disappears.  In order not
      // to experience a "shifting" effect, replace the scrollbar width
      // with a right-margin on the body.
      if ($(window).height() < $(document).height()) {
        $(document.body).css('margin-right', scrollBarWidth + 'px');
        $(".top-bar").css('padding-right', scrollBarWidth + 'px');
      }
    });
});

function changeCreditCardFocus(element,prev_id,next_id){
	if($(element).val().length == 4){
		if(next_id!=''){
			if( /iPad/i.test(navigator.userAgent) ) {
			}else{
//				$("#"+next_id+"_trigger").trigger( 'click' );
				$("#"+next_id).focus();
			}
		}
	}else if($(element).val().length == 0){
		if(prev_id!=''){
			if( /iPad/i.test(navigator.userAgent) ) {
			}else{
//				$("#"+prev_id+"_trigger").trigger( 'click' );
				$("#"+prev_id).focus();
			}
		}
    }
}

function mergeCreditCard(){
	var creditcardNumber=$("#cardNo1").val()+$("#cardNo2").val()+$("#cardNo3").val()+$("#cardNo4").val();
	$("#cardnumber").val(creditcardNumber);
	
	setTimeout(function(){
		if(!$("#cardNo1").is(":focus") && !$("#cardNo2").is(":focus") && !$("#cardNo3").is(":focus") && !$("#cardNo4").is(":focus")){
			validatecardnumber(creditcardNumber);
		}
	},500);
}

$( document ).ready(function() {
//	$('#cardNo1_trigger').on('click', function () {
//		$('#cardNo1').trigger('touchstart'); //trigger touchstart
//    });
//	$('#cardNo2_trigger').on('click', function () {      
//		$('#cardNo2').trigger('touchstart'); //trigger touchstart
//    });
//	$('#cardNo3_trigger').on('click', function () {      
//		$('#cardNo3').trigger('touchstart'); //trigger touchstart
//    });
//	$('#cardNo4_trigger').on('click', function () {      
//		$('#cardNo4').trigger('touchstart'); //trigger touchstart
//    });
//	$('#cardNo1').on('touchstart', function () {
//        $(this).focus();
//    });
//	$('#cardNo2').on('touchstart', function () {
//        $(this).focus();
//    });
//	$('#cardNo3').on('touchstart', function () {
//        $(this).focus();
//    });
//	$('#cardNo4').on('touchstart', function () {
//        $(this).focus();
//    });
});


// Extend Date prototype to a specific String format
// Month(M), Day(d), Hour(h), Minute(m), Second(s), Quater(q) support 1-2 padding characters，   
// Year(y) support 1-4 padding characters, Millisecond(S) only support 1 padding character   
// Example:   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //Month  
    "d+" : this.getDate(),                    //Day
    "h+" : this.getHours(),                   //Hour   
    "m+" : this.getMinutes(),                 //Minute 
    "s+" : this.getSeconds(),                 //Second   
    "q+" : Math.floor((this.getMonth()+3)/3), //Quarter 
    "S"  : this.getMilliseconds()             //Millisecond   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

/* Format amount with comma */
function formatNumberComma(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}
