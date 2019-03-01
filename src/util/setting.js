import Db from "./db";
export default class Setting {
    constructor() {
        this.settingvars = {
            isExtAllowed: true ,
            isOverridable: true
        };
        const db = new Db();
        this.get();
    }
    async get() {
        const data = await db.get("settings");
        return data;
    }
    async set(params) {
        const data = await this.get();
        if("isExtAllowed" in params )
            data.isExtAllowed = params.isExtAllowed;
        if("isOverridable" in params)
            data.isOverridable = params.isOverridable;
        await db.set({settings: data});
    }
}
