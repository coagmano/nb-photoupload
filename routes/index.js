// var fs = require('fs');
var express = require('express');
var router = express.Router();
var request = require('request');
var strftime = require('strftime');
var bodyParser = require('body-parser');
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 10485760
  }
});
var path = require('path');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(upload.single('image')); // for parsing multipart/form-data

router.post('/upload/:site/:page', function(req, res) {

  var slug = process.env.NB_SLUG;
  var site = req.params.site;
  var page = req.params.page;
  var token = process.env.NB_ACCESS_TOKEN;

  var options = {
    uri: 'https://'+slug+'.nationbuilder.com/api/v1/sites/'+site+'/pages/'+page+'/attachments?access_token='+token,
    json: true,
    body: {
      "attachment": {
        "filename": req.file.originalname,
        "content_type": req.file.mimetype,
        "updated_at": strftime('%Y-%m-%dT%H:%M:%S+10:00'),
        "content": req.file.buffer.toString('Base64')
      }
    }
  };

  request.post(options, function(error, response, body) {
    // logger.log('Response: ' + response.statusCode);
    if (error) throw error;

    if (body && body.attachment && body.attachment.filename && body.attachment.url) {
      // logger.log(response.statusCode + ": Saved file " + body.attachment.filename );
      res.status(200).send(body.attachment.url);
    } else {
      // logger.log(body);
      res.status(500).send(body,toString());
    }

  });

  // Nationbuilder post?
  // POST /api/v1/sites/:site_slug/pages/:page_slug/attachments
});

module.exports = router;
