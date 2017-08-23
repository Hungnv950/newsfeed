var newsFeedApp = angular.module('newsFeedApp', ['ngCookies']);

newsFeedApp.controller('newsFeed2Ctrl', ['$scope', '$http', '$filter', '$timeout', '$cookieStore', function ($scope, $http, $filter, $timeout, $cookieStore) {

    //loading gif
    $scope.load = angular.element(document.querySelector('#load'));

    $scope.newsfeed = null;

    $scope.catsUrl = "php/getCategory.php";

    $scope.cats = [];
    $scope.temp = [];

    if (!angular.isUndefined($cookieStore.get('cats'))) {
        $scope.cats = $cookieStore.get('cats');

        angular.forEach($scope.cats, function (value, key) {
            $scope.temp.push(value['$oid']);
        });

    }

    function getCats(url) {
        $http({
            method: 'GET',
            url: url
        }).success(function (newsfeed) {

            angular.forEach(newsfeed, function (value, key) {
                newsfeed[key]['checked'] = 0;
                if ($scope.cats.length != 0) {
                    angular.forEach($scope.cats, function (value_, key_) {

                        if (value['_id']['$oid'] == value_['$oid']) {
                            newsfeed[key]['checked'] = 1;
                        }
                    });
                }

            });

            $scope.newsfeed = newsfeed;

            $scope.load.css('display', 'none');

        }).error(function (newsfeed, status, headers, config) {
        });
    }

    getCats($scope.catsUrl);

    $scope.checkClick = function (key, _id) {
        var myButtonClasses = document.getElementById("cat_id_" + key).classList;

        if ($scope.temp.indexOf(_id['$oid']) === -1) {
            $scope.cats.push(_id);
            $scope.temp.push(_id['$oid']);
            myButtonClasses.add("btn-active");
        }
        else {
            var index = $scope.temp.indexOf(_id['$oid']);
            if (index > -1) {
                $scope.cats.splice(index, 1);
                $scope.temp.splice(index, 1);
            }
            myButtonClasses.remove("btn-active");
        }

    };

    $scope.checkNext = function () {

        if ($scope.cats.length != 0) {
            $cookieStore.put('cats', $scope.cats);
        }
        else {
            $cookieStore.remove('cats');
        }

        window.location.replace("index_3.html");
    };

    $scope.back = function () {
        window.location.replace("index_1.html");
    };

}]);