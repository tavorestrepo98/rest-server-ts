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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.putCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
var models_1 = require("../models");
var getCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, _a, _b, limit, _c, offset, _d, total, categories;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                query = {
                    state: true
                };
                _a = req.query, _b = _a.limit, limit = _b === void 0 ? 5 : _b, _c = _a.offset, offset = _c === void 0 ? 0 : _c;
                return [4 /*yield*/, Promise.all([
                        models_1.Category.countDocuments(query),
                        models_1.Category.find(query)
                            .skip(Number(offset))
                            .limit(Number(limit))
                            .populate('user', ['name', 'role', 'email'])
                    ])];
            case 1:
                _d = _e.sent(), total = _d[0], categories = _d[1];
                res.status(200).json({
                    total: total,
                    categories: categories
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getCategories = getCategories;
var getCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, category, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Category.findById(id)
                        .populate('user')];
            case 2:
                category = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        error: false,
                        category: category
                    })];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({
                        error: true,
                        message: err_1
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCategory = getCategory;
var createCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, categoriaDB, data, category, newCategory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name.toUpperCase();
                return [4 /*yield*/, models_1.Category.findOne({ name: name })];
            case 1:
                categoriaDB = _a.sent();
                if (categoriaDB) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "La categor\u00EDa " + categoriaDB['name'] + " ya existe"
                        })];
                }
                data = {
                    name: name,
                    user: req['uid']
                };
                category = new models_1.Category(data);
                return [4 /*yield*/, category.save()];
            case 2:
                newCategory = _a.sent();
                console.log(data);
                res.status(201).json({
                    error: false,
                    newCategory: newCategory
                });
                return [2 /*return*/];
        }
    });
}); };
exports.createCategory = createCategory;
var putCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, estado, user, data, category, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, estado = _a.estado, user = _a.user, data = __rest(_a, ["estado", "user"]);
                data.name = data.name.toUpperCase();
                data.usuario = req['user']._id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Category.findByIdAndUpdate(id, data, { new: true })];
            case 2:
                category = _b.sent();
                res.json({
                    error: false,
                    category: category
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                res.json({
                    error: true,
                    message: err_2
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.putCategory = putCategory;
var deleteCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, categoriaBorrada, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Category.findByIdAndUpdate(id, {
                        state: false
                    })];
            case 2:
                categoriaBorrada = _a.sent();
                res.status(200).json({
                    error: false,
                    categoriaBorrada: categoriaBorrada
                });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400).json({
                    error: true,
                    err: err_3
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categories.controller.js.map