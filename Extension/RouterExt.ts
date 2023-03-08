import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";

export function GetRouter(modOfControllers: any) {
  const router = new Router();
  // TODO: 构建router
  // 获取 Controller 的path作为 basePath
  // 获取 Action 的path 进行拼接
  // 处理参数
  // 识别 method
  console.log(modOfControllers);
  return router.routes();
}
