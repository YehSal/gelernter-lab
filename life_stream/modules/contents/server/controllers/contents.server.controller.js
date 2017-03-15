'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Content = mongoose.model('Content'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Content
 */
exports.create = function(req, res) {
  var content = new Content(req.body);
  content.user = req.user;

  content.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(content);
    }
  });
};

/**
 * Show the current Content
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var content = req.content ? req.content.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  content.isCurrentUserOwner = req.user && content.user && content.user._id.toString() === req.user._id.toString();

  res.jsonp(content);
};

/**
 * Update a Content
 */
exports.update = function(req, res) {
  var content = req.content;

  content = _.extend(content, req.body);

  content.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(content);
    }
  });
};

/**
 * Delete an Content
 */
exports.delete = function(req, res) {
  var content = req.content;

  content.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(content);
    }
  });
};

/**
 * List of Contents
 */
exports.list = function(req, res) {
  Content.find().sort('-created').populate('user', 'displayName').exec(function(err, contents) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contents);
    }
  });
};

/**
 * Content middleware
 */
exports.contentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Content is invalid'
    });
  }

  Content.findById(id).populate('user', 'displayName').exec(function (err, content) {
    if (err) {
      return next(err);
    } else if (!content) {
      return res.status(404).send({
        message: 'No Content with that identifier has been found'
      });
    }
    req.content = content;
    next();
  });
};
