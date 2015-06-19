<!DOCTYPE html>
<html data-ng-app="app">
	
	<head>
		<?php 
			$dom = $_SERVER['SERVER_NAME'];
			echo '<script src="http://'.$dom.':81/route/assets/js/app.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/jquery-2.1.3.min.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/angular.min.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/angular-route.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/angular-cookies.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/script.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/jquery.backstretch.min.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/bootstrap.min.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/angular-facebook.js"></script>';
			echo '<script src="http://'.$dom.':81/route/assets/js/angular-facebook-phonegap.js"></script>';
			echo '<link rel="stylesheet" href="http://'.$dom.':81/route/assets/css/bootstrap.min.css">';
			echo '<link rel="stylesheet" href="http://'.$dom.':81/route/assets/css/chang.css">';
		?>
		<script>
			
			angular.module('app', ['facebook'])
			
			.config(function(FacebookProvider) {
				FacebookProvider.init('841009275982710');
			})
			
			.controller('mainCtrl', function ($scope, Facebook) {
				
				$scope.loginStatus = 'disconnected';
				$scope.facebookIsReady = false;
				$scope.user = null;
				
				$scope.login = function () {
					Facebook.login(function(response) {
						$scope.loginStatus = response.status;
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
						$scope.user = response;
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
			});
			
		</script>
	</head>
	
	<body ng-controller="mainCtrl">
		<button type="button" id="login" ng-click="login()">login</button>
		<button type="button" id="api" ng-click="api()">api user data call</button>
		<button type="button" id="remove_auth" ng-click="removeAuth()">remove auth</button>
		<pre>isReady: <span id="is_ready" ng-bind="facebookIsReady"></span></pre>
		<pre>status: <span id="login_status" ng-bind="loginStatus"></span></pre>
		<pre>username: <span id="api_first_name" ng-bind="user.first_name"></span></pre>
	</body>
	
</html>
