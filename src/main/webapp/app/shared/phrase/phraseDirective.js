(function() {
	angular.module('app')
		.directive('phrase', function() {
			return {
				restrict: 'E',
				scope: true,
				replace: true,
				controller: 'phraseController',
				templateUrl: 'app/shared/phrase/phraseView.html'
			};
		});
})();