angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicLoading, UserService){
  // $ionicLoading.show({template:'<i class="icon ion-looping"></i>'});

  $scope.login = function (inputs){
    var result = UserService.login(inputs);
    result.then(function (data){
      if(data.status == 200){
        $ionicLoading.hide();
      }else{
        $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2000, showBackdrop: false});
      }
    }, function (err){
      $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
    });
  }
})
.controller('SignupCtrl', function ($scope, $ionicLoading, $ionicNavBarDelegate, UserService){
  // $ionicLoading.show({template:'<i class="icon ion-looping"></i>'});
  $scope.goBack = function (){
    $ionicNavBarDelegate.back();
  }

  $scope.signup = function (inputs){
    var result = UserService.signup();
    result.then(function (data){
      if(data.status == 200){
        $ionicLoading.hide();
      }else{
        $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2000, showBackdrop: false});
      }
    }, function (err){
      $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
    });
  }
})

.controller('HomeCtrl', function ($scope, BriefService, $rootScope, $ionicLoading){
  $ionicLoading.show({template:'<i class="icon ion-looping"></i><p>Trayendo tus briefs</p>'});

  var result = BriefService.getAll();
  result.then(function (data){
    if(data.status == 200){
      console.log(data);
      $rootScope.briefs = data.briefs;
      $ionicLoading.hide();
    }else{
      $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2000, showBackdrop: false});
    }
  }, function (err){
    $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
  });
  
  $scope.clearSearch = function (){
    $scope.search = '';
  }
})

.controller('NewBriefCtrl', function ($scope, $ionicPopover, $rootScope, $sce, $ionicPopup, $compile, BriefService, $ionicLoading){
  inputN = 0;
  $rootScope.items = [];

  $scope.data = {
    showDelete: false
  };

  $ionicPopover.fromTemplateUrl('templates/popover.html',{
    scope: $scope,
  }).then(function (popover){
    $scope.popover = popover;
  });

  $scope.moveItem = function (item, fromIndex, toIndex){
    $rootScope.items.splice(fromIndex, 1);
    $rootScope.items.splice(toIndex, 0, item);
  };
  $scope.onItemDelete = function (item){
    $rootScope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.addInput = function (type){
    inputN = inputN + 1;
    switch (type){
      case 'nptTxt':
        $rootScope.items.push({ 
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="type_3"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="text" placeholder="An input text" disabled /> </div>')
        });
      break;
      
      case 'textarea':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="type_4"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <textarea placeholder="A textarea" disabled></textarea> </div>')         
        });
      break;
      
      case 'nptColor':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="type_5"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="color" disabled /> </div>')         
        });
      break;
      
      case 'nptDate':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="type_6"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="date" disabled /> </div>')         
        });
      break;
      
      case 'nptNumber':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="type_7"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="tel" placeholder="An input number" disabled /> </div>')         
        });
      break;
      
      case 'nptFile':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="type_8"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="file" disabled /> </div>')         
        });
      break;
      
      case 'nptRadio':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="type_1"> <p contenteditable="true">Praesentium debitis pariatur quia odi</p> <input type="radio" disabled /><p contenteditable="true">Lorem ipsum</p> <input type="radio" disabled /> <p contenteditable="true">Lorem ipsum</p> <button class="button button-small ion-plus-round" ng-click="addMoreOpc(1, $index, $event)"></button> </div>')         
        });
      break;
      
      case 'nptCheckbox':
        $rootScope.items.push({
          input: $sce.trustAsHtml("<div id='inputN"+inputN+"' class='type_2'> <p contenteditable='true'>Lorem ipsum dolor sit amet, consectetur</p> <div class='option'> <input type='checkbox' disabled /> <p contenteditable='true'>Lorem ipsum</p> </div> <div class='option'> <input type='checkbox' disabled /><p contenteditable='true'>Lorem ipsum</p> </div> <button class='button button-small ion-plus-round' ng-click='addMoreOpc(2, $index, $event)'></button> </div>")         
        });
      break;
    }
  }
  $scope.addMoreOpc = function (type, index, obj){
    // e = obj.srcElement.parentElement.innerHTML;
    // ee = obj;
    // console.log(e)
    // console.log(ee)
    var list = $rootScope.items[index].input.$$unwrapTrustedValue().split("<div class='option'>")
    for ( var i = 1; i < list.length; i++){
      list[i] = "<div class='option'>" + list[i]
    }
    var sublist = list[list.length-1].split("<button")
    sublist[sublist.length - 1] = "<button" + sublist[sublist.length - 1]
    if ( type == 2)
      sublist.splice( sublist.length - 1, 0, "<div class='option'>  <input type='checkbox' disabled /> <p contenteditable='true'>Lorem ipsum</p> </div> ");
    else
      sublist.splice( sublist.length - 1, 0, "<div class='option'>  <input type='radio' disabled /> <p contenteditable='true'>Lorem ipsum</p> </div> ");
    list[list.length - 1] = sublist.join("")
    $rootScope.items[index] = {
      input: $sce.trustAsHtml(list .join(""))
    }
    // switch (type){
    //   case 1:
    //     $rootScope.items.push({ 
    //       input: $sce.trustAsHtml('<input type="radio" disabled />')
    //     });
    //   break;
    //   case 2:
    //     $rootScope.items.push({
    //       input: $sce.trustAsHtml("<input type='checkbox' disabled />")
    //     });
    //   break;
    // }
  }

  $scope.save = function (){
    question_type = [];
    question_text = [];
    $ionicPopup.show({
      scope: $scope,
      template: '<input type="text" placeholder="Titulo brief" ng-model="titulo" /> <br/> <textarea placeholder="Descripcion del brief" ng-model="description"></textarea> <br/> <input type="email" placeholder="Enviar a: Correo electrónico" ng-model="email" />',
      title: 'Guardar brief',
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Guardar</b>',
          type: 'button-positive',
          onTap: function(e){
            myArray = ['a', 'b', 'c', 'd']; 
            delete myArray[2];
            console.log(myArray)
            var elements = document.getElementsByClassName("item-content")
            // elements.remove(-2);
            console.log(elements)
            // for(var i = 0; i < elements.length; i++){
            //   type = elements[i].firstElementChild.firstChild.className;
            //   text = elements[i].firstElementChild.firstChild.innerText;
            //   question_type.push(elements[i].firstElementChild.firstChild.className);
            //   question_text.push(text);
            //   // if(== "type_1"){

            //   // }else if(== "type_2"){

            //   // }
            // }
            // console.log(question_type)
            // console.log(question_text)

            // test = $rootScope.items[0].input.$$unwrapTrustedValue();
            // console.log($rootScope.items)
            // console.log($rootScope.items[0].input.$$unwrapTrustedValue());
            if($rootScope.items.length == 0){
              e.preventDefault();
              $ionicLoading.show({template: '<p>Tu brief esta vació</p>', duration: 1500, showBackdrop: false});
            }else{
              if($scope.titulo && $scope.description && $scope.email){
                var result = BriefService.create();
                result.then(function (data){
                  if(data.status == 200){
                    $ionicLoading.hide();
                  }else{
                    $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2000, showBackdrop: false});
                  }
                }, function (err){
                  $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
                });
              }else{
                e.preventDefault();
              }
            }
          }//onTap
        },
      ]//buttons
    });
  }

})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});
