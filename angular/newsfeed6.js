var watchesApp = angular.module('newsFeedApp', ['ngCookies']);

watchesApp.controller('newsfeed6Ctrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    $scope.article = null;

    $scope.findArtsUrl = "findArticle.php";

    function getArticle(url) {
        var seeArticle = $cookieStore.get('seeArticle');
        var subSelect = $cookieStore.get('subSelect');

        $http({
            method: 'GET',
            url: url + "?_id=[" + JSON.stringify(seeArticle['keyArt']) + "]&keyCat=[" + JSON.stringify(subSelect['keyCat']) + "]"
        }).success(function (data) {
            $scope.article = data;
            $scope.article['position'] = seeArticle['position'];
            $scope.article['articles'] = seeArticle['articles'];
            $scope.article['sub'] = seeArticle['sub'];

        }).error(function (data, status, headers, config) {
        });
    }

    getArticle($scope.findArtsUrl);

    $scope.back = function () {
        window.location.replace("sass_newfeed_5.html");
    };

    $scope.goToComment = function () {
        window.location.replace("sass_newfeed_13.html");
    };

    $scope.goToUrl = function (url) {
        window.location.replace(url);
    };

    $scope.getDomain = function (url) {

        var a = document.createElement('a');
        a.href = url;

        return a.hostname;
    };

    $scope.saveFavorites = function (_id) {
        var favorites = [];

        if (!angular.isUndefined($cookieStore.get('favorites'))) {
            favorites = $cookieStore.get('favorites');
        }

        favorites.push(_id);

        $cookieStore.put('favorites', favorites);
    }

}]);