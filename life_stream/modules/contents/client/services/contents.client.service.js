// Contents service used to communicate Contents REST endpoints
(function () {
  'use strict';

  angular
    .module('contents')
    .factory('ContentsService', ContentsService);

  ContentsService.$inject = ['$resource'];

  function ContentsService($resource) {
    return $resource('api/contents/:contentId', {
      contentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
