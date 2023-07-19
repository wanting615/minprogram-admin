import { IdsList } from "../types/ids";
import {
	getModelForClass,
	modelOptions,
	prop,
	ReturnModelType,
} from "@typegoose/typegoose";

@modelOptions({ options: { customName: "ids" } })
class Id {
	@prop()
	public user_id: number;
	@prop()
	public wx_type_id: number; //微信小程序type id
	@prop()
	public wx_id: number; //微信小程序知识积累id
	@prop()
	wx_manange_user_id: number; // 小程序管理平台userid

	//获取自增id
	public static async getIds(
		this: ReturnModelType<typeof Id>,
		id: IdsList
	): Promise<number> {
		try {
			const idsData = await this.findOne();
			idsData[id] = idsData[id] ? idsData[id] : 0;
			idsData[id]++;
			await idsData.save();
			return idsData[id];
		} catch (error) {
			console.log("获取ID数据失败");
			throw new Error(error);
		}
	}
}
const IdsModel = getModelForClass(Id);

IdsModel.findOne((_error: unknown, data: unknown) => {
	if (!data) {
		const newIds = new IdsModel({
			user_id: 0,
			wx_type_id: 0,
			wx_id: 0,
			wx_manange_user_id: 0,
		});
		newIds.save();
	}
});

export { IdsModel };
