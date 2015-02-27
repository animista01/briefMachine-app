angular.module('starter.services', [])

.service('UserService', function ($q, $http){
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  	return {
	    login: function (inputs){
	      	var defer = $q.defer(); 
	      	var xsrf = { email: inputs.email, password: inputs.password };
	      	$http({
		        method: 'POST',
		        url: 'http://briefmachine.com/api/user/login',
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
	    remember: function (email){
	      	var def = $q.defer(); 
	      	var xsrf = { email: email };
	      	$http({
		        method: 'POST',
		        url: 'https://www.thesavvyland.com/api/user/reset',
		        transformRequest: function(obj) {
		          var str = [];
		          for(var p in obj)
		            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		          return str.join("&");
		        },
		        data: xsrf
	      	}).success(function (data){
		        def.resolve(data);
	      	}).error(function (err){
		       def.reject(err);
			});      
	      	return def.promise;
	    },
	    signup: function (inputs){
	    	var defer = $q.defer(); 
	      	var xsrf = { first_name: inputs.name, last_name: inputs.last_name, email: inputs.email, password: inputs.password };
	      	$http({
		        method: 'POST',
		        url: 'http://briefmachine.com/api/user/signup',
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

.service('BriefService', function ($q, $http, $rootScope){
  	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  	return {
	    getAll: function (){
  			token = localStorage.getItem("token");
	    	var defer = $q.defer(); 
	      	var xsrf = { id: token };
	      	$http({
		        method: 'POST',
		        url: 'http://briefmachine.com/api/briefs',
		        transformRequest: function(obj){
		          var str = [];
		          for(var p in obj)
		            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		          return str.join("&");
		        },
		        data: xsrf
	      	}).success(function (data){
	      		$rootScope.briefs = data.briefs;
		        defer.resolve(data);
	      	}).error(function (err){
		       defer.reject(err);
	      	});      
	      	return defer.promise;
		},
	    create: function (data){
    		var defer = $q.defer(); 
	      	var xsrf = data;
	      	$http({
		        method: 'POST',
		        url: 'http://briefmachine.com/api/brief/new',
		        transformRequest: function(obj){
		          var str = [];
		          for(var p in obj)
		            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		          return str.join("&");
		        },
		        data: xsrf
	      	}).success(function (res){
		        defer.resolve(res);
	      	}).error(function (err){
	       		defer.reject(err);
	     	});      
	      	return defer.promise;
	    },
	    findOne: function (briefId){
	    	var defer = $q.defer();
	      	for(var i = 0; i < $rootScope.briefs.length; i++){
		        if($rootScope.briefs[i].id === parseInt(briefId)){
		          defer.resolve($rootScope.briefs[i]);
		        }
	      	}
	      	return defer.promise;
	    }
  	}  
})