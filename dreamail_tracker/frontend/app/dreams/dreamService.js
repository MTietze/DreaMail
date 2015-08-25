angular
.module(config.APP_NAME)
.service('dreamService', function(httpFactory){
    var _this = {};

    _this.get = get;

    function get (stateParams){
      var uid = stateParams.uid;
      var data = {
        'uid': uid,
      };
      return new httpFactory('dreams').post(data).success(update).error(showError);
    }

    function update(response){
      _this.lexicon = angular.fromJson(response);
    }

    function showError(response){
      console.log('BAD');
    }
    return _this;
});