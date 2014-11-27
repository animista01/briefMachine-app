angular.module('starter.services', [])

.service('UserService', function ($q, $http){
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  	return {
	    login: function (inputs){
	      	var defer = $q.defer(); 
	      	var xsrf = { email: inputs.email, password: inputs.password };
	      	$http({
		        method: 'POST',
		        url: 'https://savvy.land/api/user/login',
		        transformRequest: function(obj){
		          var str = [];
		          for(var p in obj)
		            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		          return str.join("&");
		        },
		        data: xsrf
	      	}).success(function (data){
		        // presume data contains json {token: some token}
		        defer.resolve(data);
	     	}).error(function (err){
	       		defer.reject(err);
	      	});      
	      	return defer.promise;
	    },
	    signup: function (inputs){
	    	var defer = $q.defer(); 
	      	var xsrf = { email: email, password: password };
	      	$http({
		        method: 'POST',
		        url: 'https://savvy.land/api/user/login',
		        transformRequest: function(obj){
		          var str = [];
		          for(var p in obj)
		            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		          return str.join("&");
		        },
		        data: xsrf
	      	}).success(function (data){
		        // presume data contains json {token: some token}
		        defer.resolve(data);
	     	}).error(function (err){
	       		defer.reject(err);
	      	});      
	      	return defer.promise;
	    }
	}
})

.service('BriefService', function ($q, $http){
  	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  	return {
	    getAll: function (){
	    	var defer = $q.defer(); 
	      	var xsrf = { id: 1 };
	      	$http({
		        method: 'POST',
		        url: 'http://briefmachine.com/api/briefs',
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
		},
	    create: function (inputs){
    		var defer = $q.defer(); 
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