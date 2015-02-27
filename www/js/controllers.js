angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicLoading, UserService, $state, $ionicHistory, $ionicPopup){
  $scope.login = function (inputs){
    if(inputs.email && inputs.password){
      $ionicLoading.show({template:'<i class="icon ion-looping"></i>'});
      var result = UserService.login(inputs);
      result.then(function (data){
        if(data.status == 200){
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
          $ionicLoading.hide();
          localStorage.setItem("token", data.token);
          $state.go('app.home');
        }else{
          $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2000, showBackdrop: false});
        }
      }, function (err){
        $ionicLoading.show({template: '<p>Algo malo ocurrió</p>', duration: 1500, showBackdrop: false});
      });
    }else{
      $ionicLoading.show({template: '<p>Necesitas llenar todos los campos</p>', duration: 2500, showBackdrop: false});
    }
  }
  $scope.remember = function (){
    $scope.cosa = {};
    $ionicPopup.show({
      template: '<input type="email" placeholder="Correo electrónico" ng-model="cosa.correo" required />',
      title: 'Restablecer la contraseña',
      subTitle: 'Por favor, introduce tu dirección de correo electrónico y te enviaremos un mensaje para restablecer la contraseña',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Restablecer</b>',
          type: 'button-positive',
          onTap: function (e){
            if($scope.cosa.correo){
              // var rememberPass = LoginService.remember($scope.cosa.correo);
              // rememberPass.then(function (res){
              //   $scope.rememberPopup.close();
              //   $ionicLoading.show({template: '<i class="icon ion-checkmark-round"></i><p>Te hemos enviado un correo.</p>', duration: 2000, showBackdrop: false});
              // }, function (err){
              //   $scope.rememberPopup.close();
              //   $ionicLoading.show({template: '<p>Algo salió mal</p>', duration: 1500, showBackdrop: false});
              // });
              e.preventDefault();
            }else{
              e.preventDefault();
              $ionicLoading.show({template: '<p>Asegúrate de escribir un correo valido</p>', duration: 1900, showBackdrop: false});
            }
          }//onTap
        },
      ]
    });
  }//remember
  
})
.controller('SignupCtrl', function ($scope, $ionicLoading, $ionicNavBarDelegate, UserService, $state){
  $scope.goBack = function (){
    $ionicNavBarDelegate.back();
  }

  $scope.signup = function (inputs){
    if(inputs.email && inputs.last_name && inputs.name && inputs.password){
      $ionicLoading.show({template:'<i class="icon ion-looping"></i>'});
      var result = UserService.signup(inputs);
      result.then(function (data){
        if(data.status == 200){
          $ionicLoading.hide();
          $state.go('login');
        }else{
          $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2000, showBackdrop: false});
        }
      }, function (err){
        $ionicLoading.show({template: '<p>Algo salió mal</p>', duration: 1500, showBackdrop: false});
      });
    }else{
      $ionicLoading.show({template: '<p>Necesitas llenar todos los campos</p>', duration: 1500, showBackdrop: false});
    }
  }
})

.controller('HomeCtrl', function ($scope, BriefService, $rootScope, $ionicLoading, $state, $ionicHistory){
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
    $scope.data.searchQuery = '';
  }

  $scope.logout = function (){
    localStorage.removeItem('token');
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go('login');
  }

  $scope.deleteBrief = function (brief_id){
    console.log(brief_id)
    // var result = BriefService.deleteBrief(brief_id);
    // result.then(function (data){
    //   if(data.status == 200){
    //     $ionicLoading.hide();
    //     $state.go('login');
    //   }else{
    //     $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+data.message+'</p>', duration: 2000, showBackdrop: false});
    //   }
    // }, function (err){
    //   $ionicLoading.show({template: '<p>Algo salió mal</p>', duration: 1500, showBackdrop: false});
    // });
  }
})

.controller('ProfileCtrl', function ($scope, UserService, $rootScope, $ionicLoading, $state, $ionicHistory){
})

.controller('NewBriefCtrl', function ($scope, $ionicPopover, $rootScope, $sce, $ionicPopup, $compile, BriefService, $ionicLoading){
  inputN = 0;
  $scope.items = [];

  $scope.data = {
    showDelete: false
  };

  $ionicPopover.fromTemplateUrl('templates/popover.html',{
    scope: $scope,
  }).then(function (popover){
    $scope.popover = popover;
  });

  $scope.moveItem = function (item, fromIndex, toIndex){
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  $scope.onItemDelete = function (item){
    $scope.items.splice($scope.items.indexOf(item), 1);
    if($scope.items.length == 0){
      $scope.data = {
        showDelete: false
      };
    }
  };

  $scope.addInput = function (type){
    inputN = inputN + 1;
    switch (type){
      case 'nptTxt':
        $scope.items.push({ 
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="3"> <p contenteditable="true">Lorem ipsum</p> <input type="text" placeholder="An input text" disabled /> </div>')
        });
      break;
      
      case 'textarea':
        $scope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="4"> <p contenteditable="true">Lorem ipsum</p> <textarea placeholder="A textarea" disabled></textarea> </div>')         
        });
      break;
      
      case 'nptColor':
        $scope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="5"> <p contenteditable="true">Lorem ipsum</p> <input type="color" disabled /> </div>')         
        });
      break;
      
      case 'nptDate':
        $scope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="6"> <p contenteditable="true">Lorem ipsum</p> <input type="date" disabled /> </div>')         
        });
      break;
      
      case 'nptNumber':
        $scope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="7"> <p contenteditable="true">Lorem ipsum</p> <input type="tel" placeholder="An input number" disabled /> </div>')         
        });
      break;
      
      case 'nptFile':
        $scope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="8"> <p contenteditable="true">Lorem ipsum</p> <input type="file" disabled /> </div>')         
        });
      break;
      
      case 'nptRadio':
        $scope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="1"> <p contenteditable="true">Praesentium debitis</p> </div> <div class="options"> <input type="radio" disabled /> <p contenteditable="true">Lorem</p> <input type="radio" disabled /> <p contenteditable="true">Lorem</p> </div> <button class="button button-small ion-plus-round" ng-click="addMoreOpc(1, $index, $event)"></button>')
        });
      break;
      
      case 'nptCheckbox':
        $scope.items.push({
          input: $sce.trustAsHtml('<div id="inputN'+inputN+'" class="2"> <p contenteditable="true">Praesentium debitis</p> </div> <div class="options"> <input type="checkbox" disabled /> <p contenteditable="true">Lorem</p> <input type="checkbox" disabled /> <p contenteditable="true">Lorem</p> </div> <button class="button button-small ion-plus-round" ng-click="addMoreOpc(2, $index, $event)"></button>')
        });
      break;
    }
  }
  $scope.addMoreOpc = function (type, index, obj){
    var list = $scope.items[index].input.$$unwrapTrustedValue().split('<div class="options">');
    list[1] = '<div class="options">' + list[1];
    var sublist = list[1].split("</div> <button");
    sublist[1] = "</div> <button" + sublist[1];
    if(type == 2){
      sublist[0] = sublist[0] + " <input type='checkbox' disabled /> <p contenteditable='true'>Lorem</p> ";
    }else{
      sublist[0] = sublist[0] + " <input type='radio' disabled /> <p contenteditable='true'>Lorem</p> ";
    }
    list[1] = sublist.join("");
    $scope.items[index] = {
      input: $sce.trustAsHtml(list .join(""))
    };
  }

  $scope.save = function (){
    token = localStorage.getItem("token");
    data = { id: token, title: "", email: "", description: "", questions: [] };
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
            if($scope.items.length == 0){
              e.preventDefault();
              $ionicLoading.show({template: '<p>Tu brief esta vació</p>', duration: 1500, showBackdrop: false});
            }else{
              var elements = document.querySelectorAll("div.item-content");
              for(var i = 0; i < elements.length; i++){
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
              if($scope.data.titulo && $scope.data.description && $scope.data.correo){
                $ionicLoading.show({template:'<i class="icon ion-looping"></i><p>Creando brief</p>'});
                data.title = $scope.data.titulo;
                data.email = $scope.data.correo;
                data.description = $scope.data.description;
                var result = BriefService.create(data);
                result.then(function (res){
                  if(res.status == 200){
                    $ionicLoading.show({template: '<i class="icon ion-checkmark-round"></i><p>'+res.message+'</p>', showBackdrop: false, duration: 2500});
                  }else{
                    $ionicLoading.show({template: '<i class="icon ion-close-round"></i><p>'+res.message+'</p>', duration: 2000, showBackdrop: false});
                  }
                }, function (err){
                  $ionicLoading.show({template: '<p>Algo salió mal</p>', duration: 1500, showBackdrop: false});
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

.controller('BriefCtrl', function ($scope, $stateParams, BriefService, $ionicLoading, $ionicModal){
  var result = BriefService.findOne($stateParams.briefId);
  result.then(function (data){
    $scope.brief = data;
  }, function (err){
    $ionicLoading.show({template: '<p>Algo salió mal</p>', duration: 1500, showBackdrop: false});
  });

  $ionicModal.fromTemplateUrl('templates/sign-modal.html',{
    scope: $scope
  }).then(function (modal){
    $scope.modal = modal;
  });
  $scope.showModal = function (){
    $scope.modal.show();

    var wrapper = document.getElementById("signature-pad"),
      canvas = wrapper.querySelector("canvas"),
      signaturePad;

    // Adjust canvas coordinate space taking into account pixel ratio,
    // to make it look crisp on mobile devices.
    // This also causes canvas to be cleared.
    function resizeCanvas(){
      var ratio =  window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
    }

    window.onresize = resizeCanvas;
    resizeCanvas();

    signaturePad = new SignaturePad(canvas);

    $scope.clear = function (){
      signaturePad.clear();
    }
    $scope.save = function (){
      if(signaturePad.isEmpty()){
        $ionicLoading.show({template: '<p>Por favor, proporcione la firma primero.</p>', duration: 2000, showBackdrop: false});
      }else{
        // $ionicLoading.show({template:'<i class="icon ion-looping"></i>'});
        console.log(signaturePad.toDataURL());
      }
    }
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function(){
    $scope.modal.remove();
  });

});
