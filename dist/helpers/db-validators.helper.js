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
Object.defineProperty(exports, "__esModule", { value: true });
exports.existUserValidatorByIdAndState = exports.existUserValidatorByEmail = exports.existUserValidator = exports.emailValidator = exports.roleValidator = void 0;
var role_model_1 = require("../models/role.model");
var user_model_1 = require("../models/user.model");
var roleValidator = function (role) {
    if (role === void 0) { role = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var existRole;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, role_model_1.Role.findOne({ role: role })];
                case 1:
                    existRole = _a.sent();
                    if (!existRole) {
                        throw new Error("El role " + role + " no est\u00E1 en la BD");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.roleValidator = roleValidator;
var emailValidator = function (email) {
    if (email === void 0) { email = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var existEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
                case 1:
                    existEmail = _a.sent();
                    if (existEmail) {
                        throw new Error("El email " + email + " ya existe");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.emailValidator = emailValidator;
var existUserValidator = function (id) {
    if (id === void 0) { id = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var existUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.User.findById(id)];
                case 1:
                    existUser = _a.sent();
                    if (!existUser) {
                        throw new Error("El usuario con id " + id + " no existe en la BD");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.existUserValidator = existUserValidator;
var existUserValidatorByEmail = function (email) {
    if (email === void 0) { email = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var existUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.User.findOne({
                        email: email,
                        state: true
                    })];
                case 1:
                    existUser = _a.sent();
                    console.log(existUser);
                    if (!existUser) {
                        throw new Error("El usuario con el email " + email + " no existe en la BD");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.existUserValidatorByEmail = existUserValidatorByEmail;
var existUserValidatorByIdAndState = function (id) {
    if (id === void 0) { id = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var existUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.User.findOne({
                        _id: id,
                        state: true
                    })];
                case 1:
                    existUser = _a.sent();
                    if (!existUser) {
                        throw new Error("El usuario con el id " + id + " no existe o no est\u00E1 activo");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.existUserValidatorByIdAndState = existUserValidatorByIdAndState;
//# sourceMappingURL=db-validators.helper.js.map