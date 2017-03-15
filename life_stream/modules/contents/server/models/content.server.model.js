'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Content Schema
 */
var ContentSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Content name',
    trim: true
  },
  tags: {
    type: [String],
    default: [''],
    required: 'Please add at least one tag',
    trim: true
  },
  fileURL: {
    type: String,
    // required: 'Please add the link to the file of your content',
    trim: true
  },
  privacy: {
    type: Boolean,
    required: 'Please set the privacy of your content',
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Content', ContentSchema);
