import {
	body,
	request,
	summary,
	middlewares,
	query,
} from "koa-swagger-decorator";
import { ManageUserModel } from "../model/manage.modal";
import { IdsModel } from "../model/ids";
import { sign, verify } from "jsonwebtoken";
import { needLogin, needPermission } from "../middleware/needLogin";
import { tokenConfig } from "../config";
import { isNull } from "../until/validator";

export default class ManageUser {
	@request("post", "/registerUser")
	@summary("注册管理账号")
	@body({
		username: { type: "string", require: true },
		password: { type: "string", require: true },
		name: { type: "string", require: true },
	})
	async addManangeUser(ctx: Ctx): Promise<void> {
		const { username, password, name } = ctx.request.body;
		if (!username || !password) {
			ctx.fail("用户名或密码不能为空");
			return;
		}

		const user = await ManageUserModel.findUserByUsername(username);
		if (user) {
			ctx.fail("用户名已存在");
			return;
		}

		const id = await IdsModel.getIds("wx_manange_user_id");
		const userdata = new ManageUserModel({
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

	@request("post", "/login")
	@summary("微信小程序后台登陆")
	@body({
		username: { type: "string", require: true },
		password: { type: "string", require: true },
	})
	async loginWx(ctx: Ctx): Promise<void> {
		const { username, password } = ctx.request.body;
		if (!username || !password) {
			ctx.fail("用户名和密码不能为空");
			return;
		}
		const user = await ManageUserModel.findUserByUsername(username);

		if (user && password === user.password) {
			const token = sign(
				{ username, password, userId: user.userId },
				tokenConfig.privateKey,
				{ expiresIn: "1d" }
			);
			ctx.success({ token, userInfo: user }, "登陆成功");
			return;
		}
		ctx.fail("账户密码错误");
	}

	// --------------获取用户信息----------
	@request("post", "/userInfo")
	@summary("获取用户信息")
	@body({ token: { type: "string", require: true } })
	@middlewares([needLogin])
	async getUserInfo(ctx: Ctx): Promise<void> {
		const { token } = ctx.request.body;
		try {
			const userInfo = verify(token, tokenConfig.privateKey) as any;
			const user = await ManageUserModel.findUser(userInfo.userId);
			ctx.body = {
				data: user,
				status: true,
				message: "获取用户信息成功",
			};
		} catch (error) {
			ctx.body = {
				data: null,
				status: false,
				message: "token已过期",
			};
		}
	}

	// ------------ 获取所有用户------------
	@request("post", "/users")
	@summary("获取所有用户")
	@query({
		page: { type: "number", default: 1 },
		limit: { type: "number", default: 10 },
		where: { type: "any", default: {} },
	})
	@middlewares([needPermission])
	async getUsers(ctx: Ctx): Promise<void> {
		const { page, limit, where } = ctx.request.body;
		const _where: { [key in string]: any } = {};
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

			const data = await ManageUserModel.getUsers(
				Number(page),
				Number(limit),
				_where
			);
			const users = await ManageUserModel.getUsersNum();
			ctx.body = {
				status: true,
				message: "",
				count: Math.ceil(users.length / 10),
				data,
			};
		} catch (error) {
			console.log(error);
			ctx.fail("参数错误");
		}
	}

	@request("get", "/user/status")
	@summary("启用or禁用用户")
	@query({
		userId: { type: "number", require: true },
		status: { type: "number", require: true },
	})
	@middlewares([needPermission])
	async changeStatus(ctx: Ctx): Promise<void> {
		const { userId, status } = ctx.request.query;
		if (isNull(userId)) return ctx.fail("用户id不能为空");
		if (isNull(status)) return ctx.fail("status不能为空");
		const user = await ManageUserModel.findUser(Number(userId));
		if (isNull(user)) return ctx.fail("用户不存在");
		user.status = Number(status) === 1 ? 1 : 0;
		await user.save();
		ctx.success(true, "操作成功");
	}

	@request("get", "/user/search")
	@summary("获取搜索项")
	@middlewares([needPermission])
	async getUserSearch(ctx: Ctx): Promise<void> {
		const users = await ManageUserModel.getUsers(1, 999);
		const searchData: { [key in string]: Array<string | number> } = {
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
		ctx.success(
			{
				...searchData,
			},
			"获取成功"
		);
	}
}
