"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.putUsers = exports.postUsers = exports.getUsers = void 0;
var getUsers = function (req, res) {
    res.send('Hola mundo');
};
exports.getUsers = getUsers;
var postUsers = function (req, res) {
    var body = req.body;
    console.log('body: ', body);
    res.status(200).json({
        message: 'Post-users',
        body: body
    });
};
exports.postUsers = postUsers;
var putUsers = function (req, res) {
    var id = req.params.id;
    var query = req.query;
    res.status(200).json({
        message: 'Put-user',
        id: id,
        query: query
    });
};
exports.putUsers = putUsers;
var deleteUsers = function (req, res) {
    res.send('Hola mundo');
};
exports.deleteUsers = deleteUsers;
