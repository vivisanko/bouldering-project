var express = require('express');
var path = require('path');
var trapeziaPlace = require('../db/data.js');
var validator = require('../db/validator.js');
var fs = require('fs');


var router = express.Router();

console.log('loaded: personal.js');
/* GET personal listing. */
router.get('/', function (req, res, next) {
        console.log('personal запрос');
        console.log(req.headers.token);
           console.log(req.headers.userid);
           var index = validator(req.headers.token, Number(req.headers.userid));
           if (index!==null) {
             console.log(req);
             console.log(req.headers.referer);
             var essence = {
               uname: trapeziaPlace.users[index].name,
               uavatar: '/personal/avatar/' + req.headers.token + '/' + req.headers.userid
             };

         res.json(essence);
     } else res.json({error: 'Пройдите авторизацию'});
 });

router.get('/avatar/:token_id/:user_id', function (req, res, next) {
  console.log("дай аватар");
  console.log(req.params.token_id);
  console.log(req.params.user_id);
  var index = validator(req.params.token_id, Number(req.params.user_id));
  if (index===null) {
    res.json({error: 'Пройдите авторизацию'});
    return;
  }
  var filepath = __dirname + '\\..\\public\\images\\avatar\\' + req.params.user_id + '.png';
  filepath = path.resolve(filepath);
  console.log(filepath);
  fs.exists(filepath, (exists) => {
  if (!exists) {
    filepath = __dirname + '\\..\\public\\images\\avatar\\' + 'rock.png';
    filepath = path.resolve(filepath);
  }
  console.log(filepath);
  res.sendFile(filepath);
})
});

       module.exports = router;
