namespace mj {
export class MjTable {

    static __Ins__: MjTable = null;
    static getInstance(): MjTable {
        if (MjTable.__Ins__ == null) {
            MjTable.__Ins__ = new MjTable();
        }
        return MjTable.__Ins__;
    }


    tbl = null;

    public init() {
        this.tbl = {};

    }

    public check(key) {
        return this.tbl[key] ? true : false;
    }



    public add(key) {
        this.tbl[key] = 1;
    }


    public load(name) {
        let self = this;
        return new Promise(function (resolve, reject) {
            cc.loader.loadJson( res.tblallpath + name,function(err,tbl:any){
                if(err){return;}
                console.log(res.tblallpath + name);
                // console.log(tbl);
                for(let i = 0; i < tbl.length ;i++){
                    if(tbl[i]){
                        self.tbl[tbl[i]] = 1;
                    }
                }
                resolve();
            })
        });
    }



}
}
