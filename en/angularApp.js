var demoApp = angular.module('demoApp', ['ngRoute','ngAnimate']);


// Routes configurations
demoApp.config(['$routeProvider', '$httpProvider',
function ($routeProvider, $httpProvider) {
$routeProvider
//Dashboard Section Routes
.when('/login', {
templateUrl: '../en/login.html'
})
.when('/dashboard', {
templateUrl: '../en/dashboard.html'
})

.when('/productDetails',{
templateUrl: '../en/productDetails.html'
})
.when('/shoppingCart',{
templateUrl: '../en/shoppingCart.html'
})
.when('/payment',{
templateUrl: '../en/payment.html'
}) 
.when('/policySummary',{
templateUrl: '../en/policySummary.html'
}) 
.when('/profile',{
templateUrl: '../en/profile.html'
})
.otherwise({
redirectTo: '/login'
});
}]);
 


demoApp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val
                    if (!Number.isInteger(val)) {
                        digits = val.replace(/[^0-9]/g, '');
                    }
                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);

                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});
demoApp.controller("MainController", function($rootScope,$scope,$location,$timeout) {

$scope.CardNumber= ""
$scope.card = 'nocard'
$scope.checkCard = function(){
   if ($('.cleaveCustom').length) {
  new Cleave('.cleaveCustom', {
      creditCard: true,
       blocks: [4,4,4,4],
    delimiter: ' ',
   
  });
} 
    
    console.log("CardNumber",$scope.CardNumber)
   $scope.CardNumber= document.getElementById('cardNumber').value
       console.log("CardNumber",$scope.CardNumber.length)
       if($scope.CardNumber.length == 19){
           $scope.card = "master"
           
       }
       
}


    
$scope.expiry = function(){
    console.log($scope.Expiry)
    if ($('.cleaveCustom').length) {
 new Cleave('.input-3', {
    date: true,
     datePattern: ['m', 'Y'], 
      delimiter: '/'
});
    }
}

$scope.validate = function(){
    console.log($scope.Expiry)
    
}
    
//    document.addEventListener('DOMContentLoaded', () => {
//    new Cleave('.cleaveCustom', {
//    blocks: [3, 3, 3, 3],
//      delimiter: '-'
//  });
//});

$scope.pendingPolicyJson = {
	"policyAction": "Change Plan",
	"policyIssueDate": "30-July-2016",
	"policyName": "Protection Plan",
	"policyId": "598de063",
	"policyFromDate": "01-August-2017",
	"policyStatus": "Active",
	"policyToDate": "30-July-2018",
	"policyType": "Travel",
	"policyDetails": "Download"
}

    
    $scope.pendingPolicy = 1
    $scope.totalCost = "1,110"
    $scope.showCongrats = false
    $scope.productName = "Travel Insurance"
    $scope.productPrice = "$1,110"
    $scope.goToDashboard = function(){
        $location.path("/dashboard")
    }
	$scope.goToRenew = function(){
        $location.path("/renew")
    }
    
    $scope.goToDashboardCongrats = function(){
        $scope.paymentLoader =  false
           $scope.showCongrats = true
        $scope.pendingPolicy = 0
        $location.path("/dashboard")
    }
    $scope.paymentToDashBoard = function(){
        
        
     $scope.paymentLoader = true
         $timeout(function () {
        $scope.goToDashboardCongrats()
        $scope.paymentDone() 
    }, 3000);
    
    }
    
   
    
    $scope.goToShoppingCart = function(){
        $scope.productName = "Motar Inc."
        $scope.productPrice = "$1,110"
        $location.path("/shoppingCart")
    }
    
    $scope.goToProductDetails=function(){
        $location.path("/productDetails")
    }
    $scope.goToProfile = function(){
        $location.path("/profile")
    }
    $scope.logout = function(){
		$scope.username=''
		 localStorage.removeItem("loginUser");
		$("#userfbname").text($scope.username)
		$('#profileLogout').css("display","none");
		$('#profile').css("display","none");
        $location.path("/login")
    }
    $scope.goToPayment = function(){
        $location.path("/payment")
    }
    
    $scope.paymentCheckout = function(){
        $location.path("/payment")
    } 
    $scope.goToPolicySummary =  function(){
        
        $location.path("/policySummary")
    }
    $scope.goToLogin = function(){
        $scope.showCongrats = false
        $location.path("/dashboard")
    }
    $scope.policyTableContent = [{
        "policyAction": "Change Plan",
        "policyIssueDate": "30-July-2017",
        "policyName": "Auto Prestige",
        "policyId": "598de061",
        "policyFromDate": "01-August-2017",
        "policyStatus": "Active",
        "_$createdAt": "2017-08-11T16:50:41.478Z",
        "_$updatedAt": "2017-08-12T09:02:45.546Z",
        "policyToDate": "30-July-2018",
        "policyType": "Auto",
        "policyDetails": "Download"
    }, {
        "policyAction": "Change Plan",
        "policyIssueDate": "30-July-2017",
        "policyName": "Auto Select",
        "policyId": "598de02a",
        "policyFromDate": "01-August-2017",
        "policyStatus": "Active",
        "_$createdAt": "2017-08-11T16:51:49.405Z",
        "_$updatedAt": "2017-08-12T09:23:36.790Z",
        "policyToDate": "30-July-2018",
        "policyType": "Auto",
        "policyDetails": "Download"
    }, {
        "policyAction": "Change Plan",
        "policyIssueDate": "30-July-2017",
        "policyName": "Home Insurance",
        "policyId": "598de221",
        "policyFromDate": "01-August-2017",
        "policyStatus": "Active",
        "_$createdAt": "2017-08-11T16:57:56.744Z",
        "_$updatedAt": "2017-08-12T09:03:03.077Z",
        "policyToDate": "30-July-2018",
        "policyType": "Home",
        "policyDetails": "Download"
    }]
    
    $scope.userName =  localStorage.getItem('loginUser')
	
	
	if($scope.userName){
		  $("#userfbname").text($scope.userName)
		  $('#profileLogout').css("display","block");
		  $('#profile').css("display","block");
		
	}else{
		$("#userfbname").text($scope.userName)
		$('#profileLogout').css("display","none");
		$('#profile').css("display","none");
		
	}
	 var dateNew = moment().utc().format('DD-MMMM-YYYY')
     var dateNewAdd1 =moment().utc().add('days', 1).format('DD-MMMM-YYYY')
     var dateNewAdd = moment().utc().add('days', 365).format('DD-MMMM-YYYY')
     console.log("=-=-=date-=-=-",dateNewAdd)

$scope.paymentDone = function(){
    
    $scope.pendingPolicyJson.policyIssueDate  =  dateNew
    $scope.pendingPolicyJson.policyFromDate  =  dateNewAdd1
    $scope.pendingPolicyJson.policyToDate  =  dateNewAdd
    $scope.policyTableContent.push( $scope.pendingPolicyJson);
	$scope.policyTableContent.reverse()
}
    
});


    
