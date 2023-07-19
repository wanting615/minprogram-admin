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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
const doc_model_1 = require("../model/doc-model");
const wx_user_model_1 = require("../model/wx-user-model");
const ids_1 = require("../model/ids");
const until_1 = __importDefault(require("../until/until"));
const needLogin_1 = require("../middleware/needLogin");
//微信小程序添加知识文档
class DocController {
    async addWxLearnInfo(ctx) {
        const params = ctx.request.body;
        if (!params.type && Number(params.type) !== 0) {
            ctx.fail("请输入文档类型");
            return;
        }
        if (!params.title) {
            ctx.fail("请输入文档标题");
            return;
        }
        if (!params.content) {
            ctx.fail("内容不能为空");
            return;
        }
        const wxType = await doc_model_1.WxTypeModel.getWxInfoByType(Number(params.type));
        if (!wxType) {
            ctx.fail("文档类型不存在");
            return;
        }
        try {
            const id = await ids_1.IdsModel.getIds("wx_id");
            const data = new doc_model_1.WxDocModel({
                id,
                type: Number(params.type),
                typeName: wxType.name,
                contentType: params.contentType,
                title: params.title,
                content: params.content,
                autor: params.autor,
                creatAt: new Date(),
            });
            await data.save();
            ctx.success(data, "上传成功");
        }
        catch (error) {
            console.log(error);
        }
    }
    async delDoc(ctx) {
        const { id } = ctx.request.query;
        if (!id) {
            ctx.fail("id不能为空");
            return;
        }
        try {
            const data = await doc_model_1.WxDocModel.getWxInfoById(Number(id));
            if (!data) {
                ctx.fail("该文档不存在");
                return;
            }
            if (data) {
                data.disabled = 1;
                await data.save();
                ctx.success(data, "删除成功");
            }
        }
        catch (error) {
            console.log(error);
            ctx.fail("删除失败");
        }
    }
    async updateWxLearnInfo(ctx) {
        const params = ctx.request.body;
        if (!params.type && Number(params.type) !== 0) {
            ctx.fail("请输入文档类型");
            return;
        }
        const type = await doc_model_1.WxTypeModel.getWxInfoByType(Number(params.type));
        if (!type) {
            ctx.fail("文档类型不存在");
            return;
        }
        if (!params.title) {
            ctx.fail("请输入文档标题");
            return;
        }
        if (!params.content) {
            ctx.fail("内容不能为空");
            return;
        }
        try {
            const data = await doc_model_1.WxDocModel.getWxInfoById(Number(params.id));
            if (!data) {
                ctx.fail("该文档不存在");
                return;
            }
            data.type = Number(params.type);
            data.typeName = type.name;
            data.contentType = params.contentType;
            data.title = params.title;
            data.content = params.content;
            data.autor = params.autor;
            await data.save();
            ctx.success(data, "更新成功");
        }
        catch (error) {
            console.log(error);
        }
    }
    async getDocById(ctx) {
        const { id } = ctx.request.query;
        if (!id)
            return ctx.fail("id 不能为空");
        const doc = await doc_model_1.WxDocModel.getWxInfoById(Number(id));
        if (doc)
            return ctx.success(doc, "查询成功");
        ctx.fail("查询失败");
    }
    async getDocByType(ctx) {
        const { type, contentType, page } = ctx.request.query;
        try {
            const data = await doc_model_1.WxDocModel.getDocByType(Number(type), contentType, Number(page));
            const pages = await doc_model_1.WxDocModel.getDocNumByType(Number(type), contentType);
            ctx.body = {
                status: true,
                message: "",
                pages: Math.ceil(pages.length / 10),
                data,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getReadDoc(ctx) {
        try {
            const { token, id } = ctx.request.query;
            const data = await doc_model_1.WxDocModel.getWxInfoById(Number(id));
            const user = await wx_user_model_1.WxUserModel.findUser(until_1.default.verifywxToken(token));
            if (!data || !user) {
                ctx.fail("用户未登录");
                return;
            }
            // if(views.includes(data._id)){ ctx.fail("用户已阅读"); return; }
            if (data.views) {
                data.views++;
            }
            else {
                data.views = 1;
            }
            const views = user.views || [];
            if (views.indexOf(data._id) !== -1) {
                views.splice(views.indexOf(data._id), 1);
            }
            if (views.length >= 50) {
                views.pop();
            } // 最多存储50条
            views.unshift(data._id);
            user.views = views;
            await user.save();
            await data.save();
            ctx.success(null, "");
        }
        catch (error) { }
    }
    async getPraises(ctx) {
        try {
            const { token, id } = ctx.request.query;
            if (!token || !id) {
                ctx.fail("token和id不能为空");
                return;
            }
            const data = await doc_model_1.WxDocModel.getWxInfoById(Number(id));
            const user = await wx_user_model_1.WxUserModel.findUser(until_1.default.verifywxToken(token));
            if (!data || !user) {
                ctx.fail("用户未登录");
                return;
            }
            const praises = user.praises || [];
            if (praises.includes(data._id)) {
                ctx.fail("用户已阅读");
                return;
            }
            if (data.praises) {
                data.praises++;
            }
            else {
                data.praises = 1;
            }
            if (praises.length >= 50) {
                praises.pop();
            } // 最多存储50条
            praises.unshift(data._id);
            user.praises = praises;
            await user.save();
            await data.save();
            ctx.success(null, "");
        }
        catch (error) { }
    }
    async getNewsDoc(ctx) {
        try {
            const { page } = ctx.request.query;
            const data = await doc_model_1.WxDocModel.getDocByTime(Number(page));
            ctx.success(data, "查询成功");
        }
        catch (error) {
            ctx.fail("查询失败");
        }
    }
}
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/addWxLearnInfo"),
    (0, koa_swagger_decorator_1.summary)("微信小程序添加文档"),
    (0, koa_swagger_decorator_1.body)({
        type: { type: "number", require: true },
        contentType: { type: "string" },
        title: { type: "string", require: true },
        content: { type: "string", require: true },
        autor: { type: "string" }, //作者
    }),
    (0, koa_swagger_decorator_1.middlewares)([needLogin_1.needLogin]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "addWxLearnInfo", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/delDoc"),
    (0, koa_swagger_decorator_1.summary)("删除某文档"),
    (0, koa_swagger_decorator_1.query)({
        id: {
            type: "number",
            require: true,
        },
    }),
    (0, koa_swagger_decorator_1.middlewares)([needLogin_1.needLogin]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "delDoc", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("post", "/updateWxLearnInfo"),
    (0, koa_swagger_decorator_1.summary)("微信小程序更新文档"),
    (0, koa_swagger_decorator_1.body)({
        id: {
            type: "number",
            require: true,
        },
        type: {
            //文档类型
            type: "number",
            require: true,
        },
        contentType: {
            //内容类型
            type: "string",
        },
        title: {
            //标题
            type: "string",
            require: true,
        },
        content: {
            //内容
            type: "string",
            require: true,
        },
        autor: {
            //作者
            type: "string",
        },
    }),
    (0, koa_swagger_decorator_1.middlewares)([needLogin_1.needLogin]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "updateWxLearnInfo", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/getDocById"),
    (0, koa_swagger_decorator_1.summary)("获取id文档"),
    (0, koa_swagger_decorator_1.query)({ id: { type: "number", require: true } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "getDocById", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/getDocByType"),
    (0, koa_swagger_decorator_1.summary)("获取type类型的文档"),
    (0, koa_swagger_decorator_1.query)({
        type: { type: "number", require: true },
        contentType: { type: "string", require: true },
        page: { type: "number", default: 1 },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "getDocByType", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/getReadDoc"),
    (0, koa_swagger_decorator_1.summary)("阅读量"),
    (0, koa_swagger_decorator_1.query)({ id: { type: "number", require: true }, token: { type: "string" } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "getReadDoc", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/getPraises"),
    (0, koa_swagger_decorator_1.summary)("点赞"),
    (0, koa_swagger_decorator_1.query)({ id: { type: "number", require: true }, token: { type: "string" } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "getPraises", null);
__decorate([
    (0, koa_swagger_decorator_1.request)("get", "/getNewsDoc"),
    (0, koa_swagger_decorator_1.summary)("获取最新文档"),
    (0, koa_swagger_decorator_1.query)({ page: { type: "number" } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "getNewsDoc", null);
exports.default = DocController;
//# sourceMappingURL=doc.js.map