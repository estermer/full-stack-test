var express = require('express');
const dataAccess = require('../utilities/data_access');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var sql = 'SELECT id, sport FROM schedules';
  var schedules = await dataAccess.GetRows(sql);
  var locals = {
    title: 'Schedules',
    schedules: schedules
  };
  res.render('./schedules/list', locals);
});

router.get('/details/:scheduleId', async function(req, res, next) {
  var sql = 'SELECT 1 = ?';
  var schedule = await dataAccess.GetRow(sql, req.params.scheduleId);
  var locals = {
    title: 'Schedule Details',
  };

  res.render('./schedules/details', locals)
});

module.exports = router;
