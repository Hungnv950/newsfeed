var newsFeedApp = angular.module('newsFeedApp', ['ngCookies']);

newsFeedApp.controller('newsfeed13Ctrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    //loading gif
    $scope.load = angular.element(document.querySelector('#load'));

    $scope.article = null;

    $scope.findArtsUrl = "findArticle.php";

    function getArticle(url) {
        var seeArticle = $cookieStore.get('seeArticle');

        $http({
            method: 'GET',
            url: url + "?_id=[" + JSON.stringify(seeArticle['keyArt']) + "]"
        }).success(function (data) {
            $scope.article = data;
            Load();
        }).error(function (data, status, headers, config) {
        });
    }

    getArticle($scope.findArtsUrl);

    $scope.saveToNewFeed6 = function (keyArt) {
        $cookieStore.put('keyArt', keyArt);
        window.location.replace("newfeed_6.html");
    };

    $scope.back = function () {
        window.location.replace("sass_newfeed_5.html");
    };

    $scope.goToComment = function () {
        window.location.replace("sass_newfeed_13.html");
    };

    $scope.convertDate = function (number) {
        var date = new Date(1503325546077);

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        return day + "." + month + "." + year + " " + hours + ":" + minutes;
    };

    $scope.back = function () {
        window.location.replace("sass_newfeed_6.html");
    };

    $scope.reply = false;

    $scope.seeAntworten = function (key) {
        $scope.antworten = angular.element(document.querySelector('#antworten_' + key));
        if ($scope.reply == true) {
            $scope.antworten.css('display', 'none');
            $scope.reply = false;
        }
        else {
            $scope.antworten.css('display', 'block');
            $scope.reply = true;
        }

    };

    function Load() {

        var countUp = function () {
            $scope.load.css('display', 'none');
            $timeout(countUp, 1000);
        };

        $timeout(countUp, 1000);
    }

}]);