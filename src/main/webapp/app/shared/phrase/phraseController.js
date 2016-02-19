(function() {
	angular.module('app')
		.controller('phraseController', [
			'$scope', '$attrs',
			function($scope, $attrs) {
				$scope.$watch($attrs.data, function(data) {
					if(data) {
						$scope.phrase = data.phrase;
						$scope.phonetic = data.phonetic;
						$scope.audio = data.audio;
					}
				});
			}
		]);
})();