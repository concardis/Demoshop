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
.controller('modalStepOneCtrl', ['$scope', function($scope) {
  $scope.merchandId="merchant_kdanvgjnhx";
  $scope.apiKey="aDxDxDx";

  $scope.encode = function(){
    console.log("encoding");
    $scope.base64 = btoa($scope.merchandId + ":" + $scope.apiKey);
  };

}])
.controller('modalStepTwoCtrl', ['$scope', function($scope) {
  $scope.initialAmount="100";
  $scope.currency="EUR";
  $scope.successUrl="http://demoshop.ocbe.de/success";
  $scope.failureUrl="http://demoshop.ocbe.de/failure";
  $scope.cancelUrl="http://demoshop.ocbe.de/cancle";
  $scope.transactionType="PREAUTH";
  
}])
.controller('modalStepThreeCtrl', ['$scope', function($scope) {
  $scope.base64 ="bWVyY2hhbnRfa2RhbnZnam5oeDphRHhEeER4";
  $scope.order='{ "initialAmount": 3,"currency": "EUR", "async": { "successUrl": "http://demoshop.ocbe.de/success","failureUrl": "http://demoshop.ocbe.de/failure", "cancelUrl": "http://demoshop.ocbe.de/cancle" }, "transactionType": "PREAUTH" }'
  
}])
.controller('selectSolutionCtrl', ['$rootScope', '$scope', '$http','$timeout', function($rootScope, $scope, $http, $timeout) {
	$scope.select = function(solution){
		$rootScope.selectedSolution = solution;
	};
	$rootScope.site = "home";
	
}])
.controller('mainCtrl', ['$rootScope', '$scope', '$http','$timeout', '$location',  function($rootScope, $scope, $http, $timeout, $location) {
	$rootScope.site = "home";


}])