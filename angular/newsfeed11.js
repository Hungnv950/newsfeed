var newsFeedApp = angular.module('newsFeedApp', ['ngCookies']);

newsFeedApp.controller('newsfeed11Ctrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    //loading gif
    $scope.load = angular.element(document.querySelector('#load'));

    $scope.findCatsUrl = "findCategory.php";

    $scope.cats = [];

    if (!angular.isUndefined($cookieStore.get('cats'))) {
        $scope.cats = $cookieStore.get('cats');
    }

    if ($scope.cats.length != 0) {
        $scope.findCatsUrl += "?_id=" + JSON.stringify($scope.cats);
    }

    $scope.subs = [];
    $scope.temp = [];

    if (!angular.isUndefined($cookieStore.get('subs'))) {
        $scope.subs = $cookieStore.get('subs');

        angular.forEach($scope.subs, function (value, key) {
            $scope.temp.push(value['keyCat']['$oid'] + "_" + value['keySub']);
        });

    }

    $scope.show = [];

    getCats($scope.findCatsUrl);

    function getCats(url) {
        $http({
            method: 'GET',
            url: url
        }).success(function (data) {
            angular.forEach(data, function (value, key) {
                if ($scope.subs.length != 0) {
                    angular.forEach($scope.subs, function (value_, key_) {
                        if (value['_id']['$oid'] == value_['keyCat']['$oid']) {
                            $scope.show.push(data[key]['sub_category'][value_['keySub']]);
                        }
                    });
                }
            });

            $scope.load.css('display', 'none');

        }).error(function (data, status, headers, config) {
        });
    }

    $scope.onOff = function (key) {
        var on = document.getElementById("on_" + key).classList;

        if (on.value == 'box-turn') {
            on.add('off')
        }
        else {
            on.remove("off");
        }

    };

    $scope.goTo = function () {
        window.location.replace("sass_newfeed_12.html");
    };

}]);