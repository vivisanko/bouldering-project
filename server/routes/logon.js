var express = require('express');

var trapeziaPlace = require('../db/data.js');
var fs = require('fs');


var router = express.Router();

console.log('loaded: logon.js');
/* POST logon listing. */
router.post('/', function (req, res, next) {
        console.log('logon запрос');
        console.log(req);
        console.log(req.body);
        var person = trapeziaPlace.users.filter(
            (it) => it.email === req.body.email);
        console.log(person);
        if (person.length === 0) {
            console.log('пользователь не нашелся');

            res.jsonp({error: 'Пользователь с таким e-mail не зарегистрирован'});
        } else {
            if (person[0].password !== req.body.psw) {
                res.jsonp({error: 'Неверный пароль'});
                console.log('пароль не верный')
            } else {
                var token = makeToken(person[0].id);
                console.log (token);
                var answer = {token: token, userId: person[0].id};
                var ind = trapeziaPlace.usersId.indexOf(person[0].id);
                console.log(ind);
                trapeziaPlace.users[ind].token = answer.token;
                console.log(trapeziaPlace.users[ind].token);
                var output = JSON.stringify(trapeziaPlace.users);
                fs.writeFileSync('./db/profile.json', output);
                res.jsonp(answer);
            }
        }
    }
);

function makeToken(id) {
    var keyList = "abcdefjhijklmnopqrstuvwxyz";
    var temp = '';
    var now = Date.now();
    for (var i = 0; i < 8; i++) {
        temp += keyList.charAt(Math.floor(Math.random() * keyList.length))
    }
    var token = id.toString().split('').concat(temp.split('').concat(now.toString().split(''))).join('');
    return token;
}


module.exports = router;
