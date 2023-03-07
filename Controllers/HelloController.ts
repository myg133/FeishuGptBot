import { Path,Action,Params } from "../Utility/Decorators.ts"

@Path()
export class HelloController { 
    constructor(){}

    @Action()
    hey(@Params("id") id:number,
        @Params("name") user:Object){
        return "hi"
    }
}
