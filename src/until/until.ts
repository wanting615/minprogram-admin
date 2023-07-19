import { JwtPayload, sign, verify } from "jsonwebtoken";
import { ManageUserModel } from "../model/manage.modal";
import { tokenConfig } from "../config";
import { UserPremission } from "../types/enum";

interface UserInfo extends JwtPayload {
	username: string;
	password: string;
	userId: number;
}

class UntilService {
	// 验证后台token
	async verifyToken(token: string): Promise<boolean> {
		try {
			const userInfo: UserInfo = verify(
				token,
				tokenConfig.privateKey
			) as UserInfo;
			const user = await ManageUserModel.findUser(userInfo.userId);
			if (
				user &&
				userInfo.password === user.password &&
				userInfo.username === user.username &&
				user.status === 1
			) {
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}

	async verifyPermission(token: string): Promise<boolean> {
		try {
			const userInfo: UserInfo = verify(
				token,
				tokenConfig.privateKey
			) as UserInfo;
			const user = await ManageUserModel.findUser(userInfo.userId);
			if (
				user &&
				userInfo.password === user.password &&
				userInfo.username === user.username &&
				user.status === 1 &&
				user.level === UserPremission.admin //管理员权限
			) {
				return true;
			}
			return false;
		} catch (error) {
			return false;
		}
	}

	// 生成小程序token
	createToken(openid: string): string {
		return sign({ openid }, tokenConfig.privateKey, {
			expiresIn: "100 days",
		});
	}

	// 校验小程序token
	verifywxToken(token: string): string {
		if (!token) {
			return "";
		}
		const params = verify(token, tokenConfig.privateKey) as {
			openid: string;
		};
		return params.openid;
	}
}
export default new UntilService();
