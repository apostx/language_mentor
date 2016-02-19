(function() {
	angular.module('app')
		.service('destroyService', function() {
			this.manageUnsubscribeCallbacks = function(scope, unsubscribeCallbackListGenerator) {
				var unsubscribeCallbackList = unsubscribeCallbackListGenerator();

				scope.$on('$destroy', function() {
					var length = unsubscribeCallbackList.length;

					for(var i = 0; i < length; ++i)
						unsubscribeCallbackList[i]();
				});
			};
		})

		.service('documentEventService', [
			'$document',
			function($document) {
				this.on = function(eventType, handler) {
					$document.bind(eventType, handler);

					return function() {
						$document.unbind(eventType, handler);
					};
				};
			}
		])

		.service('dialogService', [
			'$mdDialog',
			function($mdDialog) {
				this.alert = function(title, okTitle, okCallback) {
					var alert = $mdDialog.alert()
						.title(title)
						.ok(okTitle);

					$mdDialog.show(alert).finally(okCallback);
				};

				this.confirm = function(title, okTitle, cancelTitle, okCallback, cancelCallback) {
					var confirm = $mdDialog.confirm()
						.title(title)
						.ok(okTitle)
						.cancel(cancelTitle);

					$mdDialog.show(confirm).then(okCallback, cancelCallback);
				};
			}
		])

		.service('siteNavigationService', [
			'$state',
			function($state) {
				this.gotoCollectionListPage = function() {
					$state.go('collectionList');
				};

				this.gotoCollectionPage = function(collectionId) {
					$state.go('collection', {
						collectionId: collectionId
					});
				};
			}
		])

		.service('dataService', [
			'$http',
			function($http) {
				this.getCollectionList = function(successCallback, errorCallback) {
					$http.get('service.json')
						.then(successCallback, errorCallback);
				};

				this.getCollection = function(collectionId, successCallback, errorCallback) {
					$http.get(''.concat(collectionId, '/service.json'))
						.then(successCallback, errorCallback);
				};
			}
		]);
})();