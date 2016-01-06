// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform, $ionicPopup, $ionicHistory, $location, Storage, $state) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    //返回键处理
    //主页面显示退出提示框
    $ionicPlatform.registerBackButtonAction(function (e) {
      e.preventDefault();
      function showConfirm() {
        var confirmPopup = $ionicPopup.confirm({
          title: '<strong>退出应用?</strong>',
          template: '<h3>你确定要退出应用吗?</h3>',
          okText: '退出',
          cancelText: '取消'
        });
        confirmPopup.then(function (res) {
          if (res) {
            ionic.Platform.exitApp();
          } else {

          }
        });
      }

      console.log('返回按钮：', $location.path());
      if ($location.path() == '/login' || $location.path() == '/tab/home_page' || $location.path() == '/tab/process_center' || $location.path() == '/tab/setting') {
        showConfirm();
        /* if ($rootScope.backButtonPressedOnceToExit) {
         ionic.Platform.exitApp();
         } else {
         $rootScope.backButtonPressedOnceToExit = true;
         $cordovaToast.showShortBottom('再按一次退出系统');
         setTimeout(function () {
         $rootScope.backButtonPressedOnceToExit = false;
         }, 2000);
         }*/
      } else if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      } else {
        showConfirm();
      }
      return false;
    }, 101);
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: 'templates/login.html',
        controller: 'Login'
      })
      .state('forgotpassword', {
        url: '/forgot-password',
        templateUrl: 'templates/forgot-password.html'
      })
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('tab.home_page', {
        url: '/home_page',
        views: {
          'home-tab': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomePage'
          }
        }
      })
      .state('tab.process_center', {
        url: '/process_center',
        views: {
          'process-center-tab': {
            templateUrl: 'templates/tab-process-center.html',
            controller: 'ProcessCenter'
          }
        }
      })
      .state('tab.setting', {
        url: '/setting',
        views: {
          'setting-tab': {
            templateUrl: 'templates/tab-setting.html',
            controller: 'Setting'
          }
        }
      })
      .state('tab.notices_list', {
        url: '/notices_list',
        views: {
          'home-tab': {
            templateUrl: 'templates/notice-list.html',
            controller: 'NoticesList'
          }
        }
      })
      .state('tab.notice_detial', {
        url: '/notices_list/:noticesCid',
        views: {
          'home-tab': {
            templateUrl: 'templates/notice-detial.html',
            controller: 'NoticeDetials'
          }
        }
      })
      .state('tab.addressbook', {
        url: '/addressbook/:departmentid',
        views: {
          'home-tab': {
            templateUrl: 'templates/address-book.html',
            controller: 'AddressBook'
          }
        }
      })
      .state('tab.profilepage', {
        url: '/profilepage/:usercid',
        views: {
          'home-tab': {
            templateUrl: 'templates/profile-page.html',
            controller: 'ProfilePage'
          }
        }
      })
      .state('tab.outworkingregister', {
        url: '/outworkingregister',
        views: {
          'home-tab': {
            templateUrl: 'templates/outworkingregister.html',
            controller: 'OutWorkingRegister'
          }
        }
      })
      .state('tab.processstart', {
        url: '/processstart',
        views: {
          'process-center-tab': {
            templateUrl: 'templates/process-start.html',
            controller: 'ProcessStart'
          }
        }
      })
      .state('tab.processtodo', {
        url: '/processtodo',
        views: {
          'process-center-tab': {
            templateUrl: 'templates/process-todo.html',
            controller: 'ProcessToDo'
          }
        }
      })
      .state('tab.backregister', {
        url: '/backregister',
        views: {
          'home-tab': {
            templateUrl: 'templates/back-register.html',
            controller: 'BackRegister'
          }
        }
      })
    ;
    /*$urlRouterProvider.otherwise('/tab/home_page');*/
    /* $urlRouterProvider.otherwise('/login');*/
    $urlRouterProvider.otherwise(function () {
      var userformstorage = window.JSON.parse(window.localStorage.getItem("userinfo"));
      if (userformstorage != null) {
        //$state.go('tab.home_page');
        return '/tab/home_page';
      } else {
        return '/login';
      }
    })
  });
