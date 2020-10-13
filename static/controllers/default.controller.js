var app = angular.module('app', ['duScroll', 'ngSanitize', 'ismobile', 'ngCookies'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.config(function ($locationProvider) {

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false,
        rewriteLinks: false
    });
    // $locationProvider.html5Mode(true);
});



app.controller('AboutPolandMapsController', function ($scope, $http, $location, $q) {

    $scope.initData = function (data) {
        // console.log(mapPolandData)
        $scope.data = mapPolandData;
        $scope.classes = [];
        $scope.invest = {}
        $scope.createClassMap()
        // console.log($scope.classes)
        $scope.showInfo = 'hidden-info'
        $scope.hiddenIcons = ''
        // console.log(document.querySelectorAll('.point-invest'))


    }

    $scope.createClassMap = function () {
        $scope.data.forEach(function (d, i) {

            if (d.type == 'single') {
                $scope.classes[i] = {
                    visibleCloud: 'hidden-cloud',
                    sizeCloud: 'small-cloud',
                    zIndexMore: 'normal'
                }
            } else {
                var dCls = []
                d.childs.forEach(function (dd, ii) {
                    dCls[ii] = {
                        visibleCloud: 'hidden-cloud',
                        sizeCloud: 'small-cloud',
                        zIndexMore: 'normal'
                    }
                })
                $scope.classes[i] = {
                    clouds: dCls
                }

            }


        })
    }

    $scope.showCloud = function (key) {

        if ($scope.classes[key].visibleCloud == 'hidden-cloud') {
            $scope.createClassMap()
            $scope.classes[key].visibleCloud = ''
        } else {
            $scope.classes[key].visibleCloud = 'hidden-cloud'
        }
    }

    $scope.showClouds = function (string, parentKey) {

        if ($scope.checkIsCloudsOpen($scope.classes[parentKey].clouds)) {
            $scope.classes[parentKey].clouds.forEach(function (c, i) {
                $scope.classes[parentKey].clouds[i].visibleCloud = 'hidden-cloud'
            })
        } else {
            $scope.createClassMap()
            var toOpen = string.split(',')
            toOpen.forEach(function (v) {
                $scope.classes[parentKey].clouds[v].visibleCloud = ''
            })
        }


    }

    $scope.checkIsCloudsOpen = function (clouds) {
        var bool = false;
        clouds.forEach(function (ob) {
            if (ob.visibleCloud == '') {
                bool = true;
            }
        })
        return bool;
    }

    $scope.showFullCloud = function (key) {
        $scope.classes[key].sizeCloud = ''
        $scope.classes[key].zIndexMore = 'overshow'
        $scope.showCloudInfoHtml($scope.data[key].child.investId)
    }

    $scope.hideFullCloud = function (key) {
        $scope.classes[key].sizeCloud = 'small-cloud'
        $scope.classes[key].zIndexMore = ''
        $scope.showInfo = 'hidden-info'
        $scope.hiddenIcons = ''
        $scope.invest = {}
    }

    $scope.showFullClouds = function (key, parentKey) {
        $scope.classes[parentKey].clouds[key].sizeCloud = ''
        $scope.classes[parentKey].clouds[key].zIndexMore = 'overshow'
        // console.log($scope.data[parentKey].childs[key].investId)
        $scope.showCloudInfoHtml($scope.data[parentKey].childs[key].investId)
    }

    $scope.hideFullClouds = function (key, parentKey) {
        $scope.classes[parentKey].clouds[key].sizeCloud = 'small-cloud'
        $scope.classes[parentKey].clouds[key].zIndexMore = ''
        $scope.showInfo = 'hidden-info'
        $scope.hiddenIcons = ''
        $scope.invest = {}
    }

    $scope.hideAll = function () {
        $scope.createClassMap()
    }

    $scope.getInvestDataHttp = function (id) {
        var defer = $q.defer();
        var host = $location.protocol() + '://' + $location.host()
        $http.get(host + '/web/get/invest/' + id)
            .then(function (r) {
                defer.resolve(r.data)
            }).catch(function () {
                defer.reject(0)
            })

        return defer.promise
    }

    $scope.showCloudInfoHtml = function (id) {


        $scope.getInvestDataHttp(id).then(function (r) {
            $scope.showInfo = ''
            $scope.hiddenIcons = 'hidden-icons'
            $scope.invest = r
        })
    }



})


// app.controller('AboutWarsawMapsController', function ($scope) {

//     $scope.initData = function (data) {
//         $scope.data = JSON.parse(mapWarsawData);
//         $scope.classes = [];
//         $scope.createClassMap()
//         // console.log($scope.classes)
//     }

//     $scope.createClassMap = function () {
//         $scope.data.forEach(function (d, i) {

//             if (d.type == 'single') {
//                 $scope.classes[d.key] = {
//                     visibleCloud: 'hidden-cloud',
//                     sizeCloud: 'small-cloud',
//                     zIndexMore: 'normal'
//                 }
//             } else {
//                 var dCls = []
//                 d.childs.forEach(function (dd, ii) {
//                     dCls[ii] = {
//                         visibleCloud: 'hidden-cloud',
//                         sizeCloud: 'small-cloud',
//                         zIndexMore: 'normal'
//                     }
//                 })
//                 $scope.classes[i] = {
//                     clouds: dCls
//                 }

//             }


//         })
//     }

//     $scope.showCloud = function (key) {
//         if ($scope.classes[key].visibleCloud == 'hidden-cloud') {
//             $scope.createClassMap()
//             $scope.classes[key].visibleCloud = ''
//         } else {
//             $scope.classes[key].visibleCloud = 'hidden-cloud'
//         }
//     }

//     $scope.showClouds = function (string, parentKey) {

//         if ($scope.checkIsCloudsOpen($scope.classes[parentKey].clouds)) {
//             $scope.classes[parentKey].clouds.forEach(function (c, i) {
//                 $scope.classes[parentKey].clouds[i].visibleCloud = 'hidden-cloud'
//             })
//         } else {
//             $scope.createClassMap()
//             var toOpen = string.split(',')
//             toOpen.forEach(function (v) {
//                 $scope.classes[parentKey].clouds[v].visibleCloud = ''
//             })
//         }


//     }

//     $scope.checkIsCloudsOpen = function (clouds) {
//         var bool = false;
//         clouds.forEach(function (ob) {
//             if (ob.visibleCloud == '') {
//                 bool = true;
//             }
//         })
//         return bool;
//     }

//     $scope.showFullCloud = function (key) {
//         $scope.classes[key].sizeCloud = ''
//         $scope.classes[key].zIndexMore = 'overshow'
//     }

//     $scope.hideFullCloud = function (key) {
//         $scope.classes[key].sizeCloud = 'small-cloud'
//         $scope.classes[key].zIndexMore = ''
//     }

//     $scope.showFullClouds = function (key, parentKey) {
//         $scope.classes[parentKey].clouds[key].sizeCloud = ''
//         $scope.classes[parentKey].clouds[key].zIndexMore = 'overshow'
//     }

//     $scope.hideFullClouds = function (key, parentKey) {
//         $scope.classes[parentKey].clouds[key].sizeCloud = 'small-cloud'
//         $scope.classes[parentKey].clouds[key].zIndexMore = ''
//     }


//     $scope.hideAll = function () {
//         $scope.createClassMap()
//     }

// })


app.controller('RotorController', ['$scope', '$rootScope', '$interval', '$document', '$element', '$attrs', '$http', '$location', '$window', '$filter', '$log', 'isMobile', function ($scope, $rootScope, $interval, $document, $element, $attrs, $http, $location, $window, $filter, $log, isMobile) {


    // console.log(isMobile.phone)


    $scope.initRotor = function () {


        angular.element(document.getElementsByClassName('slide-0')).addClass('active');

        $scope.lastkey = $scope.rotorData.how_many - 1;

        $interval(function () {

            $scope.stop--;

            if ($scope.stop > 0)
                return;


            angular.element(document.getElementsByClassName('slide')).removeClass('active');
            angular.element(document.getElementsByClassName('slide-' + $scope.rotorData.next)).addClass('active');


            if ($scope.lastkey == $scope.rotorData.next) {
                $scope.rotorData.now++;
                $scope.rotorData.next = 0;
            } else if ($scope.lastkey == $scope.rotorData.now) {
                $scope.rotorData.now = 0;
                $scope.rotorData.next++;
            } else {
                $scope.rotorData.now++;
                $scope.rotorData.next++;
            }


        }, 5000);

    }


    // $scope.changeSlideByButton = function (k) {

    //     $scope.stop = 4;


    //     angular.element(document.getElementsByClassName('slide')).removeClass('active');
    //     angular.element(document.getElementsByClassName('slide-' + k)).addClass('active');

    //     // $timeout(function () {
    //     angular.element(document.getElementsByClassName('text-view')).removeClass('active');
    //     angular.element(document.getElementsByClassName('text-view-' + k)).addClass('active');
    //     // },700)
    //     angular.element(document.getElementsByClassName('btn-nav-s')).removeClass('active');
    //     angular.element(document.getElementsByClassName('btn-nav-s-' + k)).addClass('active');


    //     if ($scope.lastkey == k) {
    //         $scope.now = k;
    //         $scope.next = 0;
    //     } else {
    //         $scope.now = k;
    //         $scope.next++;
    //     }


    // }


}]);


app.controller('CookieController', function ($scope, $cookies) {

    // console.log($cookies.get('rConfirm'));

    $scope.hideCookieCloud = function () {
        var date = new Date();
        var nDate = new Date(date.getTime() + 24 * 60 * 60000 * 14);
        // var nDate = new Date(date.getTime() + 3*60000);
        document.getElementById("cookie-beam").style.display = 'none';
        $cookies.put('rConfirm', 'accept', { expires: nDate });
    }

});