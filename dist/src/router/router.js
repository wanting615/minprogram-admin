"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const path_1 = __importDefault(require("path"));
const router = new koa_swagger_decorator_1.SwaggerRouter();
exports.router = router;
router.swagger({
    title: "min-program-server",
    description: "server api",
    version: "1.0.0",
});
router.mapDir(path_1.default.resolve(__dirname, "../controller"));
//# sourceMappingURL=router.js.map