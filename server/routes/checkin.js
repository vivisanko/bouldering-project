var express = require('express');

var trapeziaPlace = require('../db/data.js');
var fs = require('fs');


var router = express.Router();

console.log('loaded: checkin.js');
/* POST checkin listing. */
router.post('/', function (req, res, next) {
        console.log('checkin запрос');

        console.log(req);
        console.log(req.body);
        var person = trapeziaPlace.users.filter(
            (it) => it.email === req.body.email);
        console.log(person);
        if (person.length === 0) {
            console.log('пользователь с таким e-mail не найден, можно регистрировать');
         var nextId = trapeziaPlace.users.length;
         trapeziaPlace.users[nextId] = {
         "id": nextId,
         "token": null,
         "name": req.body.logon,
         "email": req.body.email,
         "password": req.body.password,
          "phone": req.body.phone,
         "experiens": "",
         "score": null,
         "historyRoutes": [],
         "historyMeetUps": [],
         "duration": ""
       };
       var output = JSON.stringify(trapeziaPlace.users);
       fs.writeFileSync('./db/profile.json', output);
       res.jsonp({success: 'Пользователь успешно зарегистрирован'});
        } else {
          console.log('Пользователь с таким e-mail уже зарегистрирован');
            res.jsonp({error: 'Пользователь с таким e-mail уже зарегистрирован'});
          }
    }
);




module.exports = router;
