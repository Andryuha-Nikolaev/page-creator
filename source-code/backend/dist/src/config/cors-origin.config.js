"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOrigin = void 0;
const prodOrigin = [];
const devOrigin = [
    'http://localhost:3000',
    /^http:\/\/192\.168\.\d+\.\d+:3000$/,
];
exports.corsOrigin = process.env.BUILD_PROFILE === 'production' ? prodOrigin : devOrigin;
//# sourceMappingURL=cors-origin.config.js.map