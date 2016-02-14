(function(){
	angular.module('app')
		.service('utils', function(){
			this.unsubscribeAtDestroy = function(scope, unsubscribeCallbackListGenerator){
				var unsubscribeCallbackList = unsubscribeCallbackListGenerator();

				scope.$on('$destroy', function(){
					var length = unsubscribeCallbackList.length;

					for(var i = 0; i < length; ++i)
						unsubscribeCallbackList[i]();
				});
			};
		})

		.service('dialogService', function($mdDialog){
			this.alert = function(title, okTitle, okCallback){
				var alert = $mdDialog.alert()
					.title(title)
					.ok(okTitle);

				$mdDialog.show(alert).finally(okCallback);
			};

			this.confirm = function(title, okTitle, cancelTitle, okCallback, cancelCallback){
				var confirm = $mdDialog.confirm()
					.title(title)
					.ok(okTitle)
					.cancel(cancelTitle);

				$mdDialog.show(confirm).then(okCallback, cancelCallback);
			};
		})

		.service('siteNavigationService', function($state){
			this.gotoCollectionListPage = function(){
				$state.go('collectionList');
			};

			this.gotoCollectionPage = function(collectionId){
				$state.go('collection', {
					collectionId: collectionId
				});
			};
		})

		.service('dataService', function($http){
			this.getCollectionList = function(successCallback, errorCallback){
				$http.get('service.json')
					.then(successCallback, errorCallback);
			};

			this.getCollection = function(collectionId, successCallback, errorCallback){
				$http.get(''.concat(collectionId, '/service.json'))
					.then(successCallback, errorCallback);
			};
		});
})();