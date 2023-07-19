import {
	ReturnModelType,
	getModelForClass,
	modelOptions,
	prop,
} from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "manangeUser" } })
class ManangeUser {
	@prop({ required: true })
	id: number;

	@prop({ required: true })
	userId: number;

	@prop({ required: true })
	username: string;

	@prop({ required: true })
	password: string;

	@prop({ default: "" })
	name?: string;

	@prop({ default: Date.now })
	gen_time?: Date;

	@prop({ default: 1 })
	status?: number; // 状态

	@prop({ default: 2 })
	level?: number; //权限等级

	@prop({ default: "" })
	phone?: string;

	public static async findUser(
		this: ReturnModelType<typeof ManangeUser>,
		userId: number
	) {
		return await this.findOne({ userId });
	}

	public static async findUserByUsername(
		this: ReturnModelType<typeof ManangeUser>,
		username: string
	) {
		return await this.findOne({ username });
	}

	public static async getUsers(
		this: ReturnModelType<typeof ManangeUser>,
		page: number,
		limit: number = 10,
		where?: { [key in string]: string | number }
	) {
		return this.find(where ?? {}, { _v: 0, _id: 0 })
			.sort({ creatAt: -1 })
			.limit(limit)
			.skip((page - 1) * limit);
	}

	public static async getUsersNum(this: ReturnModelType<typeof ManangeUser>) {
		return this.find({});
	}
}

const ManageUserModel = getModelForClass(ManangeUser);

export { ManageUserModel };
