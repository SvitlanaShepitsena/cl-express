(function () {
    'use strict';

    angular.module('common')
        .value('s3', {files: []})
        .value('galleryModal', {shown: false})
        .directive('svOnePhotoAlbum', function (AWSServ, galleryModal, $mdDialog, dt, $timeout, $location) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-one-photo-album.html',
                scope: {
                    activeImg: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.bucketUrl = "https://s3-us-west-2.amazonaws.com/chicagoview/";

                    AWSServ.getImages('chicagoview').then(function (files) {
                        $scope.images = files;

                        if (_.isUndefined($scope.activeImg)) {

                            $scope.showGalleryModal($scope.activeImg);

                        }

                    });

                    $scope.showGalleryModal = function (index) {
                        if (galleryModal.state) {
                            return;
                        }
                        var newPath = urlParser($location.path(), index);
                        $location.path(newPath);

                        var imgCollection = {
                            images: $scope.images,
                            currentIndex: index
                        }
                        galleryModal.state = true;
                        showModal(imgCollection);
                    };

                    function showModal(collection) {
                        dt.vm = collection;
                        $mdDialog.show({
                            controller: DialogControllerInfo,
                            templateUrl: 'scripts/common/views/photo-gallery-modal.html',
                        });
                    }

                    function DialogControllerInfo($scope, $mdDialog, dt, s3, $location, galleryModal) {
                        var delay = 700;

                        $scope.awsBase = 'https://s3-us-west-2.amazonaws.com/chicagoview/';
                        $scope.imgIndex = dt.vm.currentIndex;

                        $scope.files = dt.vm.images;

                        var maxImg = $scope.files.length - 1;
                        $scope.currentImage = $scope.awsBase + $scope.files[$scope.imgIndex];
                        //$scope.event = dt.vm;

                        $scope.nextSvImage = function () {
                            var i = $scope.imgIndex;
                            i++;
                            if (i > maxImg) {
                                i = 0;
                            }
                            $scope.imgIndex = i;
                            var newPath = urlParser($location.path(), i);
                            $location.path(newPath);

                            $timeout(function () {
                                $scope.currentImage = $scope.awsBase + $scope.files[$scope.imgIndex];
                            }, delay);
                        };
                        $scope.prevSvImage = function () {
                            var i = $scope.imgIndex;
                            i--;
                            if (i < 0) {
                                i = maxImg;
                            }
                            $scope.imgIndex = i;
                            var newPath = urlParser($location.path(), i);
                            $location.path(newPath);
                            $timeout(function () {
                                $scope.currentImage = $scope.awsBase + $scope.files[$scope.imgIndex];
                            }, delay);
                        };

                        $scope.hide = function () {
                            $mdDialog.hide();
                            galleryModal.state = false;
                            $location.path(urlParser($location.path()));
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                        //$scope.answer = function (answer) {
                        //    $mdDialog.hide(answer);
                        //};
                    }

                    function urlParser(path, currentIndex) {
                        currentIndex = currentIndex || '';
                        var start = path.lastIndexOf('/') + 1;
                        path = path.substr(0, start) + currentIndex;
                        return path;

                    }
                }

            };
        });
})();
