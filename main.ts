import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts"
import { ModuleScan,IoContainer } from "./IoC/mod.ts"
import {GetRouter} from "./Extension/mod.ts"
const app = new Application()

// 注册服务（依赖注入）
IoContainer.Instance().AddSingleton(app)
IoContainer.Instance().AddMods(import.meta.resolve('./Controllers/mod.ts'),(clazz:Function):bool => {
    return clazz.name.toLowerCase().endsWith("controller")
})
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
// app.use(GetRouter())
// start the app
// await app.listen({port: 80})