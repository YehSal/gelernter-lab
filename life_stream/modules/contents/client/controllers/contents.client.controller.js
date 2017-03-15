(function () {
  'use strict';

  // Contents controller
  angular
    .module('contents')
    .controller('ContentsController', ContentsController);

  ContentsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'contentResolve'];

  function ContentsController ($scope, $state, $window, Authentication, content) {
    var vm = this;

    vm.authentication = Authentication;
    vm.content = content;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Content
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.content.$remove($state.go('contents.list'));
      }
    }

    // Save Content
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.contentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.content._id) {
        vm.content.$update(successCallback, errorCallback);
      } else {
        vm.content.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('contents.view', {
          contentId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
