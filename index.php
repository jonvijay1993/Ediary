<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Example - example-$route-service-production</title>
		
		
		<?php 
			$dom = $_SERVER['SERVER_NAME'];
			echo '<link rel="shortcut icon" src="http://'.$dom.':81/route/assets/img/monkey.png"></script>';
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
		
		<script type="text/javascript">
			angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));
		</script>
	</head>
	<body ng-app="ichangapp">
		<div ng-controller="ichangcontroller_main">
			
			<div ng-hide="hide_normal_login">
				<button ng-click="signup()">Sign Up</button>
				<form ng-submit="check_cred(credentials)">
					<button type="button" id="login" ng-click="login()">login</button>
					<input type="text" ng-model="credentials.username" placeholder="Username">
					<input type="password" ng-model="credentials.password" placeholder="Password">
					<span>Remember Me</span><input type="checkbox" ng-model="credentials.remember_me">
					<button >Login</button>
				</form>
			</div>
			
			<div ng-hide="hide_auto_login">
				<form ng-submit="auto_login()">
					<span>{{auto_login_username}}</span>
					<button>Login</button>
					<input type="button" ng-click="forget_me()" value="Forget me">
				</form>
			</div>
			
			<div ng-view></div>
			
			<div ng-hide="hide_fb_login">
				<button type="button" id="api" ng-click="api()">api user data call</button>
				<button type="button" id="remove_auth" ng-click="removeAuth()">remove auth</button>
				<pre>isReady: <span id="is_ready" ng-bind="facebookIsReady"></span></pre>
				<pre>status: <span id="login_status" ng-bind="loginStatus"></span></pre>
				<pre>username: <span id="api_first_name" ng-bind="user.first_name"></span></pre>
			</div>
			
			</div>
			</body>
			</html>					