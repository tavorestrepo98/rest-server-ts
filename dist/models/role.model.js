"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var mongoose_1 = require("mongoose");
var RoleSchemaFields = {
    role: {
        type: String,
        required: true
    }
};
var RoleSchema = new mongoose_1.Schema(RoleSchemaFields);
exports.Role = mongoose_1.model('Role', RoleSchema);
//# sourceMappingURL=role.model.js.map