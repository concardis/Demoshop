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
	.when('/', {templateUrl: 'partials/selectSolution.html', controller:'selectSolutionCtrl'})
  .when('/success', {templateUrl: 'partials/success.html'})
  .when('/successPi', {templateUrl: 'partials/successPi.html'})
  .when('/failure', {templateUrl: 'partials/failure.html'})
  .when('/selectPay/:id', {templateUrl: 'partials/selectPay.html', controller:'selectPayCtrl'});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.controller('selectPayCtrl', ['$rootScope', '$scope', '$http','$timeout', '$routeParams', '$window',  function($rootScope, $scope, $http, $timeout, $routeParams, $window) {
  $rootScope.site = "selectPay";


  if($routeParams.id)
    $scope.cur = $routeParams.id;

  if($scope.cur==1)
  {
      $scope.showTree = true;
      $scope.OrderPiRequest = '{ "initialAmount": 2000, "currency": "EUR", "transactionType": "DEBIT", "async": { "successUrl": "https://www.google.de/#newwindow=1&q=success", "failureUrl": "https://www.google.de/#newwindow=1&q=failure", "cancelUrl": "https://www.google.de/#newwindow=1&q=cancel" }}';

  }else if ($scope.cur==2){
      $scope.showGlass = true;
      $scope.OrderPiRequest = '{ "initialAmount": 200, "currency": "EUR", "transactionType": "DEBIT", "async": { "successUrl": "https://www.google.de/#newwindow=1&q=success", "failureUrl": "https://www.google.de/#newwindow=1&q=failure", "cancelUrl": "https://www.google.de/#newwindow=1&q=cancel" }}';
  }else if ($scope.cur==3){

      $scope.showSausage = true;
      $scope.OrderPiRequest = '{ "initialAmount": 199, "currency": "EUR", "transactionType": "DEBIT", "async": { "successUrl": "https://www.google.de/#newwindow=1&q=success", "failureUrl": "https://www.google.de/#newwindow=1&q=failure", "cancelUrl": "https://www.google.de/#newwindow=1&q=cancel" }}';
  }else{
      $scope.showBurger = true;
      $scope.OrderPiRequest = '{ "initialAmount": 599, "currency": "EUR", "transactionType": "DEBIT", "async": { "successUrl": "https://www.google.de/#newwindow=1&q=success", "failureUrl": "https://www.google.de/#newwindow=1&q=failure", "cancelUrl": "https://www.google.de/#newwindow=1&q=cancel" }}';
  }

  $scope.showSelect = true;
  $scope.showResult = false;
  $scope.showContainer = false;

  $scope.merchantId = "Merchant-000cf2c9-66fe-4730-ac9e-674f7c552d42";
  $scope.optionalParameters= new Object;


  function createOrder() {
    console.log("Calling API"); 
    var PiURL = "https://apitest.payengine.de/v1/orders"; 
    console.log($scope.OrderPiRequest);
    var xmlhttp = new XMLHttpRequest(); 
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp); 
    xmlhttp.open("POST", PiURL, false); 
    xmlhttp.setRequestHeader("Content-Type", "application/json"); 
    xmlhttp.setRequestHeader('Authorization', 'Basic TWVyY2hhbnQtMDAwY2YyYzktNjZmZS00NzMwLWFjOWUtNjc0ZjdjNTUyZDQyOkV3bURmNlhtd0dOVmNGVUY='); 
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp); 
    xmlhttp.send($scope.OrderPiRequest); 
    OrderRequest= JSON.parse(xmlhttp.responseText);
    console.log(OrderRequest);
    $scope.orderId = OrderRequest.orderId;
  }
  createOrder();

  function callbackFunction(xmlhttp){
    //well fuck
  }

  function initResultsCallback(error, results) {
    console.log('Result callback');
    console.log(error);
    console.log(results);
    $scope.widgetError = JSON.stringify(error);
    $scope.widgetResults = JSON.stringify(results);

    if($scope.widgetResults != null)
      $window.location.href = '/success';
    else
      $window.location.href = '/failure';
  }

  function callback(error, result){
    console.log('error', error);
    console.log('result', result);
  }

  $scope.initModalExample = function(){
    console.log("init Modal example");
    //Init Modal Example
    $scope.optionalParameters.products= ["creditcard", "sepa", "paypal", "paydirekt", "ratepay-directdebit", "ratepay-invoice"];
    $scope.optionalParameters.language = "en";
    $scope.optionalParameters.theme = "light";

      console.log("init Modal example");
      PayEngineWidget.initAsModal(
        $scope.merchantId,
        $scope.orderId,
        $scope.optionalParameters,
        initResultsCallback
      );
  };

  function initCallback(error, result) {
     if (error) {
  //There was an error
  //You will find more details in the error object
  return;
     }
     widgetReference = result;
   }

   function initInlineResultsCallback(error, results) {
    console.log('Result callback');
    console.log(error);
    console.log(results);
    $scope.widgetError = JSON.stringify(error);
    $scope.widgetResults = JSON.stringify(results);

    if($scope.widgetResults != null)
      $window.location.href = '/successPi';
  }

  $scope.initInlineExample = function(){
    $scope.showSelect = false;
    //Init Inline Example
    $scope.optionalParameters.initCallback = initCallback;
    $scope.optionalParameters.products = ["creditcard", "sepa", "paypal", "paydirekt", "ratepay-directdebit", "ratepay-invoice"];
    $scope.optionalParameters.language = "en";
    $scope.optionalParameters.customStyleId = "customstyle_qdxnyzokmk";
    $scope.optionalParameters.hidePayButton = false;
    $scope.optionalParameters.redirectUser = true;
    $scope.optionalParameters.hideTitleIcons = false;

    $scope.showContainer = true;
      console.log("init inline example");
      var container = angular.element("#widgetcontainer")[0];
      if(container.innerHTML){
        container.innerHTML="";
      }

      PayEngineWidget.initAsInlineComponent(
        container,
        $scope.merchantId,
        $scope.orderId,
        $scope.optionalParameters,
        initResultsCallback
      );
  };

  $scope.initInlinePiExample = function(){
    $scope.showSelect = false;
    //Init Inline PI Example
    $scope.showContainer = true;
      console.log("init PI example");
      var container = angular.element("#widgetcontainer")[0];
      if(container.innerHTML){
        container.innerHTML="";
      }

      PayEngineWidget.initAsInlineComponentPi(
        container,
        $scope.merchantId,
        $scope.optionalParameters,
        initInlineResultsCallback
      );
  };
  
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