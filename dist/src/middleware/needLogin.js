"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.needPermission = exports.needLogin = void 0;
const until_1 = __importDefault(require("../until/until"));
const needLogin = async (ctx, next) => {
    const token = ctx.get("ACCESS_TOKEN");
    if (!token) {
        ctx.body = {
            status: false,
            message: "未登录无权操作",
        };
    }
    else {
        // 验证token
        if (await until_1.default.verifyToken(token)) {
            await next();
        }
        else {
            ctx.body = {
                status: false,
                message: "用户名和密码错误",
            };
        }
    }
};
exports.needLogin = needLogin;
const needPermission = async (ctx, next) => {
    const token = ctx.get("ACCESS_TOKEN");
    if (!token) {
        ctx.body = {
            status: false,
            message: "未登录无权操作",
        };
    }
    else {
        // 验证token
        if (await until_1.default.verifyPermission(token)) {
            await next();
        }
        else {
            ctx.body = {
                status: false,
                message: "无权操作",
            };
        }
    }
};
exports.needPermission = needPermission;
//# sourceMappingURL=needLogin.js.map