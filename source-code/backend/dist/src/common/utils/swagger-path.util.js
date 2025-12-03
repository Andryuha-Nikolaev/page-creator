"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwaggerUiDistPath = getSwaggerUiDistPath;
const path_1 = require("path");
function getSwaggerUiDistPath() {
    const isVercel = process.env.VERCEL === '1';
    if (isVercel) {
        return (0, path_1.join)(process.cwd(), 'node_modules', 'swagger-ui-dist');
    }
    else {
        return (0, path_1.join)(__dirname, '..', '..', 'node_modules', 'swagger-ui-dist');
    }
}
//# sourceMappingURL=swagger-path.util.js.map