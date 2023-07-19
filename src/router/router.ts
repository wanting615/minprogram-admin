import { SwaggerRouter } from "koa-swagger-decorator";
import path from "path";

const router = new SwaggerRouter();

router.swagger({
	title: "min-program-server",
	description: "server api",
	version: "1.0.0",
});

router.mapDir(path.resolve(__dirname, "../controller"));
export { router };
