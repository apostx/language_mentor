(function(){
	angular.module('app')
		.controller('translationController', function($scope, $rootScope, utils){
			$scope.translationData = null;
			$scope.isShowTranslation = false;

			$scope._audio = new Audio('');

			$scope.playAudio = function(src){
				$scope._audio.pause();
				$scope._audio.src = src;
				$scope._audio.play();
			};

			$scope._changedTranslationHandler = function(event, translationData){
				$scope.isShowTranslation = false;
				$scope.translationData = translationData;

				var audioSrc = translationData.sourcePhrase.audio;

				if(audioSrc)
					$scope.playAudio(audioSrc);
			};

			$scope._nextHandler = function(event){
				$scope.isShowTranslation = !$scope.isShowTranslation;

				if(!$scope.isShowTranslation)
					$rootScope.$emit('getTranslation');
			};

			utils.unsubscribeAtDestroy($scope, function(){
				return [
					$rootScope.$on('changedTranslation', $scope._changedTranslationHandler),
					$rootScope.$on('next', $scope._nextHandler)
				];
			});
		});
})();