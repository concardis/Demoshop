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
  $locationProvider.html5Mode(true).hashPrefix('*');

	$routeProvider
	.when('/', {templateUrl: 'partials/selectsolution.html', controller:'selectSolutionCtrl'})
  .when('/modalexample', {templateUrl: 'partials/modalexample.html', controller:'modalExampleCtrl'})
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

  apitest.postOrders = function(json){
    return $http.post("https://apitest.payengine.de/v1/orders", json);
  };

  apitest.getOrders = function(){
    return $http.get("https://apitest.payengine.de/v1/orders");
  };

  apitest.getCustomer = function(){
    return $http.get("https://apitest.payengine.de/v1/customers");
  };

  return apitest;
}])
.controller('modalExampleCtrl', ['$rootScope','$location', '$scope','apitest', function($rootScope,$location, $scope, apitest) {
  $rootScope.merchandId="merchant_xzi4icwblq";
  $rootScope.apiKey="KQ93UoquBoenSqNQ";

  $scope.optionalParameters = new Object;

  var key =  btoa($rootScope.merchandId + ":" + $rootScope.apiKey);
  $rootScope.base64 = key;
  apitest.setSettings($rootScope.base64);

  var JSON = { initialAmount: 200,currency: "EUR", async: { successUrl: "http://demoshop.ocbe.de/success",failureUrl: "http://demoshop.ocbe.de/failure", cancelUrl: "http://demoshop.ocbe.de/cancle" }, transactionType: "PREAUTH" };

  apitest.postOrders(JSON).then(function successCallback(response) {
        $scope.response = response.data;
        $scope.orderId = $scope.response.orderId;
        console.log( $scope.orderId );
      }, function errorCallback(response) {
        $scope.response = response;
        console.log($scope.response);
      });

  $scope.callback = function (error, result) { 
    if (error) {
      console.log(error);
      $location.path('/failure')
      return;
    }
    if(result) {
      if((result.code >= 200) && (result.code <300)){
        console.log("success");
        console.log(result);
        $location.path('/success');
        $scope.$apply();
      }
      else{
        console.log("Failure Code: " + result.code);
        console.log(result);
        $location.path('/failure');
        $scope.$apply();
      }
    }
   }

  $scope.pay = function(){
     //optionalParameters.products= ["creditcard", "sepa", "paypal", "paydirekt", "ratepay-directdebit", "ratepay-invoice"];
     //optionalParameters.language = "en";
     //optionalParameters.theme = "light";
    PayEngineWidget.initAsModal($rootScope.merchandId, $scope.orderId, $scope.optionalParameters, $scope.callback);
  }
}])
.controller('modalStepOneCtrl', ['$rootScope', '$scope','apitest', function($rootScope, $scope, apitest) {
  if(!$rootScope.merchandId)
    $rootScope.merchandId="merchant_xzi4icwblq";
  if(!$rootScope.apiKey)
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
.controller('modalStepTwoCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  if(!$rootScope.order){
    $rootScope.order = {};
    $rootScope.order.initialAmount="2";
    $rootScope.order.currency="EUR";
    $rootScope.order.successUrl="http://demoshop.ocbe.de/success";
    $rootScope.order.failureUrl="http://demoshop.ocbe.de/failure";
    $rootScope.order.cancelUrl="http://demoshop.ocbe.de/cancle";
    $rootScope.order.transactionType="PREAUTH";
  }
  
}])
.controller('modalStepThreeCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  if(!$rootScope.order)
      $rootScope.order='{ "initialAmount": 3,"currency": "EUR", "async": { "successUrl": "http://demoshop.ocbe.de/success","failureUrl": "http://demoshop.ocbe.de/failure", "cancelUrl": "http://demoshop.ocbe.de/cancle" }, "transactionType": "PREAUTH" }'
  
}])
.controller('selectSolutionCtrl', ['$scope',  function($scope) {

}])
.controller('mainCtrl', ['$scope',  function($scope) {

}])