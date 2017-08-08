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

$(function() {
	$(window).bind('scroll', function() {
        stickHeaderBrowse();
    });

  $('.preferred-date')
    .on('change', function(e) {
       var $self = $(this);
       
       $self.removeAttr('style');
       
       if(msieversion() > 0) {
          $('.preferred-date').css('font-family','Arial');

          //IE9 placeholder color fix
          if( $self.val() == '' || $self.val()==$self.attr('placeholder') ){
             $self.css('color', '#ccc');
          } else {
             $self.css('color', '#9ba5a7');
          }
       }
    });
		
	$('#so-calendar-dob').on('change', function(e) {
	   var $self = $(this);
	   
	   $self.removeAttr('style');
	   
	   if(msieversion() > 0) {
		  $('#so-calendar-dob').css('font-family','Arial');

		  //IE9 placeholder color fix
		  if( $self.val() == '' || $self.val()==$self.attr('placeholder') ){
			 $self.css('color', '#ccc');
		  } else {
			 $self.css('color', '#9ba5a7');
		  }
	   }
	});
});

function stickHeaderBrowse() {
    if ($('.headerStick').length > 0 ) { // check if flux div exists
       var $application = $('.headerStick');
       var $bar = $('.application-page-header');
       var $navbar = $('.navbar-menu').length ? $('.navbar-menu') : ((getWidth() >= 992) ? $('.navbar-inverse:first') : $('.logobox'));
       var $navbarMenu = $('.logobox > .navbar-header');
         //var $fixedTop = $('.navbar-fixed-top').length ? $('.navbar-fixed-top') : ((getWidth() >= 992) ? $('.top-bar:first') : $('.mob-topbar:first'));
         var $mobBar = $('.mob-topbar');
         var $topBar = $('.top-bar');
         var $mobNavbar = $('.navbar.navbar-default.pad-none');

       if ($(window).scrollTop() >= ($navbar.height() + $('.breadcrumbs').height())) {
          $bar.addClass('sticky-bar');
          //$bar.css('top', $fixedTop.height() + 'px');
          $bar.css('top', $('.navbar-fixed-top').height() + 'px');
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