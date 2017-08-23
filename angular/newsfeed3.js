var newsFeedApp = angular.module('newsFeedApp', ['ngCookies']);

newsFeedApp.controller('newsFeed3Ctrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    //loading gif
    $scope.load = angular.element(document.querySelector('#load'));

    $scope.findCatsUrl = "php/findCategory.php";

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
                            data[key]['sub_category'][value_['keySub']]['checked'] = 1;
                        }
                    });
                }
            });

            $scope.show = data;

            $scope.load.css('display', 'none');

        }).error(function (data, status, headers, config) {
        });
    }

    $scope.checkClick = function (keyCat, keySub, _id) {

        var myButtonClasses = document.getElementById("sub_" + keyCat + "_" + keySub).classList;

        var temp = _id[['$oid']] + "_" + keySub;

        if ($scope.temp.indexOf(temp) === -1) {
            $scope.temp.push(temp);
            $scope.subs.push({
                "keyCat": _id,
                "keySub": keySub
            });

            myButtonClasses.add("btn-active");
        }
        else {
            var index = $scope.temp.indexOf(temp);
            if (index > -1) {
                $scope.subs.splice(index, 1);
                $scope.temp.splice(index, 1);
            }

            myButtonClasses.remove("btn-active");
        }

    };

    $scope.newfeed_starten_btn = function () {
        if ($scope.subs.length !== 0) {
            $cookieStore.put('subs', $scope.subs);

        }
        else {
            $cookieStore.remove('subs');
        }

        window.location.replace("index_4.html");
    };

    $scope.back = function () {
        window.location.replace("index_2.html");
    };

}]);