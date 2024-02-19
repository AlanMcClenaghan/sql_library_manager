var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // In the body of the GET ‘/’ route handler provided for you:
  // Delete or comment out the res.render method
  res.redirect("/books")
});

module.exports = router;
