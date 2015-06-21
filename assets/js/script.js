(function(angular) {
	'use strict';
	
	angular.module('ichangapp', ['ngRoute','ngCookies','facebook'])
	.config(function(FacebookProvider) {
		FacebookProvider.init('841009275982710');
	})
	.run(function($rootScope,$http,$location){
		$rootScope.allow_fb_user_to_register = false;
		
		$http.get('http://localhost:81/route/check_auto_login.php?type=check').success(function(val){
			if(val.status == "exists"){
				$rootScope.auto_login_username = val.username;
				$rootScope.auto_login_password = val.password;
				$rootScope.auto_login_admin_level = val.admin_level;
				$location.path('/auto_login');
			}
			else{
				$location.path('/normal_login');
			}			
		});
		
	})
	.controller('ichangcontroller_main', function($scope,$rootScope, $route, $routeParams, $location,$http,LoginService,Session,$cookieStore,$window,Facebook,flip) {
		
		$scope.credentials = {
			username : '',
			password : '',
			remember_me : ''
		};		
		if($cookieStore.get('username') !== null){
		} 
		
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		$rootScope.allow = "";
		
		$scope.check_cred = function(credentials){
			LoginService.check(credentials);
		};
		
		$scope.signup = function(){
			$location.path('/signup');
		}
		
		//Facebook api stuff
		
		$scope.loginStatus = 'disconnected';
		$scope.facebookIsReady = false;
		$scope.user = null;
		
		$scope.login = function () {
			Facebook.login(function(response) {
				$scope.loginStatus = response.status;
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
					$http.get(url).success(function(val){
						if(JSON.stringify(val).search("exists") != -1)
						{
							$scope.credentials.username = val.username;
							$scope.credentials.password = val.password;
							Session.create($scope.credentials,val.admin_level);
						}
						else if(JSON.stringify(val).search("new_user") != -1){
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
					Session.create($scope.credentials,val.admin_level);
				}
				else{
					$rootScope.allow_fb_user_to_register = false;
					$location.path('/');
				}
			});
		};
		
		$scope.auto_login = function(){
			if($rootScope.auto_login_username != null){
				$scope.credentials.username = $rootScope.auto_login_username;
				$scope.credentials.password = $rootScope.auto_login_password;
				Session.create($scope.credentials,$rootScope.auto_login_admin_level);
			}
			
		};
		
		$scope.forget_me = function(){
			
			var url = "http://localhost:81/route/check_auto_login.php?type=forget_me&username=" + $rootScope.auto_login_username;
			$http.get(url).success(function(val){
				if(val == "forgotten"){
					Session.destroy($rootScope.auto_login_username);
					$location.path('/normal_login');
				}
				else{
				}	
			});
		};
	})
	.service('LoginService',function($http,$rootScope,Session,$location){
		this.check = function(credentials){
			var url = 'http://localhost:81/route/check.php?username='+credentials.username+'&password='+credentials.password;
			$http.get(url).success(
			function(listen){
				if(listen.search("trueadmin") != -1){
					Session.create(credentials,1);
				}
				else if(listen.search("true") != -1)
				{	
					Session.create(credentials,0);
				}
				else{
					alert("Intruder Alert");
					$location.path('/');
				}
			}
			);
		};
	})
	.service('flip',function($rootScope){
		this.hides_false = function(){
			$rootScope.hide_fb_login = false;
			$rootScope.hide_normal_login = false;
			$rootScope.hide_username_input = false;
		};
		this.hides_true = function(){
			$rootScope.hide_fb_login = true;
			$rootScope.hide_normal_login = true;
			$rootScope.hide_username_input = true;
		};
	})
	.service('Session',function($location,$window,$cookieStore,$http,$rootScope){
		
		this.create = function(credentials,role){
			this.username = credentials.username;
			this.password = credentials.password;
			this.role = role;
			this.remember_me = credentials.remember_me;
			//alert(this.remember_me);
			$cookieStore.put('username',this.username);
			//alert($cookieStore.get('username'));
			$cookieStore.put('password',this.password);
			//alert($cookieStore.get('password'));
			if(this.remember_me == true){
				var url = 'http://localhost:81/route/check_auto_login.php?type=remember_me&username=' + this.username;
				//alert(url);
				$http.get(url).success(function(val){
					//alert(val);
				});
			}
			$location.path('/secure/timeout/30');
		};
		this.destroy = function(user){
			this.to_delete = user;
			var url = 'http://localhost:81/route/check_auto_login.php?type=forget_me&username=' + this.to_delete;
			$http.get(url).success(function(val){
			});
			$rootScope.auto_login_username = null;
			$rootScope.auto_login_password = null;
			this.username = null;
			this.password = null;
			$cookieStore.put('username',null);
			$cookieStore.put('password',null);
			this.role = null;
			$window.location.href = 'http://localhost:81/route/';
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
	.controller('ichangcontroller_signup', function($scope, $routeParams,$http,Session) {
		$scope.params = $routeParams;
		$scope.register_new_user = function(){
			alert("Good");
			var url = 'http://localhost:81/route/register_new_user.php?first_name=' + $scope.to_register_first_name + '&last_name=' + $scope.to_register_last_name + '&username=' + $scope.to_register_username + '&password=' + $scope.to_register_password;
			$http.get(url).success(function(val){
				if(val.status == "registered")
				{
					$scope.credentials.username = val.username;
					$scope.credentials.password = val.password;
					Session.create($scope.credentials,val.admin_level);
				}
				else{
					$rootScope.allow_fb_user_to_register = false;
					$location.path('/');
				}
			});
		};
	})
	.controller('ichangcontroller_home', function($scope,$routeParams,Session) {
		$scope.params = $routeParams;
		$scope.destroy = function(){
			Session.destroy(Session.getUser());
		};
	})
	.controller('ChapterController', function($scope, $routeParams) {
		$scope.name = "ChapterController";
		$scope.params = $routeParams;
	})
	
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/signup', {
			templateUrl: 'app/signup.html',
			controller: 'ichangcontroller_signup'
		})
		.when('/auto_login', {
			templateUrl: 'app/auto_login.html',
			controller: 'ichangcontroller_main'
		})
		.when('/normal_login', {
			templateUrl: 'app/normal_login.html',
			controller: 'ichangcontroller_main'
		})
		.when('/secure/timeout/:timeout', {
			templateUrl: 'app/secure.html',
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
			templateUrl: 'app/register_fb_user.html',
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
		});
		
		// configure html5 to get links working on jsfiddle
		$locationProvider.html5Mode(true);
	});
})(window.angular);					