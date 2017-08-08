function global_show_bubble(input_ele,bubble_ele){
	$(input_ele).click(function(){
		if($(input_ele +':visible:checkbox:checked').length > 0){
			$(bubble_ele).fadeIn();
		}else{
			$(bubble_ele).fadeOut();
		}
	});
}