import {
	request,
	summary,
	body,
	middlewares,
	query,
} from "koa-swagger-decorator";
import { WxTypeModel } from "../model/doc-model";
import { IdsModel } from "../model/ids";
import { needPermission } from "../middleware/needLogin";
import fs from "fs";
import path from "path";

//微信小程序添加知识文档
export default class DocTypeController {
	@request("post", "/addWxtype")
	@summary("微信小程序添加文档类型")
	@body({
		name: { type: "string", require: true },
		contentTypes: { type: "string", require: true },
		iconUrl: { type: "string", require: true },
	})
	@middlewares([needPermission])
	async addWxtype(ctx: Ctx): Promise<void> {
		const { name, contentTypes, iconUrl } = ctx.request.body;

		if (!name) {
			ctx.fail("请输入文档类型");
			return;
		}
		if (!contentTypes) {
			ctx.fail("请输入子文档类型");
			return;
		}
		if (!iconUrl) {
			ctx.fail("请上传文档类型icon");
		}
		try {
			const arr = (contentTypes as string).split(",");
			const id = await IdsModel.getIds("wx_type_id");
			const data = new WxTypeModel({
				id,
				type: id,
				name,
				iconUrl,
				contentTypes: arr,
			});
			await data.save();
			ctx.success(data, "添加成功");
		} catch (error) {
			ctx.fail("添加失败");
		}
	}

	@request("post", "/updateWxtype")
	@summary("微信小程序更新文档类型")
	@body({
		name: { type: "string", require: true },
		contentTypes: { type: "string", require: true },
		iconUrl: { type: "string", require: true },
		id: { type: "number", require: true },
	})
	@middlewares([needPermission])
	async updateWxtype(ctx: Ctx): Promise<void> {
		const { id, name, contentTypes, iconUrl } = ctx.request.body;
		if (!id) {
			ctx.fail("文档不存在");
			return;
		}
		if (!name) {
			ctx.fail("请输入文档类型");
			return;
		}
		if (!contentTypes) {
			ctx.fail("请输入子文档类型");
			return;
		}
		if (!iconUrl) {
			ctx.fail("请上传文档类型icon");
		}
		try {
			const data = await WxTypeModel.getWxTypeById(Number(id));
			if (!data) {
				ctx.fail("文档不存在");
				return;
			}
			const arr = (contentTypes as string).split(",");
			data.name = name;
			data.contentTypes = arr;
			data.iconUrl = iconUrl;
			await data.save();
			ctx.success(data, "更新成功");
		} catch (error) {
			console.log(error);
			ctx.fail("更新失败");
		}
	}

	@request("get", "/enableDocType")
	@summary("禁用文档类型")
	@query({
		id: { type: "number", require: true },
		disbaled: { type: "number", default: 0 },
	})
	@middlewares([needPermission])
	async enableDocType(ctx: Ctx): Promise<void> {
		const { id, disabled } = ctx.request.query;
		if (!id) return ctx.fail("文档类型不存在");
		const data = await WxTypeModel.getWxTypeById(Number(id));
		data.disabled = Number(disabled ?? 0);
		await data.save();
		ctx.success(true, Number(disabled) === 1 ? "启用成功" : "禁用成功");
	}

	@request("get", "/getTypeList")
	@summary("获取所有文档类型")
	async getTypeList(ctx: Ctx): Promise<void> {
		try {
			const data = await WxTypeModel.getWxTypeAll();
			ctx.success(data, "");
		} catch (error) {
			console.log(error);
		}
	}

	@request("post", "/uploadTypeImg")
	@summary("上传文档类型图片")
	@middlewares([needPermission])
	async uploadTypeImg(ctx: Ctx): Promise<void> {
		try {
			// const file = (ctx.request.files as any)["files[0]"]; // 获取上传文件
			const file = ctx.request.files.file;
			// 创建可读流
			if (Array.isArray(file)) {
				return;
			}
			const reader = fs.createReadStream(file.path);
			//assets/icons/
			const filePath =
				path.join(
					path.resolve(__dirname, "../../.."),
					"webContent/static/assets/icons/"
				) + `${file.name}`;
			// 创建可写流
			const upStream = fs.createWriteStream(filePath);
			upStream.on("error", (err) => {
				console.log("发生异常:", err);
			});
			//文件已经就写入完成事件
			upStream.on("finish", () => {
				console.log("写入已完成..");
			});
			// 可读流通过管道写入可写流
			reader.pipe(upStream);
			ctx.body = {
				status: true,
				message: "文件上传成功",
				url: `assets/icons/${file.name}`,
			};
		} catch (error) {
			console.log(error);
			ctx.fail("上传异常");
		}
	}
}
