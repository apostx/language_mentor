(function() {
	angular.module('app')
		.run([
			'$rootScope',
			function($rootScope) {
				$rootScope.isProgress = false;
				$rootScope._progressCounter = 0;

				$rootScope._startProgressHandler = function() {
					$rootScope.isProgress = true;
					++$rootScope._progressCounter;
				};

				$rootScope._endProgressHandler = function() {
					$rootScope.isProgress = 0 !== --$rootScope._progressCounter;
				};

				$rootScope.$on('startProgress', $rootScope._startProgressHandler);
				$rootScope.$on('endProgress', $rootScope._endProgressHandler);

				$rootScope.$on('$stateChangeStart', $rootScope._startProgressHandler);
				$rootScope.$on('$stateChangeSuccess', $rootScope._endProgressHandler);
			}
		]);
})();