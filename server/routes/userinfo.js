var express = require('express');

var trapeziaPlace = require('../db/data.js');
var validator = require('../db/validator.js');
var fs = require('fs');


var router = express.Router();

console.log('loaded: userinfo.js');
/* GET personal listing. */
router.get('/', function (req, res, next) {
        console.log('userinfo запрос');
        console.log(req.headers.token);
           console.log(req.headers.userid);
           console.log(req.headers.userinfo);
           var index = validator(req.headers.token, Number(req.headers.userid));
           if (index!==null) {
                   var essence = [{
                     name: trapeziaPlace.users[index].name,
                     score: trapeziaPlace.users[index].score,
                     experiens:  trapeziaPlace.users[index].experiens,
                     historyRoutes: trapeziaPlace.users[index].historyRoutes,
                     duration:  trapeziaPlace.users[index].duration
               }
             ];
               res.json(essence);
           } else res.json({error: 'Пройдите авторизацию'});
       });

       module.exports = router;
