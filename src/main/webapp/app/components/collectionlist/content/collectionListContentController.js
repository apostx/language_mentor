(function() {
	angular.module('app')
		.controller('collectionListContentController', [
			'$scope', '$rootScope', 'dataService', 'dialogService', 'siteNavigationService',
			function($scope, $rootScope, dataService, dialogService, siteNavigationService) {
				$scope.collectionList = null;

				$scope.openCollection = function(id) {
					siteNavigationService.gotoCollectionPage(id);
				};

				$scope._loadData = function() {
					dataService.getCollectionList($scope._loadDataComplete, $scope._loadDataError);
					$rootScope.$emit('startProgress');
				};

				$scope._loadDataComplete = function(response) {
					$rootScope.$emit('endProgress');
					$rootScope.$emit('changeHeader', 'LanguageMentor');
					$rootScope.$emit('changeFooter', 'Choose a collection');
					$scope.collectionList = response.data;
				};

				$scope._loadDataError = function() {
					$rootScope.$emit('endProgress');

					dialogService.alert('Failed to load data', 'Try again', $scope._loadData);
				};

				$scope._loadData();
			}
		]);
})();