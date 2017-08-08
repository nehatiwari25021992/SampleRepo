'use strict';
var regID ;
var API_KEY = "1dc92a76ef4114a8551ee8883cf48c6ee06a9a467a08ef80237fe61c6e1492a5"
var SECERT_KEY = "d4271267f621b50a11bf62ede824372aab8464090913de822c2e137fce4b3b76"
if ('serviceWorker' in navigator) {
  var jsAddress = "chrome-worker.js"
  navigator.serviceWorker.register(jsAddress).then(function() {
   return navigator.serviceWorker.ready;
  }).then(function(reg) {
    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
	  regID = sub.endpoint
	   	var idD = regID.substring(regID.indexOf("d/")+1);
		regID =  idD.substring(idD.indexOf("/")+1);
		registerDeviceWithApp42(regID)		 
    });
  }).catch(function(error) {
    console.log('Service Worker error :', error);
  });
 
}


function registerDeviceWithApp42(token ){
	var pushNotificationService  = new App42Push();
	App42.initialize(API_KEY, SECERT_KEY);
	pushNotificationService.storeDeviceToken(App42.getLoggedInUser(),token,"CHROME",{  
		success: function(object) 
		{  
			//window.close();
		},
		error: function(error) {  
			//window.close();
		}  
	});  
}