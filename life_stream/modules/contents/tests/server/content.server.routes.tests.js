'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Content = mongoose.model('Content'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  content;

/**
 * Content routes tests
 */
describe('Content CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Content
    user.save(function () {
      content = {
        name: 'Content name'
      };

      done();
    });
  });

  it('should be able to save a Content if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Content
        agent.post('/api/contents')
          .send(content)
          .expect(200)
          .end(function (contentSaveErr, contentSaveRes) {
            // Handle Content save error
            if (contentSaveErr) {
              return done(contentSaveErr);
            }

            // Get a list of Contents
            agent.get('/api/contents')
              .end(function (contentsGetErr, contentsGetRes) {
                // Handle Contents save error
                if (contentsGetErr) {
                  return done(contentsGetErr);
                }

                // Get Contents list
                var contents = contentsGetRes.body;

                // Set assertions
                (contents[0].user._id).should.equal(userId);
                (contents[0].name).should.match('Content name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Content if not logged in', function (done) {
    agent.post('/api/contents')
      .send(content)
      .expect(403)
      .end(function (contentSaveErr, contentSaveRes) {
        // Call the assertion callback
        done(contentSaveErr);
      });
  });

  it('should not be able to save an Content if no name is provided', function (done) {
    // Invalidate name field
    content.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Content
        agent.post('/api/contents')
          .send(content)
          .expect(400)
          .end(function (contentSaveErr, contentSaveRes) {
            // Set message assertion
            (contentSaveRes.body.message).should.match('Please fill Content name');

            // Handle Content save error
            done(contentSaveErr);
          });
      });
  });

  it('should be able to update an Content if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Content
        agent.post('/api/contents')
          .send(content)
          .expect(200)
          .end(function (contentSaveErr, contentSaveRes) {
            // Handle Content save error
            if (contentSaveErr) {
              return done(contentSaveErr);
            }

            // Update Content name
            content.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Content
            agent.put('/api/contents/' + contentSaveRes.body._id)
              .send(content)
              .expect(200)
              .end(function (contentUpdateErr, contentUpdateRes) {
                // Handle Content update error
                if (contentUpdateErr) {
                  return done(contentUpdateErr);
                }

                // Set assertions
                (contentUpdateRes.body._id).should.equal(contentSaveRes.body._id);
                (contentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Contents if not signed in', function (done) {
    // Create new Content model instance
    var contentObj = new Content(content);

    // Save the content
    contentObj.save(function () {
      // Request Contents
      request(app).get('/api/contents')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Content if not signed in', function (done) {
    // Create new Content model instance
    var contentObj = new Content(content);

    // Save the Content
    contentObj.save(function () {
      request(app).get('/api/contents/' + contentObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', content.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Content with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/contents/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Content is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Content which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Content
    request(app).get('/api/contents/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Content with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Content if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Content
        agent.post('/api/contents')
          .send(content)
          .expect(200)
          .end(function (contentSaveErr, contentSaveRes) {
            // Handle Content save error
            if (contentSaveErr) {
              return done(contentSaveErr);
            }

            // Delete an existing Content
            agent.delete('/api/contents/' + contentSaveRes.body._id)
              .send(content)
              .expect(200)
              .end(function (contentDeleteErr, contentDeleteRes) {
                // Handle content error error
                if (contentDeleteErr) {
                  return done(contentDeleteErr);
                }

                // Set assertions
                (contentDeleteRes.body._id).should.equal(contentSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Content if not signed in', function (done) {
    // Set Content user
    content.user = user;

    // Create new Content model instance
    var contentObj = new Content(content);

    // Save the Content
    contentObj.save(function () {
      // Try deleting Content
      request(app).delete('/api/contents/' + contentObj._id)
        .expect(403)
        .end(function (contentDeleteErr, contentDeleteRes) {
          // Set message assertion
          (contentDeleteRes.body.message).should.match('User is not authorized');

          // Handle Content error error
          done(contentDeleteErr);
        });

    });
  });

  it('should be able to get a single Content that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Content
          agent.post('/api/contents')
            .send(content)
            .expect(200)
            .end(function (contentSaveErr, contentSaveRes) {
              // Handle Content save error
              if (contentSaveErr) {
                return done(contentSaveErr);
              }

              // Set assertions on new Content
              (contentSaveRes.body.name).should.equal(content.name);
              should.exist(contentSaveRes.body.user);
              should.equal(contentSaveRes.body.user._id, orphanId);

              // force the Content to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Content
                    agent.get('/api/contents/' + contentSaveRes.body._id)
                      .expect(200)
                      .end(function (contentInfoErr, contentInfoRes) {
                        // Handle Content error
                        if (contentInfoErr) {
                          return done(contentInfoErr);
                        }

                        // Set assertions
                        (contentInfoRes.body._id).should.equal(contentSaveRes.body._id);
                        (contentInfoRes.body.name).should.equal(content.name);
                        should.equal(contentInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Content.remove().exec(done);
    });
  });
});
