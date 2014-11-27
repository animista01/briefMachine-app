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
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="3"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="text" placeholder="An input text" disabled /> </div>')
        });
      break;
      
      case 'textarea':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="4"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <textarea placeholder="A textarea" disabled></textarea> </div>')         
        });
      break;
      
      case 'nptColor':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="5"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="color" disabled /> </div>')         
        });
      break;
      
      case 'nptDate':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="6"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="date" disabled /> </div>')         
        });
      break;
      
      case 'nptNumber':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="7"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="tel" placeholder="An input number" disabled /> </div>')         
        });
      break;
      
      case 'nptFile':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="8"> <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur</p> <input type="file" disabled /> </div>')         
        });
      break;
      
      case 'nptRadio':
        $rootScope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="1"> <p contenteditable="true">Praesentium debitis pariatur quia odi</p> </div> <div class="options"> <input type="radio" disabled /> <p contenteditable="true">Lorem ipsum</p> <input type="radio" disabled /> <p contenteditable="true">Lorem ipsum</p> </div> <button class="button button-small ion-plus-round" ng-click="addMoreOpc(1, $event)"></button>')         
        });
      break;
      
      case 'nptCheckbox':
        $rootScope.items.push({
          input: $sce.trustAsHtml("<div id='inputN"+inputN+"' class='2'> <p contenteditable='true'>Lorem ipsum dolor sit amet, consectetur</p> </div> <div class='options'> <input type='checkbox' disabled /> <p contenteditable='true'>Lorem ipsum</p> <input type='checkbox' disabled /> <p contenteditable='true'>Lorem ipsum</p> </div> <button class='button button-small ion-plus-round' ng-click='addMoreOpc(2, $event)'></button>")         
        });
      break;
    }
  }
  $scope.addMoreOpc = function (type, obj){
    e = obj.srcElement.parentElement.innerHTML;
    ee = obj;
    console.log(e)
    console.log(ee)

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
    data = { id: 1, title: "", email: "", description: "", questions: [] };
    $ionicPopup.show({
      template: '<input type="text" placeholder="Titulo brief" ng-model="data.titulo" /> <br/> <textarea placeholder="Descripcion del brief" ng-model="data.description"></textarea> <br/> <input type="email" placeholder="Enviar a: Correo electrónico" ng-model="data.correo" />',
      title: 'Guardar brief',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Guardar</b>',
          type: 'button-positive',
          onTap: function (e){
            if($rootScope.items.length == 0){
              e.preventDefault();
              $ionicLoading.show({template: '<p>Tu brief esta vació</p>', duration: 1500, showBackdrop: false});
            }else{
              var elements = document.getElementsByClassName("item-content");
              for(var i = 0; i < elements.length - 2; i++){
                type = elements[i].firstElementChild.firstChild.className;
                if(type === "1" || type === "2"){
                  var opt = [];
                  for(var j = 1; j < elements[i].children[0].children[1].children.length; j += 2){
                    opt.push(elements[i].children[0].children[1].children[j].innerText);
                  }
                  data.questions.push({
                    type: elements[i].firstElementChild.firstChild.className,
                    question: elements[i].firstElementChild.firstChild.innerText.replace("\n\n", ""),
                    options: opt
                  });
                }else{
                  data.questions.push({
                    type: elements[i].firstElementChild.firstChild.className,
                    question: elements[i].firstElementChild.firstChild.innerText.replace("\n\n", ""),
                  });
                }
              }//end for
              data.questions = JSON.stringify(data.questions);
              console.log($scope.data.titulo, $scope.data.description, $scope.data.correo)
              if($scope.data.titulo && $scope.data.description && $scope.data.correo){
                $ionicLoading.show({template:'<i class="icon ion-looping"></i><p>Creando brief</p>'});
                data.title = $scope.data.titulo;
                data.email = $scope.data.correo;
                data.description = $scope.data.description;
                console.log(data)
                var result = BriefService.create(data);
                result.then(function (res){
                  if(res.status == 200){
                    $ionicLoading.show({template: '<i class="icon ion-checkmark-round"></i><p>'+res.message+'</p>', showBackdrop: false, duration: 2500});
                  }else{
                    $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+res.message+'</p>', duration: 2000, showBackdrop: false});
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
