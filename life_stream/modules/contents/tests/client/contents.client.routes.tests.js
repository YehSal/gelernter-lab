(function () {
  'use strict';

  describe('Contents Route Tests', function () {
    // Initialize global variables
    var $scope,
      ContentsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ContentsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ContentsService = _ContentsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('contents');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/contents');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ContentsController,
          mockContent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('contents.view');
          $templateCache.put('modules/contents/client/views/view-content.client.view.html', '');

          // create mock Content
          mockContent = new ContentsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Content Name'
          });

          // Initialize Controller
          ContentsController = $controller('ContentsController as vm', {
            $scope: $scope,
            contentResolve: mockContent
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:contentId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.contentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            contentId: 1
          })).toEqual('/contents/1');
        }));

        it('should attach an Content to the controller scope', function () {
          expect($scope.vm.content._id).toBe(mockContent._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/contents/client/views/view-content.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ContentsController,
          mockContent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('contents.create');
          $templateCache.put('modules/contents/client/views/form-content.client.view.html', '');

          // create mock Content
          mockContent = new ContentsService();

          // Initialize Controller
          ContentsController = $controller('ContentsController as vm', {
            $scope: $scope,
            contentResolve: mockContent
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.contentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/contents/create');
        }));

        it('should attach an Content to the controller scope', function () {
          expect($scope.vm.content._id).toBe(mockContent._id);
          expect($scope.vm.content._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/contents/client/views/form-content.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ContentsController,
          mockContent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('contents.edit');
          $templateCache.put('modules/contents/client/views/form-content.client.view.html', '');

          // create mock Content
          mockContent = new ContentsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Content Name'
          });

          // Initialize Controller
          ContentsController = $controller('ContentsController as vm', {
            $scope: $scope,
            contentResolve: mockContent
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:contentId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.contentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            contentId: 1
          })).toEqual('/contents/1/edit');
        }));

        it('should attach an Content to the controller scope', function () {
          expect($scope.vm.content._id).toBe(mockContent._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/contents/client/views/form-content.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
