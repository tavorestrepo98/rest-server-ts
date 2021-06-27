"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteProducts = exports.updateProducts = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
var models_1 = require("../models");
var getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, limit, _c, offset, query, _d, total, categories, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.query, _b = _a.limit, limit = _b === void 0 ? 5 : _b, _c = _a.offset, offset = _c === void 0 ? 0 : _c;
                query = {
                    state: true
                };
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all([
                        models_1.Product.countDocuments(query),
                        models_1.Product.find(query).populate({})
                            .skip(Number(offset))
                            .limit(Number(limit))
                            .populate('user')
                            .populate('category')
                    ])];
            case 2:
                _d = _e.sent(), total = _d[0], categories = _d[1];
                res.status(200).json({
                    total: total,
                    categories: categories
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _e.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProducts = getProducts;
var getProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Product.findById(id)
                        .populate('user')
                        .populate('category')];
            case 2:
                product = _a.sent();
                res.status(200).json({
                    error: false,
                    product: product
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).json({
                    error: true,
                    message: err_1
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProduct = getProduct;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, state, user, body, productDB, data, product, newProduct, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, state = _a.state, user = _a.user, body = __rest(_a, ["state", "user"]);
                return [4 /*yield*/, models_1.Product.findOne({ name: body.name })];
            case 1:
                productDB = _b.sent();
                if (productDB) {
                    return [2 /*return*/, res.status(400).json({
                            error: true,
                            message: "El producto " + body.name + " ya existe"
                        })];
                }
                data = __assign(__assign({}, body), { name: body.name.toUpperCase(), user: req['uid'] });
                product = new models_1.Product(data);
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, product.save()];
            case 3:
                newProduct = _b.sent();
                res.status(201).json({
                    error: false,
                    newProduct: newProduct
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                res.status(400).json({
                    error: true,
                    message: err_2
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var updateProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, state, user, data, product, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, state = _a.state, user = _a.user, data = __rest(_a, ["state", "user"]);
                if (data.name) {
                    data.name = data.name.toUpperCase();
                }
                data.user = req['id'];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Product.findById(id, data, {
                        new: true
                    })];
            case 2:
                product = _b.sent();
                res.status(200).json({
                    error: false,
                    product: product
                });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                res.status(400).json({
                    error: true,
                    message: err_3
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProducts = updateProducts;
var deleteProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productDeleted, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Product.findByIdAndUpdate(id, {
                        state: false
                    }, { new: true })];
            case 2:
                productDeleted = _a.sent();
                res.status(200).json({
                    error: false,
                    productDeleted: productDeleted
                });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400).json({
                    error: true,
                    message: err_4
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProducts = deleteProducts;
//# sourceMappingURL=product.controller.js.map