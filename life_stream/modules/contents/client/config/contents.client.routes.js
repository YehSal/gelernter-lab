(function () {
  'use strict';

  angular
    .module('contents')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('contents', {
        abstract: true,
        url: '/contents',
        template: '<ui-view/>'
      })
      .state('contents.list', {
        url: '',
        templateUrl: 'modules/contents/client/views/list-contents.client.view.html',
        controller: 'ContentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Contents List'
        }
      })
      .state('contents.create', {
        url: '/create',
        templateUrl: 'modules/contents/client/views/form-content.client.view.html',
        controller: 'ContentsController',
        controllerAs: 'vm',
        resolve: {
          contentResolve: newContent
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Contents Create'
        }
      })
      .state('contents.edit', {
        url: '/:contentId/edit',
        templateUrl: 'modules/contents/client/views/form-content.client.view.html',
        controller: 'ContentsController',
        controllerAs: 'vm',
        resolve: {
          contentResolve: getContent
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Content {{ contentResolve.name }}'
        }
      })
      .state('contents.view', {
        url: '/:contentId',
        templateUrl: 'modules/contents/client/views/view-content.client.view.html',
        controller: 'ContentsController',
        controllerAs: 'vm',
        resolve: {
          contentResolve: getContent
        },
        data: {
          pageTitle: 'Content {{ contentResolve.name }}'
        }
      });
  }

  getContent.$inject = ['$stateParams', 'ContentsService'];

  function getContent($stateParams, ContentsService) {
    return ContentsService.get({
      contentId: $stateParams.contentId
    }).$promise;
  }

  newContent.$inject = ['ContentsService'];

  function newContent(ContentsService) {
    return new ContentsService();
  }
}());
