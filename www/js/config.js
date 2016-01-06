/**
 * Created by JQLMT on 2015/12/30.
 * 提供各种接口的地址
 */
var configMod = angular.module("stater.config", []);

configMod.constant("ENV", {
  "getNotices": "http://test.hsjq.com/andoridServer/noticeHanlder.ajsx"
})
