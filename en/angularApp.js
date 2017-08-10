var demoApp = angular.module('demoApp', ['ngRoute','ngAnimate']);

// Routes configurations
demoApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider
        //Dashboard Section Routes
        .when('/dashboard', {
            templateUrl: '../en/dashboard.html'
        })
        .when('/login', {
            templateUrl: '../en/login.html'
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
            redirectTo: '/dashboard'
        });
    }])


demoApp.controller("MainController", function($rootScope,$scope,$location) {
    $scope.pendingPolicy = 1
    $scope.totalCost = "1,110"
    $scope.showCongrats = false
    $scope.productName = "Motar Inc."
    $scope.productPrice = "$1,110"
    $scope.goToDashboard = function(){
        $location.path("/dashboard")
    }
    $scope.goToDashboardCongrats = function(){
        $scope.showCongrats = true
        $scope.pendingPolicy = 0
        $location.path("/dashboard")
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
    
    $scope.policyTableContent=[
        
    {
        policyType:'home',
        policyIssueDate:'30-Mar-2016',
        policyId:'*111',
        policyName:'Motor',
        policyToDate:'20-apr2016',
        policyFromDate:'20-apr2016',
        policyStatus:'20-apr2016',
        policyDetails:'Download',
        policyAction:'Change Plan',
            
    },
    {
        policyType:'home1',
        policyIssueDate:'30-Mar-2016',
        policyId:'*111',
        policyName:'car',
        policyToDate:'20-apr2016',
        policyFromDate:'20-apr2016',
        policyStatus:'20-apr2016',
        policyDetails:'Download',
        policyAction:'Change Plan',
            
    },
    {
        policyType:'home2',
        policyIssueDate:'30-Mar-2016',
        policyId:'*111',
        policyName:'Life Insurance',
        policyToDate:'20-apr2016',
        policyFromDate:'20-apr2016',
        policyStatus:'20-apr2016',
        policyDetails:'Download',
        policyAction:'Change Plan',
            
    },
    {
        policyType:'home3',
        policyIssueDate:'30-Mar-2016',
        policyId:'*111',
        policyName:'Medical',
        policyToDate:'20-apr2016',
        policyFromDate:'20-apr2016',
        policyStatus:'20-apr2016',
        policyDetails:'Download',
        policyAction:'Change Plan',
            
    },
    ]
});
    