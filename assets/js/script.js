(function(angular) {
	'use strict';
	
	angular.module('ichangapp', ['ngRoute','ngCookies','facebook'])
	.config(function(FacebookProvider) {
		FacebookProvider.init('841009275982710');
	})
	.run(function($rootScope){
		$rootScope.hide_fb_login = true;
		$rootScope.hide_normal_login = false;
		$rootScope.hide_username_input = true;
		$rootScope.allow_fb_user_to_register = false;
	})
	.controller('ichangcontroller_main', function($scope,$rootScope, $route, $routeParams, $location,$http,LoginService,Session,$cookieStore,$window,Facebook) {
		
		$scope.credentials = {
			username : '',
			password : ''
		};		
		if($cookieStore.get('username') !== null){
			//$scope.username = $cookieStore.get('username');
			//$scope.password = $cookieStore.get('password');
			//Session.create({username: $scope.username,password:$scope.password,1);
			//$location.path('/about');
		} 
		
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		$rootScope.allow = "";
		
		$scope.check_cred = function(credentials){
			LoginService.check(credentials);
		};
		
		
		
		
		//Facebook api stuff
		
		$scope.loginStatus = 'disconnected';
		$scope.facebookIsReady = false;
		$scope.user = null;
		
		$scope.login = function () {
			Facebook.login(function(response) {
				$scope.loginStatus = response.status;
				$rootScope.hide_normal_login = true;
				$scope.api();
			});
		};
		
		$scope.removeAuth = function () {
			Facebook.api({
				method: 'Auth.revokeAuthorization'
				}, function(response) {
				Facebook.getLoginStatus(function(response) {
					$scope.loginStatus = response.status;
				});
			});
		};
		
		$scope.api = function () {
			Facebook.api('/me', function(response) {
				$scope.fb_user_response = response;
				var url = 'http://localhost:81/route/check_fb.php?first_name=' + response.first_name + '&last_name=' + response.last_name;
				if(Facebook.isReady())
				{
					alert("Checking with DB");
					$http.get(url).success(function(val){
						if(val.status == "exists")
						{
							$scope.credentials.username = val.username;
							$scope.credentials.password = val.password;
							alert(JSON.stringify(val));	
							Session.create(credentials,val.admin_level);
						}
						else if(val.status == "new_user"){
							$rootScope.hide_username_input = false;
							$rootScope.allow_fb_user_to_register = true;
							$location.path('/register_fb_user');
						}
						else
							alert(val);
					});
				}
			});
		};
		
		$scope.$watch(function() {
			return Facebook.isReady();
			}, function(newVal) {
			if (newVal) {
				$scope.facebookIsReady = true;
			}
		}
		);
		
		$scope.register_fb_user = function(){
			
			var url = 'http://localhost:81/route/register_fb_user.php?first_name=' + $scope.fb_user_response.first_name + '&last_name=' + $scope.fb_user_response.last_name + '&username=' + $scope.fb_user_new_username + '&password=fb_user';
			$http.get(url).success(function(val){
				if(val.status == "registered")
				{
					$scope.credentials.username = val.username;
					$scope.credentials.password = val.password;
					Session.create(credentials,val.admin_level);
				}
				else{
					alert(val);
					$rootScope.hide_username_input = true;
					$rootScope.allow_fb_user_to_register = false;
					$location.path('/');
				}
			});
		}
	})
	.service('LoginService',function($http,$rootScope,Session,$location){
		this.check = function(credentials){
			var url = 'http://localhost:81/route/check.php?username='+credentials.username+'&password='+credentials.password;
			$http.get(url).success(
			function(listen){
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
			this.password = credentials.password;
			this.role = role;
			$cookieStore.put('username',this.username);
			alert($cookieStore.get('username'));
			$cookieStore.put('password',this.password);
			alert($cookieStore.get('password'));
			$location.path('/secure/timeout/30');
		};
		this.destroy = function(){
			this.username = null;
			this.password = null;
			$cookieStore.put('username',null);
			$cookieStore.put('password',null);
			//alert($cookieStore.get('username'));
			//alert($cookieStore.get('password'));
			
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
		.when('/register_fb_user', {
			templateUrl: 'register_fb_user.html',
			controller: 'ichangcontroller_main',
			resolve:{
				"check":function(Session,$location,$rootScope){
					if($rootScope.allow_fb_user_to_register){}
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