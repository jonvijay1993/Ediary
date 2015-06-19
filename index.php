<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Example - example-$route-service-production</title>
		
		
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
		
		<script type="text/javascript">
			angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));
		</script>
</head>
<body ng-app="ichangapp">
	<div ng-controller="ichangcontroller_main">
		Choose:
		{{uuser}}
		<a href="about">About</a>
		
		<form ng-submit="check_cred(credentials)">
			<input type="text" ng-model="credentials.username" placeholder="Username">
			<input type="password" ng-model="credentials.password" placeholder="Password">
			<button >Login</button>
		</form>
		
		<div ng-view></div>
		
	</div>
</body>
</html>