(function() {
	angular.module('app')
		.controller('collectionFooterController', [
			'$scope', '$rootScope', '$document', 'destroyService', 'documentEventService', 'siteNavigationService',
			function($scope, $rootScope, $document, destroyService, documentEventService, siteNavigationService) {
				$scope.groupStartIndex = 0;
				$scope.groupEndIndex = 0;
				$scope.collectionLength = 0;

				$scope.prevGroup = function() {
					$rootScope.$emit('prevGroup');
				};

				$scope.nextGroup = function() {
					$rootScope.$emit('nextGroup');
				};

				$scope.switchExpandedGroup = function() {
					$rootScope.$emit('switchExpandedGroup');
				};

				$scope.next = function(e) {
					$rootScope.$emit('next');
				};

				$scope.shuffle = function() {
					$rootScope.$emit('shuffle');
				};

				$scope.close = function() {
					siteNavigationService.gotoCollectionListPage();
				};

				$scope._changedGroupHandler = function(event, groupStartIndex, groupEndIndex, collectionLength) {
					$scope.collectionLength = collectionLength;
					$scope.groupStartIndex = groupStartIndex;
					$scope.groupEndIndex = groupEndIndex;
				};

				$scope._keyDownHandler = function(event) {
					switch(event.keyCode) {
						case 13: //enter
						case 32: //space
						case 40: //down
							$scope.next();
							break;
						case 37: //left
							$scope.prevGroup();
							break;
						case 38: //up
							$scope.switchExpandedGroup();
							break;
						case 39: //right
							$scope.nextGroup();
							break;
						case 17: //ctrl
							$rootScope.$emit('playCurrentAudio');
							break;
					}

					$scope.$apply();
				};

				$scope._mouseUpHandler = function(e) {
					$document[0].activeElement.blur();
				};

				destroyService.manageUnsubscribeCallbacks($scope, function() {
					return [
						$rootScope.$on('changedGroup', $scope._changedGroupHandler),
						documentEventService.on('keydown', $scope._keyDownHandler),
						documentEventService.on('mouseup', $scope._mouseUpHandler)
					];
				});
			}
		]);
})();