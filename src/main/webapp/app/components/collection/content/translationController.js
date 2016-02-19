(function() {
	angular.module('app')
		.controller('translationController', [
			'$scope', '$rootScope', 'destroyService',
			function($scope, $rootScope, destroyService) {
				$scope.translationData = null;
				$scope.isShowTranslation = false;

				$scope._audio = new Audio('');

				$scope.playAudio = function(src) {
					$scope._audio.pause();
					$scope._audio.src = src;
					$scope._audio.play();
				};

				$scope._playCurrentAudio = function() {
					var audioSrc = $scope.translationData.sourcePhrase.audio;

					if(audioSrc)
						$scope.playAudio(audioSrc);
				};

				$scope._changedTranslationHandler = function(event, translationData) {
					$scope.isShowTranslation = false;
					$scope.translationData = translationData;

					$scope._playCurrentAudio();
				};

				$scope._nextHandler = function(event) {
					$scope.isShowTranslation = !$scope.isShowTranslation;

					if(!$scope.isShowTranslation)
						$rootScope.$emit('getTranslation');
				};

				destroyService.manageUnsubscribeCallbacks($scope, function() {
					return [
						$rootScope.$on('changedTranslation', $scope._changedTranslationHandler),
						$rootScope.$on('next', $scope._nextHandler),
						$rootScope.$on('playCurrentAudio', $scope._playCurrentAudio)
					];
				});
			}
		]);
})();