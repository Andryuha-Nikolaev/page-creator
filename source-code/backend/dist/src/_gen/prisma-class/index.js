"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaModel = void 0;
const user_1 = require("./user");
var PrismaModel;
(function (PrismaModel) {
    class User extends user_1.User {
    }
    PrismaModel.User = User;
    PrismaModel.extraModels = [User];
})(PrismaModel || (exports.PrismaModel = PrismaModel = {}));
//# sourceMappingURL=index.js.map