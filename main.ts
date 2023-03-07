import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts"
import { ModuleScan } from "./IoC/mod.ts"
import {GetRouter} from "./Extension/mod.ts"
const app = new Application()

// 注册服务（依赖注入）
const ms = new ModuleScan()
const mods = await ms.ScanAndImport(import.meta.resolve('./Controllers/mod.ts'))

// console.log(mods)
// for (const key in mods) {
//   let p:any = Object.getOwnPropertyDescriptor(mods[key],"meta:path")
//   console.log(p.value)
// }
// 错误监听

// 中间件
// app.use((ctx,next) => {
//   try {
//     next()
//   } catch (error) {
//       console.log(ctx)
//       console.log(error)
//   }
// })

// 注册 router
app.use(GetRouter(mods))
// await app.listen({port: 80})