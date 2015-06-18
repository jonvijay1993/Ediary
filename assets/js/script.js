(function(angular) {
	'use strict';
	angular.module('ichangapp', ['ngRoute'])
	
	.controller('ichangcontroller_main', function($scope, $route, $routeParams, $location,LoginService) {
		$scope.credentials = {
			username : '',
			password : ''
		};
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		$scope.check_cred = function(credentials){
			alert();
			
		}
	})
	.factory('LoginService',function(){
		var obj = {};
		obj.check = function(cred){
			return true;
		}
		return obj;
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