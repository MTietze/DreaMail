angular
  .module(config.APP_NAME)
  .directive('home', home);

function home(){
  var directive = {
          link: link,
          templateUrl: 'templates/home.html',
          restrict: 'E',
          controller: homeController,
          controllerAs: 'vm',
          bindToController: true 
      };
  return directive;
  
  function link(scope, element, attrs) {} 
  
  /*@ngInject*/
  function homeController(dreamService) {
      var vm = this; 
      vm.stats = dreamService.stats;
      vm.words = dreamService.lexicon;
  }
}
