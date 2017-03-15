(function () {
  'use strict';

  angular
    .module('contents')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Contents',
      state: 'contents',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'contents', {
      title: 'List Contents',
      state: 'contents.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'contents', {
      title: 'Create Content',
      state: 'contents.create',
      roles: ['user']
    });
  }
}());
