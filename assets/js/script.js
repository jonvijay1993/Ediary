(function(angular) {
	'use strict';
	angular.module('ichangapp', ['ngRoute'])
	
	.controller('ichangcontroller_main', function($scope,$rootScope, $route, $routeParams, $location,$http,LoginService) {
		$scope.credentialsentials = {
			username : '',
			password : ''
		};
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		$rootScope.allow = "";
		$scope.check_cred = function(credentials){
			LoginService.check(credentials);
		};	
	})
	.service('LoginService',function($http,$rootScope,Session,$location){
		//var obj = {};
		this.check = function(credentials){
			var url = 'http://localhost:81/route/check.php?username='+credentials.username+'&password='+credentials.password;
			$http.get(url).success(
			function(listen){
				alert(listen);
				if(listen == "trueadmin")
					Session.create(credentials,1);
				else if(listen == "true")
					Session.create(credentials,0);
				else{
					alert("Nope");
					$location.path('/');
				}
			}
			);
		};
		//return obj;
	})
	.service('Session',function(){
		this.create = function(credentials,role){
			this.username = credentials.username;
			this.role = role;
			alert("Session created");
		};
		this.destroy = function(){
			this.username = null;
			this.role = null;
		};
	})
	.controller('BookController', function($scope, $routeParams) {
		$scope.name = "BookController";
		$scope.params = $routeParams;
	})
	
	.controller('ChapterController', function($scope, $routeParams) {
		$scope.name = "ChapterController";
		$scope.params = $routeParams;
	})
	
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/Book/:bookId', {
			templateUrl: 'book.html',
			controller: 'BookController',
			resolve: {
				// I will cause a 1 second delay
				delay: function($q, $timeout) {
					var delay = $q.defer();
					$timeout(delay.resolve, 1000);
					return delay.promise;
				}
			}
		})
		.when('/Book/:bookId/ch/:chapterId', {
			templateUrl: 'chapter.html',
			controller: 'ChapterController'
		});
		
		// configure html5 to get links working on jsfiddle
		$locationProvider.html5Mode(true);
	});
})(window.angular);