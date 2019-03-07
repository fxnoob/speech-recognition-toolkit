import Db from "./db";
const db = new Db();
export  class ExtBasicSetting {
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
export  class ExtSpeechRecognitionSetting {
    constructor() {
        this.settingvars = {
            alwaysOpenWithChromeStart: false ,
            submitSearchField: false ,
            langVal: 'en-AU'
        };
    }
    async get() {
        const data = await db.get("ExtSpeechRecognitionSetting");
        return data;
    }
    async set(params) {
        const data = await this.get();
        if(typeof  data.alwaysOpenWithChromeStart !== "undefined") {
            this.settingvars.alwaysOpenWithChromeStart = data.alwaysOpenWithChromeStart;
        }
        if(typeof  params.alwaysOpenWithChromeStart !== "undefined") {
            this.settingvars.alwaysOpenWithChromeStart = params.alwaysOpenWithChromeStart;
        }
        if(typeof data.submitSearchField !== "undefined") {
            this.settingvars.submitSearchField = data.submitSearchField;
        }
        if(typeof params.submitSearchField !== "undefined") {
            this.settingvars.submitSearchField = params.submitSearchField;
        }
        if(typeof data.langVal !== "undefined") {
            this.settingvars.langVal = data.langVal;
        }
        if(typeof params.langVal !== "undefined") {
            this.settingvars.langVal = params.langVal;
        }
        await db.set({ExtSpeechRecognitionSetting: this.settingvars});
        const d = await this.get();
        console.log("set",d);
    }
}
