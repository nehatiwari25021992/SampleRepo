function trackWebActivity(eventName, screenName, URL) {
	App42.enableEventService(true);
	var properties = {
	   "screen":screenName
	}
	App42.initialize("1dc92a76ef4114a8551ee8883cf48c6ee06a9a467a08ef80237fe61c6e1492a5","d4271267f621b50a11bf62ede824372aab8464090913de822c2e137fce4b3b76");
	var eventService  = new App42Event();
	eventService.trackEvent(eventName, properties, {      
		success: function (object) {
			window.location.href = URL
		},
		error: function (error) {
			window.location.href = URL
		}
	});

}

function saveDocument(collectionName, json){
	var dbName = "AIG";
	var storageService  = new App42Storage();  
	storageService.insertJSONDocument(dbName, collectionName, json,{    
		success: function(object)   
		{  
		},    
		error: function(error) {    
		}    
	}); 
	eventService.trackEvent(collectionName, json, {      
			success: function (object) {
				window.location.href = URL
			},
			error: function (error) {
				window.location.href = URL
			}
		});	
} 
function deleteDocumentById(docId,url){
	alert(docId)
	var dbName = "AIG";
	var collectionName ="CART";
	var storageService  = new App42Storage();  
	storageService.deleteDocumentById(dbName,collectionName,docId,{    
		success: function(object)   
		{  
				window.location.href = url
		},    
		error: function(error) {    
				window.location.href = url
		}    
	}); 
	
} 

function addItemIntoCart(insuranceName, price,url){
	var dbName = "AIG";
	var json = {
		name:insuranceName,
		price:price,
		nCounter:"0"
	}
	var eventService  = new App42Event();
	eventService.trackEvent("Add To Cart", json, {      
			success: function (object) {
				
			},
			error: function (error) {
				
			}
		});	
	
	var storageService  = new App42Storage();  
	storageService.insertJSONDocument(dbName, "CART", json,{    
		success: function(object)   
		{  
			window.location.href = url
		},    
		error: function(error) {   
			window.location.href = url 
		}    
	});
	
} 