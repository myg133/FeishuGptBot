import { importModule } from 'https://deno.land/x/import/mod.ts'
export class ModuleScan{
    constructor() {
        
    }
    async ScanAndImport(modulePath: string) {
        return await importModule(modulePath)
    }
}