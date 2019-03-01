import Db from "./db";
const db = new Db();

export default class Storage {
    constructor() {
        this.data = {
            timeStamp: +new Date ,
            data: "" ,
            isOverridable: false
        };
    }
    async getData() {
        try {
             this.data.data = await db.get("data");
        }
        catch (e) {}
        return this.data;
    }
    set(params) {
        return db.set(params);
    }
}
