(function () {
  'use strict';

  angular
    .module('contents')
    .controller('ContentsListController', ContentsListController);

  ContentsListController.$inject = ['ContentsService'];

  function ContentsListController(ContentsService) {
    var vm = this;

    vm.contents = ContentsService.query();
  }
}());
