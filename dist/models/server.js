"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var user_routes_1 = __importDefault(require("../routes/user.routes"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.port = process.env.PORT || '3000';
        this.path = {
            users: '/api/users'
        };
        this.middlewares();
        this.routes();
        this.listen();
    }
    Server.prototype.middlewares = function () {
        this.app.use(cors_1.default({ origin: true }));
        //parseo de body
        this.app.use(express_1.default.json());
    };
    Server.prototype.routes = function () {
        this.app.use(this.path.users, user_routes_1.default);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('Listen port ', _this.port);
        });
    };
    return Server;
}());
exports.default = Server;
