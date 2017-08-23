var newsFeedApp = angular.module('deniApp', ['ngCookies', 'ngColorThis']);

newsFeedApp.controller('newFeed4', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    //loading gif
    $scope.load = angular.element(document.querySelector('#load'));

    $scope.findCatsUrl = "findSubCategory.php";

    $scope.cats = [];
    $scope.subs = [];

    if (!angular.isUndefined($cookieStore.get('cats'))) {
        $scope.cats = $cookieStore.get('cats');
    }

    if (!angular.isUndefined($cookieStore.get('subs'))) {
        $scope.subs = $cookieStore.get('subs');
    }

    if ($scope.cats.length != 0) {
        $scope.findCatsUrl += "?_id=" + JSON.stringify($scope.cats);

        if ($scope.subs.length != 0) {
            $scope.findCatsUrl += "&positions=" + JSON.stringify($scope.subs);
        }
        else {
            $scope.findCatsUrl += "&positions=0";
        }

    }
    else {

        if ($scope.subs.length != 0) {
            $scope.findCatsUrl += "?positions=" + JSON.stringify($scope.subs);
        }
        else {
            $scope.findCatsUrl += "?positions=0";
        }
    }

    $scope.show = [];

    getCats($scope.findCatsUrl);

    function getCats(url) {
        $http({
            method: 'GET',
            url: url
        }).success(function (data) {

            $scope.show = data;

            Load();

        }).error(function (data, status, headers, config) {
        });
    }

    $scope.articles = function (keyCat, keySub) {
        $cookieStore.put('subSelect', {
            "keyCat": keyCat,
            "keySub": keySub
        });
        window.location.replace("sass_newfeed_5.html");
    };

    $scope.back = function () {
        window.location.replace("sass_newfeed_3.html");
    };

    function Load() {

        var countUp = function () {
            $scope.load.css('display', 'none');
            $timeout(countUp, 2000);
        };

        $timeout(countUp, 2000);
    }

}]);