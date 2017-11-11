var express = require('express');
var fs = require('fs');
var path = require('path');

class Place {
    constructor(pathToUsers, pathToRoutes) {
        this.users = JSON.parse(fs.readFileSync('./db/profile.json').toString()),
            this.routes = JSON.parse(fs.readFileSync('./db/routes.json').toString()),
            this.usersId = this.users.map(it => it.id)
    };

}

var trapeziaPlace = new Place('./db/profile.json','./db/routes.json');

console.log(trapeziaPlace.usersId);
console.log(trapeziaPlace);


module.exports = trapeziaPlace;
