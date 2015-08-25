angular
  .module(config.APP_NAME)
  .factory('httpFactory', httpFactory);

function httpFactory($http, $cookies){
  
  $http.defaults.headers.common['X-CSRFToken'] = $cookies.get('csrftoken');

  return function(endpoint) {
      
      var url = config.API_PATH + config.API_ENDPOINTS[endpoint];
      this.post = function(data){
        return $http.post(url, data);
      };
      this.get = function(data){
        return $http.get(url, data);
      };
      this.put = function(data){
        return $http.put(url, data);
      };
  };
}
