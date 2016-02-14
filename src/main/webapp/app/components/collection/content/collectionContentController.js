(function(){
	angular.module('app')
		.controller('collectionContentController', function($scope, $rootScope, $stateParams, utils, dialogService, siteNavigationService, dataService){
			$scope.groupStartIndex = 0;
			$scope.groupEndIndex = 0;
			$scope.collectionLength = 0;

			$scope.GROUP_LENGTH = 10;

			$scope._collectionID = null;
			$scope._collection = null;
			$scope._group = null;
			$scope._groupIndex = 0;
			$scope._isExpandedGroup = false;

			$scope.init = function(collectionID){
				$scope._collectionID = collectionID;
			};

			$scope.prevGroup = function(){
				--$scope._groupIndex;
				$scope._changedGroup();
			};

			$scope.switchExpandedGroup = function(){
				$scope._isExpandedGroup = !$scope._isExpandedGroup;
				$scope._changedGroup();
			};

			$scope.nextGroup = function(){
				++$scope._groupIndex;
				$scope._changedGroup();
			};

			$scope.shuffle = function(){
				$scope._shuffleArray($scope._collection);
				$scope._isExpandedGroup = false;
				$scope._groupIndex = 0;
				$scope._changedGroup();
			};

			$scope._getTranslation = function(){
				var translationData = $scope._group.pop();

				if(!$scope._group.length)
					$scope._generateGroup();

				$rootScope.$emit('changedTranslation', translationData);
			};

			$scope._changedGroup = function(){
				var maxGroupIndex = Math.floor($scope.collectionLength / $scope.GROUP_LENGTH);
				if($scope._groupIndex < 0)
					$scope._groupIndex = maxGroupIndex;
				else if(maxGroupIndex < $scope._groupIndex)
					$scope._groupIndex = 0;

				var unexpandedGroupStartIndex = $scope._groupIndex * $scope.GROUP_LENGTH;

				$scope.groupStartIndex = ($scope._isExpandedGroup ? 0 : unexpandedGroupStartIndex) + 1;
				$scope.groupEndIndex = Math.min(unexpandedGroupStartIndex + $scope.GROUP_LENGTH, $scope.collectionLength);
				$scope._generateGroup();

				$scope._getTranslation();

				$rootScope.$emit('changedGroup', $scope.groupStartIndex, $scope.groupEndIndex, $scope.collectionLength);
			};

			$scope._generateGroup = function(){
				$scope._group = $scope._collection.slice($scope.groupStartIndex - 1, $scope.groupEndIndex);
				$scope._shuffleArray($scope._group);
			};

			$scope._shuffleArray = function(array){
				array.sort(function(){
					return 0.5 - Math.random();
				});
			};

			$scope._loadData = function(){
				dataService.getCollection($stateParams.collectionId, $scope._loadDataComplete, $scope._loadDataError);

				$rootScope.$emit('startProgress');
			};

			$scope._loadDataComplete = function(response){
				$rootScope.$emit('endProgress');
				var data = response.data;
				$scope._collection = data.collection;
				$scope._groupIndex = 0;

				$scope.collectionLength = $scope._collection ? $scope._collection.length : 0;

				$scope._changedGroup();

				$rootScope.$emit('changeHeader', data.title);
			};

			$scope._loadDataError = function(){
				$rootScope.$emit('endProgress');

				dialogService.confirm('Failed to load data', 'Try again', 'Back', $scope._loadData, siteNavigationService.gotoCollectionListPage);
			};

			utils.unsubscribeAtDestroy($scope, function(){
				return [
					$rootScope.$on('getTranslation', $scope._getTranslation),
					$rootScope.$on('prevGroup', $scope.prevGroup),
					$rootScope.$on('switchExpandedGroup', $scope.switchExpandedGroup),
					$rootScope.$on('nextGroup', $scope.nextGroup),
					$rootScope.$on('shuffle', $scope.shuffle)
				];
			});

			$scope._loadData();
		});
})();