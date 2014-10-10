angular.module('starter.services', [])

.service('LoginService', function ($q, $http) {
  	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  	return {
	    login: function (email, password) {
	      var defer = $q.defer(); 
	      // replace timeout function with actual $http call
	      // the $http call will return a promise equivelant to
	      // defer.promise;
	      var xsrf = { email: email, password: password };
	      $http({
	        method: 'POST',
	        url: 'https://savvy.land/api/user/signin',
	        transformRequest: function(obj) {
	          var str = [];
	          for(var p in obj)
	            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	          return str.join("&");
	        },
	        data: xsrf
	      }).success(function (data) {
	        // presume data contains json {token: some token}
	        defer.resolve(data);
	      }).error(function (err){
	       defer.reject(err);
	      });      
	      return defer.promise;
	    }
  	}  
})