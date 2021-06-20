"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = express_1.Router();
router.get('/', user_controller_1.getUsers);
router.post('/', user_controller_1.postUsers);
router.put('/:id', user_controller_1.putUsers);
router.delete('/', user_controller_1.deleteUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map