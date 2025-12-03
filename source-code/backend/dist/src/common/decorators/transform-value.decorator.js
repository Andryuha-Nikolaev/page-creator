"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrimString = TrimString;
exports.ToLowerCaseString = ToLowerCaseString;
const class_transformer_1 = require("class-transformer");
function TrimString() {
    return (0, class_transformer_1.Transform)(({ value }) => {
        return typeof value === 'string' ? value.trim() : value;
    });
}
function ToLowerCaseString() {
    return (0, class_transformer_1.Transform)(({ value }) => {
        return typeof value === 'string' ? value.toLowerCase() : value;
    });
}
//# sourceMappingURL=transform-value.decorator.js.map