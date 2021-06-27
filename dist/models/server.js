"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var config_db_1 = require("../db/config.db");
var user_routes_1 = __importDefault(require("../routes/user.routes"));
var auth_routes_1 = __importDefault(require("../routes/auth.routes"));
var category_routes_1 = __importDefault(require("../routes/category.routes"));
var product_routes_1 = __importDefault(require("../routes/product.routes"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.port = process.env.PORT || '3000';
        this.path = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products'
        };
        //conectar a base de datos
        this.conectarDb();
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
        this.app.use(this.path.auth, auth_routes_1.default);
        this.app.use(this.path.categories, category_routes_1.default);
        this.app.use(this.path.products, product_routes_1.default);
    };
    Server.prototype.conectarDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, config_db_1.dbConnection()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
//# sourceMappingURL=server.js.map