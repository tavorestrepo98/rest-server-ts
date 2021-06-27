"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var uploads_controller_1 = require("./../controllers/uploads.controller");
var router = express_1.Router();
router.post('/', uploads_controller_1.cargarArchivo);
exports.default = router;
//# sourceMappingURL=uploads.routes.js.map