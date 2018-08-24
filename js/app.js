angular.module('StudyCraneApp',[
	'ui.bootstrap',
	'ngRoute',
  'swaggerUi',
	'docsWidgetExample'
	])
.config(['$routeProvider', '$httpProvider', '$locationProvider', '$compileProvider', function($routeProvider, $httpProvider, $locationProvider, $compileProvider) {
   
  new WOW().init();

	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//); 

  $locationProvider.html5Mode(true); 
  $locationProvider.html5Mode(true).hashPrefix('!');

	$routeProvider
	.when('/', {templateUrl: 'partials/selectsolution.html', controller:'selectSolutionCtrl'})
  .when('/modalsexample', {templateUrl: 'partials/modalsexample.html', controller:'modalsExampleCtrl'})
  .when('/modalstepone', {templateUrl: 'partials/modalstepone.html', controller:'modalStepOneCtrl'})
  .when('/modalsteptwo', {templateUrl: 'partials/modalsteptwo.html', controller:'modalStepTwoCtrl'})
  .when('/modalstepthree', {templateUrl: 'partials/modalstepthree.html', controller:'modalStepThreeCtrl'})
  .when('/modalstepfour', {templateUrl: 'partials/modalstepfour.html'})
  .when('/failure', {templateUrl: 'partials/failure.html'})
  .when('/success', {templateUrl: 'partials/success.html'})
  .when('/successPi', {templateUrl: 'partials/successPi.html'})
  .when('/failure', {templateUrl: 'partials/failure.html'});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.factory('apitest', ['$http', function($http) {
  var apitest = {};

  apitest.setSettings = function(token){
    $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
  };

  apitest.getOrders = function(){
    return $http.get("https://apitest.payengine.de/v1/orders");
  };

  apitest.getCustomer = function(){
    return $http.get("https://apitest.payengine.de/v1/customers");
  };
  
  return apitest;
}])
.controller('modalStepOneCtrl', ['$rootScope', '$scope','apitest', function($rootScope, $scope, apitest) {
  $rootScope.merchandId="merchant_xzi4icwblq";
  $rootScope.apiKey="KQ93UoquBoenSqNQ";

  $scope.encode = function(){
    var key =  btoa($rootScope.merchandId + ":" + $rootScope.apiKey);
    $rootScope.base64 = key;
    apitest.setSettings($rootScope.base64);
  };

  $scope.testOrder = function(){
    apitest.getOrders().then(function successCallback(response) {
        $scope.response = response;
        console.log($scope.response);
      }, function errorCallback(response) {
        $scope.response = response;
        console.log($scope.response);
      });
  };

}])
.controller('modalStepTwoCtrl', ['$scope', function($scope) {
  $scope.initialAmount="2";
  $scope.currency="EUR";
  $scope.successUrl="http://demoshop.ocbe.de/success";
  $scope.failureUrl="http://demoshop.ocbe.de/failure";
  $scope.cancelUrl="http://demoshop.ocbe.de/cancle";
  $scope.transactionType="PREAUTH";
  
}])
.controller('modalStepThreeCtrl', ['$scope', function($scope) {
  $scope.order='{ "initialAmount": 3,"currency": "EUR", "async": { "successUrl": "http://demoshop.ocbe.de/success","failureUrl": "http://demoshop.ocbe.de/failure", "cancelUrl": "http://demoshop.ocbe.de/cancle" }, "transactionType": "PREAUTH" }'
  
}])
.controller('selectSolutionCtrl', ['$scope',  function($scope) {

}])
.controller('mainCtrl', ['$scope',  function($scope) {

}])