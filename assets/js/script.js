(function(angular) {
	'use strict';
	angular.module('ichangapp', ['ngRoute','ngCookies'])
	
	.controller('ichangcontroller_main', function($scope,$rootScope, $route, $routeParams, $location,$http,LoginService,Session,$cookieStore) {
		
		/* if($cookieStore.get('username') !== undefined){
			$scope.credentials.username = $cookieStore.get('username');
			$scope.credentials.password = $cookieStore.get('password');
			Session.create($scope.credentials);
			$location.path('/about');
		} */
		
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
	})
	.service('Session',function($location,$window,$cookieStore,$cookies){
		this.create = function(credentials,role){
			this.username = credentials.username;
			this.role = role;
			$cookieStore.put('username',this.username);
			$cookieStore.put('password',this.password);
			alert("Session created...Moving to Home" + $cookieStore.get('username'));
			$location.path('/secure/timeout/30');
		};
		this.destroy = function(){
			this.username = null;
			this.role = null;
		};
		this.isset = function(){
			if(this.username != null)
				return true;
			else	
				return false;
		};
		this.getUser = function(){
			return this.username;
		}
	})
	.controller('BookController', function($scope, $routeParams) {
		$scope.name = "BookController";
		$scope.params = $routeParams;
	})
	.controller('ichangcontroller_home', function($scope,$routeParams,Session) {
		$scope.params = $routeParams;
		$scope.destroy = function(){
			Session.destroy();
		};
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
		.when('/secure/timeout/:timeout', {
			templateUrl: 'secure.html',
			controller: 'ichangcontroller_home',
			resolve:{
				"check":function(Session,$location){
					if(Session.isset()){}
					else{
						alert("Nope");
						$location.path('/');
					}
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