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
        .otherwise({
            redirectTo: '/dashboard'
        });
    }])


demoApp.controller("MainController", function($rootScope,$scope,$location) {
    $scope.pendingPolicy = 1
    $scope.totalCost = "1,110"
    $scope.goToDashboard = function(){
        $location.path("/dashboard")
    }
    $scope.goToShoppingCart = function(){
        $scope.productName = "Motar Inc."
        $scope.productPrice = "$1,110"
        $location.path("/shoppingCart")
    }
    $scope.goToPayment = function(){
        $location.path("/payment")
    }
    $scope.policyTableContent=[
        
        {
           policyType:'home',
            policyIssueDate:'30-Mar-2016',
            policyId:'*111',
            policyName:'Home',
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
            policyName:'Home',
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
            policyName:'Home',
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
            policyName:'Home',
            policyToDate:'20-apr2016',
             policyFromDate:'20-apr2016',
             policyStatus:'20-apr2016',
             policyDetails:'Download',
             policyAction:'Change Plan',
            
        },
    ]
});
    