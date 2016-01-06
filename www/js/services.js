/**
 * Created by JQLMT on 2015/11/24.
 * 后台获取数据的方法
 */
angular.module('starter.services', [])
  /**
   * 关于LocalStorage的设置
   */
  .factory("Storage", function () {
    return {
      set: function (key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data));
      },
      get: function (key) {
        return window.JSON.parse(window.localStorage.getItem(key));
      },
      remove: function (key) {
        return window.localStorage.removeItem(key);
      }
    }
  })
  /**
   * 关于当前登录的用户的相关操作用户的相关操作
   * login:用户登录的方法 http://test.hsjq.com/AndroidServer/Login/LoginHandler.ashx?username=liumt&password=lmt456123
   */
  .factory("MOAUser", function ($http) {
    return {
      login: function (usercode, userpassword) {
        var url = "http://test.hsjq.com/AndroidServer/Login/LoginHandler.ashx?username=" + usercode + "&password=" + userpassword;
        return $http.get(url).then(function (response) {
          var errorcod = response.data.errorCode;
          if (errorcod == "0006") {
            return response.data.messageContent[0];
          } else {
            return null;
          }
        }, function (response) {
          return null;
        })
      }
    }
  })
  /**
   * 更具人员的CID获取人员所能够阅读的通知公告的列表
   */
  .factory('Notices', function ($http) {
    var notices = [];
    return {
      all: function (usercode, search, pagenum) {
        var url = "http://test.hsjq.com/AndroidServer/Notice/NoitceHandler.ashx?ajaxMethod=getnotices&usercode=" + usercode + "&pagenum=" + pagenum + "&search=" + encodeURI(encodeURI(search));
        return $http.get(url).then(function (response) {
          var noticesTemp = response.data.messageContent;
          if (pagenum == '1')
            notices = noticesTemp;
          else {
            if (noticesTemp != null) {
              notices = notices.concat(noticesTemp);
            }
          }
          return noticesTemp;
        });
      },
      get: function (noticesCid) {
        for (var i = 0; i < notices.length; i++) {
          if (notices[i].item0 == noticesCid) {
            return notices[i];
          }
        }
        return null;
      }
    }
  })
  /**
   * 根据通知公告的CID获取通知公告的详情
   */
  .factory("NoticeDetial", function ($http) {
    var noticeDetial = '';
    return {
      get: function (noticeCid) {
        return $http.get("http://test.hsjq.com/AndroidServer/Notice/NoitceHandler.ashx?ajaxMethod=getnoticedetial&cid=" + noticeCid).then(
          function (response) {
            noticeDetial = response.data.messageContent;
            return noticeDetial;
          }
        );
      }
    }
  })
  /**
   * 根据部门的CID获取部门下的所有的子部门
   */
  .factory("DepartmentList", function ($http) {
    var list = [];
    return {
      get: function (dptCid, type) {
        var url = "http://test.hsjq.com/AndroidServer/AddressBook/AddressBookHandler.ashx?ajaxMethod=getDepartment&type=" + type + "&cid=" + dptCid;
        return $http.get(url).then(
          function (response) {
            list = response.data.messageContent;
            return list;
          });
      }
    }
  })
  /**
   * 根据部门的CID获取部门下的所有的人员
   */
  .factory("UserList", function ($http) {
    var list = [];
    return {
      get: function (dptCid) {
        var url = "http://test.hsjq.com/AndroidServer/AddressBook/AddressBookHandler.ashx?ajaxMethod=getUsers&cid=" + dptCid;
        return $http.get(url).then(
          function (response) {
            list = response.data.messageContent;
            return list;
          });
      }
    }
  })
  /**
   * 根据用户的CID获取用户的详细信息
   */
  .factory("UserInfo", function ($http) {
    var list = [];
    return {
      get: function (usercid) {
        var url = "http://test.hsjq.com/AndroidServer/AddressBook/AddressBookHandler.ashx?ajaxMethod=getUserInfo&type=person&cid=" + usercid;
        return $http.get(url).then(
          function (response) {
            list = response.data.messageContent;
            return list;
          }
        )
      }
    }
  })
  .factory('Processes', function ($http) {
    var list = [];
    return {
      get: function (usercode) {
        var url = "http://test.hsjq.com/AndroidServer/ProcessCenter/ProcessStartHandler.ashx?usercode=" + usercode + "&ajaxMehtod=getprocesslist";
        return $http.get(url).then(
          function (response) {
            list = response.data.messageContent;
            return list;
          }
        )
      }
    }
  })
  /**
   * 正在加载Loading
   * show 显示
   * hide 隐藏
   */
  .factory('MyLoading', function ($ionicLoading) {
    return {
      show: function (message) {
        $ionicLoading.show({
          template: '<p>' + message + '</p><ion-spinner></ion-spinner>'
        });
      },
      hide: function () {
        $ionicLoading.hide();
      }
    }
  })
  /**
   * 外出登记
   */
  .factory('OutWorking', function ($http) {
    return {
      checkUserStatus: function (usercode) {
        var url = "http://test.hsjq.com/AndroidServer/OutRegister/OutWorkingHandler.ashx?ajaxMethod=checkuserstatus&usercode=" + usercode;
        return $http.get(url).then(
          function (response) {
            return response.data.messageContent[0].item0;
          }, function (err) {
            return null;
          }
        )
      },
      getUserOutInfo: function (usercode) {
        var url = "http://test.hsjq.com/AndroidServer/OutRegister/OutWorkingHandler.ashx?ajaxMethod=getuseroutinfo&usercode=" + usercode;
        return $http.get(url).then(
          function (response) {
            return response.data.messageContent[0];
          }, function (response) {
            return null;
          }
        )
      },
      outRegister: function (user, outDate, outer) {
        //外出登记
        var url = 'http://test.hsjq.com/AndroidServer/OutRegister/OutWorkingHandler.ashx?ajaxMethod=outregister&usercode=' + user.USER_CODE + '&outdate=' + outDate + '&outreason=' + outer.reason + '&outaddress=' + outer.address;
        return $http.get().then(
          function (response) {
            console.log("外出登记:", response.data.messageContent[0]);
            return response.data.message[0];
          }, function (response) {
            return false;
          }
        )
      },
      backRegister: function (usercode, backdatetime) {
        var url = "http://test.hsjq.com/AndroidServer/OutRegister/OutWorkingHandler.ashx?ajaxMethod=backregister&usercode=" + usercode + "&backdate=" + backdatetime;
        return $http.get().then(
          function (response) {
            console.log("返回登记:", response.data.messageContent[0]);
            return response.data.message[0];
          }, function (response) {
            return false;
          })
      }
    }
  })
;

