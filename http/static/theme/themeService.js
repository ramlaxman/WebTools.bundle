﻿angular.module('webtools').service('themeService', ['$http', 'themeModel', 'webtoolsModel', 'webtoolsService', function ($http, themeModel, webtoolsModel, webtoolsService) {
    this.getThemes = function (callback) {
        webtoolsModel.themeLoading = true;
        $http.get(webtoolsModel.apiUrl, {
            params: {
                "module": "wt",
                "function": "getCSS"
            }
        }).then(function (resp) {
            if(resp.data) themeModel.themes = resp.data;
            if (callback) callback(resp.data);
            webtoolsModel.themeLoading = false;
        }, function (errorResp) {
            webtoolsService.log("themeService.getThemes - " + (errorResp.data ? errorResp.data : (errorResp ? errorResp : "NO ERROR MSG!")), "Theme", true);
            webtoolsModel.themeLoading = false;
        });
    }

    this.loadActiveTheme = function (callback) {
        webtoolsModel.themeLoading = true;
        $http({
            method: "GET",
            url: webtoolsModel.apiUrl + "?module=settings&function=getSetting&name=wt_csstheme",
        }).then(function (resp) {
            themeModel.activeTheme = resp.data;
            if (callback) callback(resp.data);
            webtoolsModel.themeLoading = false;
        }, function (errorResp) {
            webtoolsService.log("themeService.loadActiveTheme - " + (errorResp.data ? errorResp.data : (errorResp ? errorResp : "NO ERROR MSG!")), "Theme", true);
            webtoolsModel.themeLoading = false;
        });
    }

    this.saveTheme = function (theme, callback) {
        $http({
            method: "PUT",
            url: webtoolsModel.apiUrl + "?module=settings&function=putSetting&name=wt_csstheme&value=" + theme,
        }).then(function (resp) {
            if (callback) callback(resp.data);
        }, function (errorResp) {
            webtoolsService.log("themeService.saveTheme - " + (errorResp.data ? errorResp.data : (errorResp ? errorResp : "NO ERROR MSG!")), "Theme", true);
        });
    }
}]);