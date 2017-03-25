var express = require('express');
var router = express.Router();

var Content = require('../models/content')

router.get('/', function(req, res, next) {
    Content.find()
        .exec(function(err, contents) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: contents
            });
        });
});

router.post('/', function (req, res, next) {
    var content = new Content({
        name: req.body.name
    });

    content.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Content',
            obj: result
        });
    });
});

module.exports = router;
