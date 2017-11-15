var express = require('express');

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
                   var essence = [{
                     name: trapeziaPlace.users[index].name,
                     img: 'http://www.abc-color.com/image/coloring/mountains/001/scaur/scaur-bitmap-coloring.png',
                     description:  trapeziaPlace.users[index].experiens
               }
             ];
               res.json(essence);
           } else res.json({error: 'Вы не прошли авторизацию'});
       });

       module.exports = router;
