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
			echo '<link rel="stylesheet" href="http://'.$dom.':81/route/assets/css/bootstrap.min.css">';
			echo '<link rel="stylesheet" href="http://'.$dom.':81/route/assets/css/chang.css">';
		?>				
		
		<script type="text/javascript">
			angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));
		</script>
	</head>
	<body ng-app="ichangapp">
		<div ng-controller="ichangcontroller_main">
			Choose:{{user}} 
			<a href="Book/Moby">Moby</a> |
			<a href="Book/Moby/ch/1">Moby: Ch1</a> |
			<a href="Book/Gatsby">Gatsby</a> |
			<a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
			<a href="Book/Scarlet">Scarlet Letter</a><br/>
			
			<form ng-submit="check_cred(credentials)">
				<input type="text" ng-model="credentials.username" placeholder="Username">
				<input type="password" ng-model="credentials.password" placeholder="Password">
				<button >Login</button>
			</form>
			
			<div ng-view></div>
			
			<hr />
			
			<pre>$location.path() = {{$location.path()}}{{$scope.user}}</pre>
			<pre>$route.current.templateUrl = {{$route.current.templateUrl}}</pre>
			<pre>$route.current.params = {{$route.current.params}}</pre>
			<pre>$route.current.scope.name = {{$route.current.scope.name}}</pre>
			<pre>$routeParams = {{$routeParams}}</pre>
		</div>
	</body>
</html>