import Db from "./db";
const db = new Db();
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
        if(typeof  data.isExtAllowed !== "undefined") {
            this.settingvars.isExtAllowed = data.isExtAllowed;
        }
        if(typeof  params.isExtAllowed !== "undefined") {
            this.settingvars.isExtAllowed = params.isExtAllowed;
        }
        if(typeof data.isOverridable !== "undefined") {
            this.settingvars.isOverridable = data.isOverridable;
        }
        if(typeof params.isOverridable !== "undefined") {
            this.settingvars.isOverridable = params.isOverridable;
        }
        await db.set({settings: this.settingvars});
        const d = await this.get();
        console.log("set",d);
    }
}
