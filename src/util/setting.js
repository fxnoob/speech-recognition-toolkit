import Db from "./db";
export default class Setting {
    constructor(){
        this.settingvars = {
            isExtAllowed: true ,
            isOverridable: true
        };
        const db = new Db();
        db.get("settings")
            .then(data => {
                this.settingvars = data;
            })
            .catch((e) => {
                console.log("No data in storage. ");
            });
    }
}
