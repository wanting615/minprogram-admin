"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const manage_modal_1 = require("../model/manage.modal");
const ids_1 = require("../model/ids");
const jsonwebtoken_1 = require("jsonwebtoken");
const needLogin_1 = require("../middleware/needLogin");
const config_1 = require("../config");
const validator_1 = require("../until/validator");
class ManageUser {
    async addManangeUser(ctx) {
        const { username, password, name } = ctx.request.body;
        if (!username || !password) {
            ctx.fail("用户名或密码不能为空");
            return;
        }
        const user = await manage_modal_1.ManageUserModel.findUserByUsername(username);
        if (user) {
            ctx.fail("用户名已存在");
            return;
        }
        const id = await ids_1.IdsModel.getIds("wx_manange_user_id");
        const userdata = new manage_modal_1.ManageUserModel({
            id,
            userId: id,
            username,
            password,
            name,
        });
        await userdata.save();
        ctx.success(userdata, "注册成功");
        return;
    }
    async loginWx(ctx) {
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            ctx.fail("用户名和密码不能为空");
            return;
        }
        const user = await manage_modal_1.ManageUserModel.findUserByUsername(username);
        if (user && password === user.password) {
            const token = (0, jsonwebtoken_1.sign)({ username, password, userId: user.userId }, config_1.tokenConfig.privateKey, { expiresIn: "1d" });
            ctx.success({ token, userInfo: user }, "登陆成功");
            return;
        }
        ctx.fail("账户密码错误");
    }
    // --------------获取用户信息----------
    async getUserInfo(ctx) {
        const { token } = ctx.request.body;
        try {
            const userInfo = (0, jsonwebtoken_1.verify)(token, config_1.tokenConfig.privateKey);
            const user = await manage_modal_1.ManageUserModel.findUser(userInfo.userId);
            ctx.body = {
                data: user,
                status: true,
                message: "获取用户信息成功",
            };
        }
        catch (error) {
            ctx.body = {
                data: null,
                status: false,
                message: "token已过期",
            };
        }
    }
    // ------------ 获取所有用户------------
    async getUsers(ctx) {
        const { page, limit, where } = ctx.request.body;
        const _where = {};
        try {
            if (where) {
                Object.keys(where).forEach((key) => {
                    if (key === "gen_time") {
                        _where["gen_time"] = {
                            $gte: new Date(where.gen_time[0]),
                            $lt: new Date(where.gen_time[1]),
                        };
                        return;
                    }
                    _where[key] = where[key];
                });
            }
            const data = await manage_modal_1.ManageUserModel.getUsers(Number(page), Number(limit), _where);
            const users = await manage_modal_1.ManageUserModel.getUsersNum();
            ctx.body = {
                status: true,
                message: "",
                count: Math.ceil(users.length / 10),
                data,
            };
        }
        catch (error) {
            console.log(error);
            ctx.fail("参数错误");
        }
    }
    async changeStatus(ctx) {
        const { userId, status } = ctx.request.query;
        if ((0, validator_1.isNull)(userId))
            return ctx.fail("用户id不能为空");
        if ((0, validator_1.isNull)(status))
            return ctx.fail("status不能为空");
        const user = await manage_modal_1.ManageUserModel.findUser(Number(userId));
        if ((0, validator_1.isNull)(user))
            return ctx.fail("用户不存在");
        user.status = Number(status) === 1 ? 1 : 0;
        await user.save();
        ctx.success(true, "操作成功");
    }
    async getUserSearch(ctx) {
        const users = await manage_modal_1.ManageUserModel.getUsers(1, 999);
        const searchData = {
            username: [],
            name: [],
            phone: [],
        };
        users.forEach((user) => {
            searchData.username.push(user.username);
            user.name && searchData.name.push(user.name);
            user.phone && searchData.phone.push(user.phone);
        });
        console.log(searchData);
        searchData.username = [...new Set(searchData.username)];
        searchData.name = [...new Set(searchData.name)];
        searchData.phone = [...new Set(searchData.phone)];
        ctx.success(Object.assign({}, searchData), "获取成功");
    }
}
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/registerUser"),
    (0, koa_swagger_decorator_1.summary)("注册管理账号"),
    (0, koa_swagger_decorator_1.body)({
        username: { type: "string", require: true },
        password: { type: "string", require: true },
        name: { type: "string", require: true },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManageUser.prototype, "addManangeUser", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/login"),
    (0, koa_swagger_decorator_1.summary)("微信小程序后台登陆"),
    (0, koa_swagger_decorator_1.body)({
        username: { type: "string", require: true },
        password: { type: "string", require: true },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManageUser.prototype, "loginWx", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/userInfo"),
    (0, koa_swagger_decorator_1.summary)("获取用户信息"),
    (0, koa_swagger_decorator_1.body)({ token: { type: "string", require: true } }),
    (0, koa_swagger_decorator_1.middlewares)([needLogin_1.needLogin]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManageUser.prototype, "getUserInfo", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/users"),
    (0, koa_swagger_decorator_1.summary)("获取所有用户"),
    (0, koa_swagger_decorator_1.query)({
        page: { type: "number", default: 1 },
        limit: { type: "number", default: 10 },
        where: { type: "any", default: {} },
    }),
    (0, koa_swagger_decorator_1.middlewares)([needLogin_1.needPermission]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManageUser.prototype, "getUsers", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/user/status"),
    (0, koa_swagger_decorator_1.summary)("启用or禁用用户"),
    (0, koa_swagger_decorator_1.query)({
        userId: { type: "number", require: true },
        status: { type: "number", require: true },
    }),
    (0, koa_swagger_decorator_1.middlewares)([needLogin_1.needPermission]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManageUser.prototype, "changeStatus", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/user/search"),
    (0, koa_swagger_decorator_1.summary)("获取搜索项"),
    (0, koa_swagger_decorator_1.middlewares)([needLogin_1.needPermission]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManageUser.prototype, "getUserSearch", null);
exports.default = ManageUser;
//# sourceMappingURL=manage-user.js.map