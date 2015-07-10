(function () {
    'use strict';
    angular.module('auth.user')
        .directive('svUserDropdownMenu', function (avatar, editor, userAuth) {
            return {
                templateUrl: 'scripts/auth/user/directives/sv-user-dropdown-menu.html',
                link: function ($scope, el, attrs) {
                    $scope.user = userAuth.profile;
                    $scope.defaultAvatar = avatar;
                    $scope.editorAvatar = editor;
                }
            };
        });
})();
