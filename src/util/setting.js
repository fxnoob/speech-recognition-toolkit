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
        if("isExtAllowed" in data ) {
            this.settingvars.isExtAllowed = data.isExtAllowed;
        }
        if("isExtAllowed" in params ) {
            this.settingvars.isExtAllowed = params.isExtAllowed;
        }
        if("isOverridable" in data) {
            this.settingvars.isOverridable = data.isOverridable;
        }
        if("isOverridable" in params) {
            this.settingvars.isOverridable = params.isOverridable;
        }
        await db.set({settings: this.settingvars});
        const d = await this.get();
        console.log("set",d);
    }
}
