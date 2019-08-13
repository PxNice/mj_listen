// import mj_table from "./table";
namespace mj {
    export class mj_tbale_mgr {

        static __Ins__: mj_tbale_mgr = null;
        static getInstance(): mj_tbale_mgr {
            if (mj_tbale_mgr.__Ins__ == null) {
                mj_tbale_mgr.__Ins__ = new mj_tbale_mgr();
            }
            return mj_tbale_mgr.__Ins__;
        }

        m_tbl = {};
        m_eye_tbl = {};
        m_feng_tbl = {};
        m_feng_eye_tbl = {};

        public init() {
            for (let i = 0; i < 5; i++) {
                this.m_tbl[i] = new mj_table();
                this.m_tbl[i].init();
            }

            for (let i = 0; i < 5; i++) {
                this.m_eye_tbl[i] = new mj_table();
                this.m_eye_tbl[i].init();
            }

            for (let i = 0; i < 5; i++) {
                this.m_feng_tbl[i] = new mj_table();
                this.m_feng_tbl[i].init();
            }

            for (let i = 0; i < 5; i++) {
                this.m_feng_eye_tbl[i] = new mj_table();
                this.m_feng_eye_tbl[i].init();
            }
        }

        public getTable(gui_num, eye, chi) {
            let tbl = null;
            if (chi) {
                if (eye) {
                    tbl = this.m_eye_tbl[gui_num];
                } else {
                    tbl = this.m_tbl[gui_num];
                }
            } else {
                if (eye) {
                    tbl = this.m_feng_eye_tbl[gui_num];
                } else {
                    tbl = this.m_feng_tbl[gui_num];
                }
            }
            return tbl;
        };

        public getTableName(gui_num, eye, chi) {
            let tblName = "";
            if (chi) {
                if (eye) {
                    tblName = "eye_table_" + gui_num + ".json";
                } else {
                    tblName = "table_" + gui_num + ".json";
                }
            } else {
                if (eye) {
                    tblName = "feng_eye_table_" + gui_num + ".json";
                } else {
                    tblName = "feng_table_" + gui_num + ".json";
                }
            }
            return tblName;
        };

        public Add(key, gui_num, eye, chi) {
            let tbl = this.getTable(gui_num, eye, chi);
            if (tbl) {
                tbl.add(key);
            }
        };

        public check(key, gui_num, eye, chi) {
            if (!cc.sys.isNative) {
                let tbl = this.getTable(gui_num, eye, chi);
                if (!tbl) return false;
                return tbl.check(key);
            } else {
                let tblName = this.getTableName(gui_num, eye, chi);
                if (!tblName) return false;
                return kaayou_jsb.HuTable.Has(tblName, key)
            }
        };

        public LoadTable() {

            let self = this;
            return new Promise(function (resolve, reject) {
                if (!cc.sys.isNative) {
                    var pra = [];
                    for (let i = 0; i <= 4; i++) {
                        let name = "table_" + i + ".json";
                        pra.push(self.m_tbl[i].load(name));
                    }
                    for (let i = 0; i <= 4; i++) {
                        let name = "eye_table_" + i + ".json";
                        pra.push(self.m_eye_tbl[i].load(name));
                    }
                    Promise.all(pra).then(function () {
                        resolve();
                    })
                } else {
                    let obj = {};

                    for (let i = 0; i <= 4; i++) {
                        let name = "eye_table_" + i + ".json";
                        let name2 = "table_" + i + ".json";
                        obj[name] = res.tblallpath + name
                        obj[name2] = res.tblallpath + name2
                    }

                    kaayou_jsb.HuTable.Load(obj, function (data) {
                        console.log("加载胡牌表：", data);
                        if (data == "ok") {
                            // console.log(kaayou_jsb.HuTable.Has("tb1","20"));//打印true3
                            // console.log(kaayou_jsb.HuTable.Has("tb1","200"));//打印false 
                            resolve();
                        } else {
                            console.log("胡牌表加载失败");
                        }
                    });

                }



            });

        };
        public LoadFengTable() {
            let self = this;
            return new Promise(function (resolve, reject) {
                if (!cc.sys.isNative) {
                    var pra = [];
                    for (let i = 0; i <= 4; i++) {
                        let name = "feng_table_" + i + ".json";
                        pra.push(self.m_feng_tbl[i].load(name));
                    }
                    for (let i = 0; i <= 4; i++) {
                        let name = "feng_eye_table_" + i + ".json";
                        pra.push(self.m_feng_eye_tbl[i].load(name));
                    }
                    Promise.all(pra).then(function () {
                        console.log(self.m_feng_eye_tbl);
                        resolve();
                    })
                } else {
                    let obj = {};
                    kaayou.emit("test0", "进入C++ loadF");
                    for (let i = 0; i <= 4; i++) {
                        let name = "feng_table_" + i + ".json";
                        let name2 = "feng_eye_table_" + i + ".json";
                        obj[name] = res.tblallpath + name
                        obj[name2] = res.tblallpath + name2
                    }
                    kaayou_jsb.HuTable.Load(obj, function (data) {
                        kaayou.emit("test0", "开始loadF");
                        console.log("加载胡牌表：", data);
                        if (data == "ok") {
                            kaayou.emit("test0", "loadOkF");
                            resolve();
                        } else {
                            kaayou.emit("test0", "loadF失败");
                            console.log("胡牌表加载失败");
                        }
                    });
                }

            });



        };


    }
}
