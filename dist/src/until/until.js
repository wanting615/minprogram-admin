"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const manage_modal_1 = require("../model/manage.modal");
const config_1 = require("../config");
const enum_1 = require("../types/enum");
class UntilService {
    // 验证后台token
    async verifyToken(token) {
        try {
            const userInfo = (0, jsonwebtoken_1.verify)(token, config_1.tokenConfig.privateKey);
            const user = await manage_modal_1.ManageUserModel.findUser(userInfo.userId);
            if (user &&
                userInfo.password === user.password &&
                userInfo.username === user.username &&
                user.status === 1) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }
    async verifyPermission(token) {
        try {
            const userInfo = (0, jsonwebtoken_1.verify)(token, config_1.tokenConfig.privateKey);
            const user = await manage_modal_1.ManageUserModel.findUser(userInfo.userId);
            if (user &&
                userInfo.password === user.password &&
                userInfo.username === user.username &&
                user.status === 1 &&
                user.level === enum_1.UserPremission.admin //管理员权限
            ) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }
    // 生成小程序token
    createToken(openid) {
        return (0, jsonwebtoken_1.sign)({ openid }, config_1.tokenConfig.privateKey, {
            expiresIn: "100 days",
        });
    }
    // 校验小程序token
    verifywxToken(token) {
        if (!token) {
            return "";
        }
        const params = (0, jsonwebtoken_1.verify)(token, config_1.tokenConfig.privateKey);
        return params.openid;
    }
}
exports.default = new UntilService();
//# sourceMappingURL=until.js.map