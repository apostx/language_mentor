(function(){
	angular.module('app')
		.controller('frameController', function($scope, $rootScope){
			$scope.header = null;
			$scope.footer = null;

			$rootScope.$on('changeHeader', function(event, content){
				$scope.header = content;
			});

			$rootScope.$on('changeFooter', function(event, content){
				$scope.footer = content;
			});
		});
})();