(function() {
	angular.module('app')
		.config([
			'$stateProvider', '$urlRouterProvider', '$locationProvider',
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$locationProvider.html5Mode({
					enabled: true,
					requireBase: false
				});

				$urlRouterProvider.otherwise('/');

				$stateProvider
					.state('collectionList', {
						url: '/',
						views: {
							content: {
								templateUrl: 'app/components/collectionlist/content/collectionListContentView.html',
								controller: 'collectionListContentController'
							},
							footer: {templateUrl: 'app/components/frame/footer/frameFooterView.html'}
						}
					})
					.state('collection', {
						url: '/{collectionId:[a-z0-9]{32}}',
						views: {
							content: {
								templateUrl: 'app/components/collection/content/collectionContentView.html',
								controller: 'collectionContentController'
							},
							footer: {
								templateUrl: 'app/components/collection/footer/collectionFooterView.html',
								controller: 'collectionFooterController'
							}
						}
					});
			}
		]);
})();