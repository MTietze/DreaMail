angular.module(config.APP_NAME)
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      //remove hash from url when possible
      // $locationProvider.html5Mode(true);
  
      var searchPromise = {
          /*@ngInject*/
          search: function(results, $stateParams, $rootScope){
                var params = {
                  entity_type: this.data.entity_type,
                };
  
                angular.forEach($stateParams, function(value, param){
                  if(value){
                    params[param] = decodeOrEmpty(value);
                  }
                });
  
                return results.getInitial(params);
          },
    };
      $stateProvider
      .state(config.PATHS.HOME, {
        url: '/',
        templateUrl: 'templates/home.html',
      });
    
        $urlRouterProvider.otherwise('/');
   });
  
