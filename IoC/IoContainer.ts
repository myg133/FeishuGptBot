import {ModuleScan} from "./ModuleScan.ts"

export class IoContainer { 
    private singleton?:Map<string,[Function,Object?]>
    private scoped?:Map<string,Function>
    private transient?:Map<string,Function>
    private constructor() {
        this.singleton = new Map<Function, Object>()
        this.scoped = new Map<string,Function>()
        this.transient = new Map<string,Function>()
    }
    private static instance?:IoContainer
    static Instance() : IoContainer {
        if (this.instance === undefined) {
            this.instance = new IoContainer()
        }
        return this.instance!
    }
    //#region private function
    private isAdded(clazz:Function) {
        // check singleton
        if(this.singleton.has(clazz.name)){
            return true
        }
        // check scoped
        if(this.scoped.has(clazz.name)){
            return true
        }
        // check transient
        if(this.transient.has(clazz.name)){
            return true
        }
        return false
    }
    private hasInstence(clazz:Function){
        if(this.singleton.has(clazz.name)){
            // 不存在之间返回
            return false
        }
        let [_,obj] = this.singleton.get(clazz.name)
        if(obj == undefined||obj == null)
            return false
        return true
    }
    //#endregion
    //#region 注册
    public AddSingleton<T extends Object>(clazzInstance:T) {
        if (typeof clazzInstance == 'function') {
            throw new Error("Please use AddTypeSingleton for register a class")
        }
        let clazz = clazzInstance.constructor
        let clazzName = clazz.name
        if(!this.isAdded(clazz)){
            this.singleton.set(clazz.name,[clazz,clazzInstance])
        }
        else if(!this.hasInstence(clazz)) {
            this.singleton.set(clazz.name,[clazz,clazzInstance])
        }
        return this
    }

    AddTypeSingleton<T extends Function>(clazz:T) {
        if (typeof clazz != 'function') {
            throw new Error("Please use AddSingleton for register a instance of Class")
        }
        // 检查是否已注册
        if(this.isAdded(clazz)){
            throw new Error(`class ${clazz.name} has registerd!`)
        }
        this.singleton.set(clazz.name,[clazz,])
        return this
    }

    AddTypeScoped<T extends Function>() {
        if (typeof clazz != 'function') {
            throw new Error("Can not register a class instance in SCOPED")
        }
        // 检查是否已注册
        if(this.isAdded(clazz)){
            throw new Error(`class ${clazz.name} has registerd!`)
        }
        this.scoped.set(clazz.name,clazz)
        return this
    }
    AddTypeTransient<T extends Function>() {
        if (typeof clazz != 'function') {
            throw new Error("Can not register a class instance in TRANSIENT")
        }
        // 检查是否已注册
        if(this.isAdded(clazz)){
            throw new Error(`class ${clazz.name} has registerd!`)
        }
        this.transient.set(clazz.name,clazz)
        return this
    }

    async AddMods(modPath:string,condition:(clazz:Function)=>boolean): IoContainer{
        // 添加一个IoContainer 实力作为链式调用的示例
        let tempContext = new IoContainer()
        const ms = new ModuleScan()
        const mods = await ms.ScanAndImport(modPath)
        for (const key in mods) {
            if (Object.prototype.hasOwnProperty.call(mods, key)) {
                const element = mods[key];
                if(condition(element)){
                    
                }
            }
        }
        return true
    }
    //#endregion

    //#region 请求组件
    //#endregion
}