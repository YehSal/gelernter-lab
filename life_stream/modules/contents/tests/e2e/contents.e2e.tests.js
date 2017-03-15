'use strict';

describe('Contents E2E Tests:', function () {
  describe('Test Contents page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/contents');
      expect(element.all(by.repeater('content in contents')).count()).toEqual(0);
    });
  });
});
