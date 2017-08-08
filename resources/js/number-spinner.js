// HIDE PAGE LOAD DIV FOR PLAN
$('#family_plan_desk_spinner').hide();
$('#family_plan_btm_spinner').hide();
$('#family_plan_mob_spinner').hide();
// ONCHANGE EVENT FOR PLAN RADIO BUTTON 

$(window).load(function(){
  if($('#divPersonsDesk').length){
    //document.getElementById("divPersonsDesk").style.visibility = "visible";
      $('#lblCountDesk').show();
      /*$('#lblCountDesk').html(traveller + ' Traveller(s)');*/
      $('#lblCountDesk').html(traveller);
      $('#lblPeopleDesk').html('' + traveller);      
      
      var startDate = new Date($('#dp1').datepicker("getDate").valueOf());
      var endDate = new Date($('#dp2').datepicker("getDate").valueOf());
      var trCount = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
      
      $("#lblDaysDesk").html(trCount);
      $('#lblDaysBtm').html(trCount);
      $('#lblDaysMob').html(trCount);
      
  }
  
  if($('#divPersonsBtm').length){
      document.getElementById("divPersonsBtm").style.visibility = "visible";
        $('#lblCountBtm').show();
        //$('#lblCountBtm').html(traveller + ' Traveller(s)');
        $('#lblCountBtm').html(traveller);
        $('#lblPeopleBtm').html('' + traveller);
    }
  
  if($('#divPersonsMob').length){
      document.getElementById("divPersonsMob").style.visibility = "visible";
        $('#lblCountMob').show();
        //$('#lblCountMob').html(traveller + ' Traveller(s)');
        $('#lblCountMob').html(traveller);
        $('#lblPeopleMob').html('' + traveller);
    }
});

function changeSpinnerValue(valElm, val){
	var lblElm = valElm.closest(".number-spinner").find(".input-number");
	lblElm.html(val);
	valElm.val(val);
}

$('.plan').change(function () {
  
    var id = this.id;
    var show_div =  '#'+ id + '_spinner';
    var parent_id = $(this).attr('data-id');


    $('.plan_spinner_' + parent_id).hide();
    $(show_div).show();
    // TODO, to be checked
    $('#family_desk_count').val(0);
    $('#family_btm_count').val(0);
    $('#family_mob_count').val(0);

  // to set 0 val when change event occurence 
    
    if(id == "personal_plan_inline" || id == "family_plan_inline"){
    	//bmg inline
    	
    	if(id == 'personal_plan_inline'){
            var parent = $('.plan_spinner_' + parent_id);
            changeSpinnerValue(parent.find(' #txtAdultsInline'), 0);
            changeSpinnerValue(parent.find(' #txtChildInline'), 0);
            changeSpinnerValue(parent.find(' #txtOtherInline'), 0);
          
            changeSpinnerValue($('#txtTravellersInline'), 1);
            personalTraveller=$('#txtTravellersInline').val();
            
            tempPersonalTraveller = 1;
            tempAdultTraveller = 0;
            tempChildTraveller = 0;
            tempOtherTraveller = 0;
            tempTotalTraveller = 1;
        }else if(id  == 'family_plan_inline'){
        	var parent = $('.plan_spinner_' + parent_id);
        	changeSpinnerValue(parent.find(' #txtAdultsInline'), 1);
        	changeSpinnerValue(parent.find(' #txtChildInline'), 1);
        	changeSpinnerValue(parent.find(' #txtOtherInline'), 0);
          
        	changeSpinnerValue($('#txtTravellersInline'), 0);
        	personalTraveller=$('#txtTravellersInline').val();
      
            $('#family_desk_count').val(2);
            
            tempPersonalTraveller = 0;
            tempAdultTraveller = 1;
            tempChildTraveller = 1;
            tempOtherTraveller = 0;
            tempTotalTraveller = 2;
        }
    }else{
    	//non bmg
    	
    	document.getElementById("divPersonsDesk").style.visibility = "visible";
        document.getElementById("divPersonsMob").style.visibility = "visible";
        document.getElementById("divPersonsBtm").style.visibility = "visible";
    	
	    if(parent_id =='desk')
	    {
	    	$('#lblCountDesk').html('');
	        if(id  == 'family_plan_desk'){  
	        	$("#family_plan_desk").trigger('click');
	        	$("#family_plan_mob").trigger('click');
	        	$("#family_plan_btm").trigger('click');
	        	
	        	$("#totalPersonalTraveller").val(0);
	        	
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtAdultsDesk'), 1);
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtChildDesk'), 1);
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtOtherDesk'), 0);
	        	changeSpinnerValue($('.plan_spinner_mob').find(' #txtAdultsMob'), 1);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtChildMob'), 1);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtOtherMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtAdultsBtm'), 1);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtChildBtm'), 1);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtOtherBtm'), 0);
	          
	        	changeSpinnerValue($('#txtTravellersDesk'), 0);
	        	personalTraveller=$('#txtTravellersDesk').val();
	        	changeSpinnerValue($('#txtTravellersMob'), 0);
	            changeSpinnerValue($('#txtTravellersBtm'), 0);
	      
	            $('#lblCountDesk').html(2);
	            $('#lblCountMob').html(2);
	            $('#lblCountBtm').html(2);
	            $('#lblCountDesk').show();
	            $('#lblCountMob').show();
	            $('#lblCountBtm').show();
	            
	            $('#lblPeopleDesk').html(2);
	            $('#lblPeopleMob').html(2);
	            $('#lblPeopleBtm').html(2);
	            
	            $('#family_desk_count').val(2);
	            $('#family_mob_count').val(2);
	            $('#family_btm_count').val(2);
	        }else{
	        	$("#personal_plan_desk").trigger('click');
	        	$("#personal_plan_mob").trigger('click');
	        	$("#personal_plan_btm").trigger('click');
	        	
	        	$("#totalAdultTraveller").val(0);
	        	$("#totalChildTraveller").val(0);
	        	$("#totalOtherTraveller").val(0);
	        	
	            changeSpinnerValue($('.plan_spinner_desk').find(' #txtAdultsDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_desk').find(' #txtChildDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_desk').find(' #txtOtherDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_mob').find(' #txtAdultsMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtChildMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtOtherMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtAdultsBtm'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtChildBtm'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtOtherBtm'), 0);
	          
	            changeSpinnerValue($('#txtTravellersDesk'), 1);
	            personalTraveller=$('#txtTravellersDesk').val();
	            changeSpinnerValue($('#txtTravellersMob'), 1);
	            changeSpinnerValue($('#txtTravellersBtm'), 1);
	            
	            $('#lblCountDesk').html(1);
	            $('#lblCountMob').html(1);
	            $('#lblCountBtm').html(1);
	            $('#lblCountDesk').show();
	            $('#lblCountMob').show();
	            $('#lblCountBtm').show();
	            
	            $('#lblPeopleDesk').html(1);
	            $('#lblPeopleMob').html(1);
	            $('#lblPeopleBtm').html(1);
	            
	            $('#family_desk_count').val(0);
	            $('#family_mob_count').val(0);
	            $('#family_btm_count').val(0);
	        }
	    }else if(parent_id =='mob'){      
	    	$('#lblCountMob').html('');      
	    	if(id  == 'family_plan_mob') 
	    	{
	    		$("#family_plan_desk").trigger('click');
	        	$("#family_plan_mob").trigger('click');
	        	$("#family_plan_btm").trigger('click');
	    		
	    		$("#totalPersonalTraveller").val(0);
	    		
	    		changeSpinnerValue($('.plan_spinner_desk').find(' #txtAdultsDesk'), 1);
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtChildDesk'), 1);
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtOtherDesk'), 0);
	        	changeSpinnerValue($('.plan_spinner_mob').find(' #txtAdultsMob'), 1);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtChildMob'), 1);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtOtherMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtAdultsBtm'), 1);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtChildBtm'), 1);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtOtherBtm'), 0);
	        
	    		changeSpinnerValue($('#txtTravellersDesk'), 0);
	        	changeSpinnerValue($('#txtTravellersMob'), 0);
	            personalTraveller=$('#txtTravellersMob').val();
	            changeSpinnerValue($('#txtTravellersBtm'), 0);
	        
	            $('#lblCountDesk').html(2);
	            $('#lblCountMob').html(2);
	            $('#lblCountBtm').html(2);
	            $('#lblCountDesk').show();
	            $('#lblCountMob').show();
	            $('#lblCountBtm').show();
	            
	            $('#lblPeopleDesk').html(2);
	            $('#lblPeopleMob').html(2);
	            $('#lblPeopleBtm').html(2);
	            
	            $('#family_desk_count').val(2);
	            $('#family_mob_count').val(2);
	            $('#family_btm_count').val(2);
	    	}else{
	    		$("#personal_plan_desk").trigger('click');
	        	$("#personal_plan_mob").trigger('click');
	        	$("#personal_plan_btm").trigger('click');
	    		
	    		$("#totalAdultTraveller").val(0);
	        	$("#totalChildTraveller").val(0);
	        	$("#totalOtherTraveller").val(0);
	    		
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtAdultsDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_desk').find(' #txtChildDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_desk').find(' #txtOtherDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_mob').find(' #txtAdultsMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtChildMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtOtherMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtAdultsBtm'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtChildBtm'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtOtherBtm'), 0);
	    		
	    		changeSpinnerValue($('#txtTravellersDesk'), 1);
	            changeSpinnerValue($('#txtTravellersMob'), 1);
	            personalTraveller=$('#txtTravellersMob').val();
	            changeSpinnerValue($('#txtTravellersBtm'), 1);
	          
	    		$('#lblCountDesk').html(1);
	            $('#lblCountMob').html(1);
	            $('#lblCountBtm').html(1);
	            $('#lblCountDesk').show();
	            $('#lblCountMob').show();
	            $('#lblCountBtm').show();
	            
	            $('#lblPeopleDesk').html(1);
	            $('#lblPeopleMob').html(1);
	            $('#lblPeopleBtm').html(1);
	            
	            $('#family_desk_count').val(0);
	            $('#family_mob_count').val(0);
	            $('#family_btm_count').val(0);
	    	}
	    }else if(parent_id =='btm')  // Bottom plan selector
	    {
	    	$('#lblCountBtm').html('');      
	    	if(id  == 'family_plan_btm') 
	    	{
	    		$("#family_plan_desk").trigger('click');
	        	$("#family_plan_mob").trigger('click');
	        	$("#family_plan_btm").trigger('click');
	    		
//	    		$('.plan_spinner_desk').hide();
//	        	$('.plan_spinner_mob').hide();
//	        	$('.plan_spinner_btm').hide();
//	            $("#family_plan_desk_spinner").show();
//	            $("#family_plan_mob_spinner").show();
//	            $("#family_plan_btm_spinner").show();
	    		
	    		$("#totalPersonalTraveller").val(0);
	    		
	    		changeSpinnerValue($('.plan_spinner_desk').find(' #txtAdultsDesk'), 1);
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtChildDesk'), 1);
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtOtherDesk'), 0);
	        	changeSpinnerValue($('.plan_spinner_mob').find(' #txtAdultsMob'), 1);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtChildMob'), 1);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtOtherMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtAdultsBtm'), 1);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtChildBtm'), 1);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtOtherBtm'), 0);
	    		
	    		changeSpinnerValue($('#txtTravellersDesk'), 0);
	        	changeSpinnerValue($('#txtTravellersMob'), 0);
	            changeSpinnerValue($('#txtTravellersBtm'), 0);
	            personalTraveller=$('#txtTravellersBtm').val();
	        
	            $('#lblCountDesk').html(2);
	            $('#lblCountMob').html(2);
	            $('#lblCountBtm').html(2);
	            $('#lblCountDesk').show();
	            $('#lblCountMob').show();
	            $('#lblCountBtm').show();
	            
	            $('#lblPeopleDesk').html(2);
	            $('#lblPeopleMob').html(2);
	            $('#lblPeopleBtm').html(2);
	            
	            $('#family_desk_count').val(2);
	            $('#family_mob_count').val(2);
	            $('#family_btm_count').val(2);
	    	}else{
	    		$("#personal_plan_desk").trigger('click');
	        	$("#personal_plan_mob").trigger('click');
	        	$("#personal_plan_btm").trigger('click');
	    		
//	    		$('.plan_spinner_desk').hide();
//	        	$('.plan_spinner_mob').hide();
//	        	$('.plan_spinner_btm').hide();
//	            $("#personal_plan_desk_spinner").show();
//	            $("#personal_plan_mob_spinner").show();
//	            $("#personal_plan_btm_spinner").show();
	    		
	    		$("#totalAdultTraveller").val(0);
	        	$("#totalChildTraveller").val(0);
	        	$("#totalOtherTraveller").val(0);
	    		
	        	changeSpinnerValue($('.plan_spinner_desk').find(' #txtAdultsDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_desk').find(' #txtChildDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_desk').find(' #txtOtherDesk'), 0);
	            changeSpinnerValue($('.plan_spinner_mob').find(' #txtAdultsMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtChildMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_mob').find(' #txtOtherMob'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtAdultsBtm'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtChildBtm'), 0);
	    		changeSpinnerValue($('.plan_spinner_btm').find(' #txtOtherBtm'), 0);
	    		
	    		changeSpinnerValue($('#txtTravellersDesk'), 1);
	            changeSpinnerValue($('#txtTravellersMob'), 1);
	            changeSpinnerValue($('#txtTravellersBtm'), 1);
	            personalTraveller=$('#txtTravellersBtm').val();
	        
	            $('#lblCountDesk').html(1);
	            $('#lblCountMob').html(1);
	            $('#lblCountBtm').html(1);
	            $('#lblCountDesk').show();
	            $('#lblCountMob').show();
	            $('#lblCountBtm').show();
	            
	            $('#lblPeopleDesk').html(1);
	            $('#lblPeopleMob').html(1);
	            $('#lblPeopleBtm').html(1);
	            
	            $('#family_desk_count').val(0);
	            $('#family_mob_count').val(0);
	            $('#family_btm_count').val(0);
	    	}
		}
    }
});

// PLUS AND MINUS BUTTON EVENT TO CONTROLL TRAVERLLER PEOPLE
$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[id='"+fieldName+"']");
    var label = $(this).closest(".number-spinner").find(".input-number");
      //PARENT ID CHECK PLAN PERSONAL OR FAMILY
    plan = $(this).attr('data-parent');
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
              if(currentVal > input.attr('data-min')) {
                input.val(currentVal - 1).change();
                /**minus****/
                if (fieldName == 'txtTravellersInline' || fieldName == 'txtAdultsInline' || fieldName == 'txtChildInline' || fieldName == 'txtOtherInline') {
                	//bmg inline
                	if(plan  == 'family')
                    {
                        var family_desk_count =  parseInt($('#family_desk_count').val());
                        var total_people =  family_desk_count - 1;
                        
                        $('#family_desk_count').val(total_people);
                        if(fieldName == 'txtAdultsInline'){
                        	tempAdultTraveller = parseInt(input.val());
                        }else if(fieldName == 'txtChildInline'){
                        	tempChildTraveller = parseInt(input.val());
                        }else if(fieldName == 'txtOtherInline'){
                        	tempOtherTraveller = parseInt(input.val());
                        }
                        
                    }else{
                    	tempPersonalTraveller = parseInt(input.val());
                    }
                	
                	tempTotalTraveller--;
                	
                	label.html(input.val());
                	
                    var startDate = new Date($('#dp1').datepicker("getDate").valueOf());
                    var endDate = new Date($('#dp2').datepicker("getDate").valueOf());
                }else if (fieldName == 'txtTravellersBtm' || fieldName == 'txtAdultsBtm' || fieldName == 'txtChildBtm' || fieldName == 'txtOtherBtm') {

                        if(plan  == 'family')
                        {   
                              var family_btm_count =  parseInt($('#family_btm_count').val());
                              var total_people =  family_btm_count - 1;
                              
                              $('#family_desk_count').val(total_people);
                              $('#family_mob_count').val(total_people);
                              $('#family_btm_count').val(total_people);
                              
                              document.getElementById("lblCountDesk").innerHTML = total_people;
                              document.getElementById("lblCountMob").innerHTML = total_people;
                              document.getElementById("lblCountBtm").innerHTML = total_people;
                              
                              document.getElementById("lblPeopleDesk").innerHTML = total_people;
                              document.getElementById("lblPeopleMob").innerHTML = total_people;
                              document.getElementById("lblPeopleBtm").innerHTML = total_people;
                              
                              if(fieldName == 'txtAdultsDesk' || fieldName == 'txtAdultsMob' || fieldName == 'txtAdultsBtm'){
                            	  $("input[id='txtAdultsDesk']").val(currentVal - 1).change();
                                  $("input[id='txtAdultsMob']").val(currentVal - 1).change();
                                  $("input[id='txtAdultsBtm']").val(currentVal - 1).change();
                                  
                                  $("button[data-field='txtAdultsDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtAdultsMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtAdultsBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                              }else if(fieldName == 'txtChildDesk' || fieldName == 'txtChildMob' || fieldName == 'txtChildBtm'){
                            	  $("input[id='txtChildDesk']").val(currentVal - 1).change();
                                  $("input[id='txtChildMob']").val(currentVal - 1).change();
                                  $("input[id='txtChildBtm']").val(currentVal - 1).change();
                                  
                                  $("button[data-field='txtChildDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtChildMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtChildBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                              }else if(fieldName == 'txtOtherDesk' || fieldName == 'txtOtherMob' || fieldName == 'txtOtherBtm'){
                            	  $("input[id='txtOtherDesk']").val(currentVal - 1).change();
                                  $("input[id='txtOtherMob']").val(currentVal - 1).change();
                                  $("input[id='txtOtherBtm']").val(currentVal - 1).change();
                                  
                                  $("button[data-field='txtOtherDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtOtherMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtOtherBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                              }
                              
                              
                              label.html(input.val());
                        }else
                        {
                        	document.getElementById("lblCountDesk").innerHTML = input.val();
                        	document.getElementById("lblCountMob").innerHTML = input.val();
                        	document.getElementById("lblCountBtm").innerHTML = input.val();
                        	
                        	document.getElementById("lblPeopleDesk").innerHTML = input.val();
                            document.getElementById("lblPeopleMob").innerHTML = input.val();
                            document.getElementById("lblPeopleBtm").innerHTML = input.val();
                               
                               $("input[id='txtTravellersDesk']").val(currentVal - 1).change();
                               $("input[id='txtTravellersMob']").val(currentVal - 1).change();
                               $("input[id='txtTravellersBtm']").val(currentVal - 1).change();
                               
                               $("button[data-field='txtTravellersDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                               $("button[data-field='txtTravellersMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                               $("button[data-field='txtTravellersBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                               
                               label.html(input.val());
                        }

                        var startDate = new Date($('#dp5').datepicker("getDate").valueOf());
                        var endDate = new Date($('#dp6').datepicker("getDate").valueOf());
                        document.getElementById("lblDaysBtm").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
                        document.getElementById("divPersonsBtm").style.visibility = "visible";
                    }
                else if (fieldName == "txtTravellersMob" || fieldName == 'txtAdultsMob' || fieldName == 'txtChildMob' || fieldName == 'txtOtherMob') {

                       /* mobile spinner */
                        if(plan  == 'family')
                        {   
                              var family_mob_count =  parseInt($('#family_mob_count').val());
                              var total_people =  family_mob_count - 1;
                              
                              $('#family_desk_count').val(total_people);
                              $('#family_mob_count').val(total_people);
                              $('#family_btm_count').val(total_people);
                              
                              document.getElementById("lblCountDesk").innerHTML = total_people;
                              document.getElementById("lblCountMob").innerHTML = total_people;
                              document.getElementById("lblCountBtm").innerHTML = total_people;
                              
                              document.getElementById("lblPeopleDesk").innerHTML = total_people;
                              document.getElementById("lblPeopleMob").innerHTML = total_people;
                              document.getElementById("lblPeopleBtm").innerHTML = total_people;
                              
                              if(fieldName == 'txtAdultsDesk' || fieldName == 'txtAdultsMob' || fieldName == 'txtAdultsBtm'){
                            	  $("input[id='txtAdultsDesk']").val(currentVal - 1).change();
                                  $("input[id='txtAdultsMob']").val(currentVal - 1).change();
                                  $("input[id='txtAdultsBtm']").val(currentVal - 1).change();
                                  
                                  $("button[data-field='txtAdultsDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtAdultsMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtAdultsBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                              }else if(fieldName == 'txtChildDesk' || fieldName == 'txtChildMob' || fieldName == 'txtChildBtm'){
                            	  $("input[id='txtChildDesk']").val(currentVal - 1).change();
                                  $("input[id='txtChildMob']").val(currentVal - 1).change();
                                  $("input[id='txtChildBtm']").val(currentVal - 1).change();
                                  
                                  $("button[data-field='txtChildDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtChildMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtChildBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                              }else if(fieldName == 'txtOtherDesk' || fieldName == 'txtOtherMob' || fieldName == 'txtOtherBtm'){
                            	  $("input[id='txtOtherDesk']").val(currentVal - 1).change();
                                  $("input[id='txtOtherMob']").val(currentVal - 1).change();
                                  $("input[id='txtOtherBtm']").val(currentVal - 1).change();
                                  
                                  $("button[data-field='txtOtherDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtOtherMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                  $("button[data-field='txtOtherBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                              }
                              
                              label.html(input.val());
                        }else
                        {
                        	document.getElementById("lblCountDesk").innerHTML = input.val();
                        	document.getElementById("lblCountMob").innerHTML = input.val();
                        	document.getElementById("lblCountBtm").innerHTML = input.val();
                        	
                        	document.getElementById("lblPeopleDesk").innerHTML = input.val();
                            document.getElementById("lblPeopleMob").innerHTML = input.val();
                            document.getElementById("lblPeopleBtm").innerHTML = input.val();
                            
                            $("input[id='txtTravellersDesk']").val(currentVal - 1).change();
                            $("input[id='txtTravellersMob']").val(currentVal - 1).change();
                            $("input[id='txtTravellersBtm']").val(currentVal - 1).change();
                            
                            $("button[data-field='txtTravellersDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            $("button[data-field='txtTravellersMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            $("button[data-field='txtTravellersBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            
                            label.html(input.val());
                        }

                        var startDate = new Date($('#dp3').datepicker("getDate").valueOf());
                        var endDate = new Date($('#dp4').datepicker("getDate").valueOf());
                        document.getElementById("lblDaysMob").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
                        document.getElementById("divPersonsMob").style.visibility = "visible";
                    }
                    else {
                        /* desktop spinner */

                        if(plan  == 'family')
                        {
                            var family_desk_count =  parseInt($('#family_desk_count').val());
                            var total_people =  family_desk_count - 1;
                            
                            $('#family_desk_count').val(total_people);
                            $('#family_mob_count').val(total_people);
                            $('#family_btm_count').val(total_people);
                            
                            document.getElementById("lblCountDesk").innerHTML = total_people;
                            document.getElementById("lblCountMob").innerHTML = total_people;
                            document.getElementById("lblCountBtm").innerHTML = total_people;
                            
                            document.getElementById("lblPeopleDesk").innerHTML = total_people;
                            document.getElementById("lblPeopleMob").innerHTML = total_people;
                            document.getElementById("lblPeopleBtm").innerHTML = total_people;
                            
                            if(fieldName == 'txtAdultsDesk' || fieldName == 'txtAdultsMob' || fieldName == 'txtAdultsBtm'){
                          	  $("input[id='txtAdultsDesk']").val(currentVal - 1).change();
                                $("input[id='txtAdultsMob']").val(currentVal - 1).change();
                                $("input[id='txtAdultsBtm']").val(currentVal - 1).change();
                                
                                $("button[data-field='txtAdultsDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                $("button[data-field='txtAdultsMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                $("button[data-field='txtAdultsBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            }else if(fieldName == 'txtChildDesk' || fieldName == 'txtChildMob' || fieldName == 'txtChildBtm'){
                          	  $("input[id='txtChildDesk']").val(currentVal - 1).change();
                                $("input[id='txtChildMob']").val(currentVal - 1).change();
                                $("input[id='txtChildBtm']").val(currentVal - 1).change();
                                
                                $("button[data-field='txtChildDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                $("button[data-field='txtChildMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                $("button[data-field='txtChildBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            }else if(fieldName == 'txtOtherDesk' || fieldName == 'txtOtherMob' || fieldName == 'txtOtherBtm'){
                          	  $("input[id='txtOtherDesk']").val(currentVal - 1).change();
                                $("input[id='txtOtherMob']").val(currentVal - 1).change();
                                $("input[id='txtOtherBtm']").val(currentVal - 1).change();
                                
                                $("button[data-field='txtOtherDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                $("button[data-field='txtOtherMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                                $("button[data-field='txtOtherBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            }
                            
                            label.html(input.val());
                        }else
                        {
                        	document.getElementById("lblCountDesk").innerHTML = input.val();
                        	document.getElementById("lblCountMob").innerHTML = input.val();
                        	document.getElementById("lblCountBtm").innerHTML = input.val();
                        	
                        	document.getElementById("lblPeopleDesk").innerHTML = input.val();
                            document.getElementById("lblPeopleMob").innerHTML = input.val();
                            document.getElementById("lblPeopleBtm").innerHTML = input.val();
                            
                            $("input[id='txtTravellersDesk']").val(currentVal - 1).change();
                            $("input[id='txtTravellersMob']").val(currentVal - 1).change();
                            $("input[id='txtTravellersBtm']").val(currentVal - 1).change();
                            
                            $("button[data-field='txtTravellersDesk'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            $("button[data-field='txtTravellersMob'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            $("button[data-field='txtTravellersBtm'][data-type='minus']").closest(".number-spinner").find(".input-number").html(input.val());
                            
                            label.html(input.val());
                        }

                        var startDate = new Date($('#dp1').datepicker("getDate").valueOf());
                        var endDate = new Date($('#dp2').datepicker("getDate").valueOf());
//                        document.getElementById("lblDaysDesk").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
                        //document.getElementById("divPersonsDesk").style.visibility = "visible";
                    }
                

            } 
            if(parseInt(input.val()) == input.attr('data-min')) {
                $(this).attr('disabled', false);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('data-max') ) {
              
              var inc = true;
              if(plan == 'family'){
	        	  if (fieldName == 'txtTravellersInline' || fieldName == 'txtAdultsInline' || fieldName == 'txtChildInline' || fieldName == 'txtOtherInline') {
	                  inc = parseInt($("input[id='txtAdultsInline']").val()) + parseInt($("input[id='txtChildInline']").val()) + parseInt($("input[id='txtOtherInline']").val()) > 14 ? false :true;
	                }
	                else if (fieldName == 'txtTravellersBtm' || fieldName == 'txtAdultsBtm' || fieldName == 'txtChildBtm' || fieldName == 'txtOtherBtm') {
                  inc = parseInt($("input[id='txtAdultsBtm']").val()) + parseInt($("input[id='txtChildBtm']").val()) + parseInt($("input[id='txtOtherBtm']").val()) > 14 ? false :true;
                }
                else if (fieldName == "txtTravellersMob" || fieldName == 'txtAdultsMob' || fieldName == 'txtChildMob' || fieldName == 'txtOtherMob') {
                  inc = parseInt($("input[id='txtAdultsMob']").val()) + parseInt($("input[id='txtChildMob']").val()) + parseInt($("input[id='txtOtherMob']").val()) > 14 ? false :true;
                    
                }
                else{
                  inc = parseInt($("input[id='txtAdultsDesk']").val()) + parseInt($("input[id='txtChildDesk']").val()) + parseInt($("input[id='txtOtherDesk']").val()) > 14 ? false :true;
                }
                
              }
              
              
              
              if(inc){
                input.val(currentVal + 1).change();
                var cval = currentVal + 1;
              
                  
                    /** Plus */
                if (fieldName == 'txtTravellersInline' || fieldName == 'txtAdultsInline' || fieldName == 'txtChildInline' || fieldName == 'txtOtherInline') {
                	//bmg inline
                	if(plan  == 'family')
                    {
                          //GET VALUE OF 
                      var family_desk_count =  parseInt($('#family_desk_count').val());
                       var total_people =  family_desk_count + 1;
                       $('#family_desk_count').val(total_people);
                       if(fieldName == 'txtAdultsInline'){
                       	tempAdultTraveller = parseInt(input.val());
                       }else if(fieldName == 'txtChildInline'){
                       	tempChildTraveller = parseInt(input.val());
                       }else if(fieldName == 'txtOtherInline'){
                       	tempOtherTraveller = parseInt(input.val());
                       }
                       
                   }else{
                   		tempPersonalTraveller = parseInt(input.val());
                   }
                	
                	tempTotalTraveller++;

                	label.html(input.val());
                	
                    var startDate = new Date($('#dp1').datepicker("getDate").valueOf());
                    var endDate = new Date($('#dp2').datepicker("getDate").valueOf());

            } else if (fieldName == 'txtTravellersBtm' || fieldName == 'txtAdultsBtm' || fieldName == 'txtChildBtm' || fieldName == 'txtOtherBtm') {

                        if(plan  == 'family')
                        {   
                              var family_btm_count =  parseInt($('#family_btm_count').val());
                              var total_people =  family_btm_count + 1;
                              
                              $('#family_desk_count').val(total_people);
                              $('#family_mob_count').val(total_people);
                              $('#family_btm_count').val(total_people);
                              
                              document.getElementById("lblCountDesk").innerHTML = total_people;
                              document.getElementById("lblCountMob").innerHTML = total_people;
                              document.getElementById("lblCountBtm").innerHTML = total_people;
                              
                              document.getElementById("lblPeopleDesk").innerHTML = total_people;
                              document.getElementById("lblPeopleMob").innerHTML = total_people;
                              document.getElementById("lblPeopleBtm").innerHTML = total_people;
                               
                                 if(fieldName == 'txtAdultsDesk' || fieldName == 'txtAdultsMob' || fieldName == 'txtAdultsBtm'){
									 $("input[id='txtAdultsDesk']").val(currentVal + 1).change();
									 $("input[id='txtAdultsMob']").val(currentVal + 1).change();
									 $("input[id='txtAdultsBtm']").val(currentVal + 1).change();
									 
									 $("button[data-field='txtAdultsDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtAdultsMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtAdultsBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 }else if(fieldName == 'txtChildDesk' || fieldName == 'txtChildMob' || fieldName == 'txtChildBtm'){
									 $("input[id='txtChildDesk']").val(currentVal + 1).change();
									 $("input[id='txtChildMob']").val(currentVal + 1).change();
									 $("input[id='txtChildBtm']").val(currentVal + 1).change();
									 
									 $("button[data-field='txtChildDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtChildMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtChildBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 }else if(fieldName == 'txtOtherDesk' || fieldName == 'txtOtherMob' || fieldName == 'txtOtherBtm'){
									 $("input[id='txtOtherDesk']").val(currentVal + 1).change();
									 $("input[id='txtOtherMob']").val(currentVal + 1).change();
									 $("input[id='txtOtherBtm']").val(currentVal + 1).change();
									 
									 $("button[data-field='txtOtherDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtOtherMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtOtherBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 }
                               
                               label.html(input.val());
                        }else
                        {
                        	document.getElementById("lblCountDesk").innerHTML = input.val();
                        	document.getElementById("lblCountMob").innerHTML = input.val();
                        	document.getElementById("lblCountBtm").innerHTML = input.val();
                        	
                        	document.getElementById("lblPeopleDesk").innerHTML = input.val();
                            document.getElementById("lblPeopleMob").innerHTML = input.val();
                            document.getElementById("lblPeopleBtm").innerHTML = input.val();
                               
                               $("input[id='txtTravellersDesk']").val(currentVal + 1).change();
                               $("input[id='txtTravellersMob']").val(currentVal + 1).change();
                               $("input[id='txtTravellersBtm']").val(currentVal + 1).change();
                               
                               $("button[data-field='txtTravellersDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                               $("button[data-field='txtTravellersMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                               $("button[data-field='txtTravellersBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                               
                               label.html(input.val());
                        }

                        var startDate = new Date($('#dp5').datepicker("getDate").valueOf());
                        var endDate = new Date($('#dp6').datepicker("getDate").valueOf());
                        document.getElementById("lblDaysBtm").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
                        document.getElementById("divPersonsBtm").style.visibility = "visible";

                } else if (fieldName == "txtTravellersMob" || fieldName == 'txtAdultsMob' || fieldName == 'txtChildMob' || fieldName == 'txtOtherMob') {
                        /* mobile spinner */
                        if(plan  == 'family')
                        {   
                              var family_mob_count =  parseInt($('#family_mob_count').val());
                              var total_people =  family_mob_count + 1;
                              
                              $('#family_desk_count').val(total_people);
                              $('#family_mob_count').val(total_people);
                              $('#family_btm_count').val(total_people);
                              
                              document.getElementById("lblCountDesk").innerHTML = total_people;
                              document.getElementById("lblCountMob").innerHTML = total_people;
                              document.getElementById("lblCountBtm").innerHTML = total_people;
                              
                              document.getElementById("lblPeopleDesk").innerHTML = total_people;
                              document.getElementById("lblPeopleMob").innerHTML = total_people;
                              document.getElementById("lblPeopleBtm").innerHTML = total_people;
                              
                              if(fieldName == 'txtAdultsDesk' || fieldName == 'txtAdultsMob' || fieldName == 'txtAdultsBtm'){
									 $("input[id='txtAdultsDesk']").val(currentVal + 1).change();
									 $("input[id='txtAdultsMob']").val(currentVal + 1).change();
									 $("input[id='txtAdultsBtm']").val(currentVal + 1).change();
									 
									 $("button[data-field='txtAdultsDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtAdultsMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtAdultsBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 }else if(fieldName == 'txtChildDesk' || fieldName == 'txtChildMob' || fieldName == 'txtChildBtm'){
									 $("input[id='txtChildDesk']").val(currentVal + 1).change();
									 $("input[id='txtChildMob']").val(currentVal + 1).change();
									 $("input[id='txtChildBtm']").val(currentVal + 1).change();
									 
									 $("button[data-field='txtChildDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtChildMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtChildBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 }else if(fieldName == 'txtOtherDesk' || fieldName == 'txtOtherMob' || fieldName == 'txtOtherBtm'){
									 $("input[id='txtOtherDesk']").val(currentVal + 1).change();
									 $("input[id='txtOtherMob']").val(currentVal + 1).change();
									 $("input[id='txtOtherBtm']").val(currentVal + 1).change();
									 
									 $("button[data-field='txtOtherDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtOtherMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
									 $("button[data-field='txtOtherBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 }
                              
                              label.html(input.val());
                        }else
                        {
                        	document.getElementById("lblCountDesk").innerHTML = input.val();
                        	document.getElementById("lblCountMob").innerHTML = input.val();
                        	document.getElementById("lblCountBtm").innerHTML = input.val();
                        	
                        	document.getElementById("lblPeopleDesk").innerHTML = input.val();
                            document.getElementById("lblPeopleMob").innerHTML = input.val();
                            document.getElementById("lblPeopleBtm").innerHTML = input.val();
                               
                               $("input[id='txtTravellersDesk']").val(currentVal + 1).change();
                               $("input[id='txtTravellersMob']").val(currentVal + 1).change();
                               $("input[id='txtTravellersBtm']").val(currentVal + 1).change();
                               
                               $("button[data-field='txtTravellersDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                               $("button[data-field='txtTravellersMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                               $("button[data-field='txtTravellersBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                               
                               label.html(input.val());
                        }

                     
                        var startDate = new Date($('#dp3').datepicker("getDate").valueOf());
                        var endDate = new Date($('#dp4').datepicker("getDate").valueOf());
                        document.getElementById("lblDaysMob").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
                        document.getElementById("divPersonsMob").style.visibility = "visible";
                    }
                    else {

                        /* desktop spinner */

                        if(plan  == 'family')
                        {
                              //GET VALUE OF 
                          var family_desk_count =  parseInt($('#family_desk_count').val());
                           var total_people =  family_desk_count + 1;
                           
                           $('#family_desk_count').val(total_people);
                           $('#family_mob_count').val(total_people);
                           $('#family_btm_count').val(total_people);
                           
                           document.getElementById("lblCountDesk").innerHTML = total_people;
                           document.getElementById("lblCountMob").innerHTML = total_people;
                           document.getElementById("lblCountBtm").innerHTML = total_people;
                           
                           document.getElementById("lblPeopleDesk").innerHTML = total_people;
                           document.getElementById("lblPeopleMob").innerHTML = total_people;
                           document.getElementById("lblPeopleBtm").innerHTML = total_people;
                           
                           if(fieldName == 'txtAdultsDesk' || fieldName == 'txtAdultsMob' || fieldName == 'txtAdultsBtm'){
								 $("input[id='txtAdultsDesk']").val(currentVal + 1).change();
								 $("input[id='txtAdultsMob']").val(currentVal + 1).change();
								 $("input[id='txtAdultsBtm']").val(currentVal + 1).change();
								 
								 $("button[data-field='txtAdultsDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 $("button[data-field='txtAdultsMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 $("button[data-field='txtAdultsBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
							 }else if(fieldName == 'txtChildDesk' || fieldName == 'txtChildMob' || fieldName == 'txtChildBtm'){
								 $("input[id='txtChildDesk']").val(currentVal + 1).change();
								 $("input[id='txtChildMob']").val(currentVal + 1).change();
								 $("input[id='txtChildBtm']").val(currentVal + 1).change();
								 
								 $("button[data-field='txtChildDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 $("button[data-field='txtChildMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 $("button[data-field='txtChildBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
							 }else if(fieldName == 'txtOtherDesk' || fieldName == 'txtOtherMob' || fieldName == 'txtOtherBtm'){
								 $("input[id='txtOtherDesk']").val(currentVal + 1).change();
								 $("input[id='txtOtherMob']").val(currentVal + 1).change();
								 $("input[id='txtOtherBtm']").val(currentVal + 1).change();
								 
								 $("button[data-field='txtOtherDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 $("button[data-field='txtOtherMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
								 $("button[data-field='txtOtherBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
							 }
                           
                           label.html(input.val());

                        }else
                        {
                        	document.getElementById("lblCountDesk").innerHTML = input.val();
                        	document.getElementById("lblCountMob").innerHTML = input.val();
                        	document.getElementById("lblCountBtm").innerHTML = input.val();
                        	
                        	document.getElementById("lblPeopleDesk").innerHTML = input.val();
                            document.getElementById("lblPeopleMob").innerHTML = input.val();
                            document.getElementById("lblPeopleBtm").innerHTML = input.val();
                              
                              $("input[id='txtTravellersDesk']").val(currentVal + 1).change();
                              $("input[id='txtTravellersMob']").val(currentVal + 1).change();
                              $("input[id='txtTravellersBtm']").val(currentVal + 1).change();
                              
                              $("button[data-field='txtTravellersDesk'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                              $("button[data-field='txtTravellersMob'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                              $("button[data-field='txtTravellersBtm'][data-type='plus']").closest(".number-spinner").find(".input-number").html(input.val());
                              
                              label.html(input.val());
                        }

                        var startDate = new Date($('#dp1').datepicker("getDate").valueOf());
                        var endDate = new Date($('#dp2').datepicker("getDate").valueOf());
//                        document.getElementById("lblDaysDesk").innerHTML = isNaN(dateDiffInDays(startDate, endDate)) ? 0 : dateDiffInDays(startDate, endDate);
                        //document.getElementById("divPersonsDesk").style.visibility = "visible";
                    }
               
                

              }

            }
            if(parseInt(input.val()) == input.attr('data-max')) {
                $(this).attr('disabled', false);
            }

        }
    } else {
        input.val(0);
    }
});
$('.number-spinner input[data-min][data-max]').focusin(function(){
  $(this).data('oldValue', $(this).val());
});
$('.number-spinner input[data-min][data-max]').change(function() {    
    minValue =  parseInt($(this).attr('data-min'));
    maxValue =  parseInt($(this).attr('data-max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('id');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
    	console.log('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
}); 