var isClicked = false; // public variable

function inlinePaddingTop(classname, px) {
    $(classname).css('padding-top', px + 'px');
}

function isVisible(index) {
    if (index !== true) {
        $('.header-notification-box').addClass('hide');
    } else {
        $('.header-notification-box').removeClass('hide');
    }
}

function screenJob(obj) {

    if ($(window).width() < 992) {

        inlinePaddingTop(obj.topBar.classname.desktop, 0);

        // Scenario:  Mobile
        var nBarMobileElem = document.getElementById('notification-bar-mobile');
        var defaultMobilePaddingTop = obj.topBar.mobileDefaultHeight;
        var nBarMobileHeight = (typeof nBarMobileElem !== "undefined" && nBarMobileElem !== null) ? nBarMobileElem.clientHeight : 0;

        if (defaultMobilePaddingTop == obj.topBar.mobileDefaultHeight || defaultMobilePaddingTop < obj.topBar.mobileDefaultHeight ) {
            defaultMobilePaddingTop += nBarMobileHeight;
        } else {
            defaultMobilePaddingTop = obj.topBar.mobileDefaultHeight;
        }

        inlinePaddingTop(
            obj.topBar.classname.mobile,
            (isClicked == false) ? nBarMobileHeight : (obj.topBar.mobileDefaultHeight - obj.nBarOnly.mobile)
        );

    } else {

        inlinePaddingTop(obj.topBar.classname.mobile, 0);

        // Scenario:  Desktop
        var nBarDesktopElem = document.getElementById('notification-bar-desktop');
        var defaultDesktopPaddingTop = obj.topBar.desktopDefaultHeight;
        var nBarDesktopHeight = (typeof nBarDesktopElem !== "undefined" && nBarDesktopElem !== null) ? nBarDesktopElem.clientHeight : 0;

        if (defaultDesktopPaddingTop == obj.topBar.desktopDefaultHeight || defaultDesktopPaddingTop > obj.topBar.desktopDefaultHeight ) {
            defaultDesktopPaddingTop += nBarDesktopHeight;
        } else {
            defaultDesktopPaddingTop = obj.topBar.desktopDefaultHeight;
        }

        // Scenario:  Desktop
    	var temp = (isClicked == false) ? defaultDesktopPaddingTop : (defaultDesktopPaddingTop - nBarDesktopHeight);
        inlinePaddingTop(
            obj.topBar.classname.desktop,
            (isClicked == false) ? defaultDesktopPaddingTop : (defaultDesktopPaddingTop - nBarDesktopHeight)
        );
    }
}

function closeNotificationBox() {
    isClicked = true;
    screenJob(obj);
    $('.header-notification-box').remove();
}

function updateNotificationBox(content, contentIndex) {
    if (typeof contentIndex !== "undefined" && contentIndex !== null) {
        var mobileBoxElem = document.getElementById("notification-bar-content-mobile");
        var desktopBoxElem = document.getElementById("notification-bar-content-desktop");

        if (typeof mobileBoxElem !== "undefined" && mobileBoxElem !== null) {
            mobileBoxElem.innerHTML = "";
            if ($.isArray(contentIndex)){
            	$.each(contentIndex, function(i){
            		if(i > 0){
            			mobileBoxElem.innerHTML += "<br/>";
            		}            		
            		mobileBoxElem.innerHTML += content[contentIndex[i]].mobile;
            	});
            }
        } else {
            console.error("Element with the class \"notification-bar-content-mobile\" may not existed.");
        }
        if (typeof desktopBoxElem !== "undefined" && desktopBoxElem !== null) {
            desktopBoxElem.innerHTML = "";
            if ($.isArray(contentIndex)){
            	$.each(contentIndex, function(i){
            		if(i > 0){
            			desktopBoxElem.innerHTML += "<br/>";
            		}            		
            		desktopBoxElem.innerHTML += content[contentIndex[i]].desktop;
            	});
            }           
        } else {
            console.error("Element with the class \"notification-bar-content-desktop\" may not existed.");
        }
    } else {
        console.error("Failure to updated the content in Notification Bar.");
    }
}

$(function() {

    isClicked = false;
    if (nBarConfig.isVisible == true) {

        isVisible(true);

        try {
            if (typeof obj.nBarOnly.content === "undefined") throw 'has not been defined yet.';
            if (obj.nBarOnly.content === null) throw 'is NULL value.';
        } catch (err) {
            console.error('Variable "obj.nBarOnly.content" ' + err);
        }

        updateNotificationBox(obj.nBarOnly.content, nBarConfig.contentIndex);

        // "setTimeout" is for fixing the "document.getElementById('notification-bar-desktop').clientHeight" bug on fwdiscover page problem
        setTimeout(function(){
            screenJob(obj);
        }, 1500);
        $(window).resize(function() {
            screenJob(obj);
        });

    } else {

        isVisible(false);

    }

});
