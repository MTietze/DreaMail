angular.module(config.APP_NAME)
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      //remove hash from url when possible
      // $locationProvider.html5Mode(true);
  
      var dreamsPromise = {
          /*@ngInject*/
          search: function($stateParams, dreamService){
              var user_id = $stateParams.uid;
              return dreamService.getDreams(user_id);
          },
    };
      $stateProvider
      .state(config.PATHS.HOME, {
        url: '/',
        templateUrl: 'templates/homepage.html',
      })
      .state(config.PATHS.DREAMS, {
        url: '/dreams/?uid',
        templateUrl: 'templates/dreams.html',
        resolve: dreamsPromise,
      });
    
        $urlRouterProvider.otherwise('/');
   });
  
