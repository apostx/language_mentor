(function(){
	angular.module('app')
		.controller('collectionFooterController', function($scope, $rootScope, $document, utils, siteNavigationService){
			$scope.groupStartIndex = 0;
			$scope.groupEndIndex = 0;
			$scope.collectionLength = 0;

			$scope.prevGroup = function(){
				$rootScope.$emit('prevGroup');
			};

			$scope.nextGroup = function(){
				$rootScope.$emit('nextGroup');
			};

			$scope.switchExpandedGroup = function(){
				$rootScope.$emit('switchExpandedGroup');
			};

			$scope.next = function(){
				$rootScope.$emit('next');
			};

			$scope.shuffle = function(){
				$rootScope.$emit('shuffle');
			};

			$scope.close = function(){
				siteNavigationService.gotoCollectionListPage();
			};

			$scope._changedGroupHandler = function(event, groupStartIndex, groupEndIndex, collectionLength){
				$scope.collectionLength = collectionLength;
				$scope.groupStartIndex = groupStartIndex;
				$scope.groupEndIndex = groupEndIndex;
			};
			
			$scope._keyDownHandler = function(event){
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
				}
				
				$scope.$apply();
			};

			utils.unsubscribeAtDestroy($scope, function(){
				return [
					$rootScope.$on('changedGroup', $scope._changedGroupHandler),
					$document.bind('keydown', $scope._keyDownHandler)
				];
			});
		});
})();