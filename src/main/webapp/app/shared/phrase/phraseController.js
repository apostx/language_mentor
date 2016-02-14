(function(){
	angular.module('app')
		.controller('phraseController', function($scope, $attrs){
			$scope.$watch($attrs.data, function(data){
				if(data){
					$scope.phrase = data.phrase;
					$scope.phonetic = data.phonetic;
					$scope.audio = data.audio;
				}
			});
		});
})();