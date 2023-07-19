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
var ManangeUser_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageUserModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let ManangeUser = ManangeUser_1 = class ManangeUser {
    static async findUser(userId) {
        return await this.findOne({ userId });
    }
    static async findUserByUsername(username) {
        return await this.findOne({ username });
    }
    static async getUsers(page, limit = 10, where) {
        return this.find(where !== null && where !== void 0 ? where : {}, { _v: 0, _id: 0 })
            .sort({ creatAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);
    }
    static async getUsersNum() {
        return this.find({});
    }
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], ManangeUser.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], ManangeUser.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], ManangeUser.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], ManangeUser.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: "" }),
    __metadata("design:type", String)
], ManangeUser.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now }),
    __metadata("design:type", Date)
], ManangeUser.prototype, "gen_time", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 1 }),
    __metadata("design:type", Number)
], ManangeUser.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 2 }),
    __metadata("design:type", Number)
], ManangeUser.prototype, "level", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: "" }),
    __metadata("design:type", String)
], ManangeUser.prototype, "phone", void 0);
ManangeUser = ManangeUser_1 = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: "manangeUser" } })
], ManangeUser);
const ManageUserModel = (0, typegoose_1.getModelForClass)(ManangeUser);
exports.ManageUserModel = ManageUserModel;
//# sourceMappingURL=manage.modal.js.map