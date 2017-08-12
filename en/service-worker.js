'use strict';
var regID ;
var API_KEY = "4a18bbe2c8146dc9d35e83082830aaecb94dce74df440bd2f53749c7f4533007"
var SECERT_KEY = "5ac026105cc3d821a5504430b1186212498cf7eab2f9542a7a3da1d86969b2b7"
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
	App42.setBaseUrl("https://in-api.shephertz.com/cloud/1.0/");
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